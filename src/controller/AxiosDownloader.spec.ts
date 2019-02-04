import { AxiosDownloader } from './AxiosDownloader';
import axios from 'axios';

describe('Downloader', () => {
    let downloader: AxiosDownloader;
    beforeEach(() => {
        jest.clearAllMocks();
        downloader = new AxiosDownloader();
    });

    it('should be defined', () => {
        expect(AxiosDownloader).toBeDefined();
    });

    it('should define fetch', () => {
        expect(downloader.fetch).toBeDefined();
    });

    it('should call axios.get with parameter "Hallo Test"', async () => {
        const result = {
            data: 'Hallo Test'
        };
        jest.spyOn(axios, 'get').mockReturnValue(result);
        const uri = 'https://sajfkjfklasdjf';
        expect(await downloader.fetch(uri)).toBe(result.data);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(uri);
    });

    it('should call axios.get with parameter "paramter"', async () => {
        const result = {
            data: 'paramter'
        };
        jest.spyOn(axios, 'get').mockReturnValue(result);
        const uri = 'http://abcde.local';
        expect(await downloader.fetch(uri)).toBe(result.data);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(uri);
    });
});
