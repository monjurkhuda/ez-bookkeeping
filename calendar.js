let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let longMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  
  var table = document.getElementById("calendar");
  if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function() {
          let paintDate = new Date();
          var r = /\d+/;

          paintDate.setDate(this.innerHTML.toString().match(r)[0]);
          paintDate.setMonth(currentMonth);
          paintDate.setYear(currentYear);

          var month = longMonths[currentMonth];
          var day = paintDate.getDate();
          var year = currentYear;

          let paintDateString = month + " " + day + ", " + year;

          var painteddatetransfer = paintDateString;
          sessionStorage.setItem("paintedDateTransfer", painteddatetransfer);
          
          var Month = month;
        sessionStorage.setItem("month", Month);
        
        var Day = day;
        sessionStorage.setItem("day", Day);
        
        var Year = year;
        sessionStorage.setItem("year", Year);
          
        };
    }
  }
  
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  
  console.log(currentYear);
  console.log(currentMonth);

  var table = document.getElementById("calendar");
  if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function() {
          let paintDate = new Date();
          var r = /\d+/;

          paintDate.setDate(this.innerHTML.toString().match(r)[0]);
          paintDate.setMonth(currentMonth);
          paintDate.setYear(currentYear);

          var month = longMonths[currentMonth];
          var day = paintDate.getDate();
          var year = currentYear;
          
          console.log(month);
          console.log(day);
          console.log(year);

          let paintDateString = month + " " + day + ", " + year;
          
          console.log(paintDateString);

          var painteddatetransfer = paintDateString;
          sessionStorage.setItem("paintedDateTransfer", painteddatetransfer);
          
          var Month = month;
        sessionStorage.setItem("month", Month);
        
        var Day = day;
        sessionStorage.setItem("day", Day);
        
        var Year = year;
        sessionStorage.setItem("year", Year);
          
        };
    }
  }
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
  
  var table = document.getElementById("calendar");
  if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function() {
          let paintDate = new Date();
          var r = /\d+/;

          paintDate.setDate(this.innerHTML.toString().match(r)[0]);
          paintDate.setMonth(currentMonth);
          paintDate.setYear(currentYear);

          var month = longMonths[currentMonth];
          var day = paintDate.getDate();
          var year = currentYear;

          let paintDateString = month + " " + day + ", " + year;

          var painteddatetransfer = paintDateString;
          sessionStorage.setItem("paintedDateTransfer", painteddatetransfer);
          
          var Month = month;
        sessionStorage.setItem("month", Month);
        
        var Day = day;
        sessionStorage.setItem("day", Day);
        
        var Year = year;
        sessionStorage.setItem("year", Year);
          
        };
    }
  }
  
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    ///creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let a = document.createElement("a");
        a.href = "./history.html";
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        } // color today's date
        cell.appendChild(a).appendChild(cellText);
        cell.classList.add("date");
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}

var table = document.getElementById("calendar");
if (table != null) {
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++)
      table.rows[i].cells[j].onclick = function() {
        let paintDate = new Date();
        var r = /\d+/;

        paintDate.setDate(this.innerHTML.toString().match(r)[0]);
        paintDate.setMonth(currentMonth);
        paintDate.setYear(currentYear);

        var month = longMonths[currentMonth];
        var day = paintDate.getDate();
        var year = currentYear;

        let paintDateString = month + " " + day + ", " + year;

        var painteddatetransfer = paintDateString;
        sessionStorage.setItem("paintedDateTransfer", painteddatetransfer);
        
        var Month = month;
        sessionStorage.setItem("month", Month);
        
        var Day = day;
        sessionStorage.setItem("day", Day);
        
        var Year = year;
        sessionStorage.setItem("year", Year);
      };
  }
}
