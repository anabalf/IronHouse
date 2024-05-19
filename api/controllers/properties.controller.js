const mongoose = require("mongoose");
const Property = require("../models/property.model");
//const axios = require('axios');


// async function getCoordinates(address) {
//     const apiKey = process.env.VITE_GOOGLE_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
//     return axios.get(url)
//     .then(response => {
//         if (response.data.status === 'OK') {
//             const location = response.data.results[0].geometry.location;
//             return {
//                 type: 'Point',
//                 coordinates: [location.lng, location.lat]
//             };
//         } else {
//             console.error('Error from Geocoding API:', response.data.error_message);
//             throw new Error('Unable to geocode address');
//         }
//     })
//     .catch(error => {
//         console.error('Error in Geocoding API request:', error.message);
//         throw new Error('Unable to geocode address');
//     });
// }

module.exports.create = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)

    if (req.file) {
        req.body.coverUrl = req.file.path;
    }

    const propertyData = { ...req.body, owner: req.user._id };
    Property.create(propertyData)
      .then((property) => res.status(201).json(property))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(400).json(err.errors);
          console.log(err);
        } else {
          next(err);
        }
      });
}

module.exports.list = (req, res, next) => {
    const { visited, limit, page = 0 } = req.query;
    const criterial = { owner: req.user._id };
    if (visited) {
        criterial.visited = visited;
    }
    Property.find(criterial)
        .sort({ createdAt: -1 })  
        .limit(limit || 30) 
        .skip(limit * page)
        .then((properties) => res.json(properties))
        .catch(next);
};

module.exports.detail = (req, res, next) => {
    Property.findById(req.params.id)
        .then((property) => {
            if (property) {
                if (property.owner.equals(req.user._id)) { 
                    res.json(property);
                } else {
                    res.status(403).json({ message: "Forbidden" }); 
                }
            } else {
                res.status(404).json({ message: "Property not found" })
            }
        })
        .catch(next);
};

module.exports.update = (req, res, next) => {
    
    if (req.file) {
        req.body.coverUrl = req.file.path;
    }

    Property.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    })
        .then((property) => {
            if (property) {
                res.json(property);
            } else {
                res.status(404).json({ message: "Property not found" })
            }
        })
        .catch((err) => {
            if(err instanceof mongoose.Error.ValidationError) {
                res.status(400).json(err.errors);
            } else {
                next(err);
            }
        });
};

module.exports.delete = (req, res, next) => {
    Property.findByIdAndDelete(req.params.id)
        .then((property) => {
            if (property) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Property not found" })
            }
        })
        .catch(next);
};

