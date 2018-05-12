x = x.map(function(x){return x.split("T")[0]});
        x.unshift("x")
        y.unshift("y") 
var chart = bb.generate({
  data: {
    x: "x",
    columns: [
        x,y
    ],
    type: "scatter"
  },  axis: {
    x: {
      type: "timeseries",
      tick: {
        format: function (x) {
		return x.getFullYear();
	}
      }
    }
  },
  bindto: "#chart"
});

