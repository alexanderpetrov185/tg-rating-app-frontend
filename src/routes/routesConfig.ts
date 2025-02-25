import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const BotPage = lazy(() => import("../pages/BotPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routesConfig = [
    { path: "/", element: HomePage },
    { path: "/bot/:id", element: BotPage },
    { path: "*", element: NotFoundPage }
];