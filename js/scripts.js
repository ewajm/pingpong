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
  var hitPoints;
  //original array
  var sillyWordArray = [["ping", "pong"], ["fiddle", "faddle"], ["hoity", "toity"], ["hunky", "dory"], ["boogie", "woogie"], ["jiggery", "pokery"]];
  //scroll array for nethack
  var scrollArray = [["ZELGO", "MER"], ["DAIYEN", "FOOELS"], ["ELBIB", "YLOH"], ["VENZAR", "BORGAVVE"], ["KERNOD", "WEL"], ["ELAM", "EBOW"], ["DUAM", "XNAHT"], ["HACKEM", "MUCHE"], ["VELOX","NEB"], ["FOOBIE", "BLETCH"], ["GARVEN", "DEH"]];
  //create select box
  generateSelect(sillyWordArray);
  //process basic ping pong form
  $("form#inputForm").submit(function(event){
    event.preventDefault();
    var topNum = parseInt($("input#numInput").val());
    var wordsIndex = parseInt($("select#wordSelect").val());
    clear();
    var outputArray;
    if(nethackToggle){
      outputArray = pingPong(topNum, scrollArray[wordsIndex]);
      createNethackDisplay(outputArray);
    } else {
      outputArray = pingPong(topNum, sillyWordArray[wordsIndex]);
      createRegularDisplay(outputArray);
    }
    $("div#result").show();
  });

  $("#clear").click(function(event){
    event.preventDefault();
    clear();
  });

  $("#displaySwitch").click(function(){
    nethackToggle = !nethackToggle;
    var displayArray=[["Let's Ping Pong!", "Let's Nethack!"],["Choose your words", "Scroll Labeled"], [sillyWordArray, scrollArray]];
    var displayIndex = (nethackToggle ? 1 : 0);
    $("body").toggleClass("nethackMode");
    $(".container").toggleClass("regularMode");
    $("#result").toggleClass("nethackResult normalResult");
    $(".nethack").toggle();
    $("select").empty();
    $("h1").text(displayArray[0][displayIndex]);
    $("#wordSelectLabel").text(displayArray[1][displayIndex]);
    generateSelect(displayArray[2][displayIndex]);
    clear();
    if(nethackToggle){
      hitPoints =10;
      var playerName = prompt("What is your name?");
      $("#playerName").text(playerName + " the CodeWizard");
    }
  });

  function generateSelect(array){
    for(i = 0; i < array.length; i++){
      $("select#wordSelect").append("<option value='" + i + "'>" + array[i][0] + " " + array[i][1] + "</option>");
    }
  }

  function clear(){
    $("form#inputForm")[0].reset();
    $("div#result").empty().hide();
    $("#wizard, #player").text("@");
  }

  function createRegularDisplay(array){
    for(var i = 0; i < array.length; i++){
      var resultClass;
      if(!parseInt(array[i])) {
        resultClass = "silly"
      } else {
        resultClass = "number"
      }
      $("div#result").append("<span class='output " + resultClass + " '>" + array[i] + "<span>");
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
    htmlString += '"</p> <button id="more" class="btn btn-default">More</button>';
    $("#result").append(htmlString);
    $(".hideOnAttack").hide();
    $("#more").click(processNethackOutcome);
  }

  //gets outcome from back end and processes it for display in front - runs on button click from result display
  function processNethackOutcome(){
    var outcome = getNethackOutcome();
    var outcomeString = "<p>" + outcome[0];
    if(outcome[1]){
      outcomeString += "<br>The wizard dies. You have defeated the Wizard of Yendor! Congratulations!";
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
    $("#again").click(function(){
      clear();
      $(".hideOnAttack").show();
    });
  }
});
