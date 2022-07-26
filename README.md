# Eris Messages
**Eris Messages** is a simple to use, lightweight and fast **Message Handler** for the Node.js Discord library [Eris](https://www.npmjs.com/package/eris).

It supports two ways of handling messages:
- Bulk collecting a specified amount of messages over a set period of time
- Continuous listening for new messages being made

The API is pretty straight forward and only requires the native event emitter as a dependency for fast event emitting.

# Getting Started
Simply install Eris Messages via NPM `npm install eris-messages` and require it wherever you need it!

# API 
#### Setting up a listener:
```js
new messageCollector(client, options);
```
- **Eris.Client** `client` - *An Eris client.*
- **Object** `options` - *An object containing following options:*
    - **Function** `options.filter` - *A filter for the messages that sould be collected.*
    - **Number** `options.maxMessages` - *The maximum amount of messages to collect.*
    - **Number** `options.maxTime` - *The maximum amount of time the collector should run for in milliseconds.*

In addition to that a temporary listener needs to be attached to listen for the `message` event:
```js
.on('message', eventListener);
```
- **String** `'message'` - *The event name. This **MUST** stay the same!*
- **Function** `eventListener` - *The event listener which is passed an object.*
    - **Object** `Eris.Message` - *The object emitted from the `message` event*.
```js
.on('end', eventListener);
```
- **String** `'end'` - *The event name. This **MUST** stay the same!*
- **Function** `eventListener` - *The event listener which is passed a string.*
    - **String** `reason` - *The reson for the collector to stop, it can be `maxMessages` or `timeEnd`*.

# License
This repository makes use of the [MIT License](https://opensource.org/licenses/MIT) and all of its correlating traits.

#  
A small credit if this repository was to be used would be highly appreciated!\
If you liked the code please give it a star!
