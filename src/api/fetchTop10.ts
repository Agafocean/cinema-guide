import { BASE_URL } from "../App";
import { IMovie } from "../pages/Movie/iMovie";
import { validateResponse } from "./validateResponse";

export function fetchTop10(): Promise<IMovie[]> {
    return fetch(`${BASE_URL}/movie/top10`)
        .then(validateResponse)
        .then(response => response.json())     
}