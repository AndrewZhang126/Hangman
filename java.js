var animals = ["cat", "dog", "bird", "frog", "fish", "hyena", "llama", "cheetah", "elephant", "coyote", "hummingbird", "mosquito", "porcupine", "aardvark", "rhinoceros"];
var food = ["pizza", "burger", "salad", "taco", "donut", "sandwich", "spaghetti", "lasagna", "blueberry", "pepperoni", "mayonnaise", "horseradish", "cantaloupe", "pomegranate", "mozzarella"];
var countries = ["china", "germany", "mexico", "russia", "brazil", "ethiopia", "hungary", "portugal", "thailand", "israel", "afghanistan", "madagascar", "philippines", "switzerland","mozambique"];
var choose = ["animals", "food", "countries"];
var im = ["Hangman0.jpg", "Hangman1.jpg", "Hangman2.jpg", "Hangman3.jpg", "Hangman4.jpg", "Hangman5.jpg", "Hangman6.jpg", "Hangman7.jpg"];
var ul = "";
var randWord;
var randCategory;
var displayul = "";
var w = 0;
var l = 0;
var dif = 0;
var randNum;
var randNum2;
var randNum3;
var randNum4;
var time;
var startGame = false;
var myTimer;

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);//this function allows the user to type a letter without using prompts or textfields
    if (startGame == true){
        guess(charStr); //when startGame is set to true, the user can enter a letter to guess
    }
}// source of code: https://stackoverflow.com/questions/1846599/how-to-find-out-what-character-key-is-pressed

function start() {
    document.getElementById("count").innerHTML = "";
    document.getElementById("spaces").innerHTML = "";
    document.getElementById("game").innerHTML = "";
    document.getElementById("win/loss").innerHTML = "";
    document.getElementById("restart").innerHTML = "";
    clearInterval(myTimer);
    count = 0;
    ul = "";
    displayul  = "";
    var display = "";
    document.getElementById("ul").innerHTML = ul;
    var g = findWord(); //this calls the function that is used to find the random word
    for (i = 0; i < randWord.length; i++) {
        display = display + " " + "_";
    }
    document.getElementById("spaces").innerHTML = display;
    var tmp = time;
    myTimer = setInterval(function(){
        var c=tmp--,m=(c/60)>>0,s=(c-m*60)+'';
        document.getElementById("timer").textContent= "Time Left Before Game Ends = " + m+':'+(s.length>1?'':'0')+s
        tmp!=0||(tmp=time);
        if (m == 0 && s == 1){
            document.getElementById("game").innerHTML = "Game Over. You Ran Out Of Time";
            document.getElementById("restart").innerHTML = "Click Start Game To Retry";
            clearInterval(myTimer);
        }//this is a timer that limits the amount of time allowed for the player to play. If the time runs out, the player loses

    },1000); // source of code: https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
    document.getElementById("type").innerHTML = "Type A Letter To Guess";
    startGame = true; //once the user starts the game, they can guess
}

function guess(input){
    //var input = prompt("Guess a letter");
    if (!isLetter(input)){
        alert("Enter Only One Letter");
        return;
        //this code makes sure what the user typed is a letter. If the input isn't a letter, then the user gets to guess again
    }
    if(input.charAt(0) === input.charAt(0).toUpperCase()) {
        input =  input.charAt(0).toLowerCase();
        //if the user enters a capital letter, it will still work
    }
    var display = "";
    var guess = "";
    ul = ul + input;
    var d = true;
    for (k=0;k<randWord.length;k++){
        var a = false;
        for (i=0;i<ul.length;i++){
            if (ul.substring(i,i+1)==randWord.substring(k,k+1)){
                a = true;
                guess = ul.substring(i,i+1); //if the user enters a correct letter, then what they entered will be saved as the guess variable
            }
        }
        if (a == true){
            display = display + " " + guess; //this displays the letter that the user entered if it matched a letter from the actual word
        }
        else{
            display = display + " " + "_"; //if what the user entered did not match a letter from the actual word, an underscore will display in place of the letter
            d = false;
        }
    }
    var f = findCount(); //this calls the function that keeps score of how many guesses the user got wrong
    displayul =displayul + input + "," + " "; //this displays all the letters the user entered
    document.getElementById("spaces").innerHTML = display;
    document.getElementById("ul").innerHTML = "Used Letters = " + displayul;
    document.getElementById("count").innerHTML = "Number of Wrong Guesses = " + f;
    if (d == true){
        document.getElementById("game").innerHTML = "You Win"; //if var d remains true, the the user has guesses all the letters in the word, and they win
        w++;//this keeps track of the number of games won
        startGame = false;
        document.getElementById("restart").innerHTML = "Click Start Game For A New Word";
        document.getElementById("winloss").style.visibility = "visible";
    }
    else if (f == 7){
        document.getElementById("game").innerHTML = "Game Over. Your word was " + randWord; //if the user guesses incorrectly 7 times, they lose, and the actual word is displayed
        l++; //this keeps track of the number of games lost
        startGame = false;
        document.getElementById("restart").innerHTML = "Click Start Game To Retry";
        document.getElementById("winloss").style.visibility = "visible";
    }
    document.getElementById("pic").src = "/HangmanProject/HangmanImages/" + im[f]; //every time the user guesses wrong, var f adds 1, and thus the index of the array of pictures adds 1 too. Thus every wrong guess results in a new picture
}

function findWord(){
    randNum = Math.floor(Math.random() * 3); //this chooses a random number between 0 and 3
    randNum2 = Math.floor(Math.random() * 4); //this chooses a random number between 0 and 5
    randNum3 = Math.floor(Math.random() * 4)+6; //this chooses a random number between 5 and 10
    randNum4 = Math.floor(Math.random() * 4)+11; //this chooses a random number between 10 and 15
    randCategory = choose[randNum]; //this determines the random category. Since there are only 3 categories, randNum will work
    if (dif == 0){
        dif = difficulty(); //this calls the function that asks the user to enter the difficulty level
    }
    if (dif == 1){  //if the user enters 1 as the difficulty level, the random words chosen will be easy
        if (randCategory == "animals") {
            randWord = animals[randNum2]; //this determines the random word from a category. Since the easy words are the first 5 words, randNum2 will work
        }
        else if (randCategory == "food"){
            randWord = food[randNum2];
        }
        else{
            randWord = countries[randNum2];
        }
        time = 5 * 60; //the amount of time allowed for the player to guess the word is based on the difficulty they choose
    }
    else if (dif == 2){
        if (randCategory == "animals") {
            randWord = animals[randNum3];
        }
        else if (randCategory == "food"){
            randWord = food[randNum3];
        }
        else{
            randWord = countries[randNum3];
        }
        time = 3 * 60;
    }
    else if (dif == 3){
        if (randCategory == "animals") {
            randWord = animals[randNum4];
        }
        else if (randCategory == "food"){
            randWord = food[randNum4];
        }
        else{
            randWord = countries[randNum4];
        }
        time = 60;
    }
    else {
        alert("Enter 1, 2, or 3"); //if what the user entered was not a 1, 2, or 3, they need to try again and enter the correct numbers
        return;
    }
    //document.getElementById("word").innerHTML = randWord;
    document.getElementById("category").innerHTML = "Category is " + randCategory;
}

function difficulty(){
    return prompt("Enter Difficulty. Press 1 for Easy, 2 for Medium, and 3 for Hard");
}


function winloss(){
    document.getElementById("win/loss").innerHTML = "Total Games Won = " + w + ", " + "Total Games Lost = " + l;
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
    //this function checks if what the user enters is a single letter between a and z
}// source of code: https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript

function findCount(){
    var count = 0;
    for (k=0;k<ul.length;k++){
        var c = false;
        for (i=0;i<randWord.length;i++){
            if (ul.substring(k,k+1)==randWord.substring(i,i+1)){
                c = true; //this matches all the letters the user enters with the letters in the random word. If they all match, then the user guessed correctly
            }

        }
        if (c == false){
            count++; //if what the user entered did not match, then they guessed incorrectly, and the number of wrong guesses they had increases by 1
        }
    }
    return(count);
}


function reset(){
    ul = "";
    randWord = "";
    displayul = "";
    w = 0;
    l = 0;
    dif = 0;
    startGame = false;
    clearInterval(myTimer);
    document.getElementById("word").innerHTML = randWord;
    document.getElementById("category").innerHTML = "";
    document.getElementById("ul").innerHTML = displayul;
    document.getElementById("count").innerHTML = "";
    document.getElementById("spaces").innerHTML = "";
    document.getElementById("game").innerHTML = "";
    document.getElementById("restart").innerHTML = "";
    document.getElementById("win/loss").innerHTML = "";
    document.getElementById("pic").src = "/HangmanProject/HangmanImages/Hangman0.jpg";
    document.getElementById("winloss").style.visibility = "hidden";
    document.getElementById("timer").textContent="";
    document.getElementById("type").innerHTML = "";
    // this button resets all appropriate global variables and all paragraphs and pictures and also clears the timer
}
