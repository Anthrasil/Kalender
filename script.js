createWeekUI()
function createWeekUI() {
    let HoursAtADay=24
    let DaysInAWeek=7
    let weekMonitor=document.querySelector(".week")
    let DayNames=[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    let time=createHtmlelement("div","time")
    for (let timeInHalfHours=0; timeInHalfHours<HoursAtADay;timeInHalfHours+=0.5) {
        let onTimeElement=createHtmlelement("div","timeElement");
        let Minute=0
        let timecorrect=0
        let zerobefore=""
        if (timeInHalfHours%1!=0) {
            Minute=3
            timecorrect=0.5
        }
        let Hour=timeInHalfHours-timecorrect
        if (Hour<10) {
            zerobefore="0"
        }
        onTimeElement.innerText=`${zerobefore}${Hour}:${Minute}0`;
        time.appendChild(onTimeElement);
    }
    weekMonitor.appendChild(time);
    for (let day=0; day<DaysInAWeek;day++) {
        let Day=createHtmlelement("div","day",DayNames[day])
        let head=createHtmlelement("h1","head");
        head.innerText=DayNames[day]
        Day.append(head)
        for (let timeInHalfHours=0; timeInHalfHours<HoursAtADay;timeInHalfHours+=0.5) {
            let element=createHtmlelement("div","box")
            Day.appendChild(element)
        }
        weekMonitor.appendChild(Day)
    }
}
function createHtmlelement(element,cla="",id="") {
    if (!element) {
        throw new Error("A element is requiered");
        return;
    }
    /**@type {HTMLElement} */
    let el=document.createElement("div");
    if (cla) {
        el.className=cla;
    }
    if (id) {
        el.id=id;
    }
    return el;
}