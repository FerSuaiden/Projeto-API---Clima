const apiKey = "bb75e7f282fd3d101c50c099c14a1fd0";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const button = document.querySelector(".busca button");
const search = document.querySelector(".busca input");

//começa solicitando a entrada de uma cidade válida
document.querySelector(".erro").style.display = "block";
document.querySelector(".clima").style.display = "none";

//verifica o tempo da cidade ao clicar no botão
button.addEventListener("click", () => {
    verificaTempo(search.value);
})

async function verificaTempo(cidade){
    
    const response = await fetch(apiURL + cidade + "&appid=" + apiKey);

    if(response.status == 404){
        document.querySelector(".erro").style.display = "block";
        document.querySelector(".clima").style.display = "none";
    }else{
        const data = await response.json();

        //altera a imagem 
        const weatherIcon = document.querySelector(".weather-icon");
        const newImageSrc = `weather-app-img/images/${data.weather[0].main.toLowerCase()}.png`;
        weatherIcon.setAttribute("src", newImageSrc);
    
        //altera outros detalhes
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".cidade").innerHTML = data.name;
        document.querySelector(".vento").innerHTML = data.wind.speed + "Km/h";
        document.querySelector(".umidade").innerHTML = data.main.humidity + "%";
        document.querySelector(".weather-icon").innerHTML = `<img src="weather-app-img/images/${data.weather[0].main.toLowerCase()}.png">`;

        document.querySelector(".erro").style.display = "none";
        document.querySelector(".clima").style.display = "block";
    }
}
