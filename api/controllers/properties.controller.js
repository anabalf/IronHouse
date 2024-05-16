const mongoose = require("mongoose");
const Property = require("../models/property.model");
const ogs = require("open-graph-scraper");


// module.exports.create = (req, res, next) => {
//     const { url, ...propertyData } = req.body;

//     const scrapePropertyInfo =  (url) => {
//         return new Promise((resolve, reject) => {
//             ogs({ url }, (error, result) => {
//                 if (error) {
//                     console.error('Error scraping property info:', error);
//                     reject('Error scraping property info');
//                 } else {
//                     const { ogTitle, ogDescription, ogImage, ogPrice, ogM2, ogNumberOfRooms, ogOrientation } = result.og;
//                     resolve({
//                         title: ogTitle,
//                         description: ogDescription,
//                         coverUrl: ogImage.url,
//                         price: parseFloat(ogPrice),
//                         m2: parseFloat(ogM2),
//                         numberOfRooms: parseInt(ogNumberOfRooms),
//                         orientation: ogOrientation,
//                         source: url,
//                         // Agregar más campos según sea necesario
//                     });
//                 }
//             });
//         });
//     }


//     if (url) {
//         scrapePropertyInfo(url)
//         .then((propertyInfo) => {
//             const mergedPropertyData = { ...propertyInfo, ...propertyData };
//             return Property.create(mergedPropertyData);
//         })
//         .then((property) => res.status(201).json(property))
//         .catch((err) => {
//             if(err instanceof mongoose.Error.ValidationError) {
//                 res.status(400).json(err.errors);
//             } else {
//                 next(err);
//             }
//         });
//     } else {
//         Property.create(propertyData)
//         .then((property) => res.status(201).json(property))
//         .catch((err) => {
//             if(err instanceof mongoose.Error.ValidationError) {
//                 res.status(400).json(err.errors);
//             } else {
//                 next(err);
//             }
//         });
//     }
// };

module.exports.create = (req, res, next) => {
    console.log(req.body);
    Property.create(req.body) // no seguro - habria que poner los campos concretos (nam: req.body.name etc.)
      .then((property) => res.status(201).json(property))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(400).json(err.errors);
          console.log(err)
        } else {
          next(err);
        }
      });
}

module.exports.list = (req, res, next) => {
    const { visited, limit, page = 0 } = req.query;
    const criterial = {};
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
                res.json(property);
            } else {
                res.status(404).json({ message: "Property not found" })
            }
        })
        .catch(next);
};

module.exports.update = (req, res, next) => {
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

