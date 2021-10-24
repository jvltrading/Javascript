function myFunction () {

    // Calculator Input Symbol.
    const symbol = prompt('Please Select a symbol to use (eg: /, *, +, -): ');
    
    //defining variables for calculation.
    let number1 = 0;
    let number2 = 0;

    let result;
    let display;

    //Using If statements to sort.
    if (symbol != '+' && symbol != '/' && symbol != '*' && symbol != '-') {
        alert('Error, User has entered an incorrect symbol, please try again');
        location.reload();
    }
    else {
        //Assigning Input Numbers to calculate.
        number1 = parseFloat(prompt('Please select the first number: '));
        number2 = parseFloat(prompt('Please select the second number: '));
    }

    //Check to see operation to complete.
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