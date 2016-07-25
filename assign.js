var myObj =

[{'name':'Saurabh', 'age': 30, 'occupation': "Team Leader"},

{'name':'Anupriya', 'age': 32, 'occupation': "Team Leader"},

{'name':'Kalyani', 'age': 25, 'occupation': "Programmer"},

{'name':'Damodaran', 'age': 27, 'occupation': "Programmer"},


{'name':'Krishnakath', 'age': 22, 'occupation': "Programmer"},

{'name':'Venketraman', 'age': 28, 'occupation': "Programmer"}];

//exercise 1
console.log("----------------------Exercise 1---------------------");

        var key1 = "Programmer";
        var searchSpace = "occupation";
        for (i=0;i<myObj.length;i++){
          if (myObj[i][searchSpace] === key1) {
            console.log(myObj[i]);
          }

        }

//exercise 2
console.log("---------------------Exercise 2---------------------");

    var key2 = 'age';

    function compare (a, b) {
      if (a[key2] > b[key2]) {
         return 1;
       }
      if (a[key2] < b[key2]) {
         return -1;
       }
      return 0;
      };

    var neew = myObj.sort(compare);
    console.log(neew);

// exercise 3
console.log("---------------------Exercise 3---------------------");

var key3 = "occupation"
var typeKey = [];
var temp = '';
var k =0;

  for (i=0;i<myObj.length;i++){
      var pushElement = myObj[i][key3];
      if(temp !== pushElement){
         temp = pushElement;
         typeKey[k]= temp;
         k++;
       }
   }

var picker = function (x){
  var temp1 = [];
  var newObj = myObj;

  for (i=0;i<myObj.length;i++){
      if (myObj[i][key3] === x){
          delete newObj[i][key3];
          temp1.push(newObj[i]);
        }
  }
  return temp1;
}

var final = new Object();
for(var j=0;j<typeKey.length;j++){
    final[typeKey[j]] = picker(typeKey[j]);
  }

console.log(final);
