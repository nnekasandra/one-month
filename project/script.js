/* Program to  manipulate the DOM*/
const app = document.getElementById('root'); //get the root div from html
const logo = document.createElement('img');  //create an img tag for logo
logo.src = 'logo.png'; //link the logo img to the created image tag for logo
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(logo);
app.appendChild(container);


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function () {
// Begin accessing JSON data here
var data = JSON.parse(this.response);
if(request.status<=200 && request.status < 400){
    data.forEach(function(movie){
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const h1 = document.createElement('h1');
        h1.textContent = movie.title;
        const p = document.createElement('p');
        movie.description = movie.description.substring(0, 300) // Limit to 300 chars
        p.textContent = `${movie.description}...` // End with an ellipses
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
})
}else{
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
}
}

// Send request
request.send()