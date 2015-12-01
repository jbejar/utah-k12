
var newWord = $("#newWord");
var listHolder = $("#listHolder");
var newWordHolder = $("#newWordHolder");
var btnHolder = $("#btnHolder");
var checkWord = $("#checkWord");
var nextBtnHolder = $("#nextBtnHolder");
var tryWord;
var currentQues = 0;
var ourList = [];
var theList;
var quizForm = "";

function WordList(source, delimeter) {
    this.delimeter = delimeter || " ";
    this.words = source.split(this.delimeter);
    this.size = function(){
        return this.words.length;
    };
    this.get= function (i) {
        return new Word(this.words[i]);
    };
    this.sort = function(){
        this.words.sort()
    }

}

function Word(src, language) {
    this.src = src;
    this.voice = window.speechSynthesis.getVoices()[1];
    this.language = language || "en";
    this.translation = this.language == 'en' ? new Word('word','fr') : null;
    this.say = function() {
        var msg = new SpeechSynthesisUtterance(this.src);
        msg.voice = this.voice;
        window.speechSynthesis.speak(msg);
    };
    this.spelledRight = function(word) {
        return word.toUpperCase() == src.toUpperCase();
    }

}

function createList(){
    if (ourList.length <= 9){
        var y = "";
        ourList.push(newWord.val());
        ourList.forEach(function(content, index){
            y += "<p id='" + index + "'>" + (index + 1) + ". " + content + "</p>";
        });
        listHolder.html(y);
        newWord.val("");
    }
}

function startSpelling(){
    if (ourList.length > 0){
        ourList.forEach(function(content, index){
            quizForm += "<p>" + (index + 1) + ".) " + "<input id='" + index + "try'" + " class='newword' type='text'/>" +
                "<br>" +
                    "<button class='btn btn-danger' type='button'' onclick='checkSpelling(" + index + ")'>Grade</button>" +
                    "<button class='btn btn-info' type='button' onclick='hear(" + index + ")'>Hear</button><br>" +
                "<span id='" + index + "res" + "'></span></p>";
        });
        listHolder.html(quizForm);
        tryWord = $("#tryWord");
        newWordHolder.html(null);
        theList = new WordList(ourList.join(" "));

    }
}

function checkSpelling(x){
    var error = $("#" + x + "res");
    var trying = $("#" + x + "try");
    if (theList.get(x).spelledRight(trying.val())){
        error.css("color", "green");
        error.text("Correct!");
    }
    else{
        error.css("color", "red");
        error.text("Incorrect, please try again");
    }
}

function hear(x){
    theList.get(x).say(x)
}