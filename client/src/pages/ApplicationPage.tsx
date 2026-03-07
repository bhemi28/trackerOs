import { useParams } from "react-router";

const ApplicationPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <h1>{id} of the application</h1>
        </>

    )
}

export default ApplicationPage