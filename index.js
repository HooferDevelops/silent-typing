const { Plugin } = require('powercord/entities');
const { typing } = require('powercord/webpack');
const fs = require('fs')

var enabled = false
let config = false
module.exports = class SilentType extends Plugin {
    startPlugin() {

      powercord.api.commands.registerCommand({
        command: 'togglesilent',
        description: 'toggles silent typing',
        usage: '{c} [true/false]',
        executor:this.toggle.bind(this)
      });
      this.hookTyping = typing.startTyping;
      config = window.localStorage.getItem("silenttypingenabled")
      if (!config){
        config = false
      } else {
        enabled = true
        typing.startTyping = () => {};
        };                                                                                                                                                                                                                                                     
    }

    toggle(params) {
      enabled = !enabled
      powercord.api.notices.closeToast('silentNotif')
      var toastName = Math.random();
      powercord.api.notices.sendToast('silentNotif', {
        header: `Silent Typing`,
        content: `${(enabled == true) ? 'You are now silent.' : 'You\'re no longer silent!'}`,
        buttons: [{
          text: 'Dismiss',
          color: 'red',
          look: 'outlined',
          onClick: () => powercord.api.notices.closeToast('silentNotif')
        }]      
      });
      if (enabled == true){
        window.localStorage.setItem("silenttypingenabled", true);
        typing.startTyping = () => {};
      } else {
        window.localStorage.setItem("silenttypingenabled", false);
        typing.startTyping = this.hookTyping;
      }
      //JSON.stringify(config));
    }

    pluginWillUnload() {
        typing.startTyping = this.hookTyping;
    }
};
