

var1="";
function historial1() {
	//alert("led on");
	console.log("mostrando historial");
	message = new Paho.MQTT.Message("historial");
    	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
    	client.send(message);
  	var1="h1";
}




  
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
    message = new Paho.MQTT.Message("---");
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


  function onMessageArrived(message) {
	  mensaje=message.payloadString;
	  vector=mensaje.split(";");
	  tamano=vector.length;
	  document.getElementById("sensor").innerHTML=vector[0];
	  document.getElementById("sensor2").innerHTML=vector[1];
	  
	  if(tamano>=3 && var1=="h1"){
	  document.getElementById("historial11").innerHTML=vector[2];
	  }

	  
	  

 }
  
