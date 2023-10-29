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