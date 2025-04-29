import { lazy } from "react";

const HomePage = lazy(() => import("../features/home/HomePage"));
const BotPage = lazy(() => import("../features/bots/BotPage"));
const NotFoundPage = lazy(() => import("../features/notFound/NotFoundPage"));

export const routesConfig = [
    { path: "/", element: HomePage },
    { path: "/bot/:id", element: BotPage },
    { path: "*", element: NotFoundPage }
];