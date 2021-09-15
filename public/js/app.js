console.log("clientside javascript file is loaded");

//document.querySelector returns the 1st element that matches a specified CSS selector(s) in the document
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    //prevent to reload the page as default and will run the jscode inside the function
    event.preventDefault();

    const location = search.value;
    //NOTE: can also use document.getElementById(<formId>).<childId>.value

    messageOne.textContent = "Searching Location...";
    messageTwo.textContent = "";

    fetch(`${window.location.origin}/weather?address=${location}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecastData.forecast;
                }
            });
        }
    );
});