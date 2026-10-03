import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import { useState, useEffect, useRef } from 'react';

export default function Project({ projects, queryParams = {} }) {
    const [search, setSearch] = useState(queryParams.search || '');
    const [status, setStatus] = useState(queryParams.status || '');
    const isInitialMount = useRef(true);

    const deleteProject = (id) => {
        router.delete(route('project.destroy', id));
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const timer = setTimeout(() => {
            applyFilters({ search, status });
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        applyFilters({ search, status: newStatus });
    };

    const applyFilters = (params) => {
        const filteredParams = {};
        if (params.search) filteredParams.search = params.search;
        if (params.status) filteredParams.status = params.status;

        router.get(route('project.index'), filteredParams, {
            preserveState: true,
            preserveScroll: true,
        });
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
                            {/* Search & Filter Bar */}
                            <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                                <div className="relative w-full sm:w-1/2">
                                    <svg
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search projects by name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="w-full sm:w-48 rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

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
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <select
                                                                value={project.status}
                                                                onChange={(e) =>
                                                                    router.patch(
                                                                        route('project.update-status', project.id),
                                                                        { status: e.target.value },
                                                                        { preserveScroll: true }
                                                                    )
                                                                }
                                                                className='rounded-md border border-gray-300 py-1 pl-2 pr-7 text-xs font-semibold shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer'
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="ongoing">Ongoing</option>
                                                                <option value="completed">Completed</option>
                                                            </select>
                                                        </td>
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
