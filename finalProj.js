var fs = require('fs');

var rL = require('readline');
var neew=[];
var newRead = fs.createReadStream('testData.csv', 'UTF8');

var readl = rL.createInterface({
  input : newRead
});

var indexVals = [];
var final =[];
var filteredDataHead = [];
var filteredData = [];

// var cols = ["ID","Case","Number","Date","Block","IUCR","Primary Type","Description","Location","Description","Arrest","Domestic","Beat","District","Ward","Community Area","FBI Code","X Coordinate","Y Coordinate","Year","Updated On","Latitude","Longitude","Location" ]
var cols = ["S.No","Name","Dept","College","Maths","English","Biology"]
var keys = ["Name","English","College"];




readl.on('line', function (test){

      var line = test.toString().split(',');

      var a = line.toString();
      var b = cols.toString();

              if(a == b) {
                for (var j=0;j<keys.length;j++){
                  for(var i=0;i<line.length;i++){
                    if (line[i] === keys[j]) {
                      var temp1 = line.indexOf(line[i]);
                      indexVals.push(temp1);
                      filteredDataHead.push(line[i]);
                     }
                   }
                 }
               }

               else {
                    var temp3 = new Object();
                    for(var o = 0; o<indexVals.length; o++){
                    var temp2 = line[indexVals[o]];
                    temp3[filteredDataHead[o]]=temp2;
                }
                final.push(temp3);
              }

}).on('close', function(){
console.log(final);
fs.writeFile('test1.json',JSON.stringify(final),'UTF8');
  console.log("Successfully Converted");
});
