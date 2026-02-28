import { configureStore } from "@reduxjs/toolkit";
import { applicationReducer } from "../features/applications/application.slice";
import { fetchApplicationsRTK } from "../features/applications/application.thunk";

export const store = configureStore({
    reducer: {
        [fetchApplicationsRTK.reducerPath]: fetchApplicationsRTK.reducer,
        applications: applicationReducer,  // ✅ Named key, not spread
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fetchApplicationsRTK.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

