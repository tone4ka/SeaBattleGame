import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import csrf from "csurf";
import flash from "connect-flash";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;
import session from "express-session";
import MongoStore from "connect-mongodb-session";
let MongoStoreSession = MongoStore(session);
import onTheSeaRoutes from "./routes/onTheSea.js";
import homeRoutes from "./routes/home.js";
import authRoutes from "./routes/auth.js";
import keys from "./keys/index.js";
import varMiddleware from "./middleware/variables.js";
import usersMiddleware from "./middleware/usersArr.js";
const app = express();
import runSocketIo from "./websocket/runSocketIo.js";

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine); 
app.set("view engine", "hbs"); 
app.set("views", "views"); 
app.use(express.static(path.join(path.resolve(path.dirname('')), "public")));
app.use(express.urlencoded({ extended: true }));
const store = new MongoStoreSession({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(usersMiddleware);
app.use("/", homeRoutes);
app.use("/onthesea", onTheSeaRoutes);
app.use("/auth", authRoutes);

async function start() {
  try {
    const url = keys.MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    runSocketIo(server);
  } catch (e) {
    console.log(e);
  }
}
start();
