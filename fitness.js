console.log('radi');
var exercises = {
    exercise : [],
    addExercise: function(name,muscleGroup,repetition,time,distance){
        this.exercise.push({
        name: name,
        muscleGroup: muscleGroup,
        repetition: repetition,
        time: time,
        distance: distance
         } )
         console.log(this.exercise);
         view.displayExercises();
    }
};


var handlers = {
    addExercise: function(){
        var nameInput = document.getElementById('name');
        var muscleGroupInput = document.getElementById('muscle-group');
        var rapetitionInput = document.getElementById('repetition');
        var timeInput = document.getElementById('time');
        var distanceInput = document.getElementById('distance');
        exercises.addExercise(nameInput.value,muscleGroupInput.value,rapetitionInput.value,timeInput.value,distanceInput.value);
        nameInput.value = "";
        muscleGroupInput.value = "";
        rapetitionInput.value = "";
        timeInput.value = "";
        distanceInput.value = "";
    }
}

var view = {
    createNameInput: function (value /*= exercises.exercise.name*/) {
        var name = document.createElement("input");
        name.setAttribute("type", "text");
        name.name = 'name';
        name.disabled = true;
        name.value = value;
        return name;
    },
    // createmuscleGroupSelect: function (){

    // },
    createExpenseForm: function (name/*",muscleGroup,option"*/) {
        var form = document.createElement("form");
        form.appendChild(this.createNameInput(name));
        // form.appendChild(this.createmuscleGroupSelect(muscleGroup));
        // form.appendChild(this.createOptionSelect(option));
        // form.appendChild(this.createDeleteButton(position));
        // form.appendChild(this.createEditButton(position));
        return form;
    },
    createExerciseLi: function (position) {
        var li = document.createElement("li");
        li.id = position;
        li.appendChild(this.createExpenseForm(exercises.exercise[position].name));//", exercises.exercise[position].muscleGroup, exercises.exercise[position].option);"
        return li;
    },
    displayExercises: function () {
        var ul = document.querySelector("ul");
        ul.innerHTML = "";
        if (exercises.exercise.length === 0) {
            ul.innerHTML = "nema programa";
        } else {
            for (var i = 0; i < exercises.exercise.length; i++) {
                ul.appendChild(this.createExerciseLi(i));
            }
        }
    }
}
view.displayExercises();
