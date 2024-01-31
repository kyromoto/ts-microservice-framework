import { Service } from "../../../lib/Service";

export class TestService implements Service {

    public getName(): string {
        return "test".toUpperCase()
    }

    async startAsync(): Promise<void> {
        setTimeout(async () => console.log("test service started"), Math.random() * 2000)
    }

    async stopAsync(): Promise<void> {
        setTimeout(async () => console.log("test service stopped"), Math.random() * 2000)
    }
}