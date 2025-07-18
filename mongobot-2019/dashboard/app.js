const config = require("../config");
const crt = require("./crt");
module.exports.load = async(client) => {
    try{
        const express = require("express");
        const path = require("path");
        const utils = require("./utils");
        const bodyParser = require("body-parser");
        const https = require("https");
        const fs = require("fs");
        const vhost = require('../vhost');
        const passport = require("passport");
        const { Strategy } = require("passport-discord");
        const mainRouter = require("./routes/index");
        const loginRouter = require("./routes/login");
        const logoutRouter = require("./routes/logout");
        const session = require("express-session");
        const host = config.host;
        app = express();
        app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .engine("html", require("ejs").renderFile)
        .set("view engine", "ejs")
        .use(express.static(path.join(__dirname, "/public")))
        .use(vhost(host, express.static(`${config.hehe}/dashboard/public`)))
        .set('views', path.join(__dirname, "/views"))
        .use(session({ secret: config.dashboard.expressSessionPassword, resave: false, saveUninitialized: false }))
        .use(passport.initialize())
        .use(passport.session())
        .use(async function(req, res, next){
            req.client = client;
            if(req.user && req.url !== "/"){
                req.userInfos = await utils.fetchUser(req.user, req.client, req.query.q);
            }
            next();
        })
        .use(vhost(host, loginRouter))
        .use(vhost(host, logoutRouter))
        .use(vhost(host, mainRouter))
        .use(vhost(host, function(req, res, next){
            res.status(404).render("errors/404", {
                user: req.userInfos,
                is_logged: (req.isAuthenticated())
            });
        }))
        .use(function(err, req, res, next) {
            res.status(500).render("errors/500v1", {
                user: req.userInfos,
                is_logged: (req.isAuthenticated())
            });
        })
        .use(function(err, req, res, next) {
            res.status(500).render("errors/500v2", {
                user: req.userInfos,
                is_logged: (req.isAuthenticated())
            });
        })
        //.use("/", tickets)
        //.use("/", ticketdel)
        //.use("/", loginRouter)
        //.use("/", logoutRouter)
        //.use("/", mainRouter)
        .use(function(req, res, next){
            res.status(404).render("errors/404", {
                user: req.userInfos,
                is_logged: (req.isAuthenticated()),
                currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
            });
        })
        .listen(80);
        https.createServer({
            key: crt.key,
            cert: crt.crt,
            passphrase: 'YOUR PASSPHRASE HERE'
        }, app)
        .listen(443);
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((obj, done) => {
            done(null, obj);
        });
        
        let disStrat = new Strategy({
            clientID:       client.user.id,
            clientSecret:   config.dashboard.secret,
            callbackURL:    config.dashboard.baseURL+"/login",
            scope:          [ "identify", "guilds" ]
        }, function (accessToken, refreshToken, profile, done){
            process.nextTick(function(){
                return done(null, profile);
            });
        });
        
        passport.use(disStrat);
    }
    catch{ }
}