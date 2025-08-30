import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { movieStore } from "../../store/movieStore.js";
import { MovieCard } from "../movieCard/index.jsx";
import { colors } from "../../assets/constants.js";
import { MovieCardSkeleton } from "../movieCard/skeletonMovieCard/index.jsx";
import {Error} from "../error/index.jsx";

import styles from "./cardsContainer.module.css";



export const CardsContainer = observer(() => {
    const { error, isLoading, visibleMovies } = movieStore;

    useEffect(() => {
        movieStore.fetchMovies(1);
    }, []);

    if (error) {
        return <Error message={error}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.cardsWrapper}>
                {isLoading
                    ? Array.from({ length: 15 }).map((_, i) => <MovieCardSkeleton key={i} />)
                    : visibleMovies.map((movie, i) => <MovieCard key={movie.id} movie={movie} bgColor={colors[i % colors.length]}/>) }
            </div>
            <div className={styles.arrowWrapper} style={{ left: "20px" }} onClick={() => movieStore.prevPage()}>
                <i className={`${styles.arrow} ${styles.arrowLeft}`} />
            </div>
            <div className={styles.arrowWrapper} style={{ right: "20px" }} onClick={() => movieStore.nextPage()}>
                <i className={`${styles.arrow} ${styles.arrowRight}`} />
            </div>
        </div> );
});