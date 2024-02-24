"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[872],{7872:function(e,s,r){r.r(s),r.d(s,{default:function(){return f}});var a=r(1413),n=r(4165),l=r(5861),t=r(885),o=r(4925),i=r(2791),d=["title","titleId"];var c=i.forwardRef((function(e,s){var r=e.title,a=e.titleId,n=(0,o.Z)(e,d);return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:s,"aria-labelledby":a},n),r?i.createElement("title",{id:a},r):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}))})),m=r(1134),u=r(7689),p=r(7739),x=r(5617),g=r(184),f=function(){var e=(0,u.s0)(),s=(0,i.useState)(""),r=(0,t.Z)(s,2),o=r[0],d=r[1],f=(0,m.cI)(),h=f.getValues,b=f.register,y=f.handleSubmit,v=f.formState.errors,w=function(){var s=(0,l.Z)((0,n.Z)().mark((function s(r){var a,l;return(0,n.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,console.log(r),s.next=4,(0,x.sg)(p.Dt,r);case 4:a=s.sent,l=a.data,console.log(l),l.msg&&e("/login"),s.next=14;break;case 10:s.prev=10,s.t0=s.catch(0),console.log(s.t0.response.data),11e3===s.t0.response.data.code&&d(s.t0.response.data.err_msg);case 14:case"end":return s.stop()}}),s,null,[[0,10]])})));return function(e){return s.apply(this,arguments)}}();return(0,g.jsx)("div",{className:"flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8",children:(0,g.jsxs)("div",{className:"w-full max-w-md space-y-8",children:["//TODO: create a icon of Sign Up",(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{}),(0,g.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900",children:"Sign Up"})]}),(0,g.jsxs)("form",{onSubmit:y((function(e){delete e.confirmPassword,console.log(e);var s={fullName:e.fullName,email:e.email,password:e.password};e.profileImg&&(s.profileImg=e.profileImg),console.log(s),w(s)})),className:"mt-8 space-y-6",children:[(0,g.jsx)("input",{type:"hidden",name:"remember",defaultValue:"true"}),(0,g.jsxs)("div",{className:"-space-y-px rounded-md shadow-sm",children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"sr-only",children:"fullName"}),(0,g.jsx)("input",(0,a.Z)((0,a.Z)({},b("fullName",{required:{value:!0,message:"name is required"},minLength:{value:2,message:"min 2 characters"},maxLength:{value:20,message:" maximum 20 characters"}})),{},{type:"text",className:"mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",placeholder:"FullName..."})),v.fullName&&(0,g.jsxs)("p",{className:"text-red-600",children:[" ",v.fullName.message]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"sr-only",children:"Profile Iamge Link"}),(0,g.jsx)("textarea",(0,a.Z)((0,a.Z)({rows:5},b("profileImg",{required:{value:!1,message:"name is required"},minLength:{value:2,message:"min 2 characters"}})),{},{type:"text",className:"mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",placeholder:"Profile Image Link..."})),v.profile&&(0,g.jsxs)("p",{className:"text-red-600",children:[" ",v.profile.message]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"sr-only",children:"Email address"}),(0,g.jsx)("input",(0,a.Z)((0,a.Z)({},b("email",{required:{value:!0,message:"Email is required"},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Email invalid"}})),{},{type:"email",className:"mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",placeholder:"Email address"})),v.email&&(0,g.jsxs)("p",{className:"text-red-600",children:[v.email.message," "]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"sr-only",children:"password"}),(0,g.jsx)("input",(0,a.Z)((0,a.Z)({},b("password",{required:{value:!0,message:"password is required"},minLength:{value:3,message:"min two characters"},maxLength:{value:20,message:"max 20 characters"}})),{},{type:"password",className:"mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",placeholder:"password.."})),v.password&&(0,g.jsx)("p",{className:"text-red-600",children:v.password.message})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{className:"sr-only",children:"confirm password..."}),(0,g.jsx)("input",(0,a.Z)((0,a.Z)({},b("confirmPassword",{required:{value:!0,message:"password is required"},validate:function(e){return e===h("password")||"password not mach"}})),{},{type:"password",className:"mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",placeholder:"confirm password....."})),v.confirmPassword&&(0,g.jsxs)("p",{className:"text-red-600",children:[v.confirmPassword.message," "]})]})]}),(0,g.jsxs)("div",{className:"flex items-center justify-between",children:[(0,g.jsxs)("div",{className:"flex items-center",children:[(0,g.jsx)("input",{id:"remember-me",name:"remember-me",type:"checkbox",className:"h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"}),(0,g.jsx)("label",{htmlFor:"remember-me",className:"ml-2 block text-sm text-gray-900",children:"Remember me"})]}),(0,g.jsx)("div",{className:"text-sm"})]}),o&&(0,g.jsxs)("p",{className:"text-red-600",children:[o,"! "]}),(0,g.jsx)("div",{children:(0,g.jsxs)("button",{type:"submit",className:"group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:[(0,g.jsx)("span",{className:"absolute inset-y-0 left-0 flex items-center pl-3",children:(0,g.jsx)(c,{className:"h-5 w-5 text-white ","aria-hidden":"true"})}),"Sign Up"]})})]})]})})}}}]);
//# sourceMappingURL=872.87f47308.chunk.js.map