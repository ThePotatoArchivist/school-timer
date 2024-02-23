const startDate = new Date(2023, 7, 14);
const endDate = new Date(2024, 5, 5);

const breakDays = [
    new Date(2023, 8, 4),
    new Date(2023, 8, 15),
    new Date(2023, 9, 13),
    new Date(2023, 10, 9),
    new Date(2023, 10, 10),
    new Date(2023, 11, 22),

    new Date(2024, 0, 15),
    new Date(2024, 1, 9),
    new Date(2024, 1, 19),
    new Date(2024, 2, 15),
    new Date(2024, 2, 29),
    new Date(2024, 4, 3),
    new Date(2024, 4, 27),
];

const breakWeeks = [14, 19, 20, 21, 33];

let container = document.getElementById("container");

let dayCount = 0;

for (let i = 0; i < startDate.getDay(); i++) {
    let dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.classList.add("hidden");
    container.appendChild(dayElement);
    dayCount++;
}

let today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

for (let i = new Date(startDate.getTime()); i <= endDate; i.setDate(i.getDate() + 1)) {
    let dayElement = document.createElement("div");
    dayElement.appendChild(document.createTextNode(i.getDate()));
    dayElement.classList.add("day");
    if (i < today && i != today) {
        dayElement.classList.add("passed");
        dayElement.classList.add("silent");
    }
    if (
        breakDays.some(e => e.getTime() == i.getTime()) ||
        i.getDay() == 0 || i.getDay() == 6 ||
        breakWeeks.includes(Math.floor(dayCount / 7))
    ) {
        dayElement.classList.add("non-school");
    }
    dayElement.setAttribute("month", i.getMonth());
    dayElement.setAttribute("date", i.getDate());
    container.appendChild(dayElement);

    dayCount++;
}

for (let i of document.getElementsByClassName("day")) {
    if (i.getAttribute("date") == today.getDate() && i.getAttribute("month") == today.getMonth()) {
        i.scrollIntoView({behavior: 'smooth', block: 'center'});
        break;
    }
}

let lastDate = new Date();
lastDate.setDate(lastDate.getDate()-1);
lastDate.setHours(20);
lastDate.setMinutes(0);
lastDate.setSeconds(0);
lastDate.setMilliseconds(0);

function waitDisappear() {
    let now = new Date();
    if (document.visibilityState == 'hidden') {
        document.addEventListener('visibilitychange', function() {
            setTimeout(disappearNext, 1000, now);
        }, { once: true });
    } else {
        setTimeout(disappearNext, 1000, now);
    }
}

function disappearNext(now) {
    for (let i of document.getElementsByClassName("day")) {
        if (i.getAttribute("date") == now.getDate() && i.getAttribute("month") == now.getMonth()) {
            i.classList.add("passed");
            break;
        }
    }
}

function check() {
    let now = new Date();
    if (now - lastDate >= 24 * 60 * 60 * 1000) {
        waitDisappear(now);
        lastDate.setDate(now.getDate());
    }
}

setInterval(check, 5*60*1000);

check();

function fixsize() {
    if (window.innerWidth < container.offsetWidth) {
        container.style.transform = "translateX(-50%) scale("+window.innerWidth / container.offsetWidth+")";
    } else {        
        container.style.transform = "translateX(-50%)";
    }
}

addEventListener('resize', fixsize);

fixsize();

function setColor(color) {
    document.documentElement.style.setProperty("--accent-color", color);
}

