// https://github.com/nahuelpaz

// Obtener referencias a los elementos HTML
const amount = document.getElementById('amount');
const calculate = document.getElementById('calculateInteres');
const calculateInteresMonto = document.getElementById('calculateInteresMonto');
const tna = document.getElementById('tna');
const interesMensual = document.getElementById('interesMensual');
const resultadoContenedor = document.getElementById('resultadoContenedor');
const labelInteres = document.getElementById('labelInteres');
const meses = document.getElementById('meses');
const calculateMeses = document.getElementById('calculateMeses');

// Deshabilitar la entrada de interesMensual
interesMensual.disabled = true;

// Escuchador de eventos para el botón 'calcular'
calculate.addEventListener('click', () => {
    // Verificar si se han llenado los campos requeridos
    if (amount.value === '' || tna.value === '') {
        return;
    }

    // Habilitar la entrada de interesMensual y limpiar los resultados anteriores
    labelInteres.classList.remove('disabled');
    interesMensual.classList.remove('disabled');
    resultadoContenedor.innerHTML = '';

    // Calcular la tasa de interés mensual
    const interesXMes = (tna.value / 12).toFixed(2);
    interesMensual.value = `${interesXMes}%`;

    // Calcular el interés mensual y mostrar el resultado
    const resultado = ((interesXMes / 100) * amount.value);
    const labelResultado = document.createElement('label');
    labelResultado.innerText = `Esto obtuviste en un mes con $${Number(amount.value).toLocaleString('es-ES')} y un interes del ${interesXMes}%:`;
    const resultadoInput = document.createElement('input');
    resultadoInput.value = resultado.toLocaleString('es-ES');
    resultadoInput.readOnly = true;
    resultadoInput.classList.add('rounded-2', 'border-1');
    resultadoContenedor.append(labelResultado, resultadoInput);
});

// Escuchador de eventos para el botón 'calculateInteresMonto'
calculateInteresMonto.addEventListener('click', () => {
    // Verificar si se han llenado los campos requeridos
    if (amount.value === '' || tna.value === '') {
        return;
    }

    // Habilitar la entrada de interesMensual y limpiar los resultados anteriores
    labelInteres.classList.remove('disabled');
    interesMensual.classList.remove('disabled');
    resultadoContenedor.innerHTML = '';

    // Calcular la tasa de interés mensual
    const interesXMes = (tna.value / 12).toFixed(2);
    interesMensual.value = `${interesXMes}%`;

    // Calcular el monto total después de un mes y mostrar el resultado
    const resultado = Number((interesXMes / 100) * amount.value) + Number(amount.value);
    const labelResultado = document.createElement('label');
    labelResultado.innerText = `Esta es la sumatoria de tu interes de ${interesXMes}% y tu monto de $${Number(amount.value).toLocaleString('es-ES')} en un mes :`;
    const resultadoInput = document.createElement('input');
    resultadoInput.value = resultado.toLocaleString('es-ES');
    resultadoInput.readOnly = true;
    resultadoInput.classList.add('rounded-2', 'border-1');
    resultadoContenedor.append(labelResultado, resultadoInput);
});

// Escuchador de eventos para el botón 'calculateMeses'
calculateMeses.addEventListener('click', () => {
    // Verificar si se han llenado los campos requeridos
    if (amount.value === '' || tna.value === '' || meses.value === '') {
        alert('Ingrese todos los campos')
        return;
    }

    // Deshabilitar la entrada de interesMensual y limpiar los resultados anteriores
    labelInteres.classList.add('disabled');
    interesMensual.classList.add('disabled');
    resultadoContenedor.innerHTML = '';

    // Inicializar variables
    let montoActual = Number(amount.value);
    const montoMensual = Number(amount.value);
    const interesXMes = (tna.value / 12 / 100).toFixed(4);

    // Crear una tabla para mostrar los resultados
    const tablaResultados = document.createElement('table');
    tablaResultados.classList.add('table', 'table-bordered', 'table-striped', 'mt-3');

    // Crear el encabezado de la tabla
    const encabezado = document.createElement('thead');
    encabezado.innerHTML = `
        <tr>
            <th>Mes</th>
            <th>Saldo inicial</th>
            <th>Intereses</th>
            <th>Depósito</th>
            <th>Saldo final</th>
        </tr>
    `;
    tablaResultados.appendChild(encabezado);

    // Crear el cuerpo de la tabla
    const cuerpoTabla = document.createElement('tbody');

    // Recorrer cada mes y calcular el monto acumulado
    for (let mes = 1; mes <= meses.value; mes++) { 
        const saldoInicial = montoActual;
        const interes = montoActual * interesXMes;
        montoActual += interes;
        montoActual += montoMensual;

        // Crear una fila para mostrar el resultado de cada mes
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${mes}</td>
            <td>$${saldoInicial.toLocaleString('es-ES')}</td>
            <td>$${interes.toLocaleString('es-ES')}</td>
            <td>$${montoMensual.toLocaleString('es-ES')}</td>
            <td>$${montoActual.toLocaleString('es-ES')}</td>
        `;
        cuerpoTabla.appendChild(fila);
    }
    // Mostrar el monto final al inicio
    const resultadoFinal = document.createElement('div');
    resultadoFinal.classList.add('resultadoFinal')
    resultadoFinal.innerHTML = `
            <strong>Monto total después de ${meses.value} meses: $${montoActual.toLocaleString('es-ES')}</strong>
        `;
    resultadoContenedor.appendChild(resultadoFinal);

    // Agregar el cuerpo de la tabla a la tabla principal
    tablaResultados.appendChild(cuerpoTabla);

    // Agregar la tabla al contenedor de resultados
    resultadoContenedor.appendChild(tablaResultados);


});
