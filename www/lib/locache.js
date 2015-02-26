define(function (require) {

    "use strict";

    return {
        /**
         * @string key
         * @whatever item
         * @integer ttl, in seconds
         */
        set: function(key, item, ttl) {
            if(!item)
                return;

            if(ttl) {
                window.localStorage.setItem(key + '-ttl', new Date(new Date().getTime() + ttl * 1000).getTime());
            }
            return window.localStorage.setItem(key, JSON.stringify(item));
        },

        /**
         * @string key
         */
        get: function(key) {
            if(   
                   window.localStorage.getItem(key + '-ttl') 
                && window.localStorage.getItem(key + '-ttl') < new Date().getTime()
            )
            {
                this.remove(key);
                this.remove(key + '-ttl');
                return null;
            }
            return JSON.parse(window.localStorage.getItem(key));
        },

        /**
         * @string key
         */
        remove: function(key)
        {
            return window.localStorage.setItem(key, null);
        },

        /**
         * @string key
         * @whatever key
         */
        push: function(key, item) {
            var existing = this.get(key) ? this.get(key) : [];
            existing.push(item);
            this.set(key, existing);
        }
    };
});