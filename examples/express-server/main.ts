import { ServiceRegistry } from "../../lib/ServiceRegistry";

import { ApiService } from "./services/ApiService";
import { TestService } from "./services/TestService";


(async () => {

    const SERVICES = process.env.SERVICES?.split(",") || []

    const serviceRegistry = new ServiceRegistry()

    serviceRegistry.registerService(new TestService())
    serviceRegistry.registerService(new ApiService())
    
    await serviceRegistry.startServicesAsync(SERVICES)
})()
