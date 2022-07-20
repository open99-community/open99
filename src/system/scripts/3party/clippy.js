var clippy={Agent:function(t,i,e){this.path=t,this._queue=new clippy.Queue($.proxy(this._onQueueEmpty,this)),this._el=$('<div class="clippy"></div>').hide(),$(document.body).append(this._el),this._animator=new clippy.Animator(this._el,t,i,e),this._balloon=new clippy.Balloon(this._el),this._setupEvents()}};clippy.Agent.prototype={gestureAt:function(t,i){var e=this._getDirection(t,i),n="Gesture"+e,o="Look"+e,s=this.hasAnimation(n)?n:o;return this.play(s)},hide:function(t,i){this._hidden=!0;var e=this._el;return this.stop(),t?(this._el.hide(),this.stop(),this.pause(),void(i&&i())):this._playInternal("Hide",(function(){e.hide(),this.pause(),i&&i()}))},moveTo:function(t,i,e){var n="Move"+this._getDirection(t,i);void 0===e&&(e=1e3),this._addToQueue((function(o){if(0===e)return this._el.css({top:i,left:t}),this.reposition(),void o();if(this.hasAnimation(n)){var s=$.proxy((function(n,s){s===clippy.Animator.States.EXITED&&o(),s===clippy.Animator.States.WAITING&&this._el.animate({top:i,left:t},e,$.proxy((function(){this._animator.exitAnimation()}),this))}),this);this._playInternal(n,s)}else this._el.animate({top:i,left:t},e,o)}),this)},_playInternal:function(t,i){this._isIdleAnimation()&&this._idleDfd&&"pending"===this._idleDfd.state()&&this._idleDfd.done($.proxy((function(){this._playInternal(t,i)}),this)),this._animator.showAnimation(t,i)},play:function(t,i,e){return!!this.hasAnimation(t)&&(void 0===i&&(i=5e3),this._addToQueue((function(n){var o=!1;i&&window.setTimeout($.proxy((function(){o||this._animator.exitAnimation()}),this),i),this._playInternal(t,(function(t,i){i===clippy.Animator.States.EXITED&&(o=!0,e&&e(),n())}))}),this),!0)},show:function(t){if(this._hidden=!1,t)return this._el.show(),this.resume(),void this._onQueueEmpty();if("auto"===this._el.css("top")||"auto"===!this._el.css("left")){var i=.8*$(window).width(),e=.8*($(window).height()+$(document).scrollTop());this._el.css({top:e,left:i})}return this.resume(),this.play("Show")},speak:function(t,i){this._addToQueue((function(e){this._balloon.speak(e,t,i)}),this)},closeBalloon:function(){this._balloon.hide()},delay:function(t){t=t||250,this._addToQueue((function(i){this._onQueueEmpty(),window.setTimeout(i,t)}))},stopCurrent:function(){this._animator.exitAnimation(),this._balloon.close()},stop:function(){this._queue.clear(),this._animator.exitAnimation(),this._balloon.hide()},hasAnimation:function(t){return this._animator.hasAnimation(t)},animations:function(){return this._animator.animations()},animate:function(){var t=this.animations(),i=t[Math.floor(Math.random()*t.length)];return 0===i.indexOf("Idle")?this.animate():this.play(i)},_getDirection:function(t,i){var e=this._el.offset(),n=this._el.height(),o=this._el.width(),s=e.left+o/2,a=e.top+n/2-i,h=s-t,r=Math.round(180*Math.atan2(a,h)/Math.PI);return-45<=r&&r<45?"Right":45<=r&&r<135?"Up":135<=r&&r<=180||-180<=r&&r<-135?"Left":-135<=r&&r<-45?"Down":"Top"},_onQueueEmpty:function(){if(!this._hidden&&!this._isIdleAnimation()){var t=this._getIdleAnimation();this._idleDfd=$.Deferred(),this._animator.showAnimation(t,$.proxy(this._onIdleComplete,this))}},_onIdleComplete:function(t,i){i===clippy.Animator.States.EXITED&&this._idleDfd.resolve()},_isIdleAnimation:function(){var t=this._animator.currentAnimationName;return t&&0===t.indexOf("Idle")},_getIdleAnimation:function(){for(var t=this.animations(),i=[],e=0;e<t.length;e++){var n=t[e];0===n.indexOf("Idle")&&i.push(n)}return i[Math.floor(Math.random()*i.length)]},_setupEvents:function(){$(window).on("resize",$.proxy(this.reposition,this)),this._el.on("mousedown",$.proxy(this._onMouseDown,this)),this._el.on("dblclick",$.proxy(this._onDoubleClick,this))},_onDoubleClick:function(){this.play("ClickedOn")||this.animate()},reposition:function(){if(this._el.is(":visible")){var t=this._el.offset(),i=this._el.outerHeight(),e=this._el.outerWidth(),n=$(window).width(),o=$(window).height(),s=$(window).scrollTop(),a=$(window).scrollLeft(),h=t.top-s,r=t.left-a;h-5<0?h=5:h+i+5>o&&(h=o-i-5),r-5<0?r=5:r+e+5>n&&(r=n-e-5),this._el.css({left:r,top:h}),this._balloon.reposition()}},_onMouseDown:function(t){t.preventDefault(),this._startDrag(t)},_startDrag:function(t){this.pause(),this._balloon.hide(!0),this._offset=this._calculateClickOffset(t),this._moveHandle=$.proxy(this._dragMove,this),this._upHandle=$.proxy(this._finishDrag,this),$(window).on("mousemove",this._moveHandle),$(window).on("mouseup",this._upHandle),this._dragUpdateLoop=window.setTimeout($.proxy(this._updateLocation,this),10)},_calculateClickOffset:function(t){var i=t.pageX,e=t.pageY,n=this._el.offset();return{top:e-n.top,left:i-n.left}},_updateLocation:function(){this._el.css({top:this._targetY,left:this._taregtX}),this._dragUpdateLoop=window.setTimeout($.proxy(this._updateLocation,this),10)},_dragMove:function(t){t.preventDefault();var i=t.clientX-this._offset.left,e=t.clientY-this._offset.top;this._taregtX=i,this._targetY=e},_finishDrag:function(){window.clearTimeout(this._dragUpdateLoop),$(window).off("mousemove",this._moveHandle),$(window).off("mouseup",this._upHandle),this._balloon.show(),this.reposition(),this.resume()},_addToQueue:function(t,i){i&&(t=$.proxy(t,i)),this._queue.queue(t)},pause:function(){this._animator.pause(),this._balloon.pause()},resume:function(){this._animator.resume(),this._balloon.resume()}},clippy.Animator=function(t,i,e,n){this._el=t,this._data=e,this._path=i,this._currentFrameIndex=0,this._currentFrame=void 0,this._exiting=!1,this._currentAnimation=void 0,this._endCallback=void 0,this._started=!1,this._sounds={},this.currentAnimationName=void 0,this.preloadSounds(n),this._overlays=[this._el];var o=this._el;this._setupElement(this._el);for(var s=1;s<this._data.overlayCount;s++){var a=this._setupElement($("<div></div>"));o.append(a),this._overlays.push(a),o=a}},clippy.Animator.prototype={_setupElement:function(t){var i=this._data.framesize;return t.css("display","none"),t.css({width:i[0],height:i[1]}),t.css("background","url('"+this._path+"/map.png') no-repeat"),t},animations:function(){var t=[],i=this._data.animations;for(var e in i)t.push(e);return t},preloadSounds:function(t){for(var i=0;i<this._data.sounds.length;i++){var e=this._data.sounds[i],n=t[e];n&&(this._sounds[e]=new Audio(n))}},hasAnimation:function(t){return!!this._data.animations[t]},exitAnimation:function(){this._exiting=!0},showAnimation:function(t,i){return this._exiting=!1,!!this.hasAnimation(t)&&(this._currentAnimation=this._data.animations[t],this.currentAnimationName=t,this._started||(this._step(),this._started=!0),this._currentFrameIndex=0,this._currentFrame=void 0,this._endCallback=i,!0)},_draw:function(){var t=[];this._currentFrame&&(t=this._currentFrame.images||[]);for(var i=0;i<this._overlays.length;i++)if(i<t.length){var e=t[i],n=-e[0]+"px "+-e[1]+"px";this._overlays[i].css({"background-position":n,display:"block"})}else this._overlays[i].css("display","none")},_getNextAnimationFrame:function(){if(this._currentAnimation){if(!this._currentFrame)return 0;var t=this._currentFrame,i=this._currentFrame.branching;if(this._exiting&&void 0!==t.exitBranch)return t.exitBranch;if(i)for(var e=100*Math.random(),n=0;n<i.branches.length;n++){var o=i.branches[n];if(e<=o.weight)return o.frameIndex;e-=o.weight}return this._currentFrameIndex+1}},_playSound:function(){var t=this._currentFrame.sound;if(t){var i=this._sounds[t];i&&i.play()}},_atLastFrame:function(){return this._currentFrameIndex>=this._currentAnimation.frames.length-1},_step:function(){if(this._currentAnimation){var t=Math.min(this._getNextAnimationFrame(),this._currentAnimation.frames.length-1),i=!this._currentFrame||this._currentFrameIndex!==t;this._currentFrameIndex=t,this._atLastFrame()&&this._currentAnimation.useExitBranching||(this._currentFrame=this._currentAnimation.frames[this._currentFrameIndex]),this._draw(),this._playSound(),this._loop=window.setTimeout($.proxy(this._step,this),this._currentFrame.duration),this._endCallback&&i&&this._atLastFrame()&&(this._currentAnimation.useExitBranching&&!this._exiting?this._endCallback(this.currentAnimationName,clippy.Animator.States.WAITING):this._endCallback(this.currentAnimationName,clippy.Animator.States.EXITED))}},pause:function(){window.clearTimeout(this._loop)},resume:function(){this._step()}},clippy.Animator.States={WAITING:1,EXITED:0},clippy.Balloon=function(t){this._targetEl=t,this._hidden=!0,this._setup()},clippy.Balloon.prototype={WORD_SPEAK_TIME:200,CLOSE_BALLOON_DELAY:2e3,_setup:function(){this._balloon=$('<div class="clippy-balloon"><div class="clippy-tip"></div><div class="clippy-content"></div></div> ').hide(),this._content=this._balloon.find(".clippy-content"),$(document.body).append(this._balloon)},reposition:function(){for(var t=["top-left","top-right","bottom-left","bottom-right"],i=0;i<t.length;i++){var e=t[i];if(this._position(e),!this._isOut())break}},_BALLOON_MARGIN:15,_position:function(t){var i,e,n=this._targetEl.offset(),o=this._targetEl.height(),s=this._targetEl.width(),a=this._balloon.outerHeight(),h=this._balloon.outerWidth();switch(this._balloon.removeClass("clippy-top-left"),this._balloon.removeClass("clippy-top-right"),this._balloon.removeClass("clippy-bottom-right"),this._balloon.removeClass("clippy-bottom-left"),t){case"top-left":i=n.left+s-h,e=n.top-a-this._BALLOON_MARGIN;break;case"top-right":i=n.left,e=n.top-a-this._BALLOON_MARGIN;break;case"bottom-right":i=n.left,e=n.top+o+this._BALLOON_MARGIN;break;case"bottom-left":i=n.left+s-h,e=n.top+o+this._BALLOON_MARGIN}this._balloon.css({top:e,left:i}),this._balloon.addClass("clippy-"+t)},_isOut:function(){var t=this._balloon.offset(),i=this._balloon.outerHeight(),e=this._balloon.outerWidth(),n=$(window).width(),o=$(window).height(),s=$(document).scrollTop(),a=$(document).scrollLeft(),h=t.top-s,r=t.left-a;return h-5<0||r-5<0||h+i+5>o||r+e+5>n},speak:function(t,i,e){this._hidden=!1,this.show();var n=this._content;n.height("auto"),n.width("auto"),n.text(i),n.height(n.height()),n.width(n.width()),n.text(""),this.reposition(),this._complete=t,this._sayWords(i,e,t)},show:function(){this._hidden||this._balloon.show()},hide:function(t){t?this._balloon.hide():this._hiding=window.setTimeout($.proxy(this._finishHideBalloon,this),this.CLOSE_BALLOON_DELAY)},_finishHideBalloon:function(){this._active||(this._balloon.hide(),this._hidden=!0,this._hiding=null)},_sayWords:function(t,i,e){this._active=!0,this._hold=i;var n=t.split(/[^\S-]/),o=this.WORD_SPEAK_TIME,s=this._content,a=1;this._addWord=$.proxy((function(){this._active&&(a>n.length?(this._active=!1,this._hold||(e(),this.hide())):(s.text(n.slice(0,a).join(" ")),a++,this._loop=window.setTimeout($.proxy(this._addWord,this),o)))}),this),this._addWord()},close:function(){this._active?this._hold=!1:this._hold&&this._complete()},pause:function(){window.clearTimeout(this._loop),this._hiding&&(window.clearTimeout(this._hiding),this._hiding=null)},resume:function(){this._addWord&&this._addWord(),this._hiding=window.setTimeout($.proxy(this._finishHideBalloon,this),this.CLOSE_BALLOON_DELAY)}},clippy.BASE_PATH="//s3.amazonaws.com/clippy.js/Agents/",clippy.load=function(t,i,e){var n,o,s=clippy.BASE_PATH+t,a=clippy.load._loadMap(s),h=clippy.load._loadAgent(t,s),r=clippy.load._loadSounds(t,s);h.done((function(t){n=t})),r.done((function(t){o=t})),$.when(a,h,r).done((function(){var t=new clippy.Agent(s,n,o);i(t)})).fail(e)},clippy.load._maps={},clippy.load._loadMap=function(t){var i=clippy.load._maps[t];if(i)return i;i=clippy.load._maps[t]=$.Deferred();var e=t+"/map.png",n=new Image;return n.onload=i.resolve,n.onerror=i.reject,n.setAttribute("src",e),i.promise()},clippy.load._sounds={},clippy.load._loadSounds=function(t,i){var e=clippy.load._sounds[t];if(e)return e;e=clippy.load._sounds[t]=$.Deferred();var n=document.createElement("audio"),o=!!n.canPlayType&&""!=n.canPlayType("audio/mpeg"),s=!!n.canPlayType&&""!=n.canPlayType('audio/ogg; codecs="vorbis"');if(o||s){var a=i+(o?"/sounds-mp3.js":"/sounds-ogg.js");clippy.load._loadScript(a)}else e.resolve({});return e.promise()},clippy.load._data={},clippy.load._loadAgent=function(t,i){var e=clippy.load._data[t];if(e)return e;e=clippy.load._getAgentDfd(t);var n=i+"/agent.js";return clippy.load._loadScript(n),e.promise()},clippy.load._loadScript=function(t){var i=document.createElement("script");i.setAttribute("src",t),i.setAttribute("async","async"),i.setAttribute("type","text/javascript"),document.head.appendChild(i)},clippy.load._getAgentDfd=function(t){var i=clippy.load._data[t];return i||(i=clippy.load._data[t]=$.Deferred()),i},clippy.ready=function(t,i){clippy.load._getAgentDfd(t).resolve(i)},clippy.soundsReady=function(t,i){var e=clippy.load._sounds[t];e||(e=clippy.load._sounds[t]=$.Deferred()),e.resolve(i)},clippy.Queue=function(t){this._queue=[],this._onEmptyCallback=t},clippy.Queue.prototype={queue:function(t){this._queue.push(t),1===this._queue.length&&!this._active&&this._progressQueue()},_progressQueue:function(){if(this._queue.length){var t=this._queue.shift();this._active=!0,t($.proxy(this.next,this))}else this._onEmptyCallback()},clear:function(){this._queue=[]},next:function(){this._active=!1,this._progressQueue()}};