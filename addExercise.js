console.log('it works');

var exercises = {
    exercise:[],
    addExercise: function (name, muscleGroup, type) {
         
        this.exercise.push({
            name: name,
            muscleGroup: muscleGroup,
            type: type
        })
       
    }
};


var handlers = {
    getValueOfType: function () {
        var repetition = document.getElementById('repetition');
        var repetitionValue = "";
        var time = document.getElementById('time');
        var timeValue = "";
        var distance = document.getElementById('distance');
        var distanceValue = "";
        if (repetition.checked === true) {
            repetitionValue = 'repetition';
            return repetitionValue;
        } else if (time.checked === true) {
            timeValue = 'time';
            return timeValue;
        } else {
            distanceValue = 'distance';
            return distanceValue;
        }
    },

    addExercise: function () {
        var nameInput = document.getElementById('name');
        var muscleGroupInput = document.getElementById('muscle-group');
        var typeInput = this.getValueOfType();

        if(nameInput.value === "" || muscleGroupInput.value === ""){
            alert("potrebno je da popunite sva polja");
        }else{exercises.addExercise(nameInput.value, muscleGroupInput.value, typeInput);
            this.storeExercise();
            nameInput.value = "";
            muscleGroupInput.value = "";
            typeInput = "";}
            window.location = "http://127.0.0.1:5500/fitness-tracker/add-to-schedule.html";
        
    },
    storeExercise: function () {
       
        for (var i = 0; i < exercises.exercise.length; i++) {
            var exercisesForStore = this.removeDuplicates();
            localStorage.setItem(['actualExercises'], JSON.stringify(exercisesForStore));


        }




    },
    removeDuplicates: function (){
        // Create an array of objects 
    var arr = exercises.exercise;
      
    // Display the list of array objects 
    //console.log(arr); 

    // Declare a new array 
   var newArray = []; 
      
    // Declare an empty object 
    var uniqueObject = {}; 
      
    // Loop for the array elements 
    for (var i in arr) { 

        // Extract the title 
      var  objTitle = arr[i]['name'].toLowerCase(); 

        // Use the title as the index 
        uniqueObject[objTitle] = arr[i]; 
    } 
      
    // Loop to push unique object into array 
    for (i in uniqueObject) { 
        newArray.push(uniqueObject[i]); 
    } 
      
    // Display the unique objects 
   // console.log(newArray); 
    return newArray;
    }
};




exercises.exercise = JSON.parse( localStorage.getItem('actualExercises')) || [];
console.log(exercises.exercise);
//console.log(exercises.isExercise);
