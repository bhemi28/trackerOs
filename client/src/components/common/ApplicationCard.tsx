import { useEffect, useMemo, useState } from "react";
import type { IApplicationStatus } from "../../types/application.type";

const cardColorMap: Record<number, string> = {
    0: "var(--pastel-pink)",
    1: "var(--pastel-blue)",
    2: "var(--pastel-green)",
    3: "var(--pastel-purple)",
    4: "var(--pastel-yellow)",
}

const ApplicationCard = ({companyName, jobTitle, status}: {companyName: string; jobTitle: string; status: IApplicationStatus;}) => {
    
    // useMemo to keep same color across re-renders
    const cardColor = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * 5);
        return cardColorMap[randomIndex];
    }, []);

    return (
        <div
            style={{ backgroundColor: cardColor }}
            className={` p-4 retro-window retro-tile transition-all cursor-pointer flex flex-col h-48 w-64 retro-window retro-tile`}>
            <div className="flex justify-between items-start mb-2">
                {/*  TODO: replace with actual application ID */}
                <span className="text-[10px] font-mono font-bold bg-white px-1 border border-black">REF_002</span>
                <span className="material-symbols-outlined text-3xl">storage</span>
            </div>
            <div className="mt-auto">
                <h2 className="font-mono font-extrabold text-xl leading-none uppercase">{companyName}</h2>
                <p className="text-sm font-medium mt-1">{jobTitle}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-black/10 flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase">{status}</span>
                {/* TODO: replace with status indicator component */}
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-black"></div>
                    <div className="w-2 h-2 bg-black/20"></div>
                    <div className="w-2 h-2 bg-black/20"></div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationCard