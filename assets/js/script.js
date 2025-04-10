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

// Code ajouté depuis code.js
window.onload = function() {
    let fileInput = document.getElementById('fileInputReader');
    let fileContent = document.getElementById('fileContent');
    let logger = document.getElementById('logger');

    // On "écoute" si le fichier donné a été modifié.
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            let file = fileInput.files[0];
            let textType = new RegExp("text.*");

            if (file.type.match(textType)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    fileContent.innerText = reader.result;
                }
                reader.readAsText(file);    
                if (logger) {
                    logger.innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
                }
            } else {
                fileContent.innerText = "";
                if (logger) {
                    logger.innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
                }
            }
        });
    }
}

// Fonction de segmentation simple avec uniquement la virgule comme délimiteur
function segmentation() {
    let fileContent = document.getElementById('fileContent');
    let pageAnalysis = document.getElementById('page-analysis');
    
    // Récupérer le contenu du fichier
    let content = fileContent.innerText;
    
    if (!content) {
        alert("Veuillez d'abord charger un fichier.");
        return;
    }
    
    // Utiliser la virgule comme délimiteur
    let segments = content.split(",");
    
    // Créer le tableau des résultats
    let table = document.createElement('table');
    table.setAttribute('border', '1');
    
    // En-tête du tableau
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let thIndex = document.createElement('th');
    thIndex.textContent = 'Index';
    let thSegment = document.createElement('th');
    thSegment.textContent = 'Segment';
    
    headerRow.appendChild(thIndex);
    headerRow.appendChild(thSegment);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Corps du tableau
    let tbody = document.createElement('tbody');
    segments.forEach((segment, index) => {
        let row = document.createElement('tr');
        
        let tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        
        let tdSegment = document.createElement('td');
        tdSegment.textContent = segment.trim();
        
        row.appendChild(tdIndex);
        row.appendChild(tdSegment);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Afficher le résultat
    pageAnalysis.innerHTML = '';
    pageAnalysis.appendChild(table);
    
    // Ajouter un résumé
    let summary = document.createElement('p');
    summary.innerHTML = `<strong>Nombre total de segments:</strong> ${segments.length}`;
    pageAnalysis.appendChild(summary);
}