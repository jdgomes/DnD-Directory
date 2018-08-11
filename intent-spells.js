const request = require('request');
const { dialogflow, BasicCard } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getSpellUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/spells/?name='+ encodeURIComponent(params.Spell).replace(" ","+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          return getSpellInfo(body.results[0]['url'], resolve1, conv)
        }
      });
    });
  }
}

function getSpellInfo(url, resolve1, conv){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask("");
        conv.ask(new BasicCard({ 
          title: body.name + " | " +body.level+ " | " + body.range + " | " + body.casting_time,
          subtitle:body.school.name +" | "+ toSentence(body.components),
          text: body.desc + " #### " + body.higher_level}));
        resolve1();
        resolve2();
      }
    });
  });
}
