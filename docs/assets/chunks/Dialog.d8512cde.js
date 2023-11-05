import{E as P,Z as $,d as y,H as p,F as j,M as W,U as S,j as F}from"./framework.294d97cd.js";function N(o){const{visible:t,onOk:l,onCancel:e,afterClose:n}=o;return{open:t,onOk:l,onCancel:e,afterClose:n}}function B(o,t){return t(o)}const d={pushDialog:o=>({type:"push_dialog",payload:o}),popDialog:o=>({type:"pop_dialog",payload:o}),showDialog:o=>({type:"show_dialog",payload:o}),hideDialog:o=>({type:"hide_dialog",payload:o}),clearDialogs:()=>({type:"clear_dialogs"})},m=P({dialogs:[],showDialogs:[]});function I(){function o(l,e){switch(e.type){case"push_dialog":return{...l,dialogs:[...l.dialogs,e.payload]};case"pop_dialog":return{...l,dialogs:l.dialogs.filter(n=>n!==e.payload)};case"show_dialog":return{...l,showDialogs:[...l.showDialogs,e.payload]};case"hide_dialog":return{...l,showDialogs:l.showDialogs.filter(n=>n!==e.payload)};case"clear_dialogs":return{...l,showDialogs:[]};default:return l}}function t(l){m.value=o(m.value,l)}return[m,t]}var k=typeof global=="object"&&global&&global.Object===Object&&global;const E=k;var G=typeof self=="object"&&self&&self.Object===Object&&self,R=E||G||Function("return this")();const q=R;var U=q.Symbol;const s=U;function V(o,t){for(var l=-1,e=o==null?0:o.length,n=Array(e);++l<e;)n[l]=t(o[l],l,o);return n}var H=Array.isArray;const L=H;var _=Object.prototype,Y=_.hasOwnProperty,Z=_.toString,g=s?s.toStringTag:void 0;function z(o){var t=Y.call(o,g),l=o[g];try{o[g]=void 0;var e=!0}catch{}var n=Z.call(o);return e&&(t?o[g]=l:delete o[g]),n}var J=Object.prototype,K=J.toString;function Q(o){return K.call(o)}var X="[object Null]",oo="[object Undefined]",b=s?s.toStringTag:void 0;function to(o){return o==null?o===void 0?oo:X:b&&b in Object(o)?z(o):Q(o)}function lo(o){return o!=null&&typeof o=="object"}var eo="[object Symbol]";function no(o){return typeof o=="symbol"||lo(o)&&to(o)==eo}var io=1/0,D=s?s.prototype:void 0,v=D?D.toString:void 0;function T(o){if(typeof o=="string")return o;if(L(o))return V(o,T)+"";if(no(o))return v?v.call(o):"";var t=o+"";return t=="0"&&1/o==-io?"-0":t}function ao(o){return o==null?"":T(o)}var ro=0;function so(o){var t=++ro;return ao(o)+t}var co=Object.defineProperty,go=(o,t,l)=>t in o?co(o,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[t]=l,r=(o,t,l)=>(go(o,typeof t!="symbol"?t+"":t,l),l);const A=class i{constructor(){r(this,"id",so("promise-dialog-")),r(this,"dialogController",null),r(this,"dialogPromise",{}),r(this,"confirm",t=>{var l,e,n;(e=(l=this.dialogPromise).resolve)==null||e.call(l,t),(n=this.hide)==null||n.call(this)}),r(this,"cancel",t=>{var l,e,n;(e=(l=this.dialogPromise).reject)==null||e.call(l,t),(n=this.hide)==null||n.call(this)})}static install(t){const{modalControllerAdapter:l}=t;i._ModalComponent=t.ModalComponent,l&&(i.modalControllerAdapter=l)}static get ModalComponent(){if(!i._ModalComponent)throw new Error("请先调用Dialog.install");return i._ModalComponent}get ComponentWithDialogContext(){if(!this._ComponentWithDialogContext)throw new Error("ComponentWithDialogContext未初始化");return this._ComponentWithDialogContext}static open(t,l,e){const n=new i;return n.create(t,l,e),n.show()}static clearDialogs(){i.dialogDispatch(d.clearDialogs())}create(t,l,e){$(t)?this.createByVnode(t,l):this.createByComponent(t,l,e)}createByVnode(t,l={}){const e=y({setup(){return()=>p(j,null,[t])}});this.createByComponent(e,l)}createByComponent(t,l,e={}){const{dialogify:n}=t,h=y({setup:()=>{const c=W(x);S(po,this);const u=async()=>{var a;await((a=this.onConfirmCallback)==null?void 0:a.call(this,this)),this.hide()},f=async()=>{var a;await((a=this.onCancelCallback)==null?void 0:a.call(this,this)),this.hide()},C=async()=>{i.dialogDispatch(d.popDialog(this))};return()=>{var a;const M=((a=c==null?void 0:c.value)==null?void 0:a.showDialogs.includes(this))||!1;this.dialogController={visible:M,onOk:u,onCancel:f,afterClose:C};const O={...B(this.dialogController,i.modalControllerAdapter),...n,...e};return p(i.ModalComponent,O,{default:()=>[p(t,l,null)]})}}});this._ComponentWithDialogContext=h,i.dialogDispatch(d.pushDialog(this))}async show(){return new Promise((t,l)=>{this.dialogPromise.resolve=t,this.dialogPromise.reject=l,i.dialogDispatch(d.showDialog(this))})}hide(){i.dialogDispatch(d.hideDialog(this))}onConfirm(t){this.onConfirmCallback=t}onCancel(t){this.onCancelCallback=t}};r(A,"modalControllerAdapter",N);let w=A;const po=Symbol("DialogContext"),x=Symbol("DialogAppContext"),fo=y({props:{ModalComponent:{type:Object,required:!0},modalControllerAdapter:{type:Function}},setup(o,{slots:t}){const l=o.ModalComponent,{modalControllerAdapter:e}=o,[n,h]=I();return S(x,n),F(()=>{w.install({ModalComponent:l,modalControllerAdapter:e}),w.dialogDispatch=h}),()=>{var c;return p(j,null,[(c=t.default)==null?void 0:c.call(t),n.value.dialogs.map((u,f)=>{const{ComponentWithDialogContext:C}=u;return p(C,{key:f},null)})])}}});export{fo as D,w as a,po as b};
