$(document).ready(function() {
    
    // 1. Primer carácter diferente de punto '.'
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        // Validar la dirección IPv4 solo cuando se complete según las reglas
        if (inputVal.length >= 1 && inputVal.length <= 15) {
            if (!isFirstCharacterPeriod(inputVal)) {
                alert('El primer carácter de la dirección IPv4 no puede ser un punto.');
            }
        }
    });

    //2. Máxima longitud de la cadena 15 caracteres, pero debe cambiar de acuerdo a los caracteres que se vayan digitando
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        // Verificar la longitud de la cadena en tiempo real
        if (inputVal.length > 15) {
            // Si la longitud excede 15 caracteres, recortar la cadena
            inputVal = inputVal.slice(0, 15);
            $(this).val(inputVal); // Actualizar el valor del campo de entrada
        }
    });

    //3. Mínima longitud de cadena 7 caracteres
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        // Verificar la longitud mínima de la cadena en tiempo real
        if (inputVal.length < 7) {
            // Si la longitud es menor que 7 caracteres, mostrar un mensaje de alerta
            //alert('La dirección IPv4 debe tener al menos 7 caracteres.');
            console.log("La IP debe tener al menos 7 caracteres");
            
        }
    });

    //4.Máximo 3 caracteres de punto
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();
        var dotCount = (inputVal.match(/\./g) || []).length;

        // Verificar el número de puntos en la cadena en tiempo real
        if (dotCount > 3) {
            // Si hay más de 3 puntos, mostrar un mensaje de alerta
            alert('La dirección IPv4 no puede tener más de 3 puntos.');
        }
    });

    //5. Máximo 4 grupos de 3 dígitos
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();
        var groups = inputVal.split('.');
        var groupCount = groups.length;

        // Verificar el número de grupos de 3 dígitos en la cadena en tiempo real
        if (groupCount > 4) {
            // Si hay más de 4 grupos, mostrar un mensaje de alerta
            alert('La dirección IPv4 no puede tener más de 4 grupos de 3 dígitos.');
        }
    });

    //6.Eliminar los ceros a la izquierda en los grupos de 3 dígitos
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();
        var groups = inputVal.split('.');

        // Eliminar los ceros a la izquierda en cada grupo de 3 dígitos
        for (var i = 0; i < groups.length; i++) {
            groups[i] = groups[i].replace(/^0+/, ''); // Eliminar ceros a la izquierda
        }

        var formattedIP = groups.join('.'); // Unir los grupos con puntos nuevamente
        $(this).val(formattedIP); // Actualizar el valor del campo de entrada
    });

    // 7. Validar el valor numérico de cada grupo en el rango entre 0 y 255
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();
        var groups = inputVal.split('.');

        // 7. Validar el valor numérico de cada grupo en el rango entre 0 y 255
        var isValidNumericValues = true;
        $.each(groups, function(index, group) {
            var value = parseInt(group, 10);
            if (isNaN(value) || value < 0 || value > 255) {
                isValidNumericValues = false;
            }
        });

        if (!isValidNumericValues) {
            alert('Los valores numéricos de cada grupo deben estar en el rango de 0 a 255.');
        }
    });
    
    //  // 8. No se permiten puntos consecutivos
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        // 8. No se permiten puntos consecutivos
        if (inputVal.indexOf('..') !== -1) {
            alert('La dirección IPv4 no puede tener puntos consecutivos.');
            $(this).val(inputVal.replace(/\.{2,}/g, '.')); // Eliminar puntos consecutivos
        }
    });

    // // 9. Autocompletar el punto después de digitar 3 caracteres numéricos consecutivos
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        // Autocompletar el punto después de escribir 3 caracteres numéricos consecutivos
        var updatedVal = inputVal.replace(/(\d{3})(?=\d)/g, '$1.');
        if (updatedVal !== inputVal) {
            $(this).val(updatedVal);
        }
    });

    //  // 10. Solo se permiten caracteres numéricos y el punto, no se permiten letras u otros caracteres especiales
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        
        var validInput = inputVal.replace(/[^0-9.]/g, '');
        if (validInput !== inputVal) {
            alert('Solo se permiten caracteres numéricos y el punto.');
            $(this).val(validInput);
        }
    });

    //11. No se permite copiar y pegar en el input
    $('#ipv4').on('input', function() {
        var inputVal = $(this).val();

        $(this).on('paste', function(e) {
            e.preventDefault();
            alert('No se permite copiar y pegar en el cuadro de texto.');
        });
    });
 

});

// Función para validar el primer carácter de la dirección IPv4
function isFirstCharacterPeriod(ip) {
    return ip.charAt(0) !== '.';
}


