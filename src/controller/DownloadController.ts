import { Downloader } from './Downloader';

export class DownloadController {
    private readonly downloader: Downloader;

    constructor(downloader: Downloader) {
        this.downloader = downloader;
    }

    public fetch(url: string): Promise<string> {
        return this.downloader.fetch(url);
    }
}
