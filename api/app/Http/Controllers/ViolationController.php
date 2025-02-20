<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequests\UpdateTicketRequest;
use App\Http\Requests\ViolationRequests\CreateViolationRequest;
use App\Http\Requests\ViolationRequests\DeleteViolationRequest;
use App\Http\Requests\ViolationRequests\UpdateViolationRequest;
use App\Http\Resources\ViolationResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Violation;

class ViolationController extends Controller
{
    public function show(Violation $violation)
    {
        // Newer
        return response()->json(new ViolationResource($violation));
    }

    public function showArchived($violation)
    {
        $archivedViolation = Violation::onlyTrashed()->findOrFail($violation);

        return response()->json(new ViolationResource($archivedViolation));
    }

    public function list(Request $request)
    {
        $perPage = $request->input('limit', 10);

        $search_term = $request->input('search', '');
        // With foreign keys
        // $violations = Violation::with('genders')
        //     ->orderBy('id', 'asc')
        //     ->paginate($perPage);

        $violations = Violation::GeneralSearch($search_term)
            ->orderBy('id', 'desc')
            ->paginate($perPage);
        // Reformat the Response Type such that the top level
        // includes the key and value of total number of items in the query
        // and the current page the list belongs to.
        return response()->json([
            'total' => $violations->total(),
            'page' => $violations->currentPage(),
            'data' => ViolationResource::collection($violations)
        ]);
    }


    public function archived(Request $request)
    {
        $perPage = $request->input('limit', 10);

        $search_term = $request->input('search', '');

        // With foreign keys
        // $violations = Violation::with('genders')
        //     ->orderBy('id', 'asc')
        //     ->paginate($perPage);

        $violations = Violation::onlyTrashed()
            ->generalSearch($search_term)
            ->orderBy('id')
            ->paginate($perPage);
        // Reformat the Response Type such that the top level
        // includes the key and value of total number of items in the query
        // and the current page the list belongs to.
        return response()->json([
            'total' => $violations->total(),
            'page' => $violations->currentPage(),
            'data' => ViolationResource::collection($violations)
        ]);
    }


    public function create(CreateViolationRequest $request)
    {
        $fields = $request->validated();

        $violation = Violation::create([
            'name' => $fields['name'],
            'penalty' => $fields['penalty'],
            'ordinance' => $fields['ordinance'],
            'fine' => $fields['fine']
        ]);

        return response()->json(new ViolationResource($violation), 201);
    }

    public function update(UpdateViolationRequest $request, Violation $violation)
    {
        $fields = $request->validated();

        try {
            // Update violation if data exists
            if (!empty($fields['violation'])) {
                $violation->violation()->update($fields['violation']);
            }

            // Update violatino data
            $violation->update($fields);

            return response()->json(new ViolationResource($violation));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update violation'], 500);
        }
    }

    public function delete(DeleteViolationRequest $request, Violation $violation)
    {

        $id = $violation->id;

        try {
            $violation->delete();
            return response()->json(['message' => "Violation ID:$id has been deleted"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete ticket'], 500);
        }
    }

    public function restore(int $violationId)
    {
        // Retrieve the soft-deleted ticket
        $violation = Violation::onlyTrashed()->find($violationId);

        // Check if the ticket exists
        if (!$violation) {
            return response()->json(['message' => "The ticket you requested does not exist or is not deleted."], 404);
        }

        // Restore the ticket
        $violation->restore();

        return response()->json(['message' => "The ticket $violation->id has been restored successfully."], 200);
    }
}
