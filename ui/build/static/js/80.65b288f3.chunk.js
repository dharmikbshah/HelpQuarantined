(this["webpackJsonphelp-quarantined"]=this["webpackJsonphelp-quarantined"]||[]).push([[80],{126:function(i,d,n){"use strict";n.r(d),n.d(d,"ion_col",(function(){return e})),n.d(d,"ion_grid",(function(){return l})),n.d(d,"ion_row",(function(){return s}));var a=n(41),r=(n(13),{xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)"}),g=function(i){if(void 0===i||""===i)return!0;if(window.matchMedia){var d=r[i];return window.matchMedia(d).matches}return!1},t=window,o=!!(t.CSS&&t.CSS.supports&&t.CSS.supports("--a: 0")),p=["","xs","sm","md","lg","xl"],e=function(){function i(i){Object(a.k)(this,i)}return i.prototype.onResize=function(){this.el.forceUpdate()},i.prototype.getColumns=function(i){for(var d,n=0,a=p;n<a.length;n++){var r=a[n],t=g(r),o=this[i+r.charAt(0).toUpperCase()+r.slice(1)];t&&void 0!==o&&(d=o)}return d},i.prototype.calculateSize=function(){var i=this.getColumns("size");if(i&&""!==i){var d="auto"===i?"auto":o?"calc(calc("+i+" / var(--ion-grid-columns, 12)) * 100%)":i/12*100+"%";return{flex:"0 0 "+d,width:""+d,"max-width":""+d}}},i.prototype.calculatePosition=function(i,d){var n,a=this.getColumns(i);if(a)return(n={})[d]=o?"calc(calc("+a+" / var(--ion-grid-columns, 12)) * 100%)":a>0&&a<12?a/12*100+"%":"auto",n},i.prototype.calculateOffset=function(i){return this.calculatePosition("offset",i?"margin-right":"margin-left")},i.prototype.calculatePull=function(i){return this.calculatePosition("pull",i?"left":"right")},i.prototype.calculatePush=function(i){return this.calculatePosition("push",i?"right":"left")},i.prototype.render=function(){var i,d="rtl"===document.dir,n=Object(a.d)(this);return Object(a.i)(a.a,{class:(i={},i[n]=!0,i),style:Object.assign(Object.assign(Object.assign(Object.assign({},this.calculateOffset(d)),this.calculatePull(d)),this.calculatePush(d)),this.calculateSize())},Object(a.i)("slot",null))},Object.defineProperty(i.prototype,"el",{get:function(){return Object(a.f)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(i,"style",{get:function(){return":host{padding-left:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;width:100%;max-width:100%;min-height:1px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xs,var(--ion-grid-column-padding,5px))}}@media (min-width:576px){:host{padding-left:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-sm,var(--ion-grid-column-padding,5px))}}}@media (min-width:768px){:host{padding-left:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-md,var(--ion-grid-column-padding,5px))}}}@media (min-width:992px){:host{padding-left:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-lg,var(--ion-grid-column-padding,5px))}}}@media (min-width:1200px){:host{padding-left:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-right:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-top:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-bottom:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-start:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));-webkit-padding-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px));padding-inline-end:var(--ion-grid-column-padding-xl,var(--ion-grid-column-padding,5px))}}}"},enumerable:!0,configurable:!0}),i}(),l=function(){function i(i){Object(a.k)(this,i),this.fixed=!1}return i.prototype.render=function(){var i,d=Object(a.d)(this);return Object(a.i)(a.a,{class:(i={},i[d]=!0,i["grid-fixed"]=this.fixed,i)},Object(a.i)("slot",null))},Object.defineProperty(i,"style",{get:function(){return":host{padding-left:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));margin-left:auto;margin-right:auto;display:block;-ms-flex:1;flex:1}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xs,var(--ion-grid-padding,5px))}}@media (min-width:576px){:host{padding-left:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-sm,var(--ion-grid-padding,5px))}}}@media (min-width:768px){:host{padding-left:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-md,var(--ion-grid-padding,5px))}}}@media (min-width:992px){:host{padding-left:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-lg,var(--ion-grid-padding,5px))}}}@media (min-width:1200px){:host{padding-left:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-right:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-top:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-bottom:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px))}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-start:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));-webkit-padding-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));padding-inline-end:var(--ion-grid-padding-xl,var(--ion-grid-padding,5px));margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}}:host(.grid-fixed){width:var(--ion-grid-width-xs,var(--ion-grid-width,100%));max-width:100%}@media (min-width:576px){:host(.grid-fixed){width:var(--ion-grid-width-sm,var(--ion-grid-width,540px))}}@media (min-width:768px){:host(.grid-fixed){width:var(--ion-grid-width-md,var(--ion-grid-width,720px))}}@media (min-width:992px){:host(.grid-fixed){width:var(--ion-grid-width-lg,var(--ion-grid-width,960px))}}@media (min-width:1200px){:host(.grid-fixed){width:var(--ion-grid-width-xl,var(--ion-grid-width,1140px))}}:host(.ion-no-padding){--ion-grid-column-padding:0;--ion-grid-column-padding-xs:0;--ion-grid-column-padding-sm:0;--ion-grid-column-padding-md:0;--ion-grid-column-padding-lg:0;--ion-grid-column-padding-xl:0}"},enumerable:!0,configurable:!0}),i}(),s=function(){function i(i){Object(a.k)(this,i)}return i.prototype.render=function(){return Object(a.i)(a.a,{class:Object(a.d)(this)},Object(a.i)("slot",null))},Object.defineProperty(i,"style",{get:function(){return":host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}"},enumerable:!0,configurable:!0}),i}()}}]);
//# sourceMappingURL=80.65b288f3.chunk.js.map