import React from "react";
import AppRouter from './routes/AppRouter';
import './styles/global.scss';
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => (
    <ErrorBoundary>
        <AppRouter />
    </ErrorBoundary>
);

export default App;