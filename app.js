const canvas = document.getElementById("canvas");
const draggables = document.querySelectorAll(".draggable");
const form = document.getElementById("edit-form");
const textInput = document.getElementById("drop-text");
const sizeInput = document.getElementById("drop-size");
const colorInput = document.getElementById("drop-color");

let selectedElement = null;

// Handle drag start
draggables.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", item.dataset.type);
  });
});

// Allow drop on canvas
canvas.addEventListener("dragover", (e) => e.preventDefault());

// On drop, create the element
canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  let el;

  if (type === "text") {
    el = document.createElement("p");
    el.textContent = "Editable Text";
  } else if (type === "button") {
    el = document.createElement("button");
    el.textContent = "Click Me";
  } else if (type === "image") {
    el = document.createElement("img");
    el.src = "https://picsum.photos/200";
    el.style.width = "150px";
  }

  if (el) {
    el.style.margin = "10px";
    el.addEventListener("click", () => selectElement(el));
    canvas.appendChild(el);
  }
});

// Select element for editing
function selectElement(el) {
  selectedElement = el;
  textInput.value = el.tagName === "IMG" ? el.src : el.textContent;
  sizeInput.value = parseInt(window.getComputedStyle(el).fontSize) || "";
  colorInput.value = rgbToHex(window.getComputedStyle(el).color);
}

// Apply form edits
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedElement) return;

  if (selectedElement.tagName === "IMG") {
    selectedElement.src = textInput.value;
  } else {
    selectedElement.textContent = textInput.value;
  }

  if (sizeInput.value) selectedElement.style.fontSize = sizeInput.value + "px";
  if (colorInput.value) selectedElement.style.color = colorInput.value;
});

function rgbToHex(rgb) {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  if (!result) return "#000000";
  return (
    "#" +
    result
      .slice(1)
      .map((n) => ("0" + parseInt(n).toString(16)).slice(-2))
      .join("")
  );
}
