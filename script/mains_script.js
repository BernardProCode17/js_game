//DOM Elements Variables****************************************************************************************************************
const loremStore = loremObject; // Check sources md for code source
// organized by DOM elements

let wpmEle = document.getElementById("wpm-counter");
const error = document.getElementById("error-out");

const target = document.getElementById("target");
const targetCounter = document.getElementById("target-counter");
let targetSet = document.getElementById("target-set");

const time = document.getElementById("time");
const timeElement = document.querySelector("#time-element");
const timeSuffix = document.querySelector("#change");

const level = document.getElementById("level");
let levelCounter = document.getElementById("level-counter");

let gentextOutput = document.getElementById("gentext");
let userTextInput = document.getElementById("user-input");

const success = document.getElementById("success");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const endButton = document.getElementById("end");
const resetButton = document.querySelector("#reset");

const startTimeTyping = new Date().getTime();

// Counter Variables*******************************************************************************************************************
let numberOfErrors = 0;
let correctWords = 0;
let wpmInit = 0;
let currentLevel = 1;
let targetWordsPerLevel = [3, 5, 10, 15, 25];
let counterTime = 60;

//array and Holder variables************************************************************************************************************
let loremGenText;
let userText;
let typedWords;
let currentWord;
let currentWordIndex = 0;
let interval = null;
let userWordsArray = [];
let genTextWordsArray = [];

//function calls **********************************************************************************************************************
placeHolder();
clickPause();

function placeHolder() {
  // Load Placeholder text in the display box until player starts the game *****************************************************************************************************************
  const place = loremStore.LoremIpsum.words(30);
  gentext.innerHTML = place;
  gentext.classList.add("gentext");
  userTextInput.setAttribute("readonly", true);
}

// Start Button to load up the games *****************************************************************************************************************
const start = startButton.addEventListener("click", function () {
  userTextInput.focus();
  userTextInput.removeAttribute("readonly");
  gentextOutput.style.outline = "thin solid blue";
  gentextOutput.style.color = "blue";
  startButton.style.display = "none";
  pauseButton.style.display = "block";
  pauseButton.innerText = "Pause";
  targetSet.innerHTML = targetWordsPerLevel[currentLevel - 1];
  clickPause();
  generateLorem();
  userTextInput.addEventListener("blur", alwaysfocus);
  // focus();
});

function generateLorem() {
  // generate the random lorem text from the lorem object *****************************************************************************************************************
  loremGenText = loremStore.LoremIpsum.words(
    targetWordsPerLevel[currentLevel - 1]
  );

  let genTextWithSpanTags = "";
  // place each character of each lorem word in a span tag *****************************************************************************************************************
  [...loremGenText].forEach((char) => {
    genTextWithSpanTags += `<span>${char}</span>`;
  });

  // puts the span tags in the display box *****************************************************************************************************************
  gentextOutput.innerHTML = genTextWithSpanTags;
  genTextWordsArray = loremGenText.split(" ");
  return loremGenText;
}

userTextInput.addEventListener("input", userStartsGames);
function userStartsGames() {
  // Start the timer when the user starts typing *****************************************************************************************************************
  if (interval === null) {
    countDownTimer();
  }
  inputValue = this.value;
  inputMatch(this.value);
}

function inputMatch(inputText) {
  // Get the span tags from the display box *****************************************************************************************************************
  const el = gentextOutput.querySelector(`span:nth-child(${inputText.length})`);

  // character match *****************************************************************************************************************
  loremGenText.charAt(inputText.length - 1);

  if (inputText.length <= loremGenText.length) {
    if (
      inputText.charAt(inputText.length - 1) ===
      loremGenText.charAt(inputText.length - 1)
    ) {
      el.style.color = "white";
    } else {
      el.style.color = "green";
      numberOfErrors++;
      error.innerHTML = numberOfErrors;
    }
  }

  // Word match *****************************************************************************************************************
  if (inputText.endsWith(" ")) {
    typedWords = inputText.trim().split(" ");
    currentWord = typedWords[typedWords.length - 1];
    userWordsArray[typedWords]
    if (
      typedWords[typedWords.length - 1] ===
      genTextWordsArray[genTextWordsArray.length - 1]
    ) {
      correctWords++;
      return;
    }

    if (currentWord === genTextWordsArray[typedWords.length - 1]) {
      correctWords++;
      targetCounter.innerHTML = correctWords;
    }
  }

  //Last word match *****************************************************************************************************************
  if (inputText.length === loremGenText.length) {
    typedWords = inputText.trim().split(" ");

    if (
      typedWords[typedWords.length - 1] ===
      genTextWordsArray[genTextWordsArray.length - 1]
    ) {
      correctWords++;
      targetCounter.innerHTML = correctWords;
      levelFunction();

      return;
    }
  }

  if (
    numberOfErrors > 0 &&
    targetWordsPerLevel[currentLevel - 1] === typedWords.length
  ) {
    levelFunction();
  }
  // WPM *****************************************************************************************************************
  const endTimeTyping = new Date().getTime();
  const timepass = (endTimeTyping - startTimeTyping) / 1000;
  let wpm = Math.round((correctWords / timepass) * 60);
  wpmEle.innerHTML = wpm;
}
function levelFunction() {
  // Level up *****************************************************************************************************************
  if (correctWords >= targetWordsPerLevel[currentLevel - 1]) {
    userTextInput.value = null;
    userTextInput.focus();
    success.innerText = "";

    // Reset Counters *****************************************************************************************************************
    currentLevel++;
    levelCounter.innerHTML = currentLevel;

    correctWords = 0;
    targetCounter.innerHTML = correctWords;

    numberOfErrors = 0;
    error.innerHTML = numberOfErrors;

    targetSet.innerHTML = targetWordsPerLevel[currentLevel - 1];

    clearInterval(interval);
    timeElement.innerHTML = 0;
    counterTime = 60;
    interval = null;

    //Function Calls *****************************************************************************************************************
    generateLorem();
    userTextInput.addEventListener("input", userStartsGames);
    return true;
  }

  // Try again if Words is not correct but time is not up *****************************************************************************************************************
  else if (
    !(correctWords >= targetWordsPerLevel[currentLevel - 1]) ||
    counterTime > 0
  ) {
    success.innerText = "Please Try Again!";
    pauseButton.style.display = "none";
    resetButton.style.display = "block";
    endButton.style.display = "block";
    clearInterval(interval);
  }

  // Try again if Words is correct and time is up *****************************************************************************************************************
    else if (
    !(correctWords >= targetWordsPerLevel[currentLevel - 1]) ||
    counterTime === 0
  ) {
    success.innerText = "Please Try Again!";
    pauseButton.style.display = "none";
    resetButton.style.display = "block";
    endButton.style.display = "block";
    clearInterval(interval);
  }
}

function countDownTimer() {
  //clear previous interval *****************************************************************************************************************
  clearInterval(interval);

  //Interval Function *****************************************************************************************************************
  interval = setInterval(function () {
    counterTime--;
    timeElement.innerHTML = counterTime;

    //change min to sec *****************************************************************************************************************
    if (counterTime < 60) {
      timeSuffix.innerHTML = "s";
    }
    // End of Timer *****************************************************************************************************************
    if (counterTime === 0) {
      clearInterval(interval);
      userTextInput.setAttribute("readonly", true);
      pauseButton.style.display = "none";
      resetButton.style.display = "block";
      endButton.style.display = "block";
      clickReset();
      // clickEnd();
      success.innerText = "Please Try Again!";
    }
  }, 1000);
}

function pause() {
  // pause the game *****************************************************************************************************************
  clearInterval(interval);
}

function resume() {
  // resume the game *****************************************************************************************************************
  clearInterval(interval);
  if (counterTime > 0) {
    countDownTimer();
  }
}

function clickPause() {
  pauseButton.addEventListener("click", pauseStyle);

  //Pause button display *****************************************************************************************************************
  function pauseStyle() {
    gentextOutput.style.outline = "none";
    endButton.style.display = "block";
    pauseButton.innerText = "Resume";
    pauseButton.style.width = "auto";
    pauseButton.removeEventListener("click", pauseStyle);
    pauseButton.addEventListener("click", removeEnd);
    pause();
  }
  // Resume Display
  function removeEnd() {
    endButton.style.display = "none";
    gentextOutput.style.outline = "thin solid blue";
    gentextOutput.focus();
    pauseButton.innerText = "Pause";
    pauseButton.style.width = "auto";
    pauseButton.removeEventListener("click", removeEnd);
    pauseButton.addEventListener("click", pauseStyle);
    resume();
  }
}

  endButton.addEventListener("click", clickEnd);
  
  function clickEnd() {

    const confirm = window.confirm("Are you Sure You Want to End The Game?");
    // if user wnats to end the game *****************************************************************************************************************
    if (confirm === true) {
      endButton.style.display = "none";
      startButton.style.display = "block";
      pauseButton.style.display = "none";
      gentextOutput.style.outline = "none";
      resetButton.style.display = "none";
      gentext.value = placeHolder();
      userTextInput.value = null;
      clearInterval(interval);
      counterTime = 60;
      timeSuffix.innerHTML = "min";
      timeElement.innerHTML = 0;
      // timeElement.innerHTML = counterTime;
      success.innerText = "Success Section";
      userTextInput.setAttribute("readonly", true);

      currentLevel = 1;
      levelCounter.innerHTML = currentLevel;
  
      correctWords = 0;
      targetCounter.innerHTML = correctWords;
  
      numberOfErrors = 0;
      error.innerHTML = numberOfErrors;
  
      targetSet.innerHTML = 0;
  
      wpmInit = 0;
      wpmEle.innerHTML = 0;

      if(userStartsGames() === true){
        console.log(counterTime)
        return value;
      }

    }
    
  }

resetButton.addEventListener("click", clickReset);

function clickReset() {
  const confirm = window.confirm("Are you Sure You Want to Reset The Game?");

  // if user wnats to restart the game *****************************************************************************************************************
  if (confirm === true) {
    resetButton.style.display = "none";
    pauseButton.style.display = "block";
    endButton.style.display = "none";
    gentextOutput.style.outline = "thin solid blue";
    userTextInput.removeAttribute("readonly");
    gentextOutput.value = targetWordsPerLevel[currentLevel - 1];
    userTextInput.value = null;
    clearInterval(interval);
    counterTime = 60;
    timeElement.innerHTML = 0;
    timeSuffix.innerHTML = "min";
    success.innerText = " Try Again! \n You can do it!";

    // Reset all the counters *****************************************************************************************************************
    currentLevel = 1;
    levelCounter.innerHTML = currentLevel;

    correctWords = 0;
    targetCounter.innerHTML = correctWords;

    numberOfErrors = 0;
    error.innerHTML = numberOfErrors;

    targetSet.innerHTML = targetWordsPerLevel[currentLevel - 1];

    wpmInit = 0;
    wpmEle.innerHTML = 0;

    //function Calls *****************************************************************************************************************
    userTextInput.focus();
    generateLorem();
    userStartsGames();
    levelFunction();
    countDownTimer();
    
  }
}

userTextInput.addEventListener("blur", alwaysfocus);
  
  function alwaysfocus() {
    setTimeout(function () {
      userTextInput.focus();
    }, 0);
  }

  /*
  
  Hey there, Michael! 
  I tried to implament the reward system but I could not get it to work.
  And i need to move on to the next project.
  maybe you can help me with it after to show me how to do it, and i can learn from it.
 Thnaks!
  
  
  */ 

 
  const rewardList = {
    level1: "https://www.youtube.com/watch?v=GaeLfE3p9Xc",
    level2: "https://www.bcit.ca/programs/front-end-web-developer-certificate-full-time-6535cert/",
    level3: "https://www.powershifter.com",
    level4: "notes/level4 Rewards.jpg",
    level5: "Contact me for a $5 Tim Hortons Gift Card"
  }
  
  const reward = document.createElement("a");
  success.appendChild(reward);
  

if (currentWord === genTextWordsArray[typedWords.length - 1]) {
  switch (currentLevel) {
   case 1:
    reward.href = rewardList.level1;
     reward.innerHTML = 'Click for Reward';
     console.log(rewardList.level1)
     break;
    case 2:
      reward.href = rewardList.level2;
      reward.innerHTML = rewardList.level2;
      break;
    case 3:
      reward.href = rewardList.level3;
      reward.innerHTML = rewardList.level3;
      break;
    case 4:
      reward.href = rewardList.level4;
      reward.innerHTML = rewardList.level4;
      break;
    case 5:
      reward.href = rewardList.level5;
      reward.innerHTML = rewardList.level5;
      break;

    default:
      reward.innerHTML = rewardList.level5;
  }
}




// add next level button 
// organize variable in objects and functional programming 
// partial js files 
// 