import { BASE_URL } from "../App";
import { validateResponse } from "./validateResponse";

export function logout(): Promise<void> {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "accept": "application/json",            
        }        
    })
        .then(validateResponse)
        .then(() => undefined)
}