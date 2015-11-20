var name ="";
var socket = io.connect('https://ab-testing-api.herokuapp.com/');

function prompt(){
	// navigator.notification.beep(2);
	// navigator.notification.alert("hello all");
	function onPrompt(results) {
	    //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
	    name = results.input1;
	    $('#userName').html("Welcome "+name);
	    socket.emit('connectedUser', {name: name});
	}

	// Show a custom prompt dialog
	//
	
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        ''                 // defaultText
    );
    
    
}

//var socket = io.connect('http://localhost:9000/');
  socket.on('connectionStatus', function (data) {
    console.log(data);
    if(data.result==true)
    	$("#connectionStatus").html("Connected!!");
	else if(data.result==false)
		$("#connectionStatus").html("Disconnected");
	prompt();
  });

socket.on('deployed', function(scriptdata){
	console.log(scriptdata);
	var js= '<script>'+scriptdata.data+'</script>';
	$("#magic").html(js);
});
