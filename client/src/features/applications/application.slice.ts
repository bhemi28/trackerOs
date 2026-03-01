import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IApplication, IApplicationStatus, ICreateApplicationFormData } from "../../types/application.type";
import { createApplication, fetchApplications } from "./application.thunk";

interface IApplicationsState {
    // main data
    applications: IApplication[];
    // basic ui states
    loading: boolean;
    error: string | null;
    // search and filter bar
    searchQuery: string;
    isFormOpen: boolean;
    filterStatus: IApplicationStatus | 'all';

    // view state
    view: 'list' | 'grid';

    // application form:
    formData: ICreateApplicationFormData | null;

    // pagination
    page: number;
    pageSize: number;
}

const initialApplicationState: IApplicationsState = {
    applications: [],
    loading: false,
    error: null,
    searchQuery: '',
    isFormOpen: false,
    filterStatus: 'all',
    view: 'grid',
    formData: null,
    page: 1,
    pageSize: 10,
};

// now creating a slice:
const applicationSlice = createSlice({
    name: 'applications',
    initialState: initialApplicationState,
    reducers: {
        //toggle form
        toggleForm(state) {
            state.isFormOpen = !state.isFormOpen;
        },
        //toggle view
        toggleViewMode(state) {
            state.view = state.view === 'grid' ? 'list' : 'grid';
        },
        // set search query
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        // set filter status
        setFilterStatus(state, action: PayloadAction<IApplicationStatus | 'all'>) {
            state.filterStatus = action.payload;
        },
        // set pagination
        setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
        }
    },
    extraReducers: (builder) => {
        // the async thunks defined inside the application thunks file will be handled here, and we can update the state based on the pending, fulfilled, and rejected states of those thunks.
        builder
        // thunks for fetchApplications
        .addCase(fetchApplications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<IApplication[]>) => {
            state.loading = false;
            state.applications = action.payload;
        })
        .addCase(fetchApplications.rejected, (state, action) => {
            state.loading = false;
            state.applications = [];
            state.error = action.error.message || 'Failed to fetch applications';
        })
        // create thunk
        .addCase(createApplication.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createApplication.fulfilled, (state    ) => {
            state.loading = false;
            state.isFormOpen = false;
        })
        .addCase(createApplication.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create application';
        });
    },
    selectors: {
        // so these will provide a way to select specific pieces of state from the applications slice when we use the useSelector hook in our components.
        selectApplications: (state) => state.applications,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
        selectSearchQuery: (state) => state.searchQuery,
        selectIsFormOpen: (state) => state.isFormOpen,
        selectFilterStatus: (state) => state.filterStatus,
        selectView: (state) => state.view,
        getPageNo: (state) => state.page,
        getPageSize: (state) => state.pageSize,
    }
});

export const { toggleForm, toggleViewMode, setSearchQuery, setFilterStatus, setPagination } = applicationSlice.actions;

export const { selectApplications, selectLoading, selectError, selectSearchQuery, selectIsFormOpen, selectFilterStatus, selectView, getPageNo, getPageSize } = applicationSlice.selectors;

export const applicationReducer = applicationSlice.reducer;