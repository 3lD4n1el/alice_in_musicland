
(function(){
  "use strict";

  /* ===== navegación + glissando ===== */
  var slides = document.querySelectorAll(".slide");
  var total = slides.length;
  var current = 0;
  var dotsBox = document.getElementById("dots");
  var bar = document.getElementById("progressBar");
  var runMark = document.getElementById("runMark");
  var counter = document.getElementById("counter");
  var gliss = document.getElementById("gliss");

  for (var i = 0; i < total; i++){
    var d = document.createElement("div");
    d.className = "dot";
    d.dataset.i = i;
    d.addEventListener("click", function(){ goTo(parseInt(this.dataset.i,10)); });
    dotsBox.appendChild(d);
  }
  var dots = dotsBox.querySelectorAll(".dot");

  function pad(n){ return (n<10?"0":"")+n; }
  function doGliss(){
    gliss.classList.remove("go");
    void gliss.offsetWidth;
    gliss.classList.add("go");
  }
  function goTo(n, silent){
    if (n < 0 || n >= total) return;
    if (!silent && n !== current) doGliss();
    slides[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    var pct = ((current)/(total-1))*100;
    bar.style.width = pct + "%";
    runMark.style.left = pct + "%";
    counter.innerHTML = "<b>"+pad(current+1)+"</b> / "+pad(total);
    for (var k = 0; k < total; k++){
      dots[k].classList.toggle("active", k === current);
      dots[k].classList.toggle("done", k < current);
    }
  }
  document.getElementById("prev").addEventListener("click", function(){ goTo(current-1); });
  document.getElementById("next").addEventListener("click", function(){ goTo(current+1); });
  document.addEventListener("keydown", function(e){
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") goTo(current+1);
    if (e.key === "ArrowLeft") goTo(current-1);
  });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(parseInt(this.dataset.go,10)); });
  });

  /* ===== retratos ===== */
  function avatarSVG(hair, hc, cc, extra){
    var skin = "#f6d7b0";
    var back = "";
    var front = "";
    if (hair === "long"){
      back = "<path d='M28,40 C19,68 21,98 27,108 L38,102 C33,82 33,60 37,46 Z' fill='"+hc+"'/>" +
             "<path d='M72,40 C81,68 79,98 73,108 L62,102 C67,82 67,60 63,46 Z' fill='"+hc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+hc+"'/>";
    } else if (hair === "bun"){
      back = "<circle cx='50' cy='24' r='11' fill='"+hc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+hc+"'/>";
    } else if (hair === "spiky"){
      front = "<path d='M26,54 Q22,24 50,22 Q78,24 74,54 L69,41 L63,52 L57,39 L50,51 L43,39 L37,52 L31,41 Z' fill='"+hc+"'/>";
    } else {
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+hc+"'/>";
    }
    var ex = "";
    if (extra === "hairband"){
      ex = "<path d='M30,36 Q50,26 70,36' fill='none' stroke='#2e8f8f' stroke-width='4' stroke-linecap='round'/>";
    } else if (extra === "crown"){
      ex = "<path d='M38,24 L42,14 L48,21 L52,11 L56,21 L62,14 L66,24 Z' fill='#e8c84a' stroke='#c99a2e' stroke-width='1.5'/>" +
           "<circle cx='52' cy='11' r='2.2' fill='#c9344a'/>";
    } else if (extra === "tophat"){
      ex = "<rect x='28' y='24' width='44' height='6' rx='3' fill='#2e8f8f'/>" +
           "<rect x='36' y='-4' width='28' height='28' fill='#2e8f8f'/>" +
           "<rect x='36' y='14' width='28' height='7' fill='#c9344a'/>" +
           "<rect x='58' y='2' width='9' height='11' rx='1' fill='#fffcf4'/>";
    }
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      back +
      "<path d='M27,118 C29,92 39,85 50,85 C61,85 71,92 73,118 Z' fill='"+cc+"'/>" +
      "<path d='M50,88 L50,118' stroke='#fffcf4' stroke-width='2'/>" +
      "<path d='M42,87 L50,96 L58,87' fill='none' stroke='#fffcf4' stroke-width='2'/>" +
      "<circle cx='50' cy='52' r='23' fill='"+skin+"'/>" +
      "<circle cx='38' cy='64' r='3' fill='#e88a8a' opacity='.5'/><circle cx='62' cy='64' r='3' fill='#e88a8a' opacity='.5'/>" +
      "<ellipse cx='42' cy='57' rx='2.6' ry='3.6' fill='#3a2e2a'/><ellipse cx='58' cy='57' rx='2.6' ry='3.6' fill='#3a2e2a'/>" +
      "<path d='M46,67 Q50,70 54,67' stroke='#a86a5a' stroke-width='1.6' fill='none' stroke-linecap='round'/>" +
      front + ex +
    "</svg>";
  }
  function rabbitSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M36,44 C30,14 40,4 44,4 C50,4 50,26 48,42 Z' fill='#fffcf4' stroke='#e0cba8' stroke-width='1.5'/>" +
      "<path d='M64,44 C70,14 60,4 56,4 C50,4 50,26 52,42 Z' fill='#fffcf4' stroke='#e0cba8' stroke-width='1.5'/>" +
      "<path d='M40,36 C37,18 42,10 44,10 C47,10 47,26 46,38 Z' fill='#e8a8c8'/>" +
      "<path d='M60,36 C63,18 58,10 56,10 C53,10 53,26 54,38 Z' fill='#e8a8c8'/>" +
      "<path d='M27,118 C29,94 39,86 50,86 C61,86 71,94 73,118 Z' fill='#c9344a'/>" +
      "<path d='M42,88 L50,97 L58,88' fill='none' stroke='#e8c84a' stroke-width='2'/>" +
      "<circle cx='50' cy='60' r='24' fill='#fffcf4' stroke='#e0cba8' stroke-width='1.5'/>" +
      "<ellipse cx='42' cy='58' rx='2.8' ry='4' fill='#c9344a'/><ellipse cx='58' cy='58' rx='2.8' ry='4' fill='#c9344a'/>" +
      "<polygon points='50,66 46,70 54,70' fill='#e8a8c8'/>" +
      "<g stroke='#c9b48a' stroke-width='1.3' stroke-linecap='round'><path d='M24,62 L38,64'/><path d='M24,70 L38,68'/><path d='M76,62 L62,64'/><path d='M76,70 L62,68'/></g>" +
      "<circle cx='68' cy='100' r='9' fill='#fffcf4' stroke='#c99a2e' stroke-width='2.5'/>" +
      "<line x1='68' y1='100' x2='68' y2='95' stroke='#3a2e2a' stroke-width='1.6'/><line x1='68' y1='100' x2='72' y2='102' stroke='#3a2e2a' stroke-width='1.6'/>" +
    "</svg>";
  }
  function catSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<ellipse cx='50' cy='96' rx='26' ry='20' fill='#7a5ad9'/>" +
      "<path d='M76,96 C92,88 94,72 84,66 C88,80 78,88 72,90 Z' fill='#7a5ad9'/>" +
      "<path d='M80,74 L88,70 M82,82 L90,80' stroke='#e08ab5' stroke-width='4' stroke-linecap='round'/>" +
      "<circle cx='50' cy='54' r='26' fill='#8a6ae0'/>" +
      "<polygon points='30,36 26,12 46,26' fill='#8a6ae0'/><polygon points='70,36 74,12 54,26' fill='#8a6ae0'/>" +
      "<polygon points='32,32 30,18 42,27' fill='#e08ab5'/><polygon points='68,32 70,18 58,27' fill='#e08ab5'/>" +
      "<ellipse cx='41' cy='50' rx='3' ry='4.5' fill='#2e1a3a'/><ellipse cx='59' cy='50' rx='3' ry='4.5' fill='#2e1a3a'/>" +
      "<path d='M32,62 Q50,76 68,62' stroke='#fffcf4' stroke-width='4' fill='none' stroke-linecap='round'/>" +
      "<g stroke='#fffcf4' stroke-width='1.5'><path d='M36,64 L36,69'/><path d='M43,68 L43,73'/><path d='M50,70 L50,75'/><path d='M57,68 L57,73'/><path d='M64,64 L64,69'/></g>" +
      "<g stroke='#5a3aa8' stroke-width='1.4' stroke-linecap='round'><path d='M22,54 L36,56'/><path d='M22,62 L36,60'/><path d='M78,54 L64,56'/><path d='M78,62 L64,60'/></g>" +
    "</svg>";
  }
  function mouseSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<circle cx='30' cy='34' r='14' fill='#c9a884'/><circle cx='70' cy='34' r='14' fill='#c9a884'/>" +
      "<circle cx='30' cy='34' r='8' fill='#e8c8a8'/><circle cx='70' cy='34' r='8' fill='#e8c8a8'/>" +
      "<ellipse cx='50' cy='94' rx='25' ry='20' fill='#c9a884'/>" +
      "<circle cx='50' cy='58' r='25' fill='#d9b894'/>" +
      "<path d='M36,56 Q41,53 46,56' stroke='#3a2e2a' stroke-width='2' fill='none' stroke-linecap='round'/>" +
      "<path d='M54,56 Q59,53 64,56' stroke='#3a2e2a' stroke-width='2' fill='none' stroke-linecap='round'/>" +
      "<polygon points='50,64 46,68 54,68' fill='#e8a8c8'/>" +
      "<path d='M44,72 Q50,75 56,72' stroke='#8a6a4a' stroke-width='1.6' fill='none' stroke-linecap='round'/>" +
      "<text x='66' y='30' font-size='13' fill='#8a7460'>z</text><text x='74' y='20' font-size='16' fill='#8a7460'>Z</text>" +
    "</svg>";
  }
  function flowerSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<rect x='47' y='70' width='6' height='40' rx='3' fill='#4a9e6b'/>" +
      "<path d='M47,92 Q30,88 28,76 Q42,78 48,86 Z' fill='#4a9e6b'/>" +
      "<path d='M53,100 Q70,96 72,84 Q58,86 52,94 Z' fill='#4a9e6b'/>" +
      "<g fill='#e08ab5'><ellipse cx='50' cy='22' rx='11' ry='15'/><ellipse cx='28' cy='38' rx='15' ry='11'/><ellipse cx='72' cy='38' rx='15' ry='11'/><ellipse cx='34' cy='62' rx='12' ry='13'/><ellipse cx='66' cy='62' rx='12' ry='13'/></g>" +
      "<circle cx='50' cy='44' r='17' fill='#ffe9a8' stroke='#c99a2e' stroke-width='2'/>" +
      "<ellipse cx='44' cy='42' rx='2.2' ry='3.2' fill='#3a2e2a'/><ellipse cx='56' cy='42' rx='2.2' ry='3.2' fill='#3a2e2a'/>" +
      "<ellipse cx='50' cy='50' rx='4' ry='5' fill='#3a2e2a'/>" +
      "<text x='68' y='20' font-size='16' fill='#7a5ad9'>♪</text>" +
    "</svg>";
  }

  var roster = [
    { nm:"Alicia", cc:"#2e8f8f", wp:"🎀 la cantante curiosa", fr:"<b>Tiene diez años</b> y mucha curiosidad.", kind:"human", hair:"long", hc:"#e8c86a", extra:"hairband", file:"alicia.png" },
    { nm:"El Conejo Blanco", cc:"#c9344a", wp:"⏰ ¡mira su reloj!", fr:"¡Siempre <b>tiene prisa</b>! Corre y corre.", kind:"rabbit", file:"conejo.png" },
    { nm:"El Sombrerero", cc:"#2e8f8f", wp:"🎩 el rey del té", fr:"<b>Tiene una fiesta</b> de té a las seis.", kind:"human", hair:"short", hc:"#e07a3a", extra:"tophat", file:"sombrerero.png" },
    { nm:"El Gato Sonriente", cc:"#7a5ad9", wp:"😸 aparece y desaparece", fr:"<b>Tiene una sonrisa</b> gigante y canta jazz.", kind:"cat", file:"gato.png" },
    { nm:"La Reina de Corazones", cc:"#c9344a", wp:"👑 ♥ ♥ ♥", fr:"<b>Tiene un jardín</b> de rosas rojas… ¡y mal humor!", kind:"human", hair:"bun", hc:"#3a2e2a", extra:"crown", file:"reina.png" },
    { nm:"El Lirón", cc:"#c9a884", wp:"😴 duerme en la tetera", fr:"<b>Tiene sueño</b> todo el día. Zzz…", kind:"mouse", file:"liron.png" },
    { nm:"Din y Don", cc:"#c99a2e", wp:"👯 los gemelos del coro", fr:"<b>Tienen las mismas caras</b>: ¡son gemelos!", kind:"human", hair:"spiky", hc:"#8a5a3a", extra:null, file:"gemelos.png" },
    { nm:"La Flor Cantante", cc:"#e08ab5", wp:"🌸 soprano del bosque", fr:"Canta ópera <b>a las nueve</b> de la mañana.", kind:"flower", file:"flor.png" }
  ];
  var rBox = document.getElementById("roster");
  roster.forEach(function(c){
    var el = document.createElement("div");
    el.className = "chara";
    el.style.setProperty("--cc", c.cc);
    var av;
    if (c.kind === "rabbit"){ av = rabbitSVG(); }
    else if (c.kind === "cat"){ av = catSVG(); }
    else if (c.kind === "mouse"){ av = mouseSVG(); }
    else if (c.kind === "flower"){ av = flowerSVG(); }
    else { av = avatarSVG(c.hair, c.hc, c.cc, c.extra); }
    el.innerHTML =
      "<div class=\"av\">" + av + "</div>" +
      "<div class=\"nm\">"+c.nm+"</div>" +
      "<div class=\"wp\">"+c.wp+"</div>" +
      "<div class=\"frase\"><span>"+c.fr+"</span></div>";
    var ph = document.createElement("img");
    ph.className = "photo";
    ph.alt = c.nm;
    ph.src = "personajes/" + c.file;
    ph.addEventListener("load", function(){ el.classList.add("hasPhoto"); });
    el.insertBefore(ph, el.firstChild);
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rBox.appendChild(el);
  });

  /* ===== vocabulario ===== */
  var vocab = [
    { emo:"⏰", es:"el reloj", kr:"시계", ej:"El conejo mira su reloj.", qc:"var(--s-dia)" },
    { emo:"🐰", es:"el conejo", kr:"토끼", ej:"El conejo blanco corre rápido.", qc:"var(--s-cor)" },
    { emo:"🍵", es:"el té", kr:"차", ej:"La fiesta de té es a las seis.", qc:"var(--s-tre)" },
    { emo:"🚪", es:"la puerta", kr:"문", ej:"La puerta es muy pequeña.", qc:"var(--s-pic)" },
    { emo:"🗝️", es:"la llave", kr:"열쇠", ej:"La llave está sobre la mesa.", qc:"var(--s-nota)" },
    { emo:"🏃", es:"correr", kr:"달리다", ej:"¡Alicia corre detrás del conejo!", qc:"var(--s-cor)" },
    { emo:"😴", es:"dormir", kr:"자다", ej:"El lirón duerme en la fiesta.", qc:"var(--s-pic)" },
    { emo:"🥤", es:"tomar", kr:"마시다", ej:"El sombrerero toma mucho té.", qc:"var(--s-tre)" }
  ];
  var cardsBox = document.getElementById("vocabCards");
  vocab.forEach(function(v){
    var c = document.createElement("div");
    c.className = "fcard";
    c.innerHTML =
      "<div class=\"in\">" +
        "<div class=\"face\" style=\"--qc:"+v.qc+"\"><div class=\"gem\">♦</div><div class=\"emo\">"+v.emo+"</div><div class=\"es\">"+v.es+"</div><div class=\"hint\">toca ♪ 터치</div></div>" +
        "<div class=\"face back\"><div class=\"kr\">"+v.kr+"</div><div class=\"ej\">"+v.ej+"</div></div>" +
      "</div>";
    c.addEventListener("click", function(){ c.classList.toggle("flipped"); });
    cardsBox.appendChild(c);
  });

  /* ===== intruso ===== */
  var intrusoRounds = [
    { words:["el reloj","la hora","el minuto","el té"], bad:3, theme:"Las otras tres son del mundo del TIEMPO ⏰" },
    { words:["el conejo","el gato","el lirón","la puerta"], bad:3, theme:"Los otros tres son ANIMALES de Musicland 🐰" },
    { words:["correr","dormir","cantar","el sombrero"], bad:3, theme:"Las otras tres son ACCIONES (verbos) 🏃" }
  ];
  var intrusoIdx = 0;
  var iWords = document.getElementById("intrusoWords");
  var iFb = document.getElementById("intrusoFb");
  var iRound = document.getElementById("intrusoRound");
  function renderIntruso(){
    var r = intrusoRounds[intrusoIdx];
    iRound.textContent = "Ronda " + (intrusoIdx+1) + " / 3";
    iFb.textContent = "";
    iFb.className = "feedback";
    iWords.innerHTML = "";
    r.words.forEach(function(w, idx){
      var b = document.createElement("div");
      b.className = "word-btn";
      b.textContent = w;
      b.addEventListener("click", function(){
        if (idx === r.bad){
          b.classList.add("right");
          iFb.textContent = "🕵️ ¡Espía capturado! " + r.theme;
          iFb.classList.add("good");
          setTimeout(function(){
            intrusoIdx++;
            if (intrusoIdx < intrusoRounds.length){ renderIntruso(); }
            else {
              iRound.textContent = "Completado";
              iWords.innerHTML = "";
              iFb.textContent = "⭐ ¡Las tres rondas completas! Pasa a la siguiente diapositiva ›";
            }
          }, 1600);
        } else {
          b.classList.add("wrong");
          iFb.textContent = "Mmm… esa palabra sí es del grupo. ¡Piensa en el tema!";
          iFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      iWords.appendChild(b);
    });
  }
  renderIntruso();

  /* ===== el reloj del conejo ===== */
  var clockRounds = [
    { h:3, m:0, opts:["Son las tres en punto.","Es las tres en punto.","Son la tres."], ok:0, why:"3 = coro → SON las tres." },
    { h:1, m:0, opts:["Son las una.","Es la una en punto.","Es las una."], ok:1, why:"¡Trampa! La UNA canta sola → ES la una." },
    { h:6, m:30, opts:["Son las seis y cuarto.","Son las seis y media.","Es la seis y media."], ok:1, why:"30 minutos = medio pastel → y media." },
    { h:4, m:15, opts:["Son las cuatro y media.","Son las cuatro menos cuarto.","Son las cuatro y cuarto."], ok:2, why:"15 minutos = un pedazo → y cuarto." },
    { h:7, m:45, opts:["Son las ocho menos cuarto.","Son las siete y cuarto.","Son las siete y media."], ok:0, why:"Falta un pedazo para las 8 → las ocho MENOS cuarto." },
    { h:12, m:0, opts:["Es la doce.","Son las doce en punto.","Son la doce en punta."], ok:1, why:"12 = gran coro → SON las doce. ¡Mediodía!" }
  ];
  var clockIdx = 0;
  var hHand = document.getElementById("hHand");
  var mHand = document.getElementById("mHand");
  var clockOpts = document.getElementById("clockOpts");
  var clockFb = document.getElementById("clockFb");
  var clockCount = document.getElementById("clockCount");
  function setClock(h, m){
    var hDeg = (h % 12) * 30 + m * 0.5;
    var mDeg = m * 6;
    hHand.setAttribute("transform", "rotate(" + hDeg + " 100 100)");
    mHand.setAttribute("transform", "rotate(" + mDeg + " 100 100)");
  }
  function renderClock(){
    var r = clockRounds[clockIdx];
    clockCount.textContent = "Campanada " + (clockIdx+1) + " / 6";
    clockFb.textContent = "";
    clockFb.className = "feedback";
    setClock(r.h, r.m);
    clockOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          clockFb.textContent = "🔔 ¡Din, don! " + r.why;
          clockFb.classList.add("good");
          setTimeout(function(){
            clockIdx++;
            if (clockIdx < clockRounds.length){ renderClock(); }
            else {
              clockCount.textContent = "Reloj dominado";
              clockOpts.innerHTML = "";
              clockFb.textContent = "⭐ ¡Seis campanadas perfectas! El conejo está feliz ›";
            }
          }, 2000);
        } else {
          b.classList.add("wrong");
          clockFb.textContent = "El reloj desafina… ¿solista o coro? ¿pedazo de pastel?";
          clockFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      clockOpts.appendChild(b);
    });
  }
  renderClock();

  /* ===== detective ===== */
  var det = [
    { q:"Son las 5:30 y la fiesta es a las 6:00. ¿Cuántos minutos tiene el conejo?",
      opts:["Una hora","Treinta minutos","Quince minutos"], ok:1,
      exp:"De las cinco y media a las seis hay <b>30 minutos</b>. ¡Matemática de detective!" },
    { q:"¿Musicland es un país normal?",
      opts:["Sí, es como Bogotá","El texto no lo dice","No: las flores cantan y el río toca el piano"], ok:2,
      exp:"Un país <b>hecho de música</b>: flores que cantan ópera y nubes que son notas. ¡Nada normal!" },
    { q:"¿Es la primera vez de Alicia en Musicland? ¿Cómo lo sabes?",
      opts:["Sí: el gato le dice «Bienvenida»","No, ella vive allí","No se sabe"], ok:0,
      exp:"El gato dice <b>«Bienvenida»</b>: eso se dice cuando alguien llega por primera vez. ¡Pista escondida!" },
    { q:"¿El conejo está tranquilo?",
      opts:["Sí, camina despacio","No: grita, corre y tiene mucha prisa","El texto no lo dice"], ok:1,
      exp:"El conejo <b>grita</b>, <b>corre</b> y <b>tiene mucha prisa</b>. ¡Tres pistas juntas!" }
  ];
  var detIdx = 0;
  var dQ = document.getElementById("detQ");
  var dOpts = document.getElementById("detOpts");
  var dExp = document.getElementById("detExp");
  var dRound = document.getElementById("detRound");
  function renderDet(){
    var r = det[detIdx];
    dRound.textContent = "Pregunta " + (detIdx+1) + " / 4";
    dQ.textContent = r.q;
    dExp.innerHTML = "";
    dOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          dExp.innerHTML = "✅ " + r.exp;
          setTimeout(function(){
            detIdx++;
            if (detIdx < det.length){ renderDet(); }
            else {
              dRound.textContent = "Caso cerrado";
              dQ.textContent = "🕵️ ¡Excelente, detective! Resolviste las cuatro preguntas.";
              dOpts.innerHTML = "";
              dExp.textContent = "Ahora, la mochila invisible ›";
            }
          }, 2600);
        } else {
          b.classList.add("wrong");
          dExp.innerHTML = "Busca las pistas en el texto otra vez…";
        }
      });
      dOpts.appendChild(b);
    });
  }
  renderDet();

  /* ===== la fiesta de té ===== */
  var tea = [
    { s:"😴 El lirón cierra los ojos… zzz… El lirón…", opts:["tiene sueño","tiene sed","tiene prisa"], ok:0 },
    { s:"⏰ ¡El conejo corre y mira el reloj sin parar! El conejo…", opts:["tiene hambre","tiene prisa","tiene frío"], ok:1 },
    { s:"🍰 Alicia mira los pastelitos con ojos grandes. Alicia…", opts:["tiene miedo","tiene sueño","tiene hambre"], ok:2 },
    { s:"🍵 El sombrerero pide más y más té. El sombrerero…", opts:["tiene sed","tiene años","tiene calor"], ok:0 },
    { s:"👑 ¡Viene la Reina! Todos tiemblan… Todos…", opts:["tienen sed","tienen miedo","tiene miedo"], ok:1 },
    { s:"🎂 Hoy es el cumpleaños de Alicia: ¡diez velas! Alicia…", opts:["tiene diez años","es diez años","está diez años"], ok:0 }
  ];
  var teaIdx = 0;
  var teaSent = document.getElementById("teaSentence");
  var teaOpts = document.getElementById("teaOpts");
  var teaFb = document.getElementById("teaFb");
  var teaCount = document.getElementById("teaCount");
  function renderTea(){
    var r = tea[teaIdx];
    teaCount.textContent = "Invitado " + (teaIdx+1) + " / 6";
    teaFb.textContent = "";
    teaFb.className = "feedback";
    teaSent.textContent = r.s;
    teaOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          teaFb.textContent = "🎒 ¡Exacto! Esa es su mochila invisible.";
          teaFb.classList.add("good");
          setTimeout(function(){
            teaIdx++;
            if (teaIdx < tea.length){ renderTea(); }
            else {
              teaCount.textContent = "Fiesta completada";
              teaSent.textContent = "🍵 ¡Conoces la mochila de todos los invitados!";
              teaOpts.innerHTML = "";
              teaFb.textContent = "Ahora lee el capítulo dos ›";
            }
          }, 1500);
        } else {
          b.classList.add("wrong");
          teaFb.textContent = "Mira la escena otra vez… ¿qué lleva en la mochila? ¿Y cuántas personas son?";
          teaFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      teaOpts.appendChild(b);
    });
  }
  renderTea();

  /* ===== ordena la historia ===== */
  var events = [
    "Alicia llega a la fiesta de té de la mesa larga.",
    "A las seis en punto, todos cantan la canción del té.",
    "¡Llega la Reina de Corazones y todos tienen miedo!",
    "Alicia respira y canta una canción muy bonita.",
    "La reina sonríe, come pastel y todos bailan juntos."
  ];
  var shuffled = [1,3,0,4,2];
  var expected = 0;
  var oList = document.getElementById("orderList");
  var oFb = document.getElementById("orderFb");
  shuffled.forEach(function(evIdx){
    var el = document.createElement("div");
    el.className = "ev";
    el.innerHTML = "<span class=\"num\">?</span><span>" + events[evIdx] + "</span>";
    el.addEventListener("click", function(){
      if (el.classList.contains("locked")) return;
      if (evIdx === expected){
        el.classList.add("locked");
        el.querySelector(".num").textContent = expected + 1;
        expected++;
        if (expected === events.length){
          oFb.textContent = "🎶 ¡Historia perfecta! La música arregla todo.";
          oFb.className = "feedback good";
        } else {
          oFb.textContent = "✅ ¡Sí! ¿Y qué pasa después?";
          oFb.className = "feedback good";
        }
      } else {
        el.classList.add("wrong");
        oFb.textContent = "Todavía no… recuerda el capítulo de la fiesta de té.";
        oFb.className = "feedback oops";
        setTimeout(function(){ el.classList.remove("wrong"); }, 450);
      }
    });
    oList.appendChild(el);
  });

  /* ===== confeti (notas y corazones) ===== */
  var confChars = ["♪","♥","♫","♦","♩","♣"];
  var confColors = ["#c9344a","#2e8f8f","#c99a2e","#7a5ad9","#e08ab5","#3a2e2a"];
  function confettiBurst(){
    for (var c = 0; c < 36; c++){
      var f = document.createElement("div");
      f.className = "confetti";
      f.textContent = confChars[c % confChars.length];
      f.style.left = (Math.random()*100) + "vw";
      f.style.color = confColors[c % confColors.length];
      f.style.animationDuration = (1.6 + Math.random()*2.4) + "s";
      f.style.animationDelay = (Math.random()*0.6) + "s";
      document.body.appendChild(f);
      (function(node){ setTimeout(function(){ node.remove(); }, 5200); })(f);
    }
  }
  var cutin = document.getElementById("cutin");

  /* ===== combate 1: Carta Traviesa ===== */
  var boss = [
    { q:"⏰ 3:00 → ＿＿ las tres en punto.", opts:["Es","Son","Está"], ok:1 },
    { q:"⏰ 1:00 → ＿＿ la una. ¡Cuidado con la trampa!", opts:["Son","Están","Es"], ok:2 },
    { q:"El lirón ＿＿ mucho sueño.", opts:["tiene","es","está"], ok:0 },
    { q:"Nosotros ＿＿ hambre. ¿Hay pastel?", opts:["tienen","tenemos","tengo"], ok:1 },
    { q:"⏰ 6:30 → Son las seis ＿＿.", opts:["y cuarto","menos cuarto","y media"], ok:2 },
    { q:"La fiesta de té es ＿＿ las seis.", opts:["a","en","de"], ok:0 }
  ];
  var bossIdx = 0;
  var hp = boss.length;
  var bQ = document.getElementById("bossQ");
  var bOpts = document.getElementById("bossOpts");
  var bHp = document.getElementById("bossHp");
  var bSprite = document.getElementById("bossSprite");
  var bGame = document.getElementById("bossGame");
  var bWin = document.getElementById("bossWin");
  var field = document.getElementById("battlefield");
  var mini = document.getElementById("miniSlash");
  function spawnDamage(f){
    var d = document.createElement("div");
    d.className = "dmg";
    d.textContent = String(800 + Math.floor(Math.random()*2200));
    d.style.left = (42 + Math.random()*16) + "%";
    d.style.top = "22%";
    f.appendChild(d);
    setTimeout(function(){ d.remove(); }, 950);
  }
  function musicHit(){
    mini.classList.remove("go");
    void mini.offsetWidth;
    mini.classList.add("go");
    bSprite.classList.add("hit");
    spawnDamage(field);
    setTimeout(function(){ bSprite.classList.remove("hit"); }, 520);
  }
  function renderBoss(){
    var r = boss[bossIdx];
    bQ.textContent = "🃏 Ataque " + (bossIdx+1) + ": " + r.q;
    bOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp--;
          bHp.style.width = (hp/boss.length)*100 + "%";
          var isLast = (bossIdx === boss.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡CANCIÓN: CORO DE MUSICLAND!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(musicHit, 700);
            setTimeout(function(){
              bSprite.textContent = "🎴";
              bGame.classList.add("hidden");
              bWin.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            musicHit();
            setTimeout(function(){
              bossIdx++;
              renderBoss();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      bOpts.appendChild(b);
    });
  }
  renderBoss();

  /* ============ ACTO II ============ */

  /* ===== memoria ===== */
  var memoPairs = [
    { es:"el reloj", m:"⏰ 시계" },
    { es:"el conejo", m:"🐰 토끼" },
    { es:"el té", m:"🍵 차" },
    { es:"la llave", m:"🗝️ 열쇠" },
    { es:"dormir", m:"😴 자다" },
    { es:"correr", m:"🏃 달리다" }
  ];
  var memoCards = [];
  memoPairs.forEach(function(p, i){
    memoCards.push({ pid:i, label:p.es });
    memoCards.push({ pid:i, label:p.m });
  });
  for (var m = memoCards.length - 1; m > 0; m--){
    var j = Math.floor(Math.random() * (m + 1));
    var tmp = memoCards[m]; memoCards[m] = memoCards[j]; memoCards[j] = tmp;
  }
  var memoGrid = document.getElementById("memoGrid");
  var memoStats = document.getElementById("memoStats");
  var memoFb = document.getElementById("memoFb");
  var memoOpen = [];
  var memoFound = 0;
  var memoTries = 0;
  function memoUpdate(){
    memoStats.textContent = "Parejas: " + memoFound + " / 6 · Intentos: " + memoTries;
  }
  memoCards.forEach(function(c){
    var el = document.createElement("div");
    el.className = "mcard";
    el.textContent = "♥";
    el.addEventListener("click", function(){
      if (el.classList.contains("lock") || el.classList.contains("up") || memoOpen.length === 2) return;
      el.classList.add("up");
      el.textContent = c.label;
      memoOpen.push({ el:el, pid:c.pid });
      if (memoOpen.length === 2){
        memoTries++;
        if (memoOpen[0].pid === memoOpen[1].pid){
          memoOpen[0].el.classList.add("lock");
          memoOpen[1].el.classList.add("lock");
          memoOpen = [];
          memoFound++;
          memoFb.textContent = "🎴 ¡Pareja! Dila en voz alta.";
          memoFb.className = "feedback good";
          if (memoFound === 6){
            memoFb.textContent = "⭐ ¡Memoria completa! Baraja llena de música.";
          }
        } else {
          memoFb.textContent = "No son pareja… ¡memoria de Musicland!";
          memoFb.className = "feedback oops";
          var a = memoOpen[0].el, bEl = memoOpen[1].el;
          memoOpen = [];
          setTimeout(function(){
            a.classList.remove("up"); a.textContent = "♥";
            bEl.classList.remove("up"); bEl.textContent = "♥";
          }, 1000);
        }
        memoUpdate();
      }
    });
    memoGrid.appendChild(el);
  });
  memoUpdate();

  /* ===== rol + gato ===== */
  var rolItems = [
    { t:"👤 Tu nombre", m:"Me llamo ____ y vengo del mundo real." },
    { t:"🎂 Tu edad", m:"Tengo ____ años." },
    { t:"⏰ Tu hora", m:"Mi clase de español es a las ____." },
    { t:"🎒 Tu mochila", m:"Ahora tengo ____ (hambre / sueño / sed...)." },
    { t:"🎶 En el concierto", m:"A las ocho voy a ____ (cantar / bailar / tocar...)." }
  ];
  var rolList = document.getElementById("rolList");
  rolItems.forEach(function(r){
    var el = document.createElement("div");
    el.className = "rline";
    el.innerHTML = r.t + "<span class=\"tap\">toca ♪</span><div class=\"model\">🗣️ " + r.m + "</div>";
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rolList.appendChild(el);
  });

  var ivQs = [
    { q:"¿Qué hora es ahora?", h:"Son las... / Es la..." },
    { q:"¿A qué hora es tu clase de español?", h:"Mi clase es a las..." },
    { q:"¿A qué hora desayunas?", h:"Desayuno a las..." },
    { q:"¿Cuántos años tienes?", h:"Tengo ... años." },
    { q:"¿Tienes hambre ahora?", h:"Sí, tengo... / No, no tengo..." },
    { q:"¿Tienes sueño por la mañana?", h:"Sí, tengo mucho sueño..." },
    { q:"¿De qué tienes miedo?", h:"Tengo miedo de..." },
    { q:"¿A qué hora vas a dormir?", h:"Voy a dormir a las..." },
    { q:"¿Tienes frío o calor hoy?", h:"Hoy tengo..." },
    { q:"¿A qué hora es tu clase favorita?", h:"Es a las..." }
  ];
  var ivPool = [];
  var ivQ = document.getElementById("ivQ");
  var ivHint = document.getElementById("ivHint");
  document.getElementById("ivBtn").addEventListener("click", function(){
    if (ivPool.length === 0){ ivPool = ivQs.slice(); }
    var pick = Math.floor(Math.random() * ivPool.length);
    var q = ivPool.splice(pick, 1)[0];
    ivQ.textContent = "😸 " + q.q;
    ivHint.textContent = "Pista: " + q.h;
  });

  /* ===== ¿tú también tienes…? ===== */
  var compItems = [
    { s:"El conejo siempre tiene prisa.", si:"¡Yo también siempre tengo prisa!", no:"Yo no tengo prisa. Soy muy tranquila." },
    { s:"El lirón tiene sueño todo el día.", si:"¡Yo también tengo mucho sueño!", no:"Yo no tengo sueño. ¡Tengo energía!" },
    { s:"Alicia tiene diez años.", si:"¡Yo también tengo diez años!", no:"Yo no. Yo tengo ____ años." },
    { s:"El sombrerero tiene una fiesta a las seis.", si:"¡Yo también tengo planes a las seis!", no:"Yo no tengo planes a las seis." },
    { s:"Todos tienen miedo de la Reina.", si:"¡Yo también tengo miedo de...!", no:"Yo no tengo miedo de nada 💪" }
  ];
  var compIdx = 0;
  var compSent = document.getElementById("compSent");
  var compModel = document.getElementById("compModel");
  var compRound = document.getElementById("compRound");
  function renderComp(){
    var r = compItems[compIdx];
    compRound.textContent = "Frase " + (compIdx+1) + " / 5";
    compSent.textContent = r.s;
    compModel.innerHTML = "";
  }
  function compAnswer(kind){
    if (compIdx >= compItems.length) return;
    var r = compItems[compIdx];
    var txt = (kind === "si") ? r.si : r.no;
    compModel.innerHTML = "🗣️ " + txt + "<span class=\"say\">Dilo en voz alta y completa la frase.</span>";
    setTimeout(function(){
      compIdx++;
      if (compIdx < compItems.length){ renderComp(); }
      else {
        compRound.textContent = "Completado";
        compSent.textContent = "⭐ ¡Ya comparas mochilas invisibles como experta!";
        compModel.innerHTML = "Siguiente misión: la caja musical ›";
      }
    }, 3400);
  }
  document.getElementById("compSi").addEventListener("click", function(){ compAnswer("si"); });
  document.getElementById("compNo").addEventListener("click", function(){ compAnswer("no"); });
  renderComp();

  /* ===== dictado ===== */
  var dictItems = [
    "Son las seis y media de la tarde.",
    "El conejo blanco tiene mucha prisa.",
    "La fiesta de té es a las cuatro.",
    "Tengo sueño y quiero dormir.",
    "Es la una y tengo hambre."
  ];
  var dictIdx = 0;
  var dictIn = document.getElementById("dictIn");
  var dictFb = document.getElementById("dictFb");
  var dictRound = document.getElementById("dictRound");
  var dictSecret = document.getElementById("dictSecret");
  function dictNorm(s){
    return s.toLowerCase().replace(/[.,;:!?¡¿"«»]/g, "").replace(/\s+/g, " ").trim();
  }
  function dictDeacc(s){
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function speak(text, rate){
    if (!window.speechSynthesis){ dictFb.textContent = "Este navegador no tiene voz: la profe lee el mensaje 👩‍🏫"; dictFb.className = "feedback oops"; return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    var vs = window.speechSynthesis.getVoices();
    for (var v = 0; v < vs.length; v++){
      if (vs[v].lang && vs[v].lang.indexOf("es") === 0){ u.voice = vs[v]; break; }
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function renderDict(){
    dictRound.textContent = "Mensaje " + (dictIdx+1) + " / 5";
    dictIn.value = "";
    dictFb.textContent = "";
    dictFb.className = "feedback";
    dictSecret.textContent = dictItems[dictIdx];
  }
  document.getElementById("dictPlay").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.82); });
  document.getElementById("dictSlow").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.55); });
  document.getElementById("dictCheck").addEventListener("click", function(){
    var ans = dictNorm(dictIn.value);
    var target = dictNorm(dictItems[dictIdx]);
    if (ans === target){
      dictFb.textContent = "🎁 ¡La caja musical brilla! Mensaje perfecto.";
      dictFb.className = "feedback good";
    } else if (ans !== "" && dictDeacc(ans) === dictDeacc(target)){
      dictFb.textContent = "¡Casi perfecto! Revisa las tildes: " + dictItems[dictIdx];
      dictFb.className = "feedback oops";
    } else {
      dictFb.textContent = "Escucha otra vez… pista: la frase tiene " + dictItems[dictIdx].split(" ").length + " palabras.";
      dictFb.className = "feedback oops";
    }
  });
  document.getElementById("dictNext").addEventListener("click", function(){
    dictIdx++;
    if (dictIdx < dictItems.length){ renderDict(); }
    else {
      dictIdx = dictItems.length - 1;
      dictRound.textContent = "Dictado completado";
      dictFb.textContent = "⭐ ¡Cinco mensajes descifrados! El Jabberwock te espera ›";
      dictFb.className = "feedback good";
    }
  });
  renderDict();

  /* ===== jefe final: Jabberwock ===== */
  var boss2 = [
    { q:"⏰ 7:45 → ＿＿", opts:["Son las ocho menos cuarto.","Son las siete y cuarto.","Es las ocho menos cuarto."], ok:0 },
    { q:"Yo ＿＿ doce años.", opts:["tiene","soy","tengo"], ok:2 },
    { q:"¿Quién tiene una sonrisa gigante y canta jazz?", opts:["El Gato Sonriente","El Lirón","La Flor Cantante"], ok:0 },
    { q:"A Alicia le ＿＿ cantar. ⚠️ ¡La varita al revés!", opts:["gustan","gusta","canta"], ok:1 },
    { q:"Ahora el conejo está ＿＿ (correr). ⚠️ ¡La cámara en vivo!", opts:["corre","correr","corriendo"], ok:2 },
    { q:"Ustedes ＿＿ miedo del Jabberwock.", opts:["tienen","tenemos","tiene"], ok:0 },
    { q:"Mi clase es ＿＿ las cuatro y media.", opts:["en","a","de"], ok:1 },
    { q:"⏰ 12:00 → ＿＿", opts:["Es la doce.","Son las doce en punto.","Son la doce."], ok:1 }
  ];
  var boss2Idx = 0;
  var hp2 = boss2.length;
  var b2Q = document.getElementById("boss2Q");
  var b2Opts = document.getElementById("boss2Opts");
  var b2Hp = document.getElementById("boss2Hp");
  var b2Sprite = document.getElementById("boss2Sprite");
  var b2Game = document.getElementById("boss2Game");
  var b2Win = document.getElementById("boss2Win");
  var field2 = document.getElementById("battlefield2");
  var mini2 = document.getElementById("miniSlash2");
  function musicHit2(){
    mini2.classList.remove("go");
    void mini2.offsetWidth;
    mini2.classList.add("go");
    b2Sprite.classList.add("hit");
    spawnDamage(field2);
    setTimeout(function(){ b2Sprite.classList.remove("hit"); }, 520);
  }
  function renderBoss2(){
    var r = boss2[boss2Idx];
    b2Q.textContent = "🐉 Ataque " + (boss2Idx+1) + ": " + r.q;
    b2Opts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp2--;
          b2Hp.style.width = (hp2/boss2.length)*100 + "%";
          var isLast = (boss2Idx === boss2.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡GRAN FINAL: SINFONÍA DE ALICIA!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(musicHit2, 700);
            setTimeout(function(){
              b2Sprite.textContent = "🎤";
              b2Game.classList.add("hidden");
              b2Win.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            musicHit2();
            setTimeout(function(){
              boss2Idx++;
              renderBoss2();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      b2Opts.appendChild(b);
    });
  }
  renderBoss2();

  /* init */
  goTo(0, true);
})();
