const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";

/**
 *
 * @param {*} query
 * @param {*} queryurl
 */

function runSearch(
  query = document.querySelector(".search .form input").value,
  queryurl = BING_ENDPOINT + "?q=" + encodeURIComponent(query)
) {
  initialize(queryurl);
}

/**
 *
 * @param {*} qurl
 * @param {*} request
 * @param {*} key
 */

function initialize(
  qurl,
  request = new XMLHttpRequest(),
  key = "0e5afa38488c46c4b5a71c71995ca50a"
) {
  request.open("GET", qurl);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Ocp-Apim-Subscription-Key", key);
  request.addEventListener("load", handleBingResponse);
  request.send();
}

/**
 * @name handleBingResponse
 */
function handleBingResponse() {
  window.location.hash = "results";
  const jsobj = JSON.parse(this.responseText.trim()),
    imgcontainer = document.body.querySelector("#output");
  imgcontainer.innerHTML = "";
  for (var i = 0; i < jsobj.value.length; i++) {
    let img = document.createElement("img");
    imgsrc = JSON.stringify(jsobj.value[i].thumbnailUrl);
    img.src = imgsrc.replace(/['"]+/g, "");
    img.id = img.src;
    imgcontainer.appendChild(img);
    document.images[i].addEventListener("click", addToMoodBoard, false);
  }
  let relatedcontainer = document.body.querySelector("ul");
  relatedcontainer.innerHTML = "";
  jsobj.relatedSearches.forEach((relatedSearch, i) => {
    let li = document.createElement("li");
    litext = JSON.stringify(relatedSearch.text);
    li.innerHTML = litext.replace(/['"]+/g, "");
    relatedcontainer.append(li);
  });
}

/**
 * @name closeSeachPane
 */
function closeSeachPane() {
  window.location.hash = "";
}

/**
 * @name addToMoodBoard
 */
function addToMoodBoard(
  moodimgs = document.body.querySelector(".moodboardimgs"),
  img = document.createElement("img")
) {
  img.src = this.src;
  moodimgs.appendChild(img);
}
