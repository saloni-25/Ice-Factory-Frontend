// orders.js

// Initial array of orders with detailed info
const orders = [
  { id: "O001", name: "Aman", qty: 10, rate: 30, address: "MG Road", contact: "9999999999", status: "pending", date: "2025-04-09" },
  { id: "O002", name: "Reema", qty: 15, rate: 28, address: "Kankarbagh", contact: "8888888888", status: "confirmed", date: "2025-04-09" },
  { id: "O003", name: "Ravi", qty: 20, rate: 25, address: "Patliputra", contact: "7777777777", status: "delivered", date: "2025-04-08" }
];

// Variables to hold current status filter and editing ID
let currentFilter = "";
let editingOrderId = null;

// Reference to the table body where orders will be rendered
const tbody = document.querySelector("#ordersTable tbody");

// Function to render order table based on filters
function renderTable() {
  const search = document.getElementById("searchBox").value.toLowerCase(); // search text
  const selectedDate = document.getElementById("orderDate").value; // selected date
  tbody.innerHTML = ""; // clear previous rows

  // Filter orders based on date, status, and search keyword
  const filtered = orders.filter(order => {
      const matchDate = selectedDate ? order.date === selectedDate : true;
      const matchStatus = currentFilter ? order.status === currentFilter : true;
      const matchSearch = order.name.toLowerCase().includes(search) || order.id.toLowerCase().includes(search);
      return matchDate && matchStatus && matchSearch;
  });

  // Create rows for each filtered order
  filtered.forEach(order => {
      const row = document.createElement("tr");
      row.classList.add(`status-${order.status}`); // add class based on status
      const total = order.qty * order.rate; // calculate total

      // Insert table cells with order details
      row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.name}</td>
          <td>${order.qty}</td>
          <td>₹${order.rate}</td>
          <td>₹${total}</td>
          <td>${order.address}</td>
          <td>${order.contact}</td>
          <td>${order.status}</td>
          <td>${order.date}</td>
          <td>
            <button class="action-btn" onclick="editOrder('${order.id}')">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteOrder('${order.id}')">Delete</button>
          </td>
      `;
      tbody.appendChild(row); // add row to table
  });
}

// Function to filter orders by status (Pending, Confirmed, Delivered)
function filterStatus(status) {
  currentFilter = currentFilter === status ? "" : status; // toggle status filter

  // Remove active class from all cards
  document.querySelectorAll(".card.pending, .card.confirmed, .card.delivered")
    .forEach(card => card.classList.remove("active"));

  // Add active class to the selected one
  if (currentFilter) {
    document.querySelector(`.card.${currentFilter}`)?.classList.add("active");
  }

  renderTable(); // re-render table with new filter
}

// Toggle visibility of Add/Edit form
function toggleAddForm() {
  const form = document.getElementById("addOrderForm");
  const title = document.getElementById("formTitle");

  // If editing, update form title
  if (editingOrderId) {
      title.textContent = "Edit Order";
  } else {
      title.textContent = "Add New Order";

      // Clear all form inputs
      document.querySelectorAll("#addOrderForm input, #addOrderForm select").forEach(el => el.value = "");
  }

  // Show or hide form
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Populate form with existing order data for editing
function editOrder(id) {
  const order = orders.find(o => o.id === id); // find order by ID
  if (!order) return;

  // Fill form fields with order details
  document.getElementById("newId").value = order.id;
  document.getElementById("newName").value = order.name;
  document.getElementById("newQty").value = order.qty;
  document.getElementById("newRate").value = order.rate;
  document.getElementById("newAddress").value = order.address;
  document.getElementById("newContact").value = order.contact;
  document.getElementById("newStatus").value = order.status;
  editingOrderId = id; // set current editing ID

  toggleAddForm(); // open the form
}

// Delete an order by ID
function deleteOrder(id) {
  if (confirm("Are you sure you want to delete this order?")) {
      const index = orders.findIndex(o => o.id === id); // find order index
      if (index > -1) {
          orders.splice(index, 1); // remove order
          renderTable(); // re-render table
      }
  }
}

// Add or update order based on form data
function submitNewOrder() {
  const id = document.getElementById("newId").value.trim();
  const name = document.getElementById("newName").value.trim();
  const qty = parseInt(document.getElementById("newQty").value);
  const rate = parseInt(document.getElementById("newRate").value);
  const address = document.getElementById("newAddress").value.trim();
  const contact = document.getElementById("newContact").value.trim();
  const status = document.getElementById("newStatus").value;
  const date = new Date().toISOString().slice(0, 10); // get today's date

  // Check if all fields are valid
  if (id && name && qty && rate && address && contact && ["pending", "confirmed", "delivered"].includes(status)) {
      if (editingOrderId) {
          // If editing, update the existing order
          const order = orders.find(o => o.id === editingOrderId);
          Object.assign(order, { id, name, qty, rate, address, contact, status, date });
          editingOrderId = null;
      } else {
          // Otherwise, add new order
          orders.push({ id, name, qty, rate, address, contact, status, date });
      }

      renderTable(); // re-render table
      toggleAddForm(); // close form
  } else {
      alert("Please fill all fields correctly.");
  }
}

// Render table when date changes
document.getElementById("orderDate").addEventListener("change", renderTable);

// Initial render
renderTable();
