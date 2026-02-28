const Header = ({pageName}: {pageName: string}) => {
  return (
    <>
        <header className="h-14 bg-white border-b-2 border-[var(--border-color)] flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <h1 className="font-mono font-bold text-lg tracking-tighter">TRACKER_OS // {pageName}</h1>
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono">V 2.0.4-STABLE</span>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>SYSTEM_ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">database</span>
                    <span>128_ENTRIES</span>
                </div>
                <div className="bg-black text-white px-3 py-1">
                    14:42:01
                </div>
            </div>
        </header>
    </>
  )
}

export default Header