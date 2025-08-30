import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './skeletonMovieCard.module.css';

export const MovieCardSkeleton = () => (
    <div className={styles.cardWrapper}>
        <Skeleton className={styles.skeletonPoster} />
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonMessage} count={3} style={{ marginBottom: 10 }} />
        <Skeleton className={styles.skeletonTimeStamp} />
    </div>
);