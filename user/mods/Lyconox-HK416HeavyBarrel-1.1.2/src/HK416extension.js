"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let db;
class Hk416heavybarrel {
    container;
    postAkiLoad(container) {
        this.container = container;
    }
    postDBLoad(container) {
        const jsonUtil = container.resolve("JsonUtil");
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const locales = Object.values(tables.locales.global);
        const items = tables.templates.items;
        const handbook = tables.templates.handbook;
        const importerUtil = container.resolve("ImporterUtil");
        const modLoader = container.resolve("PreAkiModLoader");
        db = importerUtil.loadRecursive(`${modLoader.getModPath("Lyconox-HK416HeavyBarrel-1.1.2")}db/`);
        const bl16hid = "lyconoxbl16h", bl16h = jsonUtil.clone(items["5bb20da5d4351e0035629dbf"]);
        bl16h._id = bl16hid;
        bl16h._props.ConflictingItems = [];
        bl16h._props.CenterOfImpact = 0.04;
        bl16h._props.CoolFactor = 0.89;
        bl16h._props.DeviationCurve = 1.32;
        bl16h._props.DurabilityBurnModificator = 0.65;
        bl16h._props.Ergonomics = -11;
        bl16h._props.HeatFactor = 0.87;
        bl16h._props.Prefab.path = "HK416_Mod_0/barrel_416_hk_406mm_556x45.bundle";
        bl16h._props.Recoil = -10;
        bl16h._props.Velocity = -4;
        bl16h._props.Weight = 1.13;
        items[bl16hid] = bl16h;
        items["5bb20d53d4351e4502010a69"]._props.Slots[1]._props.filters[0].Filter.push(bl16hid);
        handbook.Items.push({ "Id": bl16hid, "ParentId": "5b5f75c686f774094242f19f", "Price": 29840 });
        for (const locale of locales)
            for (const [idIndex, idName] of Object.entries(db.locales.global.en.itemids))
                for (const [des, value] of Object.entries(idName))
                    locale[`${idIndex} ${des}`] = value;
        for (const localeID in db.locales.global) {
            if (localeID != "en")
                for (const [idIndex, idName] of Object.entries(db.locales.global[localeID].itemids))
                    for (const [des, value] of Object.entries(idName))
                        tables.locales.global[localeID][`${idIndex} ${des}`] = value;
        }
    }
}
module.exports = { mod: new Hk416heavybarrel() };