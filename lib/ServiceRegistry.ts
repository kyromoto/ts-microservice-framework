import { Service } from "./Service";
import { ServiceWrapper } from "./ServiceWrapper.ts"




export class ServiceRegistry {

    private services: Map<string, Service> = new Map()

    constructor() {

        process.on("SIGINT" || "SIGTERM", async () => await this.stopServicesAsync([]))
    }

    public registerService(service: Service) {

        this.services.set(service.getName().toUpperCase(), new ServiceWrapper(service))
    }

    public async startServicesAsync(services: string[] = []) {

        console.log("starting services ...")

        if (services.length === 0) {
            services = Array.from(this.services.keys())
        }

        const promises = services.map(name => name.toUpperCase()).map(async name => {

            const service = this.services.get(name)
            
            if (!service) {
                console.error(`Service ${name} not found`)
                await this.stopServicesAsync()
                return process.exit(1) 
            }

            console.log(`service ${name} : starting ...`)
            await service.startAsync()
            console.log(`service ${name} : started`)
        })

        await Promise.all(promises)
    }

    public async stopServicesAsync(services: string[] = []) {

        console.log("stopping services ...")

        if (services.length === 0) {
            services = Array.from(this.services.keys())
        }

        const promises = services.map(name => name.toUpperCase()).map(async name => {
            
            const service = this.services.get(name)
            
            if (!service) {
                console.error(`Service ${name} not found`)
                return
            }

            console.log(`service ${name} : stopping ...`)
            await service.stopAsync()
            console.log(`service ${name} : stopped`)
        })

        await Promise.all(promises)
    }
}