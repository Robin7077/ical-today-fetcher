import { Downloader } from './Downloader';
import axios from 'axios';

export class AxiosDownloader implements Downloader {
    async fetch(url: string): Promise<string> {
        const schedule = await axios.get(url);
        return schedule.data;
    }
}
