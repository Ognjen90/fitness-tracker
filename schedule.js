console.log('radi');
var exercises = [];
console.log(exercises.length);
var storedExercises = localStorage.getItem('selectedExercises');
exercises = JSON.parse(storedExercises);

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
    },
    deleteExercise: function (position) {
        exercises.splice(position, 1);
        view.displayExercises();
    },
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
    createExerciseForm: function (name, type, id) {
        var form = document.createElement('form');
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

        li.appendChild(this.createExerciseForm(exercises[position].name, exercises[position].type.typeNumber, exercises[position].type.id));


        li.style.display = 'flex';
        return li;
    },
    displayExercises: function () {
        //var form = this.createExerciseForm(exercises,position);
        var ul = document.querySelector("ul");
        //var form = this.createExerciseForm();
        // form.appendChild(ul);
        ul.innerHTML = "";
        if (exercises.length === 0) {
            ul.innerHTML = "nema programa";
        } else {
            for (var i = 0; i < exercises.length; i++) {

                ul.appendChild(this.createExerciseLi(exercises, i));
                //  console.log(ul);
            }
        }
    },
};

var events = {
    edit: function (event) {
        event.target.parentNode.querySelectorAll('input').forEach(function (input) {
            input.disabled = false;
        });
    },
    deleteButton: function(){
        document.addEventListener('click',function (event){
            var id = event.target.parentNode.parentNode.id;
            var idAsNumber = parseInt(id);
            if(event.target.className === "deleteButton") {

                // var form  = document.querySelector('ul').childNodes;
                // console.log(form);
                // var id = event.target.parentNode.id;
                 //console.log(id);
                // for(var i = 0;i <= form.length;i++){
                    controlExercises.deleteExercise(idAsNumber);
                // }

                
               
            }
        })
    },
    save: function (event) {
        var position = event.target.parentNode.parentNode.id;
        controlExercises.editExercise(position, event);
        event.target.parentNode.querySelectorAll('input').forEach(function (input) {
            input.disabled = true;
        });
    }
};

view.displayExercises();
events.deleteButton();
