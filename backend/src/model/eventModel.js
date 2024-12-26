const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true },
    location: {type: String, require: true},
    images: [{type: String, required: false}],
    eventDetails: {type: String, required: true},
})

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;