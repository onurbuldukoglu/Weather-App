console.log("works");
async function getData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=5354267983a14f35ff5849ec25f4a690`, {mode: 'cors'});
        const data = await response.json();

    console.log(data);

    displayContent();
    displayData(data);
    } catch(err) {
        console.error(err);
    }
    
}
getData('london');

function createInputDiv() {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputDiv');
    const searchDiv = document.createElement('div');
    searchDiv.classList.add('searchDiv');

    inputDiv.appendChild(createElement('title', 'h1'));
    inputDiv.appendChild(createElement('description', 'p'));
    searchDiv.appendChild(createElement('inputBar', 'input'));
    searchDiv.appendChild(createElement('searchButton', 'button'));

    inputDiv.appendChild(searchDiv);
    return inputDiv;
}

function createDisplayDiv() {
    const displayDiv = document.createElement('div');
    displayDiv.classList.add('displayDiv');
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('dataDiv');
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('tempDiv');
    
    displayDiv.appendChild(createElement('location', 'h1'));
    tempDiv.appendChild(createElement('icon', 'img'));
    tempDiv.appendChild(createElement('temperature', 'h2'));
    dataDiv.appendChild(createElement('feelslike', 'h3'));
    dataDiv.appendChild(createElement('humidity', 'h3'));
    dataDiv.appendChild(createElement('windspeed', 'h3'));
    dataDiv.appendChild(createElement('winddegree', 'h3'));
    dataDiv.appendChild(createElement('pressure', 'h3'));
    dataDiv.appendChild(createElement('date', 'h5'));
    displayDiv.appendChild(createElement('credit', 'div'));

    displayDiv.appendChild(tempDiv);
    displayDiv.appendChild(dataDiv);
    return displayDiv;
}

document.body.appendChild(createInputDiv());
document.body.appendChild(createDisplayDiv());





function displayData(data) {
    const dataTime = new Date(data.dt*1000);
    const temp = Math.round(unitConverter(data.main.temp, 'celsius'));

    setTextContent('location', `${data.name}, ${data.sys.country}`);
    setTextContent('temperature', `${temp}°C`); 
    setTextContent('date', `Data last received on ${dataTime.toLocaleDateString('en-GB')} at ${dataTime.toLocaleTimeString('en-GB')}`);
    setTextContent('feelslike', `Feels Like: ${Math.round(unitConverter(data.main['feels_like'], 'celsius'))}°C`);
    setTextContent('humidity', `Humidity: ${data.main.humidity}%`);
    setTextContent('windspeed', `Wind Speed: ${data.wind.speed} m/s`);
    setTextContent('winddegree', `Wind Direction: ${data.wind.deg}°`);
    setTextContent('pressure', `Pressure: ${data.main.pressure} hPa`);
    document.querySelector('.credit').innerHTML = 'Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
    
    switch (data.weather[0].main) {
        case 'Clear':
            document.querySelector('.icon').setAttribute('src', './images/sun.svg');
            break;
        case 'Clouds':
            document.querySelector('.icon').setAttribute('src', './images/clouds.svg');
            break;
        case 'Haze':
            document.querySelector('.icon').setAttribute('src', './images/haze.svg');
            break;
        case 'Rain':
            document.querySelector('.icon').setAttribute('src', './images/rain.svg');
            break;
        case 'Snow':
            document.querySelector('.icon').setAttribute('src', './images/snow.svg');
            break;
        case 'Fog':
            document.querySelector('.icon').setAttribute('src', './images/fog.svg');
            break;
    }

}
function displayContent() {
    setTextContent('title', 'Weather App');
    document.querySelector('.searchButton').innerHTML = '<img class="searchicon" src="./images/search.svg">';
}

function createElement(className, type) {
    const element = document.createElement(type);
    element.classList.add(className);
    
    return element;
}
function setTextContent(className, text) {
    document.querySelector(`.${className}`).textContent = text;
}


document.querySelector('.searchButton').addEventListener('click', function() {
    let currentLocation = document.querySelector('input').value;
    getData(currentLocation);
});
document.querySelector('html').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let currentLocation = document.querySelector('input').value;
        getData(currentLocation);
        document.querySelector('input').value = '';
    }
})

function unitConverter(kelvin, unit) {
    switch (unit) {
        case 'celsius':
            return (kelvin - 273);
        case 'fahrenheit':
            return (kelvin * 9/5 - 459.67);
    }
}
