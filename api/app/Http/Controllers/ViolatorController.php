<?php

namespace App\Http\Controllers;

use App\Http\Requests\ViolatorRequests\CreateViolatorRequest;
use App\Http\Requests\ViolatorRequests\ShowViolatorRequest;
use App\Http\Resources\ViolatorResource;
use App\Models\Violator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Gender;

class ViolatorController extends Controller
{
    public function show(ShowViolatorRequest $request, Violator $violator)
    {
        return response()->json(new ViolatorResource($violator));
    }

    public function list(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $violators = Violator::paginate($perPage);

        return response()->json(ViolatorResource::collection($violators));
    }


    public function create(CreateViolatorRequest $request)
    {
        $fields = $request->validated();

        // DB::beginTransaction();
        // try {
            $gender = isset($fields['gender']) ? Gender::create($fields['gender']) : null;

            $violator = Violator::create([
                'first_name' =>  $fields['first_name'],
                'middle_name' =>  $fields['middle_name'],
                'last_name' =>  $fields['last_name'],
                'gender_id' => $gender?->id,
            ]);

            DB::commit();
            return response()->json(new ViolatorResource($violator), 201);

        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     return response()->json(['error' => 'Failed to create violator'], 500);
        // }
    }

    public function update() {}
    public function delete() {}
    public function restore() {}
}
