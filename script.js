(function(){
  /* ============ CONFIGURAÇÃO (edite aqui) ============
     waNumber: DDI 55 + DDD + número, só dígitos. */
  var CFG = { phoneDisplay: "(35) 99836-5152", waNumber: "5535998365152" };

  var IMG = {"n_q2":"n_q2.jpg","entrada":"entrada.jpg","n_aereo":"n_aereo.jpg","n_pool1":"n_pool1.jpg","n_fachada":"n_fachada.jpg","pool":"pool.jpg","n_pool2":"n_pool2.jpg","n_gourmet":"n_gourmet.jpg","long":"long.jpg","n_coz1":"n_coz1.jpg","grill":"grill.jpg","n_sala":"n_sala.jpg","n_q1":"n_q1.jpg","n_eventos":"n_eventos.jpg","n_varanda":"n_varanda.jpg","n_coz2":"n_coz2.jpg","pergola":"pergola.jpg"};
  var GALLERY_VIDEO = {};

  var SITE = {
    recanto: {
      photos: [
        {k:"entrada", alt:"Caminho de piso amadeirado até a varanda da casa"},
        {k:"pergola", alt:"Pilar de madeira sob o telhado colonial, com palmeira jovem e a piscina ao fundo"},
        {k:"grill",   alt:"Vista da churrasqueira e da área coberta para a piscina"},
        {k:"long",    alt:"Piscina grande com deck e borda de pedra"},
        {k:"pool",    alt:"Piscina e bar coberto, com muro alto ao redor"}
      ],
      steps: [
        {k:"entrada", t:"A chegada", d:"Um caminho de piso amadeirado leva da entrada até a varanda da casa, com gramado dos dois lados."},
        {k:"pergola", t:"Sob o telhado", d:"A área coberta tem estrutura de madeira e telhado colonial. Sombra boa para um almoço que não tem hora para acabar."},
        {k:"grill",   t:"Churrasqueira com vista", d:"A churrasqueira de tijolinho fica na área coberta, olhando para a piscina e para o gramado."},
        {k:"long",    t:"A piscina", d:"Grande, com revestimento azul, borda de pedra e deck ao redor para estender a toalha."},
        {k:"pool",    t:"Bar e privacidade", d:"Do outro lado da piscina, um bar coberto. O muro alto em volta deixa a turma à vontade."}
      ]
    },
    nossa: {
      photos: [
        {k:"n_aereo",   alt:"Vista de cima da piscina, do jardim e do quiosque da Chácara Nossa Senhora Aparecida"},
        {k:"n_pool1",   alt:"Piscina com deck de pedra e jardim em volta"},
        {k:"n_pool2",   alt:"Piscina com deck de pedra vista do jardim, com o campo ao fundo"},
        {k:"n_fachada", alt:"Casa com varanda de madeira e jardim na frente"},
        {k:"n_gourmet", alt:"Área gourmet com bancada, banquetas e vista para a piscina"},
        {k:"n_varanda", alt:"Varanda ampla com guarda-corpo de madeira e vista para o campo"},
        {k:"n_eventos", alt:"Área de eventos com mesa de bilhar e pebolim"},
        {k:"n_sala",    alt:"Sala de estar com sofá e ventilador de teto"},
        {k:"n_q1",      alt:"Quarto com beliches e ventilador de teto"},
        {k:"n_q2",      alt:"Quarto com beliches e janela com cortina"},
        {k:"n_coz1",    alt:"Cozinha com geladeira, armários e parede de tijolinho"},
        {k:"n_coz2",    alt:"Cozinha com fogão, pia e janela para o campo"}
      ],
      steps: [
        {k:"n_pool1",   t:"A piscina", d:"Piscina com deck de pedra e jardim em volta, para passar o dia todo ao sol."},
        {k:"n_gourmet", t:"Área gourmet", d:"Bancada com banquetas, churrasqueira, fogão a lenha, forno a lenha e fogão industrial, com vista para a piscina.", pos:"72% 50%"},
        {k:"n_eventos", t:"Área para eventos", d:"Espaço coberto e aberto para a turma, equipado com mesa de bilhar e mesa de pebolim."},
        {k:"n_sala",    t:"Sala de estar", d:"Sala com sofá e internet Wi-Fi, para descansar entre um mergulho e outro."},
        {k:"n_q1",      t:"Quartos", d:"Três quartos, com capacidade para 18 pessoas para dormir. Camas e beliches com ventilador de teto."},
        {k:"n_coz1",    t:"Cozinha", d:"Já equipada com panelas e utensílios, geladeira e fogão."}
      ]
    }
  };

  var doc = document, root = doc.documentElement;
  root.classList.add("js");

  /* intro */
  var intro = document.getElementById("intro");
  if(intro){
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){ intro.remove(); }
    else{
      doc.body.style.overflow = "hidden";
      setTimeout(function(){
        intro.classList.add("done");
        doc.body.style.overflow = "";
        setTimeout(function(){ intro.remove(); }, 450);
      }, 950);
    }
  }
  var $ = function(s,c){return (c||doc).querySelector(s)}, $$ = function(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s))};

  $$("[data-img]").forEach(function(el){ el.src = IMG[el.getAttribute("data-img")]; });
  var routeVideo = $(".route-col video");
  if(routeVideo){
    if("IntersectionObserver" in window){
      var videoObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(!entry.isIntersecting) routeVideo.pause(); });
      });
      videoObserver.observe(routeVideo);
    } else {
      function pauseVideoWhenOutOfView(){
        var bounds = routeVideo.getBoundingClientRect();
        if(bounds.bottom <= 0 || bounds.top >= window.innerHeight) routeVideo.pause();
      }
      window.addEventListener("scroll", pauseVideoWhenOutOfView, {passive:true});
      window.addEventListener("resize", pauseVideoWhenOutOfView);
    }
    doc.addEventListener("visibilitychange", function(){ if(doc.hidden) routeVideo.pause(); });
  }
  $$("[data-phone]").forEach(function(el){ el.textContent = CFG.phoneDisplay; });
  $$("[data-tel]").forEach(function(el){ el.href = "tel:+" + CFG.waNumber; });
  $("#ano").textContent = new Date().getFullYear();
  function wa(text){ return "https://wa.me/" + CFG.waNumber + (text ? "?text=" + encodeURIComponent(text) : ""); }
  $("#fab").href = wa("Olá, Pedro! 👋😊\n\nVim pelo site das Chácaras Tarciso e gostaria de saber mais sobre a disponibilidade e os valores para alugar uma chácara. 🏡🌿\n\nPode me ajudar? Obrigado(a)! 🙏");

  /* nav */
  var nav = $("#nav"), bar = $(".progress"), fab = $("#fab"), menu = $(".menu"), links = $("#links");
  var tb = $$(".tabbar a");
  var tbSecs = ["topo","hero","galeria","reservar"].map(function(id){ return doc.getElementById(id); });
  function setTb(name){ tb.forEach(function(a){ a.classList.toggle("active", a.getAttribute("data-tb") === name); }); }
  if ("IntersectionObserver" in window){
    var names = ["inicio","chacaras","fotos","reservar"];
    var tbio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting) setTb(names[tbSecs.indexOf(e.target)]); });
    }, {rootMargin:"-46% 0px -46% 0px"});
    tbSecs.forEach(function(s){ if(s) tbio.observe(s); });
  }
  $(".tb-hero").addEventListener("click", function(e){
    if(root.getAttribute("data-sel") !== "none"){ e.preventDefault(); closeChacara(); }
  });
  function onScroll(){
    var y = window.scrollY, h = root.scrollHeight - window.innerHeight;
    nav.classList.toggle("solid", y > 40);
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    fab.classList.toggle("show", y > window.innerHeight * .7);
  }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  menu.addEventListener("click", function(){
    var open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", open); menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    links.classList.toggle("open", open); nav.classList.toggle("menu-open", open);
  });
  $$("a", links).forEach(function(a){ a.addEventListener("click", function(){
    menu.setAttribute("aria-expanded","false"); links.classList.remove("open"); nav.classList.remove("menu-open");
  }); });

  /* reveal */
  var rvs = $$(".rv");
  if ("IntersectionObserver" in window){
    var rio = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); rio.unobserve(e.target);} }); }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
    rvs.forEach(function(el){ rio.observe(el); });
  } else rvs.forEach(function(el){ el.classList.add("in"); });

  /* estado: chácara ativa */
  var curId = "recanto";
  var tabs = $$(".tabs button");

  /* lightbox */
  var lb = $("#lb"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"), lbI = 0, lastFocus = null;
  function list(){ return SITE[curId].photos; }
  function show(i){ var L = list(); lbI = (i + L.length) % L.length; lbImg.src = IMG[L[lbI].k]; lbImg.alt = L[lbI].alt; lbCap.textContent = (lbI+1) + " / " + L.length + " · " + L[lbI].alt; }
  function openLb(i){ lastFocus = doc.activeElement; show(i); lb.classList.add("open"); doc.body.style.overflow = "hidden"; $(".lb-close").focus(); }
  function closeLb(){ lb.classList.remove("open"); doc.body.style.overflow = ""; if(lastFocus) lastFocus.focus(); }
  $(".lb-close").addEventListener("click", closeLb);
  $(".lb-prev").addEventListener("click", function(){ show(lbI-1); });
  $(".lb-next").addEventListener("click", function(){ show(lbI+1); });
  lb.addEventListener("click", function(e){ if(e.target === lb || e.target.classList.contains("lb-stage")) closeLb(); });
  doc.addEventListener("keydown", function(e){
    if(!lb.classList.contains("open")) return;
    if(e.key === "Escape") closeLb(); else if(e.key === "ArrowLeft") show(lbI-1); else if(e.key === "ArrowRight") show(lbI+1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function(e){ tx = e.changedTouches[0].clientX; }, {passive:true});
  lb.addEventListener("touchend", function(e){ if(tx===null) return; var d = e.changedTouches[0].clientX - tx; if(Math.abs(d) > 50) show(lbI + (d < 0 ? 1 : -1)); tx = null; }, {passive:true});

  /* galeria */
  var gal = $("#gallery");
  function renderGallery(id){
    gal.innerHTML = "";
    SITE[id].photos.forEach(function(p,i){
      var b = doc.createElement("button"); b.type = "button"; b.setAttribute("aria-label","Ampliar foto: " + p.alt);
      var im = doc.createElement("img"); im.src = IMG[p.k]; im.alt = p.alt; im.loading = "lazy";
      b.appendChild(im); b.addEventListener("click", function(){ openLb(i); }); gal.appendChild(b);
    });
    var gvf = $("#gallery-video-frame"), galleryVideo = $("#gallery-video");
    if(gvf && galleryVideo){
      var vid = GALLERY_VIDEO[id];
      galleryVideo.hidden = !vid;
      if(vid){
        gvf.src = "https://www.youtube-nocookie.com/embed/" + vid;
        gvf.title = "Vídeo da " + (id === "nossa" ? "Chácara Nossa Senhora Aparecida" : "Chácara Recanto Feliz");
      } else {
        gvf.removeAttribute("src");
      }
    }
  }

  /* passeio */
  var frame = $(".frame"), expandBtn = $(".expand"), segBox = $(".segs"), count = $(".count"), ol = $(".tour-steps");
  var steps = [], frames = [], segs = [], stepNow = 0, tio = null;
  var mobile = window.matchMedia("(max-width:980px)");
  function setStep(i){
    stepNow = i;
    frames.forEach(function(im,j){ im.classList.toggle("on", j === i); });
    steps.forEach(function(s,j){ s.classList.toggle("active", j === i); });
    segs.forEach(function(s,j){ s.classList.toggle("on", j <= i); });
    count.textContent = (i+1) + " / " + steps.length;
  }
  function bindTour(){
    if(!("IntersectionObserver" in window)) return;
    if(tio) tio.disconnect();
    tio = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) setStep(steps.indexOf(e.target)); }); },
      {rootMargin: mobile.matches ? "-58% 0px -28% 0px" : "-42% 0px -42% 0px"});
    steps.forEach(function(s){ tio.observe(s); });
  }
  if(mobile.addEventListener) mobile.addEventListener("change", bindTour);
  function altOf(id,k){ var P = SITE[id].photos; for(var i=0;i<P.length;i++) if(P[i].k===k) return P[i].alt; return ""; }
  function renderTour(id){
    var data = SITE[id];
    $$("img", frame).forEach(function(im){ im.remove(); });
    data.steps.forEach(function(s){
      var im = doc.createElement("img"); im.src = IMG[s.k]; im.alt = altOf(id, s.k);
      if(s.pos) im.style.objectPosition = s.pos;
      frame.insertBefore(im, expandBtn);
    });
    segBox.innerHTML = ""; ol.innerHTML = "";
    data.steps.forEach(function(s,i){
      var sg = doc.createElement("i"); sg.className = "seg"; segBox.appendChild(sg);
      var li = doc.createElement("li");
      var n = doc.createElement("span"); n.className = "step-n"; n.textContent = i+1;
      var h = doc.createElement("h3"); h.textContent = s.t;
      var p = doc.createElement("p"); p.textContent = s.d;
      li.appendChild(n); li.appendChild(h); li.appendChild(p); ol.appendChild(li);
    });
    frames = $$("img", frame); segs = $$(".seg", segBox); steps = $$("li", ol);
    bindTour(); setStep(0);
  }
  expandBtn.addEventListener("click", function(){
    var k = SITE[curId].steps[stepNow].k, L = list(), idx = 0;
    for(var i=0;i<L.length;i++) if(L[i].k===k) idx = i;
    openLb(idx);
  });

  /* tela inicial dividida */
  var hero = $("#hero"), panes = $$(".pane"), backBtn = $(".back");
  var SLUG = {recanto:"recanto-feliz", nossa:"nossa-senhora-aparecida"};
  function applySel(id){
    root.setAttribute("data-sel", id);
    hero.setAttribute("data-state", id);
    panes.forEach(function(p){ var on = p.getAttribute("data-id") === id; p.classList.toggle("is-open", on); p.classList.toggle("is-closed", !on); });
    try{ history.replaceState(null, "", "#" + SLUG[id]); }catch(e){}
  }
  function openChacara(id){
    applySel(id); setChacara(id);
    window.scrollTo({top:0, behavior:"smooth"});
    setTimeout(function(){ backBtn.focus({preventScroll:true}); }, 700);
  }
  function closeChacara(){
    var was = curId;
    root.setAttribute("data-sel", "none"); hero.setAttribute("data-state", "idle");
    panes.forEach(function(p){ p.classList.remove("is-open","is-closed"); });
    try{ history.replaceState(null, "", location.pathname + location.search); }catch(e){}
    window.scrollTo({top:0, behavior:"smooth"});
    var b = $('.pane[data-id="' + was + '"] .pane-open'); if(b) b.focus({preventScroll:true});
  }
  panes.forEach(function(p){ $(".pane-open", p).addEventListener("click", function(){ openChacara(p.getAttribute("data-id")); }); });
  backBtn.addEventListener("click", closeChacara);
  doc.addEventListener("keydown", function(e){
    if(e.key === "Escape" && !lb.classList.contains("open") && root.getAttribute("data-sel") !== "none") closeChacara();
  });

  /* abas */
  function setChacara(id){
    curId = id;
    tabs.forEach(function(b){ var on = b.getAttribute("data-ch") === id; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; });
    renderTour(id); renderGallery(id);
    if(root.getAttribute("data-sel") !== "none") applySel(id);
    $("#chacara").value = id === "nossa" ? "Chácara Nossa Senhora Aparecida" : "Chácara Recanto Feliz";
  }
  tabs.forEach(function(b){ b.addEventListener("click", function(){
    var id = b.getAttribute("data-ch"); if(id === curId) return;
    setChacara(id);
    if(b.closest("#tour")) $("#tour .tabs").scrollIntoView({behavior:"smooth", block:"start"});
  }); });
  $$("[data-tour]").forEach(function(a){ a.addEventListener("click", function(){ setChacara(a.getAttribute("data-tour")); }); });
  setChacara("recanto");
  var hh = (location.hash || "").replace("#","");
  if(hh === SLUG.recanto) openChacara("recanto"); else if(hh === SLUG.nossa) openChacara("nossa");

  /* botões que pré-selecionam a chácara no formulário */
  $$("[data-pick]").forEach(function(a){ a.addEventListener("click", function(){ $("#chacara").value = a.getAttribute("data-pick"); }); });

  /* formulário -> WhatsApp */
  var ent = $("#entrada"), sai = $("#saida"), st = $("#status");
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var iso = today.toISOString().slice(0,10); ent.min = iso; sai.min = iso;
  ent.addEventListener("change", function(){ sai.min = ent.value || iso; if(sai.value && sai.value < sai.min) sai.value = ""; });
  function br(d){ var p = d.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  $("#form").addEventListener("submit", function(e){
    e.preventDefault(); st.textContent = "";
    var nome = $("#nome").value.trim();
    if(!nome){ st.textContent = "Escreva o seu nome para continuar."; $("#nome").focus(); return; }
    var t = "Olá, Pedro! Meu nome é " + nome + ". Tenho interesse na " + $("#chacara").value;
    if(ent.value) t += " a partir de " + br(ent.value);
    if(sai.value) t += (ent.value ? " até " : " com saída em ") + br(sai.value);
    if(!ent.value && !sai.value) t += " e ainda estou definindo as datas";
    var n = $("#pessoas").value; if(n) t += ", para " + n + (n === "1" ? " pessoa" : " pessoas");
    t += ". Pode me confirmar a disponibilidade e os valores?";
    var m = $("#msg").value.trim(); if(m) t += " " + m;
    window.location.assign(wa(t));
  });
})();
