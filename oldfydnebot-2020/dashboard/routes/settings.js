const express = require("express"),
utils = require("../utils"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

// Gets profile page
router.get("/", CheckAuth, async function(req, res) {
    res.render("settings", {
        user: req.user,
        is_logged: (req.isAuthenticated()),
        language: req.language,
        currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
    });
});

router.post("/", CheckAuth, async function(req, res){
    let user = await req.client.usersData.findOne({id:req.user.id});
    let data = req.body;
    if(data.bio){
        user.bio = data.bio;
    }
    if(data.birthdate){
        if(checkDate(data.birthdate)){
            user.birthdate = checkDate(data.birthdate);
        }
    }
    if(data.language){
        if(data.language === req.language.get("UTILS").FRENCH){
            req.user.locale = "fr";
        } else if(data.language === req.language.get("UTILS").ENGLISH){
            req.user.locale = "en";
        }
    }
    await user.save();
    res.redirect(303, "/settings");
});

module.exports = router;

/**
 * @returns {Boolean}
 */
function checkDate(birthdate){
    let [day, month, year] = birthdate;
    if(!day || !month || !year) return false
    let match = birthdate.match(/\d+/g);
    if (!match) return false;
    let tday = +match[0], tmonth = +match[1] - 1, tyear = +match[2];
    if (tyear < 100){
        tyear += tyear < 50 ? 2000 : 1900;
    }
    let d = new Date(tyear, tmonth, tday);
    if(!(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear())) return false;
    if(d.getTime() > Date.now()) return false;
    if(d.getTime() < (Date.now()-2.523e+12)) return false;
    return d;
}