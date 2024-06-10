"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
// WTT imports
const WTTInstanceManager_1 = require("./WTTInstanceManager");
const CustomItemService_1 = require("./CustomItemService");
// Custom Trader Assort Items
const CustomAssortSchemeService_1 = require("./CustomAssortSchemeService");
const CustomWeaponPresets_1 = require("./CustomWeaponPresets");
class EpicRangeTimeWeapons {
    Instance = new WTTInstanceManager_1.WTTInstanceManager();
    version;
    modName = "EpicRangeTime-Weapons";
    config;
    customItemService = new CustomItemService_1.CustomItemService();
    customAssortSchemeService = new CustomAssortSchemeService_1.CustomAssortSchemeService();
    customWeaponPresets = new CustomWeaponPresets_1.CustomWeaponPresets();
    debug = false;
    // Anything that needs done on preAKILoad, place here.
    preAkiLoad(container) {
        // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.preAkiLoad(container, this.modName);
        this.Instance.debug = this.debug;
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE
        this.getVersionFromJson();
        this.displayCreditBanner();
        this.customItemService.preAkiLoad(this.Instance);
        this.customAssortSchemeService.preAkiLoad(this.Instance);
        this.customWeaponPresets.preAkiLoad(this.Instance);
    }
    // Anything that needs done on postDBLoad, place here.
    postDBLoad(container) {
        // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.postDBLoad(container);
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE
        this.epicEdits();
        this.customItemService.postDBLoad();
        this.customAssortSchemeService.postDBLoad();
        this.customWeaponPresets.postDBLoad();
        this.Instance.logger.log(`[${this.modName}] Database: Loading complete.`, LogTextColor_1.LogTextColor.GREEN);
    }
    epicEdits() {
        const db = this.Instance.database;
        const dbItems = db.templates.items;
        for (let file in dbItems) {
            let fileData = dbItems[file];
            if (fileData._id === "5447a9cd4bdc2dbd208b4567") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5bb20d53d4351e4502010a69");
            }
            if (fileData._id === "5bb2475ed4351e00853264e3") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("5c0e2f26d174af02a9625114", "55d355e64bdc2d962f8b4569", "5d4405aaa4b9361e6a4e6bd3", "5c07a8770db8340023300450", "59bfe68886f7746004266202", "63f5ed14534b2c3d5479a677");
            }
            if (fileData._id === "65266fd43341ed9aa903dd56") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("5e208b9842457a4a7a33d074");
            }
            if (fileData._id === "6513eff1e06849f06c0957d4") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("5e208b9842457a4a7a33d074");
            }
            if (fileData._id === "5c7e5f112e221600106f4ede") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("40c62378fa93a829532ecc5e", "6d9f22a75064ebb92b3ece1c");
            }
            if (fileData._id === "5fbbfabed5cb881a7363194e") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("9930f05d4e38813e5ef5ff90");
            }
            if (fileData._id === "5fbbfacda56d053a3543f799") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("9930f05d4e38813e5ef5ff90");
            }
            if (fileData._id === "8f13f88e0c490b2f28dcf023") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("7f35c72194fb98852c83a2da");
            }
            if (fileData._id === "2905579cfacf2a9ddaa2a922") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("7f35c72194fb98852c83a2da");
            }
            if (fileData._id === "5c0548ae0db834001966a3c2") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("5fbe3ffdf8b6a877a729ea82", "5fd20ff893a8961fc660a954", "619636be6db0f2477964e710", "6196364158ef8c428c287d9f", "6196365d58ef8c428c287da1", "64b8725c4b75259c590fa899");
            }
            if (fileData._id === "5ac66c5d5acfc4001718d314") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("5fbe3ffdf8b6a877a729ea82", "5fd20ff893a8961fc660a954", "619636be6db0f2477964e710", "6196364158ef8c428c287d9f", "6196365d58ef8c428c287da1", "64b8725c4b75259c590fa899");
            }
            if (fileData._id === "5d25a6538abbc306c62e630d") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5d25a4a98abbc30b917421a4") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5d25a7b88abbc3054f3e60bc") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5ce69cbad7f00c00b61c5098") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5d25a6a48abbc306c62e6310") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5d25af8f8abbc3055079fec5") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "5cf12a15d7f00c05464b293f") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
                ;
            }
            if (fileData._id === "5bfeaa0f0db834001b734927") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
                ;
            }
            if (fileData._id === "5bfea7ad0db834001c38f1ee") {
                fileData._props.Cartridges[0]._props.filters[0].Filter.push("6529243824cbe3c74a05e5c1", "6529302b8c26af6326029fb7");
            }
            if (fileData._id === "59984ab886f7743e98271174") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809");
            }
            if (fileData._id === "59f9cabd86f7743a10721f46") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("df1d3bfbd9835563f1574809");
            }
            if (fileData._id === "5c6d11072e2216000e69d2e4") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c6d11152e2216000f2003e7") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c6c2c9c2e2216000f2002e4") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5d15ce51d7ad1a1eff619092") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "647dd2b8a12ebf96c3031655") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5efaf417aeb21837e749c7f2") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "6065881d1246154cad35d637") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5df916dfbb49d91fb446d6b9") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5d00ef6dd7ad1a0940739b16") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "640b20359ab20e15ee445fa9") {
                fileData._props.Slots[6]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "638f2003bbd47aeb9e0ff637") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5ea16ada09aa976f2e7a51be") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "637f57d2f5ef8c33840d36c4") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "637f57c532b66e7e320a6676") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5d4405f0a4b9361e6a4e6bd9") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c78f2492e221600114c9f04") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5c78f2612e221600114c9f0d") {
                fileData._props.Slots[9]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "6034e3e20ddce744014cb878") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c6d5d8b2e221644fc630b39") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5888976c24597754281f93f5") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5b7bebc85acfc43bca706666") {
                fileData._props.Slots[1]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5fc235db2770a0045c59c683") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c59529a2e221602b177d160") {
                fileData._props.Slots[4]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5c5db63a2e2216000f1b284a") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5b7be1ca5acfc400170e2d2f") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5e5699df2161e06ac158df6f") {
                fileData._props.Slots[5]._props.filters[0].Filter.push("f5c4bf2acf4b0f66d514c0de", "690458c8c8f726648b11ac19");
            }
            if (fileData._id === "5e56991336989c75ab4f03f6") {
                fileData._props.Slots[2]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "5df25d3bfd6b4e6e2276dc9a") {
                fileData._props.Slots[3]._props.filters[0].Filter.push("8af8534244b4e4189d53bec2", "0f8b8c2fc55b90cea6b5b63b", "923987338260a1bb89e6a11b");
            }
            if (fileData._id === "618b9682a3884f56c957ca78") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("81ee14e532991b2b9993ae0e", "ac738256c846acc25b183a80", "26f02172906cbaa1ae78e57d", "87690b1fadc788a959d42e46");
            }
            if (fileData._id === "618ba92152ecee1505530bd3") {
                fileData._props.Slots[0]._props.filters[0].Filter.push("81ee14e532991b2b9993ae0e", "ac738256c846acc25b183a80", "26f02172906cbaa1ae78e57d", "87690b1fadc788a959d42e46");
            }
        }
    }
    getVersionFromJson() {
        const packageJsonPath = path.join(__dirname, "../package.json");
        fs.readFile(packageJsonPath, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            const jsonData = JSON.parse(data);
            this.version = jsonData.version;
        });
    }
    displayCreditBanner() {
        this.Instance.logger.log(`[${this.modName}] ------------------------------------------------------------------------`, LogTextColor_1.LogTextColor.GREEN);
        this.Instance.logger.log(`[${this.modName}] Developers:  EpicRangeTime   Code Framework: GroovypenguinX`, LogTextColor_1.LogTextColor.GREEN);
        this.Instance.logger.log(`[${this.modName}] ------------------------------------------------------------------------`, LogTextColor_1.LogTextColor.GREEN);
    }
}
module.exports = { mod: new EpicRangeTimeWeapons() };
//# sourceMappingURL=mod.js.map