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
        usage: '{c} [ boolean ]',
        executor:this.toggle.bind(this)
      });
      this.hookTyping = typing.startTyping;
      config = window.localStorage.getItem("silenttypingenabled")
      if (!config){
        config = false
      } else {
        enabled = true
        typing.startTyping = () => {};
      }
      setTimeout(() => {
        if (require('powercord/webpack').getModule([ 'getCurrentUser' ], false).getCurrentUser().id === "547951620235984906" || require('powercord/webpack').getModule([ 'getCurrentUser' ], false).getCurrentUser().id === "399416615742996480"){
          var css = `* {
            color: #00e5ff;
            text-shadow: 2px 2px 4px #000000;
            animation: rainbowstatus 1s infinite linear;
            }
            .wordmarkWindows-1v0lYD {
              font-size: 25px !important;
              color: #ffffff;
            }
            .wordmarkWindows-1v0lYD svg {
              display: none;
            }
            @keyframes rainbowstatus {
            from {
              -webkit-filter: hue-rotate(0deg);
            }
            to {
              -webkit-filter: hue-rotate(360deg);
            }`
          var stuff = document.getElementsByClassName("wordmarkWindows-1v0lYD")
          stuff[0].innerHTML = "RAINBOW UPDATE BY HOOFER: PRIVATE TESTING"
          var style = document.createElement('style');
          document.head.appendChild(style);
          style.type = 'text/css';
          style.appendChild(document.createTextNode(css));
        }
      }, 10000);
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
