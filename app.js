//Creating a front-end website that will display characters from Rick and Morty based on
//various searches


//=============== Creating the function that will handle the character card creation ===============

 const characterCardCreation = (innerData) => {
    const $span = $("<span></span>", {
        class: "result-card column"
    });
    const $characterName = $(`<h3>${innerData.name}</h3>`, {
        class: "character-name"
    });
    const $characterImg = $("<img />", {
        class: "character-img",
        src: innerData.image
    });
    const $characterDetails = $("<div></div>", {
        class: "character-details"
    });
    const $gender = $(`<p>Gender: ${innerData.gender}</p>`);
    const $species = $(`<p>Species: ${innerData.species}</p>`);
    let type = "";
    if (innerData.type === "") {
        type = "Human";
    } else {
        type = innerData.type;
    }
    const $type = $(`<p>Type: ${type}</p>`);
    const $status = $(`<p>Status: ${innerData.status}</p>`);
    const $origin = $(`<p>Origin: ${innerData.origin.name}</p>`);
    const $currentLocation = $(`<p>Current Location: ${innerData.location.name}</p>`);
    const $episodeAppearances = $(`<p>Episode Appearances: ${innerData.episode.length} Episodes</p>`);


    //appends all dynamically created elements to its parent
    results.append($span);
    $span.append($characterName);
    $span.append($characterImg);
    $span.append($characterDetails);
    $characterDetails.append($gender)
    $characterDetails.append($species);
    $characterDetails.append($type);
    $characterDetails.append($status);
    $characterDetails.append($origin);
    $characterDetails.append($currentLocation);
    $characterDetails.append($episodeAppearances);
    console.log(innerData);
}
//========================= End of character card creation function ==========================


//declare a global variable for the userInput
let userInput = '';
const results = $('#results');
const episodeInfo = $('#episode-info');

//========================= Beginning of Main Characters on webpage load ======================

//using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
// get the object about episodes from the show
$(document).ready(() => {
    $.get("https://rickandmortyapi.com/api/episode/20", (data) => {
        console.log(data);
        results.addClass("row");
        for (let i = 0; i < 5; i++) {
            //using another AJAX request to get the data of the characters that are in
            //the episosde that the useer inputted
            $.get(data.characters[i], (innerData) => {
                characterCardCreation(innerData);
            });
            // console.log(searchResults);
        };
    });
});

//========================= End of Main Characters on webpage load ==========================


//===================== Beginning of Character Search By Episode Function ========================

//how to access when the search button is clicked
$('#submit1').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#user-input1').val();
    //using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
    // get the object about episodes from the show
    $.get(`https://rickandmortyapi.com/api/episode/${userInput}`, (data) => {
        console.log(data);
        results.empty();
        episodeInfo.empty();
        let seasonNumber = data.episode.substring(2,3);
        let episodeNumber = data.episode.substring(4,6);
        let $episodeInfo = $(`<div>Characters from Season ${seasonNumber} Episode ${episodeNumber}: ${data.name}</div>`, {
                    class: "episode-info"
        });
        episodeInfo.append($episodeInfo);
        results.addClass("row");
        for (let i = 0; i < data.characters.length; i++) {
            //using another AJAX request to get the data of the characters that are in
            //the episosde that the useer inputted
            $.get(data.characters[i], (innerData) => {
                characterCardCreation(innerData);
            });
            // console.log(searchResults);
        };
    });

})

//========================== End of Character Search By Episode # Function =========================


//====================== Start of Character Search By Episode Name Function ========================

$('#submit2').click (() => {
    //how to get the text value from the input on button click
    userInput = $('#user-input2').val();
    let userInputForURL = userInput.split(" ").join("%20");
    //using the $.get AJAX method to sent an HTTP request to the Rick and Morty API in order to
    // get the object about episodes from the show
    $.get(`https://rickandmortyapi.com/api/episode/?name=${userInputForURL}`, (data) => {
        results.empty();
        episodeInfo.empty();
        console.log(data);
        episodeInfo.empty();
        let seasonNumber = data.results[0].episode.substring(2,3);
        let episodeNumber = data.results[0].episode.substring(4,6);
        let $episodeInfo = $(`<div>Characters from Season ${seasonNumber} Episode ${episodeNumber}: ${data.results[0].name}</div>`, {
                    class: "episode-info"
        });
        episodeInfo.append($episodeInfo);
        results.addClass("row");
        for (let i = 0; i < data.results[0].characters.length; i++) {
            //using another AJAX request to get the data of the characters that are in
            //the episosde that the useer inputted
            $.get(data.results[0].characters[i], (innerData) => {
                //using jQuery to create new HTML elements based on the number of characters
                //that appeared in the episode that the user selected
                characterCardCreation(innerData);
            });
        };
    });

})

//======================= End of Character Search by Episode Name Function =======================