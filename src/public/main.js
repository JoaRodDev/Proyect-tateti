

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
        let elements = document.querySelectorAll(".tatetiItem");
        console.log(elements)
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
        }
    }

    build_tateti();

    let socket = new Socket(function(character){
        console.log("Alguien ganó")
        //$("element-"+position).innerHTML = character;
    }, function(position, character) {
        $("element-"+position).innerHTML = changeCharacter(character);
    },function(){
        reset();
    });

})();
console.log("Hola mundo")