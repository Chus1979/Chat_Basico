const textoHTML = document.querySelector('#texto');
const listadoHTML = document.querySelector('div#listado');
const enviarHTML = document.querySelector('#enviar');
const borrarHTML = document.querySelector('#borrar');
//const mongoURL = 'mongodb://localhost:27017/chatBasico';
enviarHTML.onclick = ()=>{getNuevo(textoHTML)};
borrarHTML.onclick = borrar;

async function borrar(){
    //if (on.click='enviar'){
        textoHTML.value = "";
    //}else if(on.click='borrar'){
       
}

async function actualizaHTML (listaTextos) {
    listadoHTML.innerText = '';
    for ( let texto of listaTextos){
        var div =  document.createElement('div')
        var button = document.createElement('button')
        var p = document.createElement('p')
        div.appendChild(p);
        div.appendChild(button);
        p.innerText = texto.txt;
        button.innerText = "Borrar"
        button.onclick = ()=>{eliminarTexto(texto._id)};
        /*if(button.onclick && (p.lengh==button.lengh)){
                textoHTML.value = '';
        };*/
        listadoHTML.appendChild(div);
    }
    //window.alert('texto actualizado');
    borrar();
}

async function eliminarTexto (id) {
    //window.alert(id)
    var getEliminarURL = `http://localhost:3000/borrar/?id=${id}`;
    var resp = await fetch(getEliminarURL);
    var listaTextos = await resp.json();
    window.alert(`${id} se ha eliminado correctamente`);
    actualizaHTML(listaTextos);    
}

async function getNuevo(textoHTML){
    var getNuevoURL = `http://localhost:3000/nuevo/?texto=${textoHTML.value}`;
    var resp = await fetch(getNuevoURL);
    var listaTextos = await resp.json();

    actualizaHTML(listaTextos);
    
    /*for ( let texto of listaTextos){
        var div =  document.createElement('div')
        var button = document.createElement('button')
        var p = document.createElement('p')
        div.appendChild(p);
        div.appendChild(button);
        p.innerText = texto.txt;
        button.innerText = "Borrar"
        button.onclick = ()=>{eliminarTexto(texto._id)};
        listadoHTML.appendChild(div);
    }
    borrar();
    //textoHTML.value = "";*/
}

async function getListado(){
    var getListadoURL = 'http://localhost:3000/listado/';
    var resp = await fetch(getListadoURL);
    var listaTextos = await resp.json();
    actualizaHTML(listaTextos);
}

getListado()