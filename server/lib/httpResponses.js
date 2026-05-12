export function parseIdParam(req) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return null;
  }

  return id;
}

export function sendBadRequest(res, message) {
  res.status(400).json({
    message,
  });
}

export function sendNotFound(res, message) {
  res.status(404).json({
    message,
  });
}
