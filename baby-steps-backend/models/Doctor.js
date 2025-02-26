const { default: mongoose } = require('mongoose');
const express = require('mongoose');

const DocterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    workingHours: {
        start: {
            type: String,
            required: true
          },
          end: {
            type: String,
            required: true
          }
        },
        specialization: {
            type: String
          }
})

module.exports = mongoose.model('Doctor', DocterSchema);