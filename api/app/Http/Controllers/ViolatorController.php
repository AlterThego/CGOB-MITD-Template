<?php

namespace App\Http\Controllers;

use App\Http\Resources\ViolatorResource;
use App\Models\Violator;
use Illuminate\Http\Request;
use App\Http\Requests\ViolatorRequests\CreateViolatorRequest;
use App\Http\Requests\ViolatorRequests\UpdateViolatorRequest;

class ViolatorController extends Controller
{
    public function show(Violator $violator)
    {

        $violator->load('gender');

        return response()->json(new ViolatorResource($violator));
    }


    public function list(Request $request)
    {
        $perPage = $request->input('limit', 10);
        $search_term = $request->input('search_term', '');

        $violators = Violator::with('gender')
            ->generalSearch($search_term)
            ->orderBy('id', 'asc')
            ->paginate($perPage);

        return response()->json([
            'total' => $violators->total(),
            'page' => $violators->currentPage(),
            'data' => ViolatorResource::collection($violators)
        ]);
    }

    public function create(CreateViolatorRequest $request)
    {
        $fields = $request->validated();

        $violator = Violator::create([
            'first_name' => $fields['first_name'],
            'middle_name' => $fields['middle_name'],
            'last_name' => $fields['last_name'],
            'full_name' => $fields['first_name'] . ' ' . $fields['middle_name'] . ' ' . $fields['last_name'],
            'gender_id' => $fields['gender_id']
        ]);

        return response()->json(new ViolatorResource($violator), 201);
    }

    public function update(UpdateViolatorRequest $request, Violator $violator)
    {
        $fields = $request->validated();

        $violator->update($fields);

        return response()->json(new ViolatorResource($violator), 200);
    }

    public function delete($id)
    {
        $violator = Violator::withTrashed()->find($id);

        if (!$violator) {
            return response()->json(['error' => 'Violator not found'], 404);
        }

        $fullName = $violator->full_name;

        try {
            $violator->delete(); // Soft delete
            return response()->json(['message' => "$fullName has been deleted"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete violator'], 500);
        }
    }

    public function restore($id)
    {
        $violator = Violator::withTrashed()->find($id);

        if (!$violator) {
            return response()->json(['error' => 'Violator not found'], 404);
        }

        try {
            $violator->restore();
            return response()->json(['message' => "$violator->full_name has been restored"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to restore violator'], 500);
        }
    }

    public function trashed(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search_term = $request->input('search_term', '');

        $violators = Violator::onlyTrashed()
            ->with('gender')
            ->generalSearch($search_term)
            ->orderBy('id', 'asc')
            ->paginate($perPage);


        return response()->json([
            'total' => $violators->total(),
            'page' => $violators->currentPage(),
            'data' => ViolatorResource::collection($violators)
        ]);
    }

    // public function list(Request $request)
    // {
    //     $perPage = $request->input('limit', 10);
    //     $search_term = $request->input('search_term', '');

    //     $violators = Violator::with('gender')
    //         ->generalSearch($search_term)
    //         ->orderBy('id', 'asc')
    //         ->paginate($perPage);

    //     return response()->json([
    //         'total' => $violators->total(),
    //         'page' => $violators->currentPage(),
    //         'data' => ViolatorResource::collection($violators)
    //     ]);
    // }
}
