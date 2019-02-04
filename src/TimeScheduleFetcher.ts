import { TimeScheduler } from './model/TimeScheduler';
import { TimeSchedulerController } from './controller/TimeSchedulerController';
import { AxiosDownloader } from './controller/AxiosDownloader';

export class TimeScheduleFetcher {
    private readonly timeScheduler: TimeScheduler;

    constructor() {
        this.timeScheduler = new TimeScheduler();
    }

    addTimeScheduler(name: string, url: string): void {
        this.timeScheduler.addElement(name, url);
    }

    async fetchSchedule(): Promise<string> {
        const timeSchedulerController = new TimeSchedulerController(this.timeScheduler, new AxiosDownloader());
        return timeSchedulerController.fetchSchedule();
    }
}
