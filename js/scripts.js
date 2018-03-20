$(function() {
  $("button.invert").click(function() {
    $("body").removeClass();
    $("body").addClass("black");
  });
  $("button.green").click(function() {
    $("body").removeClass();
    $("body").addClass("greenish");
  });
  $("button.reset").click(function() {
    $("body").removeClass();
  });
});
