class StreamerInfo {
    id: string;
    name: string;
    streamTitle: string;
    gameName: string;
    viewerCount: number;
    thumbnailURL: string;

    constructor(id: string, name: string, streamTitle: string, gameName: string, viewerCount: number, thumbnailURL: string) {
        this.id = id;
        this.name = name;
        this.streamTitle = streamTitle;
        this.gameName = gameName;
        this.viewerCount = viewerCount;
        this.thumbnailURL = thumbnailURL;
    }
}