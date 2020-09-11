//get this data from your firebase account
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var today = new Date();
var year = today.getFullYear();
var month = today.toLocaleString("default", { month: "long" });
var day = today.getDate();
let todayDateDisplay = month + " " + day + ", " + year;
let todayDate = month + day + year;

var totalDisplay = document.getElementById("owed_total");

function pageRefresh() {
  //document.getElementById("cash_input").focus();

  var db = firebase.database();

  //Listing Owed
  var dbOwed = db.ref("Owed");
  dbOwed.orderByChild("Date").on("child_added", async function(snapshot) {
    var isTrue = snapshot.val().Paid;

    if (!isTrue) {
      var owedList = document.getElementById("owed_list");
      var owedRow = document.createElement("li");
      owedRow.className = "list_owed_item";
      owedRow.innerHTML = snapshot.val().Amount;
      var owedNoteRow = document.createElement("li");
      owedNoteRow.className = "list_owed_note";
      owedNoteRow.innerHTML = snapshot.val().Note;
      var owedDateRow = document.createElement("li");
      owedDateRow.className = "list_owed_date";
      owedDateRow.innerHTML = snapshot.val().Date;

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = deleteListItem;
      var editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.onclick = editListItem;
      var paidButton = document.createElement("button");
      paidButton.innerHTML = "Paid";
      paidButton.onclick = owedPaid;

      owedList.appendChild(owedRow);
      if (owedNoteRow.innerHTML) {
        owedList.appendChild(owedNoteRow);
      }
      owedList.appendChild(owedDateRow);
      owedList.appendChild(deleteButton);
      owedList.appendChild(editButton);
      owedList.appendChild(paidButton);

      async function deleteListItem() {
        var key = snapshot.key;
        var subtractAmount = Number(snapshot.val().Amount);
        await dbOwed.child(key).remove();

        var totalOwed = db.ref("TotalOwed");
        totalOwed.once("value").then(function(snapshot2) {
          var oldSum = Number(snapshot2.val().Sum);
          var newSum = oldSum - subtractAmount;
          totalOwed.set({
            Sum: newSum
          });
          owedRow.style.visibility = "hidden";
          owedNoteRow.style.visibility = "hidden";
          owedDateRow.style.visibility = "hidden";
          deleteButton.style.visibility = "hidden";
          editButton.style.visibility = "hidden";
          paidButton.style.visibility = "hidden";
          totalDisplay.innerHTML = "<p>" + newSum + "</p>";
          location.reload();
        });
      }

      async function editListItem() {
        var key = snapshot.key;
        var previousAmount = snapshot.val().Amount;
        var previousNote = snapshot.val().Note;
        var newAmount = Number(window.prompt("Amount:", previousAmount));
        var newNote = window.prompt("Note:", previousNote);

        var totalOwed = db.ref("TotalOwed");
        totalOwed.once("value").then(function(snapshot2) {
          var oldSum = Number(snapshot2.val().Sum);

          if (newAmount > previousAmount) {
            var newSum = oldSum + (newAmount - previousAmount);
            totalDisplay.innerHTML = "<p>" + newSum + "</p>";
            totalOwed.set({
              Sum: newSum
            });
            var owedEdit = db.ref("Owed");
            owedEdit.once("value").then(function(snapshot3) {
              owedEdit.child(key).update({
                Amount: newAmount,
                Note: newNote
              });
            });
          } else if (previousAmount > newAmount) {
            var newSum = oldSum - (previousAmount - newAmount);
            totalDisplay.innerHTML = "<p>" + newSum + "</p>";
            totalOwed.set({
              Sum: newSum
            });
            var owedEdit = db.ref("Owed");
            owedEdit.once("value").then(function(snapshot3) {
              owedEdit.child(key).update({
                Amount: newAmount,
                Note: newNote
              });
            });
          } else if (previousAmount === newAmount) {
            var owedEdit = db.ref("Owed");
            owedEdit.once("value").then(function(snapshot3) {
              owedEdit.child(key).update({
                Note: newNote
              });
            });
          }
          owedRow.innerHtml = newAmount;
          owedNoteRow.innerHtml = newNote;
          location.reload();
        });
      }

      async function owedPaid() {
        var key = snapshot.key;
        var amount = snapshot.val().Amount;
        var subtractAmount = Number(snapshot.val().Amount);

        var totalOwed = db.ref("TotalOwed");
        totalOwed.once("value").then(function(snapshot2) {
          var oldSum = Number(snapshot2.val().Sum);
          var newSum = oldSum - subtractAmount;
          totalOwed.set({
            Sum: newSum
          });
          var owedPaidTrue = db.ref("Owed");
          owedPaidTrue.once("value").then(function(snapshot3) {
            owedPaidTrue.child(key).update({
              Paid: true
            });
          });
          owedRow.style.visibility = "hidden";
          owedNoteRow.style.visibility = "hidden";
          owedDateRow.style.visibility = "hidden";
          deleteButton.style.visibility = "hidden";
          editButton.style.visibility = "hidden";
          paidButton.style.visibility = "hidden";
          totalDisplay.innerHTML = "<p>" + newSum + "</p>";
          location.reload();
        });

        var totalPaid = db.ref("TotalPaid");
        totalPaid.once("value").then(function(snapshot4) {          
          console.log(amount);
          if (snapshot4.val() === null) {
            totalPaid.set({
              Sum: amount
            });
          } else {
            var oldSum = Number(snapshot4.val().Sum);
            var newSum = oldSum + subtractAmount;
            console.log(oldSum);
            console.log(newSum);
            totalPaid.set({
              Sum: newSum
            });
          }
        });
      }
    }
  });

  //Total
  var totalRef = db.ref("TotalOwed");
  totalRef.once("value").then(function(snapshot) {
    if (snapshot.val() === null) {
      totalDisplay.innerHTML = "<p> 0 </p>";
    } else {
      var owedTotal = snapshot.val().Sum;
      totalDisplay.innerHTML = "<p>" + owedTotal + "</p>";
    }
  });
}

async function owedSubmission() {
  var db = firebase.database();
  var myDBConn = db.ref();
  var owedBranch = myDBConn.child("Owed");
  var amount = Number(document.getElementById("cash_input").value);
  var note = document.getElementById("note_input");
  owedBranch.push({
    Amount: amount,
    Note: note.value,
    Date: todayDate,
    Paid: false
  });

  var totalOwed = db.ref("TotalOwed");
  totalOwed.once("value").then(function(snapshot) {
    if (snapshot.val() === null) {
      totalOwed.set({
        Sum: amount
      });
    } else {
      var oldSum = Number(snapshot.val().Sum);
      var newSum = oldSum + amount;
      totalOwed.set({
        Sum: newSum
      });
      totalDisplay.innerHTML = "<p>" + newSum + "</p>";
    }
  });
  document.getElementById("cash_input").value = "";
  note.value = "";
}
