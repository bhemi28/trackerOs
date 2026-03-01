import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axios.service";
import type { IApplication, ICreateApplicationFormData, IGetAllFilteredApplicationsParams } from "../../types/application.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// the thunk method here .. but we will be using RTK queries instead for better performance and caching.
export const fetchApplications = createAsyncThunk(
    "applications/fetchAll",
    async () => {
        const response = await axiosClient.get("/application");
        return response.data as IApplication[];
    }
);

export const createApplication = createAsyncThunk(
    "applications/create",
    async (applicationData: ICreateApplicationFormData) => {
        const response = await axiosClient.post("/application", applicationData);
        return response.data as IApplication;
    }
);

// using RTK queries now:
export const fetchApplicationsRTK = createApi({
    reducerPath: "applicationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    tagTypes: ["Applications"],
    endpoints: (builder) => ({
        getApplications: builder.query<{data: IApplication[], total: number}, IGetAllFilteredApplicationsParams>({
            query: (query) => ({
                url: "application",
                params: query
            }),
            providesTags: (result) =>
                result ? [...result.data.map(({ _id }) => ({ type: "Applications" as const, id: _id })), { type: "Applications", id: "LIST" }] : [{ type: "Applications", id: "LIST" }],
        }),
        createApplication: builder.mutation<IApplication, ICreateApplicationFormData>({
            query: (applicationData) => ({
                url: "application",
                method: "POST",
                body: applicationData,
            }),
            invalidatesTags: (_, error) => (error ? [] : [{ type: "Applications", id: "LIST" }]), // when a new application is created successfully, it will invalidate the "LIST" tag which will trigger a refetch of the applications list, ensuring that the UI is always up to date with the latest data.
        })
    })
});

export const { useGetApplicationsQuery, useCreateApplicationMutation } = fetchApplicationsRTK;