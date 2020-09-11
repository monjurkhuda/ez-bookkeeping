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

var totalDisplay = document.getElementById("paid_total");

function pageRefresh() {

  var db = firebase.database();

  //Listing Paid
  var dbOwed = db.ref("Owed");
  dbOwed.orderByChild("Date").on("child_added", async function(snapshot) {
    var isTrue = snapshot.val().Paid;
    if (isTrue) {
      var paidList = document.getElementById("paid_list");
      var paidRow = document.createElement("li");
      paidRow.className = "list_paid_item";
      paidRow.innerHTML = snapshot.val().Amount;
      var paidNoteRow = document.createElement("li");
      paidNoteRow.className = "list_paid_note";
      paidNoteRow.innerHTML = snapshot.val().Note;
      var paidDateRow = document.createElement("li");
      paidDateRow.className = "list_paid_date";
      paidDateRow.innerHTML = snapshot.val().Date;

      var undoPaidButton = document.createElement("button");
      undoPaidButton.innerHTML = "Undo Paid";
      undoPaidButton.onclick = undoPaid;

      paidList.appendChild(paidRow);
      if (paidNoteRow.innerHTML) {
        paidList.appendChild(paidNoteRow);
      }
      paidList.appendChild(paidDateRow);
      paidList.appendChild(undoPaidButton);

      async function undoPaid() {
        
        
        
        
        
        
        
        
        
        var key = snapshot.key;
        var amount = snapshot.val().Amount;
        var subtractAmount = Number(snapshot.val().Amount);
        
         var totalPaid = db.ref("TotalPaid");
        totalPaid.once("value").then(function(snapshot2) {          
            var oldSum = Number(snapshot2.val().Sum);
            var newSum = oldSum - subtractAmount;
            console.log(oldSum);
            console.log(newSum);
            totalPaid.set({
              Sum: newSum
            });
          var owedUpdate = db.ref("Owed");
          owedUpdate.child(key).update({
              Paid: false
            });         
          paidRow.style.visibility = "hidden";
          paidNoteRow.style.visibility = "hidden";
          paidDateRow.style.visibility = "hidden";          
          undoPaidButton.style.visibility = "hidden";
          totalDisplay.innerHTML = "<p>" + newSum + "</p>";
          location.reload();
        });     

        var totalOwed = db.ref("TotalOwed");
        totalOwed.once("value").then(function(snapshot3) {
          var oldSum = Number(snapshot3.val().Sum);
          var newSum = oldSum + subtractAmount;
          totalOwed.set({
            Sum: newSum
          });     
        });        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      }
    }
  });

  var totalPaid = db.ref("TotalPaid");
  totalPaid.once("value").then(function(snapshot) {
    var totalPaidDisplay = snapshot.val().Sum;
    console.log(totalPaidDisplay);
    totalDisplay.innerHTML = "<p>" + totalPaidDisplay + "</p>";    
  });
}