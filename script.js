const monthYear = document.getElementById("month-year");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const calendarTable = document.getElementById("calendar-table");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
    const date = new Date(currentYear, currentMonth);
    const firstDay = (new Date(currentYear, currentMonth)).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.textContent = `${new Intl.DateTimeFormat("default", { month: "long" }).format(date)} ${currentYear}`;

    let tableHTML = `
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
  `;

    let day = 1;
    for (let i = 0; i < 6; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                tableHTML += "<td></td>";
            } else if (day > daysInMonth) {
                break;
            } else {
                let cellClass = "current-month";
                if (day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                    cellClass = "today";
                }
                tableHTML += `<td class="${cellClass}">${day}</td>`;
                day++;
            }
        }
        tableHTML += "</tr>";
    }

    calendarTable.innerHTML = tableHTML;
}

prevMonth.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonth.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

generateCalendar();