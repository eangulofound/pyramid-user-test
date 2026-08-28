/* ============================================================
   Test-flow orchestrator (unmoderated user test).
   A group link carries the whole state in the URL:
     Pyramid_Option_2.html?order=231&pos=1
   order = the group's sequence of options; pos = 1-based position.
   With no `order` param the prototypes behave exactly as standalone
   (intro included, no test chrome).
   ============================================================ */
(function(){
  'use strict';

  var params = new URLSearchParams(location.search);
  var order = (params.get('order')||'').replace(/[^123]/g,'');
  var pos = parseInt(params.get('pos')||'1',10);
  var valid = order.length===3 && /^[123]{3}$/.test(order)
    && new Set(order).size===3 && pos>=1 && pos<=3;
  if(!valid){ window.__flow=null; return; }

  var FILES = {
    '1':'Pyramid_Option_1.html',
    '2':'Pyramid_Option_2.html',
    '3':'Pyramid_Option_3.html'
  };
  function urlFor(p){ return FILES[order[p-1]] + '?order=' + order + '&pos=' + p; }

  /* pos 2 and 3 skip the intro — she has already seen it once */
  window.__flow = { order:order, pos:pos, skipIntro: pos>1 };

  /* ---------------- the test bar ---------------- */
  var css = document.createElement('style');
  css.textContent =
    '.tflow{position:fixed;left:0;right:0;top:0;z-index:99;height:40px;'
    +'display:flex;align-items:center;justify-content:center;gap:14px;'
    +'background:#193231;font-family:Figtree,system-ui,sans-serif}'
    +'.tflow p{margin:0;font-size:12.5px;font-weight:700;letter-spacing:.4px;color:#F0FAF5}'
    +'.tflow p span{opacity:.55;font-weight:600}'
    +'.tflow button{border:0;cursor:pointer;background:rgba(255,255,255,.12);color:#F0FAF5;'
    +'border-radius:999px;width:52px;height:26px;font-size:14px;line-height:1;'
    +'font-family:inherit;transition:background .2s}'
    +'.tflow button:hover{background:rgba(255,255,255,.24)}'
    +'.tflow button:disabled{opacity:.3;cursor:default;background:rgba(255,255,255,.08)}'
    +'body{padding-top:40px}'
    +'.device{height:calc(100vh - 40px);height:calc(100dvh - 40px)}';
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.className='tflow';
  bar.innerHTML =
    '<button id="tfPrev" aria-label="Previous prototype">&lsaquo;</button>'
    +'<p>Prototype '+pos+' of 3'+(pos===3?' <span>· last one</span>':'')+'</p>'
    +'<button id="tfNext" aria-label="Next prototype">&rsaquo;</button>';
  document.body.appendChild(bar);

  var prev=bar.querySelector('#tfPrev'), next=bar.querySelector('#tfNext');
  prev.disabled = pos===1;
  next.disabled = pos===3;
  prev.onclick=function(){ if(pos>1) location.href=urlFor(pos-1); };
  next.onclick=function(){ if(pos<3) location.href=urlFor(pos+1); };

  /* When she reaches the Result of prototype 1 or 2, a coachmark points
     at the next-arrow so an unmoderated participant knows how to go on. */
  if(pos<3){
    var tipCss=document.createElement('style');
    tipCss.textContent =
      '@keyframes tfnudge{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}'
      +'.tftip{position:fixed;top:48px;right:12px;z-index:99;max-width:230px;'
      +'background:#193231;color:#F0FAF5;border-radius:12px;padding:10px 13px;'
      +'font-family:Figtree,system-ui,sans-serif;font-size:13px;font-weight:600;'
      +'line-height:1.4;box-shadow:0 6px 20px rgba(25,50,49,.28);'
      +'animation:tfnudge 1.6s ease-in-out infinite;opacity:0;transition:opacity .4s}'
      +'.tftip.on{opacity:1}'
      +'.tftip:before{content:"";position:absolute;top:-5px;right:24px;width:10px;height:10px;'
      +'background:#193231;transform:rotate(45deg);border-radius:2px}';
    document.head.appendChild(tipCss);

    var tip=document.createElement('div');
    tip.className='tftip';
    tip.textContent='Tap here to go to the next prototype';
    document.body.appendChild(tip);

    /* place the tip under the next-arrow */
    function placeTip(){
      var r=next.getBoundingClientRect();
      tip.style.right=Math.max(8, window.innerWidth - r.right - 8)+'px';
    }
    window.addEventListener('resize', placeTip);

    var scrResult=document.getElementById('scrResult');
    if(scrResult){
      new MutationObserver(function(){
        var on=scrResult.classList.contains('on');
        if(on) placeTip();
        tip.classList.toggle('on', on);
      }).observe(scrResult, {attributes:true, attributeFilter:['class']});
    }
  }
})();
