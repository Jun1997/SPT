"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const jsonc_1 = require("C:/snapshot/project/node_modules/jsonc");
const path_1 = __importDefault(require("path"));
class UnrestrictedPlates {
    config;
    static container;
    static IsPluginLoaded() {
        const fs = require('fs');
        const pluginName = "rairai.unrestrictedplates.dll";
        // Fails if there's no ./BepInEx/plugins/ folder
        try {
            const pluginList = fs.readdirSync("./BepInEx/plugins").map(plugin => plugin.toLowerCase());
            return pluginList.includes(pluginName);
        }
        catch {
            return false;
        }
    }
    // Bot gen changes (read below for more info)
    preAkiLoad(container) {
        UnrestrictedPlates.container = container;
        const vfs = container.resolve("VFS");
        this.config = jsonc_1.jsonc.parse(vfs.readFile(path_1.default.resolve(__dirname, "../config/config.jsonc")));
        if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots
            || this.config.ConfigToggles.AllowRemovingSoftArmorInRaid) {
            container.afterResolution("ItemHelper", (_t, result) => {
                result.getSoftInsertSlotIds = () => {
                    return this.replacementFunction();
                };
            }, { frequency: "Always" });
        }
    }
    replacementFunction() {
        return [
            "helmet_top",
            "helmet_back",
            "helmet_ears"
        ];
    }
    postDBLoad(container) {
        const databaseServer = container.resolve("DatabaseServer");
        const locales = Object.values(container.resolve("DatabaseServer").getTables().locales.global);
        const localeKeys = Object.keys(container.resolve("DatabaseServer").getTables().locales.global);
        const logger = container.resolve("WinstonLogger");
        const vfs = container.resolve("VFS");
        this.config = jsonc_1.jsonc.parse(vfs.readFile(path_1.default.resolve(__dirname, "../config/config.jsonc")));
        const itemDB = databaseServer.getTables().templates.items;
        var armorChest = [];
        var armorBack = [];
        var armorSide = [];
        var armorChestColliders = [];
        var armorBackColliders = [];
        var armorSideColliders = [];
        var softFronts = [];
        var softBacks = [];
        var softLefts = [];
        var softRights = [];
        var softCollars = [];
        var softRArms = [];
        var softLArms = [];
        var softGroins = [];
        var softButtocks = []; // ÒwÓ
        var localeDict = {};
        var equipmentModChances = {
            "soft_armor_front": 100,
            "soft_armor_back": 100,
            "soft_armor_left": 100,
            "soft_armor_right": 100,
            "collar": 100,
            "shoulder_l": 100,
            "shoulder_r": 100,
            "groin": 100,
            "groin_back": 100
        };
        const configServer = container.resolve("ConfigServer");
        const botConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        const botDatabase = databaseServer.getTables().bots;
        // Checking if the client patch is installed, killing the mod if not.
        if (!UnrestrictedPlates.IsPluginLoaded()) {
            return logger.error(`[Unrestricted Plates] Error, client patch "RaiRai.UnrestrictedArmor.dll" missing from BepInEx/plugins folder.\nPlease do not report this as a bug, reinstall the mod properly.`);
        }
        /* Bot generation changes
        / This is done because...
        / Allowing plates in Soft Armor Slots means AI pmcs can spawn with plates in them.
        / That's kind of broken and unfair when it's used against you (a PMC with two level 6 front chest plates?)
        /
        / Allowing Soft Armor Slots to be removed in raid means Scavs and PMCs will no longer generate with soft armor at all.
        / Which kind of defeats the point of them wearing armor, naturally.
        /
        / What these changes do disables the random plate selection system (sorry Chomp).
        / Armor vests and rigs will always spawn with the "default" plate preset.
        / Sadly, this is a necessity, but if you disable allowing hard plates in soft slots and disallow removing soft armor in raid...
        / Then the bot gen will be random as intended in vanilla SPT.
        */
        if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots
            || this.config.ConfigToggles.AllowRemovingSoftArmorInRaid) {
            for (let entry in botConfig.equipment["pmc"].randomisation) {
                botConfig.equipment["pmc"].randomisation[entry].randomisedArmorSlots = ["Headwear"];
                if (botConfig.equipment["pmc"].randomisation[entry].hasOwnProperty("equipmentMods")) {
                    for (let slot in equipmentModChances) {
                        botConfig.equipment["pmc"].randomisation[entry].equipmentMods[slot] = equipmentModChances[slot];
                    }
                }
            }
            for (let type in botDatabase.types) {
                if (botDatabase.types[type].hasOwnProperty("chances")
                    && botDatabase.types[type].chances.hasOwnProperty("equipmentMods")) {
                    for (let slot in equipmentModChances) {
                        botDatabase.types[type].chances.equipmentMods[slot] = equipmentModChances[slot];
                    }
                }
            }
        }
        logger.info("[Unrestricted Plates] Loading...");
        for (let item in itemDB) {
            if (itemDB[item]._parent === "644120aa86ffbe10ee032b6f" &&
                itemDB[item]._props?.Weight > 0) {
                if (itemDB[item]._props?.armorPlateColliders.some(str => str.toLowerCase().endsWith("chest"))) {
                    armorChest.push(itemDB[item]._id);
                    for (let collider in itemDB[item]._props.armorPlateColliders) {
                        if (!armorChestColliders.some(str => str.includes(itemDB[item]._props.armorPlateColliders[collider]))
                            && !itemDB[item]._props.armorPlateColliders[collider].toLowerCase().endsWith("back")) {
                            armorChestColliders.push(itemDB[item]._props.armorPlateColliders[collider]);
                        }
                    }
                }
                if (itemDB[item]._props?.armorPlateColliders.some(str => str.toLowerCase().endsWith("back"))) {
                    armorBack.push(itemDB[item]._id);
                    for (let collider in itemDB[item]._props.armorPlateColliders) {
                        if (!armorBackColliders.some(str => str.includes(itemDB[item]._props.armorPlateColliders[collider]))
                            && !itemDB[item]._props.armorPlateColliders[collider].toLowerCase().endsWith("chest")) {
                            armorBackColliders.push(itemDB[item]._props.armorPlateColliders[collider]);
                        }
                    }
                }
                if (itemDB[item]._props?.armorPlateColliders.some(str => str.toLowerCase().endsWith("left_high"))) {
                    armorSide.push(itemDB[item]._id);
                    for (let collider in itemDB[item]._props.armorPlateColliders) {
                        if (!armorSideColliders.some(str => str.includes(itemDB[item]._props.armorPlateColliders[collider]))) {
                            armorSideColliders.push(itemDB[item]._props.armorPlateColliders[collider]);
                        }
                    }
                }
            }
            if (this.config.ConfigToggles.AllowRemovingSoftArmor) {
                // Soft Armor mods
                if (itemDB[item]._parent === "65649eb40bf0ed77b8044453") {
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_front")
                        && !softFronts.includes(itemDB[item]._id)) {
                        softFronts.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Chest", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_back")
                        && !softBacks.includes(itemDB[item]._id)) {
                        softBacks.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Back", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_left_side")
                        && !softLefts.includes(itemDB[item]._id)) {
                        softLefts.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Side", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_right_side")
                        && !softRights.includes(itemDB[item]._id)) {
                        softRights.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Side", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_collar")
                        && !softCollars.includes(itemDB[item]._id)) {
                        softCollars.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Neck", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_groin_front") ||
                        itemDB[item]._name.toLowerCase().endsWith("soft_armor_groin")) {
                        softGroins.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Groin", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_groin_back")) {
                        softButtocks.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Groin", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_right_arm")) {
                        softRArms.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Arm", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                    if (itemDB[item]._name.toLowerCase().endsWith("soft_armor_left_arm")) {
                        softLArms.push(itemDB[item]._id);
                        this.ApplyConfigValues(itemDB[item]._id, itemDB[item]._props.ArmorType, "Arm", container);
                        localeDict[itemDB[item]._id] = [itemDB[item]._props.ArmorType, itemDB[item]._props.ArmorMaterial, itemDB[item]._name];
                    }
                }
                if (itemDB[item]._parent === "5448e54d4bdc2dcc718b4568" ||
                    itemDB[item]._parent === "5448e5284bdc2dcb718b4567") {
                    for (let slot in itemDB[item]._props.Slots) {
                        for (let filter in itemDB[item]._props.Slots[slot]._props.filters) {
                            itemDB[item]._props.Slots[slot]._props.filters[filter].locked = false;
                            if (itemDB[item]._props.Slots[slot]._required &&
                                this.config.ConfigToggles.AllowRemovingSoftArmorInRaid)
                                itemDB[item]._props.Slots[slot]._required = false;
                        }
                    }
                }
            }
        }
        for (let item in itemDB) {
            if (itemDB[item]._parent === "5448e5284bdc2dcb718b4567" ||
                itemDB[item]._parent === "5448e54d4bdc2dcc718b4568") {
                for (let slot in itemDB[item]._props.Slots) {
                    let weightReduction = 0;
                    // Hard armor mods
                    if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "front_plate") {
                        for (let armorChestID of armorChest) {
                            if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorChestID))) {
                                itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorChestID);
                            }
                        }
                        itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders = armorChestColliders;
                    }
                    if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "back_plate") {
                        for (let armorBackID of armorBack) {
                            if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorBackID))) {
                                itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorBackID);
                            }
                        }
                        itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders = armorBackColliders;
                    }
                    if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "left_side_plate" ||
                        itemDB[item]._props.Slots[slot]._name.toLowerCase() == "right_side_plate") {
                        for (let armorSideID of armorSide) {
                            if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorSideID))) {
                                itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorSideID);
                            }
                        }
                        itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders = armorSideColliders;
                    }
                    // Soft Armor mods
                    if (this.config.ConfigToggles.AllowRemovingSoftArmor) {
                        if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "soft_armor_front") {
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                            if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots) {
                                for (let armorChestID of armorChest) {
                                    if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorChestID))) {
                                        itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorChestID);
                                    }
                                }
                            }
                            for (let softChestID of softFronts) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softChestID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softChestID);
                                }
                            }
                            itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders.push(...armorChestColliders);
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "soft_armor_back") {
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                            if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots) {
                                for (let armorBackID of armorBack) {
                                    if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorBackID))) {
                                        itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorBackID);
                                    }
                                }
                            }
                            for (let softBackID of softBacks) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softBackID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softBackID);
                                }
                            }
                            itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders.push(...armorBackColliders);
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "soft_armor_left") {
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                            if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots) {
                                for (let armorSideID of armorSide) {
                                    if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorSideID))) {
                                        itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorSideID);
                                    }
                                }
                            }
                            for (let softLeftID of softLefts) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softLeftID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softLeftID);
                                }
                            }
                            itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders.push(...armorSideColliders);
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "soft_armor_right") {
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                            if (this.config.ConfigToggles.AllowPlatesInSoftArmorSlots) {
                                for (let armorSideID of armorSide) {
                                    if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(armorSideID))) {
                                        itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(armorSideID);
                                    }
                                }
                            }
                            for (let softRightID of softRights) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softRightID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softRightID);
                                }
                            }
                            itemDB[item]._props.Slots[slot]._props.filters[0].armorPlateColliders.push(...armorSideColliders);
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "collar") {
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                            for (let softCollarID of softCollars) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softCollarID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softCollarID);
                                }
                            }
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "shoulder_l") {
                            for (let softLArmID of softLArms) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softLArmID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softLArmID);
                                }
                            }
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "shoulder_r") {
                            for (let softRArmID of softRArms) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softRArmID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softRArmID);
                                }
                            }
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "groin") {
                            for (let softGroinID of softGroins) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softGroinID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softGroinID);
                                }
                            }
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                        }
                        else if (itemDB[item]._props.Slots[slot]._name.toLowerCase() == "groin_back") {
                            for (let softButtockID of softButtocks) {
                                if (!itemDB[item]._props.Slots[slot]._props.filters[0].Filter.some(str => str.includes(softButtockID))) {
                                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(softButtockID);
                                }
                            }
                            weightReduction += itemDB[itemDB[item]._props.Slots[slot]._props.filters[0].Plate]._props.Weight;
                        }
                    }
                    itemDB[item]._props.Weight -= weightReduction;
                }
            }
        }
        if (this.config.ConfigToggles.AllowRemovingSoftArmor) {
            for (let localeIndex in locales) {
                let localeKey = localeKeys[localeIndex];
                for (let id in localeDict) {
                    let localizedStrings = this.LocalizeStrings(localeIndex, localeDict[id], container);
                    // Description
                    let localeDescription = "";
                    if (localeKey in this.config.LocaleStrings) {
                        localeDescription = this.config.LocaleStrings[localeKey];
                    }
                    else // Fall back to English
                     {
                        localeDescription = this.config.LocaleStrings["en"];
                    }
                    localeDescription = localeDescription.replace("[VAR1]", localizedStrings[0]); // Light/Heavy
                    localeDescription = localeDescription.replace("[VAR2]", localizedStrings[1]); // Material
                    localeDescription = localeDescription.replace("[VAR3]", localizedStrings[2]); // Slot type
                    locales[localeIndex][id + " Description"] = localeDescription;
                    // Name
                    let localeName = "";
                    let localeMaterial = localizedStrings[1].split(" "); // Split material by word
                    for (let word of localeMaterial) {
                        let firstLetter = word.charAt(0).toUpperCase(); // Capitalize the first letter of each word, add a space afterwards
                        word = firstLetter + word.slice(1) + " ";
                        localeName += word;
                    }
                    localeName += localizedStrings[2]; // Add on the slot name
                    locales[localeIndex][id + " Name"] = localeName;
                    // Shortname, just using the slot name
                    locales[localeIndex][id + " ShortName"] = localizedStrings[3].toUpperCase();
                }
            }
        }
        logger.success("[Unrestricted Plates] Loaded successfully.");
    }
    ApplyConfigValues(itemID, armorType, armorSlot, container) {
        const ItemDB = container.resolve("DatabaseServer").getTables().templates.items;
        ItemDB[itemID]._props.Weight = this.config.SoftArmorSettings[armorSlot].BaseWeight * this.config.SoftArmorSettings[armorSlot].Multipliers[armorType];
        ItemDB[itemID]._props.Width = this.config.SoftArmorSettings[armorSlot].GridWidth;
        ItemDB[itemID]._props.Height = this.config.SoftArmorSettings[armorSlot].GridHeight;
    }
    LocalizeStrings(langKey, armorInfo, container) {
        const locales = Object.values(container.resolve("DatabaseServer").getTables().locales.global);
        let localizedStrings = [];
        if (locales[langKey][armorInfo[0]]) {
            localizedStrings.push(locales[langKey][armorInfo[0]].toLowerCase());
        }
        // Placeholder for things that are neither light nor heavy type armor (we'll just call it "light")
        // Thanks BSG.
        else if (armorInfo[0] == "None") {
            localizedStrings.push(locales[langKey]["Light"].toLowerCase());
        }
        else {
            localizedStrings.push(locales["en"][armorInfo[0]].toLowerCase());
        }
        localizedStrings.push(locales[langKey]["Mat" + armorInfo[1]].toLowerCase());
        if (armorInfo[2].endsWith("soft_armor_front")) {
            localizedStrings.push(locales[langKey]["soft_armor_front"].toLowerCase());
            // The next index is what we're using for the ShortName
            // In some cases we reuse the above string, in others, there's a better and shorter name
            localizedStrings.push(locales[langKey]["soft_armor_front"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_back")) {
            localizedStrings.push(locales[langKey]["soft_armor_back"].toLowerCase());
            localizedStrings.push(locales[langKey]["soft_armor_back"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_left_side")) {
            localizedStrings.push(locales[langKey]["Armor Zone LeftSideChestDown"].toLowerCase());
            localizedStrings.push(locales[langKey]["soft_armor_left"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_right_side")) {
            localizedStrings.push(locales[langKey]["Armor Zone RightSideChestDown"].toLowerCase());
            localizedStrings.push(locales[langKey]["soft_armor_right"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_collar")) {
            localizedStrings.push(locales[langKey]["Armor Zone NeckFront"].toLowerCase());
            localizedStrings.push(locales[langKey]["neckfront"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_groin_front") ||
            armorInfo[2].toLowerCase().endsWith("soft_armor_groin")) {
            localizedStrings.push(locales[langKey]["Armor Zone Pelvis"].toLowerCase());
            localizedStrings.push(locales[langKey]["Armor Zone Pelvis"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_groin_back")) {
            localizedStrings.push(locales[langKey]["Armor Zone PelvisBack"].toLowerCase());
            localizedStrings.push(locales[langKey]["Armor Zone PelvisBack"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_right_arm")) {
            localizedStrings.push(locales[langKey]["Armor Zone RightUpperArm"].toLowerCase());
            localizedStrings.push(locales[langKey]["soft_armor_right_arm"].toLowerCase());
        }
        else if (armorInfo[2].toLowerCase().endsWith("soft_armor_left_arm")) {
            localizedStrings.push(locales[langKey]["Armor Zone LeftUpperArm"].toLowerCase());
            localizedStrings.push(locales[langKey]["soft_armor_left_arm"].toLowerCase());
        }
        else {
            localizedStrings.push("MISSING LOCALE FOR THIS ARMOR ZONE");
        }
        return localizedStrings;
    }
}
module.exports = { mod: new UnrestrictedPlates() };
//# sourceMappingURL=mod.js.map