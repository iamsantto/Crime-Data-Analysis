var outerWidth = 1000;
 var outerHeight = 400;
 var barPadding = 0.2;
 var margin = { left:90, top:30, right: 30, bottom: 30};

 var xColumn="yr";
var yColumn="Value";


 var innerWidth = outerWidth - margin.left - margin.right;
 var innerHeight = outerHeight - margin.top - margin.bottom;

 var svg = d3.select("body").append("svg")
   .attr("width", outerWidth)
   .attr("height", outerHeight);
 var g = svg.append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 var xAxisG = g.append("g")
   .attr("transform","translate(0," +innerHeight + ")");
 var yAxisG = g.append("g");

 var xScale = d3.scale.ordinal() .rangeBands([0, innerWidth],barPadding);

 var yScale = d3.scale.linear().range([innerHeight,0]);

 var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
 var yAxis = d3.svg.axis().scale(yScale).orient("left");


 function type(data){
   console.log(data);
   data.forEach(function(d) {
     d["yr"] = + d["yr"];
d["under500"] = + d["under500"];
d["above500"] = + d["above500"];
d["Value"] = + d["under500"]+d["above500"];
//console.log(d["Value"]);
});


      xScale.domain( data.map( function (d){ return d[xColumn];}));
      yScale.domain([0,d3.max(data, function (d){return d[yColumn];})]);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      var bars = g.selectAll("rect").data(data);
      bars.enter().append("rect")
        .attr("width",xScale.rangeBand());


        bars.attr("x",  function(d){return xScale(d[xColumn]);})

          .attr("y", function(d){return yScale(d[yColumn]);})
          .attr("height", function(d){return innerHeight - yScale(d[yColumn]);})
          .attr("fill","blue");


          //var bars = g.selectAll("rect").data(data);
          bars.enter().append("rect")
            .attr("width",xScale.rangeBand());
          bars.attr("x",  function(d){return xScale(d[xColumn]);})
          .attr("y", function(d){return yScale(d[yColumn]);})
          .attr("height", function(d){return innerHeight - yScale(d["above500"]);})
          .attr("fill","green");



 }
 d3.json("part_1_json.json",type);
