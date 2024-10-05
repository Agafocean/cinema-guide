import { validateResponse } from "./validateResponse";

interface Filter {
    count?: number,
    page?: number,
    title?: string,
    genre?: string
}

export function fetchFiltered(filter: Filter): Promise<any> {
    let param = "";
    if (filter.count) param = param + `count=${filter.count}&`;
    if (filter.page) param = param + `page=${filter.page}&`;
    if (filter.title) param = param + `title=${filter.title}&`;
    if (filter.genre) param = param + `genre=${filter.genre}&`;

    return fetch(`https://cinemaguide.skillbox.cc/movie?${param}`)
        .then(validateResponse)
        .then(response => response.json())
}