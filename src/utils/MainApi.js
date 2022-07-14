export class MainApi {
    constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
}

_getResponseData(response) {
    return response.then((res, req) => {
        if (res.ok) {
        return res.json();
        }
        if (res.status === 409 || res.status === 404 || res.status === 400) {
            return Promise.reject({
            status: res.status,
            text: res.statusText,
            });
        }
        return Promise.reject(
            new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`)
        );
    });
    }

createMovie(data) {
    const token = localStorage.getItem("token");
    return this._getResponseData(
        fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: data.image,
            trailer: data.trailer,
            thumbnail: data.image,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
        }),
        })
    );
    }
}

const mainApi = new MainApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    },
});

export default mainApi;