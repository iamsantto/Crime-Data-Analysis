d3.json("beatRate.json", function (obj) {
  var keyCount = Object.keys(obj).length;
  var keysArray = [];
  var valArray = [];
  var totVal = [];
  var keysOfKeysArray = [];
  var cond1 = "Over $500";
  var cond2 = "Under $500";

  for (var key in obj) {
      key = parseInt(key);
      keysArray.push(key);
  }


  var keylen = keysArray.length;
  for(var i=0;i<keylen;i++){
    valArray[i] = obj[keysArray[i]];
  }

  for(var j=0;j<keylen;j++){
    totVal[j] = parseInt(valArray[j][cond1]) + parseInt(valArray[j][cond2]);
  }
console.log(totVal);
  var scale = d3.scale.linear();
  scale.domain([]);
  scale.range([]);

  var graph = d3.select("#theftStat").append("svg")
                .attr("height","350")
                // .attr("width","auto")
                .style("background","#eee");
        graph.selectAll("rect")
             .data(totVal)
             .enter().append("rect")
             .attr("x", 50)
             .attr("y", 50)
            //  .attr("height", scale)
             .attr("width", 20)




});
