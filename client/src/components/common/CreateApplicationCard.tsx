import { useApplications } from "../../hooks/application.hook";

const CreateApplicationCard = () => {

    const { handleToggleForm } = useApplications();

    return (
        <button
            className="p-4 transition-all cursor-pointer flex flex-col h-48 w-64 justify-center items-center gap-2 border border-dashed border-gray-400 border-3 bg-white/30 backdrop-blur-[2px] hover:scale-101 hover:bg-white/50"
            onClick={() => handleToggleForm()}
        >
            <span className="material-symbols-outlined opacity-70">add_circle</span>
            <p className="text-sm font-medium opacity-50">NEW_ENTRY.EXE</p>
        </button>
    )
}

export default CreateApplicationCard