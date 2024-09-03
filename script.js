document.querySelector('.search').addEventListener('click', () => {
    let city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeather(city);
    } 
    else {
        showWarning("Por favor, digite o nome de uma cidade.");
    }
});

function getWeather(city) {
    const apiKey = "64aa98ce766351b55ef8ae364071837d"; 
    const callAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;


    fetch(callAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada.");
            }
            return response.json();
        })
        .then(response => {
            showInfo(response);
        })
        .catch(error => {
            showWarning(error.message);
        });
}

function showInfo(response) {
    clearInfo();
    
    let weatherInfo = document.getElementById('weatherInfo');

    weatherInfo.innerHTML = `
        <h3>Clima em ${response.name}, ${response.sys.country}</h3>
        <p>Temperatura: ${response.main.temp}°C</p>
        <p>Umidade: ${response.main.humidity}%</p>
        <p>Vento: ${response.wind.speed} km/h</p>
    `;
}

function clearInfo() {
    document.getElementById('weatherInfo').innerHTML = '';
}

function showWarning(msg) {
    clearInfo();
    document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">${msg}</p>`;
}
