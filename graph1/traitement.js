var filecsv_name;
var filejson_name;

function switchEntreDiv(identifiant_de_ma_div) {

    if (identifiant_de_ma_div == 'filescsv') {
        document.getElementById('filescsv').style.display = 'block';
        document.getElementById('filesjson').style.display = 'none';
        document.getElementById('graphe').style.display = 'none';
    } else if (identifiant_de_ma_div == 'filesjson') {
        document.getElementById('filescsv').style.display = 'none';
        document.getElementById('filesjson').style.display = 'block';
        document.getElementById('graphe').style.display = 'none';
    } if (identifiant_de_ma_div == 'graphe') {
        document.getElementById('filescsv').style.display = 'none';
        document.getElementById('filesjson').style.display = 'none';
        document.getElementById('graphe').style.display = 'block';
    }

}

async function check_input(type) {
    var text = document.getElementById(type + '$');
    var file = document.getElementById(type);
    var value = file.value;
    console.log(value);
    text.style.color = 'red';
    if (value != '') {
        if (type == 'upload_csv') {
            var regex = /.(csv)$/i;
            if (!regex.test(value))
                text.innerHTML = 'La forme du fichier n\'est pas correcte !';
            else {
                text.innerHTML = '';
                filecsv_name = value.replace(/^.*[\\\/]/, '');
                await lancerTraitementCreationJSON();
                switchEntreDiv('filesjson');
            }
        }

        if (type == 'upload_json') {
            var regex = /.(json)$/i;
            if (!regex.test(value))
                text.innerHTML = 'La forme du fichier n\'est pas correcte !';
            else {
                text.innerHTML = '';
                filejson_name = value.replace(/^.*[\\\/]/, '');
                await lancerTraitementCreationArbre();
                switchEntreDiv('graphe');
            }
        }
    } else if (value == '')
        text.innerHTML = '';
}

function lancerTraitementCreationJSON() {
    try {
        return new Promise(x => {
            console.log(filecsv_name);
            var a = new csvTojson('../common/data/' + filecsv_name);
            a.Main();
            x("json")
        });
    }
    catch (error) {
        alert("Probleme au niveau de la génération fichier Json")
    }
}

function lancerTraitementCreationArbre() {
    try {
        return new Promise(x => {
            console.log(filejson_name)
            var b = new tree('../common/data/' + filejson_name);
            b.Main();
            x("arbre")
        });
    }
    catch (error) {
        alert("Probleme au niveau de la création table")
    }
}


// return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });