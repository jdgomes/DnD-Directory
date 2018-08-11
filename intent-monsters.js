const request = require('request');
const { dialogflow, BasicCard } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getMonsterUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/Monsters/?name='+ encodeURIComponent(params.Monster).replace(" ","+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          return getMonsterInfo(body.results[0]['url'], resolve1, conv)
        }
      });
    });
  }
}

function getMonsterInfo(url, resolve1, conv){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask("");
        conv.ask(new BasicCard({ 
          title: body.name + " | ac: " +body.armor_class+ " | hp: " + body.hit_points + " | sp: " + body.speed,
          subtitle: " | st: " + body.strength + " | dex: " + body.dexterity + " | con: " + body.constitution + " | int: " + body.intelligence + " | wis: " + body.wisdom,
          text: body.url}));
        resolve1();
        resolve2();
      }
    });
  });
}
