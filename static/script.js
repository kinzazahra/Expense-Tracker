document.addEventListener("DOMContentLoaded", () => {

  let pieChart = null;
  let barChart = null;

  const monthInput = document.getElementById("month");
  const list = document.getElementById("list");

  if (!monthInput || !list) {
    console.error("Required DOM elements not found");
    return;
  }

  // ✅ Auto-set current month SAFELY
  const d = new Date();
  const currentMonth =
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  monthInput.value = currentMonth;

  monthInput.addEventListener("change", load);

  // expose to buttons
  window.addIncome = () => handleAdd("income");
  window.addExpense = () => handleAdd("expense");

  async function handleAdd(type) {
    if (!monthInput.value) {
      alert("⚠️ Please select a month first");
      return;
    }

    // In script.js, update the handleAdd check slightly:
if (type === "expense") {
  const currentData = await fetchData();
  // Ensure we are checking for 'income' type specifically
  const income = currentData.filter(d => d.type === "income").reduce((s, d) => s + d.amount, 0);
  if (income <= 0) {
    alert("⚠️ Please add income first");
    return;
  }
}

    await sendData(type);
  }

  async function sendData(type) {
    const titleEl = type === "income"
      ? document.getElementById("incomeTitle")
      : document.getElementById("expenseTitle");

    const amountEl = type === "income"
      ? document.getElementById("incomeAmount")
      : document.getElementById("expenseAmount");

    if (!titleEl || !amountEl) {
      alert("Missing input fields");
      return;
    }

    const payload = {
      title: titleEl.value.trim(),
      category: type === "income"
        ? "Income"
        : document.getElementById("category").value,
      amount: Number(amountEl.value),
      month: monthInput.value,
      type: type
    };

    if (!payload.title || payload.amount <= 0) {
      alert("⚠️ Enter valid title and amount");
      return;
    }

    const res = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to add data");
      return;
    }

    // ✅ Clear inputs after success
    titleEl.value = "";
    amountEl.value = "";

    load();
  }

  async function fetchData() {
    const res = await fetch(`/data?month=${monthInput.value}`);
    return res.json();
  }

  async function load() {
    const data = await fetchData();
    list.innerHTML = "";

    let inc = 0;
    let exp = 0;

    data.forEach(d => {
      list.innerHTML += `
        <div class="transaction-item ${d.type}">
          <strong>${d.title}</strong>
          <span>${d.type === "income" ? "+" : "-"}₹${d.amount}</span>
        </div>
      `;
      d.type === "income" ? inc += d.amount : exp += d.amount;
    });

    document.getElementById("total-income").innerText = `₹${inc}`;
    document.getElementById("total-expense").innerText = `₹${exp}`;
    document.getElementById("balance").innerText = `₹${inc - exp}`;
    document.getElementById("expense-ratio").innerText =
      inc > 0 ? Math.round((exp / inc) * 100) + "%" : "0%";
  }

  load();
});
