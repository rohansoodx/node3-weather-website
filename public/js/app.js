console.log("From Satic Assets JS File");
console.log("New Chnage For Github!");
const weatherForm = document.querySelector("form"); //select the html element youre trying to work with
const search = document.querySelector("input"); //we want to grab the value the user enetered
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//add an event listener to the element you selected. so when the form SUBMITS, do my code
weatherForm.addEventListener("submit", e => {
  e.preventDefault(); //default behaviour of forms is to refresh the page, made sense in old times, but now so prevent default
  var location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  console.log(typeof location);
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        search.value = "";
      }
    });
  });
});
