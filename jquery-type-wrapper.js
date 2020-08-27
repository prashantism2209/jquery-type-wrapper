// jQuery style library for dom manipulation
const $ = (function() {
  const DOM = function(selector) {
    if (!(this instanceof DOM)) {
      return new DOM(selector);
    }
    this.ele = document.getElementById(selector);
  };

  const _nullOrUndefined = val => {
    return val === undefined || val === null;
  };

  DOM.prototype.val = function(_val) {
    if (this.ele) {
      if (!_nullOrUndefined(_val)) {
        this.ele.value = _val;
      }
    }
    return this.ele.value;
  };

  DOM.prototype.show = function() {
    if (this.ele) {
      this.ele.style.display = "";
    }
    return this;
  };

  DOM.prototype.hide = function() {
    if (this.ele) {
      this.ele.style.display = "none";
    }
    return this;
  };

  DOM.prototype.addClass = function(c) {
    if (this.ele) {
      if (this.ele.classList) {
        this.ele.classList.add(c);
      } else {
        // polyfill
        this.ele.className += ` ${c}`;
      }
    }
    return this;
  };

  DOM.prototype.removeClass = function(c) {
    if (this.ele) {
      if (this.ele.classList) {
        this.ele.classList.remove(c);
      } else {
        // polyfill
        this.ele.className = this.ele.className.replace(
          new RegExp(c, "g"),
          " "
        );
      }
    }
    return this;
  };

  DOM.prototype.html = function(_val) {
    if (!_nullOrUndefined(_val)) {
      if (this.ele) {
        this.ele.innerHTML = _val;
      }
    } else {
      return (this.ele && this.ele.innerHTML) || "";
    }
  };

  DOM.prototype.on = function(type, listener) {
    if (this.ele) {
      this.ele.addEventListener(type, listener);
    }
    return this;
  };

  DOM.prototype.attr = function(key, value) {
    if (this.ele) {
      if (!_nullOrUndefined(value)) {
        // set value to key
        this.ele.setAttribute && this.ele.setAttribute(key, value);
      }
      // return value of key
      return this.ele.getAttribute && this.ele.getAttribute(key);
    }
  };

  DOM.prototype.css = function(key, value) {
    if (this.ele) {
      if (key) {
        this.ele.style[key] = value;
      }
    }
    return this;
  };

  DOM.prototype.removeAttr = function(key) {
    if (this.ele) {
      if (key) {
        this.ele.removeAttribute && this.ele.removeAttribute(key);
      }
    }
    return this;
  };

  DOM.ajax = function(option) {
    let http = new XMLHttpRequest();
    http.open("POST", option.url);
    http.withCredentials = true;
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        let output;
        try {
          output = JSON.parse(http.responseText);
        } catch (e) {
          output = { body: {} };
        } finally {
          if (option.callback) {
            option.callback.call(null, output.body);
          }
        }
      }
    };
    http.send(JSON.stringify(option.data));
  };
  return DOM;
})();
