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

  $("#submit").on("click", function(event){
      event.preventDefault();
      
      var name = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var fTrain = moment($("#time").val().trim());
      var frequency = $("#min").val().trim();
      var fTrainMin = moment().diff(moment(fTrain, "X"),"minutes");
      var minAway = frequency - fTrainMin;
      if (minAway < 1) {
          moment().add(1400, "minutes").fTrainMin;
          minAway = frequency - fTrainMin;
      };
      if(minAway > frequency) {
          minAway = fTrainMin * -1;
      };

      var newTrain = {
          name: name,
          destination: destination,
          fTrain: fTrain,
          frequency: frequency,
          fTrainMin: fTrainMin,
          minAway: minAway  
      };
      database.ref().push(newTrain);
  });

  database.ref().on("chiild_added", function(childSnapshot) {
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var minAway = childSnapshot.val().minAway;
      var nextTrain = moment().add(minAway, "minutes").format("LLL");

      function createTrain() {
          return `
          <tr>
          <th scope="row">${name}</th>
          <td>${destination}</td>
          <td>${nextTrain}</td>
          <td>${minAway}</td>
          </tr>
          `
      };
      $("tbody").append(createTrain());

      $("#trainName").val(" ");
      $("#destination").val(" ");
      $("#time").val(" ");
      $("#min").val(" ");
  });