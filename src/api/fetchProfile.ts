import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const ProfileSchema = z.object({
    email: z.string(),
    favorites: z.array(z.string()),
    name: z.string(),
    surname: z.string()
});

export type Profile = z.infer<typeof ProfileSchema>;

 export async function fetchProfile() {
    return await fetch("https://cinemaguide.skillbox.cc/profile", {
        method: "GET",
        credentials: "include",
        headers: {
            "accept": "application/json"
        }
    })      
        .then(validateResponse)
        .then(response => response.json())
        .then(data => ProfileSchema.parse(data))   
} 