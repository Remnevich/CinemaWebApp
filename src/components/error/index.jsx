import React from 'react';
import styles from './error.module.css';

export const Error = ({ message = "Приносим свои извинения. Сервис находится на обслуживании." }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h2 className={styles.errorTitle}>Упс! Что-то пошло не так</h2>
                <p className={styles.errorMessage}>{message}</p>
                <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                >
                    Попробовать снова
                </button>
            </div>
        </div>
    );
};