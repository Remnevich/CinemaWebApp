import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const API_BASE_URL = 'https://api-test.rtbpanda.tech';

class MovieStore {
    moviesByPage = {};
    visibleMovies = [];
    isLoading = false;
    error = null;
    page = 1;
    pageSize = 15;
    maxCount = null;
    maxPage = null;

    constructor() {
        makeAutoObservable(this);
    }

    setPage = async (newPage) => {
        if (this.moviesByPage[newPage]) {
            this.visibleMovies = this.moviesByPage[newPage];
            this.page = newPage;
            return;
        }

        if (this.maxPage !== null && newPage > this.maxPage) {
            return;
        }

        if (newPage < 1) {
            return;
        }

        await this.fetchMovies(newPage);
    }

    nextPage = async () => {
        const nextPage = this.page + 1;

        if (this.maxPage !== null && nextPage > this.maxPage) {
            await this.setPage(1);
        } else {
            await this.setPage(nextPage);
        }
    }

    prevPage = async () => {
        const prevPage = this.page - 1;

        if (prevPage < 1) {
            await this.setPage(this.maxPage || 1);
        } else {
            await this.setPage(prevPage);
        }
    }

    fetchMovies = async (page) => {
        if (this.moviesByPage[page]) {
            this.visibleMovies = this.moviesByPage[page];
            this.page = page;
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            const response = await axios.get(`${API_BASE_URL}/list`, {
                params: { page, pageSize: this.pageSize },
            });

            runInAction(() => {
                const newMovies = response.data.data;
                const { count } = response.data.meta;

                this.maxCount = count;
                this.maxPage = Math.ceil(count / this.pageSize);

                if (newMovies.length > 0) {
                    this.moviesByPage[page] = newMovies;
                    this.visibleMovies = newMovies;
                    this.page = page;
                }

                this.isLoading = false;
            });

        } catch (error) {
            runInAction(() => {
                if (error.response?.status >= 500) {
                    this.error = 'Ошибка сервера. Пожалуйста, попробуйте позже';
                } else if (error.response?.status === 404) {
                    this.error = 'Сервис временно недоступен';
                } else if (error.response?.status === 403) {
                    this.error = 'Доступ запрещен';
                } else {
                    this.error = 'Произошла ошибка при загрузке данных';
                }

                this.isLoading = false;
                console.error('Fetch error:', error);
            });
        }
    }
}

export const movieStore = new MovieStore();