document.addEventListener("DOMContentLoaded", function() {
  function clearFields() {
      document.getElementById("name").value = "";
      document.getElementById("class1").value = "";
      document.getElementById("math").value = "";
      document.getElementById("chem").value = "";
      document.getElementById("phy").value = "";
      document.getElementById("name").focus();
  }

  function loadCursor() {
      document.getElementById("name").focus();
  }

  function checkEmptyFields() {
      if (document.getElementById("name").value === "") {
          alert("Please enter student Name");
          document.getElementById("name").focus();
          return false;
      } else if (document.getElementById("class1").value === "") {
          alert("Please enter student class");
          document.getElementById("class1").focus();
          return false;
      } else if (document.getElementById("chem").value === "") {
          alert("Please enter chemistry marks");
          document.getElementById("chem").focus();
          return false;
      } else if (document.getElementById("math").value === "") {
          alert("Please enter math marks");
          document.getElementById("math").focus();
          return false;
      } else if (document.getElementById("phy").value === "") {
          alert("Please enter physics marks");
          document.getElementById("phy").focus();
          return false;
      }
      return true;
  }

  function calculateGrade() {
      if (!checkEmptyFields()) {
          return;
      }

      const math = document.getElementById('math').value;
      const chem = document.getElementById('chem').value;
      const phy = document.getElementById('phy').value;

      const totalScore = parseInt(math) + parseInt(chem) + parseInt(phy);
      const avgScore = parseFloat(totalScore) / 3;

      let message;
      if (avgScore >= 90 && avgScore <= 100) {
          message = "Congratulations, you passed!";
      } else if (avgScore >= 60 && avgScore <= 89) {
          message = "Congratulations, you passed!";
      } else if (avgScore >= 35 && avgScore <= 59) {
          message = "Congratulations, you passed!";
      } else {
          message = "Try next time ...";
      }

      document.querySelector('.result-div').style.display = "block";
      
      const resultLabel = document.getElementById('pass-fail');
      resultLabel.style.color = "white";
      resultLabel.textContent = `${message}`;

      const totalLabel = document.getElementById('total-score');
      totalLabel.style.color = "white";
      totalLabel.textContent = `Total Score: ${totalScore}`;

      const avgLabel = document.getElementById('average-grade');
      avgLabel.style.color = "white";
      avgLabel.textContent = `Average Score: ${avgScore}`;
  }

  // Expose the functions to the global scope
  window.clearFields = clearFields;
  window.loadCursor = loadCursor;
  window.calculateGrade = calculateGrade;
});
