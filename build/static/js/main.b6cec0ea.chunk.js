(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{40:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(15),a=n.n(c),o=n(3),u=n(0),i=function(e){var t=e.newFilter,n=e.handleFilterChange;return Object(u.jsxs)("p",{children:["Filter shown with:",Object(u.jsx)("input",{value:t,onChange:n})]})},s=function(e){var t=e.person;return Object(u.jsxs)(u.Fragment,{children:[t.name," ",t.number]})},d=function(e){var t=e.persons,n=e.newFilter,r=e.handleDelete;return Object(u.jsx)("div",{children:t.filter((function(e){return e.name.toLowerCase().startsWith(n.toLowerCase())})).map((function(e,t){return Object(u.jsxs)("p",{children:[Object(u.jsx)(s,{person:e},t),Object(u.jsx)("button",{onClick:r(e),type:"submit",children:"delete"})]},t)}))})},l=function(e){var t=e.message;return null===t?null:Object(u.jsx)("div",{style:{color:"blue",fontStyle:"bold",fontSize:20,backgroundColor:"lightgrey",width:500},children:t})},b=n(4),j=n.n(b),h="/api/persons",f={getAll:function(){return j.a.get(h).then((function(e){return e.data}))},create:function(e){return j.a.post(h,e).then((function(e){return e.data}))},update:function(e,t){return j.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},remove:function(e,t){return j.a.delete("".concat(h,"/").concat(e)).then((function(e){return t("Person has been removed from the database!"),e.data})).catch((function(e){return t("Error! That person has already been removed from the database!")}))}},O=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(o.a)(a,2),b=s[0],j=s[1],h=Object(r.useState)(""),O=Object(o.a)(h,2),m=O[0],p=O[1],v=Object(r.useState)(""),x=Object(o.a)(v,2),g=x[0],w=x[1],y=Object(r.useState)("Contacts loaded from JSON database!"),C=Object(o.a)(y,2),k=C[0],F=C[1];Object(r.useEffect)((function(){return f.getAll().then((function(e){return c(e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(l,{message:k}),Object(u.jsx)(i,{newFilter:g,handleFilterChange:function(e){return w(e.target.value)}}),Object(u.jsx)("h2",{children:"Add a new entry "}),Object(u.jsxs)("form",{children:[Object(u.jsxs)("div",{children:["Name:",Object(u.jsx)("input",{value:b,onChange:function(e){return j(e.target.value)}})]}),Object(u.jsxs)("div",{children:["Phone number:",Object(u.jsx)("input",{value:m,onChange:function(e){return p(e.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{onClick:function(e){e.preventDefault();var t={name:b,number:m},r=n.find((function(e){return e.name===b}));r?window.confirm("".concat(r.name," is already a contact. Would you like to update his phone number?"))&&f.update(r.id,t).then((function(e){c(n.map((function(e){return e.id===r.id?t:e}))),F("".concat(t.name,"'s record has been updated!"))})):f.create(t).then((function(e){c(n.concat(e)),F("".concat(t.name," added to database!"))})),j(""),p("")},type:"submit",children:"add"})})]}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(d,{persons:n,newFilter:g,handleDelete:function(e){return function(){window.confirm("Are you sure you would like to delete this user?")&&(c(n.filter((function(t){return t.id!==e.id}))),f.remove(e.id,F))}}})]})};a.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.b6cec0ea.chunk.js.map