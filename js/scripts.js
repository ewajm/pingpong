//<!-- Back End -->
var pingPong = function(topNum){
  var pingPongArray =[];
  for(var i = 1; i <= topNum; i++){
    if(i % 15 === 0){
      pingPongArray.push("pingpong");
    } else if(i % 5 === 0){
      pingPongArray.push("pong");
    } else if(i % 3 === 0){
      pingPongArray.push("ping");
    } else {
      pingPongArray.push(i);
    }
  }
  return pingPongArray;
};

//<!-- Front End  -->
$(document).ready(function(){
  $("form#inputForm").submit(function(event){
    event.preventDefault();
    var topNum = parseInt($("input#input").val());
    $("div#result").text(pingPong(topNum));
  });
});
