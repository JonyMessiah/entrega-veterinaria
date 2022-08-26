var user = localStorage.getItem('user');
user = JSON.parse(user);

if (!user || !user.token) {
    window.location = "../landing-veterinaria/index.html"
} else {

    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    }

    // Loading pets


    
    axios.get('http://localhost:3000/pets/list', config).then((res) => {
        console.log(res);
        res.data.data.forEach((pet) => {
            console.log(pet);
            const tbodyRef = document.getElementById('mascotas-datos-tabla').getElementsByTagName('tbody')[0];
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
        
    });

    // Load metodos de pago

    axios.get('http://localhost:3000/payments/list', config).then((res) => {
        console.log(res);
        res.data.data.forEach((payment) => {
            console.log(payment);
            const tbodyRef = document.getElementById('tabla-metodos').getElementsByTagName('tbody')[0];
            newRow = tbodyRef.insertRow();
            cardNameCell = newRow.insertCell();
            cardNameCell.innerHTML = payment.cardName;

            cardNumberCell = newRow.insertCell();
            cardNumberCell.innerHTML = payment.cardNumber;

            expirationNumberCell = newRow.insertCell();
            expirationNumberCell.innerHTML = payment.expirationNumber;


        })
        
    });

    // Load user

    axios.get('http://localhost:3000/auth/me', config).then((res) => {
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

        }
    });
        

}


