const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-val");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
const qrBtn = document.getElementById("generate-qr");
const speakBtn = document.getElementById("speak");
const toggleVisibilityBtn = document.getElementById("toggle-visibility");

const qrCanvas = document.getElementById("qr-code");

let passwordVisible = false;

toggleVisibilityBtn.addEventListener("click", () => {
  passwordVisible = !passwordVisible;
  passwordInput.type = passwordVisible ? "text" : "password";
  toggleVisibilityBtn.textContent = passwordVisible ? "👁" : "🙈";
});

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", () => {
  const length = +lengthSlider.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const password = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
  passwordInput.value = password;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  alert("Password copied!");
});

qrBtn.addEventListener("click", () => {
  QRCode.toCanvas(qrCanvas, passwordInput.value || "Generate a password first", error => {
    if (error) console.error(error);
  });
});

speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(passwordInput.value || "No password generated");
  speechSynthesis.speak(utterance);
});

function generatePassword(length, lower, upper, number, symbol) {
  const generators = [];
  if (lower) generators.push(getRandomLower);
  if (upper) generators.push(getRandomUpper);
  if (number) generators.push(getRandomNumber);
  if (symbol) generators.push(getRandomSymbol);

  if (generators.length === 0) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomFunc = generators[Math.floor(Math.random() * generators.length)];
    password += randomFunc();
  }
  return password;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
