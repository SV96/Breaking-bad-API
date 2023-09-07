const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema();
const Character = mongoose.model("characters", characterSchema);

const deathsSchema = new mongoose.Schema()
const deaths = mongoose.model("deaths", deathsSchema);

const quotesSchema = new mongoose.Schema()
const quotes = mongoose.model("quotes", quotesSchema);
 

module.exports = { Character, deaths, quotes };