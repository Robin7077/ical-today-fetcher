const ICalExpander = require('ical-expander');
import { AxiosDownloader } from './AxiosDownloader';
import { TimeScheduler } from '../model/TimeScheduler';
import { TimeSchedulerController } from './TimeSchedulerController';
jest.mock('ical-expander');

describe('TimeSchedulerControllerTest', () => {
    const timeScheduler = new TimeScheduler();
    const uri = 'http://test.test';
    timeScheduler.addElement('Test', uri);

    let downloader: AxiosDownloader;
    beforeEach(() => {
        jest.clearAllMocks();
        downloader = new AxiosDownloader();
        jest.spyOn(downloader, 'fetch').mockImplementation(async () => '');
    });

    it('CreateTimeSchedulerController', () => {
        new TimeSchedulerController(timeScheduler, downloader);
    });

    it('GetTimeScheduleTodayRightOrder', async () => {
        const timeSchedulerController = new TimeSchedulerController(timeScheduler, downloader);
        const MockICalExpander = ICalExpander as jest.Mock;
        const between = jest.fn(() => ({
            events: [{
                startDate: getStartA(),
                endDate: getEndA(),
                summary: 'A'
            }, {
                startDate: getStartB(),
                endDate: getEndB(),
                summary: 'B'
            }],
            occurrences: []
        }));
        MockICalExpander.mockImplementation(() => ({
            between
        }));
        const expected = 'Test\n6:00 - 10:13: A\n18:00 - 19:01: B\n\n';
        expect(await timeSchedulerController.fetchSchedule()).toStrictEqual(expected);
        expect(downloader.fetch).toHaveBeenCalledTimes(1);
        expect(downloader.fetch).toHaveBeenCalledWith(uri);
    });

    it('GetTimeScheduleTodayWrongOrder', async () => {
        const timeSchedulerController = new TimeSchedulerController(timeScheduler, downloader);
        const MockICalExpander = ICalExpander as jest.Mock;
        const between = jest.fn(() => ({
            events: [],
            occurrences: [{
                startDate: getStartA(),
                endDate: getEndA(),
                item: {
                    summary: 'Abc'
                }
            }, {
                startDate: getStartB(),
                endDate: getEndB(),
                item: {
                    summary: 'Banana'
                }
            }]
        }));
        MockICalExpander.mockImplementation(() => ({
            between
        }));
        const expected = 'Test\n6:00 - 10:13: Abc\n18:00 - 19:01: Banana\n\n';
        expect(await timeSchedulerController.fetchSchedule()).toStrictEqual(expected);
    });

    it('fetchSchedule should skip empty schedules', async () => {
        const timeScheduler = new TimeScheduler();
        timeScheduler.addElement('Banana', uri);
        timeScheduler.addElement('Test', uri);
        const timeSchedulerController = new TimeSchedulerController(timeScheduler, downloader);
        const MockICalExpander = ICalExpander as jest.Mock;
        let calls = 0;
        const between = jest.fn(() => {
            calls++;
            if (calls === 1) {
            return {
                events: [],
                occurrences: [{
                    startDate: getStartB(),
                    endDate: getEndB(),
                    item: {
                        summary: 'Banana'
                    }
                }, {
                    startDate: getStartA(),
                    endDate: getEndA(),
                    item: {
                        summary: 'Abc'
                    }
                }]
                };
            }
            return {
                events: [],
                occurrences: []
            };
        });
        MockICalExpander.mockImplementation(() => ({
            between
        }));
        const expected = 'Banana\n6:00 - 10:13: Abc\n18:00 - 19:01: Banana\n\n';
        expect(await timeSchedulerController.fetchSchedule()).toStrictEqual(expected);
    });

    function getStartA(): Object {
        return getDateToday(6, 0);
    }

    function getEndA(): Object {
        return getDateToday(10, 13);
    }

    function getStartB(): Object {
        return getDateToday(18, 0);
    }

    function getEndB(): Object {
        return getDateToday(19, 1);
    }

    function getDateToday(hour: number, minute: number): Object {
        const now = new Date();
        now.setHours(hour);
        now.setMinutes(minute);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return {
            toJSDate: () => now
        };
   }
});
