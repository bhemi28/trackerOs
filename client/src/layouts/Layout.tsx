import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import { useApplications } from '../hooks/application.hook'
import CreateApplicationForm from '../components/ui/CreateApplicationForm'
import Navbar from '../components/ui/Navbar'
import { Outlet, useLocation } from 'react-router'

const Layout = () => {
    // const { view } = useApplications();

    const { isFormOpen, total } = useApplications();
    const location = useLocation();


    return (
        <>
        <div className='flex h-screen w-full'>
            <Navbar />
            <main className='min-h-screen flex flex-col w-screen'>
                {isFormOpen && <CreateApplicationForm />}

                <Header pageName={location.pathname.toString() === "/" ? "APPLICATIONS" : location.pathname.toUpperCase()} totalCount={total} />

                <div className='grid-bg h-full w-full'></div>
                
                {/* the route endpoint components will render here1 */}
                <Outlet />
                
                <Footer />
            </main>
        </div>
        </>
    )
}

export default Layout;