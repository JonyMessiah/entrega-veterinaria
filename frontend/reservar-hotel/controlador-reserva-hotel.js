const boton = document.getElementById("Boton");

const nombre_mascota = document.getElementById("nombres");

const especie_mascota = document.getElementById("animales");

const telefono = document.getElementById("telefono");

const descripcion = document.getElementById("descripcion");

const ingreso = document.getElementById("ingreso");

const salida = document.getElementById("salida");

const date = new Date()

// campos en blanco

function validar_campos_vacios () {
    let error = false
    let campos_requeridos = document.querySelectorAll("#formulario [required]");
    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == "") {
            error = true;
            campos_requeridos[i].classList.add("error");
        } else {
            campos_requeridos[i].classList.remove("error");
        }
    }
    return error; 
}

// validar nombre

function validar_nombre_mascota () {
    let error = false;
    let texto_usuario = nombre_mascota.value;
    let expresion_nombre = /[a-zA-Z]+[-_]*[a-zA-Z]+/g;
    if(expresion_nombre.test(texto_usuario) == false) {
        error = true;
        nombre_mascota.classList.add("error");
    } else {
        nombre_mascota.classList.remove("error");
    }
    return error;
}

// validar especie

function validar_especie_mascota () {
    let error = false;
    let texto_usuario = especie_mascota.value;
    let expresion_numero = /[a-zA-Z]+[-_]*[a-zA-Z]+/g;
    if(expresion_numero.test(texto_usuario) == false) {
        error = true;
        especie_mascota.classList.add("error");
    } else {
        especie_mascota.classList.remove("error");
    }

    return error;
}
// validar telefono

function validar_numero_telefono () {
    let error = false;
    let texto_usuario = telefono.value;
    let expresion_numero = /^[0-9]{4}-[0-9]{4}$/g;
    if(expresion_numero.test(texto_usuario) == false) {
        error = true;
        telefono.classList.add("error");
    } else {
        telefono.classList.remove("error");
    }

    return error;
}


// validar fecha

// function validar_fecha_cita () {
//     let error = false;
//     mes = date.getMonth() + 1;
//     anno = date.getFullYear();

//     console.log(fecha.value, mes, anno);
//     console.log(typeof(fecha))

//     if(fecha <= date) {
//         error = true;
//         fecha.classList.add("error");

//     } else {
//         fecha.classList.remove("error");
//     }

//     return error;
// }




//Enviar datos formulario
function enviar_informacion () {
    console.log("Iniciando script");
    console.log(nombre_mascota)

    let error_campos_vacios = validar_campos_vacios();
    let error_nombre_mascota = validar_nombre_mascota();
    let error_especie_mascota = validar_especie_mascota();
    let error_numero_telefono = validar_numero_telefono();
    // let error_fecha_cita = validar_fecha_cita();
    

    //Alertas de errores
    if (error_campos_vacios) {
        Swal.fire({
            icon:"warning",
            title:"Campos vacios",
            text:"Los campos señalados son obligatorios."
        });
    } else if (error_nombre_mascota) {
        Swal.fire({
            icon:"warning",
            title:"Nombre inválido",
            text:"Por favor solo use letras y espacios al ingresar el nombre de su mascota."
        });
    } else if (error_especie_mascota) {
        Swal.fire({
            icon:"warning",
            title:"Tipo de especie inválido",
            text:"La especie de su mascota no debe llevar números o carácteres especiales."
        });
    } else if (error_numero_telefono) {
        Swal.fire({
            icon:"warning",
            title:"Número de teléfono inválido",
            text:"Por favor ingrese el número de teléfono en el formato solicitado. Ej: 8123-4567."
        });
    } else if (error_fecha_cita) {
        Swal.fire({
            icon:"warning",
            title:"Fecha de cita inválida",
            text:"La cita debe ser posterior al día de hoy."
        });

       // Alertas y acciones de registro exitoso//
    } else {
        let casilla_nombre_mascota = nombre_mascota.value;
        let casilla_especie_mascota  = especie_mascota.value;
        let casilla_numero_telefono = telefono.value;
        let casilla_fecha_cita = fecha.value;


        //registro_platillo(nombre_tarjeta,numero_tarjeta)********;//

        Swal.fire({
            icon: "success",
            title: "Excelente",
            text: "La cita se ha registrado correctamente."
        });    
    }
}

if (boton) {

boton.addEventListener("click", enviar_informacion)

}