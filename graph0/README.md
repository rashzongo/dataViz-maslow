# Univeristé Nice Cote d'Azur - Master 2 MBDS
## Data Visualization
### Groupe 2 MASLOW
#### Autheur : Rachida ZONGO S. H.

### Description
Graphe réprésentant le pourcentages de ventes des marques et modèles de véhicules suivant les critères sociaux des acheteurs sous forme de camembert multidimensionnel.
Inspiré de https://bl.ocks.org/kerryrodden/7090426

1. Parcours du fichiers csv afin :
    - Filter les données du csv suivant les filtres choisis par l'utilisateur
    - Revéler les différentes modèles de véhicules présents dans les données filtrées
    - Compter le nombre d'occurences de chaque modèle de véhicule
    - Construire un mapping `marque|modèle` avec le nombre de ventes du modèle
2. Construction d'un modèle hiérarchique regroupant les différents modèles par marque : on a ainsi le nombre de ventes des marques
3. Construction du graphe avec :
    - En base (ars interieurs) les marques selon leurs pourcentages de ventes
    - Sur les arcs exterieurs les modèles de véhicules et leur pourcetage de ventes