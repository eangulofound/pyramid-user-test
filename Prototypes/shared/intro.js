/* ============================================================
   Intro v2 — the meadow scene, shared by all three options.
   Three beats on one continuous strip: the noise → being heard
   (the funnel) → her starting point. One girl walks between
   them; a three-color thread travels the whole way with her.
   Ported from the Claude Design canvas in `illustration example/`.
   ============================================================ */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var BEATS = [
    {t:"There\u2019s a lot out there right now.",
     s:"Weight care, hormones, energy \u2014 it\u2019s all connected, and the options can feel endless. That\u2019s not on you."},
    {t:"Let\u2019s get to know you.",
     s:"A few quick questions, so we can cut through the noise and guide you."},
    {t:"You\u2019ll leave with a starting point.",
     s:"One clear place to begin \u2014 and enough context to make a decision about your health."}
  ];
  var CAM  = [0, -375, -755];
  var GIRL = [166, 465, 906];
  /* the thread: where each colored dot sits per beat */
  var DOTS = {
    nDotA: [[152,136],[614,199.4],[930,241.8]],
    nDotL: [[180,122],[652,205.9],[958,243.8]],
    nDotS: [[196,148],[690,212.1],[984,245.2]]
  };

  var $ = function(id){ return document.getElementById(id); };
  var cam, girl, flip, copy, ct, cs, prev, next, dots;
  var bi=0, busy=false, timers=[];

  function later(fn,ms){ timers.push(setTimeout(fn, reduce?10:ms)); }
  function clear(){ timers.forEach(clearTimeout); timers=[]; }

  function apply(i, walking, dir){
    cam.style.transform  = 'translateX('+CAM[i]+'px)';
    girl.style.transform = 'translateX('+GIRL[i]+'px)';
    Object.keys(DOTS).forEach(function(id){
      var p=DOTS[id][i];
      $(id).style.transform='translate('+p[0]+'px,'+p[1]+'px)';
    });
    $('nP1').style.opacity = (!walking && i===0) ? 1 : 0;
    $('nP2').style.opacity = (!walking && i===1) ? 1 : 0;
    $('nP3').style.opacity = (!walking && i===2) ? 1 : 0;
    $('nPw').style.opacity = walking ? 1 : 0;
    flip.style.transform   = 'scaleX('+dir+')';
    $('nTangle').style.opacity = i===0 ? 1 : 0;
    document.querySelectorAll('.nHaloFx').forEach(function(el){ el.style.opacity = i===1 ? 1 : 0; });
    $('nWp').style.opacity = i===2 ? 1 : 0;
    dots.forEach(function(d,k){ d.classList.toggle('on', k<=i); });
    prev.disabled = i===0;
    next.textContent = i===2 ? 'Start' : 'Next';
  }
  function setCopy(i){ ct.textContent=BEATS[i].t; cs.textContent=BEATS[i].s; }

  function goTo(n){
    if(busy || n===bi) return;
    busy=true; clear();
    var dir = n>bi ? 1 : -1;
    bi=n;
    copy.classList.remove('in');
    apply(n, true, dir);                 /* she walks; the camera follows */
    later(function(){ setCopy(n); copy.classList.add('in'); }, 1150);
    later(function(){ apply(n, false, dir); busy=false; }, 1560);
  }

  window.__startIntro=function(){
    cam=$('nCam'); girl=$('nGirl'); flip=$('nFlip');
    copy=$('copy'); ct=$('ct'); cs=$('cs');
    prev=$('prev'); next=$('next');
    dots=[].slice.call(document.querySelectorAll('#dots i'));
    if(reduce){
      [cam,girl,$('nDotA'),$('nDotL'),$('nDotS')].forEach(function(el){ el.style.transition='none'; });
    }
    clear(); busy=false; bi=0;
    setCopy(0); copy.classList.add('in');
    apply(0, false, 1);
    next.onclick=function(){
      if(busy) return;
      if(bi<2) goTo(bi+1); else window.__toCapture();
    };
    prev.onclick=function(){ if(!busy && bi>0) goTo(bi-1); };
  };
})();
