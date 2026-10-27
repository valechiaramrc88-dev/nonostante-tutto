/* Logica della web app "Dal libro alla tavola": home con tessere, sezioni, giochi */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const WA=t=>WHATSAPP?`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`:"";
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== ICONE ===== */
const I={
 jar:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"><path d="M12 9h16v5H12z" fill="${c}" fill-opacity=".25"/><path d="M11 14h18l2 4v14a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V18z"/><path d="M14 22h12v7H14z" fill="${c}" fill-opacity=".25"/></svg>`,
 plate:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4"><circle cx="20" cy="22" r="12"/><circle cx="20" cy="22" r="6" fill="${c}" fill-opacity=".25"/><path d="M6 8v10M4 8v5a2 2 0 0 0 4 0V8M34 8c-2 2-2 8 0 10v10" stroke-linecap="round"/></svg>`,
 lens:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"><circle cx="17" cy="17" r="10" fill="${c}" fill-opacity=".15"/><path d="M25 25l9 9M13 15h8M13 20h6"/></svg>`,
 gift:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"><path d="M7 16h26v6H7z" fill="${c}" fill-opacity=".25"/><path d="M9 22h22v12H9zM20 16v18M20 16c-3-6-10-6-8-1 1 2 8 1 8 1zm0 0c3-6 10-6 8-1-1 2-8 1-8 1z"/></svg>`,
 pin:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4"><path d="M20 35s11-10 11-19a11 11 0 0 0-22 0c0 9 11 19 11 19z" fill="${c}" fill-opacity=".2"/><circle cx="20" cy="16" r="4"/></svg>`,
 star:(c,f)=>`<svg viewBox="0 0 40 40"><path d="M20 4l4.8 10 11 1.4-8.1 7.6 2.1 10.9L20 28.5 10.2 33.9l2.1-10.9L4.2 15.4l11-1.4z" fill="${f||"none"}" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
 ticket:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4"><path d="M5 12h30v5a3 3 0 0 0 0 6v5H5v-5a3 3 0 0 0 0-6z" fill="${c}" fill-opacity=".2"/><path d="M24 12v16" stroke-dasharray="3 3"/></svg>`,
 heartjar:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"><path d="M12 7h16v5H12z" fill="${c}" fill-opacity=".25"/><path d="M11 12h18l2 4v16a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V16z"/><path d="M20 30s-6-3.6-6-7.6a3.2 3.2 0 0 1 6-1.6 3.2 3.2 0 0 1 6 1.6c0 4-6 7.6-6 7.6z" fill="${c}" fill-opacity=".45"/></svg>`,
 bubble:c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"><path d="M6 9h28v18H18l-8 7v-7H6z" fill="${c}" fill-opacity=".2"/><path d="M13 16h14M13 21h9" stroke-linecap="round"/></svg>`,
 back:`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 4l-6 6 6 6"/></svg>`
};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();

/* ===== SEZIONI ===== */
const S=[
 {id:"prodotti",t:"Come li uso io",s:"Tutti i vasetti e come mangiarli",k:"t-tomato",ic:"jar",col:"--tomato",f:rProdotti},
 {id:"ospiti",t:"Ospiti all'improvviso",s:"Dimmi cosa hai in casa",k:"t-lemon",ic:"plate",col:"--apricot",f:rOspiti},
 {id:"coraggio",t:"Un vasetto di coraggio",s:"Aprilo quando ti serve una spinta",k:"t-rose",ic:"heartjar",col:"--rose",f:rCoraggio},
 {id:"vocina",t:"La voce del \"non abbastanza\"",s:"Un esercizio per risponderle",k:"t-mint",ic:"bubble",col:"--mint",f:rVocina},
 {id:"etichetta",t:"Dizionario dell'etichetta",s:"Sigle e parole spiegate, e un gioco",k:"t-sky",ic:"lens",col:"--sky",f:rEtichetta},
 {id:"trova",t:"Il vasetto giusto",s:"Tre domande e ti consiglio io",k:"t-plum",ic:"gift",col:"--plum",f:rTrova},
 {id:"dove",t:"Dove trovarmi",s:"Punto vendita e ordini",k:"t-green",ic:"pin",col:"--green",f:rDove},
 {id:"recensione",t:"Lascia una recensione",s:"Due righe che aiutano tanto",k:"t-apricot",ic:"star",col:"--apricot",f:rRecensione},
 {id:"regalo",t:"Il regalo per te",s:"10% di sconto per chi ha letto il libro",k:"t-green wide",ic:"ticket",col:"--green-ink",f:rRegalo}
];
function home(){
  const m=$("#main"); m.innerHTML=`<section class="panel"><div class="float" aria-hidden="true">${["🍋","🍒","🫒","🍓","🍐","🥕","🍑"].map((f,i)=>`<span style="animation-delay:${i*-.7}s">${f}</span>`).join("")}</div><div><p class="hello">Ciao! Sono Valentina.</p><p class="hello-sub">Qui trovi tutto quello che nel libro non ci stava: tocca un riquadro.</p></div>
  <div class="tiles">${S.map(s=>`<button class="tile ${s.k}" data-go="${s.id}">${I[s.ic](css(s.col))}<div><b>${s.t}</b><br><span>${s.s}</span></div></button>`).join("")}</div></section>`;
  m.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{const r=b.getBoundingClientRect();
    if(b.dataset.go==="regalo"){fireworks(4);setTimeout(()=>go("regalo"),reduce?0:900);return}
    b.classList.add("boing");confetti(r.left+r.width/2,r.top+r.height/2);setTimeout(()=>go(b.dataset.go),reduce?0:420)});
  m.querySelectorAll(".float span").forEach(s=>s.onclick=()=>{s.classList.remove("jump");void s.offsetWidth;s.classList.add("jump");const r=s.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2)});
}
function go(id){
  const s=S.find(x=>x.id===id); if(!s){home();store.set("tab","");return}
  const m=$("#main"); m.innerHTML=`<section class="panel"><div class="top"><button class="back" aria-label="Torna alla home">${I.back}</button><h2>${s.t}</h2></div><div id="sec" class="panel"></div></section>`;
  $(".back",m).onclick=()=>{home();window.scrollTo({top:0})};
  s.f($("#sec",m)); store.set("tab",id); window.scrollTo({top:0});
}
const FOOD=["🍋","🍒","🫒","🍓","🍐","🥕","🍅","🌿","🍑","🫐","🍎","🌶️"];
function part(ch,x,y,dx,dy,dur,size,delay){
  const d=document.createElement("span");d.className="food";d.textContent=ch;d.style.left=x+"px";d.style.top=y+"px";d.style.fontSize=size+"px";document.body.append(d);
  d.animate([{transform:"translate(-50%,-50%) scale(.3) rotate(0)",opacity:1},{transform:`translate(calc(-50% + ${dx*.7}px),calc(-50% + ${dy*.7}px)) scale(1) rotate(${(Math.random()-.5)*300}deg)`,opacity:1,offset:.55},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy+90}px)) scale(.8) rotate(${(Math.random()-.5)*500}deg)`,opacity:0}],{duration:dur,delay,easing:"cubic-bezier(.15,.7,.35,1)",fill:"both"}).onfinish=()=>d.remove();
}
/* piccola esplosione di frutta e verdura (al posto dei coriandoli) */
function confetti(x,y){
  if(reduce)return; x=x??innerWidth/2; y=y??innerHeight/2.6;
  for(let i=0;i<22;i++){const a=Math.random()*Math.PI*2,v=70+Math.random()*130;part(FOOD[i%FOOD.length],x,y,Math.cos(a)*v,Math.sin(a)*v,1100+Math.random()*500,18+Math.random()*14,0)}
}
/* fuochi d'artificio: razzi che salgono e scoppiano in frutta e verdura */
function fireworks(n=5){
  if(reduce)return;
  for(let k=0;k<n;k++){
    const delay=k*380, x=innerWidth*(.2+Math.random()*.6), y=innerHeight*(.18+Math.random()*.3);
    const r=document.createElement("span");r.className="rocket";r.style.left=x+"px";r.style.top=innerHeight+"px";document.body.append(r);
    r.animate([{transform:"translate(-50%,0)",opacity:1},{transform:`translate(-50%,${y-innerHeight}px)`,opacity:1}],{duration:650,delay,easing:"cubic-bezier(.3,.6,.4,1)",fill:"both"}).onfinish=()=>{r.remove();
      const set=FOOD.slice().sort(()=>Math.random()-.5).slice(0,3);
      for(let i=0;i<16;i++){const a=i/16*Math.PI*2,v=90+Math.random()*60;part(set[i%3],x,y,Math.cos(a)*v,Math.sin(a)*v,1300,20+Math.random()*10,0)}};
  }
}
const prodCard=(p,open)=>`<div class="prod" data-n="${esc(p[0])}"><button aria-expanded="${!!open}"><span class="jar c-${p[2]}">${esc(p[0][0])}</span><span class="pname">${esc(p[0])}</span><span class="pfmt">${esc(p[1])}</span></button><div class="pbody" ${open?"":"hidden"}><ul>${p[3].map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`;
function wireCards(root){root.querySelectorAll(".prod>button").forEach(b=>b.onclick=()=>{const o=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",o);b.nextElementSibling.hidden=!o})}

/* --- Come li uso io --- */
function rProdotti(el){
  let cat="",q="";
  el.innerHTML=`<p class="lead">Niente ricette, quelle restano in laboratorio. Ma ecco come mangiamo i miei vasetti a casa nostra.</p>
  <div class="row"><button class="btn alt" id="sorpresa">Sorprendimi</button><span class="note">pesca un vasetto a caso</span></div>
  <input type="search" id="cerca" aria-label="Cerca un prodotto" placeholder="Cerca: cipolle, castagne, pesto…">
  <div class="chips" id="cats"><button class="chip" aria-pressed="true" data-c="">Tutti</button>${Object.entries(C).map(([k,v])=>`<button class="chip" aria-pressed="false" data-c="${k}">${v}</button>`).join("")}</div>
  <p class="count" id="cnt"></p><div class="list" id="lst"></div>`;
  const lst=$("#lst",el);
  function draw(){
    const f=P.filter(p=>(!cat||p[2]===cat)&&(!q||p[0].toLowerCase().includes(q)));
    $("#cnt",el).textContent=`${f.length} prodotti`; let last="";
    lst.innerHTML=f.map(p=>{const h=p[2]!==last&&!cat?`<div class="cat">${C[p[2]]}</div>`:"";last=p[2];return h+prodCard(p)}).join("")||`<p class="note">Nessun prodotto con questo nome. Prova con una parola sola.</p>`;
    wireCards(lst);
  }
  $("#cerca",el).oninput=e=>{q=e.target.value.trim().toLowerCase();draw()};
  $("#cats",el).onclick=e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.c;$("#cats",el).querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw()};
  $("#sorpresa",el).onclick=()=>{cat="";q="";$("#cerca",el).value="";$("#cats",el).querySelectorAll("button").forEach((x,i)=>x.setAttribute("aria-pressed",i===0));draw();
    const p=P[Math.floor(Math.random()*P.length)];const card=[...lst.querySelectorAll(".prod")].find(c=>c.dataset.n===p[0]);
    if(card){const b=card.querySelector("button");b.setAttribute("aria-expanded",true);b.nextElementSibling.hidden=false;card.classList.remove("flash");void card.offsetWidth;card.classList.add("flash");card.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"})}};
  draw();
}

/* --- Ospiti all'improvviso --- */
function rOspiti(el){
  const sel=new Set(store.get("ospiti",["form_freschi","pane"]));
  el.innerHTML=`<p class="lead">Suonano alla porta e il frigo è mezzo vuoto? Tocca quello che hai in casa: ti dico quali vasetti aprire.</p>
  <div class="box"><span class="step">In casa ho</span><div class="chips" id="have" style="margin-top:10px">${Object.entries(T).map(([k,v])=>`<button class="chip" aria-pressed="${sel.has(k)}" data-k="${k}">${v}</button>`).join("")}</div></div>
  <div id="sug" class="pick"></div>`;
  function draw(){
    store.set("ospiti",[...sel]); const box=$("#sug",el);
    if(!sel.size){box.innerHTML=`<p class="note">Tocca almeno una cosa che hai in casa.</p>`;return}
    const r=shuffle(P).map(p=>({p,n:p[4].filter(t=>sel.has(t)).length})).filter(x=>x.n).sort((a,b)=>b.n-a.n).slice(0,6);
    box.innerHTML=`<p class="count">Aprirei questi ${r.length}:</p>`+r.map(({p})=>prodCard(p,true)).join("");
    wireCards(box);
  }
  $("#have",el).onclick=e=>{const b=e.target.closest("button");if(!b)return;const k=b.dataset.k;sel.has(k)?sel.delete(k):sel.add(k);b.setAttribute("aria-pressed",sel.has(k));draw()};
  draw();
}

/* --- Dizionario + gioco --- */
function rEtichetta(el){
  el.innerHTML=`<p class="lead">Hai trovato una sigla o una parola su una confezione e non sai cosa vuol dire? Cercala qui.</p>
  <input type="search" id="dz" aria-label="Cerca una parola o una sigla" placeholder="Es. E330, aromi naturali, confettura extra">
  <p class="count" id="dzc"></p><div class="list" id="dzl"></div>
  <div class="box" id="game"></div>
  <div class="box"><span class="step">Il metodo dei 30 secondi</span><ol class="rules" style="margin-top:8px">
   <li><b>Giralo.</b> La verità sta dietro.</li><li><b>I primi tre ingredienti.</b> Sono quelli che contano.</li><li><b>Le sigle E e le categorie.</b> Ognuna è un aiuto in più.</li><li><b>Zuccheri e sale.</b> Hanno tanti nomi, contali tutti.</li><li><b>Data e conservazione.</b> Entro, o preferibilmente entro?</li></ol></div>`;
  const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g,"");
  function draw(qq){const n=norm(qq||"");
    if(!n){$("#dzc",el).textContent=`${D.length} voci nel dizionario`;$("#dzl",el).innerHTML="";return}
    const f=D.filter(d=>norm(d[0]+d[1]).includes(n));$("#dzc",el).textContent=`${f.length} risultati`;
    $("#dzl",el).innerHTML=f.map(d=>`<div class="box" style="padding:12px 14px"><b>${esc(d[0])}</b><p style="margin:4px 0 0">${esc(d[1])}</p></div>`).join("")||`<p class="note">Non l'ho ancora nel dizionario. Prova a scrivere solo una parte, per esempio "E3" o "zucch".</p>`}
  $("#dz",el).oninput=e=>draw(e.target.value); draw("");
  const E=D.filter(d=>/^E\d/.test(d[0])); let pts=0,tot=0;
  function round(){
    const ok=E[Math.floor(Math.random()*E.length)]; const opts=shuffle([ok,...shuffle(E.filter(x=>x!==ok)).slice(0,2)]);
    const g=$("#game",el); g.innerHTML=`<div class="row" style="justify-content:space-between"><span class="step">Gioco: indovina la sigla</span><span class="score">${pts} su ${tot}</span></div>
     <p class="quiz-q">Cos'è ${esc(ok[0])}?</p><div class="opts">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${esc(o[1].split(".")[0])}</button>`).join("")}</div><p class="note" id="fb" aria-live="polite"></p>`;
    g.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(g.dataset.done)return;g.dataset.done=1;tot++;const o=opts[+b.dataset.i];
      g.querySelectorAll(".opt").forEach((x,i)=>{if(opts[i]===ok)x.classList.add("right")}); if(o===ok){pts++;$("#fb",g).textContent="Giusto! "+ok[1];confetti()}else{b.classList.add("wrong");$("#fb",g).textContent="Quasi. "+ok[1]}
      $(".score",g).textContent=`${pts} su ${tot}`; const n=document.createElement("button");n.className="btn alt";n.textContent="Un'altra!";n.onclick=()=>{delete g.dataset.done;round()};g.append(n)});
  }
  round();
}

/* --- Il vasetto giusto --- */
function rTrova(el){
  const Q=[
   {q:"Per chi è?",o:[["Per me, una coccola","me"],["Per chi ama cucinare","cuoco"],["Per chi fa l'aperitivo","aperi"],["Per un goloso di dolci","goloso"]]},
   {q:"Dolce o salato?",o:[["Dolce","d"],["Salato","s"],["Un po' e un po'","ds"]]},
   {q:"Quando lo apre?",o:[["A colazione","colazione"],["A cena","cena"],["Con gli amici","amici"],["In ogni momento","sempre"]]}
  ];
  let a=[],step=0;
  function ask(){
    const x=Q[step]; el.innerHTML=`<p class="lead">Rispondi a tre domande e ti consiglio tre vasetti, per te o da regalare.</p>
    <div class="box"><span class="step">Domanda ${step+1} di 3</span><p class="quiz-q">${x.q}</p><div class="opts">${x.o.map(o=>`<button class="opt" data-v="${o[1]}">${o[0]}</button>`).join("")}</div></div>`;
    el.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{a[step]=b.dataset.v;step++;step<3?ask():show()});
  }
  function score(p){
    const [chi,gusto,quando]=a, t=p[4], c=p[2]; let s=Math.random()*1.5;
    const dolce=c==="cc"&&!/cipolle|peperon|radicchio|melanzane|mele piccanti|pomodori/i.test(p[0])||c==="sc"||c==="ed";
    if(gusto==="d"&&dolce)s+=3; if(gusto==="s"&&!dolce)s+=3; if(gusto==="ds")s+=1.5;
    if(chi==="goloso"&&t.includes("dolci"))s+=2; if(chi==="aperi"&&(t.includes("aperitivo")||t.includes("form_stagionati")))s+=2;
    if(chi==="cuoco"&&(t.includes("pasta")||t.includes("carne")||c==="es"))s+=2; if(chi==="me"&&(t.includes("colazione")||t.includes("form_freschi")))s+=1.5;
    if(quando==="colazione"&&t.includes("colazione"))s+=2; if(quando==="cena"&&(t.includes("pasta")||t.includes("carne")||t.includes("zuppe")))s+=2;
    if(quando==="amici"&&(t.includes("aperitivo")||t.includes("form_stagionati")||t.includes("salumi")))s+=2;
    if(c==="so"||c==="cc")s+=1; if(/^Succo|Dado|Preparato/.test(p[0]))s-=2; return s;
  }
  function show(){
    const r=P.map(p=>({p,s:score(p)})).sort((x,y)=>y.s-x.s).slice(0,3).map(x=>x.p);
    const msg=`Ciao Valentina! Vorrei questi vasetti: ${r.map(p=>p[0]).join(", ")}. Come posso averli?`, wa=WA(msg);
    el.innerHTML=`<div class="box"><span class="step">Ecco i tuoi tre vasetti</span><p class="quiz-q" style="margin-bottom:0">Questi sono per te</p></div>
    <div class="pick">${r.map(p=>prodCard(p,true)).join("")}</div>
    <div class="box"><p style="margin:0 0 12px">Ti piacciono? Puoi ordinarli o farli impacchettare per un regalo.</p>
     <div class="row">${wa?`<a class="btn" href="${wa}" target="_blank" rel="noopener">Ordina su WhatsApp</a>`:""}<a class="btn ${wa?"ghost":""}" href="${SITO}" target="_blank" rel="noopener">Negozio online</a><button class="btn alt" id="again">Rifai il gioco</button></div></div>`;
    wireCards(el); $("#again",el).onclick=()=>{a=[];step=0;ask()}; confetti();
  }
  ask();
}

/* --- Dove trovarmi --- */
function rDove(el){
  const tel=TELEFONO.replace(/\s+/g,"");
  const w1=WA("Ciao Valentina! Vorrei passare al punto vendita a prendere qualche vasetto. Quando ti trovo?"),
        w2=WA("Ciao Valentina! Posso passare oggi al punto vendita? A che ora ti trovo?"),
        w3=WA("Ciao Valentina! Vorrei fare un ordine: ");
  el.innerHTML=`<p class="lead">Al punto vendita in cortile o nel negozio online.</p>
  <div class="box"><span class="step">Il punto vendita</span>
   <p style="margin:8px 0 2px"><b>Bontà di Montiglie</b></p><p style="margin:0 0 12px;user-select:all">via Montiglie 12, 10010 Settimo Vittone (TO)</p>
   <a class="btn ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("via Montiglie 12, Settimo Vittone TO")}" target="_blank" rel="noopener">Apri la mappa</a></div>
  <div class="box t-lemon"><span class="step">Scrivimi prima di passare</span>
   <p style="margin:8px 0 12px">Il negozio è nel cortile di casa: mandami un messaggio o chiamami prima di venire, così sono sicura di farmi trovare.</p>
   <div class="row">${w1?`<a class="btn" href="${w1}" target="_blank" rel="noopener">Scrivimi su WhatsApp</a>`:""}${w2?`<a class="btn alt" href="${w2}" target="_blank" rel="noopener">Posso passare oggi?</a>`:""}${tel?`<a class="btn ghost" href="tel:${esc(tel)}">Chiamami</a>`:""}</div>
   ${tel?`<p class="note" style="margin:10px 0 0">Il mio numero: <b style="user-select:all">${esc(TELEFONO)}</b> <button class="btn ghost" id="copynum" style="padding:6px 12px;font-size:13px;margin-left:6px">Copia</button></p>`:`<p class="note" style="margin:10px 0 0">Qui comparirà il mio numero di telefono.</p>`}
   <p class="note" id="nummsg" aria-live="polite" style="margin:4px 0 0"></p></div>
  <div class="box"><span class="step">Fare un ordine</span><p style="margin:8px 0 12px">Dal negozio online${w3?" oppure con un messaggio su WhatsApp":""}.</p>
   <div class="row"><a class="btn" href="${SITO}" target="_blank" rel="noopener">Negozio online</a>${w3?`<a class="btn ghost" href="${w3}" target="_blank" rel="noopener">Ordina su WhatsApp</a>`:""}</div></div>`;
  const c=$("#copynum",el); if(c)c.onclick=()=>{const ok=()=>$("#nummsg",el).textContent="Numero copiato.";
    navigator.clipboard?navigator.clipboard.writeText(TELEFONO).then(ok).catch(()=>$("#nummsg",el).textContent="Tieni premuto sul numero per copiarlo."):$("#nummsg",el).textContent="Tieni premuto sul numero per copiarlo."};
}

/* --- Recensione --- */
function rRecensione(el){
  el.innerHTML=`<p class="lead">Se il libro ti ha lasciato qualcosa, raccontalo. Ogni recensione sincera aiuta il libro a farsi trovare da altre persone.</p>
  <div class="box"><span class="step">Com'è stato per te?</span><div class="stars" id="st" role="group" aria-label="Quante stelle daresti">${[1,2,3,4,5].map(n=>`<button data-n="${n}" aria-label="${n} stelle">${I.star(css("--lemon"))}</button>`).join("")}</div>
   <p class="note" id="stm" aria-live="polite" style="margin:6px 0 0">Tocca le stelle, poi lascia la tua recensione: bastano due righe.</p></div>
  <div class="box"><span class="step">Qualche idea per scriverla</span><ul class="rules" style="margin-top:8px"><li>Quale parte della storia ti è rimasta dentro?</li><li>Hai provato il metodo per leggere le etichette?</li><li>Hai assaggiato qualche vasetto? Quale?</li></ul></div>
  <div class="box"><div class="row">${AMAZON_RECENSIONE?`<a class="btn" href="${AMAZON_RECENSIONE}" target="_blank" rel="noopener">Recensisci il libro su Amazon</a>`:`<span class="note">Il link per recensire il libro su Amazon arriverà appena il libro sarà pubblicato.</span>`}
</div></div>`;
  const msgs=["Grazie per la sincerità.","Grazie, ogni parola mi aiuta a migliorare.","Grazie! Raccontami cosa ti è piaciuto.","Che bello, grazie!","Mi hai fatto sorridere, grazie!"];
  $("#st",el).onclick=e=>{const b=e.target.closest("button");if(!b)return;const n=+b.dataset.n;
    $("#st",el).querySelectorAll("button").forEach((x,i)=>x.innerHTML=I.star(css("--lemon"),i<n?css("--lemon"):"none"));
    $("#stm",el).textContent=msgs[n-1]+" Ora lascia la tua recensione qui sotto."; if(n>=4)confetti()};
}

/* --- Regalo --- */
function rRegalo(el){
  el.innerHTML=`<p class="lead">Grazie per aver letto Nonostante tutto. Adesso è il momento di assaggiare.</p>
  <div class="box" style="display:flex;flex-direction:column;gap:14px;align-items:flex-start">
   <span class="step">Il tuo codice sconto</span><button class="code" id="cod" aria-label="Codice LIBRO26, tocca per festeggiare">LIBRO26</button>
   <p style="margin:0"><b>10% sul primo ordine, senza minimo di spesa.</b></p>
   <div class="row"><button class="btn" id="copia">Copia il codice</button><a class="btn ghost" href="${SITO}" target="_blank" rel="noopener">Vai al negozio online</a></div>
   <p class="note" id="msg" style="margin:0" aria-live="polite"></p></div>
  <div class="box"><ol class="rules"><li>Scegli i tuoi vasetti su bontadimontiglie.it.</li><li>Quando sei nel carrello, scrivi il codice <b>LIBRO26</b>, tutto in maiuscolo.</li><li>Lo sconto del 10% si applica al tuo primo ordine.</li></ol></div>`;
  $("#cod",el).onclick=()=>fireworks(3);
  $("#copia",el).onclick=()=>{const done=()=>{$("#msg",el).textContent="Codice copiato: incollalo nel carrello.";fireworks(5)};
    if(navigator.clipboard)navigator.clipboard.writeText("LIBRO26").then(done).catch(sel);else sel();
    function sel(){const r=document.createRange();r.selectNodeContents($("#cod",el));const s=getSelection();s.removeAllRanges();s.addRange(r);$("#msg",el).textContent="Il codice è selezionato: copialo e incollalo nel carrello.";fireworks(5)}};
}


/* --- Un vasetto di coraggio --- */
function rCoraggio(el){
  let last=-1;
  el.innerHTML=`<p class="lead">Nei giorni in cui ti senti "non abbastanza", apri il vasetto: dentro c'è una frase del libro, ogni volta diversa.</p>
  <div class="box jarbox"><button class="bigjar" id="jar" aria-label="Apri il vasetto">
   <svg viewBox="0 0 160 190" width="160" height="190" aria-hidden="true">
    <g id="lid"><rect x="34" y="18" width="92" height="22" rx="6" fill="var(--tomato)"/><path d="M28 38h104l-8 16H36z" fill="var(--tomato-soft)" stroke="var(--tomato)" stroke-width="3"/>
     <path d="M48 24h8M64 24h8M80 24h8M96 24h8M112 24h4" stroke="#fff" stroke-width="4" opacity=".7"/></g>
    <path d="M36 56h88l10 18v92a14 14 0 0 1-14 14H40a14 14 0 0 1-14-14V74z" fill="var(--card)" stroke="var(--green)" stroke-width="4"/>
    <path d="M32 104h96v62a10 10 0 0 1-10 10H42a10 10 0 0 1-10-10z" fill="var(--lemon-soft)"/>
    <path d="M80 150s-17-10-17-21a9 9 0 0 1 17-4.4A9 9 0 0 1 97 129c0 11-17 21-17 21z" fill="var(--rose)"/>
   </svg><span class="tap">tocca per aprirlo</span></button>
  <div class="quote" id="q" hidden><p id="qt"></p><small>dal libro <i>Nonostante tutto</i></small></div>
  <div class="row" id="qa" hidden><button class="btn" id="again">Aprine un altro</button><button class="btn ghost" id="share">Copia la frase</button></div>
  <p class="note" id="qm" aria-live="polite"></p></div>`;
  const jar=$("#jar",el), lid=$("#lid",el);
  function open(){
    let i; do{i=Math.floor(Math.random()*FRASI.length)}while(i===last&&FRASI.length>1); last=i;
    $("#q",el).hidden=true; $("#qm",el).textContent="";
    if(!reduce)lid.animate([{transform:"translate(0,0) rotate(0)"},{transform:"translate(40px,-60px) rotate(35deg)",offset:.5},{transform:"translate(0,0) rotate(0)"}],{duration:900,easing:"ease-in-out"});
    jar.classList.remove("shake");void jar.offsetWidth;jar.classList.add("shake");
    const r=jar.getBoundingClientRect(); confetti(r.left+r.width/2,r.top+30);
    setTimeout(()=>{$("#qt",el).textContent="“"+FRASI[i]+"”";$("#q",el).hidden=false;$("#qa",el).hidden=false;$(".tap",el).textContent="tocca per un'altra frase"},reduce?0:450);
  }
  jar.onclick=open; $("#again",el).onclick=open;
  $("#share",el).onclick=()=>{const s=$("#qt",el).textContent+" (Valentina Patti, Nonostante tutto)";
    if(navigator.share){navigator.share({text:s}).catch(()=>{})}
    else if(navigator.clipboard){navigator.clipboard.writeText(s).then(()=>$("#qm",el).textContent="Frase copiata: mandala a chi ne ha bisogno.").catch(()=>$("#qm",el).textContent="Tieni premuto sulla frase per copiarla.")}
    else $("#qm",el).textContent="Tieni premuto sulla frase per copiarla."};
}

/* --- La voce del "non abbastanza" --- */
function rVocina(el){
  const saved=store.get("bigliettini",[]); let st=0, v={};
  function draw(){
    if(st===0){el.innerHTML=`<p class="lead">Quella vocina che dice "non sei abbastanza" ce l'abbiamo tutti. Io ho imparato a risponderle così. Ci vogliono due minuti.</p>
     <div class="box"><span class="step">1 di 3</span><p class="quiz-q">Cosa ti dice oggi la vocina?</p>
     <textarea id="v1" rows="3" placeholder="Es. non sei capace, tanto ti diranno di no">${esc(v.a||"")}</textarea>
     <div class="row" style="margin-top:12px"><button class="btn" id="n1">Avanti</button></div></div>${list()}`;
     $("#n1",el).onclick=()=>{v.a=$("#v1",el).value.trim();if(!v.a){$("#v1",el).focus();return}st=1;draw()}}
    else if(st===1){el.innerHTML=`<div class="box"><span class="step">2 di 3</span><p class="quiz-q">"${esc(v.a)}"</p><p style="margin:0 0 12px">Secondo te è la verità, o è un'abitudine?</p>
     <div class="opts"><button class="opt" data-v="v">Mi sembra la verità</button><button class="opt" data-v="a">Forse è un'abitudine</button></div><p id="ans" aria-live="polite"></p>
     <div class="row" id="n2w" hidden><button class="btn" id="n2">Avanti</button></div></div>`;
     el.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{el.querySelectorAll(".opt").forEach(x=>x.classList.toggle("right",x===b));
      $("#ans",el).textContent=b.dataset.v==="a"?"Esatto. Per anni l'ho creduta vera anch'io. Poi ho capito che era solo un'abitudine, e le abitudini, con pazienza, si possono cambiare.":"Capita, quando la senti da tanto tempo. Anche io la credevo vera. Prova per un attimo a pensarla come un'abitudine: le abitudini si possono cambiare.";
      $("#n2w",el).hidden=false});
     $("#n2",el).onclick=()=>{st=2;draw()}}
    else if(st===2){el.innerHTML=`<div class="box"><span class="step">3 di 3</span><p class="quiz-q">Se un'amica ti dicesse "${esc(v.a)}", tu cosa le risponderesti?</p>
     <textarea id="v3" rows="3" placeholder="Es. stai imparando, e si vede">${esc(v.c||"")}</textarea>
     <div class="row" style="margin-top:12px"><button class="btn" id="n3">Fatto</button></div></div>`;
     $("#n3",el).onclick=()=>{v.c=$("#v3",el).value.trim();if(!v.c){$("#v3",el).focus();return}st=3;draw();const r=$(".ticket",el).getBoundingClientRect();confetti(r.left+r.width/2,r.top+40)}}
    else{el.innerHTML=`<div class="box"><span class="step">La tua nuova frase</span>
     <div class="ticket"><s>${esc(v.a)}</s><p>${esc(v.c)}</p></div>
     <p class="note" style="margin:10px 0 12px">Rileggila la prossima volta che senti la vocina. E ricordati il retrobottega: dietro la vetrina perfetta degli altri c'è una stanza meno ordinata, come quella di tutti.</p>
     <div class="row"><button class="btn" id="sv">Tienila sul telefono</button><button class="btn ghost" id="rs">Ricomincia</button></div><p class="note" id="svm" aria-live="polite"></p></div>${list()}`;
     $("#sv",el).onclick=()=>{saved.unshift({a:v.a,c:v.c});store.set("bigliettini",saved.slice(0,30));$("#svm",el).textContent="Salvata. La trovi qui sotto, solo su questo telefono.";$("#sv",el).disabled=true;el.insertAdjacentHTML("beforeend",list())};
     $("#rs",el).onclick=()=>{v={};st=0;draw()}}
  }
  function list(){return saved.length?`<div class="box"><span class="step">I tuoi bigliettini</span>${saved.slice(0,8).map(x=>`<div class="ticket small"><s>${esc(x.a)}</s><p>${esc(x.c)}</p></div>`).join("")}</div>`:""}
  draw();
  el.insertAdjacentHTML("afterend",`<p class="note" style="margin-top:4px">Se la vocina diventa troppo forte e ti pesa ogni giorno, parlane con qualcuno di cui ti fidi o con un professionista. Chiedere aiuto è un gesto di coraggio.</p>`);
}

/* ===== AVVIO ===== */
$("#homebtn").onclick=e=>{e.preventDefault();home();store.set("tab","")};
const start=(location.hash||"").slice(1);
if(S.some(s=>s.id===start))go(start);else home();
