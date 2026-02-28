const Footer = () => {
    return (
        <>
            <footer
                className="h-10 mt-auto bg-white border-t-2 border-[var(--border-color)] flex items-center justify-between px-4 font-mono text-[10px]">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-black"></span> CORE_INIT</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-black"></span> MEM_OK</span>
                </div>
                <div className="flex gap-4">
                    <span>DISK: 742GB FREE</span>
                    <span>CPU_LOAD: 12%</span>
                    <span className="text-blue-600 font-bold uppercase underline cursor-pointer">System_Update_Ready</span>
                </div>
            </footer>
        </>
    )
}

export default Footer