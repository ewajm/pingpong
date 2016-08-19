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

var getNethackOutcome = function(){
  var outcomeArray = ["Nothing happens.",
  "This is a scroll of gold detection! You now know there is a bunch of gold somewhere else.",
  "This is a scroll of scare monster. The wizard looks scared!",
  "This is a scroll of amnesia. Who is this wizard and why are you fighting them?",
  "This is a scroll of destroy armor.  I guess you're naked now. And still fighting a wizard.",
  "This is a scroll of fire. You throw it at the wizard!",
  "This is a scroll of earth. A boulder drops on the wizard!"]
  var outcomeNum = Math.floor(Math.random()*outcomeArray.length)
  var wizardDed = false;
  var youDed=false;
  if(outcomeNum > outcomeArray.length - 3 && Math.round(Math.random())){
      wizardDed = true;
  }
  if(!wizardDed){
    wizardTurn = Math.round(Math.random());
  }
  return [outcomeArray[outcomeNum], wizardDed, wizardTurn];
}

//<!-- Front End  -->
$(document).ready(function(){
  var nethackToggle = false;
  var hitPoints = 10;
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
    htmlString += '" <button id="more" class="btn btn-default">More</button></p>';
    $("#result").addClass("nethackResult").removeClass("normalResult").append(htmlString);
    $("#more").click(function(event){
      event.preventDefault();
      var outcome = getNethackOutcome();
      var outcomeString = "<p>" + outcome[0];
      if(outcome[1]){
        outcomeString += "<br>The wizard dies. You have defeated the Wizard of Yendor! Congratulations! Not that he has the Amulet of Yendor, of course, but still, good job.";
        $("#wizard").text("%");
        hitPoints = 10;
      } else {
        if(wizardTurn){
          outcomeString += "<br>The wizard hits!";
          hitPoints--;
          if(hitPoints === 0){
            outcomeString += "You died.";
            $("#player").text("%");
          }
        } else {
          outcomeString += "<br>The wizard misses!";
        }
      }
      $("#hitPoints").text(hitPoints);
      outcomeString +="</p><button id='again' class='btn btn-default'>Try again</button>";
      $("div#result").empty().html(outcomeString);
      $("#again").click(function(event){
        event.preventDefault();
        $("div#result").empty().hide();
        $("form#inputForm")[0].reset()
        $(".hideOnAttack").show();
        $("#wizard, #player").text("@");
      });
    });
    $(".hideOnAttack").hide();
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
