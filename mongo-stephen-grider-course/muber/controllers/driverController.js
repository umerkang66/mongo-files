module.exports = {
  greeting(req, res) {
    res.send({ hi: 'from umer' });
  },

  create(req, res) {
    res.send(req.body);
  },
};
