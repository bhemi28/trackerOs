import { useEffect, useRef } from 'react';
import { getPageSize, getPageNo, selectError, selectFilterStatus, selectIsFormOpen, selectLoading, selectSearchQuery, selectView, setFilterStatus, setSearchQuery, toggleForm, toggleViewMode, setPagination } from '../features/applications/application.slice';
import { useAppDispatch, useAppSelector } from '../store/store.hooks';
import { fetchApplications, useCreateApplicationMutation, useGetApplicationsQuery } from '../features/applications/application.thunk';
import type { ICreateApplicationFormData } from '../types/application.type';
import { showToast } from '../utils/toast.util';

export const useApplications = () => {

    const dispatch = useAppDispatch();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Selectors to get applications, loading state, and error from the Redux store
    // const applications = useAppSelector(selectApplications);
    const isLoading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const view = useAppSelector(selectView);
    const searchQuery = useAppSelector(selectSearchQuery);
    const filterStatus = useAppSelector(selectFilterStatus);
    const isFormOpen = useAppSelector(selectIsFormOpen);
    const page = useAppSelector(getPageNo);
    const pageSize = useAppSelector(getPageSize);

    // fetch applications when the component mounts
    // useEffect(() => {
    //     dispatch(fetchApplications());
    // }, [dispatch]);

    // instead use the RTK created:
    // will automatically fetch applications based on the query params (status, companyName, page, pageSize) and will update the cache accordingly, so we don't need to manually refetch after creating a new application, as the cache will be updated automatically when the mutation is successful.
    const { data: applications, isLoading: isLoadingRTK, error: errorRTK } = useGetApplicationsQuery({
        status: filterStatus,
        companyName: searchQuery,
        page,
        pageSize,
    });

    // different available actions:
    const handleToggleForm = () => {
        dispatch(toggleForm());
    };

    const handleToggleView = () => {
        dispatch(toggleViewMode());
    };

    const refetch = () => {
        dispatch(fetchApplications());
    };

    // search and filter actions, will change after making use of RTK query, as it will be handled by the query params:
    const handleSearch = (query: string) => {
        dispatch(setSearchQuery(query));
    };

    const handleFilterChange = (status: typeof filterStatus) => {
        dispatch(setFilterStatus(status));
    };

    // now we will handle the form submit using RTK mutation, so we will not need to dispatch any action here, as the mutation will handle the API call and update the cache automatically.
    const [createApplication] = useCreateApplicationMutation();

    const handleCreateApplication = async (applicationData: ICreateApplicationFormData) => {
        try {
            await createApplication(applicationData).unwrap();
            // No need to manually refetch, as the mutation invalidates the "Applications" tag which will trigger a refetch of the applications list.
            // if successfull, close the form:
            dispatch(toggleForm());
        } catch (error) {
            console.error("Failed to create application:", error);
            // Handle error (e.g., show notification)
            showToast(400,"Failed to create application. Please try again.", "error");
        }
    };

    const handlePagination = (page: number, pageSize: number) => {
        dispatch(setPagination({ page, pageSize }));
    };

    const handleDebouncedSearch = (query: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            handleSearch(query);
        }, 500);
    };

    return {
        applications: applications?.data || [], // return an empty array if applications is undefined
        isLoading,
        isLoadingRTK,
        errorRTK,
        error,
        view,
        searchQuery,
        filterStatus,
        isFormOpen,
        handleToggleForm,
        handleToggleView,
        refetch,
        handleSearch,
        handleFilterChange,
        handleCreateApplication,
        handlePagination,
        handleDebouncedSearch
    };
};