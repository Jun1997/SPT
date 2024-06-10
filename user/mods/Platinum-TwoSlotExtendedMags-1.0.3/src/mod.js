"use strict";
// Copyright (C) 2023 Platinum
// 
// This file is part of Two Slot Extended Mags.
// 
// Two Slot Extended Mags is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Two Slot Extended Mags is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Two Slot Extended Mags.  If not, see <http://www.gnu.org/licenses/>.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
class TwoSlotExtendedMags {
    logger;
    modName = "Two Slot Extended Mags";
    postDBLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const itemTable = tables.templates.items;
        this.updateExtendedMagsInventorySlotSize(itemTable);
    }
    updateExtendedMagsInventorySlotSize(itemTable) {
        let itemsChanged = 0;
        for (const itemId in itemTable) {
            const item = itemTable[itemId];
            if (this.isExtendedMag(item)) {
                const itemProp = item._props;
                itemProp.Height = 2;
                if (itemProp.ExtraSizeDown) {
                    itemProp.ExtraSizeDown--;
                }
                itemsChanged++;
            }
        }
        this.logger.success(`[${this.modName}]: Updated ${itemsChanged} extended mags.`);
        this.logger.success(`[${this.modName}]: If you have issues with the icon size, please go to SPT Launcher > Settings > Clean Temp Files.`);
    }
    isExtendedMag(item) {
        const magazineCategoryId = "5448bc234bdc2d3c308b4569";
        return item._parent == magazineCategoryId &&
            item._props.Width == 1 && // We don't want to make horizontal mags like P90's to be 4 squares wide or change drum mags (for now)
            item._props.Height > 2 &&
            this.isWithinMagazineSizeCapacity(item._props);
    }
    isWithinMagazineSizeCapacity(itemProp) {
        const capacity = this.getMagazineCapacity(itemProp);
        return capacity >= config_json_1.default.minMagazineCapacityToBeIncluded && capacity <= config_json_1.default.maxMagazineCapacityToBeIncluded;
    }
    getMagazineCapacity(itemProp) {
        return itemProp.Cartridges?.find(cartridge => cartridge._max_count != null)?._max_count;
    }
}
module.exports = { mod: new TwoSlotExtendedMags() };
//# sourceMappingURL=mod.js.map