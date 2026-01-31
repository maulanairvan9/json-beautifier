function beautify() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj, null, 2);
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function minify() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj);
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function clearAll() {
  document.getElementById("input").value = "";
  document.getElementById("output").textContent = "";
}

