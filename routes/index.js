var express = require('express');
var _ = require('lodash');
var router = express.Router();
const Sequelize = require('sequelize');
var host = process.env.RDS_HOSTNAME;
var user = process.env.RDS_USERNAME;
var password = process.env.RDS_PASSWORD;
var port = process.env.RDS_PORT;
const sequelize = new Sequelize('nba', user, password, {
  host: host,
  port: port,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
var x,y;

router.get('/players', function(req, res, next) {
        sequelize.query('select "DISPLAY_FIRST_LAST","PLAYERCODE"from players').then(r2=>{
            var playerslist = [];
            r2[0].forEach(r3=>{
                var playerName = r3['DISPLAY_FIRST_LAST'];
                var playerCode = r3['PLAYERCODE'];
                playerslist.push({[playerName]:playerCode})
            })
            res.json(playerslist)

})});
/* GET home page. */
router.get('/:playername/:stat', function(req, res, next) {
    sequelize.query('select "GAME_DATE","'+req.params.stat+'" from "'+req.params.playername+'"').then(row => {
       x = [];
       y = [];
        row[0].forEach(r=>{
            x.push(r['GAME_DATE'].toJSON());
            y.push(r[req.params.stat])
        })
        var data = _.zipObject(x,y);
        res.json(data)

        })

    });
router.get('/t/:teamname/:stat', function(req, res, next) {
    sequelize.query('select "GAME_DATE","'+req.params.stat+'" from "'+req.params.teamname+'"where "GAME_DATE" >= \'2003-07-01\'::date').then(row => {
       x = [];
       y = [];
        row[0].forEach(r=>{
            x.push(r['GAME_DATE'].toJSON());
            y.push(r[req.params.stat])
        })
        var data = _.zipObject(x,y);
        res.json(data)

        })

    });
router.get('/:playername/:stat/:span', function(req, res, next) {
    sequelize.query("SELECT date_trunc('"+req.params.span+"',\"GAME_DATE\") as span,AVG(\""+req.params.stat+"\") from \""+req.params.playername+"\" group by span order by span").then(row => {
       x = [];
       y = [];
        row[0].forEach(r=>{
            console.log(r)
            x.push(r['span'].toJSON());
            y.push(r['avg'])
        })
        var data = _.zipObject(x,y);
        var playerslist = [];
        res.json(data);

        })

    });

module.exports = router;
