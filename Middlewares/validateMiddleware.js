const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body); // value => la nouvelle version des donnees apres la validation

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    req.body = value; // remplace les donness principle b les donnees apres la validation
    next();
  };
};

module.exports = validate;
