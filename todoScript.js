
let todos = [];

const todoVal = document.querySelector('#todoVal');
const tbody = document.querySelector('.tbody');
let mode = 'CREATE';
let currentIndex;

const submitBtn = document.querySelector('.btn');

const alert = document.querySelector('.alert');
let alertType = 'NEW';

const clearAllBtn = document.querySelector('#clearAll');

// for validation
let specChars = /['!,@,#,$,%,^,&,*,(,),_,+,{,},;,:,",<,>,?,~']/;

// function to save todos in array
function saveTodos(e) {
    e.preventDefault();
    
    if (todoVal.value == '' || specChars.test(todoVal.value) || !isNaN(todoVal.value)) {
        return showAlert("in valid input");
    }

    const value = todoVal.value;

    // push value in array(storage)
    if (mode == 'CREATE') {
        todos.push(value);
        // update UI
        showTodos();
        showAlert("NEW");

        clearAllBtn.disabled = false;
    } else {
        todos[currentIndex] = value;
        mode = 'CREATE';

        submitBtn.innerText = 'Submit';
        // update UI
        showTodos();
        showAlert("EDIT");
    }


    form.reset();
}

// function to show todos on UI
function showTodos() {

    tbody.innerHTML = '';

    todos.forEach((todo, index) => {

        // make a ROW
        const tr = document.createElement('tr');

        // make a TD
        const td = document.createElement('td');
        td.classList.add('todo');
        td.innerText = `${todo}`;

        // make a TH for edit and del
        const th = document.createElement('th');

        const delBtn = document.createElement('button');
        delBtn.classList.add('del');
        delBtn.innerText = 'delete';

// ----- delete button functionality ----
        delBtn.onclick = (e) => {
            todos.splice(index, 1);
            showTodos();
            showAlert("DEL");

            // see function definition to see its use
            resetMode();
        }

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        editBtn.innerText = 'edit';

// ----- edit button functionality ----
        editBtn.onclick = () => {

            currentIndex = index;
            mode = 'EDIT';

            todoVal.value = todo;
            todoVal.focus();
            submitBtn.innerText = 'EDIT';
        }


        th.append(editBtn, delBtn);

        tr.append(td, th);

        tbody.append(tr);
    })
}


function clearAll() {

    todos = [];
    clearAllBtn.disabled = true;
    showTodos();
    showAlert("REMOVE ALL")
}


function showAlert(type) {

    switch (type) {
        case "NEW":
            alert.innerText = 'New todo created';
            alert.classList.add('showAlert');
            break;
        case "EDIT":
            alert.innerText = 'Todo Updated';
            alert.classList.add('showAlert');
            break;
        case "DEL":
            alert.innerText = 'Todo Deleted';
            alert.classList.add('showAlert');
            break;
        case "REMOVE ALL":
            alert.innerText = 'All todos Removed';
            alert.classList.add('showAlert');
            break;
        case "in valid input":
            alert.innerText = 'please enter correct value';
            alert.classList.add('showAlert');
            break;
        default:
            break;
    }

    setTimeout(() => {
        alert.classList.remove('showAlert');
    }, 1000);
}


// for the problem if user first clicks on editBtn,the mode changes to edit and then he clicks on delete. the problem is button remains is in edit mode.
function resetMode() {
    submitBtn.innerText = 'Submit';
    mode = "CREATE";
    form.reset();
}