const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  // 2024-03-06

let options = document.querySelectorAll(".converter-container select");
const btn = document.querySelector(".converter-container button");
let fromCurr= document.querySelector(".converter-input select");
let toCurr= document.querySelector(".converter-input2 select");
const msg = document.querySelector(".converter-output #result");

for (let option of options) {
  for (let codes in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = codes;
    newOption.value = codes;
    option.append(newOption);
    if (option.name === "from" && codes === "USD") {
      newOption.selected = "selected";
    } else if (option.name === "to" && codes === "INR") {
      newOption.selected = "selected";
    }
  }
  option.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
//flag update

let updateFlag = (element) => {
  let codes = element.value;
  let country = countryList[codes];
  let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


//button function
btn.addEventListener("click", async (evt) => {
evt.preventDefault();
let amount = document.querySelector(".converter-container input");
let amtValue = amount.value;
if(amtValue === "" || amtValue < 1){
  alert("Please enter valid amount to convert");
  return;
}
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let result = amtValue * rate;
msg.innerText = `${amtValue} ${fromCurr.value} = ${result} ${toCurr.value}`;
})
 