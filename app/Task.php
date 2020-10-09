<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];

    public function scopeSorting($query)
    {
        return $query->orderBy('sort', 'asc');
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($task) {
            $task->sort = Task::max('sort')+1;
        });
    }
}
