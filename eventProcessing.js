function main(){
//hiding all but the first div
  document.getElementById("IceTimeContractECFSCMember").style.display = 'none';
  document.getElementById("IceTimeTitle").style.display = 'none';
  //setting up event handlers
  
  //first form
  document.getElementById("skater_info_form").addEventListener("submit", processFirstForm);
  
  //second form
  document.getElementById("IceTimeContractECFSCMember_form").addEventListener("submit", processSecondForm);
  

}


function processFirstForm(event){
  event.preventDefault();

  var skaterName = document.getElementById("skaterName").value;
  var homePhone = document.getElementById("homePhone").value;
  var USFSA = document.getElementById("USFSA").value;
  var parentEmailAddress = document.getElementById("parentEmailAddress").value;
  var skaterCoach = document.getElementById("skaterCoach").value;
  var coachEmailAddress = document.getElementById("coachEmailAddress").value;
  var memberType;
  var clubMember = document.querySelector('input[clubMember="clubMember"]:checked');
  var otherMemeber = document.querySelector('input[otherMember="otherMember"]:checked');

  //hide first form
  document.getElementById("skaterInfo").style.display = 'none';

  //display second form
  document.getElementById("IceTimeContractECFSCMember").style.display = 'block';

}

function processSecondForm(event){
  event.preventDefault();

  document.getElementById("skaterInfo").style.display = 'none';

  //display second form
  document.getElementById("IceTimeContractECFSCMember").style.display = 'block';

  //process second form
  var freeSelected = document.querySelectorAll('input[name =freestyle]:checked');
  var freeCount = freeSelected.length;
  var freeTotal = 0;
  var movesSelected = document.querySelectorAll('input[name = moves]:checked');
  var movesCount = freeSelected.length;
  var movesTotal = 0;
  var skaterName = document.getElementById("skaterName").value;
  var total = 0;
  var output;
  
  //freeCount = Number(freeSelected.length);
  //movesCount = Number(movesCount.length);
    
    //determine member type then figure out session costs based on member type
    if ("clubMember"){
      movesTotal = movesCount * 6.50;
      freeTotal = freeCount * 11.50;  
    }else if ("otherMember"){
      movesTotal = movesCount * 7;
      freeTotal = freeCount * 13;
    }else{
      alert("You did not enter a Member Type");
    }
     total= freeTotal + movesTotal;
     output = ("Skater Name: " + skaterName + "<br>" + "Moves Total: " + movesCount + "<br>" + "Moves Total Owed: $" + movesTotal + "<br>" +
                    "Freestyle Total: " + freeCount + "<br>" + "Freestyle Total Owed: $" + freeTotal + "<br>" +
                    "Overall Total Owed: $" + total + "<br>" +
                    "Payment is due to Steve Southworth by due date on bill received via email." + "<br>" + 
                    "Please make checks payable to ECFSC.");
    //display what the family owes and how many sessions they are contracted for.
    document.write(output);
}

main();