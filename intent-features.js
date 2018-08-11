const request = require('request');
const { dialogflow, BasicCard } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getFeatureUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/Features/?name='+ encodeURIComponent(params.Feature).replace(" ","+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          let url ="";
          body.results.forEach(function(x){ if(x.name == params.Feature){url = x.url}});
          return getFeatureInfo(url, resolve1, conv)
        }
      });
    });
  }
}

function getFeatureInfo(url, resolve1, conv){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask(new BasicCard({ 
          title: body.name + " | Lvl: " + body.level + " | group: " + body.group, 
          subtitle:body.url,
          text: body.desc,
        }));
        resolve1();
        resolve2();
      }
    });
  });
}
