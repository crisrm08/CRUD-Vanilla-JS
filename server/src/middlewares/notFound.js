const notFound = (req, res, next) => {
  const err = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  err.code = 'NOT_FOUND';
  next(err);
};

export default notFound;
