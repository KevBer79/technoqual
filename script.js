// Fonction pour démarrer le décompte de 20 minutes
function startCountdown(durationInMinutes) {
    let timerElement = document.getElementById("timer");
    let timeLeft = durationInMinutes * 60; // Convertir minutes en secondes

    let countdownInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Formatage de l'affichage (ex : 05:09)
        let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timerElement.textContent = `⏳ Temps restant : ${formattedTime} ⏳`;

       if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = "⏳ Temps écoulé ⏳!";
            afficherMessageErreur("Temps écoulé. On dirait que vous avez été un peu trop lents... ");

            // ▶️ Lecture de l’alarme
            let alarme = document.getElementById("alarmeAudio");
            if (alarme) {
                alarme.play().catch(e => {
                    console.error("Erreur lors de la lecture de l'alarme :", e);
                });
            }
        }

        timeLeft--; // Réduction du temps restant
    }, 1000); // Mettre à jour toutes les secondes
}

// Fonction pour afficher une image
function afficherImage() {
    let inputField = document.getElementById("inputText");
    let mot = inputField.value.toLowerCase();

    let images = {
        "Développement microbiologique": "images/Microbio.png",
        "développement microbiologique": "images/Microbio.png",
        "Developpement microbiologique": "images/Microbio.png",
        "developpement microbiologique": "images/Microbio.png",
        "encre": "images/Chimique.png",
        "Encre": "images/Chimique.png",
        "soja": "images/Allergène.png",
        "Soja": "images/Allergène.png",
        "Bois": "images/Physique.png",
        "bois": "images/Physique.png"
    };

    if (images[mot]) {
        console.log("Redirection vers : image.html?src=" + encodeURIComponent(images[mot]));
        window.location.href = "image.html?src=" + encodeURIComponent(images[mot]);
    } else {
        let messagesErreur = [
            "Oups ! On dirait que vous avez raté quelque chose...",
            "Ce n'est pas le code. Mais ne vous inquiétez pas, même les meilleurs se trompent !",
            "Mauvaise pioche ! Heureusement, vous avez encore des essais...",
            "Essaye encore !!!",
            "Votre code ne fonctionne pas… Vous avez peut-être trop mangé de croissants ? "
        ];
        let messageAleatoire = messagesErreur[Math.floor(Math.random() * messagesErreur.length)];
        afficherMessageErreur(messageAleatoire);
    }

    // Effacer le champ après la recherche
    inputField.value = "";
}

// Fonction pour afficher un message d'erreur en plein écran
function afficherMessageErreur(message) {
    let erreurDiv = document.createElement("div");
    erreurDiv.className = "erreur-fullscreen";
    erreurDiv.innerHTML = `
        <div class="erreur-content">
            <p>${message}</p>
            <button onclick="fermerMessageErreur()">RETOUR</button>
        </div>
    `;
    document.body.appendChild(erreurDiv);
}

// Fonction pour fermer le message d'erreur
function fermerMessageErreur() {
    let erreurDiv = document.querySelector(".erreur-fullscreen");
    if (erreurDiv) {
        erreurDiv.remove();
    }
}

// Démarrer le décompte quand la page est chargée
window.onload = function () {
    startCountdown(12); // Lance le compte à rebours de 15 minutes
};
