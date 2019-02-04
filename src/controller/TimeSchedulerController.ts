const ICalExpander = require('ical-expander');
import { Time } from '../model/Time';
import { TimeRange } from '../model/TimeRange';
import { TimeScheduler } from '../model/TimeScheduler';
import { Downloader } from './Downloader';

export class TimeSchedulerController {
    constructor(private readonly timeScheduler: TimeScheduler, private readonly downloader: Downloader) {
    }

    async fetchSchedule(): Promise<string> {
        const names = this.timeScheduler.getAllNames();
        return this.getSchedulesForNames(names);
    }

    private async getSchedulesForNames(names: string[]): Promise<string> {
        const schedules = await Promise.all(names.map(async (name) => this.getScheduleForName(name)));
        return schedules.join('');
    }

    private async getScheduleForName(name: string): Promise<string> {
        const schedule = await this.downloader.fetch(this.timeScheduler.getElement(name));
        return this.createScheduleWithNameFor(name, schedule);
    }

    private createScheduleWithNameFor(key: string, schedule: string) {
        const parsedSchedule = this.parseSchedule(schedule);
        if (parsedSchedule.length === 0) {
            return '';
        }
        let result = '';
        result += key;
        result += '\n';
        result += parsedSchedule;
        result += '\n\n';
        return result;
    }

    private parseSchedule(schedule: string): string {
        const icalExpander = new ICalExpander({ ics: schedule, maxIterations: 100 });
        const events = icalExpander.between(this.getTodayBegin(), this.getTodayEnd());
        const allEvents = this.getAllEvents(events);

        return allEvents.map((e: any) => {
            const from = e.startDate;
            const to = e.endDate;
            const timeRange = new TimeRange(from, to);
            return `${timeRange.toString()}: ${e.summary}`;
        }).join('\n');
    }

    private getAllEvents(events: any): Array<any> {
        const mappedEvents = events.events.map((e: any) => {
            const result = this.extractEvent(e);
            result.summary = e.summary;
            return result;
        });
        const mappedOccurrences = events.occurrences.map((e: any) => {
            const result = this.extractEvent(e);
            result.summary = e.item.summary;
            return result;
        });
        const allEvents = [].concat(mappedEvents, mappedOccurrences);
        return allEvents.sort((a: any, b: any) => a.startDate.lessThan(b.startDate) ? -1 : 1);
    }

    private extractEvent(event: any): any {
        const result = {
            startDate: Time.from(event.startDate.toJSDate()),
            endDate: Time.from(event.endDate.toJSDate())
        };
        return result;
    }

    private getTodayBegin(): Date {
        return this.getTodayTime(0, 0, 0, 0);
    }

    private getTodayEnd(): Date {
        return this.getTodayTime(23, 59, 59, 999);
    }

    private getTodayTime(hour: number, minute: number, secound: number, millisecond: number): Date {
        const today = new Date();
        today.setHours(hour);
        today.setMinutes(minute);
        today.setSeconds(secound);
        today.setMilliseconds(millisecond);
        return today;
    }
}
