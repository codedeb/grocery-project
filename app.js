// ****** SELECT ITEMS **********

let alert = document.querySelector('.alert')
let form = document.querySelector('.grocery-from')
let grocery = document.querySelector('#grocery')
let submitBtn = document.querySelector('.submit-btn')
let container = document.querySelector('.grocery-container')
let list = document.querySelector('.grocery-list')
let clearBtn = document.querySelector('.clear-btn')
// console.log(clearBtn)

// edit option

let editElement;
let editFlag = false;
let editId = '';

// ****** EVENT LISTENERS **********

// submit form
form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)

// ****** FUNCTIONS **********

// add items
function addItem(e){
    e.preventDefault();
    let value = grocery.value
    let id = new Date().getTime().toString();
    if (value && !editFlag){
        let element = document.createElement('article')
        element.classList.add('grocery-item')
        let attr = document.createAttribute('data-id')
        attr.value=id
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                <i class="far fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                <i class="fas fa-trash-alt"></i>
                </button>
            </div>`;

        let editBtn = element.querySelector(".edit-btn")
        let deleteBtn = element.querySelector(".delete-btn")

        editBtn.addEventListener('click', editItem)
        deleteBtn.addEventListener('click', deleteItem)
        


        list.appendChild(element);
        displayAlert('Item added', 'success')
        container.classList.add('show-container')
        setBackToDefault();
    }
    else if (value && editFlag){
        editElement.innerHTML = value;
        displayAlert('value changed...', 'success')
        setBackToDefault();
    }
    else{
        displayAlert('Please enter Item', 'danger');
    }
}

// clear items******************************


function clearItems(){
    let items = document.querySelectorAll('.grocery-item')
    items.forEach(function(item){
        list.removeChild(item)
        displayAlert('Items cleared', 'danger')
        container.classList.remove('show-container')
        setBackToDefault();
        
    })
}


function editItem(e){
    let element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement)
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';

}

function deleteItem(e){

    let element = e.currentTarget.parentElement.parentElement
    list.removeChild(element)
    displayAlert(`item removed`, 'danger')
    if (list.childElementCount <=  0){
        container.classList.remove('show-container')
    }

}


function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}

// display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    // remove alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`)

    }
    , 1500)
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********


