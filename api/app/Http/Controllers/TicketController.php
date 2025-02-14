<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequests\ShowTicketRequest;
use App\Http\Resources\TicketResource;
use Illuminate\Http\Request;

use App\Models\Ticket;

class TicketController extends Controller
{
    public function show(ShowTicketRequest $request, Ticket $ticket)
    {
        $ticket->load([
            'violator',
            'violator.gender'
        ]);
    return response()->json(new TicketResource($ticket));
    }

    public function list()
    {
        $tickets = Ticket::paginate(10);
        return response()->json(TicketResource::collection($tickets));
    }

    public function create() {}
    public function update() {}
    public function delete() {}
    public function restore() {}
}
