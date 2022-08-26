const form = document.getElementById("form-login");

const email = document.getElementById("email");

const password = document.getElementById("pass");

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

// validar email

function validar_email () {
    let error = false;
    let texto_usuario = email.value;
    let expresion_nombre = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/g;
    if(expresion_nombre.test(texto_usuario) == false) {
        error = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }
    return error;
}

// // validar password

// function validar_password () {
//     let error = false;
//     let texto_usuario = password.value;
//     let expresion_numero = /[a-zA-Z]+[-_]*[a-zA-Z]+/g;
//     if(expresion_numero.test(texto_usuario) == false) {
//         error = true;
//         especie_mascota.classList.add("error");
//     } else {
//         especie_mascota.classList.remove("error");
//     }

//     return error;
// }


//Enviar datos formulario
function enviar_informacion (e) {
    e.preventDefault();
    console.log("Iniciando script");

    let error_campos_vacios = validar_campos_vacios();
    let error_email = validar_email();
    // let error_fecha_cita = validar_fecha_cita();
    

    //Alertas de errores
    if (error_campos_vacios) {
        Swal.fire({
            icon:"warning",
            title:"Campos vacios",
            text:"Los campos señalados son obligatorios."
        });
    } else if (error_email) {
        Swal.fire({
            icon:"warning",
            title:"Correo electrónico inválido",
            text:"Por favor verifica el correo electrónico."
        });

       // Alertas y acciones de registro exitoso//
    } else {
        emailValue = email.value;
        passwordValue = password.value;

        axios.post('http://localhost:3000/auth/login', {            
            email: emailValue,
            password: passwordValue,
        }).then((response) => {
            if (response.data.success === true) {
                console.log(response.data.data);
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(response.data.data))

                
                Swal.fire({
                    icon: "success",
                    title: "Excelente",
                    text: "Gracias por ingresar"
                }).then(()=> {

                    if (response.data.data.is_admin) {
                        window.location = "../pagina-doctor/index.html"
                    } else {
                        window.location = "../Usuario_Pagina/index.html"
                    }                    
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

if (form) {
    form.addEventListener("submit", enviar_informacion)
} 



        