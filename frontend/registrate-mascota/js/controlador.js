var user = localStorage.getItem('user');
user = JSON.parse(user);
if (!user || !user.token) {
    window.location = "../landing-veterinaria/index.html"
} else {

    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    }


const formRegistrar = document.getElementById("formulario_registro");
const inputNombre = document.getElementById("txtnombre");
const inputCuidado = document.getElementById("txtcuidado");
const inputAlergia = document.getElementById("txtalergia");
const inputDireccion = document.getElementById("txtdireccion");
const inputFecha = document.getElementById("txtfecha");
const inputTipo = document.getElementById("txttipo");

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
    let expresion_nombre = /^[a-zA-Z .]+$/;

    if(expresion_nombre.test(texto_usuario) == false) {
        error = true;
        inputNombre.classList.add("error");
    } else {
        inputNombre.classList.remove("error");
    }
    return error;
}

//validar fecha
function validar_fecha_cita(){
    let error = false;
    let texto_usuario = inputFecha.value;
    let expresion_fecha = /^[a-zA-Z .]+$/;

    if(expresion_fecha.test(texto_usuario) == false) {
        error = true;
        inputFecha.classList.add("error");
    } else {
        inputFecha.classList.remove("error");
    }
    return error;
}
//validar tipo
function validar_nombre(){
    let error = false;
    let texto_usuario = inputTipo.value;
    let expresion_tipo = /^[a-zA-Z .]+$/;

    if(expresion_tipo.test(texto_usuario) == false) {
        error = true;
        inputTipo.classList.add("error");
    } else {
        inputTipo.classList.remove("error");
    }
    return error;
}
//validar cuidado
function validar_cuidado(){
    let error = false;
    let texto_usuario = inputCuidado.value;
    let expresion_cuidado = /^[a-zA-Z .]+$/;

    if(expresion_cuidado.test(texto_usuario) == false) {
        error = true;
        inputCuidado.classList.add("error");
    } else {
        inputCuidado.classList.remove("error");
    }
    return error;
}

//validar alergia
function validar_alergia(){
    let error = false;
    let texto_usuario = inputAlergia.value;
    let expresion_alergia = /^[a-zA-Z .]+$/;

    if(expresion_alergia.test(texto_usuario) == false) {
        error = true;
        inputAlergia.classList.add("error");
    } else {
        inputAlergia.classList.remove("error");
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

//limpiar celdas
const limpiar = () => {
    inputCuidado.value = '';
    inputNombre.value = '';
    inputAlergia.value = '';
    inputDireccion.value = '';
}

//Enviar datos formulario
function enviar_informacion(e) {
    e.preventDefault();
    let error_campos_vacios = validar_campos_vacios();
    let error_nombre = validar_nombre();
    let error_cuidado = validar_cuidado();
    let error_alergia = validar_alergia();
    let error_direccion = validar_direccion();

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
    } else if (error_cuidado) {
        Swal.fire({
            icon:"warning",
            title:"Cuidado invalido",
            text:"Por favor solo ingrese palabras."
        });
    } else if (error_alergia) {
        Swal.fire({
            icon:"warning",
            title:"Alergia invalida",
            text:"Por favor solo ingrese palabras."
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
        let casilla_cuidado = txtcuidado.value;
        let casilla_alergia = txtalergia.value;
        let casilla_direccion = txtdireccion.value;
        let casilla_fecha = txtfecha.value;
        let casilla_tipo = txttipo.value;
        axios.post('http://localhost:3000/pets/add', {
            name: casilla_nombre,
            notes: casilla_cuidado,
            allergies: casilla_alergia,
            address: casilla_direccion,
            birthday: casilla_fecha,
            type: casilla_tipo
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
     
    }
}

formRegistrar.addEventListener("submit",enviar_informacion)
}