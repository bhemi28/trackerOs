import { NavLink } from "react-router"

const routes = {
    dashboard: { path: "/", icon: "dashboard" },
    settings: { path: "/settings", icon: "settings" },
}

const Navbar = () => {
    return (
        <aside className=" p-2 border border-gray-700 border-2 m-2 flex flex-col items-center retro-window bg-white/30 backdrop-blur-[2px]">
            {/* // the terminal prop at the top of this whole navigation bar */}
            <div className="w-12 h-12 bg-black flex items-center justify-center retro-window retro-tile ">
                <span className="material-symbols-outlined text-white">terminal</span>
            </div>

            <hr className="my-4 border border-gray-700 w-full" />


            {/* // now we will use the navlinks to define the actual navigation items in the navbar, we will also use the "active" class to style the active link differently. */}
            <nav className="flex flex-col gap-4 justify-between h-full">

                <section>
                    {/* the main navigation paths */}
                    <NavLink
                        key="dashboard"
                        to={routes.dashboard.path}
                        className={({ isActive }) =>
                            `w-12 h-12 flex items-center justify-center retro-window retro-tile hover:brightness-95 text-[var(--border-color)] ${isActive ? "!bg-gray-700 text-white" : "text-gray-400 bg-white  "
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">{routes.dashboard.icon}</span>
                    </NavLink>
                </section>

                <section className="flex flex-col gap-4 justify-between">
                    <hr className="border border-gray-700 w-full" />
                    {/* the settings and profile */}
                    <NavLink
                        key="profile"
                        to="/profile"
                        className={({ isActive }) =>
                            `w-12 h-12 flex items-center justify-center retro-window retro-tile hover:brightness-95 text-[var(--border-color)] ${isActive ? "!bg-gray-700 text-white" : "text-gray-400 bg-white  "
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">for_you</span>
                    </NavLink>

                    <NavLink
                        key="settings"
                        to={routes.settings.path}
                        className={({ isActive }) =>
                            `w-12 h-12 flex items-center justify-center retro-window retro-tile hover:brightness-95 text-[var(--border-color)] ${isActive ? "!bg-gray-700 text-white" : "text-gray-400 bg-white  "
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">{routes.settings.icon}</span>
                    </NavLink>
                </section>
            </nav>
        </aside>
    )
}

export default Navbar