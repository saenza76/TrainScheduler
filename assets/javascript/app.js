// Firebase Initialize
var config = {
    apiKey: "AIzaSyD4lVjZcctBN7mWdVWsEm_FVOCqE9L0fnc",
    authDomain: "trainscheduler-eca51.firebaseapp.com",
    databaseURL: "https://trainscheduler-eca51.firebaseio.com",
    storageBucket: "trainscheduler-eca51.appspot.com",
  };
  firebase.initializeApp(config);

  var trainName = '';
  var trainDestination = '';
  var trainFrequency = '';
  var firstTrainTime = '';
  var nextArrival = '';
  var minutesAway = '';
  var inputs;

  clearData = function(){
  	$('#trainNameInput').val('');
  	$('#destinationInput').val('');
  	$('#frequencyInput').val('');
  	$('#firstTrainTimeInput').val('');
  };

  $(document).ready(function(){

  	$('#addTrainBtn').on('click', function(){
  		trainName = $('#trainNameInput').val().trim();
  		trainDestination = $('#destinationInput').val().trim();
  		trainFrequency = $('#frequencyInput').val().trim();
  		firstTrainTime = $('#firstTrainTimeInput').val().trim();

  		inputs = {
  			name: trainName,
  			destination: trainDestination,
  			frequency: trainFrequency,
  			trainTime: firstTrainTime
  		};

  		firebase.database().ref().push(inputs);
  		clearData();
  		return false;
  	});

  	firebase.database().ref().on('child_added', function(childSnapshot){

  		trainName = childSnapshot.val().name;
  		trainDestination = childSnapshot.val().destination;
  		trainFrequency = childSnapshot.val().frequency;
  		firstTrainTime = childSnapshot.val().trainTime;

  		var firstTimeConverted = moment(firstTrainTime, 'hh:mm').subtract(1, 'years');
  		var currentTime = moment();
  		var timeDifference = moment().diff(moment(firstTimeConverted), 'minutes');
  		var timeRemaining = timeDifference % trainFrequency;
  		var minutesTillTrain = trainFrequency - timeRemaining
  		var nextTrain = moment().add(minutesTillTrain, 'minutes');
  		var arrivalTime = moment(nextTrain).format('hh:mm');

  		$('tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + arrivalTime + '</td><td>' + minutesTillTrain + ' Minutes' + '</td></tr>');

  	});


  });