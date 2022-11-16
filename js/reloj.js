let reloj = 0;
let frecuencia = 1000;

function actualizaReloj() {
  let ahora = new Date();
  let fecha = ahora.getDate() + "-" + (ahora.getMonth() + 1) + "-" + ahora.getFullYear();
  let horas= ahora.getHours();
  let minutos=ahora.getMinutes();
  let segundos=ahora.getSeconds();

  switch(segundos){
    case 0: segundos="00";
    break;
    case 1: segundos="01";
    break;
    case 2: segundos="02";
    break;
    case 3: segundos="03";
    break;
    case 4: segundos="04";
    break;
    case 5: segundos="05";
    break;
    case 6: segundos="06";
    break;
    case 7: segundos="07";
    break;
    case 8: segundos="08";
    break;
    case 9: segundos="09";
    break;
    default: segundos=ahora.getSeconds();
    break;
  }
  switch(minutos){
    case 0: minutos="00";
    break;
    case 1: minutos="01";
    break;
    case 2: minutos="02";
    break;
    case 3: minutos="03";
    break;
    case 4: minutos="04";
    break;
    case 5: minutos="05";
    break;
    case 6: minutos="06";
    break;
    case 7: minutos="07";
    break;
    case 8: minutos="08";
    break;
    case 9: minutos="09";
    break;
    default: minutos=ahora.getMinutes();
    break;
  }

  let hora = horas + ":" + minutos + ":" + segundos;
  let escribe = 'Mislata, ' + fecha + ' ' + hora + ' horas';
  let situa = document.getElementById('posicionReloj');
  situa.innerHTML = escribe;
  reloj = setTimeout("actualizaReloj()", frecuencia);
}