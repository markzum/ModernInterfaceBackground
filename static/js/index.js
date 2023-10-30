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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    },
    success: function (data) {
      $("#cpu-status").text(data.cpu)
      $("#ram-status").text(data.virtual_memory)
    }
  })
}


setInterval(getCurrentSystemStatus, 6000)
getCurrentSystemStatus()
