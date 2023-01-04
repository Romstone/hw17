const outputDiv = document.getElementById("output");
const storage = localStorage.getItem("tickets");
const ticketsArr = (storage) ? JSON.parse(storage) : [];

function addTicket() {
    const ticket = {
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        budget: document.getElementById("budget").value,
        start: document.getElementById("start_date").value,
        end: document.getElementById("end_date").value,
        persons: document.getElementById("persons").value,
        vehicle: document.getElementById("vehicle").value
    }
    ticketsArr.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    outputDiv.innerHTML = showTickets(ticketsArr);
}

const showTickets = (arr) => {
    return ['<ul style="list-style-type: none">', ...arr.map((value, index) => {
        return `<li class="ticket_card" record_id="${index}"
        <h2>From ${value.origin} to ${value.destination}</h2>
        <div style="">
            <img src="/img/edit-icon.png" alt="edit" width="16">
            <img src="/img/delete-icon.png" alt="delete" width="16">
            <img src="/img/dots-icon.png" alt="menu" width="16">
        </div>
        <h5>Expected budget: ${value.budget} ILS</h5>
        <h5>${value.start} - ${value.end} | ${value.persons} persons | ${value.vehicle}</h5>
      </li>`;
    }), '</ul>'].join('');
}

