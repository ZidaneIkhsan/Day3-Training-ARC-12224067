function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="this.parentElement.remove()">Hapus</button>`;
    taskList.appendChild(li);

    taskInput.value = "";
}

async function getWeather() {
    let city = document.getElementById("cityInput").value.trim();
    let weatherResult = document.getElementById("weatherResult");
    let weatherIcon = document.getElementById("weatherIcon");
    let loading = document.getElementById("loading");

    if (city === "") {
        alert("Masukkan nama kota!");
        return;
    }

    weatherResult.innerText = "";
    weatherIcon.classList.add("hidden");
    loading.classList.remove("hidden");

    try {
        let response = await fetch(`http://localhost:3000/weather/${city}`);
        let data = await response.json();

        loading.classList.add("hidden");

        if (data.cod !== 200) {
            weatherResult.innerText = "Kota tidak ditemukan!";
            return;
        }

        let description = data.weather[0].description;
        let temp = data.main.temp;
        let iconCode = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        weatherResult.innerText = `Cuaca di ${city}: ${description}, ${temp}°C`;
        weatherIcon.src = iconUrl;
        weatherIcon.classList.remove("hidden");

    } catch (error) {
        loading.classList.add("hidden");
        weatherResult.innerText = "Gagal mengambil data!";
    }
}
