/* ============================================================
   Pyramid engine — the ONE quiz logic every option runs.
   Source of truth: Quiz/Question Story.md + Quiz/Result Content.md.
   Each option only changes HOW she answers — never what is asked,
   what each answer fills, or how the Result is decided.
   ============================================================ */
window.PyramidEngine = (function(){
  'use strict';

  /* ---------------- the script ---------------- */

  var OPENER_OPTS = [
    {id:'heavier', t:'Heavier than I want to be',        path:1, r:'That’s the one most people lead with.'},
    {id:'sleep',   t:'Not sleeping well',                path:2, r:'Those nights drag a lot with them.'},
    {id:'foggy',   t:'Foggy — I can’t think straight', path:2, r:'Hard to describe, easy to dismiss. Noted.'},
    {id:'tired',   t:'Tired, all the time',              path:3, r:'That kind of tired has more than one cause — let’s find yours.'},
    {id:'off',     t:'Off, but I can’t pin it down', path:4, r:'That’s the one most people find hardest to put into words.'}
  ];
  var MULTI_REACT = 'That’s a lot to carry at once — and it rarely arrives one at a time.';

  var PEP_OPTS = [
    {id:'no',  t:'Not really — I’ll deal with things if they come', v:'no',
     r:'Fair enough — no need to fix what isn’t asking for it.'},
    {id:'yes', t:'Yes — I like being proactive about that', v:'yes',
     r:'Good instinct — that’s worth building on.'}
  ];
  var RECOV_OPTS = [
    {id:'same',   t:'Pretty much the same as always', v:'no',
     r:'Good — that’s a solid base to work from.'},
    {id:'slower', t:'Takes longer than it used to',  v:'yes',
     r:'Noted — recovery is worth watching.'}
  ];
  var AGE_OPTS = [
    {id:'u40', t:'Under 40', band:'u40'},
    {id:'40s', t:'40s',      band:'40s'},
    {id:'50s', t:'50s',      band:'50s'},
    {id:'60p', t:'60+',      band:'60p'}
  ];
  var SIGNS_OPTS = [
    {id:'yes', t:'Yes — some of that', v:'yes', r:'Good instinct to name it out loud.'},
    {id:'no',  t:'No — none of that',  v:'no',  r:'Steady is a good answer too.'}
  ];
  var PRIO_OPTS = [
    {id:'A', t:'My weight',          v:'A', r:'Starred — that’s your priority.'},
    {id:'B', t:'My sleep and cycle', v:'B', r:'Starred — that’s your priority.'}
  ];

  /* Question order per path (Question Story.md). Conditionals are
     skipped by needed(), not by editing these lists. */
  var ORDERS = {
    1:['opener','height','weight','pep','age','signs','prio'],
    2:['opener','age','signs','pep','height','weight','prio'],
    3:['opener','recovery','height','weight','age','signs','prio'],
    4:['opener','pep','height','weight','age','signs','prio']
  };

  function stepDef(id, path){
    switch(id){
      case 'opener': return {id:id, kind:'multi',
        q:'How have you been feeling lately?',
        sub:'Pick what fits — more than one is fine.',
        opts:OPENER_OPTS};
      case 'height': return {id:id, kind:'height',
        q: path===1 ? 'How tall are you?' : 'Two quick numbers. How tall are you?',
        sub:'In feet and inches — roughly is fine.'};
      case 'weight': return {id:id, kind:'weight',
        q:'And roughly what do you weigh?',
        sub:'In pounds — roughly is fine.'};
      case 'pep': return {id:id, kind:'single',
        q: path===4
          ? 'Even without pinning it down to one thing, is staying ahead — energy, recovery, longevity — something you’re curious about?'
          : 'Beyond that, is staying ahead — energy, recovery, longevity — something you’re curious about too?',
        opts:PEP_OPTS};
      case 'recovery': return {id:id, kind:'single',
        q:'That kind of tired — after a workout or a demanding week, how fast do you actually bounce back?',
        opts:RECOV_OPTS};
      case 'age': return {id:id, kind:'single',
        q: path===2 ? 'Some of that has a timeline. How old are you?' : 'And how old are you?',
        opts:AGE_OPTS};
      case 'signs': return {id:id, kind:'single',
        q:'Any signs of a shift? Cycles changing, night sweats, sudden heat.',
        opts:SIGNS_OPTS};
      case 'prio': return {id:id, kind:'single',
        q:'If one thing changed first — your weight, or your sleep and cycle — which would you want it to be?',
        opts:PRIO_OPTS};
    }
  }

  function optById(list, id){
    for (var i=0;i<list.length;i++) if(list[i].id===id) return list[i];
    return null;
  }

  /* ---------------- session ---------------- */

  function create(){
    var state, history;

    function reset(){
      state = {W:null,H:null,P:null,ageBand:null,prio:null,openerIds:null,path:null,
               heightIn:null,lbs:null,signsAsked:false};
      history = [];
    }
    reset();

    /* Apply one answer to state; returns the react line. */
    function apply(id, value){
      switch(id){
        case 'opener':
          state.openerIds = value.slice();
          state.path = optById(OPENER_OPTS, value[0]).path;
          return value.length>1 ? MULTI_REACT : optById(OPENER_OPTS, value[0]).r;
        case 'height':
          state.heightIn = value.ft*12 + value.inch;
          return 'Noted.';
        case 'weight':
          state.lbs = value.lbs;
          /* Weight care decided here — never spoken, never shown. */
          state.W = (703*state.lbs/(state.heightIn*state.heightIn)) >= 27 ? 'yes' : 'no';
          return 'Thank you — being straight with numbers gets you a straight answer back.';
        case 'pep':
          state.P = optById(PEP_OPTS, value).v;
          return optById(PEP_OPTS, value).r;
        case 'recovery':
          state.P = optById(RECOV_OPTS, value).v;
          return optById(RECOV_OPTS, value).r;
        case 'age':
          state.ageBand = optById(AGE_OPTS, value).band;
          /* under 40 the window hasn't opened — hormone care resolves to
             no with no extra question; 40+ goes on to the signs question,
             and THAT answer decides it */
          if(state.ageBand==='u40') state.H='no';
          return 'Thanks.';
        case 'signs':
          state.signsAsked = true;
          state.H = optById(SIGNS_OPTS, value).v;
          return optById(SIGNS_OPTS, value).r;
        case 'prio':
          state.prio = optById(PRIO_OPTS, value).v;
          return optById(PRIO_OPTS, value).r;
      }
    }

    /* Is this step needed given what we know right now? */
    function needed(id){
      if(id==='signs') return state.ageBand==='40s' || state.ageBand==='50s' || state.ageBand==='60p';
      if(id==='prio')  return state.W==='yes' && state.H==='yes';
      return true;
    }
    function answered(id){
      return history.some(function(h){ return h.id===id; });
    }

    function next(){
      if(!state.path) return stepDef('opener', null);
      var order = ORDERS[state.path];
      for(var i=0;i<order.length;i++){
        if(!answered(order[i]) && needed(order[i])) return stepDef(order[i], state.path);
      }
      return null;
    }

    /* value shapes — opener: [optId,...] (pick order matters);
       height: {ft,inch}; weight: {lbs}; others: optId.
       words: what she actually saw/picked, for the Result's
       "In your words" (each option may phrase it differently). */
    function answer(id, value, words){
      var react = apply(id, value);
      history.push({id:id, value:value, words:words||null});
      return react;
    }

    function replay(){
      var h = history; reset();
      h.forEach(function(e){ apply(e.id, e.value); history.push(e); });
    }
    function back(){
      if(!history.length) return;
      history.pop(); replay();
    }
    /* Rewind so stepId becomes the current question again. */
    function rewindTo(stepId){
      var i = history.findIndex(function(h){ return h.id===stepId; });
      if(i<0) return;
      history = history.slice(0,i); replay();
    }

    function progress(){
      if(!state.path) return 0;
      var order = ORDERS[state.path];
      var total=0, done=0;
      order.forEach(function(id){
        var counts = answered(id) || needed(id);
        /* unresolved conditionals don't count until they trigger */
        if(id==='signs' && !state.ageBand) counts=false;
        if(id==='prio' && (state.W===null || state.H===null)) counts=false;
        if(counts){ total++; if(answered(id)) done++; }
      });
      return total ? done/total : 0;
    }

    return {
      next:next, answer:answer, back:back, rewindTo:rewindTo,
      progress:progress,
      state:function(){ return state; },
      history:function(){ return history.slice(); },
      canBack:function(){ return history.length>0; }
    };
  }

  /* ---------------- the Result (Result Content.md) ---------------- */

  var LAYERS = [
    {k:'A', n:'Weight & metabolism',  s:'Weight care, with GLP-1s'},
    {k:'B', n:'Hormones',             s:'Hormone care, with HRT'},
    {k:'C', n:'Longevity & peptides', s:'Fine-tuning, with peptides'}
  ];
  var WHY = {
    start:{
      A:'This is where your numbers and how you feel line up — the layer the others rest on, so moving it tends to move them too.',
      B:'Your base came back steady, so this is where what you told us points next.',
      C:'Your base and middle layer are steady, so this is genuinely yours to start on.'
    },
    watching:{
      B:'Worth keeping an eye on — not urgent while the base settles. Some of it may ease once it does.',
      C:'You told us you’re curious about staying ahead — worth building on once the base is steady.'
    },
    later:{
      B:'Steady for now. It’s not a rejection — there’s something more useful to do first.',
      C:'Peptides work best once the base is steady. Being at the top isn’t a rejection — there’s something more useful to do first.'
    },
    steady:{
      A:'Your numbers came back steady. Nothing here is asking to go first.',
      B:'Steady — nothing here is asking for attention.',
      C:'Nothing here is asking to go first either.'
    }
  };
  var CTA = {
    A:'See your weight-care options',
    B:'See your hormone-care options',
    C:'See your longevity options',
    none:'Explore all three'
  };

  function leadKey(S){
    if(S.W==='yes') return 'A';
    if(S.H==='yes') return 'B';
    if(S.P==='yes') return 'C';
    return 'none';
  }

  function buildResult(session){
    var S = session.state();
    var k = leadKey(S);
    var yes = {A:S.W==='yes', B:S.H==='yes', C:S.P==='yes'};

    var headline, line;
    if(k==='A'){
      headline='Weight care.';
      if(S.H==='yes'){
        line = S.prio==='B'
          ? 'Most of what you told us sits here — even though you’d start with your sleep and cycle, moving this base tends to move that too.'
          : 'Most of what you told us sits here — and you named it first yourself.';
      } else {
        line = 'This is where what you told us points — the base is what’s asking for attention first.';
      }
    } else if(k==='B'){
      headline='Hormone care.';
      line='Your base came back steady, so this is where you start instead.';
    } else if(k==='C'){
      headline='Fine-tuning.';
      line='Your base and middle layer came back steady, so the top is genuinely yours to start on.';
    } else {
      headline='Nothing here is asking to go first.';
      line='Everything you told us came back steady. That’s not a failure to find something — it’s the honest reading, and the strongest one.';
    }

    var leadIdx = k==='none' ? -1 : ['A','B','C'].indexOf(k);
    var rows = LAYERS.map(function(L, i){
      var status, why;
      if(k==='none'){ status='Steady'; why=WHY.steady[L.k]; }
      else if(i===leadIdx){ status='Start here'; why=WHY.start[L.k]; }
      else if(i<leadIdx){ status='Steady'; why=WHY.steady[L.k]; }
      else if(yes[L.k]){ status='Worth watching'; why=WHY.watching[L.k]; }
      else { status='Later, and that’s good news'; why=WHY.later[L.k]; }
      return {k:L.k, n:L.n, s:L.s, status:status, why:why, lead:i===leadIdx};
    });

    /* "In your words" — only what she actually picked, phrased the way
       her option showed it. Never her numbers, never her age. */
    var said = [];
    session.history().forEach(function(h){
      if(h.id==='opener'){
        var ws = h.words || h.value.map(function(id){ return optById(OPENER_OPTS,id).t.toLowerCase(); });
        said.push({t:ws.join(' · '), turn:'how you’ve been feeling'});
      }
      if(h.id==='prio'){
        var w = h.words ? h.words[0] : optById(PRIO_OPTS, h.value).t.toLowerCase();
        said.push({t:w, turn:'what you’d change first'});
      }
    });

    /* signal map rows — pointers, never figures */
    var signals = [
      {t:'your numbers', bar:'A', yes:yes.A},
      {t:'your age',     bar:'B', yes:S.ageBand!==null && S.ageBand!=='u40' && S.H==='yes'}
    ];
    if(S.signsAsked) signals.push({t:S.H==='yes'?'the shift you named':'no signs of a shift', bar:'B', yes:S.H==='yes'});
    signals.push({t:yes.C?'staying ahead':'wait and see', bar:'C', yes:yes.C});

    return {key:k, headline:headline, oneliner:line, rows:rows, said:said,
            signals:signals, cta:CTA[k]};
  }

  /* ---------------- Result rendering (shared DOM) ---------------- */

  var BADGE_Y = {A:148, B:94, C:40};
  var BARS = {A:{y:158,x:206,w:92,n:'Weight'}, B:{y:110,x:214,w:76,n:'Hormones'}, C:{y:62,x:222,w:60,n:'Longevity'}};

  function sigmapSVG(R){
    /* Each label row sits at the height of the bar it points to, top
       layer first — links run nearly flat and never cross the map. */
    var groups={C:[],B:[],A:[]};
    R.signals.forEach(function(row){ groups[row.bar].push(row); });
    var placed=[];
    ['C','B','A'].forEach(function(b){
      var rows=groups[b], base=BARS[b].y+15;
      rows.forEach(function(row,i){
        placed.push({row:row, y: base - (rows.length-1)*14 + i*28});
      });
    });
    var h=198;
    var out='<svg class="sigmap" viewBox="0 0 300 '+h+'">';
    Object.keys(BARS).forEach(function(b){
      var B=BARS[b];
      out+='<rect class="bar k'+(b==='A'?'base':b==='B'?'mid':'top')+'" x="'+B.x+'" y="'+B.y+'" width="'+B.w+'" height="30" rx="8"></rect>'
        +'<text class="bn'+(b===R.key?' on':'')+'" x="'+(B.x+B.w/2)+'" y="'+(B.y+19)+'" text-anchor="middle">'+B.n+'</text>';
    });
    placed.forEach(function(pr){
      var row=pr.row, y=pr.y, B=BARS[row.bar], ty=B.y+15, x2=B.x-2, mx=(112+x2)/2;
      out+='<text class="sg" x="2" y="'+(y+3)+'"'+(row.yes?'':' opacity=".55"')+'>'+row.t+'</text>'
        +'<path class="lk'+(row.yes?' hot':' steady')+'"'+(row.yes?'':' stroke-dasharray="3 4"')
        +' d="M112 '+y+' C'+mx+' '+y+' '+mx+' '+ty+' '+x2+' '+ty+'"></path>';
    });
    out+='</svg><p class="why-cap"><b>Solid lines are what pointed somewhere.</b> Dashed came back steady — and steady is why a layer can wait. We know, because we asked. Not a score of your body — only where your answers landed.</p>';
    return out;
  }

  function renderResult(session){
    var R = buildResult(session);

    document.getElementById('rvHead').textContent = R.headline;
    document.getElementById('rvLine').textContent = R.oneliner;

    var tick=document.getElementById('rvTick'), badge=document.getElementById('rvBadge');
    if(R.key==='none'){ tick.style.display='none'; badge.style.display='none'; }
    else{
      tick.style.display=''; badge.style.display='';
      tick.setAttribute('y1',BADGE_Y[R.key]); tick.setAttribute('y2',BADGE_Y[R.key]);
      badge.setAttribute('y',BADGE_Y[R.key]-12);
    }

    var host=document.getElementById('rows'); host.innerHTML='';
    R.rows.forEach(function(r,i){
      var d=document.createElement('div');
      d.className='row'+(r.lead?' lead':i===1?' rl2':' rl3');
      d.innerHTML='<button class="row-hd"><span class="ord">'+(i+1)+'</span>'
        +'<span class="row-t"><p class="row-when">'+r.status+'</p><p class="row-n">'+r.n+'</p>'
        +'<p class="row-s">'+r.s+'</p></span><span class="car"><span class="msr">expand_more</span></span></button>'
        +'<div class="row-body"><div class="row-inner">'+r.why+'</div></div>';
      host.appendChild(d);
      d.querySelector('.row-hd').onclick=function(){ d.classList.toggle('open'); };
    });

    var said=document.getElementById('rvSaid'); said.innerHTML='';
    R.said.forEach(function(sd){
      var p=document.createElement('p'); p.className='rf-words';
      p.innerHTML='“<u></u>” <span class="rf-turn"></span>';
      p.querySelector('u').textContent=sd.t;
      p.querySelector('.rf-turn').textContent='— '+sd.turn;
      said.appendChild(p);
    });

    document.querySelector('.footbar .btn').textContent = R.cta;
    var why=document.getElementById('why'); why.innerHTML=''; delete why.dataset.done;
    renderResult._R = R;
  }

  /* ---------------- screens, processing, boot ---------------- */

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

  function startResult(){
    var dev=document.getElementById('dev');
    renderResult(window.__session);
    dev.classList.remove('settled');
    document.querySelectorAll('.rise').forEach(function(r){ r.classList.remove('in'); });
    document.querySelectorAll('.row.open,.disc.open').forEach(function(x){ x.classList.remove('open'); });
    document.getElementById('scroll').scrollTop=0;
    document.querySelectorAll('.rise').forEach(function(r,i){
      setTimeout(function(){ r.classList.add('in'); }, reduce?10:420+i*170);
    });
    setTimeout(function(){ dev.classList.add('settled'); }, reduce?20:900);
  }

  function boot(){
    var dev=document.getElementById('dev');
    var disc=document.getElementById('disc');
    disc.querySelector('.disc-hd').onclick=function(){
      var open=disc.classList.toggle('open');
      var w=document.getElementById('why');
      if(open && !w.dataset.done){ w.innerHTML=sigmapSVG(renderResult._R); w.dataset.done='1'; }
    };
    window.__showScreen=showScreen;
    window.__toCapture=function(){ dev.className='device'; showScreen('scrCapture'); window.__startCapture(); };
    window.__toResult=function(){ dev.className='device'; showScreen('scrResult'); startResult(); };
    function toIntro(){ dev.className='device'; window.__startCapture(); window.__startIntro(); showScreen('scrIntro'); }
    document.getElementById('reset').onclick=toIntro;
    toIntro();
  }

  return {create:create, buildResult:buildResult, toProcessing:toProcessing, boot:boot};
})();
