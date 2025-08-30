import React from 'react';

import styles from './movieCard.module.css';

export const MovieCard = ({movie, bgColor}) => {
    const { title, imgUrl, date, id, message } = movie;
    const [datePart, timePart] = date.split('T');
    const [time] = timePart.split('.');

    return (
        <div className={styles.cardWrapper} id={id} style={{ backgroundColor: bgColor }}>
            <div className={styles.content}>
                {imgUrl
                    ? <img src={imgUrl} className={styles.poster} alt="Movie Poster"/>
                    : <div className={styles.noImg}/>
                }
                <div className={styles.title}>{title}</div>
                <div className={styles.message}>{message}</div>
            </div>
            <div className={styles.timeStamp}>
                <div>Date: {datePart}</div>
                <div>Time: {time}</div>
            </div>
        </div>
    );
};