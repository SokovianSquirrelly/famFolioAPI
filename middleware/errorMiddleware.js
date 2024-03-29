const handleErrors = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }

  res.setHeader("Content-Type", "application/problem+json");

  const problemJson = {
    type: err.type || "about:blank",
    title: err.title || "Internal Server Error",
    status: err.status,
    detail: err.detail || "An unexpected error occurred",
    instance: req.originalUrl,
    // Additional fields
    balance: err.balance || null,
    accounts: err.accounts || null,
    errors: err.errors || null,
  };

  res.status(err.status).json(problemJson);
};

export default handleErrors;
