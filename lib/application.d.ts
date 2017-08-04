/// <reference types="express" />
import { Express } from "express";
export default class Application {
    private app;
    private services;
    private handlers;
    constructor(app: Express);
    init(): Promise<void>;
    start(): void;
    private initServices();
    private injectHandler(fn);
}
