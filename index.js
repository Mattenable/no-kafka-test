'use strict';

const bluebird = require('bluebird');
const Kafka = require('no-kafka');

const groupConsumer = new Kafka.GroupConsumer({
    connectionString: 'invalidhost:9092',
    groupId: 'my group id'
});

const strategies = [{
    strategy: 'topic consumer',
    subscriptions: ['some topic'],
    handler: () => {},
    fn: Kafka.RoundRobinAssignment
}];

bluebird.try(() => {
    groupConsumer.init(strategies);
})
.timeout(1000)
.then(() => {
    console.log('THIS PRINTS');
    groupConsumer.end();
})
.catch(() => {
    console.log('THIS DOES NOT PRINT');
    groupConsumer.end();
});