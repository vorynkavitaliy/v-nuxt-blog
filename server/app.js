const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const passport = require("passport");
const passportStrategy = require("./middlewere/passport-strategy");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentsRoutes = require("./routes/comments.routes");
const keys = require("./keys");
const app = express();

mongoose.connect(keys.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
}).then(() => {
    console.log('start');
})
.catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1)
});

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all("/getJSON", (req, res) => {
    res.json({ data: "data" });
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentsRoutes);

module.exports = app;
