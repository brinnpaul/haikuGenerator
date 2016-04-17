var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
};

function formatData(data){
  var lines = data.toString().split("\n"),
      dictArray = [];

  lines.forEach(function(line){
    var lineSplit = line.split("  ");
    if (lineSplit[1]) {
      lineSplit[1] = lineSplit[1].split(' ');
      var syls = 0;
      lineSplit[1].forEach(function(el) {
        if (el.match(/\d/)) {
          syls++;
        }
      });

      lineSplit[2] = syls;
      dictArray.push(lineSplit);
    }
  });
  return dictArray;
}

var syllables = function(val) {
  var arr = [];

  val.forEach(function(word) {
    var syl = word[2];
    if (!arr[syl]) {
      arr[syl] = [word[0]];
    } else {
      arr[syl].push(word[0]);
    }
  });

  return arr;
}

function createHaiku(structure, syllabelsArr){
  var arrOfWords;
  return structure.map(function(lines){
    return lines.map(function(syls){
      arrOfWords = syllabelsArr[syls];
      return arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
    }).join(' ');
  }).join('\n');
}

var dataArr = formatData(cmudictFile);
var syllable = syllables(dataArr);
var structure = [[5],[7],[5]];

console.log(createHaiku(structure, syllable));
