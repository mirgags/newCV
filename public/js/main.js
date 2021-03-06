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
  $("#rightNav").append('<div id="feedbackBtn"></div>');
 //if($("#pageContainer .regContent").text().length < 4) {
  if(!$.trim($("#pageContainer .regContent").html()).length) {
    function popHome(data) {
      $("#pageContainer .regContent").empty().html(data);
      //$("#footerContainer").html('<script async src="//cdn.trackduck.com/toolbar/prod/td.js" data-trackduck-id="581bac501816be44752c5c24"></script>"');
      //$("#footerContainer").html('<script type="text/javascript">(function() {var s = document.createElement("script");s.type = "text/javascript";s.async = true;s.src = \'//api.usersnap.com/load/\'+\'ac82192f-9c93-4751-b9c7-d021d99f8cf4.js\';var x = document.getElementsByTagName(\'script\')[0];x.parentNode.insertBefore(s, x);})();</script>');
    };
    $.ajax({
      url: "//" + location.host + "/home",
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
    var theUrl = '//' + theHost + '/';
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-75405903-1', 'auto');
ga('send', 'pageview');

$(document).ready(navAdjust);
$(window).resize(navAdjust);
