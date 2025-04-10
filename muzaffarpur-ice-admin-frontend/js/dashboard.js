const orders = [
  { id: "O001", name: "Aman", qty: 10, rate: 30, status: "pending", date: "2025-04-10" },
  { id: "O002", name: "Reema", qty: 15, rate: 28, status: "confirmed", date: "2025-04-10" },
  { id: "O003", name: "Ravi", qty: 20, rate: 25, status: "delivered", date: "2025-04-10" },
  { id: "O004", name: "Karan", qty: 12, rate: 27, status: "delivered", date: "2025-04-09" },
  { id: "O005", name: "Pooja", qty: 8, rate: 30, status: "pending", date: "2025-04-09" }
];

const totalStock = 1200;

function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function updateDashboard(dateStr) {
  const filtered = orders.filter(order => order.date === dateStr);

  const pending = filtered.filter(o => o.status === "pending");
  const confirmed = filtered.filter(o => o.status === "confirmed");
  const delivered = filtered.filter(o => o.status === "delivered");

  const totalOrders = filtered.length;
  const quantitySold = filtered.reduce((sum, o) => sum + o.qty, 0);
  const remainingStock = totalStock - quantitySold;

  document.getElementById("pendingCount").textContent = pending.length;
  document.getElementById("confirmedCount").textContent = confirmed.length;
  document.getElementById("deliveredCount").textContent = delivered.length;

  document.getElementById("totalOrders").textContent = totalOrders;
  document.getElementById("quantitySold").textContent = quantitySold;
  document.getElementById("stockLeft").textContent = remainingStock;

  document.getElementById("selectedDateText").textContent = formatDateLabel(dateStr);
}

document.getElementById("dashboardDate").addEventListener("change", (e) => {
  const selected = e.target.value;
  if (selected) updateDashboard(selected);
});

// Initialize with today's date
const today = new Date().toISOString().slice(0, 10);
document.getElementById("dashboardDate").value = today;
updateDashboard(today);
