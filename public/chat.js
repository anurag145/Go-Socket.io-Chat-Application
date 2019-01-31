const socket= io.connect('http://localhost:5000');

//get elements
var message = document.getElementById('message'),
 handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
 output = document.getElementById('output'),
 feedback = document.getElementById('feedback');  

//listener, emit action

message.addEventListener('keypress',function(){
	socket.emit('typing',handle.value);
});

btn.addEventListener('click',function(){
    feedback.innerHTML = '';
 socket.emit('chat',JSON.stringify({
 message:message.value,
 handle:handle.value
 }));
message.value="";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('chat', function(val){
    console.log(val)
    data = JSON.parse(val)
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})