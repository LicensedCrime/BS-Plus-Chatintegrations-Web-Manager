# BS Plus Chatintegrations Web Manager
+ a simple tool to handle chatintegrations commands via browser instead of the VR interface ...

# Usage
+ just open the **_index.html_** in your favorite browser **_(dont forget you need the js and css folder too...)_**
  + heck it even works on a smartphone (not recommendable atm)
+ pretty much the same like in BS Plus, but with a download button, to download the **_Chatintegrations.json_**
+ place the json file in **_steamapps/common/Beat Saber/UserData/BeatSaberPlus/ChatIntegrations.json_** and you are good to go
+ make sure to have a backup, if you already have settings

# Import file
+ drag and drop json file from **_steamapps/common/Beat Saber/UserData/BeatSaberPlus/_**

# Events supported
+ All
+ ChatBits
+ ChatCommand
+ ChatFollow
+ ChatPointsReward
+ ChatSubscription
+ Dummy
+ LevelEnded
+ LevelStarted
+ VoiceAttackCommand

# Triggers supported
+ ChatPointsReward 
+ VoiceAttackCommand

# Actions supported
+ Chat_SendMessage
+ Chat_ToggleEmoteOnly
+ EmoteRain_CustomRain
+ EmoteRain_EmoteBombRain
+ EmoteRain_SubRain
+ Event_ExecuteDummy
+ Event_Toggle
+ GamePlay_Pause
+ GamePlay_Quit
+ GamePlay_ChangeDebris
+ GamePlay_ChangeLightIntensity
+ GamePlay_ChangeMusicVolume
+ GamePlay_Restart
+ GamePlay_SpawnSquatWalls
+ GamePlay_ToggleHUD
+ Misc_Delay
+ Misc_PlaySound
+ Twitch_AddMarker
+ Twitch_CreateClip

# Conditions supported
+ Bits_Amount
+ GamePlay_InMenu
+ GamePlay_PlayingMap
+ Misc_Cooldown
+ (nope) ChatRequest_QueueDuration
+ (nope) ChatRequest_QueueSize
+ (nope) ChatRequest_QueueStatus
+ (nope) GamePlay_LevelEndType
+ (nope) Subscription_IsGift
+ (nope) Subscription_PlanType
+ (nope) Subscription_PurchasedMonthCount
+ (nope) User_Permissions
+ (nope) Event_AlwaysFail

# Todos
+ probably some refactoring of the index.html ... but who cares ...
+ generate select options from enums
+ globals ....
