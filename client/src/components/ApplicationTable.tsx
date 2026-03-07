import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useApplications } from "../hooks/application.hook";
import type { IApplication } from "../types/application.type";
import type { ColumnDef } from "@tanstack/react-table";
import ApplicationCard from "./common/ApplicationCard";
import CreateApplicationCard from "./common/CreateApplicationCard";

// ✅ pastel bg colors matching the card style
const accentColors = [
    "bg-yellow-100/10 border-yellow-300/40",
    "bg-pink-100/10 border-pink-300/40",
    "bg-blue-100/10 border-blue-300/40",
    "bg-purple-100/10 border-purple-300/40",
    "bg-green-100/10 border-green-300/40",
    "bg-cyan-100/10 border-cyan-300/40",
];

const statusColors: Record<string, string> = {
    applied:      "bg-yellow-200/20 text-yellow-300 border border-yellow-400/30",
    screening:    "bg-blue-200/20 text-blue-300 border border-blue-400/30",
    interviewing: "bg-purple-200/20 text-purple-300 border border-purple-400/30",
    offered:      "bg-green-200/20 text-green-300 border border-green-400/30",
    rejected:     "bg-red-200/20 text-red-300 border border-red-400/30",
    withdrawn:    "bg-gray-200/20 text-gray-400 border border-gray-500/30",
};

const getAccentColor = (index: number) => accentColors[index % accentColors.length];

const columns: ColumnDef<IApplication>[] = [
    { accessorKey: "companyName",      header: "Company" },
    { accessorKey: "position",         header: "Position" },
    { accessorKey: "status",           header: "Status" },
    { accessorKey: "applicationDate",  header: "Applied Date" },
];

const ApplicationTable = () => {
    const { applications, page, pageSize, handlePagination, isLoadingRTK, errorRTK, total } = useApplications();

    const table = useReactTable({
        data: applications || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: { pagination: { pageIndex: page - 1, pageSize } },
        manualPagination: true,
        pageCount: Math.ceil((total ?? 0) / pageSize),
        onPaginationChange: (updater) => {
            const next = typeof updater === 'function'
                ? updater({ pageIndex: page - 1, pageSize })
                : updater;
            handlePagination(next.pageIndex + 1, next.pageSize);
        },
    });

    if (isLoadingRTK) return (
        <div className="p-8 font-mono text-center text-gray-400 tracking-widest animate-pulse">
            FETCHING_DATA...
        </div>
    );

    if (errorRTK) return (
        <div className="p-8 font-mono text-center text-red-400 tracking-widest">
            ERROR: FAILED TO LOAD APPLICATIONS
        </div>
    );

    return (
        <div className="flex flex-col flex-1 font-mono">

            {/* ── Column Headers ──
            <div className="grid grid-cols-4 px-4 py-2 text-xs tracking-widest text-gray-500 uppercase border-b border-gray-700">
                {columns.map(col => (
                    <span key={String(col.header)}>
                        {String(col.header)}
                    </span>
                ))}
            </div> */}

                {table.getRowModel().rows.length === 0 ? (
                    <div className="text-center text-gray-500 tracking-widest text-sm">
                        NO_RECORDS_FOUND
                    </div>
                ) : (
                    // ✅ 3. This section just wraps the cards
                    <section className="flex flex-wrap content-start gap-6 p-8 flex-1">
                        {table.getRowModel().rows.map((row) => {
                            const app = row.original;
                            return (
                                <ApplicationCard
                                    key={app._id}
                                    companyName={app.companyName}
                                    jobTitle={app.position}
                                    status={app.status}
                                    id={app._id}
                                />
                            );
                        })}
                        <CreateApplicationCard />
                    </section>
                )}

            {/* ── Pagination ── */}
            <div className="flex items-center justify-between text-xs text-gray-500 tracking-widest border-t border-gray-700 p-4 shrink-0">
                <span>
                    PAGE_{page} / PAGE_{table.getPageCount()} — {total} RECORDS
                </span>

                <div className="flex items-center gap-4">
                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">ROWS:</span>
                        <select
                            value={pageSize}
                            onChange={e => {
                                // When changing page size, go back to the first page
                                handlePagination(1, Number(e.target.value));
                            }}
                            className="bg-gray-200 border border-gray-600 px-2 py-1 focus:outline-none focus:border-gray-400 transition"
                        >
                            {[2, 10, 15, 20, 25].map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Page Navigation Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-3 py-1 border border-gray-600 rounded-sm disabled:opacity-30 hover:border-gray-400 hover:text-gray-300 transition-colors tracking-widest"
                        >
                            ← PREV
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-3 py-1 border border-gray-600 rounded-sm disabled:opacity-30 hover:border-gray-400 hover:text-gray-300 transition-colors tracking-widest"
                        >
                            NEXT →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationTable;