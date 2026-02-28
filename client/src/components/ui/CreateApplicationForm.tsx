import { useApplications } from "../../hooks/application.hook";
import {useForm} from "react-hook-form"
import type { IApplicationStatus, ICreateApplicationFormData } from "../../types/application.type";

const LOCATION_TYPES = ['remote', 'onsite', 'hybrid'] as const;

const APPLICATION_STATUSES: IApplicationStatus[] = [
    'applied',
    'screening',
    'technical',
    'manager',
    'hr',
    'offer',
    'rejected',
    'ghosted',
];

const ApplicationForm = () => {

    const { handleToggleForm, handleCreateApplication } = useApplications();
    const {register, handleSubmit, formState: { errors }} = useForm<ICreateApplicationFormData>();

    return (
        // Backdrop
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* Modal */}
            <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_#1a1a1a] w-full max-w-lg mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-[var(--pastel-yellow)]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">edit_document</span>
                        <h2 className="font-mono font-bold text-sm uppercase">New_Application.exe</h2>
                    </div>
                    <button onClick={handleToggleForm} className="w-6 h-6 bg-white border border-black flex items-center justify-center hover:bg-red-400 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                {/* Form Body */}
                <form 
                onSubmit={handleSubmit(handleCreateApplication)}
                className="p-6 space-y-4">
                    {/* Company Name */}
                    <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase">
                            Company_Name *
                        </label>
                        <input
                        {...register("companyName", { required: "Company name is required" })}
                            type="text"
                            placeholder="Enter company name..."
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow"
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-xs">{errors.companyName.message}</p>
                        )}
                    </div>

                    {/* Position */}
                    <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase">
                            Position *
                        </label>
                        <input
                            {...register("position", { required: "Position is required" })}
                            type="text"
                            placeholder="Enter job position..."
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow"
                        />
                        {errors.position && (
                            <p className="text-red-500 text-xs">{errors.position.message}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase">
                            Location *
                        </label>
                        <input
                            {...register("location", { required: "Location is required" })}
                            type="text"
                            placeholder="City, Country..."
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-xs">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Location Type & Status Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Location Type */}
                        <div className="space-y-1">
                            <label className="block font-mono text-xs font-bold uppercase">
                                Location_Type *
                            </label>
                            <select 
                            {...register("locationType", { required: "Location type is required" })}
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow bg-white cursor-pointer">
                                <option value="">Select...</option>
                                {LOCATION_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.locationType && (
                                <p className="text-red-500 text-xs">{errors.locationType.message}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="space-y-1">
                            <label className="block font-mono text-xs font-bold uppercase">
                                Status *
                            </label>
                            <select 
                            {...register("status", { required: "Status is required" })}
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow bg-white cursor-pointer">
                                <option value="">Select...</option>
                                {APPLICATION_STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.status && (
                                <p className="text-red-500 text-xs">{errors.status.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Application Date */}
                    <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase">
                            Application_Date *
                        </label>
                        <input
                            {...register("applicationDate", { required: "Application date is required" })}
                            type="date"
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow cursor-pointer"
                        />
                        {errors.applicationDate && (
                            <p className="text-red-500 text-xs">{errors.applicationDate.message}</p>
                        )}
                    </div>

                    {/* Job URL */}
                    <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase">
                            Job_URL *
                        </label>
                        <input
                            {...register("jobURL", { required: "Job URL is required" })}
                            type="url"
                            placeholder="https://..."
                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0px_0px_#1a1a1a] transition-shadow"
                        />
                        {errors.jobURL && (
                            <p className="text-red-500 text-xs">{errors.jobURL.message}</p>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-black/20">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 border-2 border-black font-mono text-sm font-bold uppercase bg-white hover:bg-gray-100 shadow-[3px_3px_0px_0px_#1a1a1a] hover:shadow-[1px_1px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            onClick={handleToggleForm}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 border-2 border-black font-mono text-sm font-bold uppercase bg-[var(--pastel-green)] hover:bg-green-300 shadow-[3px_3px_0px_0px_#1a1a1a] hover:shadow-[1px_1px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;