function clearFields() {
  document.getElementById("n1").value = "";
  document.getElementById("n2").value = "";
  document.getElementById("res").value = "";
  document.getElementById("op").value = "select";

  document.getElementById("n1").focus();
}
function cursorLoad() {
  document.getElementById("n1").focus();
}

//the following function can be used for check the empty field validations.

function checkEmptyFields()
{
    if(document.getElementById('n1').value == "")
    {
        alert('Please enter first number.');
        document.getElementById('n1').focus();
    }
    else if(document.getElementById('n2').value == "")
    {
        alert("Please enter second number.");
        document.getElementById('n2').focus();

    }
    else if(document.getElementById('op').value == "select")
    {
        alert("Please select at least one task.");
        document.getElementById('op').focus();
    }

}

function performTask()
{
    checkEmptyFields();
    const num1 = document.getElementById('n1').value;
    const num2 = document.getElementById('n2').value;
    const operation = document.getElementById('op').value;

    try
    {
        switch(operation)
        {
            case '+':
                const result_add = parseInt(num1) + parseInt(num2);
                document.getElementById('res').value = result_add;
                break;
            case '-':
                const result_sub = parseInt(num1) - parseInt(num2);
                document.getElementById('res').value = result_sub;
                break;
            case '*':
                const result_mul = parseInt(num1) * parseInt(num2);
                document.getElementById('res').value = result_mul;
                break;
            case '/':
                const result_div = parseInt(num1) / parseInt(num2);
                document.getElementById('res').value = result_div;
                break;
    
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
}
function disabledButton()
{
    cursorLoad();
    const dotaskBtn = document.getElementById('do_task');
    dotaskBtn.disabled = true;
}
