# XendBridge Chat SDK
This is the official chat SDK for the XendBridge application. This connects a user to the system and gets history or messages and also can send them.

## Author

 - [@kcmicheal](https://github.com/KCMicheal)

## Installation
Using npm :

    $ npm install xendbridgechat-sdk

Using yarn :

    $ yarn add xendbridgechat-sdk

## Usage

    # using require
    const { getMessageHistory, sendMessage } = require('xendbridgechat-sdk');
    
    # using import
    import { getMessageHistory, sendMessage } from 'xendbridgechat-sdk';

## Examples
XendBridge Chat SDK provides only two distinct functions. GetMessageHistory and SendMessage. 

The **getMessageHistory** takes the three arguments which are a public key, dispute reference, which are all strings and a function called **getAllChats**. 

**getAllChats** is a function that must be called as an argument in both **getMessageHistory** and **sendMessage**. It automatically fetches the history for you after a message is being sent or when an initial connection to the hub is made.

    //implement a better and safer way for getting the following values
    const disputeRef = "AdhdfoGjfo8jorp";
    const publicKey = "XP_34984hfhsdksofhs";
    
    const getHistory = async () => {
	    await getMessageHistory(disputeRef, publicKey, getAllChats);
    };
    
    //call when connected to application
    getHistory();

The **sendMessage** takes three arguments as well, being an object called ChatHubAddCommentModel which has props of email address, comment, sent by, recipient, base64Attachment, dispute reference and sent at. The other arguments is the public key and the function **getAllChats** .

    //implement a better and safer way for getting the following values
    const disputeRef = "AdhdfoGjfo8jorp";
    const publicKey = "XP_34984hfhsdksofhs";
    
    let ChatHubAddCommentModel = {
	    EmailAddress: "youruseremailaddress@domain.com",
	    Comment: comment, //the user's message from the client side
	    SentBy: 2, //this is always 2 representing the third party user
	    Recipient: 1, //this is always 1 representing all entities involved
	    Base64Attachment: "", //this is the image in base64 format
	    DisputeReference: disputeRef, //the unique dispute reference
	    SentAt: new Date().toISOString() //this is the time in timestamp
    }
    
    //call when user hits the send button on the UI
    sendMessage(ChatHubAddCommentModel, publicKey, getAllChats);


### 🔗Links
[Docs](https://doc.xendbridge.com)