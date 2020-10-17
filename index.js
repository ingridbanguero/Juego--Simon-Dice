// Llamamos los botones de nuestro html mediante su id
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

// Inicializamos una clase, que va a contener la funcion inicializar
class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel ,500)  
    }

    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        // El toggle funciona como un switch, si tiene una clase lo oculta
        this.nivel = 1
        this.colores = {
            celeste: celeste,
            violeta,
            naranja,
            verde,
        }
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia(){// Generar una secuencia de numeros random
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4)) 
        // new Array(10) Para crear un array de 10 numeros
        // .fill(0) Lllena nuestro array de numeros 0
        // .map crea un nuevo array con los valores deseados 0-3
        // math.floor redondea el valor hacia abajo 
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){ 
        // Funcion para transformar de un numero a un color
        switch (numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3: 
                return 'verde'
        }
    }

    transformarColorANumero(color){ 
        // Funcion para transformar de un color a un numero
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde': 
                return 3
        }
    }

    iluminarSecuencia(){ 
        // Va a transformar los 10 numeros a sus respectivos colores
        for(let i=0; i<this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i) 
            // Cada cuanto tiempo se va a iluminar cada color
        }
    }
     iluminarColor(color){
        this.colores[color].classList.add('light') 
        // Añade light a las clase que contiene el color determinado
        setTimeout(() => this.apagarColor(color), 350)
        // Tiempo en el que se va a apagar el color 
     }
     
     apagarColor(color){
         this.colores[color].classList.remove('light')
         // Quita light a las clase que contiene el color recibido por parametro
     }
     agregarEventosClick(){
         this.colores.celeste.addEventListener('click', this.elegirColor)
         this.colores.violeta.addEventListener('click', this.elegirColor)
         this.colores.naranja.addEventListener('click', this.elegirColor)
         this.colores.verde.addEventListener('click', this.elegirColor)
         // Los parametros del addEventListener son
         // 1. Evento que va a escuchar
         // 2. Funcion que va a ejecutar
         // .bind sirve para no perder la referencia a this (Juego)
     }
     eliminarEventosClick(){
         this.colores.celeste.removeEventListener('click', this.elegirColor)
         this.colores.violeta.removeEventListener('click', this.elegirColor)
         this.colores.naranja.removeEventListener('click', this.elegirColor)
         this.colores.verde.removeEventListener('click', this.elegirColor)
     }
     elegirColor(ev){
         const nombreColor = ev.target.dataset.color
         // En consola, target nos muestra en que boton se hizo el click
         // Y data-set nos muestra el parametro de color que le metimos en el html
         const numeroColor = this.transformarColorANumero(nombreColor)
         this.iluminarColor(nombreColor)
         if (numeroColor === this.secuencia[this.subnivel]){
             this.subnivel++
             if (this.subnivel === this.nivel){
                 this.nivel++
                 this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL+1)){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel,1500) // No se invoca esta funcion solo se llama
                } 
             }
            } else {
                 this.perdioElJuego()
            }
     }

    ganoElJuego(){
         swal('Platzi', '¡Felicidades, ganaste el juego!', 'success')
         .then(this.inicializar)
    }

    perdioElJuego(){
        swal('Platzi', 'Lo siento, perdiste el juego', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
} 
     // swal devuelve una promesa
// Creamos una funcion que nos permita iniciar nuestro juego 
function empezarJuego(){
    window.juego = new Juego() 
    // Podemos ponerle window.juego para visualizar en consola lo que esta pasando
}