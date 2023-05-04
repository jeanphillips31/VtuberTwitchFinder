import axios from 'axios'

let TwitchApi = axios.create({
    headers: {
        'Client-ID': process.env.CLIENT_ID,
    }
})

export default TwitchApi