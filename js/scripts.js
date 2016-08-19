//<!-- Back End -->
var checkNum = function(number, sillyWords){
  if(number % 15 === 0){
    return sillyWords[0] + sillyWords[1];
  } else if(number % 5 === 0){
    return sillyWords[1];
  } else if(number % 3 === 0){
    return sillyWords[0];
  } else {
    return number;
  }
}

var pingPong = function(topNum, sillyWords){
  var pingPongArray =[];
  var toPush;
  if(topNum > 0){
    for(var i = 1; i <= topNum; i++){
      pingPongArray.push(checkNum(i, sillyWords));
    }
  } else {
    for(var i = -1; i >= topNum; i--){
      pingPongArray.push(checkNum(i, sillyWords));
    }
  }
  return pingPongArray;
};

//<!-- Front End  -->
$(document).ready(function(){

  var sillyWordArray = [["ping", "pong"], ["fiddle", "faddle"], ["hoity", "toity"], ["hunky", "dory"], ["boogie", "woogie"], ["jiggery", "pokery"]];
  //create select box
  for(var i = 0; i < sillyWordArray.length; i++){
    $("select#sillyWord").append("<option value='" + i + "'>" + sillyWordArray[i][0] + " " + sillyWordArray[i][1] + "</option>");
  }
  //process basic ping pong form
  $("form#inputForm").submit(function(event){
    $("div#result span").remove();
    $("div#result").hide();
    event.preventDefault();
    var topNum = parseInt($("input#numInput").val());
    var sillyWordIndex = parseInt($("select#sillyWord").val());
    var outputArray = pingPong(topNum, sillyWordArray[sillyWordIndex]);
    for(var i = 0; i < outputArray.length; i++){
      var resultClass;
      if(!parseInt(outputArray[i])) {
        resultClass = "silly"
      } else {
        resultClass = "number"
      }
      $("div#result").append("<span class='output " + resultClass + " '>" + outputArray[i] + "<span>");
    }
    $("div#result").show();
  });

  $("#clear").click(function(event){
    event.preventDefault();
    $("form#inputForm")[0].reset();
    $("div#result span").remove();
    $("div#result").hide();
  });

});
