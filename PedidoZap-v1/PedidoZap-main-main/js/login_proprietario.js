// FIREBASE
import { initializeApp }
from "";

import {

    getAuth,

    signInWithEmailAndPassword,

    sendPasswordResetEmail,

    onAuthStateChanged,

    signOut

}
from "";



// CONFIG FIREBASE
const firebaseConfig = {

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};



// INICIA FIREBASE
const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);





// LOGIN
const loginForm =
    document.getElementById("loginForm");



if(loginForm){

    loginForm.addEventListener(
        "submit",
        async (e) => {

        e.preventDefault();



        // CAMPOS
        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;



        try {

            // LOGIN
            await signInWithEmailAndPassword(

                auth,

                email,

                senha

            );



            // VERIFICA PRIMEIRO LOGIN
            const primeiroAcesso =
                localStorage.getItem(

                    "primeiroAcesso_" + email

                );



            // PRIMEIRO ACESSO
            if(!primeiroAcesso){

                // SALVA
                localStorage.setItem(

                    "primeiroAcesso_" + email,

                    "true"

                );



                // ESPERA UM POUCO
                setTimeout(async () => {

                    try {

                        // ENVIA EMAIL
                        await sendPasswordResetEmail(

                            auth,

                            email

                        );



                        alert(

                            "Primeiro acesso detectado.\n\n" +

                            "Um email foi enviado para redefinir sua senha."

                        );

                    }

                    catch(error){

                        console.log(error);

                    }

                }, 2000);

            }



            // REDIRECIONA
            window.location.href =
                "pagina_proprietario.html";

        }

        catch(error){

            alert("Email ou senha inválidos.");

            console.log(error);

        }

    });

}





// RESET MANUAL
const resetSenha =
    document.getElementById("resetSenha");



if(resetSenha){

    resetSenha.addEventListener(
        "click",
        async () => {

        const email =
            document.getElementById("email").value;



        // SEM EMAIL
        if(!email){

            alert("Digite seu email.");

            return;

        }



        try{

            // ENVIA EMAIL
            await sendPasswordResetEmail(

                auth,

                email

            );



            alert(

                "Email de redefinição enviado."

            );

        }

        catch(error){

            alert(

                "Erro ao enviar email."

            );



            console.log(error);

        }

    });

}





// PROTEÇÃO DE ROTA
onAuthStateChanged(auth, (user) => {

    const paginaAtual =
        window.location.pathname;



    // SE NÃO ESTIVER LOGADO
    if(

        !user &&

        paginaAtual.includes(
            "pagina_proprietario.html"
        )

    ){

        window.location.href =
            "login_proprietario.html";

    }

});





// LOGOUT
window.logout = async function(){

    try{

        await signOut(auth);



        window.location.href =
            "login_proprietario.html";

    }

    catch(error){

        console.log(error);

    }

};
