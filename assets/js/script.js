// Fonction pour afficher ou cacher l'aide
function ShowHideHelp() {
    let helpZone = document.getElementById("help-placeholder");
    let helpButton = document.getElementById("help-button");
    let contenu = "";
    let texteBouton = "";
    
    if (helpZone.innerHTML === "") {
        contenu += "<h3>Aide</h3>";
        contenu += "<p>Ici, on va afficher l'aide.</p>";
        texteBouton = "Cacher l'aide";
    } else {
        texteBouton = "Afficher l'aide";
    }
    
    helpZone.innerHTML = contenu;
    helpButton.innerHTML = texteBouton;
}

// Fonction pour demander le nom et afficher un message de bienvenue
function demanderNom() {
    // Récupérer le nom saisi
    let nom = document.getElementById("bonjour-form-nom").value;
    
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


// Fonction lireFichier d'après l'image originale, mais adaptée pour fonctionner avec onchange
function lireFichier() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    
    let file = fileInput.files[0];
    let textType = /text.*/;
    
    if (file.type.match(textType)) {
        let reader = new FileReader();
        reader.onload = function(e) { fileDisplayArea.innerText = reader.result; }
        reader.readAsText(file);
    } else {
        alert("File not supported!");
    }
}

