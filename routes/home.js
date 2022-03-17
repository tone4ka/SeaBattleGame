import express from "express";
const Router = express;
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
      currentUserName: req.currentUserName,
      title: 'Home page',
      isHome: true
    });
})


export default router;