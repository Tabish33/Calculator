let current_val = 0;
let last_operation;  let start = '';
let prev_num ='' ; let curr_num ='';
let audio = document.querySelector('.click');
audio.currentTime = 0;

function operate(p_num, c_num, operator){
    operations[operator](p_num,c_num);
}

function clear(){

      let clear = document.querySelector('.clear');
      let display = document.querySelector('.screen');

      clear.onclick = function(){
          audio.play();
          current_val = 0;
          last_operation;  start = '';
          prev_num ='' ; curr_num ='';
          display.innerHTML = current_val;
      }
}

function input(){

      let buttons = document.querySelectorAll('.button');
      let display = document.querySelector('.screen');

      buttons.forEach(function(button){
            button.onclick = function(e){
                audio.play();
                let temp = e.target.innerHTML;
                display.innerHTML = temp;

                if( temp in operations || temp == '=' ){
                    if (temp != '=') {
                        if(last_operation){
                          operations[last_operation](+curr_num,+prev_num)
                          prev_num = current_val;
                          curr_num = '';
                          last_operation = temp;
                          display.innerHTML = current_val;
                        }
                        else {
                          last_operation = temp;
                          start= 'start';
                        }
                    }
                    else {

                        if(!last_operation) {             // use of '=' without prev_num or last_operation
                            display.innerHTML = current_val;                            // initialization
                          }
                        else{
                            operate(+prev_num,+curr_num,last_operation)
                            prev_num = current_val;
                            curr_num = '';
                            last_operation = '';
                            display.innerHTML = current_val;
                         }
                    }
                }
                else {
                    if (start) {
                      curr_num+= temp;
                      display.innerHTML = curr_num;

                    }
                    else {
                      prev_num+=temp;
                      display.innerHTML = prev_num;
                    }
                }

      }})
}

input();
clear();

let operations = {"+": (a,b)=> ( current_val =a+b),
                  "-": (a,b)=> ( current_val =a-b),
                  "x": function(a,b){if(current_val == 0){ current_val = 1;}; current_val =a*b;} ,
                  "/": function(a,b){if(a == 0) return; current_val=a/b;}
                  }
