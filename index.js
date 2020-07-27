const { Plugin } = require('powercord/entities');
const { typing } = require('powercord/webpack');
var enabled = false

module.exports = class SilentType extends Plugin {
    startPlugin() {
      powercord.api.commands.registerCommand({
        command: 'togglesilent',
        description: 'toggles silent typing',
        usage: '{c} [ boolean ]',
        executor:this.toggle.bind(this)
      });
        this.oldStartTyping = typing.startTyping;
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
        typing.startTyping = () => {};
      } else {
        typing.startTyping = this.oldStartTyping;
      }
    }

    pluginWillUnload() {
        typing.startTyping = this.oldStartTyping;
    }
};