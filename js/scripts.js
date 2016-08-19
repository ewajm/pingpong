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
  var nethackToggle = false;
  var sillyWordArray = [["ping", "pong"], ["fiddle", "faddle"], ["hoity", "toity"], ["hunky", "dory"], ["boogie", "woogie"], ["jiggery", "pokery"]];
  var scrollArray = [["ZELGO", "MER"], ["DAIYEN", "FOOELS"], ["ELBIB", "YLOH"], ["VENZAR", "BORGAVVE"], ["KERNOD", "WEL"], ["ELAM", "EBOW"], ["DUAM", "XNAHT"], ["HACKEM", "MUCHE"], ["VELOX","NEB"], ["FOOBIE", "BLETCH"], ["GARVEN", "DEH"]];
  //create select box
  generateSelect(scrollArray);
  //process basic ping pong form
  $("form#inputForm").submit(function(event){
    $("div#result span").remove();
    $("div#result").hide();
    event.preventDefault();
    var topNum = parseInt($("input#numInput").val());
    var wordsIndex = parseInt($("select#wordSelect").val());
    var outputArray = pingPong(topNum, scrollArray[wordsIndex]);
    createNethackDisplay(outputArray);
    $("div#result").show();
  });

  $("#clear").click(function(event){
    event.preventDefault();
    $("form#inputForm")[0].reset();
    $("div#result").empty();
    $("div#result").hide();
  });

  function generateSelect(array){
    for(i = 0; i < array.length; i++){
      $("select#wordSelect").append("<option value='" + i + "'>" + array[i][0] + " " + array[i][1] + "</option>");
    }
  }

  function createNethackDisplay(array){
    var htmlString = '<p>You read "';
    for(var i = 0; i < array.length; i++){
      if(i > 0){
        htmlString+= " ";
      }
      htmlString += (array[i]);
    }
    htmlString += '" <button class="btn btn-default">More</button></p>';
    $("#result").addClass("nethackResult").removeClass("normalResult").append(htmlString);
  }

  function createRegularDisplay(array){
    for(var i = 0; i < outputArray.length; i++){
      var resultClass;
      if(!parseInt(outputArray[i])) {
        resultClass = "silly"
      } else {
        resultClass = "number"
      }
      $("div#result").append("<span class='output " + resultClass + " '>" + outputArray[i] + "<span>");
    }
  }

});
