import { Storage } from "./Storage.js";

const storage = Storage.getInstance();
export async function signin(login) {
    const API_URL = storage.apiUrl;
    const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    });
    return res.json();
}