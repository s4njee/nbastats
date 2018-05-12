
function drawChart() {
    $.getJSON("http://localhost:3000/"+$('#players').val()+"/"+$('#stats').val(), (data)=>{
        console.log(data)
        var x = Object.keys(data);
        var y = Object.values(data);
x = x.map(function(x){return x.split("T")[0]});
        x.unshift("x")
        y.unshift($('#statname').text())
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
      label:"year",
      tick: {
        format: function (x) {
		return x.getFullYear();
	}
      }
    },
    y: {
      label: $('#statname').text()
    }
  },
  bindto: "#chart"
});
});
  $('#playername').text($('#players').val().replace("_"," ").replace(/\b\w/g, l => l.toUpperCase()));
  $('#statname').text($('#stats').val());
}
var x = []
var y = []
var chart = []
$.getJSON("http://localhost:3000/players",(data)=>{
var items = [];
$.each(data,(key,val)=>{
  $.each(val,(key,val)=>{
  items.push("<option value='"+val+"'>"+key+"</option>")
  })

})
  $("<select>",{
      html:items.join("")
  }).appendTo(".container").attr('id','players');
var stats = ['MIN','FGM','FGA','FG_PCT','FG3M','FG3A','FG3_PCT','FTM','FTA','FT_PCT','OREB','DREB','REB','AST','STL','BLK','TOV','PF','PTS','PLUS_MINUS']
var items = []
stats.forEach((val)=>{
  items.push("<option value='"+val+"'>"+val+"</option>")

})


$("<select>",{
html:items.join("")
}).appendTo(".container").attr('id','stats').attr('ng-model','playername');


$("#players").on('change', drawChart)
$("#stats").on('change',drawChart)
})
