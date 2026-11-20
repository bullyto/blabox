/* Barèmes partagés : niveaux cibles 1 à 20, sans dépendance au stock du joueur. */
(function(root){
'use strict';
const level=n=>Math.max(1,Math.min(20,Math.floor(Number(n)||1)));
function duration(kind,n){const max=kind==='spell'?15*86400:10*86400;return kind==='sacrifice'?7200:Math.round(7200*Math.pow(max/7200,(level(n)-1)/19));}
function quote(kind,n,cap,spell){n=level(n);if(kind==='sacrifice')return{to:1,gold:150000,elixir:150000,seconds:7200};const cost=Math.ceil(cap(n)*(kind==='spell'?.09:.05));let gold=cost,elixir=cost;if(kind==='spell'){gold=['heal','bubble','fire'].includes(spell)?cost:0;elixir=gold?0:cost;}return{to:n,gold,elixir,seconds:duration(kind,n)};}
const api={duration,quote,level};root.BlaboxResearch0322=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
