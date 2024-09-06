// Función para establecer una cookie
function setCookie(name, value, seconds) {
  let expires = "";
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Función para obtener una cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Función para borrar una cookie
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

function eliminarTodasLasCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var nombre = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

    // Intenta eliminar la cookie en diferentes rutas comunes
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/path1;";
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/path2;";
    // Agrega más rutas según sea necesario
  }
}

// Función para decodificar el payload de un JWT
function getJwtPayload(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

// Función para monitorear el token y verificar su expiración
function monitorTokenActivo() {
  const checkInterval = 3000; // Verificación cada 3 segundos

  setInterval(() => {
    const token = getCookie("token");

    if (token) {
      const payload = getJwtPayload(token);
      const expirationTime = payload.exp * 1000; // Expiración en milisegundos
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        console.log("Token ha expirado. Cerrando sesión.");
        logout();
      } else {
        console.log("Token activo");
      }
    } else {
      console.log("Token no encontrado. Cerrando sesión.");
      logout();
    }
  }, checkInterval);
}

// Función para cerrar sesión
function logout() {
  eliminarTodasLasCookies();
  window.location.href = "/SistemaDeAtencion_frontend/";
}

// Función para monitorear si el usuario ya ha iniciado sesión
function monitorTokenExistence_login() {
  const checkInterval = 1000; // Verificación cada 1 segundo
  let intervalId;

  intervalId = setInterval(() => {
    const token = getCookie("token");

    if (token) {
      console.log("Verificando login");
      clearInterval(intervalId); // Detener el bucle de verificación
      window.location.href = "public/home.html";
    }
  }, checkInterval);
}

