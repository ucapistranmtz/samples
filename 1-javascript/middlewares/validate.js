const validate = (schemas) => {
  return (req, res, next) => {
    const validations = [];

    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) validations.push({ location: "body", details: error.details });
    }

    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, {
        abortEarly: false,
      });
      if (error)
        validations.push({ location: "query", details: error.details });
    }

    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, {
        abortEarly: false,
      });
      if (error)
        validations.push({ location: "params", details: error.details });
    }

    if (schemas.headers) {
      const { error } = schemas.headers.validate(req.headers, {
        abortEarly: false,
      });
      if (error)
        validations.push({ location: "headers", details: error.details });
    }

    if (validations.length > 0) {
      const formatted = validations.flatMap((v) =>
        v.details.map((detail) => ({
          location: v.location,
          field: detail.path.join("."),
          message: detail.message,
        }))
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: formatted,
      });
    }
    next();
  };
};
module.exports = validate;
