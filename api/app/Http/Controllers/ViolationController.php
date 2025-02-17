<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequests\ShowTicketRequest;
use App\Http\Resources\TicketResource;
use App\Http\Resources\ViolationResource;
use Illuminate\Http\Request;
use App\Models\Violation;

class ViolationController extends Controller
{
    public function show(Violation $violation)
    {
        // Newer
        return response()->json(new ViolationResource($violation));
    }

    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $violations = Violation::paginate($perPage);

        return response()->json(ViolationResource::collection($violations));
    }
}
