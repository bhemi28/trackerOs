import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./global.store";

// custom hooks for typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
