BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";

function runSearch() {
  let query = document.querySelector(".search .form input").value;
  let queryurl = BING_ENDPOINT + "?q=" + encodeURIComponent(query);

  let request = new XMLHttpRequest();

  // TODO: Construct the request object and add appropriate event listeners to
  // handle responses. At a minimum, you'll need to set request headers to
  // accept JSON responses, and to set the header "Ocp-Apim-Subscription-Key" to
  // the value in BING_API_KEY. See the API docs at
  // https://docs.microsoft.com/en-us/bing/search-apis/bing-image-search/reference/headers

  // initialize the request
  request.open("GET", queryurl);
  // set request headers
  request.setRequestHeader("Accept", "application/json");
  // get the BING_API_KEY
  BING_API_KEY = "0e5afa38488c46c4b5a71c71995ca50a";
  var key = BING_API_KEY;
  //document.getElementById('test').innerHTML = key;
  request.setRequestHeader("Ocp-Apim-Subscription-Key", key);

  // Handle a successful response
  request.addEventListener("load", handleBingResponse);

  // Send the request
  request.send();

  return false; // Keep this; it keeps the browser from sending the event
  // further up the DOM chain. Here, we don't want to trigger
  // the default form submission behavior.
}

function handleBingResponse() {
  window.location.hash = "results";

  // raw JSON
  var jsobj = JSON.parse(this.responseText.trim());
  // testing reading out JSON
  //var res = document.body.querySelector('#test');
  //res.innerHTML = JSON.stringify(jsobj, null, 2);
  //res.innerHTML = jsobj.value.length;

  // show images from JSON
  var imgcontainer = document.body.querySelector("#output");
  // clear output contents
  imgcontainer.innerHTML = "";
  for (var i = 0; i < jsobj.value.length; i++) {
    // create image
    var img = document.createElement("img");
    // grab the thumbnail image
    imgsrc = JSON.stringify(jsobj.value[i].thumbnailUrl);
    // strip the quotes and set as the image src
    img.src = imgsrc.replace(/['"]+/g, "");
    img.id = img.src;
    // add to the results output
    imgcontainer.appendChild(img);
    // add event listener to image
    document.images[i].addEventListener("click", addToMoodBoard, false);
  }
  // show related searches
  var relatedcontainer = document.body.querySelector("ul");
  // clear related contents
  relatedcontainer.innerHTML = "";
  for (var i = 0; i < jsobj.relatedSearches.length; i++) {
    // create list item
    var li = document.createElement("li");
    // grab the text
    litext = JSON.stringify(jsobj.relatedSearches[i].text);
    // strip the quotes
    li.innerHTML = litext.replace(/['"]+/g, "");
    // ass the list item
    relatedcontainer.append(li);
  }
}

function closeSeachPane() {
  window.location.hash = "";
}

function addToMoodBoard() {
  console.log(this.src);
  var moodimgs = document.body.querySelector(".moodboardimgs");
  var img = document.createElement("img");
  img.src = this.src;
  moodimgs.appendChild(img);
}
