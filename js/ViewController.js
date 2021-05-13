function ViewController(settings_generator) {
    var trigger_article = document.getElementById("trigger_article");
    var condition_article = document.getElementById("condition_article");
    var action_article = document.getElementById("action_article");

    var event_list_table = document.getElementById("event_list_table");
    var action_list_table = document.getElementById("action_list_table");
    var condition_list_table = document.getElementById("condition_list_table");

    var list_template = event_list_table.innerHTML;
    var action_list_template = action_list_table.innerHTML;
    var condition_list_template = condition_list_table.innerHTML;

    var save_settings_btn = document.getElementById("save_settings_btn");

    var trigger_tab = document.querySelector("#trigger.tab-pane");
    var actions_tab = document.querySelector("#actions.tab-pane");
    var conditions_tab = document.querySelector("#conditions.tab-pane");

    var TAB = {
        TRIGGER: 1,
        ACTIONS: 2,
        CONDITIONS: 3
    };

    var current_event = -1;
    var current_action = -1;
    var current_condition = -1;

    var self = this;
    
    // ---
    
    this.onSaveButton = function() {
        if(trigger_tab.getAttribute("class").indexOf("active") >= 0) {
            self.saveTab.bind(self, trigger_article, TAB.TRIGGER)();
            return;
        }

        if(actions_tab.getAttribute("class").indexOf("active") >= 0) {
            self.saveTab.bind(self, action_article, TAB.ACTIONS)();
            return;
        }

        if(conditions_tab.getAttribute("class").indexOf("active") >= 0) {
            self.saveTab.bind(self, condition_article, TAB.CONDITIONS)();
            return;
        }
    };

    this.saveTab = function(node, tab_type) {
        var struct;

        switch(tab_type) {
            case TAB.TRIGGER:
                struct = json.Events[current_event].Event;
                break;
            case TAB.ACTIONS:
                struct = json.Events[current_event].Actions[current_action];
                break;
            case TAB.CONDITIONS:
                struct = json.Events[current_event].Conditions[current_condition];
                break;
        }

        // fetch all inputs inside of the article and assign the values to the json struct
        var input_collection = node.querySelectorAll('input');
        var input_node, input_value;
        for(var i = 0; i < input_collection.length; i++) {
            input_node = input_collection[i];
            input_value = this.getInputValue(input_node);

            struct[input_node.id.match(/edit_[^_]+_(.+)/)[1]] = input_value;
        }
    };

    this.getInputValue = function(node) {
        switch(node.getAttribute("type")) {
            case "checkbox":
                return node.checked;
        }

        return node.value;
    };

    this.removeClass = function(node, class_name) {
        var attr = node.getAttribute("class") || "";
        node.setAttribute("class", attr.replace(class_name, "").trim());
    };

    this.removeChildClass = function(node_collection, class_name) {
        var node;
        for(var i = 0; i < node_collection.length; i++) {
            node = node_collection[i];
            this.removeClass(node, class_name);
        }
    };

    this.toggleClass = function(node, class_name) {
        var attr = node.getAttribute("class") || "";

        if(attr.indexOf(class_name) >= 0) {
            this.removeClass(node, class_name);
            return;
        }

        var target = (attr + " " + class_name).trim();
        node.setAttribute("class", target);
    };

    this.selectRow = function(node_collection, id) {
        this.removeChildClass(node_collection, "active");
        this.toggleClass(node_collection.item(id), "active");
    };

    // ---

    this.onEventEdit = function(id) { 
        this.showEvents(json); /** H4LP ... globals ... */ 
        this.showCondition(id, -1);
        this.showAction(id, -1);
        this.showTrigger(id);

        this.setCurrentEvent(id);
    };
    this.onActionEdit = function(id) { this.showAction(current_event, id); };
    this.onConditionEdit = function(id) { this.showCondition(current_event, id); };

    this.onEventDelete = function(id) {
        this.removeChild(event_list_table, id);
        json.Events.splice(id, 1);

        this.showCondition(current_event, -1);
        this.showAction(current_event, -1);
    };
    this.onActionDelete = function(id) {
        this.removeChild(action_list_table, id);
        json.Events[current_event].Actions.splice(id, 1);

        this.showAction(current_event, -1);
    };
    this.onConditionDelete = function(id) {
        this.removeChild(condition_list_table, id);
        json.Events[current_event].Conditions.splice(id, 1);

        this.showCondition(current_event, -1);
    };

    this.onActionArrowUp = function(id) {
        var next_id = id - 1;
        if(next_id < 0) {
            return;
        }

        this.onSaveButton();
        this.swapItems(json.Events[current_event].Actions, id, next_id);

        current_action = next_id;
        this.showActions(json.Events[current_event].Actions);
        this.showAction(current_event, current_action);
    };
    this.onActionArrowDown = function(id) {
        var next_id = id + 1;
        if(next_id > json.Events[current_event].Actions.length - 1) {
            return;
        }

        this.onSaveButton();
        this.swapItems(json.Events[current_event].Actions, id, next_id);

        current_action = next_id;
        this.showActions(json.Events[current_event].Actions);
        this.showAction(current_event, current_action);
    };

    this.onConditionArrowUp = function(id) {
        var next_id = id - 1;
        if(next_id < 0) {
            return;
        }

        this.onSaveButton();
        this.swapItems(json.Events[current_event].Conditions, id, next_id);

        current_condition = next_id;
        this.showConditions(json.Events[current_event].Conditions);
        this.showCondition(current_event, current_condition);
    };
    this.onConditionArrowDown = function(id) {
        var next_id = id + 1;
        if(next_id > json.Events[current_event].Conditions.length - 1) {
            return;
        }

        this.onSaveButton();
        this.swapItems(json.Events[current_event].Conditions, id, next_id);

        current_condition = next_id;
        this.showConditions(json.Events[current_event].Conditions);
        this.showCondition(current_event, current_condition);
    };
    
    this.onEventClone = function(id) {};
    this.onActionClone = function(id) {};
    this.onConditionClone = function(id) {};

    this.setCurrentEvent = function(val) {
        current_event = val;
        if(current_event >= 0) {
            this.selectRow(event_list_table.children, current_event);
        }
    };
    this.getCurrentEvent = function() { return current_event; };

    this.setCurrentAction = function(val) {
        current_action = val;
        if(current_action >= 0) {
            this.selectRow(action_list_table.children, current_action);
        }
    };
    this.getCurrentAction = function() { return current_action; };

    this.setCurrentCondition = function(val) {
        current_condition = val;
        if(current_condition >= 0) {
            this.selectRow(condition_list_table.children, current_condition);
        }
    };
    this.getCurrentCondition = function() { return current_condition; };


    // ----

    this.swapItems = function(node, id, next_id) {
        var tmp = node[id];
        node[id] = node[next_id];
        node[next_id] = tmp;
    };

    this.removeChildren = function(node) {
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    this.removeChild = function(node, index) {
        node.removeChild(node.children.item(index));
    };

    this.getInputMarkup = function(type, attribute, value) {
        var add_attribute = this.getAdditionalAttributes(attribute);
        var template = '<div class="form-group">';
            template += '<label for="edit_action_' + type + '_' + attribute + '">' + attribute + '</label>';
            template += "{input_markup}";
            template += '</div>';

        var markup = "";
        switch(attribute) {
            case "Enabled":
            case "SendChatMessage":
            case "AddTTSPefix":
            case "Continue":
            case "Debris":
            case "PreventNextActionFailure":
            case "IsGreaterThan":
            case "Solo":
            case "Multi":
            case "Replay":
            case "PerUser":
            case "NotifyUser":
            case "RequireInput":
                markup = '<br><input type="checkbox" data-toggle="toggle" id="edit_' + type + '_' + attribute + '" ' + (value ? "checked" : "") + ' ' + add_attribute + '>';
                break;
            case "ValueType":
            case "UserValue":
            case "Min":
            case "Max":
            case "Cost":
            case "MaxPerStream":
            case "MaxPerUserPerStream":
            case "Cooldown":
                markup = '<input type="number" class="form-control" id="edit_' + type + '_' + attribute + '" value="' + value + '" ' + add_attribute + '>';
                break;
            default:
                markup = '<input type="text" class="form-control" id="edit_' + type + '_' + attribute + '" value="' + value + '" ' + add_attribute + '>';
                break;
        }

        return template.replace("{input_markup}", markup);
    };

    this.getAdditionalAttributes = function(attribute) {
        switch(attribute) {
            case "Type":
                return "disabled";
        }

        return "";
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
            action_html += this.getInputMarkup("action", attr, action_json[attr]);
        }
        action_html += '</form>';
        action_article.insertAdjacentHTML("beforeend", action_html);

        this.setCurrentAction(action_index);
    };

    this.showActions = function(actions) {
        var action_list_html = '';
        for(var i = 0; i < actions.length; i++) {
            action_list_html += action_list_template
                .replace("{type}", actions[i].Type.match(/([\w]+)$/g)[0])
                .replace("{action_edit_id}", "action_edit_" + i)
                .replace("{action_clone_id}", "action_clone_" + i)
                .replace("{action_delete_id}", "action_delete_" + i)
                .replace("{action_arrow_up_id}", "action_arrow_up_" + i)
                .replace("{action_arrow_down_id}", "action_arrow_down_" + i);
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

            document.getElementById("action_arrow_up_" + i).onclick = function() { self.onActionArrowUp(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("action_arrow_down_" + i).onclick = function() { self.onActionArrowDown(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
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
            condition_html += this.getInputMarkup("condition", attr, condition_json[attr]);
        }
        condition_html += '</form>';
        condition_article.insertAdjacentHTML("beforeend", condition_html);

        this.setCurrentCondition(condition_index);
    };

    this.showConditions = function(conditions) {
        var condition_list_html = '';
        for(var i = 0; i < conditions.length; i++) {
            condition_list_html += condition_list_template
                .replace("{type}", conditions[i].Type.match(/([\w]+)$/g)[0])
                .replace("{condition_edit_id}", "condition_edit_" + i)
                .replace("{condition_clone_id}", "condition_clone_" + i)
                .replace("{condition_delete_id}", "condition_delete_" + i)
                .replace("{condition_arrow_up_id}", "condition_arrow_up_" + i)
                .replace("{condition_arrow_down_id}", "condition_arrow_down_" + i);
        }

        this.removeChildren(condition_list_table);
        condition_list_table.insertAdjacentHTML("beforeend", condition_list_html);

        this.bindConditions(conditions);
    };

    this.bindConditions = function(conditions) {
        var self = this;
        for(var i = 0; i < conditions.length; i++) {
            document.getElementById("condition_edit_" + i).onclick = function() { self.onConditionEdit(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("condition_clone_" + i).onclick = function() { self.onConditionClone(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("condition_delete_" + i).onclick = function() { self.onConditionDelete(parseInt(this.id.replace(/([^\d]+)/g, ""))); };

            document.getElementById("condition_arrow_up_" + i).onclick = function() { self.onConditionArrowUp(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("condition_arrow_down_" + i).onclick = function() { self.onConditionArrowDown(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
        }
    };

    this.showTrigger = function(event_index) {
        this.removeChildren(trigger_article);
        
        var event_keys = settings_generator.getTriggerKeys(event_index);
        if(event_keys.length < 1) {
            return;
        }

        var trigger_html = "<form>";
        var key, event = json.Events[event_index].Event;
        for(var i = 0; i < event_keys.length; i++) {
            key = event_keys[i];
            trigger_html += this.getInputMarkup("trigger", key, event[key]);
        }
        trigger_html += "</form>";

        trigger_article.insertAdjacentHTML("beforeend", trigger_html);
    };

    this.showEvents = function(json) {
        this.removeChildren(event_list_table);

        var html = "";
        for(var i = 0; i < json.Events.length; i++) {
            html = list_template
                .replace("{type}", json.Events[i].Type.match(/([\w]+)$/g)[0])
                .replace("{template}", json.Events[i].Event.Name)
                .replace("{event_edit_id}", "event_edit_" + i)
                .replace("{event_delete_id}", "event_delete_" + i);

            event_list_table.insertAdjacentHTML("beforeend", html);
        }

        this.bindEvents(json.Events);
    };

    this.bindEvents = function(events) {
        var self = this;
        for(var i = 0; i < events.length; i++) {
            document.getElementById("event_edit_" + i).onclick = function() { self.onEventEdit(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
            document.getElementById("event_delete_" + i).onclick = function() { self.onEventDelete(parseInt(this.id.replace(/([^\d]+)/g, ""))); };
        }
    };

    // --

    save_settings_btn.onclick = this.onSaveButton;
}