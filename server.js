//https://github.com/actions-on-google/actions-on-google-nodejs
const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow} = require('actions-on-google');
//const prettyjson = require('prettyjson');
//const request = require('request');
// https://github.com/epeli/underscore.string#tosentencearray-delimiter-lastdelimiter--string
//const toSentence = require('underscore.string/toSentence');

const spells = require('./intent-spells');
const monsters = require('./intent-monsters');
const classes = require('./intent-classes');
const features = require('./intent-features');

const app = dialogflow({debug:false});

app.intent('DnD Spells',(conv,params)=>{
    return spells.getSpellUrl(conv,params);
});

app.intent('DnD Monsters',(conv,params)=>{
    return monsters.getMonsterUrl(conv,params);
});

app.intent('DnD Classes',(conv,params)=>{
    return classes.getClassUrl(conv,params);
});

app.intent('DnD Features',(conv,params)=>{
    return features.getFeatureUrl(conv,params);
});

express().use(bodyParser.json(), app).listen(3000);

// Pretty print objects for logging.
function logObject(message, object, options) {
  console.log(message);
  console.log(prettyjson.render(object, options));
}


//https://www.google.com/search?q=DnD+Apis&rlz=1C1CHBF_enUS742US742&oq=DnD+Apis&aqs=chrome..69i57j69i64.1841j0j7&sourceid=chrome&ie=UTF-8
//https://github.com/adrpadua/5e-srd-api
//https://www.reddit.com/r/dndnext/comments/43a09o/srd_monsters_in_json_format/
//https://app.roll20.net/compendium/dnd5e/BookIndex
//https://github.com/jcquinlan/dnd-spells/blob/master/spells.json
//http://www.dnd5eapi.co/docs/
//http://www.dnd5eapi.co/