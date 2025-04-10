// Sample dataset of orders
const orders = [
  { date: "2025-04-09", customer: "Aman", quantity: 10, rate: 30 },
  { date: "2025-04-08", customer: "Reema", quantity: 6, rate: 25 },
  { date: "2025-04-07", customer: "Ravi", quantity: 8, rate: 28 },
  { date: "2025-04-01", customer: "Aman", quantity: 5, rate: 30 },
  { date: "2025-04-02", customer: "Reema", quantity: 7, rate: 27 },
];

// Chart instances to allow proper destruction before re-rendering
let quantityChart, amountChart, lineChartQty, lineChartAmt;

// Adjust date input type based on selected report type
function adjustInputs() {
  const type = document.getElementById("reportType").value;
  document.getElementById("dateInput").type = type === "monthly" ? "month" : "date";
}

// Generate report based on selected type and date
function generateReport() {
  const type = document.getElementById("reportType").value;
  const selected = document.getElementById("dateInput").value;
  if (!selected) return alert("Please select a date");

  const selectedDate = new Date(selected);

  // Filter orders based on selected report type
  const filtered = orders.filter(o => {
      const orderDate = new Date(o.date);
      if (type === "daily") return o.date === selected;
      if (type === "weekly") {
          const { start, end } = getWeekRange(selectedDate);
          return orderDate >= start && orderDate <= end;
      }
      if (type === "monthly") {
          return orderDate.getFullYear() === selectedDate.getFullYear() &&
                 orderDate.getMonth() === selectedDate.getMonth();
      }
  });

  if (filtered.length === 0) {
      alert("No data found for selected range.");
      return;
  }

  // Render table and graphs
  renderTable(filtered);
  renderGraphs(filtered, type);
}

// Get start and end date of the week for a given date
function getWeekRange(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(date);
  start.setDate(diff);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

// Populate table with filtered data
function renderTable(data) {
  const tbody = document.querySelector("#reportTable tbody");
  tbody.innerHTML = "";
  data.forEach(o => {
      const total = o.quantity * o.rate;
      tbody.innerHTML += `
          <tr>
              <td>${o.date}</td>
              <td>${o.customer}</td>
              <td>${o.quantity}</td>
              <td>₹${o.rate}</td>
              <td>₹${total}</td>
          </tr>
      `;
  });
}

// Render graphs for weekly and monthly reports
function renderGraphs(data, type) {
  // Destroy existing charts
  quantityChart?.destroy();
  amountChart?.destroy();
  lineChartQty?.destroy();
  lineChartAmt?.destroy();

  // Show/hide graph section
  document.getElementById("graphSection").style.display = (type === "daily") ? "none" : "block";

  if (type === "daily") return; // Skip graph rendering for daily report

  const labels = [], quantities = [], amounts = [];
  const lineLabels = [], weekQty = [], weekAmt = [];

  // Sort data and extract values for bar charts
  data.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(o => {
      labels.push(o.date);
      quantities.push(o.quantity);
      amounts.push(o.quantity * o.rate);
  });

  // Group data week-wise for monthly report line charts
  if (type === "monthly") {
      const weekMap = {};
      data.forEach(o => {
          const week = `Week ${Math.ceil(new Date(o.date).getDate() / 7)}`;
          if (!weekMap[week]) weekMap[week] = { quantity: 0, amount: 0 };
          weekMap[week].quantity += o.quantity;
          weekMap[week].amount += o.quantity * o.rate;
      });
      for (let week in weekMap) {
          lineLabels.push(week);
          weekQty.push(weekMap[week].quantity);
          weekAmt.push(weekMap[week].amount);
      }
  }

  // Render bar chart for quantity
  const ctxQty = document.getElementById("quantityChart").getContext("2d");
  quantityChart = new Chart(ctxQty, {
      type: "bar",
      data: {
          labels: labels,
          datasets: [{
              label: "Blocks Sold",
              data: quantities,
              backgroundColor: "#00b4d8"
          }]
      },
      options: {
          plugins: {
              title: { display: true, text: "Quantity per Day" }
          },
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Blocks' }
              },
              x: {
                  title: { display: true, text: 'Date' }
              }
          }
      }
  });

  // Render bar chart for amount
  const ctxAmt = document.getElementById("amountChart").getContext("2d");
  amountChart = new Chart(ctxAmt, {
      type: "bar",
      data: {
          labels: labels,
          datasets: [{
              label: "Total Amount (₹)",
              data: amounts,
              backgroundColor: "#0077b6"
          }]
      },
      options: {
          plugins: {
              title: { display: true, text: "Amount per Day" }
          },
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Amount (₹)' }
              },
              x: {
                  title: { display: true, text: 'Date' }
              }
          }
      }
  });

  // Render additional line charts for monthly report
  if (type === "monthly") {
      const lineQtyCtx = document.createElement("canvas");
      lineQtyCtx.id = "lineQtyChart";
      const lineAmtCtx = document.createElement("canvas");
      lineAmtCtx.id = "lineAmtChart";

      document.getElementById("graphSection").appendChild(lineQtyCtx);
      document.getElementById("graphSection").appendChild(lineAmtCtx);

      // Line chart for weekly quantity
      lineChartQty = new Chart(lineQtyCtx.getContext("2d"), {
          type: "line",
          data: {
              labels: lineLabels,
              datasets: [{
                  label: "Blocks Sold (Week-wise)",
                  data: weekQty,
                  borderColor: "#00b4d8",
                  backgroundColor: "#caf0f8",
                  fill: true
              }]
          },
          options: {
              plugins: {
                  title: { display: true, text: "Weekly Quantity" }
              },
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Blocks' }
                  },
                  x: {
                      title: { display: true, text: 'Week' }
                  }
              }
          }
      });

      // Line chart for weekly amount
      lineChartAmt = new Chart(lineAmtCtx.getContext("2d"), {
          type: "line",
          data: {
              labels: lineLabels,
              datasets: [{
                  label: "Amount (₹) Week-wise",
                  data: weekAmt,
                  borderColor: "#0077b6",
                  backgroundColor: "#ade8f4",
                  fill: true
              }]
          },
          options: {
              plugins: {
                  title: { display: true, text: "Weekly Amount" }
              },
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Amount (₹)' }
                  },
                  x: {
                      title: { display: true, text: 'Week' }
                  }
              }
          }
      });
  }
}

// Export report table as Excel using SheetJS
function exportExcel() {
  const wb = XLSX.utils.table_to_book(document.getElementById("reportTable"), { sheet: "Report" });
  XLSX.writeFile(wb, "sales_report.xlsx");
}

// Export report table as PDF using jsPDF and autoTable
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Sales Report", 10, 10);
  doc.autoTable({ html: "#reportTable", startY: 20 });
  doc.save("sales_report.pdf");
}
