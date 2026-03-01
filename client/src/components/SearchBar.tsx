import { useApplications } from "../hooks/application.hook";
import type { IApplicationStatus } from "../types/application.type";

const SearchBar = () => {

    const { handleDebouncedSearch, handleFilterChange } = useApplications();

    return (
        <div
            className="bg-white/50 backdrop-blur-sm border-b-2 border-[var(--border-color)] px-8 py-4 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px] p-2 retro-window retro-tile">
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm pointer-events-none">search</span>
                <input className="retro-input w-full pl-10 focus:outline-none" placeholder="SEARCH_DATABASE..." type="text" onChange={(e) => handleDebouncedSearch(e.target.value)} />
            </div>
            <div className="relative retro-window retro-tile p-2">
                <select className="retro-select pr-10 appearance-none" defaultValue="" onChange={(e) => handleFilterChange(e.target.value as IApplicationStatus | 'all')}>
                    <option value="">FILTER_BY_STATUS</option>
                    <option className="border-1" value="applied">APPLIED</option>
                    <option className="border-1" value="interviewing">INTERVIEWING</option>
                    <option className="border-1" value="offer">OFFER_RECEIVED</option>
                    <option className="border-1" value="rejected">REJECTED</option>
                </select>
                <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm pointer-events-none ">expand_more</span>
            </div>
            <button
                className="retro-window retro-tile p-2 text-black bg-[var(--pastel-search)] px-4 py-2 font-mono text-sm border-2 border-black active:translate-y-0.5 active:translate-x-0.5 transition-transform flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                RUN_QUERY
            </button>
        </div>
    )
}

export default SearchBar