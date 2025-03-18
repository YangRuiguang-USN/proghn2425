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

// Fonction pour l'exercice  - Découper le texte en mots et afficher dans un tableau
function exercice() {
    // Récupérer le texte saisi
    let texte = document.getElementById("texteExercice").value;
    
    // Découper le texte en mots
    let tokens = texte.split(" ");
    
    // Créer un tableau HTML
    let table = document.createElement("table");
    
    // Ajouter une bordure au tableau
    table.setAttribute("border", "1");
    
    // Utiliser forEach pour parcourir chaque mot
    tokens.forEach(mot => {
        // Créer une ligne pour chaque mot
        let row = document.createElement("tr");
        // Définir le contenu de la ligne
        row.innerHTML = mot;
        // Ajouter la ligne au tableau
        table.appendChild(row);
    });
    
    // Vider d'abord la zone de résultat
    let resultatDiv = document.getElementById("exerciceResultat");
    resultatDiv.innerHTML = "";
    
    // Ajouter le tableau à la zone de résultat
    resultatDiv.appendChild(table);
    
    // Ajouter une explication simple du code
    let explication = document.createElement("p");
    explication.innerHTML = "Explication : Ce code découpe le texte en mots avec split(\" \"), puis utilise forEach pour créer une ligne de tableau pour chaque mot.";
    resultatDiv.appendChild(explication);
}