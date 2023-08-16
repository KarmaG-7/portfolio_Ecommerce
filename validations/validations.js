const checkRating = (req, res, next) => {
  const { rating } = req.body;

  if (rating > 0 && rating <= 5) {
    next();
  } else {
    res.status(404).send("Rating must be between 1 and 5 (inclusive)");
  }
};

const validateURL = (req, res, next) => {
  const { product_image } = req.body;
  if (
    product_image.substring(0, 7) === "http://" ||
    product_image.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res.status(404).json({
      error: "You forgot to start your image link with http:// or https://",
    });
  }
};

module.exports = {
  checkRating,
  validateURL,
};
