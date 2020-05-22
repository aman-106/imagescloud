import "./styles.css";
import { imageSourcesList } from "./srcList";

const app = {
  // calls the required functions for setup of app
  init() {
    app.createHTML();
    app.renderImages();
    app.addShuffleListerner();
  },
  // creates the basic html for page with shuffle btn
  createHTML() {
    document.getElementById("app").innerHTML = `
      <h1>Image Box</h1>
      <button type="button" class="shuffle-btn" id="shuffle-btn">Shuffle</button> 
      <div id="main"></div>`;
  },
  // function create the wrapper layuot div
  createContentWrapper() {
    let contentWrapper = document.createElement("div");
    contentWrapper.className = "content-wrapper";
    return contentWrapper;
  },
  //create the wrapper image div
  createImageWrapper() {
    let imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper";
    return imageWrapper;
  },
  //  deletes the image when cliked on del btn
  deleteImage(event) {
    let imageId = event.target.id;
    imageSourcesList.splice(imageId, 1);
    app.renderImages();
  },

  // This function shuffle list of images
  shuffle() {
    for (let i = imageSourcesList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageSourcesList[i], imageSourcesList[j]] = [
        imageSourcesList[j],
        imageSourcesList[i]
      ];
    }
    app.renderImages();
  },
  // creates the image content for image div
  addImageContent(index) {
    return `
    <div class="image-cont" id="image-cover-${index}">
  <div class="image-cont-inner">
    <div class="image-cont-front">
      <img id="image-${index}" src="${
      imageSourcesList[index]
    }" alt="Avatar-${index}"/>
    </div>
    <div class="image-cont-back">
      <h1>Image-${index + 1}</h1> 
      <button type="button" class="del-btn" id="${index}">Delete</button>
    </div>
  </div>
</div>
`;
  },
  // adds event listner for del btn on image titles
  addDelListener() {
    let elements = document.getElementsByClassName("del-btn");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", app.deleteImage);
    }
  },
  // render list the images
  renderImages() {
    const maxImages = imageSourcesList.length;
    const maindiv = document.getElementById("main");
    let contentWrapper = app.createContentWrapper();
    let imageWrapper = "";
    for (let i = 0; i < maxImages; i++) {
      imageWrapper = app.createImageWrapper();
      imageWrapper.innerHTML = app.addImageContent(i);
      contentWrapper.appendChild(imageWrapper);
    }
    maindiv.innerHTML = "";
    maindiv.appendChild(contentWrapper);
    app.addDelListener();
  },
  addShuffleListerner() {
    document
      .getElementById("shuffle-btn")
      .addEventListener("click", app.shuffle);
  }
};

app.init();
