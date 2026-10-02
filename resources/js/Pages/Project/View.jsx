import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProjectView({ project }) {

    useState(() => {
        console.log(project);
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project Details
                </h2>
            }
        >
            <Head title="View Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {!project ? (
                                <div className="p-6 text-gray-900">
                                    No Project found
                                </div>
                            ) : (
                                <>
                                    <table className="min-w-full text-left text-sm font-light w-full">
                                        <tr className="border-b dark:border-neutral-500">
                                            <th className="px-6 py-4">Id</th>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{project.id}</td>
                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                            <th className="px-6 py-4">Manager</th>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{project.manager.name}</td>
                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                            <th className="px-6 py-4">Name</th>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{project.name}</td>
                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                            <th className="px-6 py-4">Status</th>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{project.status}</td>
                                        </tr>
                                    </table>
                                    {
                                        project.tasks.length === 0 ? (
                                            <h2 className="px-2 pt-8 text-lg font-medium text-gray-900">
                                                Project Has No Tasks
                                            </h2>
                                        ) : (
                                            <>
                                                <h2 className="px-2 pt-8 text-lg font-medium text-gray-900">
                                                    Project Tasks
                                                </h2>
                                                <table className="min-w-full text-left text-sm font-light w-full">
                                                    <thead className="border-b font-medium dark:border-neutral-500 text-left">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4">#</th>
                                                            <th scope="col" className="px-6 py-4">Task</th>
                                                            <th scope="col" className="px-6 py-4">Staus</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            project.tasks.map((task, index) => (
                                                                <tr className="border-b dark:border-neutral-500" key={`task-${task.id}`}>
                                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{task.title}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{task.status}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                    }

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
