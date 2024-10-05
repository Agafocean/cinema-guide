import { validateResponse } from "./validateResponse";

export function logout(): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
            "accept": "application/json",            
        }        
    })
        .then(validateResponse)
        .then(() => undefined)
}