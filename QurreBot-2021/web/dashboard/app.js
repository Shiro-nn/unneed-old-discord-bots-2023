const config = require("../config");
const crt = require("./crt");
module.exports.load = async(client) => {
    //try{
        const express = require("express");
        const path = require("path");
        const utils = require("./utils");
        const bodyParser = require("body-parser");
        const https = require("https");
        const vhost = require('vhost');
        const passport = require("passport");
        const { Strategy } = require("passport-discord");
        const mainRouter = require("./routes/index");
        const modulesRouter = require("./routes/modules");
        const settingsRouter = require("./routes/settings");
        const ticketRouter = require("./routes/ticket");
        const loginRouter = require("./routes/login");
        const session = require("express-session");
        const MongoStore = require('connect-mongo');
        const host = config.host;
        const cdn_host = config.dashboard.cdn;
        app = express();
        app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .engine("html", require("ejs").renderFile)
        .set("view engine", "ejs")
        .use(express.static(path.join(__dirname, "/public")))
        .use('/tickets', express.static(path.join(config.root_directory, "/tickets")))
        .set('views', path.join(__dirname, "/views"))
        .use(session({
            secret: config.dashboard.secret,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: config.mongoDB,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                crypto: {secret: 'sdbSBdSBsdbsasnfs'}
            })
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use(async function(req, res, next){
            req.client = client;
            if(req.user && req.url !== "/"){
                req.userInfos = await utils.fetchUser(req.user, req.client, req.query.q, req);
            }
            next();
        })
        .use(vhost(host, loginRouter))
        .use(vhost(host, mainRouter))
        .use(vhost(host, modulesRouter))
        .use(vhost(host, settingsRouter))
        .use(vhost(host, ticketRouter))
        .use(function(req, res, next){
            try{
                const _t = '/tickets';
                if(!req.originalUrl.startsWith(_t)) next();
                res.redirect(`${config.safe}://tickets1-${config.host}${req.originalUrl.slice(_t.length)}`);
            }catch{next()}
        })
        .use(function(req, res, next){
            res.status(404).render("errors/404", {
                user: req.userInfos,
                is_logged: (req.isAuthenticated())
            });
        })
        .use(function(err, req, res, next) {
            res.status(500).render("errors/500.ejs", {cdn_host});
            const msg = `Произошла ошибка.\nМестоположение: \`${req.protocol}://${req.get("host")}${req.originalUrl}\`\nКод ошибки:\n${err}`;
            req.client.channels.cache.get(config.errors_channel).send(msg);
        })
        .listen(80);
        https.createServer({
            key: crt.key,
            cert: crt.crt
        }, app)
        .listen(443);
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((obj, done) => {
            done(null, obj);
        });
        
        const disStrat = new Strategy({
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
    //}catch{}
}