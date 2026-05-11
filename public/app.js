let usuarioActual = "visitante";

// MOSTRAR SECCIONES
function mostrarSeccion(id){

  const secciones =
  document.querySelectorAll(".seccion");

  secciones.forEach(sec => {

    sec.classList.remove("activa");

  });

  document
  .getElementById(id)
  .classList.add("activa");
}

// LOGIN
function mostrarLogin(){

  document
  .getElementById("login")
  .classList.remove("oculto");
}

// CERRAR LOGIN
function cerrarLogin(){

  document
  .getElementById("login")
  .classList.add("oculto");
}

// ENTRAR
function entrar(){

  const tipo =
  document.getElementById("tipoUsuario").value;

  const pass =
  document.getElementById("password").value;

  // VISITANTE
  if(tipo === "visitante"){

    usuarioActual = "visitante";

    alert("Entraste como visitante");

    cerrarLogin();

    return;
  }

  // REGISTRADOR
  if(tipo === "registro"){

    if(pass === "lavanda123"){

      usuarioActual = "registro";

      alert("Bienvenido registrador");

      mostrarSeccion("panelRegistro");

      cerrarLogin();

    }else{

      alert("Contraseña incorrecta");
    }

  }

  // ADMIN
  if(tipo === "admin"){

    if(pass === "admin123"){

      usuarioActual = "admin";

      alert("Bienvenido administrador");

      mostrarSeccion("panelRegistro");

      cerrarLogin();

    }else{

      alert("Contraseña incorrecta");
    }

  }

}

// CREAR REGISTRO
function crearRegistro(){

  const alumno =
  document.getElementById("alumno").value;

  const altura =
  document.getElementById("altura").value;

  const fecha =
  document.getElementById("fecha").value;

  const imagen =
  document.getElementById("imagenRegistro").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${alumno}</h2>

        <p>🌱 Altura: ${altura} cm</p>

        <p>📅 Fecha: ${fecha}</p>

        <img src="${e.target.result}">

        <div class="comentarios">

          <input
          type="text"
          placeholder="Escribe un comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaRegistros")
    .innerHTML += html;
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR ARTICULO
function crearArticulo(){

  const titulo =
  document.getElementById("tituloArticulo").value;

  const contenido =
  document.getElementById("contenidoArticulo").value;

  const imagen =
  document.getElementById("imagenArticulo").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${titulo}</h2>

        <p>${contenido}</p>

        <img src="${e.target.result}">

        <div class="comentarios">

          <input
          type="text"
          placeholder="Escribe un comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaArticulos")
    .innerHTML += html;
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR DIAGRAMA
function crearDiagrama(){

  const titulo =
  document.getElementById("tituloDiagrama").value;

  const imagen =
  document.getElementById("imagenDiagrama").files[0];

  const lector = new FileReader();

  lector.onload = function(e){

    const html = `

      <div class="card">

        <h2>${titulo}</h2>

        <img src="${e.target.result}">

        <div class="comentarios">

          <input
          type="text"
          placeholder="Escribe un comentario"
          onkeypress="agregarComentario(event,this)">

          <div class="listaComentarios"></div>

        </div>

      </div>

    `;

    document
    .getElementById("listaDiagramas")
    .innerHTML += html;
  }

  if(imagen){

    lector.readAsDataURL(imagen);
  }

}

// CREAR TUTORIAL
function crearTutorial(){

  const titulo =
  document.getElementById("tituloTutorial").value;

  const link =
  document.getElementById("linkTutorial").value;

  const html = `

    <div class="card">

      <h2>${titulo}</h2>

      <a href="${link}" target="_blank">

        Ver Tutorial

      </a>

      <div class="comentarios">

        <input
        type="text"
        placeholder="Escribe un comentario"
        onkeypress="agregarComentario(event,this)">

        <div class="listaComentarios"></div>

      </div>

    </div>

  `;

  document
  .getElementById("listaTutoriales")
  .innerHTML += html;
}

// COMENTARIOS
function agregarComentario(event,input){

  if(event.key === "Enter"){

    const texto = input.value;

    const lista =
    input.parentElement
    .querySelector(".listaComentarios");

    lista.innerHTML += `

      <div class="comentario">

        👤 ${texto}

      </div>

    `;

    input.value = "";
  }

}