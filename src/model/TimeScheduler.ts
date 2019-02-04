export class TimeScheduler {
    private readonly elements = new Map<string, string>();

    public addElement(name: string, element: string): void {
        this.elements.set(name, element);
    }

    public getElement(name: string): string {
        const element = this.elements.get(name);
        if (!element) {
            throw new Error(`Element with name "${name}" not found`);
        }
        return element;
    }

    public getAllNames(): Array<string> {
        return Array.from(this.elements.keys());
    }
}
