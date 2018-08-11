const request = require('request');
const { dialogflow, BasicCard } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getClassUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/classes/?name='+ encodeURIComponent(params.Class).replace(" ","+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          let url ="";
          body.results.forEach(function(x){ if(x.name == params.Class){url = x.url}});
          return getClassInfo(url, resolve1, conv)
        }
      });
    });
  }
}

function getClassInfo(url, resolve1, conv){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask(new BasicCard({ 
          title: body.name + " | hit-die: " + body.hit_die, 
          subtitle:body.url,
          text: toSentence(body.saving_throws.map(function(x) {return x.name ;})),
        }));
        resolve1();
        resolve2();
      }
    });
  });
}
