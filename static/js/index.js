function setCurrentTime() {
  let now = new Date()

  let hh = now.getHours()
  hh < 10 ? hh = '0' + hh : hh

  let mn = now.getMinutes()
  mn < 10 ? mn = '0' + mn : mn

  $("#currentTime").text(`${hh}:${mn}`)

  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  $("#currentDate").text(now.toLocaleDateString("ru", options))
}


//setCurrentTime()
setInterval(setCurrentTime, 1000)
setCurrentTime()


function getCurrentSystemStatus() {
  $.ajax({
    url: "http://127.0.0.1:6789/system-status", //http://127.0.0.1:6789/system-status
    type: "GET",
    success: function (data) {
      $("#cpu-status").text(data.cpu)
      $("#ram-status").text(data.virtual_memory)
    }
  })
}


setInterval(getCurrentSystemStatus, 6000)
getCurrentSystemStatus()



function getCurrentWeather() {
  $.ajax({
    url: "http://127.0.0.1:6789/weather",
    type: "GET",
    success: function (data) {
      console.log(data);
      $("#weatherTemperature").text(Math.round(data.main.temp)+"°")
      $("#weatherDescription").text(data.weather[0].description)
      $("#weatherIcon").attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    }
  })
}


setInterval(getCurrentWeather, 0.5 * 60 * 60 * 1000)
getCurrentWeather()