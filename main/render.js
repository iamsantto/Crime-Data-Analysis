d3.json("beatRate.json", function (obj) {
  var keyCount = Object.keys(obj).length;
  var keysArray = [];
  var valArray = [];
  var totVal = [];
  var keysOfKeysArray = [];
  var underArray = [];
  var cond1 = "Over $500";
  var cond2 = "Under $500";

  var margin = {left:100, top:30, right:20, bottom:30};


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
    underArray[j] = parseInt(valArray[j][cond2]);
  }

  var xScale = d3.scale.ordinal();
  var yScale = d3.scale.linear();

  yScale.domain([0,d3.max(totVal)]);
  yScale.range([0,300]);

  xScale.domain(keysArray);
  xScale.rangeRoundBands([0,800],0.5);


  var graph = d3.select("#theftStat").append("svg")
                .attr("height","450")
                .attr("width","auto")
                .style("background","#eee");

                var g = graph.append("g")
                        .attr("transform","translate(" + margin.left + "," + margin.bottom + ")");

                var xAxisG = g.append("g")
                    .attr("transform","translate(0,0)");
                var yAxisG = g.append("g");

                var xAxis = d3.svg.axis() .scale(xScale).orient("top");
                var yAxis = d3.svg.axis() .scale(yScale).orient("left");


    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

        var one = g.append("g")
                   .attr("transform","translate(10,0)");
        var two = g.append("g")
                   .attr("transform","translate(10,0)");

        one.selectAll("rect")
             .data(totVal)
             .enter().append("rect")
             .style("fill","blue")
             .attr("y",0)
             .attr("height", yScale)
             .attr("width", 20)

    var stack = one.selectAll("rect");
      stack.data(keysArray)
        .attr("x",xScale);

        two.selectAll("rect")
             .data(underArray)
             .enter().append("rect")
             .attr("y",0)
             .attr("height", yScale)
             .attr("width", 20)
             .attr("fill","red")

    var graph2 = two.selectAll("rect");
      graph2.data(keysArray)
        .attr("x",xScale);

        graph.append("rect")
            .style("fill","red")
            .attr("height","20")
            .attr("width","20")
            .attr("x","600")
            .attr("y","300");
        graph.append("text")
            .text("Thefts <500")
            .attr("x","625")
            .attr("y","315");
            graph.append("rect")
                .style("fill","blue")
                .attr("height","20")
                .attr("width","20")
                .attr("x","600")
                .attr("y","350");
            graph.append("text")
                .text("Thefts >500")
                .attr("x","625")
                .attr("y","365")



});

d3.json("arrestCount.json", function (obj) {

  var keyCount = Object.keys(obj).length;
  var keysArray = [];
  var valArray = [];
  var arrestVal = [];
  var notArrestVal = [];

  var cond1 = "Arrests";
  var cond2 = "Not Arrested";
  var cond3 = "Year";

  var margin = {left:100, top:30, right:20, bottom:30};


  for (var key in obj) {
      key = parseInt(key);
      keysArray.push(key);
  }


  var keylen = keysArray.length;
  for(var i=0;i<keylen;i++){
    valArray[i] = obj[keysArray[i]];
  }

  for(var j=0;j<keylen;j++){
    valArray[j][cond3] = keysArray[j];
    valArray[j][cond1] = parseInt(valArray[j][cond1]);
    valArray[j][cond2] = parseInt(valArray[j][cond2]);
    notArrestVal[j] = parseInt(valArray[j][cond2]);
  }

  var graph = d3.select("#assStat").append("svg")
              .attr("height","450")
              .attr("width","auto")
              .style("background","#eee");

              var xScale = d3.scale.ordinal();
              var yScale = d3.scale.linear();

              yScale.domain([0,d3.max(notArrestVal)]);
              yScale.range([0,300]);

              xScale.domain(keysArray);
              xScale.rangeRoundBands([0,800]);

              var g = graph.append("g")
                      .attr("transform","translate(" + margin.left + "," + margin.bottom + ")");

              var xAxisG = g.append("g")
                  .attr("transform","translate(0,0)");
              var yAxisG = g.append("g");

              var xAxis = d3.svg.axis() .scale(xScale).orient("top");
              var yAxis = d3.svg.axis() .scale(yScale).orient("left");


  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

      var one = g.append("g")
                 .attr("transform","translate(10,0)");
      var two = g.append("g")
                 .attr("transform","translate(10,0)");

        var arrestLine = d3.svg.line()
               .x(function(d) { return xScale(d[cond3]); })
               .y(function(d) { return yScale(d[cond1]); });

        var notArrestLine = d3.svg.line()
                .x(function(d) { return xScale(d[cond3]); })
                .y(function(d) { return yScale(d[cond2]); });

        one.append("path")
          .attr("class", "line")
          .style("stroke","red")
          .style("fill","none")
          .attr("d", arrestLine(valArray));

        two.append("path")
            .attr("class", "line")
            .style("stroke","Blue")
            .style("fill","none")
            .attr("d", notArrestLine(valArray));

            graph.append("rect")
                .style("fill","red")
                .attr("height","20")
                .attr("width","20")
                .attr("x","600")
                .attr("y","300");
            graph.append("text")
                .text("Arrested")
                .attr("x","625")
                .attr("y","315");
                graph.append("rect")
                    .style("fill","blue")
                    .attr("height","20")
                    .attr("width","20")
                    .attr("x","600")
                    .attr("y","350");
                graph.append("text")
                    .text("Not Arrested")
                    .attr("x","625")
                    .attr("y","365")

});
