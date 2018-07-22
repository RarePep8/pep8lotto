window.onload = function() {
  const date = new Date();

  // 2. format the date to look normal to humans
  const monthIndex = date.getMonth(); // returns month 0-11
  const day = date.getDate();
  const year = date.getYear();
  // we need to create an array of strings for
  // each month name so we can format the entire date nicely
  // so months[0] is 'January' and months[11] is 'December'
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
  const dateElement = document.getElementById('month');
  const dateString = months[monthIndex] + ' ' + day;
  dateElement.innerHTML = dateString;
  /**
  console.log(day);
  console.log(year);
  **/
  const verifyPassword = function() {
    console.log(this.responseText);
    console.log(typeof this.responseText);
    document.getElementById('test-text').innerHTML= this.responseText;
    if(this.responseText == 'true'){
      document.getElementById('test-text').innerHTML="Hi" + document.getElementById('username').value;
      document.getElementById('username').style.display = "none";
      document.getElementById('password').style.display = "none";
      document.getElementById('test-button').onclick = logout;
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
    document.getElementById('username').style.display = "";
    document.getElementById('username').value = "";
    document.getElementById('password').style.display = "";
    document.getElementById('password').value = "";
    document.getElementById('test-button').onclick = login;
  }
  document.getElementById('test-button').onclick = login;
};
