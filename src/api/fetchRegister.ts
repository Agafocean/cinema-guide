import { validateResponse } from "./validateResponse";

export function register(email: string, name: string, surname: string, password: string): Promise<void> {
    return fetch("https://cinemaguide.skillbox.cc/user", {
        method: "POST",
     //   credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&password=${password}&name=${name}&surname=${surname}`
    })
        .then(validateResponse)
        .then(() => undefined)
}