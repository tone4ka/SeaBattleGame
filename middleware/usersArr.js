import usersArr from "../variables/ausersArr.js";

export default function (req, res, next) {
  const currentUserName = req.session.user ? req.session.user.name : "unknown";
  req.currentUserName = currentUserName;
  next();
};
