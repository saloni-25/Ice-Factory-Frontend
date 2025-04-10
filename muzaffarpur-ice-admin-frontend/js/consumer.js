// Sample data array containing initial consumer records
const consumers = [
  { name: "Aman", rate: 30, address: "MG Road", contact: "9999999999" },
  { name: "Reema", rate: 28, address: "Kankarbagh", contact: "8888888888" },
  { name: "Ravi", rate: 25, address: "Patliputra", contact: "7777777777" }
];

// Select the tbody element inside the consumer table where data rows will be appended
const tbody = document.querySelector("#consumerTable tbody");

// Function to render consumers in the table based on search filter
function renderConsumers() {
  const search = document.getElementById("searchConsumer").value.toLowerCase(); // Get search input
  tbody.innerHTML = ""; // Clear existing rows

  // Filter and loop through the matching consumers
  consumers
    .filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.address.toLowerCase().includes(search) ||
      c.contact.includes(search)
    )
    .forEach((c, index) => {
      // Create a new row and populate it with consumer data and action buttons
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${c.name}</td>
        <td>₹${c.rate}</td>
        <td>${c.address}</td>
        <td>${c.contact}</td>
        <td>
          <button class="action-btn" onclick="editCustomer(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteCustomer(${index})">Delete</button>
        </td>
      `;
      tbody.appendChild(row); // Append row to table body
    });
}

// Function to toggle visibility of the Add Customer form
function toggleAddCustomerForm() {
  const form = document.getElementById("addCustomerForm");
  const title = document.getElementById("formCustomerTitle");
  title.textContent = "Add New Customer"; // Set the form title
  document.querySelectorAll("#addCustomerForm input").forEach(input => input.value = ""); // Clear all input fields
  form.style.display = form.style.display === "none" ? "block" : "none"; // Toggle form visibility
}

// Function to handle form submission for adding or editing a customer
function submitCustomer() {
  const name = document.getElementById("custName").value.trim();
  const rate = parseFloat(document.getElementById("custRate").value);
  const address = document.getElementById("custAddress").value.trim();
  const contact = document.getElementById("custContact").value.trim();

  // Validation check
  if (!name || isNaN(rate) || !address || !contact) {
    alert("Please fill all fields correctly.");
    return;
  }

  // If editing, update the existing consumer, else add new one
  if (submitCustomer.editingIndex !== undefined) {
    consumers[submitCustomer.editingIndex] = { name, rate, address, contact };
    submitCustomer.editingIndex = undefined; // Reset editing index
  } else {
    consumers.push({ name, rate, address, contact });
  }

  document.getElementById("addCustomerForm").style.display = "none"; // Hide the form
  renderConsumers(); // Refresh the consumer list
}

// Function to load existing consumer data into the form for editing
function editCustomer(index) {
  const customer = consumers[index];
  document.getElementById("custName").value = customer.name;
  document.getElementById("custRate").value = customer.rate;
  document.getElementById("custAddress").value = customer.address;
  document.getElementById("custContact").value = customer.contact;

  document.getElementById("formCustomerTitle").textContent = "Edit Customer"; // Change form title
  document.getElementById("addCustomerForm").style.display = "block"; // Show the form

  submitCustomer.editingIndex = index; // Set index for editing
}

// Function to delete a consumer entry with confirmation
function deleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    consumers.splice(index, 1); // Remove consumer at specified index
    renderConsumers(); // Refresh table
  }
}

// Initial rendering of consumers when the page loads
renderConsumers();
