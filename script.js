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

      window.addEventListener('keydown', function(e){
          if (e.key == 'c' || e.key == 'C' ){
              audio.play();
              current_val = 0;
              last_operation;  start = '';
              prev_num ='' ; curr_num ='';
              display.innerHTML = current_val;
          }
      })
}

function mouseInput(){

      let buttons = document.querySelectorAll('.button');
      let display = document.querySelector('.screen');

      buttons.forEach(function(button){
            button.onclick = function(e){
                audio.play();
                let temp_input = e.target.innerHTML;

                if( temp_input in operations && prev_num!= '' ) {  //prev_num check for alowing negative number input
                    display.innerHTML = temp_input;                //negative number input
                    if (temp_input != '=') {
                        if(last_operation){
                            if (curr_num == "") {
                                last_operation = temp_input
                                display.innerHTML = last_operation;// for operation change
                            }
                            else{
                                operations[last_operation](+curr_num,+prev_num)
                                prev_num = current_val;
                                curr_num = '';
                                last_operation = temp_input;
                                display.innerHTML = current_val;
                            }
                        }
                        else {
                          last_operation = temp_input;
                          if (prev_num != ''){              // prev_num needs to be set up
                              start= 'start';               //before curr_num for chain operations
                          }
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

                        if (temp_input == '🡐' && prev_num != '') {
                            if(last_operation in operations) last_operation="";
                            curr_num = curr_num.slice(0,-1);
                            display.innerHTML = prev_num;

                        }
                        else if( (temp_input!='.'  || curr_num.indexOf('.') == -1 ) && temp_input != '🡐' ){
                            curr_num+= temp_input;
                            display.innerHTML = curr_num;
                        }


                    }
                    else {
                        if (temp_input == '🡐' ) {
                            if(last_operation in operations) last_operation="";
                            prev_num = prev_num.slice(0,-1);
                            display.innerHTML = prev_num;
                        }
                        else if( (temp_input!='.' || prev_num.indexOf('.') == -1) && temp_input != '🡐' ){
                            prev_num+=temp_input;
                            display.innerHTML = prev_num;
                        }

                    }
                }

      }})
}

function keyBoardInput(){

  let display = document.querySelector('.screen');
  let digits = "1 2 3 4 5 6 7 8 9 + -";

  window.addEventListener('keydown', function(e){
            let temp_input = e.key ;

            if( temp_input in operations  && prev_num!= '' ){
                audio.play();
                display.innerHTML = temp_input;
                if (temp_input != 'Enter') {
                    if(last_operation){
                          if (curr_num == "") {           // for operation change
                            last_operation = temp_input
                            display.innerHTML = last_operation;
                          }
                          else{
                            operations[last_operation](+curr_num,+prev_num)
                            prev_num = current_val;
                            curr_num = '';
                            last_operation = temp_input;
                            display.innerHTML = current_val;
                          }
                    }
                    else {
                      last_operation = temp_input;
                      if (prev_num != ''){              // prev_num needs to be set up
                          start= 'start';               //before curr_num for chain operations
                      }
                    }
                }
                else {

                    if(!last_operation) {             // use of 'Enter' without prev_num or last_operation
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

                    if (temp_input == 'Backspace' && curr_num != '') {
                        audio.play();
                        if(last_operation in operations) last_operation="";
                        curr_num = curr_num.slice(0,-1);
                        display.innerHTML = curr_num;
                    }
                    else if( temp_input!='.'  || curr_num.indexOf('.') == -1 ){
                        if(digits.indexOf(temp_input) != -1){
                          audio.play();
                          curr_num+= temp_input;
                          display.innerHTML = curr_num;
                        }
                    }


                }
                else {
                    if (temp_input == 'Backspace') {
                        audio.play();
                        if(last_operation in operations) last_operation="";
                        prev_num = prev_num.slice(0,-1);
                        display.innerHTML = prev_num;
                    }
                    else if( temp_input!='.' || prev_num.indexOf('.') == -1 ){
                        if(digits.indexOf(temp_input) != -1){
                          audio.play();
                          prev_num+= temp_input;
                          display.innerHTML = prev_num;
                        }
                    }

                }
            }

  })
}
mouseInput();
clear();
keyBoardInput();

let operations = {"+": (a,b)=> ( current_val =(a+b).toFixed(2)),
                  "-": (a,b)=> ( current_val =(a-b).toFixed(2)),
                  "x": (a,b)=> ( current_val =(a*b).toFixed(2)),
                  "/": (a,b)=> ( current_val =(a/b).toFixed(2)),
                  "%": (a,b)=> ( current_val =(a%b).toFixed(2)),
                  "=": null,
                  "Enter" : null
                  }
