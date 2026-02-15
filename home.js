// Booking data
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let editIndex = null;

function updateLocalStorage() {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

function renderBookings(filteredBookings = bookings) {
  const tableBody = document.getElementById('bookings-table').querySelector('tbody');
  tableBody.innerHTML = '';
  filteredBookings.forEach((booking, idx) => {
    tableBody.innerHTML += `
      <tr>
        <td>${booking.name}</td>
        <td>${booking.vehicle}</td>
        <td>${booking.slot}</td>
        <td>
          <button onclick="editBooking(${idx})">Update</button>
          <button onclick="deleteBooking(${idx})">Delete</button>
        </td>
      </tr>
    `;
  });
}

window.editBooking = function(idx) {
  const booking = bookings[idx];
  document.getElementById('user-name').value = booking.name;
  document.getElementById('vehicle-number').value = booking.vehicle;
  document.getElementById('slot-number').value = booking.slot;
  editIndex = idx;
};

window.deleteBooking = function(idx) {
  bookings.splice(idx, 1);
  updateLocalStorage();
  renderBookings();
};

document.getElementById('booking-form').addEventListener('submit', function(event){
  event.preventDefault();
  const userName = document.getElementById('user-name').value;
  const vehicleNumber = document.getElementById('vehicle-number').value;
  const slotNumber = document.getElementById('slot-number').value.trim();

  if(!userName || !vehicleNumber || !slotNumber) {
    document.getElementById('confirmation').innerText = "Please fill all fields!";
    return;
  }

  if (editIndex !== null) {
    bookings[editIndex] = {name: userName, vehicle: vehicleNumber, slot: slotNumber};
    document.getElementById('confirmation').innerText = "Booking updated!";
    editIndex = null;
  } else {
    bookings.push({name: userName, vehicle: vehicleNumber, slot: slotNumber});
    document.getElementById('confirmation').innerText = "Booking confirmed!";
  }
  updateLocalStorage();
  renderBookings();
  this.reset();
});

document.getElementById('search-box').addEventListener('input', function(){
  const query = this.value.toLowerCase();
  const filtered = bookings.filter(b => 
    b.name.toLowerCase().includes(query) || 
    b.vehicle.toLowerCase().includes(query) ||
    b.slot.toLowerCase().includes(query)
  );
  renderBookings(filtered);
});

window.onload = function() {
  renderBookings();
}