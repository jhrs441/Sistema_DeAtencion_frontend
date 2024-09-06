const LINK_BASE_FRONTEND = "http://localhost/SistemaDeAtencion_frontend/";
const LINK_BASE_SERVER = "http://localhost/SistemaDeAtencion/";
function link_(dato) {
  switch (dato) {
    case "img_home":
      return LINK_BASE_FRONTEND + "img/";
    case "login":
      return LINK_BASE_SERVER + "login_jwt";

    default:
      break;
  }
}
