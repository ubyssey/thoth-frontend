function monthString(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    return months[month];
}

function dayOfWeekString(dayOfWeek) {
    const dayOfWeeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return dayOfWeeks[dayOfWeek];
}

export function getDateString(datetime) {
    let dateStr = "null";
    if (datetime != null) {
        const date = new Date(datetime);
        dateStr = String(date.getDate()) + "/" + String(date.getMonth()+1) + "/" + String(date.getFullYear())
    }
    return dateStr;
}

export function getPrettyDateString(datetime) {
    let dateStr = "null";
    if (datetime != null) {
        const date = new Date(datetime);
        dateStr = dayOfWeekString(date.getDay()) + ", " + monthString(date.getMonth()) + " " + String(date.getDate()) + ", " + String(date.getFullYear())
    }
    return dateStr;
}

export function getTimeString(datetime) {
    let timeStr = "null";
    if (datetime != null) {
        const date = new Date(datetime);
        timeStr = String(date.getHours()).padStart(2,"0") + ":" + String(date.getMinutes()).padStart(2,"0");
    }
    return timeStr;    
}

export function getTimeSince(datetime) {
    if (datetime == null) {
        return "null";
    }

    const date = new Date(datetime);
    const today = new Date();

    let delta = 0;
    let unit = "";
    if (today.getFullYear() - date.getFullYear() != 0) {
        delta = today.getFullYear() - date.getFullYear();
        unit = "Y";
    } else if (today.getMonth() - date.getMonth() != 0) {
        delta = ((today.getFullYear()*12) + today.getMonth()) - ((date.getFullYear()*12) + date.getMonth());
        unit = "M";
    } else if (today.getDate() - date.getDate() != 0) {
        delta = today.getDate() - date.getDate();
        unit = "d";
    } else if (Math.floor((today.getSeconds() - date.getSeconds()/60)) != 0) {
        delta = Math.floor((today.getSeconds() - date.getSeconds()/60));
        unit = "m";
    } else {
        delta = today.getSeconds() - date.getSeconds();
        unit = "s";
    }
    return String(delta) + unit + " ago";
}

export function monthYear({time_updated}) {
    const date = new Date(time_updated);
    return monthString(date.getMonth()) + " " + String(date.getFullYear());
}