const imgContainer = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

const limit = 30;
const accessKey = "wGmWUwq0oG9TFnJsvcWiyto3zgZt87EP5xNfIYh_5qs";
const unspashUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${limit}`;

let photosArray = [];
let currentImg = 30;

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const onLoadingImg = function () {
  this.classList.remove("blur-img");
};

// display imgs
const displayImgs = function (photo) {
  const item = document.createElement("a");
  setAttributes(item, { href: photo.links.html, target: "_blank" });
  const img = document.createElement("img");
  setAttributes(img, {
    src: photo.urls.small,
    alt: photo.alt_description,
    title: photo.alt_description,
  });
  img.classList.add("blur-img");
  img.addEventListener("load", onLoadingImg);
  item.appendChild(img);
  imgContainer.appendChild(item);
};

const loadImgs = async function () {
  if (currentImg >= 30) {
    try {
      const respone = await fetch(unspashUrl);
      const data = await respone.json();
      photosArray = data;
      currentImg = 0;
    } catch (err) {
      console.log(err);
      throw new Error("something wrong happend");
    }
  }
  displayImgs(photosArray[currentImg]);
  currentImg++;
};

const observerCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    loadImgs();
  }
};

const observer = new IntersectionObserver(observerCallback, {
  root: null,
  threshold: 0,
});

observer.observe(loader);
