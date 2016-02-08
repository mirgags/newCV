$(function () {
  var navList = [
    {name: 'Home'},
    {name: 'About'},
    {name: 'Stuff'}
  ]
  
  var source = $("#nav-template").html();
  var template = Handlebars.compile(source);
  
  $("#navContainer").html(template(navList));
  if($("#pageContainer").text().length < 1) {
    function popHome(data) {
      $("#pageContainer").empty().html(data);
    };
    $.ajax({
      url: "http://" + location.host + "/home",
      context: document.body,
      success: popHome
    });
  };
});

function navAdjust() {
  var innerWidth = window.innerWidth;
  var $navItems = $(".navItem");
  $navItems.each(function () {
    var tmpWidth = $(this).width();
    var padCalc = ($("#navContainer").width() / 3) - tmpWidth;
    $(this).css("padding-left", (padCalc / 2) + 'px');
    $(this).css("padding-right", (padCalc / 2) + 'px');
    var theHost = location.host;
    var thePath = $(this).text().toLowerCase().replace(/\s/g,'');
    var theUrl = 'http://' + theHost + '/';
    theUrl += thePath;
    theUrl = (theUrl).replace(/\s/g,'');
    $(this).click(function () {
      function getData(data) {
        $("#pageContainer").empty().html(data);
      };
      $.ajax({
        url: theUrl,
        context: document.body,
        success: getData
      });
    });
  });
};

$(document).ready(navAdjust);
$(window).resize(navAdjust);
