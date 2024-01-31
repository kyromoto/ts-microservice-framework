import { Service } from "./Service"

export class ServiceWrapper implements Service {

    private _service: Service
    private _status: "started" | "stopped" | "starting" | "stopping" = "stopped"

    constructor(public service: Service) {
        this._service = service
    }

    getName(): string {
        return this._service.getName()
    }
    
    async startAsync(): Promise<void> {

        if (this._status === "started") {
            throw new Error("Service already started")
        }

        try {

            this._status = "starting"

            const result = await this._service.startAsync()
            
            this._status = "started"

            return result

        } catch (error) {

            this._status = "stopped"

            throw error
        }
    }

    async stopAsync(): Promise<void> {
        return await this._service.stopAsync()
    }
    
}