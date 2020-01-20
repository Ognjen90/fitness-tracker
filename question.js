console.log('it works');

var storedExercises = localStorage.getItem('actualExercises');
var exercisesFromLs = JSON.parse(storedExercises);
var exercises = {


    exercise: function () {
        var exercise = [];
        if (exercisesFromLs === null) {
            return this.exercise;
        } else {
            return exercise === exercisesFromLs;
        }
    },
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
        exercises.addExercise(nameInput.value, muscleGroupInput.value, typeInput);
        this.storeExercise();
        nameInput.value = "";
        muscleGroupInput.value = "";
        typeInput = "";
    },
    storeExercise: function () {

        for (var i = 0; i < exercises.exercise.length; i++) {

            localStorage.setItem(['actualExercises'], JSON.stringify(exercises.exercise));


        }

    }
}
console.log(exercises.exercise);
//console.log(exercises.isExercise);
