document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar los elementos necesarios
  const fechaElement = document.getElementById('fecha');
  const lista = document.querySelector('#lista');
  const input = document.querySelector('#input');
  const mensajeAgregado = document.querySelector('#mensajeAgregado');
  const mensajeEliminado = document.querySelector('#mensajeEliminado');
  const contenedor = document.querySelector('.container');

  // Constantes para las acciones de los elementos
  const ACTION_ADD = 'add';
  const ACTION_CHECK = 'check';
  const ACTION_DELETE = 'delete';

  // Agregar evento de clic al botón de envío del formulario
  const formulario = document.querySelector('form');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    agregarTarea();
  });

  // Agregar evento de clic al botón de agregar tarea
  const botonAgregar = document.querySelector('.agregar-tareas i');
  botonAgregar.addEventListener('click', function() {
    agregarTarea();
  });

  // Agregar tarea a la lista
  function agregarTarea() {
    const tarea = input.value;
    if (tarea !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <i class="far fa-circle co" data-action="check"></i>
        <p class="text">${tarea}</p>
        <i class="fas fa-trash de" data-action="delete"></i>
      `;
      lista.appendChild(li);
      mostrarMensaje(mensajeAgregado, 'Tarea agregada', 'success');
      input.value = '';

      enviarTarea(tarea); // Enviar tarea al servidor
    } else {
      alert('Por favor, ingresa una tarea.');
    }
  }

  // Mostrar mensaje
  function mostrarMensaje(elemento, mensaje, tipoMensaje) {
    elemento.textContent = mensaje;
    elemento.classList.add('mostrar');
    elemento.classList.add(tipoMensaje);

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      elemento.classList.remove('mostrar');
      elemento.classList.remove(tipoMensaje);
    }, 3000);
  }

  // Enviar tarea al servidor
  function enviarTarea(tarea) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/tareas/agregar/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Tarea enviada al servidor');
        } else {
          console.error('Error al enviar la tarea al servidor');
        }
      }
    };
    const data = 'tarea_texto=' + encodeURIComponent(tarea);
    xhr.send(data);
  }

  // Manejar eventos de clic en la lista de tareas
  lista.addEventListener('click', (event) => {
    const elemento = event.target;
    const accion = elemento.getAttribute('data-action');

    if (accion === ACTION_CHECK) {
      toggleCheck(elemento);
    } else if (accion === ACTION_DELETE) {
      confirmarEliminacion(elemento);
    }
  });

  // Función para activar/desactivar el check de una tarea
  function toggleCheck(elemento) {
    const tarea = elemento.nextElementSibling;
    elemento.classList.toggle('fa-check-circle');
    elemento.classList.toggle('fa-circle');
    tarea.classList.toggle('line-through');
    tarea.classList.toggle('green');

    if (elemento.classList.contains('fa-check-circle')) {
      elemento.style.color = 'green';
    } else {
      elemento.style.color = 'white';
    }
  }

  // Función para confirmar la eliminación de una tarea
  function confirmarEliminacion(elemento) {
    const tarea = elemento.parentElement;
    const confirmacion = window.confirm('¿Estás seguro(a) de eliminar esta tarea?');
    if (confirmacion) {
      eliminarTarea(tarea);
    }
  }

  // Eliminar tarea de la lista
  function eliminarTarea(tarea) {
    tarea.remove();
    mostrarMensaje(mensajeEliminado, 'Tarea eliminada', 'error');
  }

  // Obtener y mostrar la fecha actual
  function mostrarFecha() {
    const fechaActual = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaElement.textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
  }

  // Mostrar la fecha actual al cargar la página
  mostrarFecha();

  // Obtener y mostrar la lista de tareas guardadas en el servidor
  function obtenerTareasGuardadas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/tareas/lista/', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const tareas = response.tareas;
          mostrarTareasGuardadas(tareas);
        } else {
          console.error('Error al obtener las tareas guardadas');
        }
      }
    };
    xhr.send();
  }

  // Mostrar las tareas guardadas en la lista
  function mostrarTareasGuardadas(tareas) {
    for (let tarea of tareas) {
      const li = document.createElement('li');
      li.innerHTML = `
        <i class="far fa-circle co" data-action="check"></i>
        <p class="text">${tarea.texto}</p>
        <i class="fas fa-trash de" data-action="delete"></i>
      `;
      if (tarea.completada) {
        const checkIcon = li.querySelector('.co');
        toggleCheck(checkIcon);
      }
      lista.appendChild(li);
    }
  }

  // Obtener y mostrar las tareas guardadas al cargar la página
  obtenerTareasGuardadas();
});