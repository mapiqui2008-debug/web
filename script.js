// Espera a que todo el documento esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    
    // Elementos principales
    const btnSaludo = document.getElementById("btnSaludo");
    const btnResaltar = document.getElementById("btnResaltar");
    const btnArriba = document.getElementById("btnArriba");
    const btnCambiarColor = document.getElementById("btnCambiarColor");
    const header = document.querySelector("header");
    
    // --- 1. Funcionalidad de Botones de Interacción ---
    
    // Botón de Saludo
    if (btnSaludo) {
        btnSaludo.addEventListener("click", () => {
            alert("¡Bienvenido a la Pastelería Mate Tomate! Los postres más destacados esperan por ti. 🍰");
        });
    }

    // Botón para Resaltar Postre al Azar
    if (btnResaltar) {
        btnResaltar.addEventListener("click", () => {
            const lista = document.querySelectorAll(".lista-postres-destacados li");
            
            if (lista.length > 0) {
                // Limpiar resaltados anteriores
                document.querySelectorAll(".resaltado").forEach(item => item.classList.remove("resaltado")); 
                
                const random = Math.floor(Math.random() * lista.length);
                lista[random].classList.add("resaltado");
            }
        });
    }

    // Botón de Volver Arriba
    if (btnArriba) {
        btnArriba.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        
        // Mostrar/Ocultar botón "Volver arriba"
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) { 
                btnArriba.style.display = "block";
            } else {
                btnArriba.style.display = "none";
            }
        });
        btnArriba.style.display = "none";
    }

    // Cambiar el Color del Encabezado (Funcionalidad Extra)
    if (btnCambiarColor && header) {
        const colores = [
            'linear-gradient(135deg, #e63946 0%, #d62828 100%)', // Rojo original
            'linear-gradient(135deg, #ffc300, #ff8c00)', // Naranja/Amarillo
            'linear-gradient(135deg, #4cc9f0, #4361ee)', // Azul
            'linear-gradient(135deg, #38b000, #70e000)'  // Verde
        ];
        
        let indiceActual = 0;

        btnCambiarColor.addEventListener("click", () => {
            indiceActual = (indiceActual + 1) % colores.length;
            header.style.background = colores[indiceActual];
        });
    }


    // --- 2. Funcionalidad de Filtro por Origen (La nueva "cosa" mejorada) ---
    
    const filtroButtons = document.querySelectorAll('.btn-filtro');
    const postCards = document.querySelectorAll('.postre-card');
    
    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filtroOrigen = this.getAttribute('data-filtro');
            
            // 1. Limpiar clase 'activo' y activar el botón actual
            filtroButtons.forEach(btn => btn.classList.remove('activo'));
            this.classList.add('activo');

            // 2. Iterar sobre las tarjetas de postres
            postCards.forEach(card => {
                const origen = card.getAttribute('data-origen');
                
                if (filtroOrigen === 'todos' || origen === filtroOrigen) {
                    // Mostrar la tarjeta
                    card.style.display = 'block';
                    card.classList.remove('oculto');
                } else {
                    // Ocultar la tarjeta
                    card.classList.add('oculto');
                    // Usar setTimeout para aplicar display: none después de la transición (0.5s)
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500); 
                }
            });
        });
    });

});