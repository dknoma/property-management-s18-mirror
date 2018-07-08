const PropertyItem = require('../models').Property;

module.exports = {
  create(req, res) {
    return PropertyItem
      .create({
				property_id: req.body.property_id,
		    property_name: req.body.property_name,
		    street: req.body.street,
		    city: req.body.city,
		    state: req.body.state,
		    zip: req.body.zip,
		    number_of_bedrooms: req.body.number_of_bedrooms,
		    number_of_bathrooms: req.body.number_of_bathrooms,
		    prices: req.body.prices,
		    url_address: req.body.url_address,
      })
      .then(propertyItem => res.status(201).send(propertyItem))
      .catch(error => res.status(400).send(error));
  },

	retrieve(req, res) {
  return PropertyItem
    .findById(req.params.propertyId, {
      include: [{
        model: Property,
        as: 'propertyItem',
      }],
    })
    .then(property_item => {
      if (!property_item) {
        return res.status(404).send({
          message: 'property Not Found',
        });
      }
      return res.status(200).send(property);
    })
    .catch(error => res.status(400).send(error));
}
};
