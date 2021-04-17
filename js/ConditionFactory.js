var CONDITION = {
    Bits_Amount: 1,
    ChatRequest_QueueDuration: 2,
    ChatRequest_QueueSize: 3,
    ChatRequest_QueueStatus: 4,
    GamePlay_InMenu: 5,
    GamePlay_LevelEndType: 6,
    GamePlay_PlayingMap: 7,
    Misc_Cooldown: 8,
    Subscription_IsGift: 9,
    Subscription_PlanType: 10,
    Subscription_PurchasedMonthCount: 11,
    User_Permissions: 12,

    Event_AlwaysFail: -1
};

function ConditionFactory() {
    this.getGamePlay_PlayingMap = function() {
        return {
            Solo: true,
            Multi: true,
            Replay: false,
            BeatmapType: 0,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Conditions.GamePlay_PlayingMap",
            Enabled: true,
            EncodedUserValue: ""
        };
    };
    
    this.getMisc_Cooldown = function() {
        return {
            PerUser: true,
            CooldownTime: 60,
            NotifyUser: true,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Conditions.Misc_Cooldown",
            Enabled: true,
            EncodedUserValue: ""
        };
    };
    
    this.getBits_Amount = function() {
        return {
            IsGreaterThan: true,
            Count: 10,
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Conditions.Bits_Amount",
            Enabled: true,
            EncodedUserValue: ""
        };
    };
    
    this.getEvent_AlwaysFail = function() {
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Conditions.Event_AlwaysFail",
            Enabled: true,
            EncodedUserValue: ""
        };
    };
    
    this.getGamePlay_InMenu = function() {
        return {
            Type: "BeatSaberPlus.Modules.ChatIntegrations.Conditions.GamePlay_InMenu",
            Enabled: true,
            EncodedUserValue: ""
        };
    };
    
    this.get = function(type) {
        switch(type) {
            case CONDITION.GamePlay_PlayingMap:
                return this.getGamePlay_PlayingMap();
            case CONDITION.Misc_Cooldown:
                return this.getMisc_Cooldown();
            case CONDITION.Bits_Amount:
                return this.getBits_Amount();
            case CONDITION.Event_AlwaysFail:
                return this.getEvent_AlwaysFail();
            case CONDITION.GamePlay_InMenu:
                return this.getGamePlay_InMenu();
        }
    
        for(var key in CONDITION) {
            if(CONDITION[key] == type) {
                throw "type " + key + " is currently not supported";
            }
        }

        return null;
    };
}
