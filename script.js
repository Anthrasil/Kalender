createWeek()
function createWeek() {
    let weekMonitor = document.querySelector(".week")
    let appointments = []
    createWeekUI(weekMonitor, appointments)
    setInterval(function () { rutin(weekMonitor, appointments) }, 100)
}
function rutin(weekMonitor, appointments) {
    UpdateWeekUI(weekMonitor, appointments)
    let newappointments = createWeekEvents(weekMonitor, appointments)
    if (newappointments) {
        appointments = newappointments
    }
}
function UpdateWeekUI(weekMonitor, appointments) {
    appointments.forEach((el) => {
        let object = weekMonitor.children[el.x].children[el.y]
        if (object.color != el.color) {
            object.color = el.color
        }
        if (object.innerText != el.text && el.x != 0 && !object.querySelector(".selection") && el.y != 0) {
            object.innerText = el.text
        }
    })
}
function createWeekUI(weekMonitor, appointments) {
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
        appointments.forEach((el) => {
            if (el.y == timeInHalfHours * 2 + 1 && el.x == 0) {
                color = el.color
            }
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
            let color = ""
            let id = ""
            if (timeInHalfHours == 23.5) {
                id = "last"
            }
            appointments.forEach((el) => {
                if (el.x == day + 1 && el.y == timeInHalfHours * 2 + 1) {
                    color = el.color
                }
            })
            if (ifColor(color)) {
                id += " left"
            }
            let element = createHtmlelement("div", `box ${id}`)
            element.style.backgroundColor = color
            Day.appendChild(element)
        }
        weekMonitor.appendChild(Day)
    }
}
function createWeekEvents(/**@type {HTMLElement} */weekMonitor, /**@type {Array} */appointments) {
    let Event = {
        x: -1,
        y: -1,
        color: "white",
        text: "",
    }
    let children = Array.from(weekMonitor.children)
    children.forEach((/**@type {HTMLElement} */el, index) => {
        let newchildren = Array.from(el.children)
        newchildren.forEach((newel, newindex) => {
            newel.addEventListener("click", (e) => {
                let exists = document.querySelector(".selection")
                if (!exists) {
                    Event.y = newindex
                    Event.x = index
                    if (Event.y < 1 || Event.x < 0) {
                        return false
                    }
                    let removeButton = null
                    let foundIndex = appointments.findIndex(el => el.x === Event.x && el.y === Event.y);
                    let selection = createHtmlelement("div", "selection")
                    let /**@type {HTMLInputElement} */text = createHtmlelement("input", "text")
                    text.placeholder = "Text"
                    let color = createHtmlelement("input", "color")
                    let button = createHtmlelement("div", "button", "button")
                    if (foundIndex == -1) {
                        button.innerText = "Confirm"
                    } else {
                        button.innerText = "Replace"
                        removeButton = createHtmlelement("div", "button", "removeButton")
                        removeButton.innerText = "Remove"
                    }
                    color.placeholder = "Color"
                    selection.innerText = "Appointment"
                    selection.appendChild(text)
                    selection.appendChild(color)
                    selection.appendChild(button)
                    if (removeButton) {
                        selection.appendChild(removeButton)
                    }
                    newel.appendChild(selection)
                    function moveOn() {
                        Event.color = selection.querySelector(".color").value
                        Event.text = selection.querySelector(".text").value
                        if (Event.color == "" && Event.text == "") {
                            createWeekUI(weekMonitor, appointments)
                            return
                        }
                        if (foundIndex !== -1) {
                            appointments[foundIndex] = {
                                x: Event.x,
                                y: Event.y,
                                color: Event.color,
                                text: Event.text,
                            };
                        } else {
                            appointments.push({
                                x: Event.x,
                                y: Event.y,
                                color: Event.color,
                                text: Event.text,
                            });
                        }
                        createWeekUI(weekMonitor, appointments)
                        return appointments
                    }
                    selection.querySelector("#button").addEventListener("click", (event) => {
                        moveOn()
                    }, { once: true })
                    function handleClick(event) {
                        if (event.code === "Enter") {
                            document.removeEventListener("keypress", handleClick)
                            moveOn()
                        }
                    }
                    document.addEventListener("keypress", handleClick)
                    if (!removeButton) {
                        return
                    }
                    selection.querySelector("#removeButton").addEventListener("click", (event) => {
                        appointments.splice(foundIndex, 1)
                        createWeekUI(weekMonitor, appointments)
                    })
                }
            }, { once: true })
        })
    })
}
function createHtmlelement(element, cla = "", id = "") {
    if (!element) {
        throw new Error("A element is requiered");
        return;
    }
    /**@type {HTMLElement} */
    let el = document.createElement(element);
    if (cla) {
        el.className = cla;
    }
    if (id) {
        el.id = id;
    }
    return el;
}
function ifColor(color) {
    let style = new Option().style;
    style.color = color;
    return style.color != "";
}