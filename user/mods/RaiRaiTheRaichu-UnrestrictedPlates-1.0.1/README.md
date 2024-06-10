# UnrestrictedPlates v1.0.1
Author: RaiRaiTheRaichu

### ---BUILT FOR AKI VERSION 3.8.0---

This mod will allow you to fit any plate in any armor slot. For example, any chest plate armor can be put in the front/rear slots of any plate carrier or armor vest without restrictions. 

This will NOT allow you to place side armor in the chest slot etc.

Also enabled by default, you can also remove and replace "built in" armor. You can either repair the inserts or swap them out entirely for something else (currently only out of raid, in your stash).

Does not work for helmets (currently?). Maybe someday in the future if there's demand for it, but that's a little out of scope for the mod right now for a 1.0 release.

Features:
- Any plate can go into any plate carrier slot/armor vest slot (within reason - you can't put front or back plates in side slots).
- Remove or replace any "built in" armor inserts. You can take a stronger or more durable soft armor from one armor vest and place it in another. This can all be done in-raid*, enabled by default in the config,
- Armor inserts have fully localized names and descriptions! The descriptions are dynamically generated and should be mostly accurate. See the config.jsonc for more details of how it works, and please reach out to contact me if the translations are not correct or inaccurate - they are partly made with the assistance of machine translations.
- OPTIONAL: Place hard plates in the soft armor slots to fortify even the weakest armor!
    - For example, you can remove the level 2 Aramid chest and back armor from a PACA and place an armored level 6 plate inside!

Configuration can be done by editing the config.jsonc file within the config folder.

If you have any suggestions for the mod, let me know.

Known Issues:
- There's no real penalty for placing two front armor plates in one vest that allows it (aside from the weight and decreases to your mobility). This might be desirable, but for now if you don't want to put plates into the soft armor slots, you can disable it in the config.
- Icons for soft armor items sometimes bug out when you unequip them from slots. This is due to the armor items not having a proper model - they were never meant to be examined by players. This is fixed by restarting your client, but it's only a visual bug.
- Even with the current weight settings, some vests might be considered just a little bit *too* light when all armor is removed from them. I tried to strike a decent balance with the weight, but some vests just have a weirdly low base weight.


### ---NOTICE!!!---

Please note that, when either of the options "Allow Plates In Soft Armor Slots" or "Allow Removing Soft Armor In Raid" are enabled, bot generation will be slightly affected (more details in the config file). Both of them are enabled by default, so if you run into compatibility issues, try using a Load Order Editor (check the SPT Hub website) and let this mod load AFTER others.


## ---INSTALL INFO---

How to install:
Copy the following folders: `user` and `BepInEx` from the included zip file into the root of your SPT-AKI install folder.
The folders should merge with the existing folders.

Ensure that your `BepInEx/plugins/` folder contains `RaiRai.UnrestrictedPlates.dll`.
Also ensure that your `user/mods/` folder contains a folder named `RaiRaiTheRaichu-UnrestrictedPlates-1.0.1`.

If you're updating from an older version, please be sure to delete the old mod files first if they exist.


## ---CHANGELOGS---

#### v1.0.1 Changelog: 
- Fixed an issue where helmets were being returned from insurance without their armor.
- Fixed an issue where armored vests could not be turned in for certain quests.
    - This required an additional client mod (BepInEx) patch, so the install process is slightly different - please reread the Install Info section to make sure you install the mod properly.


## ---CONTACT---

@RaiRaiTheRaichu - Discord
user/6798-rairaitheraichu - on sp-tarkov.com 


## ---LICENSE---

Copyright 2024 - RaiRaiTheRaichu

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.