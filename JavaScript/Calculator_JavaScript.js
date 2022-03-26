// creates an object to keep track of values

const Calculator = {
    Display_Value: '0', //displays "0" on screen
    First_Operand: null,//this will hold the first operand and is set to "null" for now. 
    Wait_Second_Operand: false,//this checks whether the second operand has been input.
    operator: null, //this will hold the operator, and is set to "null" for now. 
};

//This modifies values each time a button is clicked

function Input_Digit(digit){
    const {Display_Value, Wait_Second_Operand} = Calculator;

    //checking to see if Wait_Second_Operand is true and set Display_Value to the key that was clicked. 

    if (Wait_Second_Operand===true){ // if second operand has been entered do following instructions:
        Calculator.Display_Value = digit; //display on the calculator the digit that was input
        Calculator.Wait_Second_Operand = false; //set the Wait_Second_Operand to "false"

    //this overwrites Display_Value if current value is "0" otherwise it adds on to it. 
    }else{
        Calculator.Display_Value=Display_Value==='0' ? digit: Display_Value + digit;
    }
}

//This handles decimal points. 

function Input_Decimal(dot){
//this ensures that accidental clicking on the decimal point button doesn't cause bugs in the operation

    if(Calculator.Wait_Second_Operand ===true) return; // if the second operand has been entered
    if(!Calculator.Display_Value.includes(dot)){ //if the "Display_Value" does not include a decimal point
        Calculator.Display_Value += dot //we add it (using this instruction)
    }
}

// This handles operators.

function Handle_Operator(Next_Operator){
    const {First_Operand, Display_Value, operator} = Calculator

    //when an operator key is pressed, we convert the current number displayed on the screen to a number,
    //and then store the result in the Calculator.First_Operand key.


    const Value_of_Input = parseFloat(Display_Value); //This function determines if the first character in the specified string is a number. 
    //If it is, it parses the string until it reaches the end of the number, and returns the number as a number, not as a string.

    if (operator && Calculator.Wait_Second_Operand){ //if "operator" exists and "Wait_Second_Operand" is true go to next instruction below
        Calculator.operator = Next_Operator; // make the calculator operator equal Next_Operator.
        return; //returns a value from the function. 
    }

    if (First_Operand==null){ //if the person hasn't input any value
        Calculator.First_Operand=Value_of_Input;//make the "First_Operand" equal to the "Value_of_Input"

    } else if (operator){ //checks if "operator" exists do the following instructions:

        const Value_Now = First_Operand ||0;//assigns a constant called "Value_Now" equal to the ***
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
        result= Number(result).toFixed(9) //the result will be displayed with  9 digits after the decimal point. 
        result=(result*1).toString()//(result*1) removes trailing 0s (these are a sequence of zeros after which no other digit follows)
        // "toString"  converts a number to a string value
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator= Next_Operator;
}

const Perform_Calculation ={
    '/': (First_Operand, Second_Operand) => First_Operand/Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand*Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand+Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand-Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset(){ //resets the calculator ready for use again
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

// this function updates the screen with the contents "Display_Value"
function Update_Display(){ // giving a definition for the "Update_Display" function
    const display = document.querySelector('.calculator-screen'); //the constant "display" equals the html element called "calculator-screen"
    display.value = Calculator.Display_Value; //display the calculator display value to the html element. 
}

Update_Display(); //this calls the function above

//this section monitors button clicks

const keys = document.querySelector('.calculator-keys'); //declaring a constant called "keys" which equals the html document element called 
//"calculator-keys"
keys.addEventListener('click', (event) => { //defining a function called "addEventListener"
    const{target}= event; //target variable is an object that represents the number that was clicked.

    if(!target.matches('button')){ //if the target that was clicked on is not a button, exit function
        return
    }

if (target.classList.contains('operator')){
    Handle_Operator(target.value);
    Update_Display();
    return;
}

if (target.classList.contains('decimal')){
    Input_Decimal(target.value);
    Update_Display();
    return;
}

if (target.classList.contains('all-clear')){ //if key pressed was AC (classList property is used to return the class attribute in the element that 
    // containes 'all-clear)
    Calculator_Reset(); //call the Calculator_Reset function.
    Update_Display(); // call the Update_Display function
    return //return the value
}
Input_Digit(target.value); //calling the Input_Digit function with parameter called "target.value"
Update_Display(); //calling the update_Display function
})