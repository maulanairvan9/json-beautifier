function syntaxHighlight(json) {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "json-number";
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "json-key" : "json-string";
      } else if (/true|false/.test(match)) {
        cls = "json-boolean";
      } else if (/null/.test(match)) {
        cls = "json-null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function beautify() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  try {
    const obj = JSON.parse(input);
    const pretty = JSON.stringify(obj, null, 2);
    output.innerHTML = syntaxHighlight(pretty);
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function minify() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  try {
    const obj = JSON.parse(input);
    const minified = JSON.stringify(obj);
    output.innerHTML = syntaxHighlight(minified);
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function clearAll() {
  document.getElementById("input").value = "";
  document.getElementById("output").textContent = "";
}

const copyBtn = document.getElementById("copyJsonBtn");
const output = document.getElementById("output");

copyBtn.addEventListener("click", () => {
  const text = output.innerText.trim();

  if (!text) {
    alert("JSON masih kosong");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy JSON";
      }, 1200);
    });
});

const darkToggle = document.getElementById("darkToggle");

// load mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "☀️ Light Mode";
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  darkToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
