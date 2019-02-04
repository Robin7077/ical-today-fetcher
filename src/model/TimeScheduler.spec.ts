import { TimeScheduler } from './TimeScheduler';

describe('TimeSchedulerTest', () => {
    let timeScheduler: TimeScheduler;

    beforeEach(() => {
        timeScheduler = new TimeScheduler();
    });

    it('should create TimeScheduler without error', () => {
        expect(() => new TimeScheduler()).not.toThrow();
    });

    it('addElement should add element to map', () => {
        const name = 'Test';
        const element = 'Test';
        timeScheduler.addElement(name, element);
        expect(timeScheduler.getElement(name)).toBe(element);
    });

    it('getElement should throw if name is unknown', () => {
        const name = 'Test';
        expect(() => timeScheduler.getElement(name)).toThrowError(`Element with name "${name}" not found`);
    });

    it('getAllNames should return empty arrays', () => {
        expect(timeScheduler.getAllNames()).toStrictEqual([]);
    });

    it('getAllNames should return one name', () => {
        const name = 'TestName';
        timeScheduler.addElement(name, 'Test');
        expect(timeScheduler.getAllNames()).toStrictEqual([name]);
    });

    it('getAllNames should override name', () => {
        const name = 'TestName';
        timeScheduler.addElement(name, 'TestA');
        timeScheduler.addElement(name, 'TestB');
        timeScheduler.addElement(name, 'TestC');
        expect(timeScheduler.getAllNames()).toStrictEqual([name]);
    });

    it('getAllNames should return two names', () => {
        const names = ['a', 'b'];
        timeScheduler.addElement(names[0], 'TestA');
        timeScheduler.addElement(names[1], 'TestB');
        expect(timeScheduler.getAllNames()).toStrictEqual(names);
    });
});
