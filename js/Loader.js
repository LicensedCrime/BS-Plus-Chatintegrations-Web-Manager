function Loader() {
    var m_src = [];
    var m_num_src = 0;
    var m_loaded_src = 0;
    var m_num_locks = 0;

    this.lock = function() { m_num_locks++; }
    this.unlock = function() { m_num_locks--; }

    this.include_module = function(module) {
        m_num_src++;
        if(this.exists(module)) {
            m_num_src--;
            return;
        }

        m_src.push(module);

        var js = document.createElement("script");
        js.src = "js/" + module + ".js";
        js.onload = function() {
            m_loaded_src++;
        };

        document.body.appendChild(js);
    };

    this.exists = function(module) {
        for(var i = 0; i != m_num_src; i++) {
            if(module == m_src[i]) {
                return true;
            }
        }

        return false;
    };

    this.inherit_module = function(child, parent) {
        this.lock();
        include(parent);

        this.load_inherit_module(child, parent);
    };

    this.load_inherit_module = function(child, parent) {
        if(typeof window[parent] != "function") {
            window.setTimeout(this.load_inherit_module.bind(this, child, parent), 0);
            return;
        }

        child.prototype = new window[parent]();
        child.prototype.constructor = child;

        this.unlock();
    };

    this.onload_event = function(callback) {
        if(m_num_src != m_loaded_src || m_num_locks != 0) {
            window.setTimeout(this.onload_event.bind(this, callback), 0);
            return;
        }

        callback();
    };
}

Loader.prototype = new Loader();
Loader.prototype.constructor = Loader;

Loader.prototype.include = function(module) { this.include_module(module); };
Loader.prototype.inherit = function(child, parent) { this.inherit_module(child, parent); };
Loader.prototype.onload = function(callback) { this.onload_event(callback); };

function include(module) { Loader.prototype.include(module); }
function inherit(child, parent) { Loader.prototype.inherit(child, parent); }
function onload(callback) { Loader.prototype.onload(callback); }