const apiKey = "e21a0849288544d32bc197b8c693e8a6"; // 🔑 Replace with your OpenWeatherMap API key

document.getElementById("getWeatherBtn").addEventListener("click", fetchWeather);

function fetchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const weatherCard = document.getElementById("weatherCard");

    // Reset UI
    errorMsg.textContent = "";
    weatherCard.classList.add("d-none");

    // Input Validation
    if (city === "") {
        errorMsg.textContent = "⚠️ Please enter a city name.";
        return;
    }

    // API Call
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `${data.main.temp} °C`;
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = data.main.humidity;
            document.getElementById("wind").textContent = data.wind.speed;
            document.getElementById("weatherIcon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherCard.classList.remove("d-none");
        })
        .catch(err => {
            errorMsg.textContent = "❌ " + err.message;
        });
}
