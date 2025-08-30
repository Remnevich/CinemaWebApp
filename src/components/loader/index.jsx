import React from 'react';
import {ClipLoader} from "react-spinners";

import styles from "./loader.module.css";

export const Loader = ({isLoading}) => {
    return (
        <div className={`${styles.loader} ${isLoading ? styles.show : ''}`}>
            <ClipLoader color="#f2d6f7" size={50} />
        </div>
    );
};