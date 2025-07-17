
export function getDateString(datetime) {
    let dateStr = "null";
    if (datetime != null) {
        const date = new Date(datetime);
        dateStr = String(date.getDate()) + "/" + String(date.getMonth()+1) + "/" + String(date.getFullYear())
    }
    return dateStr;
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

    const date = new Date(time_updated);
    return months[date.getMonth()] + " " + String(date.getFullYear());
}