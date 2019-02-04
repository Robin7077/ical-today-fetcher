import { Time } from './Time';

describe('TimeTest', () => {
    it('CreateTime', () => {
        const time = new Time(6, 0);
        expect(time.getHour()).toStrictEqual(6);
        expect(time.getMinute()).toStrictEqual(0);
    });

    it('CreateTimeFromDate', () => {
        const date = new Date();
        const hour = 6;
        date.setHours(hour);
        const minutes = 0;
        date.setMinutes(minutes);
        const time = Time.from(date);
        expect(time.getHour()).toStrictEqual(hour);
        expect(time.getMinute()).toStrictEqual(minutes);
    });

    it('CheckTimestampFormat 6:00', () => {
        const time = new Time(6, 0);
        expect(time.toString()).toStrictEqual('6:00');
    });

    it('CheckTimestampFormat 18:05', () => {
        const time = new Time(18, 5);
        expect(time.toString()).toStrictEqual('18:05');
    });

    it('CheckTimestampFormat 18:18', () => {
        const time = new Time(18, 18);
        expect(time.toString()).toStrictEqual('18:18');
    });

    it('InvalidTimeNegativeHour', () => {
        expect(() => new Time(-1, 0)).toThrowError('Value -1 is not in range [0, 23]');
    });

    it('InvalidTimeHourTooLarge', () => {
        expect(() => new Time(25, 0)).toThrowError('Value 25 is not in range [0, 23]');
    });

    it('InvalidTimeNegativeMinute', () => {
       expect(() =>  new Time(1, -1)).toThrowError('Value -1 is not in range [0, 59]');
    });

    it('InvalidTimeMinuteTooLarge', () => {
        expect(() =>  new Time(1, 60)).toThrowError('Value 60 is not in range [0, 59]');
    });

    it('CompareHourLess', () => {
        const timeA = new Time(6, 0);
        const timeB = new Time(7, 0);
        expect(timeA.lessThan(timeB)).toBeTruthy();
    });

    it('CompareHourNotLess', () => {
        const timeA = new Time(7, 0);
        const timeB = new Time(6, 0);
        expect(timeA.lessThan(timeB)).toBeFalsy();
    });

    it('CompareHourEqualMinuteLess', () => {
        const timeA = new Time(6, 0);
        const timeB = new Time(6, 1);
        expect(timeA.lessThan(timeB)).toBeTruthy();
    });

    it('CompareHourEqualMinuteNotLess', () => {
        const timeA = new Time(6, 1);
        const timeB = new Time(6, 0);
        expect(timeA.lessThan(timeB)).toBeFalsy();
    });
});
