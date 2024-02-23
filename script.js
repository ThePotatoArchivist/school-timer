const startDate = new Date(2024, 7, 19);
const endDate = new Date(2025, 5, 11);

const breakDays = [
    new Date(2024, 8, 2),
    new Date(2024, 8, 13),
    new Date(2024, 9, 4),
    new Date(2024, 9, 11),
    new Date(2024, 10, 1),
    new Date(2024, 10, 11),
    new Date(2024, 11, 20),
    new Date(2025, 0, 20),
    new Date(2025, 1, 7),
    new Date(2025, 1, 17),
    new Date(2025, 2, 14),
    new Date(2025, 2, 31),
    new Date(2025, 4, 2),
    new Date(2025, 4, 26),
];

const breakWeeks = [14, 18, 19, 20, 34];

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

