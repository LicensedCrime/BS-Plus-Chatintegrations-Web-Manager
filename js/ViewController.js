function ViewController() {
    var trigger_article = document.getElementById("trigger_article");
    var condition_article = document.getElementById("condition_article");
    var action_article = document.getElementById("action_article");

    var action_list_table = document.getElementById("action_list_table");
    var condition_list_table = document.getElementById("condition_list_table");

    var list_template = event_list_table.innerHTML;
    var action_list_template = action_list_table.innerHTML;
    var condition_list_template = condition_list_table.innerHTML;

    var current_event = -1;
    var current_action = -1;
    var current_condition = -1;
    
    this.onEventEdit = function(id) { 
        current_event = id;
        
        this.showEvents(json); /** H4LP ... globals ... */ 
        this.showCondition(current_event, -1);
        this.showAction(current_event, -1);
    };
    this.onActionEdit = function(id) { this.showAction(current_event, id); };
    this.onConditionEdit = function(id) { this.showCondition(current_event, id); };

    
    this.onEventDelete = function(id) {};
    this.onActionDelete = function(id) {};
    this.onConditionDelete = function(id) {};
    
    this.onEventClone = function(id) {};
    this.onActionClone = function(id) {};
    this.onConditionClone = function(id) {};

    this.setCurrentEvent = function(val) { current_event = val; };
    this.getCurrentEvent = function() { return current_event; };

    this.setCurrentAction = function(val) { current_action = val; };
    this.getCurrentAction = function() { return current_action; };

    this.setCurrentCondition = function(val) { current_condition = val; };
    this.getCurrentCondition = function() { return current_condition; };


    // ----

    this.removeChildren = function(node) {
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    this.getInputMarkup = function(attribute, value) {
        switch(attribute) {
            case "Enabled":
            case "SendChatMessage":
                return '<br><input type="checkbox" data-toggle="toggle" id="edit_action_' + attribute + '" ' + (value ? "checked" : "") + '>';
            case "ValueType":
            case "UserValue":
            case "Min":
            case "Max":
                return '<input type="number" class="form-control" id="edit_action_' + attribute + '" value="' + value + '">';
        }

        return '<input type="text" class="form-control" id="edit_action_' + attribute + '" value="' + value + '">'
    };

    this.showAction = function(event_index, action_index) {
        this.showActions(json.Events[event_index].Actions);
        this.removeChildren(action_article);

        if(action_index < 0) {
            return;
        }

        var action_json = json.Events[event_index].Actions[action_index];

        var action_html = '<form>';
        for(var attr in action_json) {
            action_html += '<div class="form-group">';
            action_html += '<label for="edit_action_' + attr + '">' + attr + '</label>';
            action_html += this.getInputMarkup(attr, action_json[attr]);
            action_html += '</div>';
        }
        action_html += '</form>';
        action_article.insertAdjacentHTML("beforeend", action_html);
    };

    this.showActions = function(actions) {
        var action_list_html = '';
        for(var i = 0; i < actions.length; i++) {
            action_list_html += action_list_template
                .replace("{type}", actions[i].Type.match(/([\w]+)$/g)[0])
                .replace("{action_edit_id}", "action_edit_" + i)
                .replace("{action_clone_id}", "action_clone_" + i)
                .replace("{action_delete_id}", "action_delete_" + i);
        }

        this.removeChildren(action_list_table);
        action_list_table.insertAdjacentHTML("beforeend", action_list_html);

        this.bindActions(actions);
    };

    this.bindActions = function(actions) {
        var self = this;
        for(var i = 0; i < actions.length; i++) {
            document.getElementById("action_edit_" + i).onclick = function() { self.onActionEdit(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("action_clone_" + i).onclick = function() { self.onActionClone(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("action_delete_" + i).onclick = function() { self.onActionDelete(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
        }
    };

    this.showCondition = function(event_index, condition_index) {
        this.removeChildren(condition_article);
        this.showConditions(json.Events[event_index].Conditions);

        if(condition_index < 0) {
            return;
        }

        var condition_json = json.Events[event_index].Conditions[condition_index];

        var condition_html = '<form>';
        for(var attr in condition_json) {
            condition_html += '<div class="form-group">';
            condition_html += '<label for="edit_condition_' + attr + '">' + attr + '</label>';
            condition_html += this.getInputMarkup(attr, condition_json[attr]);
            condition_html += '</div>';
        }
        condition_html += '</form>';
        condition_article.insertAdjacentHTML("beforeend", condition_html);
    };

    this.showConditions = function(conditions) {
        var condition_list_html = '';
        for(var i = 0; i < conditions.length; i++) {
            condition_list_html += condition_list_template
                .replace("{type}", conditions[i].Type.match(/([\w]+)$/g)[0])
                .replace("{condition_edit_id}", "condition_edit_" + i)
                .replace("{condition_clone_id}", "condition_clone_" + i)
                .replace("{condition_delete_id}", "condition_delete_" + i);
        }

        this.removeChildren(condition_list_table);
        condition_list_table.insertAdjacentHTML("beforeend", condition_list_html);
    };

    this.showEvents = function(json) {
        this.removeChildren(event_list_table);

        var html = "";
        for(var i = 0; i < json.Events.length; i++) {
            html = list_template
                .replace("{type}", json.Events[i].Type.match(/([\w]+)$/g)[0])
                .replace("{template}", json.Events[i].Event.Name);

            event_list_table.insertAdjacentHTML("beforeend", html);
        }
    };
}