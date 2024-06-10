"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
class Mod {
    modConfig = require("../config.json");
    postDBLoad(container) {
        // get database from server
        const databaseServer = container.resolve("DatabaseServer");
        const logger = container.resolve("WinstonLogger");
        // Get all the in-memory json found in /assets/database
        const tables = databaseServer.getTables();
        const globals = tables.globals;
        // Change the base loading time of the magazines
        globals.config.BaseLoadTime = this.modConfig.baseLoadTime; // vanilla default: 0.85
        // Change the base unloading time of the magazines
        globals.config.BaseUnloadTime = this.modConfig.baseUnloadTime; // vanilla default: 0.3
        logger.logWithColor("Changed base loading time of magazines: " + globals.config.BaseLoadTime, LogTextColor_1.LogTextColor.GREEN);
        logger.logWithColor("Changed base unloading time of magazines: " + globals.config.BaseUnloadTime, LogTextColor_1.LogTextColor.GREEN);
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map