console.log('radi');
var exercises = [];
var storedExercises = localStorage.getItem('actualExercises');
exercises = JSON.parse(storedExercises);

console.log(exercises);

var view = {
    getTypeOfInput: function (value) {
        if (value === "repetition") {
            return "number of reretitions";
        } else if (value === "time") {
            return "times in second";
        } else if (value === 'distance') {
            return "km";
        }
    },
    createNameSpan: function (value) {
        var name = document.createElement("span");
        //name.setAttribute("type", "text");
        // name.name = 'name';
        // name.disabled = true;
        name.textContent = value;
        return name;
    },
    createMuscleGroupInput: function (value) {
        var muscleGroup = document.createElement("input");
        muscleGroup.setAttribute("type", "text");
        muscleGroup.name = 'muscleGroup';
        muscleGroup.disabled = true;
        muscleGroup.value = value;
        return muscleGroup;
    },

    createTypeInput: function (value) {
        var typeInput = document.createElement('input');
        typeInput.type = 'number';
        typeInput.name = value;
        typeInput.id = value;
        typeInput.value = value;
        typeInput.placeholder = this.getTypeOfInput(value);
        return typeInput;

    },
    createAddButton: function () {
        var addButton = document.createElement('button');
        addButton.textContent = '➕';
        addButton.className = 'addButton';
        addButton.type = 'button';
        return addButton;
    },
    createEditButton: function () {
        var editButton = document.createElement('button');
        editButton.textContent = '🖊️';
        editButton.id = 'editButton';
        return editButton;
    },
    createExerciseForm: function (name, type) {
        var form = document.createElement("form");
        form.appendChild(this.createNameSpan(name));
        form.appendChild(this.createEditButton());
        form.appendChild(this.createTypeInput(type));
        form.appendChild(this.createAddButton());
        return form;
    },
    createExerciseLi: function (exercises, position) {
        var li = document.createElement("li");
        li.id = position;

        li.appendChild(this.createExerciseForm(exercises[position].name, exercises[position].type));


        li.style.display = 'flex';
        return li;
    },
    displayExercises: function (exercises) {
        var ul = document.querySelector("ul");
        ul.innerHTML = "";
        if (exercises.length === 0) {
            ul.innerHTML = "nema programa";
        } else {
            for (var i = 0; i < exercises.length; i++) {
                ul.appendChild(this.createExerciseLi(exercises, i));
            }
        }
    },


}
var selectedExercises = {
    selectedExercise: [],
    addExercise: function (name, typeNumber, typeId) {
        this.selectedExercise.push({
            name: name,
            type: {
                typeName: typeNumber,
                id: typeId
            }

        })
        console.log(this.selectedExercise);
    },
    storeSelectedExercise: function () {

        for (var i = 0; i < selectedExercises.selectedExercise.length; i++) {

            localStorage.setItem(['selectedExercises'], JSON.stringify(selectedExercises.selectedExercise));

        }

    }
}
var handlers = {

    addExerciseToSchedule: function () {
        document.addEventListener('click', function (e) {
            if (e.target.className == "addButton") {

                var form = e.target.parentNode.childNodes;
                var span = form[0].textContent;
                var input = form[2].value;
                var inputId = form[2].id;
                selectedExercises.addExercise(span, input, inputId);
                selectedExercises.storeSelectedExercise();
                console.log(form);//////////////////////////////////////////////////// ovo napraviti dinamicnije

                // window.location = 'http://127.0.0.1:5500/fitness-tracker/schedule.html';
            }
        })


    },
    onSearch: function (event) {
        event.preventDefault();
        this.searchExercises();
    },
    searchExercises: function () {
        var searchText = document.getElementById('search').value;

        var results = exercises.filter(function (singleExercise) {

            return singleExercise.muscleGroup.toLowerCase().includes(searchText.toLowerCase())
                || singleExercise.name.toLowerCase().includes(searchText.toLowerCase());

        });
        view.displayExercises(results);
    },
    showAllExercises: function () {
        document.getElementById('search').value = '';
        this.searchExercises();
    }
};
view.displayExercises(exercises);
handlers.addExerciseToSchedule();