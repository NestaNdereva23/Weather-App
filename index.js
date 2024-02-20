
const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "721d0703f6760a833f0820d4fb5901aa";

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const weatherData = await getweatherdata(city);
            displayweatherinfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayerror(error);

        }       

    }
    else{
        displayerror("Please enter a city")
    }


});

async function getweatherdata(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}
function displayweatherinfo(data){

    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = `${city}`;
    tempdisplay.textContent = `${Math.round(temp - 273)}°C`;

    citydisplay.classList.add("citydisplay")
    tempdisplay.classList.add("tempdisplay")
    
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);

    
}
function getweatheremoji(weatherId){
    
}
function displayerror(message){

    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errordisplay);

    
}


