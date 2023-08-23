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
    
    defineEvents()
    
    function changeCharacter(flag) {
        if(flag){
            return "❌"
        }
        return "⭕"
    }

    function reset() {
        let elements = document.querySelectorAll(".tatetiItem");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
        }
    }

    let socket = new Socket(function(character){
        let characterString = changeCharacter(character)
        /* Swal.fire({
            title: `${characterString} Ganó la partida`,
            text: 'reinicia el juego!',
            buttons: false,
            html:
            '<b>Project made by</b>, ' +
            '<a href="https://github.com/JoaRodDev/Proyect-tateti">Joaquín Rodríguez</a> ' +
            '(View repository to GitHub)' +
            '<a class="button-89" href="/">Reset</a>',
          }) */

          let timerInterval
            Swal.fire({
            title: `${characterString} ganó la partida!`,
            html: 'Reiniciando partida... <b></b>',
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                location.replace('/');
            }
            })
        //$("element-"+position).innerHTML = character;
    }, function(position, character) {
        $("message").innerHTML = "<br> Es el turno de: "+ changeCharacter(!character);
        $("element-"+position).innerHTML = changeCharacter(character);
    },function(){
        reset();
    }, function(){
        Swal.fire({
            icon: 'error',
            title: 'Aún no es tu turno!',
            text: 'Espera que finalice el turno del oponente',
          })
    }, function(char){
        console.log(char)
        $("message").innerHTML = "Te tocan: "+ char;
        if(char == "❌"){
            $("message").innerHTML = "<br> Es tu turno";
        } else {
            $("message").innerHTML = "<br> No es tu turno";
        }
    },
    function(char){
        Swal.fire({
            title: `Usted jugará con ${char}`,
            input: 'text',
            text: 'Ingresar el nombre de usuario.',
            inputValidator: (value) => {
                return !value && 'El nombre de usuario es obligatorio'
            },
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(result => {
            user = result.value
            socket.user(user)
        })
        const chatbox  = document.getElementById('chatbox')
        chatbox.addEventListener('keyup', (evt) => {
            if (evt.key==='Enter') {
                if (chatbox.value.trim().length>0) {
                    socket.chatbox(user, {message: chatbox.value});
                    chatbox.value='';
                }
            }
        })
        }, function(dataUser, charUser){
            console.log(charUser)
            if(charUser === true){
                charUser = "⭕"
            } else {
                charUser = "❌"
            }
            $("oponent").innerHTML = `<h3 class="text_oponent">Tu oponente es: <b>${dataUser} "${charUser}"</b></h3>`
        },
        function(data){
            console.log(data)
            //const log = document.getElementById('messageLogs')
            let messages = ''
            data.forEach(({user, message}) => {
                messages += `<li class="message_li">${user} dice: ${message.message}</li>`
            })
            $("messageLogs").innerHTML = messages
        }
        )
    })();

console.log("Hola mundo")