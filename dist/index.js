"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
// import { AppDataSource } from "./db";
const port = 3000;
function main() {
    try {
        // await AppDataSource.initialize();
        // console.log('Database Connected...');
        app_1.default.listen(port, () => console.log(`App listening on port ${port}!`));
    }
    catch (error) {
        // console.error(error);
    }
}
main();
