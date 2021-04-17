var ACTION = {
    Chat_SendMessage: 1,
    Chat_ToggleEmoteOnly: 2,
    EmoteRain_CustomRain: 3,
    EmoteRain_EmoteBombRain: 4,
    EmoteRain_SubRain: 5,
    Event_ExecuteDummy: 6,
    Event_Toggle: 7,
    GamePlay_Pause: 8,
    GamePlay_Quit: 9,
    GamePlay_ChangeDebris: 10,
    GamePlay_ChangeLightIntensity: 11,
    GamePlay_ChangeMusicVolume: 12,
    GamePlay_Restart: 13,
    GamePlay_SpawnSquatWalls: 14,
    GamePlay_ToggleHUD: 15,
    Misc_Delay: 16,
    Misc_PlaySound: 17,
    Twitch_AddMarker: 18,
    Twitch_CreateClip: 19,
};

function ActionFactory() {
    this.getEmoteRain_EmoteBombRain = function() {
        return {
            EmoteKindCount: 10,
            CountPerEmote: 10,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.EmoteRain_EmoteBombRain",
            Enabled: true,
            BaseValue: ""
        };
    };
    
    this.getChat_SendMessage = function() {
        return {
            AddTTSPefix: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Chat_SendMessage",
            Enabled: true,
            BaseValue: "Thanks $UserName for the $Bits bits!"
        };
    };
    
    this.getGamePlay_ChangeLightIntensity = function() {
        return {
            ValueType: 1,
            UserValue: 2.5,
            Min: 0.5,
            Max: 2.0,
            SendChatMessage: false,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_ChangeLightIntensity",
            Enabled: true,
            BaseValue: ""
        };
    };
    
    this.getMisc_Delay = function() {
        return {
            Delay: 10,
            PreventNextActionFailure: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Misc_Delay",
            Enabled: true,
            BaseValue: ""
        };
    };
    
    this.getGamePlay_SpawnSquatWalls = function() {
        return {
            Interval: 5.0,
            Count: 5,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_SpawnSquatWalls",
            Enabled: true,
            BaseValue: ""
        };
    };
    
    this.getChat_ToggleEmoteOnly = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Chat_ToggleEmoteOnly",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getEmoteRain_CustomRain = function() { 
        return {
            Count: 20,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.EmoteRain_CustomRain",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getEmoteRain_SubRain = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.EmoteRain_SubRain",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getEvent_ExecuteDummy = function() { 
        return {
            Continue: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Event_ExecuteDummy",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getEvent_Toggle = function() { 
        return {
            ChangeType: 0,
            Continue: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Event_Toggle",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_ChangeDebris = function() { 
        return {
            Debris: false,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_ChangeDebris",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_ChangeMusicVolume = function() { 
        return {
            ValueType: 0,
            UserValue: 0.5,
            Min: 0.5,
            Max: 1.0,
            SendChatMessage: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_ChangeMusicVolume",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_Pause = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_Pause",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_Quit = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_Quit",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_Restart = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_Restart",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getGamePlay_ToggleHUD = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.GamePlay_ToggleHUD",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getMisc_PlaySound = function() { 
        return {
            Volume: 0.0,
            Pitch: 1.0,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Misc_PlaySound",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getTwitch_AddMarker = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Twitch_AddMarker",
            Enabled: true,
            BaseValue: ""
        };
    };
    this.getTwitch_CreateClip = function() { 
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Actions.Twitch_CreateClip",
            Enabled: true,
            BaseValue: ""
        };
    };
    
    this.get = function(type) {
        switch(type) {
            case ACTION.EmoteRain_EmoteBombRain:
                return this.getEmoteRain_EmoteBombRain();
            case ACTION.Chat_SendMessage:
                return this.getChat_SendMessage();
            case ACTION.GamePlay_ChangeLightIntensity:
                return this.getGamePlay_ChangeLightIntensity();
            case ACTION.Misc_Delay:
                return this.getMisc_Delay();
            case ACTION.GamePlay_SpawnSquatWalls:
                return this.getGamePlay_SpawnSquatWalls();
            case ACTION.Chat_ToggleEmoteOnly:
                return this.getChat_ToggleEmoteOnly();
            case ACTION.EmoteRain_CustomRain:
                return this.getEmoteRain_CustomRain();
            case ACTION.EmoteRain_SubRain:
                return this.getEmoteRain_SubRain();
            case ACTION.Event_ExecuteDummy:
                return this.getEvent_ExecuteDummy();
            case ACTION.Event_Toggle:
                return this.getEvent_Toggle();
            case ACTION.GamePlay_ChangeDebris:
                return this.getGamePlay_ChangeDebris();
            case ACTION.GamePlay_ChangeMusicVolume:
                return this.getGamePlay_ChangeMusicVolume();
            case ACTION.GamePlay_Pause:
                return this.getGamePlay_Pause();
            case ACTION.GamePlay_Quit:
                return this.getGamePlay_Quit();
            case ACTION.GamePlay_Restart:
                return this.getGamePlay_Restart();
            case ACTION.GamePlay_ToggleHUD:
                return this.getGamePlay_ToggleHUD();
            case ACTION.Misc_PlaySound:
                return this.getMisc_PlaySound();
            case ACTION.Twitch_AddMarker:
                return this.getTwitch_AddMarker();
            case ACTION.Twitch_CreateClip:
                return this.getTwitch_CreateClip();
        }
    
        for(var key in ACTION) {
            if(ACTION[key] == type) {
                throw "type " + key + " is currently not supported";
            }
        }

        return null;
    };
}
