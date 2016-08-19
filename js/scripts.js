//<!-- Back End -->
var pingPong = function(topNum){
  var pingPongArray =[];
  for(var i = 1; i <= topNum; i++){
    pingPongArray.push(i);
  }
  return pingPongArray;
};

//<!-- Front End  -->
$(document).ready(function(){
  $("form#inputForm").submit(function(event){
    event.preventDefault();
    var topNum = $("input#input").val();
    $("div#result").text(pingPong(topNum));
  });
});
