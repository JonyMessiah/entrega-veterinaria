var user = localStorage.getItem('user');
user = JSON.parse(user);
if (!user || !user.token) {
    window.location = "../landing-veterinaria/index.html"
} else {

    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    }

const boton = document.getElementById("btn-submit");

const nombre_tarjeta = document.getElementById("nombre-tarjeta");

const numero_tarjeta = document.getElementById("numero-tarjeta");

const numero_seguridad = document.getElementById("codigo-seguridad");

const mes_exp = document.getElementById("mes-exp");

const anno_exp = document.getElementById("anno-exp");

const date = new Date()

// campos en blanco

function validar_campos_vacios () {
    let error = false
    let campos_requeridos = document.querySelectorAll("#formulario-pago [required]");
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

// validar nombre en tarjeta

function validar_nombre_tarjeta () {
    let error = false;
    let texto_usuario = nombre_tarjeta.value;
    let expresion_nombre = /[a-zA-Z]+[-_]*[a-zA-Z]+/g;
    if(expresion_nombre.test(texto_usuario) == false) {
        error = true;
        nombre_tarjeta.classList.add("error");
    } else {
        nombre_tarjeta.classList.remove("error");
    }
    return error;
}

// validar numero en tarjeta

function validar_numero_tarjeta () {
    let error = false;
    let texto_usuario = numero_tarjeta.value;
    let expresion_numero = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/g;
    if(expresion_numero.test(texto_usuario) == false) {
        error = true;
        numero_tarjeta.classList.add("error");
    } else {
        numero_tarjeta.classList.remove("error");
    }

    return error;
}
// validar codigo en tarjeta

function validar_codigo_tarjeta () {
    let error = false;
    let texto_usuario = numero_seguridad.value;
    let expresion_numero = /[^a-zA-Z ]\ *([.0-9])*\d/g;
    if(expresion_numero.test(texto_usuario) == false) {
        error = true;
        numero_seguridad.classList.add("error");
    } else {
        numero_seguridad.classList.remove("error");
    }

    return error;
}
// validar codigo en tarjeta

function validar_expiracion_tarjeta () {
    let error = false;
    let mes_usuario = mes_exp.value;
    let anno_usuario = anno_exp.value;
    console.log(mes_usuario, anno_usuario);
    mes = date.getMonth() + 1;
    anno = date.getFullYear();
    console.log(mes_usuario, anno_usuario, mes, anno);
    mes_usuario = Number(mes_usuario);
    anno_usuario = Number(anno_usuario)
    if(mes_usuario <= mes && anno_usuario <= date.getFullYear) {
        error = true;
        mes_exp.classList.add("error");
        anno_exp.classList.add("error");

    } else {
        mes_exp.classList.remove("error");
        anno_exp.classList.remove("error");
    }

    return error;
}




//Enviar datos formulario
function enviar_informacion () {
    console.log("Iniciando script");
    console.log(date);

    let error_campos_vacios = validar_campos_vacios();
    let error_nombre_tarjeta = validar_nombre_tarjeta();
    let error_numero_tarjeta = validar_numero_tarjeta();
    let error_codigo_tarjeta = validar_codigo_tarjeta();
    let error_expiracion_tarjeta = validar_expiracion_tarjeta();
    

    //Alertas de errores
    if (error_campos_vacios) {
        Swal.fire({
            icon:"warning",
            title:"Campos vacios",
            text:"Los campos señalados son obligatorios."
        });
    } else if (error_nombre_tarjeta) {
        Swal.fire({
            icon:"warning",
            title:"Nombre inválido",
            text:"Por favor solo use letras y espacios al ingresar el nombre en la tarjeta."
        });
    } else if (error_numero_tarjeta) {
        Swal.fire({
            icon:"warning",
            title:"Número de la tarjeta inválido",
            text:"Por favor ingrese los números de la tarjeta en el formato solicitado. Ej: XXXX-XXXX-XXXX-XXXX"
        });
    } else if (error_codigo_tarjeta) {
        Swal.fire({
            icon:"warning",
            title:"Código de seguridad inválido",
            text:"Por favor ingrese el código de seguridad."
        });
    } else if (error_expiracion_tarjeta) {
        Swal.fire({
            icon:"warning",
            title:"Fecha de expiración inválida",
            text:"Por favor revisar la fecha de expiración de la tarjeta."
        });

       // Alertas y acciones de registro exitoso//
    } else {
        const casilla_nombre_tarjeta = nombre_tarjeta.value;
        const casilla_numero_tarjeta = numero_tarjeta.value;
        const casilla_mes_expiracion_tarjeta = mes_exp.value;
        const casilla_anno_expiracion_tarjeta = anno_exp.value;
        const casilla_casilla_numero_securidad = numero_seguridad.value;

        axios.post('http://localhost:3000/payments/add', {
            cardName: casilla_nombre_tarjeta,
            cardNumber: casilla_numero_tarjeta,
            securityNumber: casilla_casilla_numero_securidad,
            expirationNumber: casilla_mes_expiracion_tarjeta + '/' + casilla_anno_expiracion_tarjeta,
        }, config).then((response) => { 
            if (response.data.success === true){
                Swal.fire({
                    icon: "success",
                    title: "Excelente",
                    text: "Se ha registrado exitosamente."
                }).then(()=> {
                    window.location = "../Usuario_Pagina/index.html"
                });     

            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Ocurrio un error",
                    text: response.data.error
                })
            }
        });

        /*
        cardName, 
        cardNumber,
        securityNumber,
        expirationNumber,
        */

        

        
    }
}

if (boton) {

boton.addEventListener("click", enviar_informacion)

}

}