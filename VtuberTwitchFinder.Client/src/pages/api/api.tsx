import axios from 'axios'

let authToken = ""

export var api = axios.create({
    headers: {
        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
        'Authorization': authToken
    }
})

export function updateApiHeaders(token: string) {
    authToken = token;
}