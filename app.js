let firstName = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let adress = document.getElementById("adress");
let date = document.getElementById("date");
let maleGender = document.getElementById("gendermale");
let femaleGender = document.getElementById("genderfemale");
let button = document.querySelector("button");
let tbody = document.querySelector(".tbody");
let nameError = document.getElementById("name-error");
let lastNameError = document.getElementById("lastname-error");
let adressError = document.getElementById("adress-error");
let submitError = document.getElementById("submit-error")

let lists = JSON.parse(localStorage.getItem("list")) || [];
newrow();

function validateName(){
    if(firstName.value == 0){
        nameError.innerHTML = "Name is required";
        return false;
    }
    if(!firstName.value.match(/^[a-zA-Z]+$/)){
        nameError.innerHTML = "Write Name: ";
        return false;
    }
    nameError.innerHTML = "Valid";
    return true;
}

function validateLastName(){
    if(lastname.value == 0){
        lastNameError.innerHTML = "Name is required";
        return false;
    }
    if(!lastname.value.match(/^[a-zA-Z]+$/)){
        lastNameError.innerHTML = "Write Last Name: ";
        return false;
    }
    lastNameError.innerHTML = "Valid";
    return true;
}

function validateAdress(){
    if(adress.value == 0){
        adressError.innerHTML = "Name is required";
        return false;
    }
    if(!adress.value.match(/[,#-\/\s\!\@\$.....]/gi)){
        adressError.innerHTML = " Write an Adress: ";
        return false;
    }
    adressError.innerHTML = 'Valid';
    return true;
}

function newrow(){
   
    tbody.innerHTML = "";
   
    lists.map(function(it){

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let tr = document.createElement("tr");
        let btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-danger btn-xs");
        btn.innerHTML = "Remove";
        tr.setAttribute("id", it.id);
        btn.setAttribute("id", it.id);
        td1.innerHTML = it.id;
        td2.innerHTML = it.fname;
        td3.innerHTML = it.lname;
        td4.innerHTML = it.adr;
        td5.innerHTML = it.date;
        td6.innerHTML = it.gender;
    
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(btn);
    
        tbody.appendChild(tr);
    })
}

function addLits(event){

    if(!validateName() || !validateLastName() || !validateAdress()){
        submitError.innerHTML = "Please fir error to submit";
        return false;
    }else{
        let newItem = {
            id: Date.now(),
            fname: firstName.value,
            lname: lastname.value,
            adr: adress.value,
            date: date.value,
            gender: 0 
        }
        
        if(maleGender.checked == true){
            newItem.gender =  maleGender.value;
        } else if(femaleGender.checked == true){
            newItem.gender = femaleGender.value;
        }else{
            newItem.gender =  "not selected";
        }
        
        lists.push(newItem)
        localStorage.setItem('list', JSON.stringify(lists) );
        document.forms[0].reset();
        newrow();
    }
    nameError.innerHTML = "";
    lastNameError.innerHTML = "";
    adressError.innerHTML = "";
    
}

button.addEventListener("click",addLits);

tbody.addEventListener("click",function(event){
    let target = event.target ;
    
    lists.map(function(item){
        if(target.id == item.id){
            target.closest("tr").remove();
            lists.splice(lists.indexOf(item),1);
        }
        if(target.closest("tr").id == item.id && target.tagName != "BUTTON"){
            alert(
            `Information:
            First Name: ${item.fname}
            Last Name: ${item.lname}
            Adress: ${item.adr}
            Date Of Birth: ${item.date}
            Gender: ${item.gender}`
            )
        }
    })

    localStorage.setItem('list', JSON.stringify(lists) );
})






