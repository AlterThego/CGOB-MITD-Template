<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

use App\Models\Ticket;
use App\Models\Gender;

class Violator extends AppModel
{
    use SoftDeletes;

    protected $fillable = ['first_name', 'middle_name', 'last_name', 'gender_id'];

    protected $appends = [
        'fullname',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    /**
     * Prepare a date for array / JSON serialization.
     */
    // protected function serializeDate(DateTimeInterface $date): string {
    //     return $date->format('Y-m-d');
    // }

    protected $hidden = ['gender_id'];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function scopeGeneralSearch(Builder $query, string | null $search_term)
    {
        return $query->when($search_term, function ($general_search_query) use ($search_term) {
            $general_search_query->where('first_name', 'ilike', "%{$search_term}%")
            ->orWhere('middle_name', 'ilike', "%{$search_term}%")
            ->orWhere('last_name', 'ilike', "%{$search_term}%");
        });
    }

    public function scopeFirstName(Builder $query, string | null $first_name)
    {
        return $query->where($first_name, function ($first_name_search_query) use ($first_name){
            $first_name_search_query->where('first_name', 'ilike', "%{$first_name}%");
        });
    }

    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_name} {$this->last_name}");
    }
}
