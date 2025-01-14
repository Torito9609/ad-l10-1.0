const itemsContainer = document.querySelector("#list-items");

function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75";
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement("figure");
  colourCardColour.style = "background-color: " + item.color + ";";
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement("br");
  itemsContainer.append(colourCardBreak);
}

async function fetchColorsList() {
  try {
    const storedColors = localStorage.getItem("colorsList");

    if (storedColors) {
      console.log("Loading colors from local storage...");
      loadColorsFromStorage();
    } else {
      console.log("Getting colors from end point...");
      const response = await fetch("https://reqres.in/api/unknown");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("colorsList", JSON.stringify(data.data));
      data.data.forEach((color) => {
        addItem(color);
      });
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
}

function loadColorsFromStorage() {
  const storedColors = localStorage.getItem("colorsList");
  if (storedColors) {
    console.log("Loading colors from local storage...");
    const colors = JSON.parse(storedColors);
    colors.forEach((color) => {
      addItem(color);
    });
  } else {
    console.log("Colors not found in local storage.");
  }
}

function clearColors() {
  const items = document.querySelector("#list-items");
  items.innerHTML = "";
  localStorage.removeItem("colorsList");
  console.log("Local storage dumped.");
}

document.querySelector("#clearColors").addEventListener("click", clearColors);
document
  .querySelector("#loadColors")
  .addEventListener("click", fetchColorsList);

//loadColorsFromStorage();
