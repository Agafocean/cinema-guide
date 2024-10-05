import { validateResponse } from "./validateResponse";

export function fetchMovie(id: number): Promise<any> {
    return fetch(`https://cinemaguide.skillbox.cc/movie/${id}`)
        .then(validateResponse)
        .then(response => response.json())
}