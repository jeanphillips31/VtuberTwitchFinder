import {api, updateApiHeaders} from "./api"
import axios from "axios";

export async function fetchStreams(): Promise<StreamerInfo[]> {
    let queryString =
        'https://id.twitch.tv/oauth2/token?client_id=' +
        process.env.NEXT_PUBLIC_CLIENT_ID +
        '&client_secret=' +
        process.env.NEXT_PUBLIC_CLIENT_SECRET +
        '&grant_type=client_credentials'
    console.info(queryString);
    const auth = await axios.post(queryString).then((response) => {
        return response.data.access_token as string;
    })

    updateApiHeaders(auth)
    const data: Promise<StreamerInfo[]> = api.get("https://api.twitch.tv/helix/streams",)
        .then((response) => {
            let list: StreamerInfo[] = [];
            const queryResults = response.data.json();
            for (let result of queryResults.results) {
                if (result.tags.contains("Vtuber")) {
                    list.push(new StreamerInfo(result.id, result.user_name, result.title, result.game_name, result.viewer_count, result.thumbnail_url))
                }
            }
            return list;
        })
        .catch(function (err) {
            console.info(err);
            return [];
        })

    return data;
}