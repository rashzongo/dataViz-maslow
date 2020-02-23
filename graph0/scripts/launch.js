import define from "./index.js";
import {Runtime, Library, Inspector} from "../libs/runtime.js";

let allCsv;
let runtime;

window.loadFile = function () {
    const csvFile = document.getElementById("csvFile").files[0];
    if (csvFile) {
        const filePath = '../common/data/' + csvFile.name;
        console.log('Loading file : ' + filePath);
        d3.csv(filePath).then(function (data, err) {
            allCsv = data;
            const sunburstData = generateData(data);
            if(sunburstData && sunburstData.length != 0) {
                [...document.getElementsByClassName("observablehq")].map(n => n && n.remove());
                runtime = new Runtime(Object.assign(new Library, {csvData: sunburstData}));
                const main = runtime.module(define, Inspector.into(document.body));
                document.getElementById('fileSelector').style.display = 'none';
                document.getElementById('filters').style.display = 'block';
            }
            else {
                noDataDisplay();
            }
        });
    }
}

function countCarNumber(csv, carBrand, carModel) {
    let nb = 0;
    for (let i = 0; i < csv.length; i++) {
        if(csv[i].marque === carBrand && csv[i].nom === carModel) {
            nb++;
        }
    }
    return nb;
}

function containsCar(data, carBrand, carModel) {
    for (let i = 0; i < data.length; i++) {
        if(data[i][0] === `${carBrand}|${carModel}`) {
            return true;
        }
    }
    return false;
}

function generateData(csv) {
    const data = [];
    for (let i = 0; i < csv.length; i++) {
        const line = csv[i];
        if(!containsCar(data, line.marque, line.nom)) {
            const nb =  countCarNumber(csv, line.marque, line.nom);
            data.push([`${line.marque}|${line.nom}`, nb]);
        }
    }
    return data;
}

window.rebuildSunburst = function() {
    console.log('Rebuilding graph...');
    [...document.getElementsByClassName("observablehq")].map(n => n && n.remove());
    const newData = generateData(filterData(allCsv));
    if(newData && newData.length != 0) {
        runtime = new Runtime(Object.assign(new Library, {csvData: newData}));
        const main = runtime.module(define, Inspector.into(document.body));
    }
    else {
        noDataDisplay();
    }
};

function noDataDisplay() {
    var newDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    var newContent = document.createTextNode('Aucun(e) résultat / donnée disponible');
    h2.appendChild(newContent);
    h2.style.color = 'red';
    newDiv.appendChild(h2);
    newDiv.className = 'observablehq';
    var filterDiv = document.getElementById('filters');
    filterDiv.after(newDiv);
}

function filterData(data) {
    const sexeFilter = getValue('sexe');
    const ageFilter = getValue('ageInterval');
    const mStatusFilter = getValue('maritalStatus');
    const tauxFilter = getValue('taux');
    const nbEnfantsFilter = getValue('nbEnfants');
    let result = data;
    if(sexeFilter) {
        switch(sexeFilter) {
            case '0':
                result = result.filter(element => element.sexe.toLowerCase() === 'f' 
                || element.sexe.toLowerCase() === 'femme'
                || element.sexe.toLowerCase() === 'feminin'
                );
                break;
            case '1':
                result = result.filter(element => element.sexe.toLowerCase() === 'm'
                    || element.sexe.toLowerCase() === 'masculin'
                    || element.sexe.toLowerCase() === 'homme'
                    || element.sexe.toLowerCase() === 'h'
                    );
                break;
            case '-1':
                result = result.filter(element => !element.sexe
                    || element.sexe.toLowerCase() === 'n/d'
                    || element.sexe === '?'
                );
                break;
            default:
                break;
        }
    }
    if(ageFilter) {
        switch(ageFilter) {
            case '0':
                result = result.filter(element => 
                    Number(element.age) >=  18 &&
                    Number(element.age) <=  30
                );
                break;
            case '1':
                result = result.filter(element => 
                    Number(element.age) >  30 &&
                    Number(element.age) <=  50
                );
                break;
            case '2':
                result = result.filter(element => 
                    Number(element.age) >  50 &&
                    Number(element.age) <=  70
                );
                break;
            case '3':
                result = result.filter(element => 
                    Number(element.age) > 70
                );
                break;
            case '-1':
                result = result.filter(element => !element.age
                    || element.age.toLowerCase() === 'n/d'
                    || element.age === '?'
                );
                break;
            default:
                break;
        }
    }
    if(mStatusFilter) {
        switch(mStatusFilter) {
            case '0':
                result = result.filter(element => 
                    element.situationFamiliale.toLowerCase() === 'célibataire' 
                    || element.situationFamiliale.toLowerCase() === 'c�libataire'
                    || element.situationFamiliale.toLowerCase() === 'seul'
                    || element.situationFamiliale.toLowerCase() === 'seule'
                    || element.situationFamiliale.toLowerCase() === 'seul(e)'
                );
                break;
            case '1':
                result = result.filter(element => element.situationFamiliale.toLowerCase() === 'en couple'
                    || element.situationFamiliale.toLowerCase() === 'encouple'
                    );
                break;
            case '2':
                result = result.filter(element => 
                    element.situationFamiliale.toLowerCase() === 'marié(e)'
                    || element.situationFamiliale.toLowerCase() === 'marié'
                    || element.situationFamiliale.toLowerCase() === 'mariée'
                    || element.situationFamiliale.toLowerCase() === 'mari�(e)'
                    || element.situationFamiliale.toLowerCase() === 'mari�'
                    || element.situationFamiliale.toLowerCase() === 'mari�e'
                );
                break;
            case '3':
                result = result.filter(element => 
                    element.situationFamiliale.toLowerCase() === 'divorcé(e)' 
                    || element.situationFamiliale.toLowerCase() === 'divorcé'
                    || element.situationFamiliale.toLowerCase() === 'divorcée'
                    || element.situationFamiliale.toLowerCase() === 'divorc�(e)'
                    || element.situationFamiliale.toLowerCase() === 'divorc�'
                    || element.situationFamiliale.toLowerCase() === 'divorc�e'
                );
                break;
            case '-1':
                result = result.filter(element => !element.situationFamiliale
                    || element.situationFamiliale.toLowerCase() === 'n/d'
                    || element.situationFamiliale.toLowerCase() === '?'
                );
                break;
            default:
                break;
        }
    }
    if(tauxFilter) {
        switch(tauxFilter) {
            case '0':
                result = result.filter(element => 
                    Number(element.taux) <= 100
                );
                break;
            case '1':
                result = result.filter(element => 
                    Number(element.taux) >  100 &&
                    Number(element.taux) <=  500
                );
                break;
            case '2':
                result = result.filter(element => 
                    Number(element.taux) >  500 &&
                    Number(element.taux) <=  1000
                );
                break;
            case '3':
                result = result.filter(element => 
                    Number(element.taux) > 1000
                );
                break;
            case '-1':
                result = result.filter(element => !element.taux
                    || element.taux.toLowerCase() === 'n/d'
                    || element.taux === '?'
                );
                break;
            default:
                break;
        }
    }
    if(nbEnfantsFilter) {
        switch(nbEnfantsFilter) {
            case '0':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 0
                );
                break;
            case '1':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 1
                );
                break;
            case '2':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 2
                );
                break;
            case '3':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 3
                );
                break;
            case '4':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 4
                );
                break;
            case '5':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) === 5
                );
                break;
            case '6':
                result = result.filter(element => 
                    Number(element.nbEnfantsAcharge) > 5
                );
                break;
            case '-1':
                result = result.filter(element => !element.nbEnfantsAcharge
                    || element.nbEnfantsAcharge.toLowerCase() === 'n/d'
                    || element.nbEnfantsAcharge === '?'
                );
                break;
            default:
                break;
        }
    }
    console.log(result);
    return result;
}

function getValue(selector) {
    const d = document.getElementById(selector).value;
    return d;
}