let gender = "";
let ageConfirmed = false;

// Step 1: Select Gender
function selectGender(selectedGender) {
  gender = selectedGender;
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

// Step 2: Confirm Age
function confirmAge(is18OrOlder) {
  if (!is18OrOlder) {
    alert("Sorry, you must be 18+ to use this application.");
    return;
  }
  ageConfirmed = true;
  showResult();
}

// Step 3: Show Result
function showResult() {
  const randomCount = Math.floor(Math.random() * 101); // Random count between 0 and 100
  document.getElementById("bodyCount").innerText = randomCount;
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  // Save data to Google Sheets
  saveDataToGoogleSheets(gender, randomCount);
}

function saveDataToGoogleSheets(gender, count) {
  const url = "https://script.google.com/macros/s/AKfycbwHFAwMd4Oj2mpuIE47y-3j28znCeu2Zd8KYoDzsTOMo1fMCeINsrobp1ey5sFv39Tw/exec";
  const data = {
    gender: gender,
    count: count,
    timestamp: new Date().toISOString()
  };

  fetch(url, {
    method: "POST",
    mode: 'no-cors', // Important for cross-origin requests
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log('Response received:', response);
    // Note: With no-cors mode, you won't be able to read the response
  })
  .catch(error => {
    console.error("Error saving data:", error);
  });
}

// Share Result
function shareResult() {
  const count = document.getElementById("bodyCount").innerText;
  const message = `My body count is ${count}! Find out yours: [www.facebook.com]`;
  alert(message); // Replace with actual sharing logic if needed
}


