function Socket(winner, newMotion, restart, turns, conect, user, conectUser, chatbox){
    let game = true
    let socket = io();
    self = this;

    self.character = function(){
        if (self.game === true) {
            console.log(self.game)
            return "❌"
        } else {
            return "⭕"
        }
    }

    self.play = function(position){
        socket.emit("new_motion", {position: position});
    }

    self.user = function(user){
        socket.emit('authenticated', user)
    }

    self.chatbox = function(user, message){
        socket.emit('message', { user, message })
    }

    socket.on("connect", function(){
        socket.on("init", function(data){
            console.log(data.character)
            self.game = data.character;
            console.log(self.game)
            conect(self.character());
            user(self.character())
        });

    socket.on("reset", function(){
        restart();
    })

    socket.on("won", function(data){
        let characterWon = data.character;
        winner(characterWon)
        console.log(self.character+" A ganado!")
    })

    socket.on("!turn", function(){
        turns();
    })

    socket.on("motion", function(data) {
        newMotion(data.position, data.character)
    });

    socket.on('newUserConnected', user => {
        if (!user) {
            return
        } else {
            conectUser(user, self.game)
        }
    });

    socket.on('messageLogs', data => {
        console.log(data)
        chatbox(data)
    });
});
}