import User from "../models/userModel.js";
import Media from "../models/mediaModel.js";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://famfolioapi.onrender.com";

async function checkUser(req, res, next) {
  const userId = req.auth.payload.sub;

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId, accountType: "user" });
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    const err = new Error("Server error");
    err.status = 500;
    err.type = `${baseUrl}/server-error`;
    err.title = "Internal Server Error";
    err.detail = "An unexpected error occurred";
    err.instance = req.originalUrl;
    next(err);
  }
}

function checkManager(req, res, next) {
  if (req.user.accountType === "manager" || req.user.accountType === "admin") {
    next();
  } else {
    const err = new Error("Forbidden access");
    err.status = 403;
    err.type = `${baseUrl}/forbidden`;
    err.title = "Forbidden";
    err.detail = "You do not have access to this resource";
    err.instance = req.originalUrl;
    next(err);
  }
}

function checkAdmin(req, res, next) {
  if (req.user.accountType === "admin") {
    next();
  } else {
    const err = new Error("Forbidden access");
    err.status = 403;
    err.type = `${baseUrl}/forbidden`;
    err.title = "Forbidden";
    err.detail = "You do not have access to this resource";
    err.instance = req.originalUrl;
    next(err);
  }
}

async function checkUserMediaAccess(req, res, next) {
  try {
    const mediaId = req.params.mediaId;
    const media = await Media.findById(mediaId);

    if (!media) {
      const err = new Error("Media not found");
      err.status = 404;
      err.type = `${baseUrl}/not-found`;
      err.title = "Not Found";
      err.detail = "The requested media does not exist";
      err.instance = req.originalUrl;
      return next(err);
    }

    if (req.user.userId !== media.userId) {
      const err = new Error("Forbidden access");
      err.status = 403;
      err.type = `${baseUrl}/forbidden`;
      err.title = "Forbidden";
      err.detail = "You do not have access to this media";
      err.instance = req.originalUrl;
      return next(err);
    }

    next();
  } catch (error) {
    const err = new Error("Server error");
    err.status = 500;
    err.type = `${baseUrl}/server-error`;
    err.title = "Internal Server Error";
    err.detail = "An unexpected error occurred";
    err.instance = req.originalUrl;
    next(err);
  }
}

export { checkUser, checkManager, checkAdmin, checkUserMediaAccess };
