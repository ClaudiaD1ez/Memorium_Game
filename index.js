//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado1 = null;
let resultado2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicio = 30;
let regresivo = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("tiempo")

//Generar numeros aleatorios de 1 a 8
let num = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
num = num.sort(()=>{return Math.random()-0.5})  //sort() ordena los numeros segun una funcion (math.random=numeros aleatorios de 0 a 1, "-0.5" para que nos de numeros negativos)

//Funciones

function contarTiempo(){
    regresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} seg`;

        if(timer == 0){
            clearInterval(regresivo); // para la cuenta atras 
            bloquearTarjeta()
        }
    } ,1000)
}

function bloquearTarjeta(){

    for(let i = 0; i<= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = num[i];
        tarjetaBloqueada.disable = true;
    }
}

// Funcion prinicpal

function destapar(id){

    if(temporizador == false){

        contarTiempo();
        temporizador = true;

    }

    tarjetasDestapadas++;

    if(tarjetasDestapadas==1){
        tarjeta1 = document.getElementById(id); // tarjeta 1 sera en la que clickamos
        resultado1= num[id];
        tarjeta1.innerHTML = resultado1; // en ella imprimimos el numero que este en el indice que le corresponde ([id]) del array de numeros aleatorios

        //Deshabilitar el botton ya pulsado
        tarjeta1.disable = true;

    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        resultado2 = num[id];
        tarjeta2.innerHTML = resultado2;
        tarjeta2.disable = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(resultado1 == resultado2){
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(regresivo);
                mostrarAciertos.innerHTML = `Fantastico! ${aciertos} aciertos &#127881`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} &#9996`;
                mostrarTiempo.innerHTML = ` Tardaste ${timerInicio - timer} seg &#129321`
            }

        }else{
            //Volver a tapar los numeros
            setTimeout(()=>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disable = false;
                tarjeta2.disable = false;
                tarjetasDestapadas = 0;
            },500)
        }
    }
}