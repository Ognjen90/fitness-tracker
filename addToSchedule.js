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
        typeInput.className = "input";
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
    // createEditButton: function () {
    //     var editButton = document.createElement('button');
    //     editButton.textContent = '🖊️';
    //     editButton.id = 'editButton';
    //     return editButton;
    // },
    createExerciseForm: function (name, type) {
        var form = document.createElement("form");
        form.appendChild(this.createNameSpan(name));
        //form.appendChild(this.createEditButton());
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
    displayExercises: function () {
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
    addExercise: function (name, amount, id) {
        this.selectedExercise.push({
            name: name,
            amount: amount,
            id: id,
            date: this.getDate()

        })
        console.log(this.selectedExercise);
    },
    getDate: function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var hour = d.getHours();
        var min = d.getMinutes();


        var today = year + "-" + month + "-" + day;
        return today;


    },
    storeSelectedExercise: function () {

        for (var i = 0; i < selectedExercises.selectedExercise.length; i++) {
            var exercisesForStore =  selectedExercises.selectedExercise;
            localStorage.setItem(['selectedExercises'], JSON.stringify(exercisesForStore));

        }

    }
}
var handlers = {

    addExerciseToSchedule: function () {
        document.addEventListener('click', function (e) {
            if (e.target.className == "addButton") {
                var form = e.target.parentNode.childNodes;
                var span = form[0].textContent;
                var input = form[1].value;
                var inputId = form[0].textContent;
                if (input === "" || input === NaN) {
                    alert('morate da unesete vrednost');
                } else {
                    selectedExercises.addExercise(span, input, inputId);
                    selectedExercises.storeSelectedExercise();
                    input = "";///////////////////////////////////////////ostaviti prazan input
                    console.log(form);//////////////////////////////////////////////////// ovo napraviti dinamicnije
                    view.displayExercises();
                }
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
        document.getElementsByClassName('input').value = '';

        this.searchExercises();
    },
    removeDuplicates: function () {
        // Create an array of objects 
        var arr = selectedExercises.selectedExercise;

        // Display the list of array objects 
        //console.log(arr); 

        // Declare a new array 
        var newArray = [];

        // Declare an empty object 
        var uniqueObject = {};

        // Loop for the array elements 
        for (var i in arr) {

            // Extract the title 
            var objTitle = arr[i]['name'];

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
handlers.addExerciseToSchedule();
var value = JSON.parse(localStorage.getItem('selectedExercises')) || [];
selectedExercises.selectedExercise = [... new Set(value)];
view.displayExercises();
console.log(selectedExercises.selectedExercise);