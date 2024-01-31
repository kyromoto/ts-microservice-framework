export interface Service {
    getName(): string;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}