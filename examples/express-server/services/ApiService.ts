import express from "express";

import { Server, createServer } from "node:http"

import { Service } from "../../../lib/Service"


export class ApiService implements Service {

    private _app: express.Application
    private _server: Server
    private _port = 3030
    private _name = "api"

    constructor(port: number = 3030) {
        
        this._port = port

        this._app = express()
        this._server = createServer(this._app)


        this._app.on
    }
    
    public getName(): string {
        return "api".toUpperCase()
    }

    public async startAsync(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this._server.listen(this._port, () => {
                console.log(`${this.getName()} started on port ${this._port}`)
                return resolve()
            })
        })
    }

    public async stopAsync(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this._server.close(() => {
                console.log(`${this.getName()} stopped on port ${this._port}`)
                return resolve()
            })
        })
    }
}