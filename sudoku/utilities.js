export function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export function generateUUID() {
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

  let result = "";
  for (let i = 0; i < uuid.length; i++) {
    let char = uuid[i];
    if (char === "x") {
      result += Math.floor(Math.random() * 16).toString(16);
    } else if (char === "y") {
      result += Math.floor(Math.random() * 4 + 8).toString(16);
    } else {
      result += char;
    }
  }

  return result;
}
