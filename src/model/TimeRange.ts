import { Time } from './Time';

export class TimeRange {
    constructor(private readonly from: Time, private readonly to: Time) {
    }

    public getFrom(): Time {
        return this.from;
    }

    public getTo(): Time {
        return this.to;
    }

    public toString(): string {
        return this.from.toString() + ' - ' + this.to.toString();
    }
}
