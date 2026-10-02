<?php

namespace Database\Factories;

use App\Enums\ProjectStatusEnum;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'manager_id' => User::first()->id,
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(2),
            'status' => fake()->randomElement([ProjectStatusEnum::PENGING, ProjectStatusEnum::COMPLETED, ProjectStatusEnum::ONGOING]),
        ];
    }
}
