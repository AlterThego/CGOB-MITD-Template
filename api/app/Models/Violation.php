<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Violation extends AppModel
{
    use SoftDeletes;

    protected $fillable = ['name', 'penalty', 'ordinance', 'fine'];
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

    #Region Scopes
    public function scopeGeneralSearch(Builder $query, string | null $search_term)
    {
        return $query->when($search_term, function ($general_search_query) use ($search_term) {
            $general_search_query->where('name', 'ilike', "%{$search_term}%")
                ->orWhere('ordinance', 'ilike', "%{$search_term}%")
                ->orWhere('penalty', 'ilike', "%{$search_term}%")
                ->orWhere('fine', 'ilike', "%{$search_term}%");
        });
    }

    public function scopeName(Builder $query, string | null $name)
    {
        return $query->when($name, function ($name_search_query) use ($name) {
            $name_search_query->where('name', 'ilike', "%{$name}%");
        });
    }
}
