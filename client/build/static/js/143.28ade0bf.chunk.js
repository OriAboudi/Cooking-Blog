"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[143],{9037:function(e,t,s){s(2791);var r=s(1087),n=(s(5307),s(184));t.Z=function(e){var t=e.info;return(0,n.jsx)("div",{children:(0,n.jsx)(r.rU,{to:"/recipeInfo/"+t._id,children:(0,n.jsx)("div",{className:"m-4",children:(0,n.jsxs)("div",{className:"drop-shadow general__img food__link ",children:[(0,n.jsx)("img",{src:t.img_url,alt:"recipe",loading:"lazy"}),(0,n.jsx)("div",{className:"pt-1 text-center",children:t.name})]})})})})}},9655:function(e,t,s){var r=s(2982),n=s(4165),a=s(5861),i=s(885),c=s(2791),l=s(7689),d=s(5617),o=s(184);t.Z=function(e){var t=(0,l.s0)(),s=(0,c.useState)([]),x=(0,i.Z)(s,2),u=x[0],m=x[1];(0,c.useEffect)((function(){p()}),[e.apiPage]);var p=function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){var s,r,a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=e.apiPage,t.next=3,(0,d.R1)(s);case 3:r=t.sent,a=r.data,console.log(a),m(a.pages);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,o.jsx)("div",{className:"ml-[80px]",children:(0,r.Z)(Array(u)).map((function(s,r){return(0,o.jsx)("button",{onClick:function(){t("".concat(e.linkTo).concat(r+1))},className:"bg-black text-white p-2 m-1 rounded-xl ml-[20px] hover:bg-slate-600",children:r+1},r)}))})}},5143:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var r=s(4165),n=s(5861),a=s(885),i=s(2791),c=s(7689),l=s(1087),d=s(7739),o=s(5617),x=s(9037),u=s(9655),m=s(184);var p=function(e){var t,s=e.data,r=(0,c.s0)();return(0,m.jsxs)("div",{className:"mt-[30px]",children:[s.recipe_id?(0,m.jsxs)("div",{children:["   ",!s.recipe_id.length>0?(0,m.jsx)("p",{className:"text-center  text-3xl font-bold my-4 text-gray-900",children:"No Results"}):(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"text-center  text-3xl font-bold my-4 text-gray-900",children:"Your Recipes "+s.fullName}),(0,m.jsx)("div",{className:"flex flex-wrap justify-center ",children:null===(t=s.recipe_id)||void 0===t?void 0:t.map((function(e,t){return(0,m.jsx)(x.Z,{info:e},t)}))})]})]}):(0,m.jsx)("div",{children:"Loading"}),(0,m.jsx)("div",{className:"flex justify-center sm:block sm:ml-[100px]  ",children:(0,m.jsx)("button",{onClick:function(){r(-1)},className:"bg-gray-900 text-white px-[50px] py-2 my-4 mx-auto  ring-1 ring-black transition transform hover:-translate-y-0.5",children:"Back"})}),(0,m.jsx)(u.Z,{apiPage:d.n1+"recipes/pages/count?perPage=9&id="+s._id,linkTo:"/userInfo?page="})]})};var h=function(){var e=(0,i.useState)([]),t=(0,a.Z)(e,2),s=t[0],x=t[1],u=(0,c.s0)(),h=(0,l.lr)(),g=(0,a.Z)(h,1)[0],f=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(){var t,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(g.get("page")),e.next=4,(0,o.R1)(d.CD+"?page="+g.get("page"));case 4:t=e.sent,s=t.data,console.log(s),x(s),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){f()}),[g.get("page")]),(0,m.jsx)("div",{children:s.recipe_id?(0,m.jsxs)("div",{className:"p-16",children:[(0,m.jsxs)("div",{className:"p-8 bg-white shadow mt-24",children:[(0,m.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3",children:[(0,m.jsxs)("div",{className:"grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0",children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"font-bold text-gray-700 text-xl",children:s.role}),(0,m.jsx)("p",{className:"text-gray-400",children:"role"})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"font-bold text-gray-700 text-xl",children:s.recipe_id.length}),(0,m.jsx)("p",{className:"text-gray-400",children:"Recipes"})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"font-bold text-gray-700 text-xl",children:s.fav_id.length}),(0,m.jsx)("p",{className:"text-gray-400",children:"Favorit recipes"})]})]}),(0,m.jsx)("div",{className:"relative",children:(0,m.jsx)("div",{children:(0,m.jsx)("img",{src:s.profileImg?s.profileImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU",className:"w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center",alt:"userImage"})})}),(0,m.jsxs)("div",{className:"space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center",children:[(0,m.jsx)("button",{onClick:function(){return u("/submit-recipe")},className:"text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5",children:"Submit"}),(0,m.jsx)("button",{onClick:function(){return u("/submit-recipe")},className:"text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5",children:"My Favorit"})]})]}),(0,m.jsxs)("div",{className:"mt-20 text-center pb-12",children:[(0,m.jsxs)("h1",{className:"text-4xl font-medium text-gray-700",children:[s.fullName," ",(0,m.jsx)("span",{className:"font-light text-gray-500",children:"27"})]}),(0,m.jsx)("p",{className:"font-light text-gray-600 mt-3",children:"Bucharest, Romania"})]})]}),(0,m.jsx)(p,{data:s})]}):(0,m.jsx)("div",{children:"Loading"})})}},5307:function(){}}]);
//# sourceMappingURL=143.28ade0bf.chunk.js.map