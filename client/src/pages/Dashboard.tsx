import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useApplications } from '../hooks/application.hook'
import ApplicationCard from '../components/common/ApplicationCard'
import SearchBar from '../components/SearchBar'
import CreateApplicationCard from '../components/common/CreateApplicationCard'
import CreateApplicationForm from '../components/ui/CreateApplicationForm'

const Dashboard = () => {

    const { applications, isFormOpen } = useApplications();

    return (
        <>
            <main className='min-h-screen flex flex-col'>
                {isFormOpen && <CreateApplicationForm />}

                <Header pageName="APPLICATIONS" />
                <div className='grid-bg h-full w-full'></div>
                <SearchBar />
                <div className="p-8 flex gap-6 flex-wrap">
                    {applications?.map(app => (
                        <ApplicationCard key={app._id} companyName={app.companyName} jobTitle={app.position} status={app.status} />
                    ))}
                    <CreateApplicationCard />
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Dashboard