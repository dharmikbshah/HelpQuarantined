(this["webpackJsonphelp-quarantined"]=this["webpackJsonphelp-quarantined"]||[]).push([[0],{196:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return i}));var r=n(25),a=n(50),i=function(t,e,n,i,c){var u=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/u.innerWidth;i(e)},onEnd:function(t){var e=t.deltaX,n=u.innerWidth,a=e/n,i=t.velocityX,o=n/2,s=i>=0&&(i>.2||t.deltaX>o),d=(s?1-a:a)*n,h=0;if(d>5){var l=d/Math.abs(i);h=Math.min(l,540)}c(s,a<=0?.01:Object(r.c)(0,a,.9999),h)}})}}}]);
//# sourceMappingURL=0.ae84e0c2.chunk.js.map