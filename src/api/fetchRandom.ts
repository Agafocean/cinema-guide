import { BASE_URL } from "../App";
import { IMovie } from "../pages/Movie/iMovie";
import { validateResponse } from "./validateResponse";

export function fetchRandom(): Promise<IMovie> {
    return fetch(`${BASE_URL}/movie/random`)
        .then(validateResponse)
        .then(response => response.json())
}