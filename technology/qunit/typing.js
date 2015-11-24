/**
 * Created by wesleyyoung1 on 11/24/15.
 */
var source = document.getElementById("source");
var findProg = setInterval(checkProg, 5);
var min = 1;
var sec = 59;
var time;
function TypingModel(source){
    this.sourceDocument = source;
    this.theirDocument = "";
    this.prog = 0;
    //If what the user has typed so far, equal to how far they got
    this.isAccurate = function(){
        return true;
    };
    //Set theirDocument to whatever they typed
    this.setTheirDocument = function(theirDocument){
        this.theirDocument = theirDocument;
    };
    //Return percentage of completion
    this.progress = function(){
        this.prog = Math.round((this.theirDocument.length / this.sourceDocument.length) * 1000);
    };
    //Evaluate theirDocument and check if it is equal to the source document
    this.evaluate = function(){
        if (this.sourceDocument.slice(0, this.theirDocument.length) == this.theirDocument){
            return true;
        }
        else{
            return false;
        }
    }
}
var x = new TypingModel(source.innerHTML);

function checkProg(){
    x.setTheirDocument(document.getElementById("theirDoc").value);
    x.progress();
    document.getElementById("progBar").innerHTML  = "<div style='background-color: red; height: 43px; width: " + x.prog + "px'></div>"
}

function timer(){
    var sBtn = document.getElementById("sBtn");
    sBtn.setAttribute("onclick", "stopTime()");
    sBtn.setAttribute("class", "col-md-12 btn btn-danger");
    time = setInterval(sTimer, 1000);
    document.getElementById("timer").innerHTML = min + ":" + sec;
}
function sTimer(){
    sec--;
    if (sec < 0){
        sec = 59;
        min--;
    }
    if (sec < 10){
        document.getElementById("timer").innerHTML = min + ":" + "0" + sec;
    }
    else{
        document.getElementById("timer").innerHTML = min + ":" + sec;
    }
    if (min == 0 && sec == 0){
        stopTime();
        wpm();
    }
}

function stopTime(){
    clearInterval(time);
    var sBtn = document.getElementById("sBtn");
    sBtn.setAttribute("onclick", "timer()");
    sBtn.setAttribute("class", "col-md-12 btn btn-success");
}
function wpm(){
    var words = document.getElementById("theirDoc").value.split(" ");
    var wPm = words.length / 2;
    document.getElementById("wpm").innerHTML = wPm.toFixed(2);
}