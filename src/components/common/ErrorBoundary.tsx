import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = (): void => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorBoundary}>
                    <h1 className={styles.errorBoundaryTitle}>Something went wrong 😓</h1>
                    <p className={styles.errorBoundaryDescription}>
                        Please try reloading the page.
                    </p>
                    <button
                        className={styles.errorBoundaryButton}
                        onClick={this.handleReload}
                    >
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
