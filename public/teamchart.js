var players = [];
var currentplayer = ""
  var chart = bb.generate({
    data: {
      x: "x",
      columns: [
        0,0
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

// Load Chart
function loadChart(player){
  $.getJSON("https://nbabackend.ignorelist.com/t/"+player+"/"+$('#stats').val(), (data)=>{
    var x = Object.keys(data);
    var y = Object.values(data);
    x = x.map(function(x){return x.split("T")[0]});
    x.unshift("x")
    y.unshift(player)
      chart.load({
        x: "x",
        columns: [x,y],
      })
    })
}
function loadChartUnload(player){
  $.getJSON("https://nbabackend.ignorelist.com/t/"+player+"/"+$('#stats').val(), (data)=>{
    var x = Object.keys(data);
    var y = Object.values(data);
    x = x.map(function(x){return x.split("T")[0]});
    x.unshift("x")
    y.unshift(player)
      chart.load({
        x: "x",
        columns: [x,y],
        unload: ''
      })
    })
}
function drawChart() {
  $.getJSON("https://nbabackend.ignorelist.com/t/"+$('#p1').val()+"/"+$('#stats').val(), (data)=>{
    players.push($('#p1').val())
    var x = Object.keys(data);
    var y = Object.values(data);
    x = x.map(function(x){return x.split("T")[0]});
    x.unshift("x")
    y.unshift($('#p1').val())
    if (!$('#addteam').is(":checked")){
      currentplayer = $('#p1').val()
      players = [];
      chart.load({
        x: "x",
        columns: [x,y],
        unload:''
      })
    }
    else{
      loadChart(currentplayer);
      players.forEach((p) => {
        loadChart(p)
      })
    }
  })
  var title =$('#p1').val().replace("_"," ").replace(/\b\w/g, l => l.toUpperCase())
  $('#playername').text(title);
  $('#statname').text($('#stats').val());

};
function resetChart(){
chart.unload({})
  $('#playername').text("");
  $('#statname').text("");
  players = [];
  currentplayer = "";
}
function takeScreenshot(){
  html2canvas(document.getElementById("chart")).then(function(canvas) {
    document.body.appendChild(canvas);
});
}
var x = []
var y = []
  var items = [];
  items.unshift("<option value=''>Select Team</option>")
  var teams = ['ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS']
  teams.forEach((key)=>{
      items.push("<option value='"+key+"'>"+key+"</option>")
  })
  $("<select>",{
    html:items.join("")
  }).appendTo("#nav").attr('id','p1');
var stats = ['FGM', 'FGA', 'FG_PCT', 'FG3M', 'FG3A', 'FG3_PCT', 'FTM', 'FTA',
         'FT_PCT', 'OREB', 'DREB', 'REB', 'AST', 'STL', 'BLK', 'TOV', 'PF',
         'PTS']
  var items = []
  stats.forEach((val)=>{
    items.push("<option value='"+val+"'>"+val+"</option>")

  })


  $("<select>",{
    html:items.join("")
  }).appendTo("#nav").attr('id','stats');

  var $ctrl = $('<label />').html('Add Team').prepend($('<input/>').attr({ type: 'checkbox', id: 'addteam'}));
  $ctrl.appendTo("#nav")
  $("<button/>").attr({type: "button", value: "Reset", id:"reset"}).addClass(["btn","btn-primary"]).text("Reset").appendTo("#nav");


  $("#p1").on('change', drawChart)
  $("#stats").on('change',drawChart)
  $("#reset").on('click', resetChart)
  $("#screenshot").on('click',takeScreenshot)
$('#navbardropdown').on('click', ()=>{window.location.href = "index.html"})
$('#navbardropdown2').on('click', ()=>{window.location.href = "team.html"})
