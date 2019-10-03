console.log('radi');
// var util = {
//     uuid: function () {
//         /*jshint bitwise:false */
//         var i, random;
//         var uuid = '';

//         for (i = 0; i < 32; i++) {
//             random = Math.random() * 16 | 0;
//             if (i === 8 || i === 12 || i === 16 || i === 20) {
//                 uuid += '-';
//             }
//             uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
//         }

//         return uuid;
//     },
//     pluralize: function (count, word) {
//         return count === 1 ? word : word + 's';
//     },
//     store: function (namespace, data) {
//         if (arguments.length > 1) {
//             return localStorage.setItem(namespace, JSON.stringify(data));
//         } else {
//             var store = localStorage.getItem(namespace);
//             return (store && JSON.parse(store)) || [];
//         }
//     }
// };
var exercises = {
    exercise: [],
    addExercise: function (name, muscleGroup, type) {
        this.exercise.push({
            name: name,
            muscleGroup: muscleGroup,
            type: type
        })
        // console.log(this.exercise);
        //view.displayExercises();
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
        // arr.forEach(function (item) {
        //     var stringifiedItem = JSON.stringify(item);
        for (var i = 0; i < exercises.exercise.length; i++) {

            localStorage.setItem(['actualExercises'], JSON.stringify(exercises.exercise));


        }




    }
}

