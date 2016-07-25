// var fileSys = require('fs');
//
// var stud = [];
// var file = fileSys.readFileSync('crime.csv');
// var element = file.toString().split('\r\n');
//
// for (var i = 0; i < element.length-1; i++) {
//     stud.push(element[i].toString().split(','));
//     console.log(stud[i]);
// }

var fs = require('fs');

var neew=[];


var rS = fs.createReadStream('testData.csv', 'UTF8');


      rS.on('data', function(test) {
            var element = test.toString().split('\r\n');
          //  console.log(element);
          for(i=0;i<element.length;i++){
            neew.push(element[i].toString().split(','));
              //console.log(neew[i]);
            }
          console.log(neew);

      }).on('end', function() {
          console.log("Sucess");
      });
//console.log(neew);
