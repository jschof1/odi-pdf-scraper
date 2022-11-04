// get all files in directory and combine them into one file
const fs = require('fs');
const jsonMerger = require('json-merger');

// get all file names in directory
const files = fs.readdirSync('./Report-JSONs/');

// read all files and combine them into one array
const data = files.map(file => {
    return JSON.parse(fs.readFileSync('./Report-JSONs/' + file));
});



// let results = jsonMerger.mergeFiles(files);

// // write to file
fs.writeFileSync('combined.json', JSON.stringify(data, null, 2));

// //  convert all json objects of the array into one json object


