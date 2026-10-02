import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';

export default function Project({ projects }) {
    const deleteProject = (id) => {
        router.delete(route('project.destroy', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Project
                    </h2>

                    <Link
                        href={route('project.create')}
                        className='inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
                    >
                        Create Project
                    </Link>
                </div>

            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {projects.data.length === 0 ? (
                                <div className="p-6 text-gray-900">
                                    No Projects found
                                </div>
                            ) : (
                                <>
                                    <table className="min-w-full text-left text-sm font-light w-full">
                                        <thead className="border-b font-medium dark:border-neutral-500 text-left">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Manager Name</th>
                                                <th scope="col" className="px-6 py-4">Name</th>
                                                <th scope="col" className="px-6 py-4">Staus</th>
                                                <th scope="col" className="px-6 py-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                projects.data.map((project, index) => (
                                                    <tr className="border-b dark:border-neutral-500" key={`project-${project.id}`}>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{project.manager.name}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{project.name}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{project.status}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <div className='flex items-center justify-center gap-2'>
                                                                <Link
                                                                    href={route('project.show', project.id)}
                                                                    className='inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
                                                                >
                                                                    View
                                                                </Link>
                                                                <Link
                                                                    href={route('project.edit', project.id)}
                                                                    className='inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <DangerButton onClick={() => deleteProject(project.id)}>
                                                                    Delete
                                                                </DangerButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <nav className="flex items-center justify-center space-x-1 mt-6">
                                        {projects.links.map((link, key) => {
                                            if (link.url === null) {
                                                // Disabled buttons (e.g., "Previous" when on the first page)
                                                return (
                                                    <span
                                                        key={key}
                                                        className="px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-md border"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-4 py-2 text-sm rounded-md border transition-colors ${link.active
                                                        ? 'bg-gray-700 text-white border-gray-700'
                                                        : 'bg-white text-gray-700 hover:bg-gray-700 border-gray-700'
                                                        }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </nav>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
