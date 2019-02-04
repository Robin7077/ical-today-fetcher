export interface Downloader {
    fetch(url: string): Promise<string>;
}
