
const form = document.getElementById('form-client');

var user = localStorage.getItem('user');
user = JSON.parse(user);

if (!user || !user.token) {
    window.location = "../landing-veterinaria/index.html"
} else {
    if(!user.is_admin) {
        window.location = "../Usuario_Pagina/index.html"
    }


    loadData = (e) => {
        e.preventDefault();
        const identification = document.getElementById('numero-identificacion2');
        console.log(identification.value);
        if (identification.value.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Necesita llenar la cedula",
                text: "Por favor llene la cedula"
            })
        } else {

            const config = {
                headers: {Authorization: `Bearer ${user.token}`}
            }

            axios.get('http://localhost:3000/pets/list?identification=' + identification.value, config).then((res) => {
                
                const tbodyRef = document.getElementById('mascotas-datos-tabla').getElementsByTagName('tbody')[0];
                tbodyRef.innerHTML = "";
                if (res.data.success) {
                    
                    res.data.data.forEach((pet) => {
                        console.log(pet);
                        
                        newRow = tbodyRef.insertRow();
                        nameCell = newRow.insertCell();
                        nameCell.innerHTML = pet.name;
        
                        allergiesCell = newRow.insertCell();
                        allergiesCell.innerHTML = pet.allergies;
        
                        notesCell = newRow.insertCell();
                        notesCell.innerHTML = pet.notes;
        
                        birthdayCell = newRow.insertCell();
                        birthdayCell.innerHTML = pet.birthday;
        
                        addressCell = newRow.insertCell();
                        addressCell.innerHTML = pet.address;
        
                        const petsRef = document.getElementById('userPets')
                        if (petsRef) petsRef.innerHTML = res.data.data.length;
                                
                    })      
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Ocurrio un error",
                        text: res.data.error
                    })
                }

           
        });

        axios.get('http://localhost:3000/payments/list?identification=' + identification.value, config).then((res) => {
        console.log(res);
        const tbodyRef = document.getElementById('tabla-metodos').getElementsByTagName('tbody')[0];
            tbodyRef.innerHTML = "";
        res.data.data.forEach((payment) => {
            console.log(payment);            
            newRow = tbodyRef.insertRow();
            cardNameCell = newRow.insertCell();
            cardNameCell.innerHTML = payment.cardName;

            cardNumberCell = newRow.insertCell();
            cardNumberCell.innerHTML = payment.cardNumber;

            expirationNumberCell = newRow.insertCell();
            expirationNumberCell.innerHTML = payment.expirationNumber;


        })

        axios.get('http://localhost:3000/auth/get?identification=' + identification.value, config).then((res) => {
        console.log(res);
        
        if (res.data.success) {
            console.log("adding user stuff")
            const nameRef = document.getElementById('userName')
            if (nameRef) nameRef.innerHTML = res.data.data.name;

            const emailRef = document.getElementById('userEmail')
            if (emailRef) emailRef.innerHTML = res.data.data.email;            
            
            const identificationRef = document.getElementById('userIdentification')
            if (identificationRef) identificationRef.innerHTML = res.data.data.identification;

            const addressRef = document.getElementById('userAddress')
            if (addressRef) addressRef.innerHTML = res.data.data.address;    

        } else {
            Swal.fire({
                icon: "warning",
                title: "Ocurrio un error",
                text: res.data.error
            })
        }
    });
        
    });
    }
}

    if (form) {
        console.log('Activated form');
        form.addEventListener('submit', loadData)
    }

    
}