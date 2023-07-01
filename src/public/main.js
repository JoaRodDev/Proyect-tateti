(function(){
    let game = false

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
                play(this);
            });    
        }
    }
    
    //Build grids to Tateti
    //Get id div of the index
    function $(selector){
        return document.getElementById(selector)
    }
    
    function build_item(i){
        return `<div id="elemento-${i}" class="centerSelect tatetiItem col-xs-2 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 "></div>`;
    }
    
    function build_tateti(){
        for(let i = 0; i<9; i++){
            item = build_item(i)
            $("tateti").innerHTML += item;
            defineEvents();
        }
    }
    build_tateti();

})();
console.log(game)