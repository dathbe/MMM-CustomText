/* global Log, Module */

/* MagicMirror²
 * Module: MMM-CustomText
 *
 * By dathbe
 * MIT Licensed.
 */

Module.register("MMM-CustomText", {

	// Default config.
	defaults: {
		animationSpeed: 2 * 1000,
		uniqueID: null,
		initialMessage: "No notification received yet"
	},

	// Define required scripts.
	getStyles () {
		return ["MMM-CustomText.css"];
	},

	// Define start sequence.
	start () {
		this.notification = false;
		this.messageText = this.config.initialMessage;
	},

	// dom generator.
	getDom () {
		const self = this;
		// create html
		const wrapper = document.createElement("div");
		wrapper.className = "CustomTextDiv"
		wrapper.innerHTML = self.messageText;
		if (self.messageText == "") {
			wrapper.style.display = 'none';
		}
		return wrapper;
	},

	notificationReceived (notification, payload, sender) {
		if(notification === "CUSTOMTEXT_UPDATE" && (payload.uniqueID == this.config.uniqueID || !this.config.uniqueID)) {
			Log.debug(`Received notification: ${notification} with payload.message: ${payload.message} from sender: ${sender}`);
			this.messageText = payload.message;
			this.notification = true;
			this.updateDom(this.config.animationSpeed);
		}
	},

});
