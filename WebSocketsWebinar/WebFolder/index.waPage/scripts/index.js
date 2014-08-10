
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var sendButton = {};	// @button
	var changeUsernameButton = {};	// @button
// @endregion// @endlock
	var currSocket=document.URL;
	var splitPoint=currSocket.indexOf('//');
	currSocket="ws:" + currSocket.slice(splitPoint) + 'chat';
	//alert(currSocket);
	//currSocket="ws://127.0.0.1:8081/chat";
	//var ws = new WebSocket("ws://127.0.0.1:8081/chat");
	var ws= new WebSocket(currSocket);
	var username = "";
	
	ws.onmessage = function(message){
		var msgObj = JSON.parse(message.data);
		switch(msgObj.type){
			case "addUser":
				username = msgObj.username;
				$$('usernameInput').setValue(username);
				break;
			case "message":
				var previous = $$('chatText').getValue();
				$$('chatText').setValue("<b>" + msgObj.username + ":</b> " + msgObj.body + "</br>" + previous);
				break;
		}
	};
// eventHandlers// @lock

	sendButton.click = function sendButton_click (event)// @startlock
	{// @endlock
		ws.send(JSON.stringify({
			username: username,
			type: "message",
			body: $$('messageInput').getValue()
		}));
	};// @lock

	changeUsernameButton.click = function changeUsernameButton_click (event)// @startlock
	{// @endlock
		username = $$('usernameInput').getValue();
		ws.send(JSON.stringify({
			username: username,
			type: 'updateUsername'
		}));
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("sendButton", "click", sendButton.click, "WAF");
	WAF.addListener("changeUsernameButton", "click", changeUsernameButton.click, "WAF");
// @endregion
};// @endlock
