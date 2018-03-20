let current_val = 0;

function operate(operator = '+' , val = 0){
    operations[operator](val);
    console.log('current_val =',current_val);
}

function input(){

      let buttons = document.querySelectorAll('.button');
      let number = '';
      let last_operation;

      buttons.forEach(function(button){
            button.onclick = function(e){
                let temp = e.target.innerHTML;
                console.log(temp);
                if(temp in operations || temp == '='){
                    if (temp != '='){
                      operations[temp](+number);
                    }
                    else{
                      operate(operator =last_operation,val = +number);
                    }
                    number = '';   last_operation = temp;
              //      console.log('current_val =',current_val);
                }
                else{number += temp;}
                console.log(number);
            }
      })
}

input();

let operations = {"+": (a)=> ( current_val+=a),
                  "-": (a)=> ( current_val-=a),
                  "*": function(a){if(current_val == 0) current_val = 1; current_val*=a;} ,
                  "/": function(a){if(a == 0) return; current_val/=a;}
                  }
