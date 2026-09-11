// Source: https://gist.github.com/juliocesar/926500#gistcomment-2619473
(function (isStorage) {
    if (!isStorage) {
        function Storage() { };
        Storage.prototype.setItem = function (id, val) {
            return this[id] = JSON.stringify(val);
        }
        Storage.prototype.getItem = function (id) {
            return this.hasOwnProperty(id) ? this[id] : null;
        }
        Storage.prototype.removeItem = function (id) {
            return delete this[id];
        }
        Storage.prototype.clear = function () {
            var self = this;
            Object.keys(this).map(function (key) { self.removeItem(key) });
        }
        window.localStorage = new Storage();
    }
})((function () {
    try {
        return "localStorage" in window && window.localStorage != null;
    } catch (e) {
        return false;
    }
})());

if (!Element.prototype.getBoundingClientRect) {
    Element.prototype.getBoundingClientRect = function() {
        var x = 0, y = 0, width = 0, height = 0;
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            top: y,
            right: x + width,
            bottom: y + height,
            left: x
        };
    }
}

window.MathJax = {
    options: {
        enableAssistiveMml: false,
        enableMenu: false
    }
};
