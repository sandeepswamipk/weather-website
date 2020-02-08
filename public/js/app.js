const weatherForm = document.querySelector('form');
const searchElem = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

messageOne.textContent = "";
messageTwo.textContent = '';

weatherForm.addEventListener('submit', function(e){    
    e.preventDefault();
    const address = searchElem.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    if(address === ""){
        messageOne.textContent = "Unable to find location. Try with another search";
        return;
    }

    fetch('http://localhost:3000/weather?address='+ address).then(function(response){
        response.json().then(function(data){        
            if(data.error){
                console.log(data.error)
            } else{
                console.log(data.location);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        });
    });
});
    