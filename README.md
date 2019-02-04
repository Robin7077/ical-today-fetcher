# ical-today-fetcher
The ical-today-fetcher allows you to download and show all events of today from multiple online ics / ical calendars. You only need to enter the url and choose a name for your calendar.
## Code Example
This code example adds 'Schedule A' and 'Schedule B' and prints the result of 'fetchSchedule' to the console.
### Code
```typescript
import { TimeScheduleFetcher } from 'ical-today-fetcher'

const fetcher = new TimeScheduleFetcher()
fetcher.addTimeScheduler('Schedule A', 'https://example.com/schedule_a.ics')
fetcher.addTimeScheduler('Schedule B', 'https://example.com/schedule_b.ics')

(async () => {
    console.log(await fetcher.fetchSchedule())
})();
```
### Expected Result

```
Schedule A
9:00 - 11:30: Test Event A 1
12:00 - 14:30: Test Event A 2

Schedule B
7:00 - 11:30: Test Event B 1
12:00 - 14:30: Test Event B 2
15:00 - 17:30: Test Event B 3
```
