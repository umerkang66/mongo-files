const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'from umer' });
  },

  async create(req, res, next) {
    try {
      const { email } = req.body;
      const driver = await Driver.create({ email });

      res.send(driver);
    } catch (err) {
      // This error will be called in the error handling middleware
      next(err);
    }
  },

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const driverProps = req.body;

      const driver = await Driver.findByIdAndUpdate(id, driverProps, {
        new: true,
        runValidators: true,
      });

      res.send(driver);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Driver.findByIdAndDelete(id);

      res.send(null);
    } catch (err) {
      next(err);
    }
  },
};
