var fs = require('fs');

var rL = require('readline');
var neew=[];
var newRead = fs.createReadStream('../../crime.csv', 'UTF8');

var readl = rL.createInterface({
  input : newRead
});

var indexVals = [];
var final = {};

var filteredDataHead = [];

var beatArrO = [];
var beatArrU = [];
var yearArr = [];
var yearInd = [];
var tempval = 0;


function objGen() {
  for(var s=0; s<yearArr.length; s++){
    var preFinal = {};
    preFinal[overTag] = beatArrO[s];
    preFinal[underTag] = beatArrU[s];
    final[yearInd[s]] = preFinal;
  }
}

//var cols = ["ID","Case Number","Date","Block","IUCR","Primary Type","Description","Location Description","Arrest","Domestic","Beat","District","Ward","Community Area","FBI Code","X Coordinate","Y Coordinate","Year","Updated On","Latitude","Longitude","Location" ]
var keys = ["Primary Type","Arrest","Year"];
var cond1 = "true";
var cond2 = "ASSAULT";
var cond3 = 2000;
var cond4 = 2017;
var yearTag = "Year ";
var overTag = "Arrests";
var underTag = "Not Arrested";

readl.on('line', function (test){

      var line = test.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      if (tempval == 0) {
                       for (var j=0;j<keys.length;j++){
                         for(var i=0;i<line.length;i++){
                           if (line[i] === keys[j]) {
                             var temp1 = line.indexOf(line[i]);
                             indexVals.push(temp1);
                             filteredDataHead.push(line[i]);
                            }
                          }
                        }
                        tempval=1;
                     }/*----------End of If header---------------*/

      else {
                      if ((line[indexVals[0]] == cond2 ) && (cond3<line[indexVals[2]]<cond4)){
                        var temp4 = parseInt(line[indexVals[2]]);
                        if(yearArr.indexOf(temp4) == -1){
                              yearArr.push(temp4);
                              beatArrO[(yearArr.length-1)] = 0;
                              beatArrU[(yearArr.length-1)] = 0;
                        }
                        for (var p=0;p<yearArr.length;p++){
                          if ((line[indexVals[2]]) == yearArr[p]) {
                              if((line[indexVals[1]]) === cond1){
                                beatArrO[p]=beatArrO[p]+1;
                              }
                              else {
                                beatArrU[p]=beatArrU[p]+1;
                              }
                            }
                        }/*--------------End of for -------------*/
                    }
                  for(var z=0; z<yearArr.length; z++){
                    yearInd[z] = yearTag + yearArr[z];
                  }
                objGen();
           }

}).on('close', function(){
  console.log(final);
  //fs.writeFile('arrestCount.json',JSON.stringify(final),'UTF8');
  console.log("Successfully Converted");
});
