window.onload = function() {
  /**
  console.log(day);
  console.log(year);
  **/
  const verifyPassword = function() {
    if(this.responseText == 'true'){
      document.getElementById('logged-in-message').innerText="Hi " + document.getElementById('username').value;
      document.getElementById('login-fields').style.display = "none";
      document.getElementById('test-button').onclick = logout;
      document.getElementById('test-button').innerText = "logout";
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
    document.getElementById('logged-in-message').innerText="Steam Login"
    document.getElementById('login-fields').style.display = "inline-block";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('login-button').onclick = login;
    document.getElementById('login-button').innerText = "login";
  }
  document.getElementById('login-button').onclick = login;
};
