import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { routesConfig } from "./routesConfig";
import Loader from "../components/atoms/Loader/Loader";

export const AppRouter = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                {routesConfig.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
