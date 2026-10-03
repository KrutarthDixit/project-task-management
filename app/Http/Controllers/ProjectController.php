<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Service\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{

    public function __construct(
        private ProjectService $projectService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status']);

        return Inertia::render('Project/Index', [
            'projects' => $this->projectService->getAllProjects($filters),
            'queryParams' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create', [
            'users' => $this->projectService->getAllUsers()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $this->projectService->storeProject($data);

        return redirect()->route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('Project/View', [
            'project' => $project->load(['manager', 'tasks'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'users' => $this->projectService->getAllUsers(),
            'project' => $project->load(['manager'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $this->projectService->UpdateProject($project->id, $data);

        return redirect()->route('project.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->projectService->destroyProject($project->id);

        return redirect()->route('project.index')->with('success', 'Project deleted successfully');
    }

    /**
     * Update the status of the specified project.
     */
    public function updateStatus(Request $request, Project $project)
    {
        $data = $request->validate([
            'status' => ['required','in:pending,ongoing,completed'],
        ]);

        $project->update(['status' => $data['status']]);

        return redirect()->route('project.index')->with('success', 'Project status updated successfully');
    }
}
