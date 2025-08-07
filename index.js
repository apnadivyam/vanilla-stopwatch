function equalizeClockNumberWidth() {
  const clock_numbers = document.querySelectorAll(".clock_number");
  clock_numbers.forEach((el) => {
    el.style.width = "auto";
  });
  let maxwidth = 0;
  clock_numbers.forEach((el) => {
    if (el.offsetWidth > maxwidth) {
      maxwidth = el.offsetWidth;
    }
  });
  clock_numbers.forEach((el) => {
    el.style.width = maxwidth + "px";
  });
}

let clock_intervel = null;
let lastLap = null;
let lapCount = 1;

function startClock() {
  if (clock_intervel == null) {
    clock_intervel = setInterval(() => {
      const centi = document.getElementById("centi");
      let newCenti = Number(centi.textContent) + 1;
      if (newCenti > 99) {
        newCenti = 0;
        const sec = document.getElementById("sec");
        let newsec = Number(sec.textContent) + 1;
        if (newsec == 60) {
          newsec = 0;
          const min = document.getElementById("min");
          let newmin = Number(min.textContent) + 1;
          if (newmin == 60) {
            newmin = 0;
            const hr = document.getElementById("hr");
            let newhr = Number(hr.textContent) + 1;
            hr.innerHTML = newhr < 10 ? "0" + newhr : newhr;
            setTimeout(equalizeClockNumberWidth, 15);
          }
          min.innerHTML = newmin < 10 ? "0" + newmin : newmin;
        }
        sec.innerHTML = newsec < 10 ? "0" + newsec : newsec;
      }
      centi.innerHTML = newCenti < 10 ? "0" + newCenti : newCenti;
    }, 10);
  }
}
function stopClock() {
  if (clock_intervel != null) {
    clearInterval(clock_intervel);
    clock_intervel = null;
  }
}
function lapClock() {
  const clock_numbers = document.querySelectorAll(".clock_number");
  let obj = {};
  clock_numbers.forEach((el) => {
    obj[el.id] = Number(el.innerHTML);
  });
  if (
    lastLap != null &&
    ((obj1, obj2) => {
      const keys = Object.keys(obj1);
      for (let key of keys) {
        if (obj1[key] !== obj2[key]) return false;
      }
      return true;
    })(lastLap, obj)
  ) {
    return;
  }
  lastLap = obj;
  const lap = document.createElement("li");
  lap.innerHTML =
    (obj.hr > 0 ? obj.hr + " <small>hr</small>  " : "") +
    (obj.min > 0 ? obj.min + " <small>min</small>  " : "") +
    (obj.sec > 0 || obj.centi > 0
      ? obj.sec + "." + obj.centi + " <small>sec</small>"
      : "");
  if (lap.innerHTML) {
    lap.innerHTML = "<span>" + lapCount + "</span>" + lap.innerHTML;
    const ul = document.getElementById("laps");
    ul.insertBefore(lap, ul.firstChild);
    lapCount++;
  }
}
function resetClock() {
  if (clock_intervel != null) {
    stopClock();
  }
  const clock_numbers = document.querySelectorAll(".clock_number");
  clock_numbers.forEach((el) => {
    el.innerHTML = "00";
  });
  lastLap = null;
  lapCount = 1;
  setTimeout(equalizeClockNumberWidth, 15);
  document.getElementById("laps").innerHTML = "";
}

setTimeout(resetClock, 15);
document.getElementById("start").addEventListener("click", startClock);
document.getElementById("stop").addEventListener("click", stopClock);
document.getElementById("lap").addEventListener("click", lapClock);
document.getElementById("reset").addEventListener("click", resetClock);
