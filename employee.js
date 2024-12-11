const createBtn=document.querySelector("#create");
const Model=document.querySelector(".model");
const iconBtn=document.querySelector(".close-icon");
const UpdateiconBtn=document.querySelector(".upcls-icon");
const form=document.querySelector("#addSec");
let tbody=document.querySelector("#RECORD");
let updateModel=document.querySelector("#Updatemodel");
let updateForm=document.querySelector("#updateForm");
let employeeStore={};
let EditingEmpid=null;
let empid=10000;
function generateEmpid(){
    return empid++;
}

function toggleCreate(){
    Model.classList.toggle("hide-model");
    Model.classList.toggle("show-model");
}

iconBtn.addEventListener("click",toggleCreate);
createBtn.addEventListener("click",toggleCreate);

function delterecord(e){
    e.target.parentNode.parentNode.remove();
}

function addrecord(emp){
   let row= document.createElement("tr");
   row.id=emp.id;// for every record the id is going to be unique which is same as employee id which we store
   for(let key in emp){
       let column= document.createElement("td");
       column.innerText=emp[key];
       row.appendChild(column);
    }
    let options=document.createElement("td");
    options.id="IconsAlign";
    let delBtn=document.createElement("img");
    let editBtn=document.createElement("img");
    delBtn.src="delIcon.png";
    delBtn.className="delIcon";
    editBtn.src="editIcon.png";
    editBtn.className="editIcon";
    options.append(editBtn,delBtn);
    row.appendChild(options);
    tbody.appendChild(row);
    delBtn.addEventListener("click",delterecord);
    editBtn.addEventListener("click",editform);
}

function editform(e){
    let record=e.target.parentNode.parentNode;
    let EmpObj=employeeStore[record.id];
    prefillForm(EmpObj)
    toggleUpdate(); 
    EditingEmpid=record.id;console.log(EditingEmpid); 
}
function prefillForm(EmpObj){ 
    for(let key in EmpObj){
        updateForm[key] && (updateForm[key].value = EmpObj[key]);
    }
}
UpdateiconBtn.addEventListener("click",toggleUpdate);
function toggleUpdate(){
    updateModel.classList.toggle("hide-model");
    updateModel.classList.toggle("show-model");
}
updateForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    toggleUpdate();
    let obj={
        id:EditingEmpid,
        name:e.target.name.value,
        email:e.target.email.value,
        doj:e.target.doj.value,
        jobrole:e.target.jobrole.value,
        gender:e.target.gender.value,
    } 
    let record=document.getElementById(obj.id);
    employeeStore[obj.id]=obj;
    let arr=record.children;
    let i=0;
    for(let key in obj){
        arr[i++].innerText=obj[key];
    }
    updateForm.reset();
 })



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let emp={
        id:generateEmpid(),
        name:e.target.name.value,
        email:e.target.email.value,
        doj:e.target.doj.value,
        jobrole:e.target.jobrole.value,
        gender:e.target.gender.value,
    }
    employeeStore[emp.id]=emp;
    toggleCreate();
    addrecord(emp);
})