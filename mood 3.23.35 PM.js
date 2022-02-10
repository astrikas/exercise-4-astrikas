BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";
let subscriptionkey = BING_API_KEY;
let host = "api.bing.microsoft.com/v7.0/images/search";
savedImages = [];

function runSearch() {
  let query = document.querySelector(".search .form input").value
  let queryurl = BING_ENDPOINT + "?q=" + encodeURIComponent(query);
  let request = new XMLHttpRequest();

  
  request.open("GET", queryurl, true);
  request.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionkey);
  request.addEventListener("load", handleBingResponse);
  request.send();
  
  //take in the response and convert to json
  function handleBingResponse(){
    var jsonobj = JSON.parse(this.response);
    renderSearchResults(jsonobj);
    console.log(jsonobj)
  }

  //takes the json and present ten objects
  function renderSearchResults(results){

    //RELATED ITEMS
     for (let i=0; i<10; i++){
    var lista = document.body.querySelector(".suggestions");
    var relatedLink = results.relatedSearches[i].webSearchUrl;
    console.log(relatedLink)
    var title = results.relatedSearches[i].text;
    var li = document.createElement("li");
    var a = document.createElement('a');
    var linkText = document.createTextNode(title);
    a.appendChild(linkText);
    a.title = "my little text";
    a.href = relatedLink;
    li.appendChild(a);
    lista.appendChild(li);}

    //PICTURES
    for (let i=0; i<10; i++){
      var listb = document.body.querySelector(".suggestions");
      var link = results.value[i].thumbnailUrl;
      var li = document.createElement("li");
      var img = document.createElement("img");
      img.setAttribute("src", link);
      li.appendChild(img);
      listb.appendChild(li);}
    
    //SAVED ITEMS
    // for (var z=0; z<savedImages.length; z++){
    //   var link = savedImages[z];
    //   var li = document.createElement("li");
    //   var img = document.createElement("img");
    //   img.setAttribute("src", link);
    //   li.appendChild(img);
    //   list.appendChild(li);
    // }
    // console.log('SAVED IMAGES')
    // console.log(savedImages)

    document.getElementById("results").addEventListener("click", clickAction);

    function clickAction() {
    // get the element and save it to an array 
      var image = document.getElementById("results");
      savedImages.push(image);

     }

  }
//}
 
  // TODO: Construct the request object and add appropriate event listeners to
  // handle responses. At a minimum, you'll need to set request headers to
  // accept JSON responses, and to set the header "Ocp-Apim-Subscription-Key" to
  // the value in BING_API_KEY. See the API docs at
  // https://docs.microsoft.com/en-us/bing/search-apis/bing-image-search/reference/headers

  //handleBingResponse();

  return false;  // Keep this; it keeps the browser from sending the event
                  // further up the DOM chain. Here, we don't want to trigger
                  // the default form submission behavior.
}

function handleBingResponse() {
  window.location.hash = "results";
}

function closeSeachPane() {
  window.location.hash = "";
}

document.querySelector("#exitButton").addEventListener("click", closeSeachPane);
