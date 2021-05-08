include("EventFactory");
include("ActionFactory");
include("ConditionFactory");

function SettingsGenerator() {
    var ef = new EventFactory();
    var af = new ActionFactory();
    var cf = new ConditionFactory();

    var json = ef.create();

    this.addEvent = function(event_name, event_type) {
        json.Events.push(ef.createEvent(event_name, event_type));
        return json.Events.length-1;
    };

    this.addAction = function(index, action) {
        var struct = af.get(action);

        json.Events[index].Actions.push(struct);
        return json.Events[index].Actions.length-1;
    };

    this.addCondition = function(index, condition) {
        var struct = cf.get(condition);

        json.Events[index].Conditions.push(struct);
        return json.Events[index].Conditions.length-1;
    };

    this.getTriggerKeys = function(event_index) {
        var event_type = json.Events[event_index].Type.match(/([\w]+)$/g)[0];
        return ef.getTriggerKeys(event_type);
    };

    this.getJSONString = function() {
        var num_spaces = 4;
        return JSON.stringify(this.getJSON(), null, num_spaces);
    };

    this.getJSON = function() { return json; };

    this.import = function(data) { json = JSON.parse(data); };
}
