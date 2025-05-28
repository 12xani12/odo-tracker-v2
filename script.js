let trips = JSON.parse(localStorage.getItem('trips') || "[]");
let driver = "", carType = "", numberPlate = "";

function startSession() {
  driver = document.getElementById('driver').value;
  carType = document.getElementById('carType').value;
  numberPlate = document.getElementById('numberPlate').value;
  document.getElementById('logForm').style.display = 'block';
  renderTable();
}

function logTrip() {
  const start = parseFloat(document.getElementById('startKM').value);
  const end = parseFloat(document.getElementById('endKM').value);
  const description = document.getElementById('description').value;
  const distance = end - start;
  const date = new Date().toLocaleDateString(); // Auto date

  trips.push({ start, end, distance, description, date });
  localStorage.setItem('trips', JSON.stringify(trips));
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector('#tripTable tbody');
  tbody.innerHTML = '';
  trips.forEach(trip => {
    const row = `<tr>
      <td>${trip.date}</td>
      <td>${trip.start}</td>
      <td>${trip.end}</td>
      <td>${trip.distance}</td>
      <td>${trip.description}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function downloadExcel() {
  const rows = [
    ["Driver", driver],
    ["Car Type", carType],
    ["Number Plate", numberPlate],
    [],
    ["Date", "Start KM", "End KM", "Distance", "Description"],
    ...trips.map(t => [t.date, t.start, t.end, t.distance, t.description])
  ];
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "odo_log.csv";
  a.click();
}

function resetAll() {
  if (confirm("Are you sure you want to delete all stored data?")) {
    trips = [];
    localStorage.removeItem('trips');
    renderTable();
  }
}
