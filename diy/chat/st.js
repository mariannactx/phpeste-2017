var socket;
function init() {
	var host = "ws://localhost:47401"; // SET THIS TO YOUR SERVER
	try {
		socket = new WebSocket(host);
		//log('WebSocket - status '+socket.readyState);
		socket.onopen    = function(msg) { log("chat", "Bem vindo! :)"); };
		socket.onmessage = function(msg) {
            msg = JSON.parse(msg.data);
		    console.log(msg);

		    if(msg.type == 'chat')
            log(msg.type, msg.message);

        };
		socket.onclose   = function(msg) {  log("chat", "Você foi desconectado, té mais!"); };

	} catch(ex){ log("chat", ex); }
    
	$("msg").focus();
}

function send(){
	var txt, msg;
	
    txt = $("msg");
	msg = txt.value;
	
    if(!msg) { return; }
    
	txt.value="";
	txt.focus();
    
	try {
	    socket.send('{"type":"chat", "name": "Novo usuario", "message":"' + msg + '", "color": "#fff"}');
	}
    catch(ex) { log("chat", ex); }
}
    
function quit(){
	if (socket != null) {
		socket.close();
		socket=null;
	}
}

function reconnect() {
	quit();
	init();
}

// Utilities
function $(id){ return document.getElementById(id); }
function log(tipo, msg){

    $(tipo).innerHTML += '<div class="msg">';

    if(tipo == "chat") {
        $(tipo).innerHTML += '<span class="user icon fontawesome-user scnd-font-color"></span>';
    }

    $(tipo).innerHTML += '<span class="profile-description scnd-font-color">'+ msg + '</span>';
    $(tipo).innerHTML += '<div style="clear:both;float: none;width: 100px;height: 10px;"></div>';
    $(tipo).innerHTML += '</div>' 
    
    $(tipo).scrollTop = $(tipo).scrollHeight;
    
}

function onkey(event){ if(event.keyCode==13){ send(); } }

window.addEventListener("load", function(){
    init();
});