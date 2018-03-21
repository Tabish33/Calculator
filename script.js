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
                let temp_input = e.target.innerHTML;

                if( temp_input in operations || temp_input == '=' ){
                    display.innerHTML = temp_input;
                    if (temp_input != '=') {
                        if(last_operation){
                          operations[last_operation](+curr_num,+prev_num)
                          prev_num = current_val;
                          curr_num = '';
                          last_operation = temp_input;
                          display.innerHTML = current_val;
                        }
                        else {
                          last_operation = temp_input;
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

                        if (temp_input == 'CE' && curr_num != '') {
                            curr_num = curr_num.slice(0,-1);
                            display.innerHTML = curr_num;
                        }
                        else if( (temp_input!='.'  || curr_num.indexOf('.') == -1 ) && temp_input != 'CE' ){
                            curr_num+= temp_input;
                            display.innerHTML = curr_num;
                        }


                    }
                    else {
                        if (temp_input == 'CE' && curr_num != '' ) {
                            prev_num = prev_num.slice(0,-1);
                            display.innerHTML = prev_num;
                        }
                        else if( (temp_input!='.' || prev_num.indexOf('.') == -1) && temp_input != 'CE' ){
                            prev_num+=temp_input;
                            display.innerHTML = prev_num;
                        }

                    }
                }

      }})
}

input();
clear();

let operations = {"+": (a,b)=> ( current_val =(a+b).toFixed(2)),
                  "-": (a,b)=> ( current_val =(a-b).toFixed(2)),
                  "x": (a,b)=> ( current_val =(a*b).toFixed(2)),
                  "/": (a,b)=> ( current_val =(a/b).toFixed(2)),
                  "%": (a,b)=> ( current_val =(a%b).toFixed(2))
                  }
