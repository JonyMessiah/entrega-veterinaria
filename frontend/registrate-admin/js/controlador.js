 
const btnRegistrar = document.getElementById("btn-registrar");
const inputNombre = document.getElementById("txtnombre");
const inputCorreo = document.getElementById("txtcorreo");
const inputCedula = document.getElementById("txtcedula");
const inputDireccion = document.getElementById("txtdireccion");
const inputPassword = document.getElementById("txtcontra");
const inputPassword2 = document.getElementById("txtcontra2");
const inputBirthday = document.getElementById("txtfecha");
const formRegistrar = document.getElementById("formulario_registro");

//Validar campos en blanco
function validar_campos_vacios() {
    let error = false
    let campos_requeridos = document.querySelectorAll("#formulario_registro [required]");
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


//validar nombre 
function validar_nombre(){
    let error = false;
    let texto_usuario = inputNombre.value;
    let expresion_nombre = /^[a-zA-Z ]+$/;

    if(expresion_nombre.test(texto_usuario) == false) {
        error = true;
        inputNombre.classList.add("error");
    } else {
        inputNombre.classList.remove("error");
    }
    return error;
}

//validar correo
function validar_correo(){
    let error = false;
    let texto_usuario = inputCorreo.value;
    let expresion_correo = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

    if(expresion_correo.test(texto_usuario) == false) {
        error = true;
        inputCorreo.classList.add("error");
    } else {
        inputCorreo.classList.remove("error");
    }
    return error;
}

//validar cedula
function validar_cedula(){
    let error = false;
    let texto_usuario = inputCedula.value;
    let expresion_cedula = /^[1-9]-?\d{4}-?\d{4}$/;

    if(expresion_cedula.test(texto_usuario) == false) {
        error = true;
        inputCedula.classList.add("error");
    } else {
        inputCedula.classList.remove("error");
    }
    return error;
}

//validar direccion
function validar_direccion(){
    let error = false;
    let texto_usuario = inputDireccion.value;
    let expresion_direccion = /^[a-zA-Z, -'.:]+$/;

    if(expresion_direccion.test(texto_usuario) == false) {
        error = true;
        inputDireccion.classList.add("error");
    } else {
        inputDireccion.classList.remove("error");
    }
    return error;
}
function validar_password() {
    inputPassword.classList.remove("error");
    // Check that password has more or equal than 6 characters
    if (inputPassword.value.length < 6) {
        inputPassword.classList.add("error");
        return true;
    }

    // Check if password matches confirmation;

    //return true if it doesnt | add error to field
    if(inputPassword.value !== inputPassword2.value){
        inputPassword.classList.add("error");
        return true;
    }
}

//limpiar celdas
const limpiar = () => {
    inputCorreo.value = '';
    inputNombre.value = '';
    inputCedula.value = '';
    inputDireccion.value = '';
    inputPassword.value = '';
}

//Imprimir lista platillos


//Enviar datos formulario
function enviar_informacion(e) {
    e.preventDefault();
    let error_campos_vacios = validar_campos_vacios();
    let error_nombre = validar_nombre();
    let error_correo = validar_correo();
    let error_cedula = validar_cedula();
    let error_direccion = validar_direccion();
    let error_password = validar_password();


    //Alertas de errores
    if (error_campos_vacios) {
        Swal.fire({
            icon:"warning",
            title:"Campos Vacios",
            text:"Los campos señalados son obligatorios." 
        });
    } else if (error_nombre) {
        Swal.fire({
            icon:"warning",
            title:"Nombre inválido",
            text:"Por favor solo use letras y espacios para su nombre."
        });
    } else if (error_correo) {
        Swal.fire({
            icon:"warning",
            title:"Correo electrónico incorrecto",
            text:"Por favor ingrese un correo electrónico valido. Ejemplo: mauricio@cenfotec.com"
        });
    } else if (error_cedula) {
        Swal.fire({
            icon:"warning",
            title:"Formato incorrecto",
            text:"Por favor ingrese un numero de cedula existente."
        });
    } else if (error_password) {
        Swal.fire({
            icon:"warning",
            title:"Formato incorrecto",
            text:"Contraseña debe ser el mismo que la confirmacion y debe tener 6 o mas cracteres"
        });
    } else if (error_direccion) {
        Swal.fire({
            icon:"warning",
            title:"Formato incorrecto",
            text:"Por favor no utilice simbolos extraños."
        });
        
        //Alertas y acciones de registro exitoso
    } else {
        let casilla_nombre = txtnombre.value;
        let casilla_correo = txtcorreo.value;
        let casilla_cedula = txtcedula.value;
        let casilla_direccion = txtdireccion.value;
        let casilla_password = inputPassword.value;

        axios.post('http://localhost:3000/auth/register/admin', {
            txtnombre: casilla_nombre,
            txtcorreo: casilla_correo,
            txtcontra: casilla_password,
            txtcedula: casilla_cedula,
            txtdireccion: casilla_direccion,
            txtfecha: inputBirthday.value
        }).then((response) => { 
            if (response.data.success === true){
                Swal.fire({
                    icon: "success",
                    title: "Excelente",
                    text: "Se ha registrado exitosamente como administrador."
                }).then(()=> {
                    window.location = "../landing-veterinaria/index.html"
                });     

            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Ocurrio un error",
                    text: response.data.error
                })
            }
        });
           

        Swal.fire({
            icon: "success",
            title: "Excelente",
            text: "Se ha registrado exitosamente."
        }); 
     
    }
}

formRegistrar.addEventListener("submit",enviar_informacion)