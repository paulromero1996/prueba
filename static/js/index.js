//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	//alert("led on");
	console.log("led on");
	document.getElementById("sensor").innerHTML="ENCENDIDO";
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    	client.send(message);
  
}
function LED1_Off(){	
	//alert("led off");
	console.log("led off");
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    	client.send(message);
	document.getElementById("sensor").innerHTML="APAGADO";
}
var1="";
function historial1() {
	//alert("led on");
	console.log("mostrando historial");
	message = new Paho.MQTT.Message("historial");
    	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    	client.send(message);
  	var1="h1";
}
var2="";
function historial2() {
	//alert("led on");
	console.log("mostrando historial Sensor 2");
	message = new Paho.MQTT.Message("historial2");
    	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    	client.send(message);
  	var2="h2";
}







// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "prromero.fis@unach.edu.ec",
    password: "123",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("prromero.fis@unach.edu.ec/prueba1");	  
    client.subscribe("prromero.fis@unach.edu.ec/prueba");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
	  mensaje=message.payloadString;
	  vector=mensaje.split(";");
	  tamano=vector.length;
	  
	  if(tamano>=2 && var1=="h1"){
	  document.getElementById("historial11").innerHTML=vector[0];
	  }
	  if(tamano>=2 && var2=="h2"){
	  document.getElementById("historial22").innerHTML=vector[1];
	  }
	  
	  
	  if (message.payloadString=="nivel alto") { 
	  document.getElementById("sensor").innerHTML=message.payloadString;
	  }
	  if (message.payloadString=="nivel bajo") { 
	  document.getElementById("sensor").innerHTML=message.payloadString;
	  }
	  
	  if (message.payloadString=="Nivel alto") { 
	  document.getElementById("sensor2").innerHTML=message.payloadString;
	  }
	  if (message.payloadString=="Nivel bajo") { 
	  document.getElementById("sensor2").innerHTML=message.payloadString;
	  }

 }
  
