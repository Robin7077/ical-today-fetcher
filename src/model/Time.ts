export class Time {
    constructor(private readonly hour: number, private readonly minute: number) {
        Time.assertMinuteIsValid(minute);
        Time.assertHourIsValid(hour);
    }

    private static assertValueInRange(lowerBound: number, higherBound: number, value: number): void {
        if (lowerBound > value || higherBound < value) {
            throw new Error(`Value ${value} is not in range [${lowerBound}, ${higherBound}]`);
        }
    }

    private static assertHourIsValid(hour: number): void {
        this.assertValueInRange(0, 23, hour);
    }

    private static assertMinuteIsValid(minute: number): void {
        this.assertValueInRange(0, 59, minute);
    }

    public getMinute(): number {
        return this.minute;
    }

    public getHour(): number {
        return this.hour;
    }

    public toString(): string {
        return this.hour + ':' + Time.makeMinutePrintable(this.minute);
    }

    private static makeMinutePrintable(minute: number): string {
        if (minute < 10) {
            return '0' + minute;
        }
        return minute.toString();
    }

    public lessThan(other: Time): boolean {
        if (this.hour < other.hour) {
            return true;
        }
        if (this.hour === other.hour && this.minute < other.minute) {
            return true;
        }
        return false;
    }

    public static from(date: Date) {
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return new Time(hour, minutes);
    }
}
