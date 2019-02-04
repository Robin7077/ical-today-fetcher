import { AxiosDownloader } from './AxiosDownloader';
import { DownloadController } from './DownloadController';

describe('DownloadControllerTest', () => {
    let downloader = new AxiosDownloader();
    beforeEach(() => {
        jest.clearAllMocks();
        downloader = new AxiosDownloader();
    });

    it('CreateDownloadControler', () => {
        const downloadController = new DownloadController(downloader);
    });

    it('DownloadFile', async () => {
        const file = {test: 'test', test2: () => {}};
        jest.spyOn(downloader, 'fetch').mockReturnValue(file);
        const downloadController = new DownloadController(downloader);
        const uri = 'https://abcde.abcde';
        expect(await downloadController.fetch(uri)).toBe(file);
        expect(downloader.fetch).toHaveBeenCalledTimes(1);
        expect(downloader.fetch).toHaveBeenCalledWith(uri);
    });
});
