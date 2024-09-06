monitorTokenActivo();
document.getElementById("logoutBtn").addEventListener("click", function () {
  eliminarTodasLasCookies();
  agregarTarjetas();
  window.location.href = "/SistemaDeAtencion_frontend/"; // Redirige a la página de inicio de sesión
});

document.getElementById("cargar").addEventListener("click", function () {
  agregarTarjetas();
});


async function agregarTarjetas() {
  const contenedor = document.getElementById("contenedor");
  const token = getCookie('token'); // Reemplaza con tu token real

  try {
    const response = await fetch('http://localhost/SistemaDeAtencion/home', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const tarjetasDatos = await response.json();

    tarjetasDatos.forEach((data) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.innerHTML = `
        <img src="${link_('img_home')}${data.imagen}" alt="${data.permission_fullname}">
        <div class="contenido">
          <div class="titulo">${data.permission_fullname}</div>
          <div class="descripcion">${data.descrpcion}</div>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


// Llamar a la función para agregar tarjetas cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", agregarTarjetas);
