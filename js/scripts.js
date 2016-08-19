//<!-- Back End -->
var checkNum = function(number){
  if(number % 15 === 0){
    return "pingpong";
  } else if(number % 5 === 0){
    return "pong";
  } else if(number % 3 === 0){
    return "ping";
  } else {
    return number;
  }
}

var pingPong = function(topNum){
  var pingPongArray =[];
  if(topNum > 0){
    for(var i = 1; i <= topNum; i++){
      pingPongArray.push(checkNum(i));
    }
  } else {
    for(var i = -1; i >= topNum; i--){
      pingPongArray.push(checkNum(i));
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
