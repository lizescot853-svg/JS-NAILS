// Datos de precios
const precios = {
    acrilico: {
        1: 250,
        2: 300,
        3: 350,
        4: 400,
        5: 450,
        6: 500
    },
    gel: 150,
    efectos: {
        'Espejo': 10,
        'Aurora': 10,
        'Azúcar': 10,
        'Suéter': 15,
        'Glitter': 10,
        'Blooming': 15,
        'Ojo de gato': 10,
        'Relieve': 15,
        '3D': 20,
        'Frances': 10,
        'Baby boomer': 15,
        'Mármol': 10
    },
    decoraciones: {
        'Cristales CH': 10,
        'Cristales M': 15,
        'Cristales G': 20
    },
    tonos: 5
};

// Función para cambiar de página
function goToQuote() {
    document.getElementById('welcome-page').classList.remove('active');
    document.getElementById('quote-page').classList.add('active');
}

function goToWelcome() {
    document.getElementById('quote-page').classList.remove('active');
    document.getElementById('welcome-page').classList.add('active');
    // Resetear el formulario
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        } else if (input.type === 'number') {
            input.value = 0;
        }
    });
    updateQuote();
}

// Función para mostrar/ocultar tamaños según el servicio
function updateQuote() {
    const serviceSelected = document.querySelector('input[name="service"]:checked');
    const acriolicoSizesDiv = document.getElementById('acrilico-sizes');
    
    if (serviceSelected && serviceSelected.value === 'acrilico') {
        acriolicoSizesDiv.style.display = 'block';
    } else {
        acriolicoSizesDiv.style.display = 'none';
        // Desmarcar tamaños
        document.querySelectorAll('input[name="size"]').forEach(input => {
            input.checked = false;
        });
    }
    
    calculateTotal();
}

// Función para calcular el total
function calculateTotal() {
    let total = 0;
    let baseService = '-';
    let effectsCost = 0;
    let decorationsCost = 0;
    let tonesCost = 0;
    
    // Servicio base
    const serviceSelected = document.querySelector('input[name="service"]:checked');
    if (serviceSelected) {
        if (serviceSelected.value === 'acrilico') {
            const sizeSelected = document.querySelector('input[name="size"]:checked');
            if (sizeSelected) {
                const size = sizeSelected.value;
                const price = precios.acrilico[size];
                baseService = `Acrílico Tamaño ${size}: $${price}`;
                total += price;
            }
        } else if (serviceSelected.value === 'gel') {
            baseService = `Gel Semipermanente: $${precios.gel}`;
            total += precios.gel;
        }
    }
    
    // Efectos (se aplican a todas las uñas)
    const effectsChecked = document.querySelectorAll('input[name="effect"]:checked');
    let effectCount = 0;
    effectsChecked.forEach(effect => {
        const effectName = effect.value;
        const effectPrice = parseInt(effect.getAttribute('data-price'));
        effectsCost += effectPrice * 10; // 10 uñas
        effectCount++;
    });
    
    total += effectsCost;
    
    // Decoraciones
    const decorationsChecked = document.querySelectorAll('input[name="decoration"]:checked');
    decorationsChecked.forEach(decoration => {
        const decorationPrice = parseInt(decoration.getAttribute('data-price'));
        decorationsCost += decorationPrice;
    });
    
    total += decorationsCost;
    
    // Tonos extra
    const extraTones = parseInt(document.getElementById('extra-tones').value) || 0;
    tonesCost = extraTones * precios.tonos;
    total += tonesCost;
    
    // Actualizar el resumen
    document.getElementById('summary-base').textContent = baseService;
    document.getElementById('summary-effects').textContent = `$${effectsCost}`;
    document.getElementById('summary-decorations').textContent = `$${decorationsCost}`;
    document.getElementById('summary-tones').textContent = `$${tonesCost}`;
    document.getElementById('summary-total').textContent = `$${total}`;
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateQuote();
});