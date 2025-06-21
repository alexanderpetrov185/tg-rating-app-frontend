import React from 'react'
import styles from './ValidationError.module.scss'

interface ValidationErrorProps {
    error: string;
    visible: boolean;
}

export default function ValidationError({error, visible}: ValidationErrorProps) {
    if (!visible) return <div className={styles.errorContainer}></div> //Возвращаем пустой див чтобы было место под блок ошибки

    return (
        <div className={`${styles.errorContainer} ${!!error ? styles.errorContainerVisible : styles.errorContainerHide}`}>
            <p className={styles.errorMessage}>{error}</p>
        </div>
    )
}
