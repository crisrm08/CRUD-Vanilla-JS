const isProd = process.env.NODE_ENV === 'production';

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let status = err.status || err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'Internal Server Error';
  let details = err.details || null;

  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && 'body' in err)) {
    status = 400;
    code = 'INVALID_JSON';
    message = 'El cuerpo de la petición no es JSON válido.';
  }

  if (err.name === 'ZodError') {
    status = 400;
    code = 'VALIDATION_ERROR';
    details = err.issues ?? err.errors ?? null;
    message = 'Datos de entrada inválidos.';
  }
  if (err.isJoi) {
    status = 400;
    code = 'VALIDATION_ERROR';
    details = err.details ?? null;
    message = 'Datos de entrada inválidos.';
  }

  if (err.code === '23505') {
    status = 409;
    code = 'UNIQUE_VIOLATION';
    message = 'Registro duplicado (violación de clave única).';
  }
  if (err.code === '23503') {
    status = 409;
    code = 'FOREIGN_KEY_VIOLATION';
    message = 'La operación viola una restricción de clave foránea.';
  }

  const payload = {
    ok: false,
    error: {
      message,
      code,
      ...(details && { details }),
      ...(!isProd && err.stack ? { stack: err.stack } : {}),
    },
    meta: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  };

  console.error(
    `[${payload.meta.timestamp}] ${status} ${code} ${req.method} ${req.originalUrl}\n`,
    !isProd && err.stack ? err.stack : message
  );

  res.status(status).json(payload);
};

export default errorHandler;
