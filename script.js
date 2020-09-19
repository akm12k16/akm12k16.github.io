const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
//const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const theWpm = document.querySelector(".wpm");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

//Change the typing text
//Quotable API https://github.com/lukePeavey/quotable

async function randomQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  //console.log(data);
  console.log(`${data.content} —${data.author}`);
  //return data.content;
  document.querySelector("#origin-text p").innerHTML = data.content;
  
}



// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
	const originText = document.querySelector("#origin-text p").innerHTML;
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#4c990e";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#2f2fb4";
        } else {
            testWrapper.style.borderColor = "#e11313";
        }
    }

}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    //console.log(textEnterdLength);
}

//Words per minute calculations
function wordsPerMinute() {
	//let textEnterdLength = testArea.value.length;
	//const originText = document.querySelector("#origin-text p").innerHTML;
    let textEntered = testArea.value;
	let words = textEntered.split(" ").length - 1;
	if(timer[3] != 0)
	{
	let wpm_value = Math.round ((((words)*100*60) / timer[3]),0);
	//console.log(wpm_value);
	theWpm.innerHTML = wpm_value;
	}
	
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
	theWpm.innerHTML  = 0;
    testWrapper.style.borderColor = "grey";
	randomQuote();
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
testArea.addEventListener("keypress", wordsPerMinute, false); //start wpm calculations




function load()
{
reset();
}

window.onload = load;