function Socket(playing, newMoviment, restart){
    let game = true
    let socket = io();
    self = this;

    self.play = function(position){
        socket.emit("new_moviment", {position: position});
        playing(self.character(), position)
    }

    self.character = function(){
        if(self.game){
            return "❌"
        }
        return "⭕"
    }
    socket.on("connect", function(){
        socket.on("init", function(data){
            self.game = data.figure;
        });

        socket.on("moviment", function(data) {
            newMoviment(data.position, data.character)
        });

    })
}