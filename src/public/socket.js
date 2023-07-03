function Socket(winner, newMotion, restart){
    let game = true
    let socket = io();
    self = this;

    self.character = function(){
        console.log(self.game)
        if (self.game === true) {
            return "❌"
        } else {
            return "⭕"
        }
    }
    self.play = function(position){
        socket.emit("new_motion", {position: position});
        //playing(self.character(), position)
    }

    socket.on("connect", function(){
        socket.on("init", function(data){
            self.game = data.character;
        });

    socket.on("reset", function(){
        restart();
    })

    socket.on("won", function(data){
        let characterWon = data.character;
        winner(characterWon)
    })

        socket.on("motion", function(data) {
            newMotion(data.position, data.character)
        });

    })
}