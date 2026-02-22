const apiKey = "80dfbf0dc0fa482607174115";

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const btn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Load currencies list
async function loadCurrencies(){
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
  const data = await res.json();

  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(c=>{
    fromSelect.innerHTML += `<option value="${c}">${c}</option>`;
    toSelect.innerHTML += `<option value="${c}">${c}</option>`;
  });

  fromSelect.value="USD";
  toSelect.value="LKR";
}

loadCurrencies();

btn.addEventListener("click", convert);

async function convert(){

  const amount = amountInput.value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if(!amount) return;

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
  const data = await res.json();

  result.innerText = `${amount} ${from} = ${data.conversion_result} ${to}`;
}