import { Time } from './Time';
import { TimeRange } from './TimeRange';

describe('TimeRangeTest', () => {

    it('should be defined', () => {
        expect(TimeRange).toBeDefined();
    });

    it('should return from', () => {
        const from = new Time(6, 0);
        const timeRange = new TimeRange(from, null);
        expect(timeRange.getFrom()).toBe(from);
    });

    it('should return to', () => {
        const to = new Time(6, 0);
        const timeRange = new TimeRange(null, to);
        expect(timeRange.getTo()).toBe(to);
    });

    it('should return from and to', () => {
        const from = new Time(6, 0);
        const to = new Time(18, 0);
        const timeRange = new TimeRange(from, to);
        expect(timeRange.getFrom()).toBe(from);
        expect(timeRange.getTo()).toBe(to);
    });

    it('should return timeRange as string', () => {
        const from = new Time(6, 0);
        const to = new Time(18, 0);
        const expectedResult = from.toString() + ' - ' + to.toString();
        const timeRange = new TimeRange(from, to);
        expect(timeRange.toString()).toStrictEqual(expectedResult);
    });
});
