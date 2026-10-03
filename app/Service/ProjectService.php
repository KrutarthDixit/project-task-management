<?php

namespace App\Service;

use App\Models\Project;
use App\Models\User;

class ProjectService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private Project $project,
        private User $user

    ) {
    }

    public function getAllProjects(array $filters = [])
    {
        $query = $this->project->with('manager');

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate(10)->withQueryString();
    }

    public function getProjectById(string $id)
    {
        return $this->project->find($id)->first();
    }

    public function storeProject(array $data)
    {
        return $this->project->create([
            'manager_id' => $data['manager'],
            'name' => $data['name'],
            'description' => $data['description'],
            'status' => $data['status'],
        ]);
    }

    public function UpdateProject(string $id, array $data)
    {
        $project = $this->getProjectById($id);
        $project->update([
            'manager_id' => $data['manager'],
            'name' => $data['name'],
            'description' => $data['description'],
            'status' => $data['status'],
        ]);

        return $project;
    }

    public function destroyProject(string $id)
    {
        $project = $this->getProjectById($id);
        $project->delete();

        return $project;
    }

    public function getAllUsers()
    {
        return $this->user->all();
    }
}
