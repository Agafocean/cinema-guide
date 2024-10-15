import { BASE_URL } from "../App";
import { validateResponse } from "./validateResponse";

export function login(email: string, password: string): Promise<void> {
    return fetch(`${BASE_URL}/auth/login`, {
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