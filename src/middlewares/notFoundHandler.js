const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'route not found!',
  });
};

export default notFoundHandler;
