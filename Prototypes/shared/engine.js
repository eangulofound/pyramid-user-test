/* ============================================================
   Pyramid engine — scripted edition.
   Source of truth: Quiz/Question Story.md + Quiz/Result Content.md
   (copy-reviewed, Aug 2025).

   Participants answer as themselves; the topic sequence, reactions and Result are fixed
   (Weight care). Nothing branches and nothing is computed — what
   the engine guarantees now is that the REACTS and the Result are
   word-for-word identical across the three prototypes. Each option
   owns only its capture surface (how the same beat is asked and
   answered).
   ============================================================ */
window.PyramidEngine = (function(){
  'use strict';

  /* The five shared reactions — one per beat, same everywhere.
     After each answer the react shows ON ITS OWN, then the next
     question arrives. */
  var REACTS = {
    opener:   'Thanks for sharing.',
    weight:   'Got it.',
    age:      'Thank you for letting us get to know you better.',
    hormone:  'Thanks for sharing.',
    longevity:'We have what we need to show you a starting point.'
  };
  /* Beat order — the one straight line every option walks.
     Height carries no reaction of its own; it flows into weight. */
  var BEATS = ['opener','height','weight','age','hormone','longevity'];

  /* ---------------- screens, processing, result ---------------- */

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showScreen(id){
    ['scrIntro','scrCapture','scrProc','scrResult'].forEach(function(k){
      var el=document.getElementById(k);
      if(el) el.classList.toggle('on', k===id);
    });
  }

  function toProcessing(){
    var dev=document.getElementById('dev');
    showScreen('scrProc');
    dev.classList.add('processing');
    var lines=document.querySelectorAll('.t-line');
    lines.forEach(function(l){ l.classList.remove('on'); });
    var t=600;
    lines.forEach(function(l){
      setTimeout(function(){ l.classList.add('on'); }, reduce?10:t);
      setTimeout(function(){ l.classList.remove('on'); }, reduce?15:t+1500);
      t+=1700;
    });
    setTimeout(function(){
      dev.classList.remove('processing');
      window.__toResult();
    }, reduce?30:t+500);
  }

  /* The Result is fully static markup now (one scripted outcome) —
     all that's left to do is play it in. */
  function startResult(){
    var dev=document.getElementById('dev');
    dev.classList.remove('settled');
    document.querySelectorAll('.rise').forEach(function(r){ r.classList.remove('in'); });
    document.querySelectorAll('.disc.open').forEach(function(x){ x.classList.remove('open'); });
    document.getElementById('scroll').scrollTop=0;
    document.querySelectorAll('.rise').forEach(function(r,i){
      setTimeout(function(){ r.classList.add('in'); }, reduce?10:420+i*170);
    });
    setTimeout(function(){ dev.classList.add('settled'); }, reduce?20:900);
  }

  function boot(){
    var dev=document.getElementById('dev');
    var disc=document.getElementById('disc');
    if(disc) disc.querySelector('.disc-hd').onclick=function(){ disc.classList.toggle('open'); };
    window.__showScreen=showScreen;
    window.__toCapture=function(){ dev.className='device'; showScreen('scrCapture'); window.__startCapture(); };
    window.__toResult=function(){ dev.className='device'; showScreen('scrResult'); startResult(); };
    function toIntro(){ dev.className='device'; window.__startCapture(); window.__startIntro(); showScreen('scrIntro'); }
    document.getElementById('reset').onclick=toIntro;
    toIntro();
  }

  return {REACTS:REACTS, BEATS:BEATS, toProcessing:toProcessing, boot:boot};
})();
