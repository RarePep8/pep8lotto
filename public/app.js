window.onload = function() {
  /**
  console.log(day);
  console.log(year);
  **/
  const verifyPassword = function() {
    console.log(this.responseText);
    console.log(typeof this.responseText);
    document.getElementById('test-text').innerHTML= this.responseText;
    if(this.responseText == 'true'){
      document.getElementById('test-text').innerHTML="Hi " + document.getElementById('username').value;
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
    document.getElementById('login-fields').style.display = "";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('test-button').onclick = login;
    document.getElementById('test-button').innerText = "login";
  }
  document.getElementById('test-button').onclick = login;
};
