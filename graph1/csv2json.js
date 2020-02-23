// traitemnet pour convertir file csv en json 
// suivant une propre structure 
// {
//     "name": "Top Level",
//     "children": [
//       { 
//         "name": "Level 2: A",
//         "children": [
//           { "name": "Son of A" },
//           { "name": "Daughter of A" }
//         ]
//       },
//       { "name": "Level 2: B" }
//     ]
// }

function csvTojson(file) {

    let age_11_20 = new Array();
    let age_21_30 = new Array();
    let age_31_40 = new Array();
    let age_41_50 = new Array();
    let age_51_60 = new Array();
    let age_61_70 = new Array();
    let age_71_80 = new Array();
    let age_81_90 = new Array();
    let age_91_100 = new Array();
    let sexe_m = new Array();
    let sexe_f = new Array();
    let situation_couple = new Array();
    let situation_celibaire = new Array();
    let situation_divorcee = new Array();
    let situation_seul = new Array();
    let situation_marie = new Array();
    let enfant_0 = new Array();
    let enfant_1 = new Array();
    let enfant_2 = new Array();
    let enfant_3 = new Array();
    let enfant_4 = new Array();
    let result_json;

    this._file = file;

    this.Main = function () {
        console.log("start convert csv to json");
        console.log(this._file);

        // convert csv to json pour bien faire mon arbre
        d3.csv(this._file).then(function (data, err) {
            data.forEach(function (element) {
                ClassificationDonnees(element);
            });

            // for (let i = 0; i < data.length; i++) {
            //     ClassificationDonnees(data[i]);
            // }

            console.log("End Classif");

            // suppression des doublons en chaque tableau
            console.log("Suppression doublons de chaque tableau")
            age_11_20 = removeDuplicates(age_11_20);
            age_21_30 = removeDuplicates(age_21_30);
            age_31_40 = removeDuplicates(age_31_40);
            age_41_50 = removeDuplicates(age_41_50);
            age_51_60 = removeDuplicates(age_51_60);
            age_61_70 = removeDuplicates(age_61_70);
            age_71_80 = removeDuplicates(age_71_80);
            age_81_90 = removeDuplicates(age_81_90);
            age_91_100 = removeDuplicates(age_91_100);
            sexe_m = removeDuplicates(sexe_m);
            sexe_f = removeDuplicates(sexe_f);
            situation_couple = removeDuplicates(situation_couple);
            situation_celibaire = removeDuplicates(situation_celibaire);
            situation_divorcee = removeDuplicates(situation_divorcee);
            situation_seul = removeDuplicates(situation_seul);
            situation_marie = removeDuplicates(situation_marie);
            enfant_0 = removeDuplicates(enfant_0);
            enfant_1 = removeDuplicates(enfant_1);
            enfant_2 = removeDuplicates(enfant_2);
            enfant_3 = removeDuplicates(enfant_3);
            enfant_4 = removeDuplicates(enfant_4);

            creationDuJson();

        });
    }

    function ClassificationDonnees(d) {
        console.log("start classification");

        // si j'augmente les condition puissance ... il y aura trop de resultat à afficher en arbre meme en cas de suppression de doublon en obtien 283 element en tableau
        // j'ai evite tt cela afin de ne pas trop charge mon diagramme de viz
        // age: d.age, occasion: d.occasion ,  puissance: d.puissance, longueur: d.longueur, nbPlaces: d.nbPlaces, nbPortes: d.nbPortes, couleur: d.couleur,

        if ((parseInt(d.age, 10) >= 11) && (parseInt(d.age, 10) <= 20) && (d["2eme voiture"] == "true")) {
            age_11_20.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 21) && (parseInt(d.age, 10) <= 30) && (d["2eme voiture"] == "true")) {
            age_21_30.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 31) && (parseInt(d.age, 10) <= 40) && (d["2eme voiture"] == "true")) {
            age_31_40.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 41) && (parseInt(d.age, 10) <= 50) && (d["2eme voiture"] == "true")) {
            age_41_50.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 51) && (parseInt(d.age, 10) <= 60) && (d["2eme voiture"] == "true")) {
            age_51_60.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 61) && (parseInt(d.age, 10) <= 70) && (d["2eme voiture"] == "true")) {
            age_61_70.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 71) && (parseInt(d.age, 10) <= 80) && (d["2eme voiture"] == "true")) {
            age_71_80.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 81) && (parseInt(d.age, 10) <= 90) && (d["2eme voiture"] == "true")) {
            age_81_90.push({ marque: d.marque, nom: d.nom });
        } else if ((parseInt(d.age, 10) >= 91) && (parseInt(d.age, 10) <= 100) && (d["2eme voiture"] == "true")) {
            age_91_100.push({ marque: d.marque, nom: d.nom });
        }

        if ((d.sexe.substring(0, 1).toUpperCase() == "M") && (d["2eme voiture"] == "true")) {
            sexe_m.push({ marque: d.marque, nom: d.nom });
        } else if ((d.sexe.substring(0, 1).toUpperCase() == "F") && (d["2eme voiture"] == "true")) {
            sexe_f.push({ marque: d.marque, nom: d.nom });
        }

        if ((d.situationFamiliale.substring(0, 1).toUpperCase() == "E") && (d["2eme voiture"] == "true")) {
            situation_couple.push({ marque: d.marque, nom: d.nom });
        } else if ((d.situationFamiliale.substring(0, 1).toUpperCase() == "C") && (d["2eme voiture"] == "true")) {
            situation_celibaire.push({ marque: d.marque, nom: d.nom });
        } else if ((d.situationFamiliale.substring(0, 1).toUpperCase() == "D") && (d["2eme voiture"] == "true")) {
            situation_divorcee.push({ marque: d.marque, nom: d.nom });
        } else if ((d.situationFamiliale.substring(0, 1).toUpperCase() == "S") && (d["2eme voiture"] == "true")) {
            situation_seul.push({ marque: d.marque, nom: d.nom });
        } else if ((d.situationFamiliale.substring(0, 1).toUpperCase() == "M") && (d["2eme voiture"] == "true")) {
            situation_marie.push({ marque: d.marque, nom: d.nom });
        }

        if ((d.nbEnfantsAcharge == "0") && (d["2eme voiture"] == "true")) {
            enfant_0.push({ marque: d.marque, nom: d.nom });
        } else if ((d.nbEnfantsAcharge == "1") && (d["2eme voiture"] == "true")) {
            enfant_1.push({ marque: d.marque, nom: d.nom });
        } else if ((d.nbEnfantsAcharge == "2") && (d["2eme voiture"] == "true")) {
            enfant_2.push({ marque: d.marque, nom: d.nom });
        } else if ((d.nbEnfantsAcharge == "3") && (d["2eme voiture"] == "true")) {
            enfant_3.push({ marque: d.marque, nom: d.nom });
        } else if ((d.nbEnfantsAcharge == "4") && (d["2eme voiture"] == "true")) {
            enfant_4.push({ marque: d.marque, nom: d.nom });
        }

    }

    function creationDuJson() {
        console.log("creation json");

        result_json = '{ "name" : "Clients" , "children": [ ' +
            creationStringAge() +
            creationStringSexe() +
            creationStringSituation() +
            CreationStringEnfants() + '] }';

        download(result_json, "./TreeData.json", "text/json");
    }

    function creationStringAge() {

        var result = '{ "name": "Age", "children": [';

        result += ' { "name": "11-20", "children": [ ';
        age_11_20.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "21-30", "children": [ ';
        age_21_30.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "31-40", "children": [ ';
        age_31_40.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "41-50", "children": [ ';
        age_41_50.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "51-60", "children": [ ';
        age_51_60.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "61-70", "children": [ ';
        age_61_70.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "71-80", "children": [ ';
        age_71_80.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "81-90", "children": [ ';
        age_81_90.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "91-100", "children": [ ';
        age_91_100.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);

        result += ']}';
        result += ']},';

        return result;
    }

    function creationStringSexe() {
        var result = '{ "name": "Sexe", "children": [';

        result += ' { "name": "M", "children": [ ';
        sexe_m.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "F", "children": [ ';
        sexe_f.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']}';
        result += ']},';
        return result;
    }

    function creationStringSituation() {
        var result = '{ "name": "Situation", "children": [';

        result += ' { "name": "Couple", "children": [ ';
        situation_couple.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "Célibataire", "children": [ ';
        situation_celibaire.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "Divorcé", "children": [ ';
        situation_divorcee.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "Seul", "children": [ ';
        situation_seul.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "Marié", "children": [ ';
        situation_marie.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']}';

        result += ']},';
        return result;
    }

    function CreationStringEnfants() {
        var result = '{ "name": "Enfants", "children": [';

        result += ' { "name": "0", "children": [ ';
        enfant_0.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "1", "children": [ ';
        enfant_1.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "2", "children": [ ';
        enfant_2.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "3", "children": [ ';
        enfant_3.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']},';

        result += ' { "name": "4", "children": [ ';
        enfant_4.forEach(element => {
            result += '{ "name" : "' + element.marque + ' ' + element.nom + '"},';
        });
        result = result.substring(result.length - 1, 0);
        result += ']}';

        result += ']}';
        return result;
    }

    function download(content, fileName, contentType) {
        console.log("dwnd");
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        console.log("save document");
    }

    function removeDuplicates(tab) {
        const uniqueArray = tab.filter((val, index) => {
            return index === tab.findIndex(obj => {
                return JSON.stringify(obj) === JSON.stringify(val);
            });
        });
        return uniqueArray;
    }


}

// voir comment faire pour ecriture json avant 
// var obj = JSON.parse(string);
// document.getElementById("sum").innerHTML = result_json;