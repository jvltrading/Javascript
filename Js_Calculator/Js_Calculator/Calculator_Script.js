function myFunction () {

    // Calculator Input Symbol.
    let symbol = prompt('Please enter the symbol to use, eg: (+, -, *, /): ');
    
    //defining variables for calculation.
    let number1 = 0;
    let number2 = 0;

    let numCheck = [0-9];
    let result;
    let display;

    //Verifying correct symbol usage.
    if (symbol != '+' && symbol != '/' && symbol != '*' && symbol != '-') {
        do {
            if (symbol == null) {
                return;
            }
            else {
                symbol = prompt("That seems wrong, please use one of these symbols: (+, -, *, /): ");
            }
        } while(symbol != '+' && symbol != '/' && symbol != '*' && symbol != '-');
    }
    
    //Assigning Input Numbers to calculate. -- struggling to figure out how to break out of loop using the cancel button on the prompt.
    if  (!(number1 = parseFloat(prompt('Please select the first number: ')))) {
        do {
            if (isNaN(number1)){
                number1 = parseFloat(prompt("That's not a number! Please select the first number: "));
            }
        }while (!(number1));
    }
    if (!(number2 = parseFloat(prompt('Please select the second number: ')))) {
        do {
            if (isNaN(number2)) {
                number2 = parseFloat(prompt("That's not a number! Please select the second number: "));
            }
        }while(!(number2));
    }

    //Calculator Operation & operator check. 
    if (symbol == '+') {
        result = number1 + number2;
    }
    else if (symbol == '-') {
        result = number1 - number2;
    }
    else if (symbol == '*') {
        result = number1 * number2;
    }
    else if (symbol == '/') {
        if (number1 == 0 || number2 == 0) {
            result = 0;
        }
        else {
            result = number1 / number2;
        }
    }

    display = `${number1} ${symbol} ${number2} = ${result}`;

    document.getElementById('calc').innerHTML = display;
}