import { BASE_URL } from "../App";
import { IMovie } from "../pages/Movie/iMovie";
import { validateResponse } from "./validateResponse";

export function fetchMovie(id: number): Promise<IMovie> {
    return fetch(`${BASE_URL}/movie/${id}`)
        .then(validateResponse)
        .then(response => response.json())
}