// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgVDfF0u_-Pj6SQWygZh_9xvx42_QgteY",
    authDomain: "fir-homework-6dcb8.firebaseapp.com",
    databaseURL: "https://fir-homework-6dcb8.firebaseio.com",
    projectId: "fir-homework-6dcb8",
    storageBucket: "fir-homework-6dcb8.appspot.com",
    messagingSenderId: "144047793207"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

 var name = "";
 var destination = "";
 var ftime = "";
 var frequency = "";

     $(".btn").on("click", function(event) {
     event.preventDefault();
     name = $("#trainName").val();
     destination = $("#destination").val();
     ftime = moment($("#ftime").val().trim(), "HH:mm").subtract(10, "minutes").format("X");
     frequency = $("#frequency").val();

     database.ref().push({
     name: name,
     destination: destination,
     frequency: frequency,
     ftime: ftime
     });
 });
    database.ref().on("child_added", function(childSnapshot) {
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var ftime = childSnapshot.val().ftime;

        var timeRemainder = moment().diff(moment.unix(ftime), "minutes") % frequency;
        var minutesAway = frequency - timeRemainder;
        var nextTrainArrival = moment().add(minutesAway, "m").format("hh:mm");

        var newTr = {
            name: name,
            destination: destination,
            frequency: frequency,
            nextTrainArrival: nextTrainArrival,
            minutesAway: minutesAway
        };
        $("table").append(makeRow(newTr));
    });

    function makeRow(data) {
        return `
        <tbody>
        <tr>
        <td>${data.name}</td>
        <td>${data.destination}</td>
        <td>${data.nextTrain}</td>
        <td>${data.frequency}</td>
        <td>${data.nextTrainArrival}</td>
        <td>${data.minutesAway}</td>
        </tr>
        </tbody>
        `;
    }