window.onload = function() {
    var curr_username;
    var curr_password;
    var curr_authenticated;
    /**
    console.log(day);
    console.log(year);
    **/

    function display_balance() {
        document.getElementById('coin-count-text').innerText = this.responseText.balance;
        console.log(this.responseText.balance);
        console.log(this.responseText);
    }





    const verifyPassword = function() {
        if (this.responseText == 'true') {
            curr_username = document.getElementById('username').value;
            curr_password = document.getElementById('password').value;
            curr_authenticated = true;
            update_balance();
            document.getElementById('logged-in-message').innerText = "Hi " + document.getElementById('username').value;
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
        request.open('get', '/login?username=\"' + username + '\"&password=' + password);
        request.send();
    }
    var logout = function() {
        curr_authenticated = false;
        curr_username = null;
        curr_password = null;
        document.getElementById('logged-in-message').innerText = ""
        document.getElementById('login-fields').style.display = "inline-block";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('login-button').onclick = login;
        document.getElementById('login-button').innerText = "Login";
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
        request.open('get', '/get-balance?username=\"' + curr_username + '\"&password=' + curr_password);
        request.send();
    }
};
