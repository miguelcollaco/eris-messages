'use strict';

const EventEmitter = require('events').EventEmitter;

/**
 * An extremely simple and pretty straight forward message collector for Eris
 */
class MessageHandler extends EventEmitter {
    constructor(client, options = {}) {
        super();

        this.client = client;
        this.ended = false;
        this.filter = options.filter;
        this.options = options;
        this.collected = [];
        this.listener = (message) => this.processMessage(message);

        this.client.on('messageCreate', this.listener);

        if (options.maxTime) {
            setTimeout(() => this.stopListening('timeEnd'), options.maxTime);
        }
    }

    /**
     * Verifys a message for its validity with the provided filter and if the maximum number of message has been reached
     * @param {object} message The message object
     */
    processMessagef(message) {
        if (this.options.filter) {
            if (!this.filter(message)) return;
            this.collected.push(message);
            this.emit('message', message);
        } else {
            this.collected.push(message);
            this.emit('message', message);
        }

        if (this.collected.length >= this.options.maxMatches) {
            this.stopListening('maxMessages');
            return;
        }
    }

    /**
     * Stops collecting messages and removes the listener from the client
     * @param {string} reason The reason for stopping
     */
    stopListening(reason) {
        if (this.ended) return;
        this.ended = true;
        this.client.removeListener('messageCreate', this.listener);
        this.emit('end', this.collected, reason);
    }
}

module.exports = {
    messageCollector: MessageHandler,
};