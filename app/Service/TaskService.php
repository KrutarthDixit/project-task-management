<?php

namespace App\Service;

use App\Models\Task;

class TaskService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private Task $task
    ) {
    }

    public function getAlltasks()
    {
        return $this->task->paginate(10);
    }

    public function gettaskById(string $id)
    {
        return $this->task->find($id)->first();
    }

    public function storetask(array $data)
    {
        return $this->task->create($data);
    }

    public function Updatetask(string $id, array $data)
    {
        $task = $this->gettaskById($id);
        $task->update($data);

        return $task;
    }

    public function destroytask(string $id)
    {
        $task = $this->gettaskById($id);
        $task->delete();

        return $task;
    }
}
