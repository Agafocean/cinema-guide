import { validateResponse } from "./validateResponse";

export function login(email: string, password: string): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&password=${password}`
    })
        .then(validateResponse)
        .then(() => undefined)
}