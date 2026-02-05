// ===== MENÚ MÓVIL =====
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
});

// ===== PÁGINA 2: GENERAR TABLAS DE MULTIPLICAR =====
function generarTablas() {
    const contenedor = document.getElementById('tablasContainer');
    if (!contenedor) return;

    let html = '';
    
    for (let i = 1; i <= 20; i++) {
        html += `
            <div class="tabla-item">
                <div class="tabla-header">Tabla del ${i}</div>
                <div class="tabla-contenido">
                    ${generarTablaIndividual(i)}
                </div>
            </div>
        `;
    }
    
    contenedor.innerHTML = html;
}

function generarTablaIndividual(numero) {
    let tabla = '';
    for (let j = 1; j <= 10; j++) {
        tabla += `<div>${numero} × ${j} = ${numero * j}</div>`;
    }
    return tabla;
}

// ===== PÁGINA 3: MANEJO DE INPUTS Y COLOR =====
function inicializarFormularioInputs() {
    const form = document.getElementById('dynamicForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const texto = document.getElementById('inputTexto').value;
        const telefono = document.getElementById('inputTelefono').value;
        const correo = document.getElementById('inputCorreo').value;
        const password = document.getElementById('inputPassword').value;
        const color = document.getElementById('inputColor').value;
        
        // Cambiar color de fondo
        document.body.style.backgroundColor = color;
        
        // Mostrar resultados
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `
            <h3>📋 Datos Ingresados:</h3>
            <div class="resultado-item"><strong>Texto:</strong> ${texto}</div>
            <div class="resultado-item"><strong>Teléfono:</strong> ${telefono}</div>
            <div class="resultado-item"><strong>Correo:</strong> ${correo}</div>
            <div class="resultado-item"><strong>Contraseña:</strong> ${'*'.repeat(password.length)}</div>
            <div class="resultado-item"><strong>Color seleccionado:</strong> ${color}</div>
        `;
        
        resultado.classList.add('mostrar');
        
        // Guardar en localStorage
        const datos = {
            texto,
            telefono,
            correo,
            color,
            fecha: new Date().toLocaleString()
        };
        localStorage.setItem('ultimosDatos', JSON.stringify(datos));
    });
}

function descargarArchivo(nombre, contenido) {
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Funciones placeholder para obtener contenido (en producción serían los archivos reales)
function obtenerContenidoIndex() { return 'Contenido de index.html'; }
function obtenerContenidoTablas() { return 'Contenido de tablas.html'; }
function obtenerContenidoInputs() { return 'Contenido de inputs.html'; }
function obtenerContenidoFormulario() { return 'Contenido de formulario.html'; }
function obtenerContenidoDescarga() { return 'Contenido de descarga.html'; }
function obtenerContenidoCSS() { return 'Contenido de estilos.css'; }
function obtenerContenidoJS() { return 'Contenido de script.js'; }

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar según la página actual
    if (document.getElementById('tablasContainer')) {
        generarTablas();
    }
    
    if (document.getElementById('dynamicForm')) {
        inicializarFormularioInputs();
    }
    
    // Animaciones de entrada
    animarEntrada();
});

function animarEntrada() {
    const elementos = document.querySelectorAll('.nav-card, .tabla-item, .form-container');
    elementos.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}