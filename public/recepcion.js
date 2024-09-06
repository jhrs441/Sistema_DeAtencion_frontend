monitorTokenActivo();
document.getElementById("logoutBtn").addEventListener("click", function () {
  eliminarTodasLasCookies();
  window.location.href = "/SistemaDeAtencion_frontend/"; // Redirige a la página de inicio de sesión
});
