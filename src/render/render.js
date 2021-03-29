import {getImages} from '../api.js'
// obtengo todos los parametros/terminos de busqueda
let userSearch = document.getElementById('userSearch');
let orientation = document.getElementById('orientation');
let judgment = document.getElementById('judgment');
// el boton que activara la peticion a la API
let btnSearch = document.getElementById('btnSearch');
// tabla que mostrara las respuestas
const answerFromUserSearch = document.getElementById('contentAnswer')

// seteo un eventListener al botón.
btnSearch.addEventListener('click',makeRequest);

async function makeRequest(){
        if(userSearch.value == ''){
            alert('TIENES QUÉ LLENAR EL CAMPO DE BÚSQUEDA, DE LO CONTRARIO NO PODEMOS MOSTRARTE IMÁGENES.')
        }else{
            getImages(userSearch.value,orientation.value,judgment.value)
            .then(resHTTP => resHTTP.json())
            .then(resJSON => {
                    let nElementos = resJSON.hits.length;
                    if((nElementos-1) == 0){
                        alert('NUESTRO SERVICIO NO ENCONTRÓ NINGUNA COINCIDENCIA CON EL INPUT ESPECIFICADO');
                    }else{
                        //elimino posibles datos anteriores
                        answerFromUserSearch.innerHTML = '';
                        for(let i=0;i<nElementos;i++){
                            // recupero la data en cada position 'i' del array que me devuelven en la propiedad hits.
                            let type = resJSON.hits[i]['type'];
                            let tags = resJSON.hits[i]['tags'];
                            let user = resJSON.hits[i]['user'];
                            let views = resJSON.hits[i]['views'];
                            let downloads = resJSON.hits[i]['downloads'];
                            let picture = resJSON.hits[i]['largeImageURL']
                                //creo una fila para poner dicha data
                                 let tbody_ = document.createElement('tbody');
                                 tbody_.innerHTML += 
                                  `<tbody id=\"answerImages\">
                                        <tr scope=\"row\">
                                            <td style=\"text-alight=\'center\'\">
                                                <img src=\"${picture}\" width=\"400px\" heigth=\"200px\"> 
                                            </td>
                                            <td >
                                                <p>
                                                    <strong>AUTOR: </strong>${user} </br>
                                                    <strong>TIPO: </strong>${type} </br>
                                                    <strong>ETIQUETAS: </strong>${tags} </br>
                                                    <strong>VISTAS: </strong>${views} </br>
                                                    <strong>DESCARGAS: </strong>${downloads}
                                                </p>
                                            </td>
                                         <tr>
                                    </tbody>`
                                    //agrego la fila al tbody de la tabla.
                                    answerFromUserSearch.appendChild(tbody_); 
                        }
                    }
            })
            .catch(
                err => {
                    alert('HUBO UN ERROR EN LA RESPUESTA')
                    console.log(err)
                }
            )
        }
        
}

