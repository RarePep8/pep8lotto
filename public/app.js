window.onload = function() {
  var currUsername;
  var currPassword;
  var currAuthenticated;
  /**
  console.log(day);
  console.log(year);
  **/

  function display_balance() {
    var obj = JSON.parse(this.responseText);
    document.getElementById('coin-count-text').innerText = obj.balance;
    document.getElementById('coin-count-text').style.display = "inline-block";
    document.getElementById('pep8coin-count').style.display = "inline-block";
    console.log(obj.balance);
    console.log(this.responseText);
  }



  const verifyPassword = function() {
    if (this.responseText == 'true') {
      currUsername = document.getElementById('username').value;
      currPassword = document.getElementById('password').value;
      currAuthenticated = true;
      document.getElementById('logged-in-message').innerText = "Hi " +
        currUsername;
      document.getElementById('login-fields').style.display = "none";
      document.getElementById('login-button').onclick = logout;
      document.getElementById('login-button').innerText = "Logout";
      update_balance();
    }

  }
  var login = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const request = new XMLHttpRequest();
    request.addEventListener('load', verifyPassword);
    request.open('get', '/login?username=\"' + username + '\"&password=' +
      password);
    request.send();
  }
  var logout = function() {
    currAuthenticated = false;
    currUsername = null;
    currPassword = null;
    document.getElementById('logged-in-message').innerText = ""
    document.getElementById('login-fields').style.display = "inline-block";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('login-button').onclick = login;
    document.getElementById('login-button').innerText = "Login";
    document.getElementById('coin-count-text').style.display = "none";
    document.getElementById('pep8coin-count').style.display = "none";
  }
  console.log("yeet");
  document.getElementById('login-button').onclick = login;


  var username_input = document.getElementById('username');
  var password_input = document.getElementById('password');

  function enter_press_login(event) {
    console.log("yah yeet");
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("login-button").click();
    }
  }
  // Execute a function when the user releases a key on the keyboard
  username_input.addEventListener("keyup", function(event) {
    enter_press_login(event);
  });
  password_input.addEventListener("keyup", function(event) {
    enter_press_login(event);
  });

  // Query user balance constantly
  function update_balance() {
    const request = new XMLHttpRequest();
    request.addEventListener('load', display_balance);
    request.open('get', '/get-balance?username=\"' + currUsername +
      '\"&password=' + currPassword);
    request.send();
  }

  function earn() {
    const request = new XMLHttpRequest();
    request.addEventListener('load', update_balance);
    request.open('get', '/earn?username=\"' + currUsername + '\"&password=' +
      currPassword);
    request.send();
  }

  function update_inventory() {
    console.log(this.responseText);
  }

  function openBasic() {
    if (currAuthenticated) {
      const request = new XMLHttpRequest();
      request.addEventListener('load', update_inventory);
      request.open('get', '/open-basic?username=\"' + currUsername +
        '\"&password=' + currPassword);
      request.send();
    }
  }

  function showCasesPage() {
    document.getElementById('inventory-region').style.display = "none";
    document.getElementById('cases-region').style.display = "inline-block";
  }

  function showInventory() {
    showInventoryPage();
    fetchInventoryItems();
  }

  function showInventoryPage() {
    document.getElementById('inventory-region').style.display =
      "inline-block";
    document.getElementById('cases-region').style.display = "none";
  }

  function fetchInventoryItems() {
    if (currAuthenticated) {
      const request = new XMLHttpRequest();
      request.addEventListener('load', showInventoryItems);
      request.open('get', '/inventory?username=\"' + currUsername +
        '\"&password=' + currPassword);
      request.send();
    }

    function showInventoryItems() {
      console.log(this.responseText);
    }
  }
  document.getElementById('doubleup').onclick = earn;
  document.getElementById('buy-basic-button').onclick = openBasic;
  document.getElementById('pills-cases').onclick = showCasesPage;
  document.getElementById('pills-inventory').onclick = showInventory;
};
