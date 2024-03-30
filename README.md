# Module: MMM-ownMessage

`MMM-ownMessage` is a module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror). It posts any message you want to your MagicMirror.  Multiple instances are supported. Message can be updated via notification.

![Example Screenshot](screenshot.png)

The main differences between this and [MMM-CustomMessage](https://github.com/jpcaldwell30/MMM-CustomMessage) are that (1) this module allows separately updating multiple instances, (2) this module primarily employs the MagicMirror notification system for updating messages, and (3) this module completely collapses to 0 pixels in height by default when no message is displayed.

Suggestions are welcome.

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/dathbe/MMM-ownMessage
```

No dependencies need to be installed, **but** you likely want [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) installed to allow posting of messages via API.

## Updating

```sh
cd ~/MagicMirror/modules/MMM-ownMessage
git pull
```

## Usage

### Example Config

To use this module, add it to the modules array in your `~/MagicMirror/config/config.js` file:

````js
{
	module: 'MMM-ownMessage',
	position: 'top_bar',
	config: {
		initialMessage: "I posted my first message!",
		uniqueID: "myUniqueID",
		animationSpeed: 1000 * 2,
	},
}
````

### Configuration options

The following properties can be configured:

| Option                | Description
|-----------------------|------------
|`initialMessage`	|*Optional* A message you would like to display when MagicMirror loads<br>**Type:** `string`<br>**Default:** `"No notification received yet"`
|`uniqueID`		|*Optional*, but necessary if you plan to have multiple instances of this module in your config file.  Give each instance a unique `uniqueID` that you can pass in notifications (see below)<br>**Type:** anything<br>**Default:** `null`
|`animationSpeed`	|*Optional* The speed of animated transitions from one message to another in milliseconds<br>**Type:** `int`<br>**Default:** `2000` (2 seconds)

### Posting a message via notification

You can update the message displayed by this module using a `OWNMESSAGE_UPDATE` notification.  Pass the `message` and, if you have more than one instance of the module, the `uniqueID` of the instance in a json object:

```json
{
	"uniqueID": "myUniqueID",
	"message": "I posted a notification message!"
}
```

For example, if you wanted to create such a notification in python, install the [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) module, and then you can execute the following script:

```py
import requests 

accesstoken = 'mYsUpErSeCrEtToKeN'
header = {'Authorization': f"Bearer {accesstoken}", 'Content-type': 'application/json'}
message = 
json = {
	"uniqueID": "myUniqueID",
	"message": "<div style='background-color:#f19b52'>I posted a notification message!</div>"
}
x = requests.post('http://localhost:8080/api/notification/OWNMESSAGE_UPDATE', json=json, headers=header)
```

### Notes

* Both the initial message and any subsequent message posted by notification will accept standard HTML elements within the string.  That means you could, for example, style the message using inline CSS or by giving the message a class name and using `~/MagicMirror/css/custom/css`.  You could also insert more complex elements like a table.
* You can clear the message from the display by posting `""` via notification.  If the message is `""`--either via `initialMessage` or a notification posting--it *should* collapse the module so that no unnecessary space is taken up on your display.  If you want the module to take up a fixed height on your display regardless of the length of the message, you should be able to set this in `~/MagicMirror/css/custom.css`.
* If you only have one instance of this module in your config (or you want to update all instances at the same time) and you have not set an explicit `uniqueID` in your config, you do *not* need to pass a `uniqueID` in your notification.  

## Changelog

- 2024-XX-XX: Initial release
