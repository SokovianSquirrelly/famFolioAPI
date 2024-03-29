const handleErrors = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }

  res.setHeader("Content-Type", "application/problem+json");

  let problemJson = {
    type: err.type || "about:blank",
    title: err.title || "Internal Server Error",
    status: err.status,
    detail: err.detail || "An unexpected error occurred",
    instance: req.originalUrl,
    // Additional fields
    user: err.user || null,
    post: err.post || null,
    errors: err.errors || null,
  };

  // Specific handling for 401 Unauthorized error
  if (err.status === 401) {
    problemJson = {
      ...problemJson,
      type: "https://famfolioapi.onrender.com/unauthorized",
      title: "Unauthorized",
      detail:
        "You do not have the necessary permissions to access this resource",
    };
  }

  res.status(err.status).json(problemJson);
};

export default handleErrors;
