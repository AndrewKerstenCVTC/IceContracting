function passing(){  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var usfsaId = document.getElementById("usfsaID").value;
  var coach = document.getElementById("coach").value;
  var clubMember = document.querySelector('input[clubMember="clubMember"]:checked');
  var nonMember = document.querySelector('input[nonMember="nonMember"]:checked');
  window.location.href="schedule.html";

}

function main(){
  
  document.getElementByID("skatercontact").addEventListener("submit", passingSkaterForm);
  
  
  
}

function passingSkaterForm(event){
  event.preventDefault();
  
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var usfsaId = document.getElementById("usfsaID").value;
  var coach = document.getElementById("coach").value;
  var clubMember = document.querySelector('input[clubMember="clubMember"]:checked');
  var nonMember = document.querySelector('input[nonMember="nonMember"]:checked');
  window.location.href="schedule.html";
  
}