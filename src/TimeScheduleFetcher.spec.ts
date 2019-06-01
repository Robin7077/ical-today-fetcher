import { TimeScheduleFetcher } from './TimeScheduleFetcher';
import { TimeScheduler } from './model/TimeScheduler';
import { AxiosDownloader } from './controller/AxiosDownloader';
import { TimeSchedulerController } from './controller/TimeSchedulerController';
jest.mock('./model/TimeScheduler');
jest.mock('./controller/AxiosDownloader');
jest.mock('./controller/TimeSchedulerController');

describe('TimeScheduleFetcher', () => {
    let fetcher: TimeScheduleFetcher;
    beforeEach(() => {
        jest.clearAllMocks();
        fetcher = new TimeScheduleFetcher();
    });

    it('should be defined', () => {
        expect(TimeScheduleFetcher).toBeDefined();
    });

    it('should create TimeScheduler in constructor', () => {
        jest.clearAllMocks();
        const fetcher = new TimeScheduleFetcher();
        expect(TimeScheduler).toHaveBeenCalledTimes(1);
    });

    it('should define addTimeScheduler', () => {
        expect(fetcher.addTimeScheduler).toBeDefined();
    });

    it('addTimeScheduler should add element "Test" to timeScheduler', () => {
        const timeScheduler = (TimeScheduler as jest.Mock<TimeScheduler>).mock.instances[0];
        jest.spyOn(timeScheduler, 'addElement').mockImplementation(() => {});
        const name = 'Test';
        const url = 'abc';
        fetcher.addTimeScheduler(name, url);
        expect(TimeScheduler).toHaveBeenCalledTimes(1);
        expect(timeScheduler.addElement).toHaveBeenCalledTimes(1);
        expect(timeScheduler.addElement).toHaveBeenCalledWith(name, url);
    });

    it('addTimeScheduler should add element "Test" to timeScheduler', () => {
        const timeScheduler = (TimeScheduler as jest.Mock<TimeScheduler>).mock.instances[0];
        jest.spyOn(timeScheduler, 'addElement').mockImplementation(() => {});
        const name = 'Banana';
        const url = 'https://test-test.test';
        fetcher.addTimeScheduler(name, url);
        expect(TimeScheduler).toHaveBeenCalledTimes(1);
        expect(timeScheduler.addElement).toHaveBeenCalledTimes(1);
        expect(timeScheduler.addElement).toHaveBeenCalledWith(name, url);
    });

    it('should define fetchSchedule', () => {
        expect(fetcher.fetchSchedule).toBeDefined();
    });

    it('fetchSchedule should create TimeScheduleController with timeSchedule and AxiosDownloader', async () => {
        await fetcher.fetchSchedule();
        const timeScheduler = (TimeScheduler as jest.Mock<TimeScheduler>).mock.instances[0];
        expect(TimeScheduler).toHaveBeenCalledTimes(1);
        expect(AxiosDownloader).toHaveBeenCalledTimes(1);
        const downloader = (AxiosDownloader as jest.Mock<AxiosDownloader>).mock.instances[0];
        expect(TimeSchedulerController).toHaveBeenCalledTimes(1);
        expect(TimeSchedulerController).toHaveBeenCalledWith(timeScheduler, downloader);
    });

    it('fetchSchedule should return timeSchedulerController.fetchSchedule', async () => {
        const testResult = {test: 'Test', test2: () => {}};
        const fetchSchedule = jest.fn(async () => testResult);
        (TimeSchedulerController as jest.Mock<TimeSchedulerController>).mockImplementation(() => ({
            fetchSchedule
        }) as any);
        expect(await fetcher.fetchSchedule()).toStrictEqual(testResult);
        expect(fetchSchedule).toHaveBeenCalledTimes(1);
    });
});
