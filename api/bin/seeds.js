require('dotenv').config();

const mongoose = require('mongoose');
const Property = require('../models/property.model');
const propertiesData = require('../data/properties.json');

require('../configs/db.config');

mongoose.connection.once('open', () => {
    console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
    mongoose.connection.db.dropCollection('properties')
        .then(() => {
            console.info('Dropped properties collection');
            return Property.create(propertiesData);
        })
        .then((properties) => console.info(`${properties.length} properties created`))
        .catch((error) => console.error(error))
        .finally(() => process.exit(0))
})
