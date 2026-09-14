// CONFIGURACIÓN DE TROPICAL MOUSSE
// 1) Pon aquí la URL /exec de tu Google Apps Script.
// 2) El WhatsApp que recibirá los pedidos es 8494404797.
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbznexubCsStIZKs-SEzJrpc1R3s6KNTM8tZXTgWCdvI8vZcc_4Nk2h7bJNoErTvHqCm8A/exec';
const BUSINESS_WHATSAPP = '18494404797';

const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),700));
const nav=$('#nav'),progress=$('#scrollProgress'),glow=$('#cursorGlow');
window.addEventListener('mousemove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
window.addEventListener('scroll',()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('scrolled',y>50);progress.style.width=(h?y/h*100:0)+'%';const hero=$('.hero-video');if(hero)hero.style.transform=`scale(1.04) translateY(${y*.055}px)`});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
$('#menuBtn').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));
// navegación activa según sección
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('#navLinks a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>sectionObserver.observe(s));
// Tilt suave para fotos y tarjetas
$$('[data-tilt]').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1200px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-6px)`});card.addEventListener('mouseleave',()=>card.style.transform='')});
// Efecto magnético
$$('.magnetic-btn').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`});btn.addEventListener('mouseleave',()=>btn.style.transform='')});
// Tarjetas de esencia reaccionan al puntero
$$('.ingredient-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
// Cámara lenta real en el video de textura
const textureVideo=$('#textureVideo'),speedBtn=$('#speedBtn');let slow=false;speedBtn.addEventListener('click',()=>{slow=!slow;textureVideo.playbackRate=slow?.55:1;speedBtn.innerHTML=slow?'CÁMARA LENTA · 0.55× <span>◉</span>':'VELOCIDAD NORMAL · 1× <span>◉</span>'});
// Contadores cuando entran a pantalla
let counted=false;const statObserver=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting||counted)return;counted=true;$$('[data-count]').forEach(el=>{const target=+el.dataset.count;let start=0,duration=1000,t0=performance.now();function tick(t){const p=Math.min((t-t0)/duration,1);el.textContent=Math.round((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)})},{threshold:.4});const statRow=$('.stat-row');if(statRow)statObserver.observe(statRow);
// Botón final + micro feedback
$('#tasteBtn').addEventListener('click',()=>{const t=$('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)});
// Pausa/reanuda el video de textura al salir de pantalla para ahorrar recursos
const videoObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)textureVideo.play().catch(()=>{});else textureVideo.pause()}),{threshold:.08});videoObserver.observe(textureVideo);
// Fallback visual si un navegador bloquea el video
$$('video').forEach(v=>v.addEventListener('error',()=>v.classList.add('video-failed')));

// V3: fallback automático para imágenes externas que no carguen
$$('img[data-fallback]').forEach(img=>{
  img.addEventListener('error',()=>{
    const fallback=img.dataset.fallback;
    if(!fallback || img.dataset.fallbackUsed)return;
    img.dataset.fallbackUsed='1';
    img.src=fallback;
  },{once:false});
});
$$('img:not([data-fallback])').forEach(img=>img.addEventListener('error',()=>img.classList.add('image-failed')));


// V6 — interacción premium de equipo
const teamPanel=$('#teamPanel');
const teamMembers=$$('.team-member');
const teamSelected=$('#teamSelected');
const teamMessage=$('#teamMessage');
const teamMessages={
  Darling:'Parte de la idea que convierte la chinola en una experiencia.',
  Jordany:'Creatividad y energía detrás de cada detalle de TROPICAL MOUSSE.',
  Abdiel:'Una pieza clave para darle forma y personalidad al proyecto.',
  Richard:'Organización, visión y ganas de llevar TROPICAL MOUSSE más lejos.'
};
if(teamPanel){
  teamPanel.addEventListener('pointermove',e=>{const r=teamPanel.getBoundingClientRect();teamPanel.style.setProperty('--team-x',`${((e.clientX-r.left)/r.width)*100}%`);teamPanel.style.setProperty('--team-y',`${((e.clientY-r.top)/r.height)*100}%`)});
  teamPanel.addEventListener('pointerleave',()=>{teamPanel.style.setProperty('--team-x','50%');teamPanel.style.setProperty('--team-y','30%')});
}
teamMembers.forEach(member=>member.addEventListener('click',()=>{
  teamMembers.forEach(m=>m.classList.remove('active')); member.classList.add('active');
  const person=member.dataset.person;
  [teamSelected,teamMessage].forEach(el=>el&&el.classList.add('team-changing'));
  setTimeout(()=>{if(teamSelected)teamSelected.textContent=person;if(teamMessage)teamMessage.textContent=teamMessages[person]||'Parte del equipo TROPICAL MOUSSE.';[teamSelected,teamMessage].forEach(el=>el&&el.classList.remove('team-changing'));},120);
}));

// V7 — pedidos: experiencia interactiva + validación numérica
const orderFormV7=$('#orderForm');
if(orderFormV7){
  const nameInput=$('#orderName');
  const qty=$('#orderQty');
  const delivery=$('#orderDelivery');
  const phone=$('#orderPhone');
  const note=$('#orderNote');
  const status=$('#formStatus');
  const btn=orderFormV7.querySelector('.order-btn');
  const heading=orderFormV7.querySelector('.form-heading');

  // Indicador de progreso
  if(heading){
    heading.insertAdjacentHTML('beforeend','<div class="form-step"><span class="active"></span><span></span><span></span><span></span></div>');
  }

  // Cantidad rápida
  const qtyWrap=qty?.parentElement;
  if(qtyWrap && !qtyWrap.querySelector('.qty-quick')){
    qtyWrap.insertAdjacentHTML('beforeend',`<div class="qty-quick" aria-label="Cantidad rápida">
      <button type="button" data-qty="1">1</button><button type="button" data-qty="2">2</button><button type="button" data-qty="3">3</button><button type="button" data-qty="4">4</button><button type="button" data-qty="5">5</button>
    </div>`);
  }

  const summary=document.createElement('div');
  summary.className='order-summary';
  summary.innerHTML='<div><small>RESUMEN</small><span id="orderSummaryText">Completa tus datos para ver el resumen.</span></div><strong id="orderSummaryQty">1 mousse</strong>';
  orderFormV7.querySelector('.order-btn').insertAdjacentElement('beforebegin',summary);

  const steps=[...orderFormV7.querySelectorAll('.form-step span')];
  const updateProgress=()=>{
    const done=[nameInput?.value.trim(),qty?.value,delivery?.value,phone?.value.trim()].filter(Boolean).length;
    steps.forEach((dot,i)=>dot.classList.toggle('active',i<Math.max(1,Math.min(done,steps.length))));
  };

  const updateOrderUI=()=>{
    const name=nameInput?.value.trim()||'Tu pedido';
    const q=qty?.value||'1';
    const d=delivery?.value||'Recoger en CEGES Lucerna';
    $('#orderSummaryText').textContent=`${name} · ${d}`;
    $('#orderSummaryQty').textContent=`${q} mousse${q==='1'?'':'s'}`;
    updateProgress();
    document.querySelectorAll('.qty-quick button').forEach(b=>b.classList.toggle('active',b.dataset.qty===q));
  };

  // Solo números: bloquea letras, símbolos y pegados no numéricos.
  phone?.addEventListener('input',()=>{
    const clean=phone.value.replace(/\D/g,'').slice(0,15);
    if(phone.value!==clean) phone.value=clean;
    updateOrderUI();
  });
  phone?.addEventListener('keydown',e=>{
    const allowed=['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
    if(!/[0-9]/.test(e.key) && !allowed.includes(e.key) && !(e.ctrlKey||e.metaKey)) e.preventDefault();
  });
  phone?.addEventListener('paste',e=>{
    e.preventDefault();
    const text=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,15);
    phone.setRangeText(text,phone.selectionStart,phone.selectionEnd,'end');
    updateOrderUI();
  });

  [nameInput,qty,delivery,note].forEach(field=>field?.addEventListener('input',()=>{updateOrderUI();orderFormV7.classList.add('is-focused');clearTimeout(orderFormV7._focusTimer);orderFormV7._focusTimer=setTimeout(()=>orderFormV7.classList.remove('is-focused'),240);}));
  qty?.addEventListener('change',updateOrderUI);
  document.querySelectorAll('.qty-quick button').forEach(b=>b.addEventListener('click',()=>{qty.value=b.dataset.qty;updateOrderUI();qty.dispatchEvent(new Event('change',{bubbles:true}));}));
  updateOrderUI();

  orderFormV7.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=nameInput.value.trim(), number=phone.value.trim();
    if(!name || !number){
      orderFormV7.classList.remove('shake'); void orderFormV7.offsetWidth; orderFormV7.classList.add('shake');
      if(status) status.textContent='Completa tu nombre y teléfono para preparar el pedido.';
      return;
    }

    const q=qty.value, d=delivery.value, extra=note.value.trim();
    const now=new Date();
    const fecha=now.toLocaleString('es-DO',{dateStyle:'short',timeStyle:'short'});
    const text=`PEDIDO TROPICAL MOUSSE\n\nNombre: ${name}\nCantidad: ${q} mousse(s)\nEntrega: ${d}\nTeléfono: ${number}${extra?'\nNota: '+extra:''}`;

    navigator.clipboard?.writeText(text).catch(()=>{});

    if(status){
      status.classList.remove('order-success'); void status.offsetWidth; status.classList.add('order-success');
      status.innerHTML='✓ <b>Pedido preparado.</b> Se registrará en la hoja y se abrirá WhatsApp para confirmar.';
    }
    if(btn){
      btn.classList.add('sent');
      btn.querySelector('span').textContent='¡Pedido preparado!';
    }
    orderFormV7.classList.add('order-complete');
    setTimeout(()=>orderFormV7.classList.remove('order-complete'),900);

    // Guarda el pedido en Google Sheets mediante Google Apps Script.
    const order={brand:'Tropical Mousse',fecha,nombre:name,cantidad:q,entrega:d,telefono:number,nota:extra};
    let sheetSaved=false;
    if(typeof GOOGLE_SHEETS_URL==='string' && GOOGLE_SHEETS_URL.trim()){
      try{
        await fetch(GOOGLE_SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(order),keepalive:true});
        sheetSaved=true;
      }catch(err){ console.warn('No se pudo enviar a Google Sheets:',err); }
    }

    // WhatsApp del negocio. Puedes cambiarlo en CONFIG al principio del archivo.
    const whatsappUrl=`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`;
    setTimeout(()=>window.open(whatsappUrl,'_blank','noopener,noreferrer'),250);

    if(status && !sheetSaved && GOOGLE_SHEETS_URL.trim()){
      status.innerHTML='✓ <b>WhatsApp preparado.</b> Revisa que hayas configurado la URL de Google Sheets.';
    }
    setTimeout(()=>{
      if(btn){btn.classList.remove('sent');btn.querySelector('span').textContent='Preparar pedido';}
    },2800);
  });
}

// V7 — detalle: parallax cinematográfico suave sin el tilt brusco
const detail=document.querySelector('.cinematic-detail');
if(detail){
  const detailImg=detail.querySelector('img');
  detail.addEventListener('pointermove',e=>{
    const r=detail.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    detail.style.setProperty('--detail-x',`${x*100}%`);
    detail.style.setProperty('--detail-y',`${y*100}%`);
    detail.style.setProperty('--detail-rx',`${y*-1.5}deg`);
    detail.style.setProperty('--detail-ry',`${x*2}deg`);
    if(detailImg) detailImg.style.transform=`translate(${x*-10}px,${y*-8}px) scale(1.045)`;
  });
  detail.addEventListener('pointerleave',()=>{
    detail.style.setProperty('--detail-x','50%'); detail.style.setProperty('--detail-y','45%');
    detail.style.setProperty('--detail-rx','0deg'); detail.style.setProperty('--detail-ry','0deg');
    if(detailImg) detailImg.style.transform='';
  });
}

// V8 — “Descubrir la chinola”: escena inmersiva antes de entrar a la experiencia
const discoverBtn=$('#discoverBtn'),discoverScene=$('#discoverScene');
if(discoverBtn&&discoverScene){
  discoverBtn.addEventListener('click',e=>{
    e.preventDefault();
    discoverScene.classList.add('active');
    discoverScene.setAttribute('aria-hidden','false');
    document.body.classList.add('discover-open');
    setTimeout(()=>{
      discoverScene.classList.remove('active');
      discoverScene.setAttribute('aria-hidden','true');
      document.body.classList.remove('discover-open');
      document.querySelector('#experiencia')?.scrollIntoView({behavior:'smooth',block:'start'});
    },2600);
  });
  discoverScene.addEventListener('click',()=>{
    discoverScene.classList.remove('active');
    discoverScene.setAttribute('aria-hidden','true');
    document.body.classList.remove('discover-open');
  });
}

// V9 — fallback de fotografías reales para la escena "Descubrir la chinola"
document.querySelectorAll('.discover-scene .mousse-cup img').forEach((img, i) => {
  const fallbacks = [
    'https://media.velocidadcuchara.com/uploads/2010/12/10121423/MOUSSE-CON-MARACUYA-H26.png',
    'https://cozinhaamiga.blog/images/posts/1771720178_mousse-de-maracuja-cremosa.png',
    'https://i.pinimg.com/736x/c9/ae/37/c9ae3733afc27c6e2245e7621638b349--bata-toque.jpg'
  ];
  img.addEventListener('error', () => {
    if (img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = '1';
    const next = fallbacks[i];
    if (next && img.src !== next) img.src = next;
  });
});


// V11 — botón final: experiencia distinta que lleva al pedido
const orderLaunchBtn=$('#tasteBtn');
const orderLaunch=$('#orderLaunch');
if(orderLaunchBtn&&orderLaunch){
  orderLaunchBtn.addEventListener('click',e=>{
    e.preventDefault();
    orderLaunch.classList.remove('active');
    void orderLaunch.offsetWidth;
    orderLaunch.classList.add('active');
    orderLaunch.setAttribute('aria-hidden','false');
    document.body.classList.add('order-launch-open');
    const status=$('#formStatus');
    if(status) status.textContent='';
    setTimeout(()=>{
      orderLaunch.classList.remove('active');
      orderLaunch.setAttribute('aria-hidden','true');
      document.body.classList.remove('order-launch-open');
      document.querySelector('#pedido')?.scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>$('#orderName')?.focus({preventScroll:true}),650);
    },1900);
  });
  orderLaunch.addEventListener('click',()=>{
    orderLaunch.classList.remove('active');
    orderLaunch.setAttribute('aria-hidden','true');
    document.body.classList.remove('order-launch-open');
  });
}

// V12 — interacción móvil: scroll + touch en lugar de mouse
const mobileMode=window.matchMedia('(max-width: 700px)');
if(mobileMode.matches){
  const hint=$('#mobileTouchHint');
  let hintTimer;
  const hideHint=()=>{
    if(!hint)return;
    hint.classList.add('hide');
    clearTimeout(hintTimer);
    hintTimer=setTimeout(()=>hint.remove(),700);
  };
  window.addEventListener('scroll',hideHint,{passive:true,once:true});
  window.addEventListener('touchstart',hideHint,{passive:true,once:true});

  // Las tarjetas de esencia responden al toque con una microanimación.
  $$('.ingredient-card').forEach(card=>{
    card.addEventListener('touchstart',()=>{
      $$('.ingredient-card').forEach(c=>c.classList.remove('is-touch-active'));
      card.classList.add('is-touch-active');
      setTimeout(()=>card.classList.remove('is-touch-active'),650);
    },{passive:true});
  });

  // Detalle: pequeño enfoque al tocar la fotografía.
  const detailMobile=document.querySelector('.cinematic-detail');
  detailMobile?.addEventListener('touchstart',()=>{
    detailMobile.classList.add('touch-focus');
    setTimeout(()=>detailMobile.classList.remove('touch-focus'),850);
  },{passive:true});

  // Equipo: feedback táctil en cada integrante.
  teamMembers.forEach(member=>member.addEventListener('touchstart',()=>{
    member.style.transform='translateX(5px) scale(.985)';
    setTimeout(()=>member.style.transform='',180);
  },{passive:true}));

  // Pedidos: convierte el llenado del formulario en pasos visuales.
  const mobileOrder=orderFormV7;
  if(mobileOrder){
    const fields=[nameInput,phone,qty,delivery,note].filter(Boolean);
    const updateMobileStep=()=>{
      mobileOrder.classList.remove('mobile-step-2','mobile-step-3','mobile-step-4');
      if(nameInput?.value.trim()) mobileOrder.classList.add('mobile-step-2');
      if(phone?.value.trim()) mobileOrder.classList.add('mobile-step-3');
      if(qty?.value && delivery?.value) mobileOrder.classList.add('mobile-step-4');
    };
    fields.forEach(f=>f.addEventListener('input',updateMobileStep,{passive:true}));
    fields.forEach(f=>f.addEventListener('change',updateMobileStep,{passive:true}));
    updateMobileStep();

    // En móvil, al completar nombre pasa naturalmente al teléfono.
    nameInput?.addEventListener('change',()=>{
      if(nameInput.value.trim() && !phone.value.trim()) phone.focus();
    });
  }

  // El botón de descubrir mantiene la experiencia de pantalla completa,
  // pero la escena usa la animación mobileMousseLeft/mobileMousseRight.
  discoverBtn?.addEventListener('touchstart',()=>{
    discoverBtn.classList.add('touching');
    setTimeout(()=>discoverBtn.classList.remove('touching'),220);
  },{passive:true});
}
