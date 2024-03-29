const handleErrors = (err, req, res, next) => {
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
      status: 401,
    };
    res.status(401).json(problemJson);
    return;
  }

  // Specific handling for CastError
  if (err.name === "CastError") {
    problemJson = {
      ...problemJson,
      type: "https://famfolioapi.onrender.com/invalid-id",
      title: "Invalid ID",
      status: 400,
      detail: "The provided ID is not a valid MongoDB ObjectId",
    };
    res.status(400).json(problemJson);
    return;
  }

  // Specific handling for 500 Internal Server Error
  if (err.status === 500 || !err.status) {
    problemJson = {
      ...problemJson,
      type: "https://famfolioapi.onrender.com/internal-server-error",
      title: "Internal Server Error",
      status: 500,
      detail: "An unexpected error occurred on the server",
    };
    res.status(500).json(problemJson);
    return;
  }

  // If none of the specific errors, respond with the original error status and message
  res.status(err.status).json(problemJson);
};

export default handleErrors;
