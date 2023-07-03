(function(){
    function play(select){
        if (game === true) {
            select.innerHTML = `<h1>✖</h1>`
        } else {
            select.innerHTML = `<h1>⚪</h1>`
        }
    }
    
    //events
    function defineEvents(){
        let elements = document.querySelectorAll(".tatetiItem");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            element.addEventListener("click", function(){
                let position = this.id.split("-")[1]; //separates the element in two and returns the one in position one
                socket.play(position);
            });    
        }
    }
    
    //Build grids to Tateti
    //Get id div of the index
    function $(selector){
        return document.getElementById(selector)
    }
    
    function build_item(i){
        return `<div id="element-${i}" class="centerSelect tatetiItem col-xs-4 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 "></div>`;
    }
    
    function build_tateti(){
        for(let i = 0; i<9; i++){
            item = build_item(i)
            $("tateti").innerHTML += item;
            defineEvents();
        }
    }
    
    function changeCharacter(flag) {
        if(flag){
            return "❌"
        }
        return "⭕"
    }

    function reset() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Alguien ingresó',
            text: "Reiniciaremos el tablero...",
          })

        let elements = document.querySelectorAll(".tatetiItem");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
        }
    }

    build_tateti();

    let socket = new Socket(function(character){
        let characterString = changeCharacter(character)
        Swal.fire({
            title: `${characterString} Ganó la partida`,
            text: 'reinicia el juego!',
            confirmButtonText:
            '<a href="."><i class="fa fa-thumbs-up">reset</i></a>',
            html:
            '<b>Project made by</b>, ' +
            '<a href="https://github.com/JoaRodDev/Proyect-tateti">Joaquín Rodríguez</a> ' +
            '(View repository to GitHub)',
          })
        //$("element-"+position).innerHTML = character;
    }, function(position, character) {
        $("message").innerHTML = "<br> Es el turno de las "+ changeCharacter(!character);
        $("element-"+position).innerHTML = changeCharacter(character);
    },function(){
        reset();
    }, function(){
        Swal.fire({
            icon: 'error',
            title: 'Aún no es tu turno!',
            text: 'Espera que finalice el turno del oponente',
            footer: '<a href="https://github.com/JoaRodDev/Proyect-tateti">Reglas del juego</a>'
          })
    }, function(char){
        $("message").innerHTML = "Te tocan las "+ char;
        if(char == "❌"){
            $("message").innerHTML = "<br> Es tu turno";
        } else {
            $("message").innerHTML = "<br> No es tu turno";
        }
    });

})();
console.log("Hola mundo")