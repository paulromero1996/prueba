
var1=" ";


function LED1_On(){
	message = new Paho.MQTT.Message("SENSOR1");
	message.destinationName = "prromero.fis@unach.edu.ec/prueba1";
	client.send(message); 
	console.log("MUESTRA SENSOR 1");
	//var1="H1";
}




function Exportar1(){	
	message = new Paho.MQTT.Message("HISTORIAL");
	message.destinationName ="prromero.fis@unach.edu.ec/prueba1";
	client.send(message);
	console.log("MUESTRA HISTORIAL");
	var1="PRESIONAR";
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
	
    client.subscribe("prromero.fis@unach.edu.ec/prueba");
    message = new Paho.MQTT.Message("CONECTADO");
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

	  
	mensaje=(message.payloadString);
	datos=mensaje.split(";")  
	lon =datos.length;
	  
	  if(mensaje=="Alta"||mensaje=="Baja"||mensaje=="Vacio"||mensaje=="Lleno"){
	  	document.getElementById("sensor1").innerHTML=mensaje;

	  
	  if(lon==2&&var1=="PRESIONAR"){
		document.getElementById("historial1").innerHTML=datos[0];
	  	document.getElementById("historial2").innerHTML=datos[1];
	  }

	

	  
	  
	  
  }
