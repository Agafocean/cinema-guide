import { BASE_URL } from "../App";
import { IMovie } from "../pages/Movie/iMovie";
import { validateResponse } from "./validateResponse";

interface Filter {
    count?: number,
    page?: number,
    title?: string,
    genre?: string
}

export function fetchFiltered(filter: Filter): Promise<IMovie[]> {
    let param = "";
    if (filter.count) param = param + `count=${filter.count}&`;
    if (filter.page) param = param + `page=${filter.page}&`;
    if (filter.title) param = param + `title=${filter.title}&`;
    if (filter.genre) param = param + `genre=${filter.genre}&`;

    return fetch(`${BASE_URL}/movie?${param}`)
        .then(validateResponse)
        .then(response => response.json())
}