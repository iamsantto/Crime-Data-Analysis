var fs = require('fs');

var rL = require('readline');
var neew=[];
var newRead = fs.createReadStream('../crime.csv', 'UTF8');

var readl = rL.createInterface({
  input : newRead
});

var indexVals = [];
var condVals = [];
var final = {};

var filteredDataHead = [];
var filteredData = [];
var beatArrO = [];
var beatArrU = [];
var yearArr = [];

var yearInd = [];




var cols = ["ID","Case Number","Date","Block","IUCR","Primary Type","Description","Location Description","Arrest","Domestic","Beat","District","Ward","Community Area","FBI Code","X Coordinate","Y Coordinate","Year","Updated On","Latitude","Longitude","Location" ]
//var cols = ["S.No","Name","Dept","College","Maths","English","Biology"]
var keys = ["Description","Beat","Year"];
var condKey = ["Description","Year"];

var cond1 = "OVER $500";
var cond2 = "$500 AND UNDER";
var cond3 = 2000;
var cond4 = 2017;

var yearTag = "Year ";
var overTag = "Over $500";
var underTag = "Under $500";



readl.on('line', function (test){

      var line = test.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      var a = line.toString();
      var b = cols.toString();

              if(a == b) {
                if (condKey.length != 0){
                  for (var j=0;j<condKey.length;j++){
                    for(var i=0;i<line.length;i++){
                      if (line[i] === condKey[j]) {
                        var temp1 = line.indexOf(line[i]);
                        condVals.push(temp1);
                       }
                     }
                   }/*-------End of Outer For ----------*/

                 }/*-------------End of If (condkey null Check)----------*/

                 for (var j=0;j<keys.length;j++){
                   for(var i=0;i<line.length;i++){
                     if (line[i] === keys[j]) {
                       var temp1 = line.indexOf(line[i]);
                       indexVals.push(temp1);
                       filteredDataHead.push(line[i]);
                      }
                    }
                  }

               }/*----------End of If (a==b)---------------*/

               else {
                    var temp3 = new Object();
                    var condTemp = [];
                    for (var q=0; q<condVals.length; q++){
                      condTemp.push(line[condVals[q]]);
                    }
                    var beatNum = parseInt(line[indexVals[1]]);

                    if ((condTemp[0] === cond1 || condTemp[0] === cond2 ) && (cond3<condTemp[1]<cond4)){
                      var temp4 = parseInt(condTemp[1]);

                      if(yearArr.indexOf(temp4) == -1){
                            yearArr.push(temp4);
                            beatArrO[(yearArr.length-1)] = 0;
                            beatArrU[(yearArr.length-1)] = 0;
                              }

                      for (var p=0;p<yearArr.length;p++){
                        if ((condTemp[0])===cond1) {
                            beatArrO[p]=beatArrO[p]+beatNum;
                          }

                        else if ((condTemp[0])===cond2) {
                              beatArrU[p]=beatArrU[p]+beatNum;
                            }
                      }/*--------------End of for -------------*/
                    }
                }

                for(var z=0; z<yearArr.length; z++){
                  yearInd[z] = yearTag + yearArr[z];
                }

                for(var s=0; s<yearArr.length; s++){
                  var preFinal = {};
                  preFinal[overTag] = beatArrO[s];
                  preFinal[underTag] = beatArrU[s];
                  final[yearInd[s]] = preFinal;
                }


}).on('close', function(){
  fs.writeFile('beatRate.json',JSON.stringify(final),'UTF8');
  console.log("Successfully Converted");
});
