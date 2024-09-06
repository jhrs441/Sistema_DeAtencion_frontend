
monitorTokenExistence_login()

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(link_('login'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          console.log("Inicio de sesión exitoso. Token: " + data.token);
          setCookie("token", data.token, data.user.token_expiration);
          //localStorage.setItem('token', data.token);
          //const gettoken = getCookie("token");
          //console.log(gettoken + "datos");
          window.location.href = "public/home.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
