<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequests\CreateTicketRequest;
use App\Http\Requests\TicketRequests\DeleteTicketRequest;
use App\Http\Requests\TicketRequests\ShowTicketRequest;
use App\Http\Requests\TicketRequests\UpdateTicketRequest;
use App\Http\Requests\TicketRequests\RestoreTicketRequest;
use App\Http\Resources\TicketResource;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Violator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    /**
     * Display a single ticket with related data.
     */
    public function show(ShowTicketRequest $request, Ticket $ticket)
    {
        // Newer
        return response()->json(new TicketResource($ticket->load(['violator', 'violator.gender'])));

        // Original code
        // $ticket = Ticket::with([
        //     'violator',
        //     'violator.gender'
        // ])->find($ticket);
        // return response()->json(new TicketResource($ticket));
    }

    /**
     * List all tickets with pagination.
     */
    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $tickets = Ticket::with('violator')->paginate($perPage);

        return response()->json(TicketResource::collection($tickets));

        // Original code
        // $tickets = Ticket::paginate(10);
        // return response()->json(TicketResource::collection($tickets));

    }

    /**
     * Create a new ticket with a violator.
     */
    public function create(CreateTicketRequest $request)
    {
        // $fields = $request->validated();

        // // Create violator only if data is provided
        // $violator = isset($fields['violator']) ? Violator::create($fields['violator']) : null;

        // // Create ticket
        // $ticket = Ticket::create([
        //     'citation_number' => $fields['citation_number'],
        //     'violator_id' => $violator?->id,
        // ]);

        // DB::commit();
        // return response()->json(new TicketResource($ticket), 201);


        $fields = $request->validated();
        // dd($fields);

        $violator = Violator::create($fields['violator']);

        $ticket = Ticket::create([
            'citation_number' => $fields['citation_number'],
            'violator_id' => $violator->id,
            'status' => $fields['status']
        ]);

        return response()->json(new TicketResource($ticket), 201);
    }
    /**
     * Update a ticket and its related violator.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $fields = $request->validated();

        DB::beginTransaction();
        try {
            // Update violator if data exists
            if (!empty($fields['violator'])) {
                $ticket->violator()->update($fields['violator']);
            }

            // Update ticket data
            $ticket->update($fields);

            DB::commit();
            return response()->json(new TicketResource($ticket));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update ticket'], 500);
        }
    }

    /**
     * Soft delete a ticket.
     */
    public function delete(DeleteTicketRequest $request, Ticket $ticket)
    {
        $citationNumber = $ticket->citation_number;

        try {
            $ticket->delete();
            return response()->json(['message' => "$citationNumber has been deleted"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete ticket'], 500);
        }
    }

    /**
     * Restore a soft-deleted ticket.
     */
    public function restore(RestoreTicketRequest $request, int $ticketId)
    {
        // Retrieve the soft-deleted ticket
        $ticket = Ticket::onlyTrashed()->find($ticketId);

        // Check if the ticket exists
        if (!$ticket) {
            return response()->json(['message' => "The ticket you requested does not exist or is not deleted."], 404);
        }

        // Restore the ticket
        $ticket->restore();

        return response()->json(['message' => "The ticket $ticket->id has been restored successfully."], 200);
    }
}
