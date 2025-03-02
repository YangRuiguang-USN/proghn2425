// Fonction pour demander le nom et afficher un message de bienvenue
function demanderNom() {
    // Récupérer le nom saisi
    let nom = document.getElementById("nomUtilisateur").value;
    
    // Créer une boîte de dialogue
    let boiteDialogue = document.createElement("div");
    boiteDialogue.className = "boite-dialogue";
    boiteDialogue.innerHTML = `
        <div class="boite-contenu">
            <span class="titre-dialogue">file://</span>
            <p>Bonjour ${nom} !</p>
            <button id="boutonOk" class="bouton-ok">OK</button>
        </div>
    `;
    
    // Ajouter la boîte de dialogue à la page
    document.body.appendChild(boiteDialogue);
    
    // Ajouter un événement au bouton OK
    document.getElementById("boutonOk").addEventListener("click", function() {
        boiteDialogue.remove();
    });
}

// Variable pour suivre l'état de la section d'aide
let aideVisible = false;

// Fonction pour afficher ou cacher l'aide
function toggleAide() {
    // Récupérer la section d'aide
    let sectionAide = document.getElementById("sectionAide");
    let boutonAide = document.getElementById("boutonAide");
    
    // Changer l'affichage
    if (aideVisible) {
        sectionAide.style.display = "none";
        boutonAide.textContent = "Afficher l'aide";
    } else {
        sectionAide.style.display = "block";
        boutonAide.textContent = "Cacher l'aide";
    }
    
    // Inverser l'état
    aideVisible = !aideVisible;
}

// Fonction pour la sélection de fichier - modifiée pour activer le fichier input caché
function selectionnerFichier() {
    // Cliquer sur l'input de fichier caché
    document.getElementById("fichierInput").click();
}

// Fonction pour mettre à jour l'affichage du nom de fichier
function mettreAJourNomFichier() {
    // Récupérer les éléments
    let fichierInput = document.getElementById("fichierInput");
    let messageSelection = document.getElementById("messageSelection");
    
    // Afficher le nom du fichier ou un message
    if (fichierInput.files.length > 0) {
        messageSelection.textContent = fichierInput.files[0].name;
    } else {
        messageSelection.textContent = "Aucun fichier sélectionné.";
    }
}

// Initialiser les éléments au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    // Cacher la section d'aide au démarrage
    let sectionAide = document.getElementById("sectionAide");
    sectionAide.style.display = "none";
    
    // Ajouter des événements aux boutons
    let boutonBonjour = document.getElementById("boutonBonjour");
    boutonBonjour.addEventListener("click", demanderNom);
    
    let boutonAide = document.getElementById("boutonAide");
    boutonAide.addEventListener("click", toggleAide);
    
    // Pour le fichier input, utiliser l'événement 'change' au lieu du onclick
    let fichierInput = document.getElementById("fichierInput");
    fichierInput.addEventListener("change", mettreAJourNomFichier);
    
    // S'assurer que le message de sélection est initialisé
    document.getElementById("messageSelection").textContent = "Aucun fichier sélectionné.";
});