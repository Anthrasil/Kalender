createWeek()
function createWeek() {
    let weekMonitor = document.querySelector(".week")
    let timeOut = false
    let Termine = [
        {
            x: 0,
            y: 1,
            color: "lightblue",
        }
    ]
    createWeekUI(weekMonitor, Termine)
    while (true && !timeOut) {
        createWeekEvents(weekMonitor, Termine)
        let timeOutTimeInMS = 10
        setTimeout(function () { timeOut = false }, timeOutTimeInMS);
        timeOut = true
    }
}
function createWeekUI(weekMonitor, Termine) {
    weekMonitor.innerHTML = ""
    let HoursAtADay = 24
    let DaysInAWeek = 7
    let DayNames = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    let time = createHtmlelement("div", "time")
    let blanksell = createHtmlelement("h1", "head")
    blanksell.innerText = "blank"
    blanksell.style.color = "transparent"
    time.appendChild(blanksell)
    for (let timeInHalfHours = 0; timeInHalfHours < HoursAtADay; timeInHalfHours += 0.5) {
        let Minute = 0
        let timecorrect = 0
        let zerobefore = ""
        let id = ""
        let color = ""
        Termine.forEach((el) => {
            if (el.x != 0) {
                return
            }
            if (el.y != timeInHalfHours * 2) {
                return
            }
            color = el.color
        })
        if (timeInHalfHours % 1 != 0) {
            Minute = 3
            timecorrect = 0.5
            if (timeInHalfHours - timecorrect == 23) {
                id = "last"
            }
        }
        let oneTimeElement = createHtmlelement("div", `timeElement ${id}`);
        let Hour = timeInHalfHours - timecorrect
        if (Hour < 10) {
            zerobefore = "0"
        }
        oneTimeElement.innerText = `${zerobefore}${Hour}:${Minute}0`;
        oneTimeElement.style.backgroundColor = color
        time.appendChild(oneTimeElement);
    }
    weekMonitor.appendChild(time);
    for (let day = 0; day < DaysInAWeek; day++) {
        let Day = createHtmlelement("div", "day", DayNames[day])
        let head = createHtmlelement("h1", "head");
        head.innerText = DayNames[day]
        Day.appendChild(head)
        for (let timeInHalfHours = 0; timeInHalfHours < HoursAtADay; timeInHalfHours += 0.5) {
            let id = ""
            if (timeInHalfHours == 23.5) {
                id = "last"
            }
            let element = createHtmlelement("div", `box ${id}`)
            Day.appendChild(element)
        }
        weekMonitor.appendChild(Day)
    }
}
function createWeekEvents(/**@type {HTMLElement} */weekMonitor, Termine) {
    let Event = {
        type: "",
        x: 0,
        y: 0,
    }
    let children = []
    Object.keys(weekMonitor.children).forEach((num) => {
        children.push(weekMonitor.children[num])
    })
    children.forEach((/**@type {HTMLElement} */el, index) => {
        let children = []
        Object.keys(el.children).forEach((num) => {
            children.push(el.children[num])
        })
        el.addEventListener("click", (event) => {
            Event.x = index
            children.forEach((el, index) => {
                el.addEventListener("click", (event) => {
                    Event.y = index
                })
            })
        })
    })
    document.addEventListener("click", function () {
        console.log(weekMonitor.children[Event.x].children[Event.y])
        createWeekUI(weekMonitor, Termine)
    })
}
function createHtmlelement(element, cla = "", id = "") {
    if (!element) {
        throw new Error("A element is requiered");
        return;
    }
    /**@type {HTMLElement} */
    let el = document.createElement("div");
    if (cla) {
        el.className = cla;
    }
    if (id) {
        el.id = id;
    }
    return el;
}