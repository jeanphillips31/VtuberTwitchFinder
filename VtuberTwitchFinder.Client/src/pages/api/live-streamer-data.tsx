class StreamerInfo {
    id: string;
    name: string;
    username: string;
    streamTitle: string;
    gameName: string;
    viewerCount: number;
    thumbnailURL: string;

    constructor(id: string, name: string, username: string, streamTitle: string, gameName: string, viewerCount: number, thumbnailURL: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.streamTitle = streamTitle;
        this.gameName = gameName;
        this.viewerCount = viewerCount;
        this.thumbnailURL = thumbnailURL;
    }
}