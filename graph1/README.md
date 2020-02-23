tous les fichiers csv et json doivent être dans ./common/data/

realisation d'une visualisation des données en utilisant en d3js.

le fichier csv qui contient la joiture en client et immatriculation est fait par R,
le header doit etre sous la forme :
age,sexe,taux,situationFamiliale,nbEnfantsAcharge,2eme voiture,immatriculation,immatriculation,marque,nom,puissance,longueur,nbPlaces,nbPortes,couleur,occasion,prix

la creation du fichier json qui contient les données a visualisé est sous cette structure :

{
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
}

la creation de ce fichier est faite en js.

le graphe que j'ai fait est sous forme d'une tree ou arbre , il presente les deuxiemes voitures achete selon critere des clients (age, sexe, situation et le nombre d'enfants).

projet fait par aayadi el mehdi.