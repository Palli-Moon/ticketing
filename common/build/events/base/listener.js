"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000; // 5 sec
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable() // Redelivers every available message when the listener comes back up
            .setManualAckMode(true) // Manual ackmode means the message needs to be acknowledged or the service will keep trying to send it
            .setAckWait(this.ackWait) // Sets acknowledgement timeout
            .setDurableName(this.queueGroupName); // With this and setDeliverAllAvailable only messages that have not been acknowledged will be redelivered. Should be used with queuegroup
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`); // Maybe set this with parameter
            const data = this.parseMessage(msg);
            this.onMessage(data, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
}
exports.Listener = Listener;
