$(function () {
  var navList = [
    {name: 'Home'},
    {name: 'About'},
/*    {name: 'Stuff'},*/
    {name: 'Resume'}
  ]

  var source = $("#nav-template").html();
  var template = Handlebars.compile(source);
    
  $("#navContainer").html(template(navList));
  source = $("#rightNav-template").html();
  template = Handlebars.compile(source);

  $("#rightNav").html(template(navList));
 //if($("#pageContainer .regContent").text().length < 4) {
  if(!$.trim($("#pageContainer .regContent").html()).length) {
    function popHome(data) {
      $("#pageContainer .regContent").empty().html(data);
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

  $.height = window.innerHeight;
  var $navItems = $(".navItem");
  var navCount = $navItems.length / 2;
  $navItems.each(function () {
    var tmpWidth = $(this).width();
    var padCalc = ($("#navContainer").width() / navCount) - tmpWidth;
    $(this).css("padding-left", (padCalc / 2) + 'px');
    $(this).css("padding-right", (padCalc / 2) + 'px');
    var theHost = location.host;
    var thePath = $(this).text().toLowerCase().replace(/\s/g,'');
    var theUrl = 'http://' + theHost + '/';
    theUrl += thePath;
    theUrl = (theUrl).replace(/\s/g,'');
    $(this).click(function () {
      function getData(data) {
        $("#pageContainer .regContent").empty().html(data);
      };
      $.ajax({
        url: theUrl,
        context: document.body,
        success: getData
      });
    });
  });
  //$("#pageContainer").height($.height - $("navContainer").height);
  //console.log($.height);
};

function pdfAdjust() {
  var browserWidth = window.innerWidth;
  $(".resumePdf").each(function () {
    $(this).width(browserWidth + 'px');
  });
};

$(document).ready(navAdjust);
$(window).resize(navAdjust);
