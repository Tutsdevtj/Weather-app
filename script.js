
const cityInput = document.getElementById('city');
const weatherBtn = document.getElementById('weather-btn');
const weatherInfo = document.querySelector('.weather-info');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');


const apiKey = 'b17659dcb9dcd74aa6a027186a59abe6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


async function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        
        if (data.cod === 200) {
            const weather = data.weather[0];
            const temperature = data.main.temp;

            
            temperatureEl.textContent = `${Math.round(temperature)}°C`;
            descriptionEl.textContent = weather.description;
            weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}.png`; // Ícone do clima

           
            weatherIcon.style.display = 'block';
        } else {
            alert('Cidade não encontrada!');
        }
    } catch (error) {
        alert('Erro ao buscar as informações do clima!');
    }
}

weatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    
    if (city) {
        fetchWeather(city); 
    } else {
        alert('Por favor, insira o nome de uma cidade!');
    }
});


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        weatherBtn.click(); 
    }
});
