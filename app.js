const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();


container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");

        calculateTotal();

    }
})

select.addEventListener("change", function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");
    let selectedSeatCound = container.querySelectorAll(".seat.selected").length;
    let price = select.value;

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });


    amount.innerText = selectedSeatCound * price + "₺";
    count.innerText = selectedSeatCound;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"));

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}