console.log('radi');
var exercises = [];
//
var storedExercises = localStorage.getItem('selectedExercises');
exercises = JSON.parse(storedExercises);

console.log(exercises.length);
console.log(exercises);
var controlExercises = {
    deleteExercise: function (position) {
        exercises.splice(position, 1);
        view.displayExercises();
    },
    editExercise: function (position, event) {
        var editedExercise = exercises[position];
        event.target.parentNode.querySelectorAll('input').forEach(function (input) {
            editedExercise[input.name] = input.value;
        });
    }
    
};
var view = {
    createNameSpan: function (value) {
        var name = document.createElement("span");
        name.textContent = value;
        return name;
    },
    createTypeInput: function (value, id) {
        var typeInput = document.createElement('input');
        typeInput.type = 'number';
        typeInput.name = 'amount';
        typeInput.id = id;
        typeInput.value = value;
        typeInput.disabled = true;
        // typeInput.placeholder = this.getTypeOfInput(value);
        return typeInput;
    },
    getTypeOfInput: function (value) {
        if (value === "repetition") {
            return "number of reretitions";
        } else if (value === "time") {
            return "times in second";
        } else if (value === 'distance') {
            return "km";
        }
    },
    createEditButton: function () {
        var editButton = document.createElement('button');
        editButton.textContent = '🖊️';
        editButton.className = 'editButton';
        editButton.type = 'button';
        editButton.addEventListener('click', function (event) {
            events.edit(event);
        });
        return editButton;
    },
    createSaveButton: function () {
        var saveButton = document.createElement('button');
        saveButton.textContent = '💾';
        saveButton.id = 'saveButton';
        saveButton.type = 'button';
        saveButton.addEventListener('click', function (event) {
            events.save(event);
        });
        return saveButton;
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.className = 'deleteButton';
        deleteButton.type = 'button';
        return deleteButton;
    },
    createExerciseForm: function (name, type, id, date) {
        var form = document.createElement('form');
        form.setAttribute("date", date);
        form.appendChild(this.createNameSpan(name));
        form.appendChild(this.createTypeInput(type, id));
        form.appendChild(this.createEditButton());
        form.appendChild(this.createSaveButton());
        form.appendChild(this.createDeleteButton());
        return form;
    },
    createExerciseLi: function (exercises, position) {
        var li = document.createElement("li");
        li.id = position;

        li.appendChild(this.createExerciseForm(exercises[position].name, exercises[position].amount, exercises[position].id, exercises[position].date));


        li.style.display = 'flex';
        return li;
    },
    getDate: function () {
        var d = new Date();
        var month = d.getMonth() + 1,
            day = d.getDate() ;
        year = d.getFullYear(),
            hour = d.getHours(),
            min = d.getMinutes();
        var days = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
       
        var today = year + "-" + month +  "-" + day ;
       // console.log(today);

        var months = [
            'jan',
            'feb',
            'mar',
            'april',
            'maj',
            'jun',
            'jul',
            'avgust',
            'septembar',
            'oktobar',
            'novembar',
            'decembar'

        ];
        var dayIndex = d.getDate();
        var dayName = days[dayIndex];
        var monthIndex = d.getMonth();
        var monthName = months[monthIndex];
      
        console.log("date" + today);
        return today;

    },
    displayExercises: function () {
        var today = this.getDate();
        var title = document.querySelector('h1');
        title.textContent = "Schedule for" + " " + today;
        console.log("dis" + today)
        var ul = document.querySelector("ul");

        ul.innerHTML = "";
        if (exercises.length === 0) {
            ul.innerHTML = "nema programa";
        } else {
            // exercises.forEach(function(exercise,i){
            //     //if(exercise.date === today){
            //         ul.appendChild(this.createExerciseLi(exercises, i));
            //         console.log(ul);
            //   //  }
            // },this);
            for (var i = 0; i < exercises.length; i++) {
                if (exercises[i].date === today) {
                    ul.appendChild(this.createExerciseLi(exercises, i));
                    console.log(exercises[i]);
                 } else {
                    var inputDate = document.getElementById('formdate');
                    if (exercises[i].date === inputDate.value) {
                        title.textContent = "Schedule for" + " " + inputDate.value;
                        ul.appendChild(this.createExerciseLi(exercises, i));
                    }
                }
            }
        }
    },
};

var events = {
    removeLocalStorageValues: function (event) {
        var storedNames = JSON.parse(localStorage.getItem("selectedExercises"));

        // here you need to make a loop to find the index of item to delete
        var indexToRemove = event.target.parentNode.parentNode.id;
        var indexToRemoveAsNumber = parseInt(indexToRemove);

        //remove item selected, second parameter is the number of items to delete 
        storedNames.splice(indexToRemoveAsNumber, 1);

        // Put the object into storage
        localStorage.setItem('selectedExercises', JSON.stringify(storedNames));
    },
    edit: function (event) {
        event.target.parentNode.querySelectorAll('input').forEach(function (input) {
            input.disabled = false;
        });
    },
    deleteButton: function () {
        document.addEventListener('click', function (event) {
            var id = event.target.parentNode.parentNode.id;
            var idAsNumber = parseInt(id);
            if (event.target.className === "deleteButton") {

                controlExercises.deleteExercise(idAsNumber);


                events.removeLocalStorageValues(event);
            }
           

        })
    },
    save: function (event) {
        var storedNames = JSON.parse(localStorage.getItem("selectedExercises"));
        var position = event.target.parentNode.parentNode.id;
        controlExercises.editExercise(position, event);
        var indexToEditAsNumber = parseInt(position);
        var editedExercise = storedNames[indexToEditAsNumber];
        event.target.parentNode.querySelectorAll('input').forEach(function (input) {
            editedExercise[input.name] = input.value;
            input.disabled = true;


        });
        localStorage.setItem('selectedExercises', JSON.stringify(storedNames));
    },
    datePicker: function () {
        var dateInputValue = document.getElementById('formdate').value;
        var results = exercises.filter(function (singleExercise) {

            return singleExercise.date === dateInputValue;
        });
        view.displayExercises(results);
        // console.log(dateInputValue);
        console.log(results);
    },
    onEnter: function () {
        var dateInput = document.getElementById("formdate");
        dateInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                events.datePicker();
            }
        });
    }
};
events.onEnter();
events.deleteButton();
//view.getDate();
var exercises = JSON.parse(storedExercises) || [];
view.displayExercises();

//events.save(event);
