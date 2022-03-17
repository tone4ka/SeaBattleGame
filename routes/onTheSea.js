import express from "express";
const Router = express;
const router = Router();

router.get("/", (req, res) => {
  const user = req.currentUserName;
  console.log(user);

  res.render("onTheSea", {
    currentUserName: req.currentUserName,
    title: "On The Sea",
    isOnTheSea: true,
  });
});

export default router;
