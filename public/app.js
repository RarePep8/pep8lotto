window.onload = function() {
  /**
  console.log(day);
  console.log(year);
  **/


  var username_input = document.getElementById('username');
  var password_input = document.getElementById('password');
  var enter_press_login = function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("login-button").click();
    }
  };
  // Execute a function when the user releases a key on the keyboard
  username_input.addEventListener("keyup", enter_press_login(event));
  password_input.addEventListener("keyup", enter_press_login(event));





  const verifyPassword = function() {
    if(this.responseText == 'true'){
      document.getElementById('logged-in-message').innerText="Hi " + document.getElementById('username').value;
      document.getElementById('login-fields').style.display = "none";
      document.getElementById('login-button').onclick = logout;
      document.getElementById('login-button').innerText = "Logout";
    }

  }
  var login = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const request = new XMLHttpRequest();
    request.addEventListener('load', verifyPassword);
    request.open('get','/login?username=\"' + username + '\"&password=' + password);
    request.send();
  }
  var logout = function() {
    document.getElementById('logged-in-message').innerText=""
    document.getElementById('login-fields').style.display = "inline-block";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('login-button').onclick = login;
    document.getElementById('login-button').innerText = "Login";
  }
  console.log("yeet");
  document.getElementById('login-button').onclick = login;
};
