let count = 0;

function increment() {
    count++;
    document.getElementById("count").innerText = count;
}

function decrement() {
    count--;
    document.getElementById("count").innerText = count;
}

function reset() {
    count = 0;
    document.getElementById("count").innerText = count;
}

function register() {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;   
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log("First Name:", firstname);
    console.log("Last Name:", lastname);
    console.log("Email:", email);
    console.log("Password:", password);
    document.getElementById("registerForm");

    alert("Registration successful!");
}