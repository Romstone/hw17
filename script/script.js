//elements
    const destCity = document.getElementById('dest_city');
    const destCountry = document.getElementById('dest_country');
    const budget = document.getElementById('budget_value');
    const startDate = document.getElementById('start_date');
    const endDate = document.getElementById('end_date');
    const persons = document.getElementById('persons');
    const vehicle = document.getElementById('transfer_type');
    const outputSpan = document.getElementById('output');
    let ticket;

//database init
    const storage = localStorage.getItem("tickets");
    const ticketsArr = (storage) ? JSON.parse(storage) : [];

    const createTicket = () => {
        if (destCity.value === "") {
            alert("Fill in 'City' field");
            return false;
        } else if (destCountry.value === "") {
            alert("Fill in 'Country' field");
            return false;
        } else {
            ticket = {
                destCity: destCity.value,
                destCountry: destCountry.value,
                budget: budget.value,
                startDate: startDate.value,
                endDate: endDate.value,
                persons: persons.value,
                vehicle: vehicle.value
            }
            return true;
        }
    }
    const save = () => {
        if (createTicket()) {
            ticketsArr.push(ticket);
            localStorage.setItem("tickets", JSON.stringify(ticketsArr));
        } else
            return -1;
        render();
    }

    const render = () => {
        const printTicket = ticketsArr.map((value, index) => `
            <li class="ticket_card" index="${index}">
                <div class="card travel-card">
                    <div class="title">
                        <h4>From Haifa to ${value.destCity}</h4>
                        <i class="bi bi-pencil-square edit" index="${index}"></i>
                        <i class="bi bi-x-circle remove" index="${index}"></i>
                        <i class="bi bi-three-dots-vertical details" index="${index}"></i>
                    </div>
                    <span>Expected budget: ${value.budget} ILS</span>
                    <span>${value.startDate} - ${value.endDate} | 
                        ${value.persons} persons | ${value.vehicle}</span>
                <div>
            </li>
    `).join('');
        outputSpan.innerHTML = printTicket;

        document.querySelectorAll('.remove').forEach((value) => {
            value.addEventListener('click', () => {
                const id = Number(value.getAttribute('index'));
                ticketsArr.splice(id, 1);
                localStorage.setItem("tickets", JSON.stringify(ticketsArr));
                render();
            });
        });

        document.querySelectorAll('.details').forEach((value) => {
            value.addEventListener('click', () => {
                const id = Number(value.getAttribute('index'));
                alert(`Ticket ${id + 1}`);
            })
        });
    }
    render();
