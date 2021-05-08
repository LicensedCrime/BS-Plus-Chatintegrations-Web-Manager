var EVENT = {
    All: 0,
    ChatBits: 1,
    ChatCommand: 2,
    ChatFollow: 3,
    ChatPointsReward: 4,
    ChatSubscription: 5,
    Dummy: 6,
    LevelEnded: 7,
    LevelStarted: 8,
    VoiceAttackCommand: 9
};

function EventFactory() {

    this.createGUID = function() {
        // not the best, but it will do it for now...
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
    this.create = function() {
        return { Events: [] };
    };
    
    this.createEvent = function(name, event_type) {
        if(!name) {
            throw "The name of the event has to be specified.";
        }

        var target_event = "undefined";
        for(var key in EVENT) {
            if(EVENT[key] == event_type) {
                target_event = key;
                break;
            }
        }
    
        var event = this.formatEvent(this.getEvent(name, target_event), event_type);
    
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Events." + target_event,
            Event: event,
            Conditions: [],
            Actions: []
        };
    };
    
    this.getEvent = function(name, type) {
        return {
            GUID: this.createGUID(),
            Name: name,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Events." + type,
            Enabled: true,
            UsageCount: 0,
            CreationDate: new Date().getTime(),
            LastUsageDate: 0
        };
    };
    
    this.formatEvent = function(object, type) {
        switch(type) {
            case EVENT.ChatBits:
                return this.getChatBits(object);
            case EVENT.ChatCommand:
                return this.getChatCommand(object);
            case EVENT.ChatFollow:
                return this.getChatFollow(object);
            case EVENT.ChatPointsReward:
                return this.getChatPointsReward(object);
            case EVENT.ChatSubscription:
                return this.getChatSubscription(object);
            case EVENT.Dummy:
                return this.getDummy(object);
            case EVENT.LevelEnded:
                return this.getLevelEnded(object);
            case EVENT.LevelStarted:
                return this.getLevelStarted(object);
            case EVENT.VoiceAttackCommand:
                return this.getVoiceAttackCommand(object);
        }
    };
    
    this.getChatBits = function(object) { return object; };
    this.getChatCommand = function(object) { 
        object["Command"] = "!some_command";
    
        return object;
    };
    this.getChatFollow = function(object) { return object; };
    this.getChatPointsReward = function(object) { 
        object["RewardID"] = "";
        object["Title"] = "New reward 1617910761";
        object["Prompt"] = "Description";
        object["Cost"] = 50;
        object["RequireInput"] = true;
        object["MaxPerStream"] = 2;
        object["MaxPerUserPerStream"] = 3;
        object["Cooldown"] = 0;
    
        return object;
    };
    this.getChatSubscription = function(object) { return object; };
    this.getDummy = function(object) { return object; };
    this.getLevelEnded = function(object) { return object; };
    this.getLevelStarted = function(object) { return object; };
    this.getVoiceAttackCommand = function(object) { 
        object["CommandGUID"] = this.createGUID();
        object["CommandName"] = "";

        return object;
    };

    this.getTriggerKeys = function(event_type) {
        switch(EVENT[event_type]) {
            case EVENT.ChatPointsReward:
                return [
                    "RewardID",
                    "Title",
                    "Prompt",
                    "Cost",
                    "RequireInput",
                    "MaxPerStream",
                    "MaxPerUserPerStream",
                    "Cooldown"
                ];
            case EVENT.VoiceAttackCommand:
                return ["CommandName"];
        }

        return [];
    };
}
