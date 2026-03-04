"use client";

import { useState, useEffect } from 'react';

export default function Home() {
const [menuOpen, setMenuOpen] = useState(false);
const closeMenu = () => setMenuOpen(false);

useEffect(() => {
  // ── Cursor ──────────────────────────────────────────────────
  const cd = document.getElementById('cd');
  const cr = document.getElementById('cr');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let animationId: number;
  const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
  document.addEventListener('mousemove', onMouseMove);
  const loop = () => {
    if (cd && cr) {
      cd.style.left = mx + 'px'; cd.style.top = my + 'px';
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    }
    animationId = requestAnimationFrame(loop);
  };
  loop();

  // ── Nav scroll + active link ────────────────────────────────
  const nav = document.getElementById('nav');
  const secs = ['home','about','vda','gte','divisions','vision','founder','contact'];
  const titleMap: { [key: string]: string } = {
    home:'Lion Tech', about:'About', vda:'VDA', gte:'GTE',
    divisions:'Divisions', vision:'Vision', founder:'Founder', contact:'Contact Us',
  };
  const updateTitle = (id: string) => { document.title = titleMap[id] || 'Lion Tech'; };
  const onScroll = () => {
    if (nav) nav.classList.toggle('sc', window.scrollY > 50);
    let cur = 'home';
    secs.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) cur = id;
    });
    document.querySelectorAll('.nm a').forEach(a => {
      const h = a.getAttribute('href')?.replace('#','');
      a.classList.toggle('active', h === cur);
    });
    updateTitle(cur);
  };
  const onHashChange = () => {
    const hash = window.location.hash.replace('#','');
    if (hash && secs.includes(hash)) updateTitle(hash);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onHashChange);

  // ── Reveal animations ───────────────────────────────────────
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vi'); obs.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  // ── Search ──────────────────────────────────────────────────
  const sd = [
    { t: 'Home — Lion Tech',              s: '#home',      d: 'Engineering Autonomous Intelligence for the Future' },
    { t: 'About Lion Tech',               s: '#about',     d: 'Founded by Prashant Chauhan, AI Researcher & Architect' },
    { t: 'Prashant Chauhan',              s: '#founder',   d: 'Founder & Chief AI Architect, AI Researcher, Data Scientist' },
    { t: 'Virtual Desktop Assistant (VDA)', s: '#vda',     d: 'Flagship project — autonomous screen-based AI computer operator' },
    { t: 'Gate Thinking Engine (GTE)',    s: '#gte',       d: 'Cognitive architecture — structured reasoning gates for safe AI' },
    { t: 'Autonomous Systems Division',   s: '#divisions', d: 'Intelligent agents for digital interaction and execution' },
    { t: 'ML Research Lab',               s: '#divisions', d: 'LLM experimentation, computer vision, adaptive AI planning' },
    { t: 'Sustainable Engineering',       s: '#divisions', d: 'Water, energy, and infrastructure technologies' },
    { t: 'Vision & Mission',              s: '#vision',    d: "Building the intelligence layer of tomorrow's digital world" },
    { t: 'Partner With Us',               s: '#contact',   d: 'Research, investment, enterprise AI, government programs' },
    { t: 'Contact',                       s: '#contact',   d: 'pc113123456@gmail.com — Actively partnering' },
  ];

  const inp = document.getElementById('si') as HTMLInputElement | null;
  const res = document.getElementById('sr');

  if (inp && res) {
    inp.addEventListener('input', function () {
      const q = (this as HTMLInputElement).value.toLowerCase().trim();
      if (!q) { res.classList.remove('on'); res.innerHTML = ''; return; }
      const m = sd.filter(x => x.t.toLowerCase().includes(q) || x.d.toLowerCase().includes(q));
      if (!m.length) { res.classList.remove('on'); res.innerHTML = ''; return; }
      res.innerHTML = m.slice(0, 6).map(x =>
        `<div class="ri" data-s="${x.s}" role="option" tabindex="0">
           <div class="rt">${x.t}</div>
           <div class="rd">${x.d}</div>
         </div>`
      ).join('');
      res.classList.add('on');
    });

    // Click on result → scroll to section
    res.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('.ri') as HTMLElement | null;
      if (!item) return;
      const target = item.dataset.s;
      if (target) {
        res.classList.remove('on');
        res.innerHTML = '';
        if (inp) inp.value = '';
        const el = document.querySelector(target) as HTMLElement | null;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Close dropdown when clicking outside
    const onDocClick = (e: MouseEvent) => {
      if (!inp?.contains(e.target as Node) && !res?.contains(e.target as Node)) {
        res?.classList.remove('on');
      }
    };

    document.addEventListener('click', onDocClick);

    // Keyboard nav — Escape closes
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { res.classList.remove('on'); res.innerHTML = ''; inp.blur(); }
    });
  }

  return () => {
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('hashchange', onHashChange);
  };
}, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Lion Tech — Engineering Autonomous Intelligence | Prashant Chauhan | AI Research Company</title>
      <meta name="description" content="Lion Tech is a research-driven AI company founded by Prashant Chauhan. We build autonomous AI systems including the Virtual Desktop Assistant (VDA) and Gate Thinking Engine (GTE). Expert in autonomous agents, computer vision, and intelligent automation." />
      <meta name="keywords" content="Prashant Chauhan, Lion Tech, AI Researcher, Data Scientist, Autonomous AI, Virtual Desktop Assistant, VDA, Gate Thinking Engine, GTE, Intelligent Automation, Computer Vision, LLM, Machine Learning, Prashant Chauhan AI Researcher, Lion Tech Founder" />
      <meta name="author" content="Prashant Chauhan — Lion Tech" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://lionglobal.in/" />
      <meta property="og:title" content="Lion Tech — Engineering Autonomous Intelligence | Prashant Chauhan" />
      <meta property="og:description" content="Research-driven AI company building autonomous systems — VDA and Gate Thinking Engine. Founded by Prashant Chauhan, AI Researcher & Data Scientist." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lionglobal.in/" />
      <meta property="og:site_name" content="Lion Tech" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Lion Tech — Engineering Autonomous Intelligence" />
      <meta name="twitter:description" content="Autonomous AI systems by Prashant Chauhan. VDA & Gate Thinking Engine research." />

      <style dangerouslySetInnerHTML={{ __html: `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        /* ─── VARIABLES ─────────────────────────────── */
        :root {
          --c: #00FCFC; --g: #7AFF60; --bg: #030808; --bg2: #060D0D;
          --s1: #0A1515; --s2: #0D1A1A; --bd: rgba(0,252,252,0.1);
          --bd2: rgba(0,252,252,0.05); --tx: #E4F3F3; --mu: #4E6B6B; --mu2: #324848;
        }
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }
        html { scroll-behavior:smooth }
        body { background:var(--bg); color:var(--tx); font-family:'DM Sans',sans-serif; font-size:16px; line-height:1.7; overflow-x:hidden; cursor:none }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-track { background:var(--bg) }
        ::-webkit-scrollbar-thumb { background:rgba(0,252,252,0.25) }

        /* ─── CURSOR ────────────────────────────────── */
        #cd { width:10px; height:10px; background:var(--c); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); mix-blend-mode:screen; transition:width .15s,height .15s,background .15s }
        #cr { width:30px; height:30px; border:1px solid rgba(0,252,252,0.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:left .18s ease,top .18s ease,width .2s,height .2s }
        body:has(a:hover) #cd, body:has(button:hover) #cd { width:16px; height:16px; background:var(--g) }
        body:has(a:hover) #cr, body:has(button:hover) #cr { width:46px; height:46px; border-color:var(--g) }

        /* ─── NAV ───────────────────────────────────── */
        
        nav { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:22px 56px; transition:padding .3s,background .3s,border-color .3s; border-bottom:1px solid transparent }
        nav.sc { padding:13px 56px; background:rgba(3,8,8,0.94); backdrop-filter:blur(28px); border-color:var(--bd) }
        .nl { display:flex; align-items:center; gap:12px; text-decoration:none }
        .nl svg { width:38px; height:38px }
        .nl-t { font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem; letter-spacing:-.02em; color:var(--tx) }
        .nl-t span { color:var(--c) }
        .nm { display:flex; align-items:center; gap:36px; list-style:none }
        .nm a { font-family:'Space Mono',monospace; font-size:.67rem; letter-spacing:.14em; text-transform:uppercase; color:var(--mu); text-decoration:none; transition:color .2s; position:relative }
        .nm a::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:var(--c); transition:width .3s }
        .nm a:hover, .nm a.active { color:var(--c) }
        .nm a:hover::after, .nm a.active::after { width:100% }
        .nr { display:flex; align-items:center; gap:18px }
        
        /* ── Logo ───────────────────────────────── */
        .nl {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nl-t {
          font-family: 'Segoe UI', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .nl-t span { color: #00FCFC; }
        /* ── Right Section ──────────────────────── */
        .nr {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
          /* ── Search ─────────────────────────────── */
        .sw { position: relative; }
        .sb {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(0,252,252,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          gap: 8px;
        }
        .si { color: #00FCFC; font-size: 1rem; }
        .sb input {
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.85rem;
          width: 140px;
        }
        .sb input::placeholder { color: rgba(255,255,255,0.35); }
        #sr { position: absolute; top: 100%; left: 0; right: 0; }

        /* ── CTA Button ─────────────────────────── */
        .nc {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #00FCFC;
          color: #0A1515;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
        }
        .nc:hover { opacity: 0.85; transform: translateY(-1px); }

        /* ── Hamburger Button ───────────────────── */
        .hb-btn {
          display: none;          /* desktop par hidden */
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: rgba(0,252,252,0.08);
          border: 1px solid rgba(0,252,252,0.25);
          border-radius: 8px;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .hb-btn:hover { background: rgba(0,252,252,0.15); }
        .hb-btn span {
          display: block;
          width: 20px;
          height: 2px;
          background: #00FCFC;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        /* Animate to X when open */
        .hb-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hb-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hb-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Drawer ──────────────────────── */
        .mobile-drawer {
          display: none;        /* desktop par hidden */
          position: fixed;
          top: 64px;
          left: 0; right: 0;
          background: #0A1515;
          border-bottom: 1px solid rgba(0,252,252,0.15);
          padding: 20px 24px 28px;
          flex-direction: column;
          gap: 6px;
          z-index: 999;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.28s ease, opacity 0.28s ease;
        }
        .mobile-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-drawer a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 12px 14px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          display: block;
        }
        .mobile-drawer a:hover,
        .mobile-drawer a.active {
          color: #00FCFC;
          background: rgba(0,252,252,0.08);
        }
        .drawer-divider {
          height: 1px;
          background: rgba(0,252,252,0.1);
          margin: 10px 0;
        }
        .drawer-cta {
          display: inline-flex !important;
          justify-content: center;
          background: #00FCFC !important;
          color: #0A1515 !important;
          font-weight: 700 !important;
          border-radius: 8px;
          padding: 12px 20px !important;
          margin-top: 4px;
        }
        .drawer-cta:hover {
          background: #00e0e0 !important;
          color: #0A1515 !important;
        }

        /* ── Mobile Search (center) ─────────────── */
        .mobile-search {
          display: none;       /* desktop par hidden */
        }

        /* ════════════════════════════════════════════
           MOBILE BREAKPOINT  ≤ 768px
        ════════════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Logo text chhupaao */
          .nl-t { display: none; }

          /* Desktop menu & desktop CTA chhupaao */
          .nm { display: none; }
          .nr .nc { display: none; }       /* desktop CTA hide */

          /* Search bar center mein */
          .nr .sw { display: none; }       /* right wali search hide */
          .mobile-search {
            display: flex;
            flex: 1;
            justify-content: center;
            padding: 0 12px;
          }
          .mobile-search .sb {
            width: 100%;
            max-width: 280px;
          }
          .mobile-search .sb input { width: 100%; }

          /* Hamburger dikhao */
          .hb-btn { display: flex; }

          /* Drawer dikhao jab open ho */
          .mobile-drawer { display: flex; }
        }

        /* Search */
        .sw { position:relative }
        .sb { display:flex; align-items:center; gap:8px; background:var(--s1); border:1px solid var(--bd); padding:8px 13px; transition:border-color .2s,box-shadow .2s }
        .sb:focus-within { border-color:var(--c); box-shadow:0 0 0 3px rgba(0,252,252,0.07) }
        .sb input { background:none; border:none; outline:none; color:var(--tx); font-family:'Space Mono',monospace; font-size:.67rem; width:150px }
        .sb input::placeholder { color:var(--mu2) }
        .si { color:var(--mu); font-size:.85rem }
        #sr { position:absolute; top:calc(100% + 4px); right:0; background:var(--s1); border:1px solid var(--bd); min-width:280px; display:none; z-index:300 }
        #sr.on { display:block }
        .ri { padding:11px 17px; cursor:pointer; border-bottom:1px solid var(--bd2); transition:background .15s }
        .ri:hover { background:rgba(0,252,252,0.04) }
        .ri:last-child { border-bottom:none }
        .rt { font-family:'Syne',sans-serif; font-size:.78rem; color:var(--c) }
        .rd { font-size:.7rem; color:var(--mu); margin-top:2px }

        /* CTA btn */
        .nc { font-family:'Space Mono',monospace; font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--bg); background:var(--c); padding:9px 20px; text-decoration:none; transition:background .2s,transform .15s; clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px)) }
        .nc:hover { background:var(--g); transform:translateY(-1px) }

        /* ─── BUTTONS ───────────────────────────────── */
        .bp { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; background:var(--c); color:var(--bg); font-family:'Space Mono',monospace; font-size:.7rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; transition:background .2s,transform .15s; clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px)) }
        .bp:hover { background:var(--g); transform:translateY(-2px) }
        .bs { display:inline-flex; align-items:center; gap:8px; padding:14px 30px; background:transparent; color:var(--c); font-family:'Space Mono',monospace; font-size:.7rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(0,252,252,0.2); transition:all .2s }
        .bs:hover { border-color:var(--c); background:rgba(0,252,252,0.05); transform:translateY(-2px) }

        /* ─── SECTION BASE ──────────────────────────── */
        section { position:relative }
        .wrap { max-width:1180px; margin:0 auto; padding:0 56px }
        .stag { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:.2em; text-transform:uppercase; color:var(--c); margin-bottom:10px; display:flex; align-items:center; gap:8px }
        .stag::before { content:'//'; color:var(--mu) }
        h2 { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(1.9rem,3.4vw,3rem); line-height:1; letter-spacing:-.03em; margin-bottom:18px }
        .sd { font-size:.98rem; color:rgba(228,243,243,.62); line-height:1.85; max-width:580px }

        /* ─── HERO ──────────────────────────────────── */
        #home { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:60px; padding:120px 56px 80px; overflow:hidden }
        .hg { position:absolute; inset:0; background-image:linear-gradient(rgba(0,252,252,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,252,252,.022) 1px,transparent 1px); background-size:70px 70px; pointer-events:none }
        .hg1 { position:absolute; width:580px; height:580px; border-radius:50%; background:radial-gradient(circle,rgba(0,252,252,.055) 0%,transparent 70%); top:-150px; left:-80px; pointer-events:none }
        .hg2 { position:absolute; width:360px; height:360px; border-radius:50%; background:radial-gradient(circle,rgba(122,255,96,.04) 0%,transparent 70%); bottom:40px; right:80px; pointer-events:none }
        .hl { position:relative; z-index:2 }
        .he { display:inline-flex; align-items:center; gap:8px; font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; color:var(--c); border:1px solid rgba(0,252,252,.14); padding:6px 13px; margin-bottom:30px; animation:fu .7s ease both }
        .hed { width:5px; height:5px; background:var(--g); border-radius:50%; animation:pg 2s infinite }
        @keyframes pg { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.7)} }
        h1 { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(2.6rem,4.8vw,4.8rem); line-height:.94; letter-spacing:-.04em; margin-bottom:26px; animation:fu .7s .1s ease both }
        h1 .ca { color:var(--c); display:block }
        h1 .cs { font-size:clamp(1.3rem,2.4vw,2.2rem); color:var(--mu); font-weight:600; display:block; margin-top:8px }
        .hb { font-size:1rem; color:rgba(228,243,243,.7); max-width:510px; line-height:1.85; margin-bottom:42px; animation:fu .7s .2s ease both }
        .hcs { display:flex; gap:14px; animation:fu .7s .3s ease both }
        .hm { display:flex; gap:44px; margin-top:60px; padding-top:38px; border-top:1px solid var(--bd); animation:fu .7s .44s ease both }
        .mn { font-family:'Syne',sans-serif; font-weight:800; font-size:2rem; color:var(--c); line-height:1 }
        .ml { font-size:.7rem; color:var(--mu); text-transform:uppercase; letter-spacing:.1em; margin-top:4px }
        .hr2 { position:relative; z-index:2; display:flex; align-items:center; justify-content:center }
        .sw2 { position:relative; width:100%; max-width:560px; aspect-ratio:1.618/1 }
        .sw2 svg.nsv { width:100%; height:100%; overflow:visible }
        .orb { position:absolute; width:116%; height:116%; top:-8%; left:-8%; border:1px dashed rgba(0,252,252,.07); border-radius:50%; animation:sp 34s linear infinite; pointer-events:none }
        .orb2 { position:absolute; width:136%; height:136%; top:-18%; left:-18%; border:1px dashed rgba(122,255,96,.04); border-radius:50%; animation:sp 56s linear infinite reverse; pointer-events:none }
        @keyframes sp { to{transform:rotate(360deg)} }
        .phi { position:absolute; bottom:-14px; right:0; font-family:'Space Mono',monospace; font-size:.56rem; color:#C8A84B; opacity:.45; letter-spacing:.1em }
        .sw2 svg.nsv ellipse { fill:rgba(0,252,252,.12)!important; filter:drop-shadow(0 0 5px rgba(0,252,252,.22)); animation:cd 7s ease-in-out infinite }
        .sw2 svg.nsv ellipse:nth-child(1){animation-delay:0s}
        .sw2 svg.nsv ellipse:nth-child(2){animation-delay:.6s}
        .sw2 svg.nsv ellipse:nth-child(3){animation-delay:1.2s}
        @keyframes cd { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .sw2 svg.nsv circle[fill="#00FCFC"] { filter:drop-shadow(0 0 5px #00FCFC); animation:rf 3.5s ease-in-out infinite }
        .sw2 svg.nsv circle:nth-of-type(1){animation-delay:0s}
        .sw2 svg.nsv circle:nth-of-type(2){animation-delay:.22s}
        .sw2 svg.nsv circle:nth-of-type(3){animation-delay:.44s}
        .sw2 svg.nsv circle:nth-of-type(4){animation-delay:.66s}
        .sw2 svg.nsv circle:nth-of-type(5){animation-delay:.88s}
        .sw2 svg.nsv circle:nth-of-type(6){animation-delay:1.1s}
        .sw2 svg.nsv circle:nth-of-type(7){animation-delay:1.32s}
        .sw2 svg.nsv circle:nth-of-type(8){animation-delay:1.54s}
        .sw2 svg.nsv circle:nth-of-type(9){animation-delay:1.76s}
        .sw2 svg.nsv circle:nth-of-type(10){animation-delay:1.98s}
        .sw2 svg.nsv circle:nth-of-type(11){animation-delay:2.2s}
        .sw2 svg.nsv circle:nth-of-type(12){animation-delay:2.42s}
        .sw2 svg.nsv circle:nth-of-type(13){animation-delay:2.64s}
        .sw2 svg.nsv circle:nth-of-type(14){animation-delay:2.86s}
        @keyframes rf { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(-14px);opacity:.65} }
        .sw2 svg.nsv circle[fill="#7AFF60"] { filter:drop-shadow(0 0 18px #7AFF60) drop-shadow(0 0 36px rgba(122,255,96,.5)); animation:gp 4s ease-in-out infinite }
        @keyframes gp { 0%,100%{filter:drop-shadow(0 0 18px #7AFF60) drop-shadow(0 0 36px rgba(122,255,96,.42))} 50%{filter:drop-shadow(0 0 28px #7AFF60) drop-shadow(0 0 54px rgba(122,255,96,.7))} }
        .sw2 svg.nsv path { stroke-dasharray:3000; stroke-dashoffset:3000; animation:dp 5s ease forwards }
        .sw2 svg.nsv path:nth-of-type(1){animation-delay:.3s}
        .sw2 svg.nsv path:nth-of-type(2){animation-delay:.9s}
        .sw2 svg.nsv path:nth-of-type(3){animation-delay:1.6s}
        .sw2 svg.nsv path:nth-of-type(4){animation-delay:2.3s}
        @keyframes dp { to{stroke-dashoffset:0} }

        /* ─── MARQUEE ───────────────────────────────── */
        .mq { overflow:hidden; border-top:1px solid var(--bd); border-bottom:1px solid var(--bd); padding:16px 0; background:var(--bg2) }
        .mt { display:flex; width:max-content; animation:mq 28s linear infinite }
        .mi { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; letter-spacing:-.01em; color:var(--s2); text-transform:uppercase; padding:0 44px; white-space:nowrap }
        .mi span { color:var(--c); margin-right:10px }
        @keyframes mq { to{transform:translateX(-50%)} }

        /* ─── ABOUT ─────────────────────────────────── */
        #about { padding:120px 0; background:var(--bg2); border-top:1px solid var(--bd) }
        .ab-in { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center }
        .ab-card { background:var(--s1); border:1px solid var(--bd); padding:36px; margin-bottom:16px; position:relative; transition:border-color .2s }
        .ab-card:hover { border-color:var(--c) }
        .ab-card::after { content:''; position:absolute; bottom:0; right:0; width:32px; height:32px; border-right:2px solid var(--c); border-bottom:2px solid var(--c); opacity:0; transition:opacity .2s }
        .ab-card:hover::after { opacity:1 }
        .ab-lbl { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; color:var(--mu); margin-bottom:6px }
        .ab-val { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:var(--c) }
        .ab-txt { font-size:.98rem; color:rgba(228,243,243,.75); line-height:1.85; margin-bottom:22px }
        .ab-q { border-left:3px solid var(--c); padding:22px 28px; background:var(--s1); font-style:italic; font-size:.98rem; color:rgba(228,243,243,.88); line-height:1.7; margin:28px 0 }

        /* ─── VDA ───────────────────────────────────── */
        #vda { padding:120px 0 }
        .vda-in { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center }
        .vda-caps { border:1px solid var(--bd); margin-top:36px }
        .vc-item { padding:18px 28px; border-bottom:1px solid var(--bd2); display:flex; align-items:flex-start; gap:16px; transition:background .2s }
        .vc-item:last-child { border-bottom:none }
        .vc-item:hover { background:var(--s1) }
        .vc-ic { font-size:1rem; width:22px; flex-shrink:0; margin-top:2px }
        .vc-tx { font-size:.88rem; color:rgba(228,243,243,.75); line-height:1.6 }
        .terminal { background:#010A0A; border:1px solid var(--bd); font-family:'Space Mono',monospace; font-size:.76rem; margin-bottom:24px }
        .th2 { padding:10px 16px; border-bottom:1px solid var(--bd); display:flex; align-items:center; gap:6px }
        .td2 { width:8px; height:8px; border-radius:50% }
        .tlb { color:var(--mu); font-size:.62rem; margin-left:6px }
        .tb { padding:22px; min-height:200px }
        .tl { margin-bottom:8px }
        .tp2 { color:var(--g) }
        .tc2 { color:var(--tx) }
        .to2 { color:var(--mu); padding-left:12px }
        .th2c { color:var(--c) }
        .tcr { display:inline-block; width:7px; height:12px; background:var(--c); animation:bl 1s step-end infinite; vertical-align:text-bottom; margin-left:2px }
        @keyframes bl { 0%,100%{opacity:1} 50%{opacity:0} }
        .vda-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px }
        .vtag { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:.07em; text-transform:uppercase; color:var(--c); border:1px solid rgba(0,252,252,.18); padding:4px 10px }

        /* ─── GTE ───────────────────────────────────── */
        #gte { padding:120px 0; background:var(--bg2); border-top:1px solid var(--bd); border-bottom:1px solid var(--bd) }
        .gte-in { display:grid; grid-template-columns:1.618fr 1fr; gap:80px; align-items:start }
        .gates { display:flex; flex-direction:column; gap:0; border:1px solid var(--bd); margin-top:40px }
        .gate { padding:20px 28px; border-bottom:1px solid var(--bd2); display:flex; gap:20px; align-items:flex-start; transition:background .2s,border-color .2s }
        .gate:last-child { border-bottom:none }
        .gate:hover { background:var(--s1) }
        .gate-n { font-family:'Space Mono',monospace; font-size:.65rem; color:var(--c); width:24px; flex-shrink:0; padding-top:2px }
        .gate-t { font-family:'Syne',sans-serif; font-weight:700; font-size:.92rem; color:var(--tx); margin-bottom:4px; transition:color .2s }
        .gate:hover .gate-t { color:var(--c) }
        .gate-d { font-size:.82rem; color:var(--mu); line-height:1.6 }
        .gte-r { margin-top:40px }
        .gte-quote { font-family:'Syne',sans-serif; font-weight:700; font-size:1.35rem; line-height:1.45; color:var(--tx); margin-bottom:18px }
        .gte-quote em { font-style:normal; color:var(--c) }
        .gte-desc { font-size:.9rem; color:rgba(228,243,243,.62); line-height:1.8; margin-bottom:28px }
        .vision-tags { display:flex; flex-direction:column; gap:10px; margin-top:24px; border:1px solid var(--bd) }
        .vtag2 { padding:14px 22px; border-bottom:1px solid var(--bd2); font-size:.85rem; color:rgba(228,243,243,.7); display:flex; align-items:center; gap:12px; transition:background .15s }
        .vtag2:last-child { border-bottom:none }
        .vtag2:hover { background:var(--s1) }
        .vtag2::before { content:'→'; color:var(--c); font-family:'Space Mono',monospace; font-size:.7rem }

        /* ─── DIVISIONS ─────────────────────────────── */
        #divisions { padding:120px 0 }
        .div-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:60px }
        .dc { background:var(--s1); border:1px solid var(--bd); padding:40px; position:relative; overflow:hidden; transition:border-color .3s,transform .2s }
        .dc:hover { border-color:var(--c); transform:translateY(-4px) }
        .dc::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--c),transparent); transform:scaleX(0); transform-origin:left; transition:transform .4s }
        .dc:hover::before { transform:scaleX(1) }
        .dc-ic { font-size:1.8rem; margin-bottom:22px; display:block }
        .dc-t { font-family:'Syne',sans-serif; font-weight:700; font-size:1.05rem; margin-bottom:12px; transition:color .2s }
        .dc:hover .dc-t { color:var(--c) }
        .dc-b { font-size:.84rem; color:var(--mu); line-height:1.75 }

        /* ─── VISION ────────────────────────────────── */
        #vision { padding:120px 0; background:var(--bg2); border-top:1px solid var(--bd); overflow:hidden }
        .vbg { position:absolute; font-family:'Syne',sans-serif; font-weight:800; font-size:17vw; color:rgba(0,252,252,.018); top:50%; left:50%; transform:translate(-50%,-50%); white-space:nowrap; pointer-events:none; letter-spacing:-.06em }
        .vis-in { position:relative; z-index:2; display:grid; grid-template-columns:1.5fr 1fr; gap:80px; align-items:start }
        .vi-list { border:1px solid var(--bd); margin-top:40px }
        .vi-item { padding:22px 30px; border-bottom:1px solid var(--bd2); display:flex; gap:18px; align-items:flex-start; transition:background .2s }
        .vi-item:last-child { border-bottom:none }
        .vi-item:hover { background:var(--s1) }
        .vi-n { font-family:'Space Mono',monospace; font-size:.62rem; color:var(--c); width:20px; flex-shrink:0; padding-top:3px }
        .vi-t { font-size:.88rem; color:rgba(228,243,243,.72); line-height:1.65 }
        .vis-r { margin-top:40px }
        .vis-q { font-family:'Syne',sans-serif; font-weight:700; font-size:1.3rem; line-height:1.5; color:var(--tx); margin-bottom:18px }
        .vis-q em { font-style:normal; color:var(--c) }

        /* ─── FOUNDER ───────────────────────────────── */
        #founder { padding:120px 0; border-top:1px solid var(--bd) }
        .fo-in { display:grid; grid-template-columns:1fr 1.618fr; gap:80px; align-items:start }
        .fo-badge { background:var(--s1); border:1px solid var(--bd); padding:40px; position:relative }
        .fo-badge::after { content:''; position:absolute; bottom:0; right:0; width:40px; height:40px; border-right:2px solid var(--c); border-bottom:2px solid var(--c) }
        .fo-ic { font-size:3.5rem; margin-bottom:20px; display:block }
        .fo-name { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; letter-spacing:-.02em; margin-bottom:6px }
        .fo-role { font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:var(--c); margin-bottom:24px }
        .fo-lines { display:flex; flex-direction:column; gap:0; border:1px solid var(--bd) }
        .fo-line { padding:12px 18px; border-bottom:1px solid var(--bd2); font-size:.82rem; color:var(--mu); display:flex; align-items:center; gap:10px }
        .fo-line:last-child { border-bottom:none }
        .fo-line::before { content:'▸'; color:var(--c); font-size:.6rem }
        .fo-txt { font-size:.98rem; color:rgba(228,243,243,.75); line-height:1.85; margin-bottom:20px }
        .fo-q { border-left:3px solid var(--g); padding:20px 26px; background:var(--s1); font-size:.92rem; color:rgba(228,243,243,.85); line-height:1.7; margin:28px 0; font-style:italic }

        /* ─── CONTACT ───────────────────────────────── */
        #contact { padding:120px 0; background:var(--bg2); border-top:1px solid var(--bd) }
        .co-in { display:grid; grid-template-columns:1fr 1fr; gap:80px }
        .co-opp { border:1px solid var(--bd); margin-top:36px }
        .co-item { padding:18px 26px; border-bottom:1px solid var(--bd2); display:flex; align-items:center; gap:14px; font-size:.88rem; transition:background .15s }
        .co-item:last-child { border-bottom:none }
        .co-item:hover { background:var(--s1) }
        .co-ic { font-size:.95rem; width:20px }
        .co-r { margin-top:36px }
        .co-line { display:flex; align-items:flex-start; gap:16px; padding:18px 0; border-bottom:1px solid var(--bd2) }
        .co-lbl { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:var(--mu); width:72px; flex-shrink:0; padding-top:2px }
        .co-val { font-size:.88rem; color:var(--c) }
        .co-note { margin-top:28px; font-size:.9rem; color:var(--mu); line-height:1.75; margin-bottom:20px }

        /* ─── FOOTER ────────────────────────────────── */
        footer { padding:40px 56px; border-top:1px solid var(--bd); display:flex; align-items:center; justify-content:space-between; background:var(--bg2) }
        .fl { display:flex; align-items:center; gap:10px }
        .fl svg { width:26px; height:26px }
        .fl-t { font-family:'Syne',sans-serif; font-weight:800; font-size:.92rem }
        .fl-t span { color:var(--c) }
        .fc { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:.1em; color:var(--mu) }
        .ftag { font-family:'Syne',sans-serif; font-weight:700; font-size:.8rem; color:var(--mu) }
        .ftag span { color:var(--c) }
        .fls { display:flex; gap:22px; list-style:none }
        .fls a { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:.1em; color:var(--mu); text-decoration:none; text-transform:uppercase; transition:color .2s }
        .fls a:hover { color:var(--c) }

        /* ─── REVEAL ────────────────────────────────── */
        .rv { opacity:0; transform:translateY(26px); transition:opacity .7s ease,transform .7s ease }
        .rv.vi { opacity:1; transform:translateY(0) }
        .rv.vi-2 { transition-delay:.1s }
        .rv.vi-3 { transition-delay:.2s }
        @keyframes fu { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

        /* ─── RESPONSIVE ────────────────────────────── */
        @media(max-width:900px) {
          /* Nav */
          nav { padding:15px 22px }
          .nm { display:none }
          body { cursor:auto }
          #cd,#cr { display:none }

          /* Hero — single column, tighter padding */
          #home {
            grid-template-columns: 1fr;
            padding: 100px 20px 56px;
            gap: 36px;
            min-height: auto;
          }
          h1 { font-size: clamp(2rem, 8vw, 3rem); line-height: 1.05 }
          h1 .cs { font-size: clamp(1rem, 4vw, 1.4rem) }
          .hb { font-size: .9rem; margin-bottom: 28px }
          .hcs { flex-wrap: wrap; gap: 10px }
          .bp, .bs { padding: 12px 20px; font-size: .65rem }
          .hm { gap: 24px; margin-top: 36px; padding-top: 24px; flex-wrap: wrap }
          .mn { font-size: 1.5rem }

          /* Hero SVG — show smaller below text */
          .hr2 { margin-top: 8px }
          .sw2 { max-width: 100%; aspect-ratio: 1.618/1 }

          /* All other sections */
          .ab-in,.vda-in,.gte-in,.vis-in,.fo-in,.co-in { grid-template-columns:1fr; gap:40px }
          .div-grid { grid-template-columns:1fr }
          .wrap { padding:0 20px }
          footer { flex-direction:column; gap:18px; text-align:center; padding:28px 22px }
          .fls { flex-wrap: wrap; justify-content: center; gap: 14px }

          /* Search dropdown full-width on mobile */
          #sr { right: auto; left: 0; min-width: 100%; }
          .sb input { width: 110px }
        }

        @media(max-width:480px) {
          #home { padding: 88px 16px 48px }
          h1 { font-size: clamp(1.8rem, 9vw, 2.6rem) }
          .he { font-size: .55rem; padding: 5px 10px }
          .hcs { flex-direction: column }
          .bp, .bs { width: 100%; justify-content: center }
          .hm { gap: 16px }
        }
      `}} />

      <style>{`nav { background: rgba(3,8,8,0.35); }`}</style>

      <div id="cd" />
      <div id="cr" />

      {/* ═══ NAV ════════════════════════════════════════════════ */}
      <nav id="nav">
        <a href="#home" className="nl" aria-label="Lion Tech Home">
          <svg width={38} height={38} viewBox="0 0 479 479" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M66.4695 22.3353C75.1887 14.083 79.5483 9.95683 84.5708 7.01045C89.0246 4.39773 93.8494 2.47655 98.8801 1.3126C104.553 0 110.556 0 122.561 0H350.28C361.554 0 367.191 0 372.554 1.16752C377.31 2.20309 381.893 3.91425 386.165 6.24892C390.98 8.88104 395.238 12.5753 403.754 19.9638L450.875 60.8446C461.222 69.8222 466.396 74.3111 470.111 79.7493C473.404 84.5684 475.844 89.9168 477.327 95.5617C479 101.932 479 108.781 479 122.481V280.368C479 292.268 479 298.218 477.709 303.847C476.564 308.838 474.673 313.629 472.101 318.057C469.201 323.051 465.138 327.397 457.012 336.091L347.617 453.122C338.702 462.659 334.245 467.427 328.954 470.844C324.265 473.872 319.11 476.11 313.695 477.468C307.586 479 301.059 479 288.005 479H212.062C200.261 479 194.36 479 188.773 477.729C183.819 476.601 179.06 474.739 174.656 472.205C169.69 469.348 165.356 465.343 156.687 457.335L26.225 336.798C16.5628 327.871 11.7317 323.407 8.26913 318.092C5.20004 313.382 2.93099 308.196 1.55378 302.745C0 296.595 0 290.018 0 276.863V120.368C0 107.421 0 100.947 1.50905 94.8826C2.84672 89.5066 5.05137 84.3844 8.03637 79.7175C11.4038 74.4526 16.1054 70.0027 25.5085 61.103L66.4695 22.3353Z" fill="#0A1515"/>
            <path d="M408.067 86.057L386.054 99.8277C380.69 103.183 373.729 102.439 369.195 98.0275C364.543 93.5003 363.696 86.3336 367.166 80.8472L381.045 58.9015C382.478 56.6353 383.194 55.5022 383.901 54.6526C389.227 48.2478 398.41 46.646 405.59 50.869C406.543 51.4292 407.6 52.2527 409.716 53.8998C412.376 55.9704 413.706 57.0057 414.583 57.9285C421.286 64.9834 420.71 76.2151 413.32 82.5473C412.354 83.3756 410.925 84.2694 408.067 86.057Z" fill="#00FCFC" stroke="#00FCFC" strokeWidth="0.5"/>
            <path d="M344.982 112.664L340.078 108.441C332.581 101.985 328.833 98.7575 324.6 96.4581C320.846 94.4185 316.82 92.924 312.644 92.0196C307.936 91 302.99 91 293.096 91H185.576C171.295 91 164.155 91 157.69 92.9886C151.966 94.7489 146.652 97.6337 142.058 101.474C136.868 105.812 132.978 111.8 125.198 123.775L121.623 129.279C117.301 135.932 115.14 139.258 113.61 142.843C112.252 146.026 111.266 149.356 110.67 152.765C110 156.605 110 160.571 110 168.504V212.081C110 224.74 110 231.069 111.605 236.917C113.027 242.097 115.365 246.981 118.508 251.337C122.056 256.254 126.986 260.223 136.846 268.162L181.457 304.081C188.784 309.981 192.448 312.93 196.532 315.028C200.155 316.889 204.015 318.25 208.004 319.073C212.501 320 217.204 320 226.611 320H263.769C274.368 320 279.667 320 284.676 318.841C289.117 317.812 293.376 316.115 297.307 313.808C301.741 311.205 305.588 307.561 313.283 300.272L347.514 267.847C355.803 259.995 359.948 256.069 362.916 251.425C365.547 247.309 367.491 242.791 368.67 238.05C370 232.701 370 226.992 370 215.575V167.223C370 155.078 370 149.006 368.511 143.362C367.192 138.361 365.02 133.625 362.091 129.362C358.787 124.551 354.185 120.589 344.982 112.664Z" fill="#00FCFC" stroke="#00FCFC" strokeWidth="0.5"/>
            <path d="M212.773 321C209.041 321 207.176 321 205.424 321.428C203.87 321.807 202.387 322.432 201.031 323.279C199.502 324.234 198.199 325.57 195.593 328.241L185.821 338.258C183.302 340.84 182.043 342.131 181.143 343.628C180.345 344.956 179.758 346.4 179.402 347.907C179 349.608 179 351.411 179 355.018V375.899C179 379.506 179 381.309 179.402 383.009C179.758 384.517 180.345 385.961 181.143 387.288C182.043 388.786 183.302 390.077 185.821 392.658L203.479 410.759C206.085 413.43 207.387 414.766 208.917 415.721C210.273 416.568 211.756 417.193 213.309 417.572C215.061 418 216.927 418 220.658 418H281.165C285.627 418 287.859 418 289.902 417.409C291.711 416.885 293.406 416.025 294.897 414.874C296.581 413.574 297.899 411.773 300.534 408.172L312.369 391.996C314.088 389.647 314.947 388.472 315.557 387.184C316.099 386.04 316.493 384.833 316.731 383.591C317 382.191 317 380.735 317 377.824V355.018C317 351.411 317 349.608 316.598 347.907C316.242 346.4 315.655 344.956 314.857 343.628C313.957 342.131 312.698 340.84 310.179 338.258L300.407 328.241C297.801 325.57 296.498 324.234 294.969 323.279C293.613 322.432 292.13 321.807 290.576 321.428C288.824 321 286.959 321 283.227 321H212.773Z" fill="#7AFF60" stroke="#7AFF60" strokeWidth="0.5"/>
            <path d="M68.8181 86.4637L90.8317 100.234C96.1949 103.589 103.156 102.846 107.69 98.4342C112.342 93.9071 113.189 86.7404 109.719 81.2539L95.8405 59.3082C94.4074 57.042 93.6908 55.9089 92.9843 55.0594C87.658 48.6546 78.4754 47.0527 71.2951 51.2758C70.3427 51.8359 69.2848 52.6595 67.169 54.3065C64.5091 56.3771 63.1792 57.4124 62.3024 58.3352C55.5991 65.3902 56.1751 76.6218 63.5649 82.954C64.5315 83.7823 65.9604 84.6761 68.818 86.4637Z" fill="#00FCFC" stroke="#00FCFC" strokeWidth="0.5"/>
            <path d="M294.296 177.301L310.484 156.26C314.932 150.479 317.156 147.589 319.724 146.575C322.49 145.482 325.599 145.678 328.206 147.108C330.628 148.436 332.472 151.582 336.16 157.874C338.909 162.564 340.284 164.909 340.467 167.19C340.665 169.653 339.944 172.102 338.443 174.065C337.053 175.884 334.627 177.11 329.776 179.562L306.083 191.538C302.228 193.486 297.543 192.582 294.69 189.338C291.699 185.935 291.534 180.891 294.296 177.301Z" fill="#0A1515" stroke="#00FCFC" strokeWidth="0.8"/>
            <path d="M186.753 177.301L170.565 156.26C166.117 150.479 163.893 147.589 161.325 146.575C158.559 145.482 155.45 145.678 152.843 147.108C150.421 148.436 148.577 151.582 144.889 157.874C142.14 162.564 140.765 164.909 140.582 167.19C140.384 169.653 141.105 172.102 142.606 174.065C143.996 175.884 146.422 177.11 151.273 179.562L174.966 191.538C178.821 193.486 183.506 192.582 186.359 189.338C189.35 185.935 189.516 180.891 186.753 177.301Z" fill="#0A1515" stroke="#00FCFC" strokeWidth="0.8"/>
            <path d="M237.743 273.921C241.223 278.595 242.963 280.932 245.1 281.766C246.971 282.497 249.049 282.497 250.92 281.766C253.057 280.932 254.797 278.595 258.277 273.921L259.99 271.62C264.892 265.036 267.343 261.744 267.279 258.99C267.223 256.594 266.096 254.348 264.207 252.872C262.036 251.176 257.931 251.176 249.723 251.176H246.297C238.088 251.176 233.984 251.176 231.813 252.872C229.924 254.348 228.796 256.594 228.741 258.99C228.677 261.744 231.128 265.036 236.03 271.62L237.743 273.921Z" fill="#0A1515"/>
            <path d="M218.578 311.663L217.142 312.883C213.913 315.627 212.299 316.998 212.179 318.204C212.089 319.117 212.421 320.021 213.081 320.658C213.953 321.5 216.071 321.5 220.308 321.5H275.692C279.929 321.5 282.047 321.5 282.919 320.658C283.579 320.021 283.911 319.117 283.821 318.204C283.701 316.998 282.087 315.627 278.858 312.883L277.422 311.663C276.899 311.219 276.638 310.997 276.342 310.842C276.111 310.721 275.865 310.631 275.61 310.574C275.284 310.5 274.942 310.5 274.256 310.5H221.744C221.058 310.5 220.716 310.5 220.39 310.574C220.135 310.631 219.889 310.721 219.658 310.842C219.362 310.997 219.101 311.219 218.578 311.663Z" fill="#0A1515" stroke="#00FCFC" strokeWidth="0.4"/>
            <path d="M248 281V320" stroke="#00FCFC" strokeWidth="1.2"/>
          </svg>
          <span className="nl-t">Lion<span> Tech</span></span>
        </a>
        <ul className="nm">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#vda">VDA</a></li>
          <li><a href="#gte">GTE</a></li>
          <li><a href="#divisions">Divisions</a></li>
          <li><a href="#founder">Founder</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nr">
          <div className="sw">
            <div className="sb">
              <span className="si">⌕</span>
              <input type="text" id="si" placeholder="Search..." autoComplete="off" aria-label="Search site" />
            </div>
            <div id="sr" role="listbox" />
          </div>
          <a href="#contact" className="nc">→ Partner With Us</a>
        </div>
      <button
          className={`hb-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Menu band karo" : "Menu kholo"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`} role="dialog" aria-label="Navigation menu">
        {["home","about","vda","gte","divisions","founder","contact"].map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={id === "home" ? "active" : ""}
            onClick={closeMenu}
          >
            {id === "home"}
            {id === "about"}
            {id === "vda"}
            {id === "gte"}
            {id === "divisions"}
            {id === "founder"}
            {id === "contact"}
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <div className="drawer-divider" />
        <a href="#contact" className="nc drawer-cta" onClick={closeMenu}>
          → Partner With Us
        </a>
      </div>
      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section id="home" aria-label="Hero">
        <div className="hg" />
        <div className="hg1" />
        <div className="hg2" />
        <div className="hl">
          <div className="he">
            <span className="hed" />
            Research-Driven Global Technology Company
          </div>
          <h1>
            Engineering<br />
            <span className="ca">Autonomous Intelligence</span>
            <span className="cs">for the Future.</span>
          </h1>
          <p className="hb">
            Lion Tech builds next-generation autonomous systems capable of observing, reasoning, planning, and executing tasks independently — bridging the gap between artificial intelligence and real-world action.
          </p>
          <div className="hcs">
            <a href="#vda" className="bp">→ Explore VDA</a>
            <a href="#contact" className="bs">Partner With Us</a>
          </div>
          <div className="hm">
            <div><div className="mn">VDA</div><div className="ml">Flagship Project</div></div>
            <div><div className="mn">GTE</div><div className="ml">Core Architecture</div></div>
            <div><div className="mn">3+</div><div className="ml">Years Research</div></div>
          </div>
        </div>
        <div className="hr2">
          <div className="sw2">
            <div className="orb" />
            <div className="orb2" />
            <svg className="nsv" width={557} height={437} viewBox="0 0 557 437" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <ellipse cx="237.746" cy="42.4547" rx="52.0777" ry="32.2655" fill="#D9D9D9"/>
              <ellipse cx="285.295" cy="37.3601" rx="39.6244" ry="37.3601" fill="#D9D9D9"/>
              <ellipse cx="324.354" cy="41.8886" rx="28.8692" ry="22.6425" fill="#D9D9D9"/>
              <circle cx="10.7552" cy="207.745" r="10.7552" fill="#00FCFC"/>
              <circle cx="65.0972" cy="181.706" r="10.7552" fill="#00FCFC"/>
              <circle cx="363.978" cy="181.706" r="10.7552" fill="#00FCFC"/>
              <circle cx="254.162" cy="157.931" r="10.7552" fill="#00FCFC"/>
              <circle cx="399.074" cy="102.457" r="10.7552" fill="#00FCFC"/>
              <circle cx="300.579" cy="229.255" r="10.7552" fill="#00FCFC"/>
              <circle cx="162.46" cy="223.595" r="10.7552" fill="#00FCFC"/>
              <circle cx="490.776" cy="240.576" r="10.7552" fill="#00FCFC"/>
              <circle cx="495.304" cy="96.7966" r="10.7552" fill="#00FCFC"/>
              <circle cx="173.781" cy="108.118" r="10.7552" fill="#00FCFC"/>
              <circle cx="310.768" cy="313.032" r="10.7552" fill="#00FCFC"/>
              <path d="M177.744 99.6269C177.744 99.6269 185.102 97.3627 192.461 81.796C199.82 66.2293 206.613 65.0971 206.613 65.0971M181.706 114.911C181.706 114.911 179.442 127.93 213.122 134.157C246.803 140.383 245.671 154.535 245.671 154.535M331.146 63.399C331.146 63.399 351.525 65.0971 361.997 79.2487C372.469 93.4003 392.847 95.0984 392.847 95.0984M262.087 163.592C262.087 163.592 286.427 180.574 308.787 172.366C331.146 164.158 354.355 180.574 354.355 180.574M371.903 174.913C371.903 174.913 388.319 156.799 435.302 142.082C482.285 127.364 491.908 105.854 491.908 105.854M405.867 110.382C405.867 110.382 423.415 127.364 473.794 138.119C524.174 148.874 537.193 165.856 537.193 165.856" stroke="#00FCFC" strokeOpacity="0.2"/>
              <path d="M549.646 177.177C510.022 180.574 517.906 211.678 497.569 233.784M371.337 187.367C371.337 187.367 382.658 210.575 426.811 210.575C470.964 210.575 482.285 233.784 482.285 233.784M319.259 307.938C319.259 307.938 356.619 319.825 397.942 276.804C439.264 233.784 482.285 247.935 482.285 247.935M300.579 238.878C300.579 238.878 311.334 247.935 303.409 273.408C295.484 298.881 306.239 307.938 306.239 307.938M172.083 221.33C172.083 221.33 220.764 236.048 263.502 204.348C306.239 172.649 354.921 187.367 354.921 187.367M159.629 214.538C159.629 214.538 147.176 192.461 165.856 165.856C184.536 139.251 172.083 117.175 172.083 117.175M348.694 49.8135C348.694 49.8135 382.658 49.8135 418.037 71.0408C453.416 92.2681 487.38 92.2681 487.38 92.2681M389.451 108.684C389.451 108.684 354.921 102.457 326.476 131.043C298.032 159.63 263.502 153.403 263.502 153.403M263.502 71.0408C263.502 71.0408 250.766 92.2681 259.681 110.241C268.596 128.213 255.86 149.44 255.86 149.44M306.239 221.33C306.239 221.33 320.391 182.131 354.921 165.785C389.451 149.44 403.602 110.241 403.602 110.241M497.569 102.457C497.569 102.457 507.523 125.93 521.06 129.911C554.741 139.817 544.552 157.365 544.552 157.365M493.04 102.457C493.04 102.457 508.89 144.346 493.04 168.12C477.19 191.895 493.04 233.784 493.04 233.784M73.022 187.367C73.022 187.367 83.2111 202.367 108.684 202.226C134.157 202.084 154.535 221.33 154.535 221.33M69.0596 173.781C69.0596 173.781 104.155 180.008 117.458 141.233C130.76 102.457 165.856 108.684 165.856 108.684M17.5479 210.575C17.5479 210.575 107.552 210.575 159.063 262.936C210.575 315.297 300.579 315.297 300.579 315.297M7.92487 202.226C7.92487 202.226 19.2461 210.717 32.2655 192.249C45.285 173.781 56.6062 182.272 56.6062 182.272M165.856 214.538C165.856 214.538 198.122 183.121 198.971 142.789C199.82 102.457 232.085 71.0408 232.085 71.0408M247.369 165.785C247.369 165.785 279.635 144.841 276.804 243.654C273.974 342.468 306.239 321.523 306.239 321.523" stroke="#00FCFC" strokeOpacity="0.2"/>
              <circle cx="294.918" cy="395.677" r="41.3225" fill="#7AFF60"/>
              <path d="M12 217.983C12 217.983 106.532 234.965 136.817 297.798C167.101 360.631 261.633 377.613 261.633 377.613M313.711 318.176C313.711 318.176 321.07 322.705 313.711 340.536C306.352 358.367 313.711 362.895 313.711 362.895M493.719 245.72C493.719 245.72 485.228 284.212 412.489 311.666C339.75 339.12 331.259 377.613 331.259 377.613M553.721 171C553.721 171 438.811 225.908 438.811 269.778C438.811 313.648 323.9 368.556 323.9 368.556" stroke="#7AFF60" strokeOpacity="0.25"/>
              <circle cx="310.755" cy="312.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="300.755" cy="228.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="290.755" cy="144.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="253.755" cy="157.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="295.323" cy="395.323" r="41.3225" fill="#7AFF60"/>
              <circle cx="162.755" cy="223.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="64.7552" cy="181.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="10.7552" cy="207.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="173.755" cy="107.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="398.755" cy="102.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="495.755" cy="96.7552" r="10.7552" fill="#00FCFC"/>
              <circle cx="545.755" cy="167.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="490.755" cy="239.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="435.755" cy="311.755" r="10.7552" fill="#00FCFC"/>
              <circle cx="363.755" cy="181.755" r="10.7552" fill="#00FCFC"/>
            </svg>
            <div className="phi">φ = 1.618</div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ════════════════════════════════════════════ */}
      <div className="mq" aria-hidden="true">
        <div className="mt">
          {['Prashant Chauhan','Autonomous AI','Virtual Desktop Assistant','Gate Thinking Engine','Computer Vision','LLM Research','Lion Tech','Intelligent Automation',
            'Prashant Chauhan','Autonomous AI','Virtual Desktop Assistant','Gate Thinking Engine','Computer Vision','LLM Research','Lion Tech','Intelligent Automation'].map((item, i) => (
            <span key={i} className="mi"><span>—</span>{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ══════════════════════════════════════════════ */}
      <section id="about" aria-labelledby="about-h2">
        <div className="wrap">
          <div className="ab-in">
            <div className="rv">
              <p className="stag">Company</p>
              <h2 id="about-h2">Lion Tech<br/>Founded by<br/><span style={{color:"var(--c)"}}>Prashant Chauhan</span></h2>
              <div className="ab-card"><div className="ab-lbl">Founder</div><div className="ab-val">Prashant Chauhan</div></div>
              <div className="ab-card"><div className="ab-lbl">Type</div><div className="ab-val">Research-Driven Technology Company</div></div>
              <div className="ab-card"><div className="ab-lbl">Focus</div><div className="ab-val">Autonomous AI · Intelligent Systems</div></div>
              <div className="ab-card"><div className="ab-lbl">Status</div><div className="ab-val" style={{color:"var(--g)"}}>● Actively Researching &amp; Building</div></div>
              <div className="ab-card"><div className="ab-lbl">Contact</div><div className="ab-val" style={{fontSize:".85rem"}}>pc113123456@gmail.com</div></div>
            </div>
            <div className="rv vi-2">
              <p className="stag">About Us</p>
              <h2 style={{fontSize:"2rem"}}>Engineering Autonomous Intelligence</h2>
              <p className="ab-txt">Lion Tech was founded by <strong style={{color:"var(--c)"}}>Prashant Chauhan</strong>, an AI Researcher specializing in autonomous agents, intelligent automation, and advanced machine learning systems.</p>
              <p className="ab-txt">With deep hands-on experience in AI planning, computer vision, large language models, and execution-based intelligence systems, Prashant Chauhan established Lion Tech with a bold objective:</p>
              <blockquote className="ab-q">To create AI systems that function like human operators — understanding context, making decisions, and executing tasks without rigid programming.</blockquote>
              <p className="ab-txt">Our focus is not just building software. <strong style={{color:"var(--tx)"}}>We engineer intelligence.</strong></p>
              <div style={{marginTop:28,display:"flex",gap:14,flexWrap:"wrap"}}>
                <a href="#vda" className="bp">→ View Flagship Project</a>
                <a href="#founder" className="bs">Meet the Founder</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VDA ════════════════════════════════════════════════ */}
      <section id="vda" aria-labelledby="vda-h2" style={{padding:"120px 0",borderTop:"1px solid var(--bd)"}}>
        <div className="wrap">
          <div className="vda-in">
            <div className="rv">
              <p className="stag">Flagship Project</p>
              <h2 id="vda-h2">Virtual Desktop<br/>Assistant <span style={{color:"var(--c)"}}>( VDA)</span></h2>
              <p className="sd">VDA is Lion Tech&apos;s breakthrough autonomous AI system that controls computers the same way a human does — by seeing the screen, understanding instructions, planning actions, and executing them using only mouse and keyboard.</p>
              <div className="vda-caps">
                <div className="vc-item"><span className="vc-ic">👁</span><div className="vc-tx">Real-time screen observation using computer vision — software-agnostic, hardware-independent</div></div>
                <div className="vc-item"><span className="vc-ic">💬</span><div className="vc-tx">Natural language understanding in Hindi + English — bilingual intelligent command processing</div></div>
                <div className="vc-item"><span className="vc-ic">🧠</span><div className="vc-tx">Multi-step AI reasoning and autonomous task planning — no hardcoded scripts</div></div>
                <div className="vc-item"><span className="vc-ic">🔄</span><div className="vc-tx">Intelligent loop detection, self-correcting agent workflows, safe execution boundaries</div></div>
                <div className="vc-item"><span className="vc-ic">🎙</span><div className="vc-tx">Voice-enabled interaction — speak commands, watch execution</div></div>
              </div>
              <div className="vda-tags">
                {['YOLOv8','LLM Planner','PyAutoGUI','Vision API','NLU','Adaptive UI'].map(t=><span key={t} className="vtag">{t}</span>)}
              </div>
            </div>
            <div className="rv vi-2">
              <p className="stag">Live Demo</p>
              <div className="terminal">
                <div className="th2">
                  <div className="td2" style={{background:"#FF5F57"}}/><div className="td2" style={{background:"#FFBD2E"}}/><div className="td2" style={{background:"#28C840"}}/>
                  <span className="tlb">vda_core.py — autonomous mode</span>
                </div>
                <div className="tb">
                  <div className="tl"><span className="tp2">$ </span><span className="tc2">python vda_core.py --autonomous</span></div>
                  <div className="tl"><span className="to2">Vision: <span className="th2c">YOLOv8-screen loaded</span></span></div>
                  <div className="tl"><span className="to2">LLM planner: <span className="th2c">online</span></span></div>
                  <div className="tl"><span className="to2">NLU (EN+HI): <span className="th2c">active</span></span></div>
                  <div className="tl" style={{marginTop:12}}><span className="tp2">cmd&gt; </span><span className="th2c">`Browser mein GitHub kholo aur README dekho`</span></div>
                  <div className="tl"><span className="to2">→ Intent: <span className="th2c">open_browser → navigate → read_file</span></span></div>
                  <div className="tl"><span className="to2">→ Screen scan: <span className="th2c">desktop, 3 windows active</span></span></div>
                  <div className="tl"><span className="to2">→ Plan: <span className="th2c">4 atomic steps generated</span></span></div>
                  <div className="tl"><span className="to2">→ Executing step 1/4...</span></div>
                  <div className="tl"><span className="to2" style={{color:"var(--g)"}}>✓ Task completed autonomously — 4.1s</span></div>
                  <div className="tl"><span className="tp2">cmd&gt; </span><span className="tcr"/></div>
                </div>
              </div>
              <p className="stag" style={{marginTop:28}}>Research Focus Areas</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {['→ Vision-to-pixel coordinate precision mapping','→ AI hallucination reduction in execution context','→ Adaptive UI understanding across software','→ Self-correcting autonomous agent workflows'].map((item,i)=>(
                  <div key={i} style={{padding:"12px 18px",border:"1px solid var(--bd2)",fontSize:".82rem",color:"var(--mu)",transition:"border-color .2s"}}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--c)')}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--bd2)')}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GTE ════════════════════════════════════════════════ */}
      <section id="gte" aria-labelledby="gte-h2">
        <div className="wrap">
          <div className="gte-in">
            <div className="rv">
              <p className="stag">Next-Generation Research</p>
              <h2 id="gte-h2">Gate Thinking<br/>Engine <span style={{color:"var(--c)"}}>( GTE)</span></h2>
              <p className="sd" style={{marginBottom:0}}>GTE is Lion Tech&apos;s advanced cognitive architecture project — redefining how AI systems think and make decisions through structured reasoning gates.</p>
              <div className="gates">
                {[['G1','Context Gate','Validate understanding of input before proceeding — ensuring the AI truly comprehends the request'],
                  ['G2','Logic Gate','Evaluate reasoning correctness — structured logical validation at every decision point'],
                  ['G3','Safety Gate','Check for harmful, unstable, or unintended output before execution proceeds'],
                  ['G4','Execution Gate','Final approval or rejection of action — preventing unvalidated autonomous operations'],
                  ['G5','Memory Gate','Store contextual learning — building persistent intelligence from every interaction']
                ].map(([n,t,d])=>(
                  <div key={n} className="gate"><div className="gate-n">{n}</div><div><div className="gate-t">{t}</div><div className="gate-d">{d}</div></div></div>
                ))}
              </div>
            </div>
            <div className="gte-r rv vi-2">
              <p className="stag">Architecture Vision</p>
              <div className="gte-quote">Instead of linear probability outputs, AI passes through <em>controlled decision checkpoints.</em></div>
              <p className="gte-desc">Most AI models generate responses in a linear, probability-driven manner. GTE introduces structured reasoning gates — controlled decision checkpoints that regulate thought flow, validation, and execution approval. This architecture forms the foundation for General Autonomous Agents.</p>
              <p className="stag">GTE Vision Goals</p>
              <div className="vision-tags">
                {['Drastically reduce hallucinations in LLM systems','Improve decision reliability and consistency','Enable structured autonomous reasoning chains','Create safer, more predictable AI execution models','Build foundation for General Autonomous Agents'].map(v=>(
                  <div key={v} className="vtag2">{v}</div>
                ))}
              </div>
              <div style={{marginTop:28}}><a href="#contact" className="bp">→ Collaborate on GTE</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIVISIONS ══════════════════════════════════════════ */}
      <section id="divisions" aria-labelledby="div-h2" style={{padding:"120px 0",borderTop:"1px solid var(--bd)"}}>
        <div className="wrap">
          <div className="rv">
            <p className="stag">Structure</p>
            <h2 id="div-h2">Our Core Divisions</h2>
            <p className="sd">Three focused divisions, each tackling a distinct frontier — unified by a commitment to autonomous, intelligent systems that work in the real world.</p>
          </div>
          <div className="div-grid">
            <div className="dc rv"><span className="dc-ic">🤖</span><h3 className="dc-t">Autonomous AI Systems Division</h3><p className="dc-b">Developing intelligent agents capable of independent digital interaction and multi-step execution. Our flagship VDA project leads this division — demonstrating that computers can be operated entirely by AI reasoning and vision.</p></div>
            <div className="dc rv vi-2"><span className="dc-ic">🧠</span><h3 className="dc-t">Intelligent Research &amp; ML Lab</h3><p className="dc-b">Focused on LLM experimentation, cognitive architectures including GTE, vision-based automation, and adaptive AI planning engines. This lab drives Lion Tech&apos;s research-first methodology and foundational breakthroughs.</p></div>
            <div className="dc rv vi-3"><span className="dc-ic">🌍</span><h3 className="dc-t">Sustainable Engineering &amp; Innovation</h3><p className="dc-b">Exploring scalable real-world solutions including energy-efficient and environmental technologies. Researching atmospheric water generation and sustainable infrastructure for developing regions globally.</p></div>
          </div>
        </div>
      </section>

      {/* ═══ VISION ═════════════════════════════════════════════ */}
      <section id="vision" aria-labelledby="vis-h2">
        <div className="vbg">AUTONOMOUS</div>
        <div className="wrap">
          <div className="vis-in">
            <div className="rv">
              <p className="stag">Our Vision</p>
              <h2 id="vis-h2">The Future<br/>We Are Building</h2>
              <p className="sd" style={{marginBottom:0}}>Lion Tech envisions a future where autonomous intelligence is the foundation of every digital interaction.</p>
              <div className="vi-list">
                {[['01','AI systems learn from observation — improving through watching humans work, not just static training data'],
                  ['02','Machines adapt to new software environments automatically — true generalization without retraining'],
                  ['03','Automation becomes intelligent, not scripted — context-aware execution of complex workflows'],
                  ['04','Software ecosystems operate autonomously — reducing human burden on repetitive digital tasks'],
                  ['05','Artificial intelligence acts responsibly and safely — with explainable, auditable decision pathways']
                ].map(([n,t])=>(
                  <div key={n} className="vi-item"><div className="vi-n">{n}</div><div className="vi-t">{t}</div></div>
                ))}
              </div>
            </div>
            <div className="vis-r rv vi-2">
              <p className="stag">Mission</p>
              <div className="vis-q">&quot;We are building the <em>intelligence layer</em> of tomorrow&apos;s digital world.&quot;</div>
              <p style={{fontSize:".9rem",color:"rgba(228,243,243,.62)",lineHeight:"1.82",marginBottom:28}}>Every system we design, every algorithm we develop, and every problem we solve moves humanity closer to a world where autonomous intelligence handles complexity — freeing humans to focus on creativity, connection, and innovation.</p>
              <a href="#contact" className="bp">→ Join the Mission</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER ════════════════════════════════════════════ */}
      <section id="founder" aria-labelledby="fo-h2">
        <div className="wrap">
          <div className="fo-in">
            <div className="rv">
              <p className="stag">Leadership</p>
              <div className="fo-badge">
                <span className="fo-ic">👨‍💻</span>
                <div className="fo-name">Prashant Chauhan</div>
                <div className="fo-role">Founder &amp; Chief AI Architect — Lion Tech</div>
                <div className="fo-lines">
                  {['AI Researcher','Data Scientist','Intelligent Systems Developer','BCA — Computer Science','3+ Years ML / AI Research'].map(l=>(
                    <div key={l} className="fo-line">{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="fo-r rv vi-2">
              <p className="stag">Founder</p>
              <h2 id="fo-h2">Prashant Chauhan<br/><span style={{color:"var(--c)",fontSize:"clamp(1.2rem,2vw,1.8rem)"}}>AI Researcher &amp; Systems Architect</span></h2>
              <p className="fo-txt"><strong style={{color:"var(--c)"}}>Prashant Chauhan</strong> is dedicated to advancing autonomous AI systems capable of real-world execution. His research focuses on bridging language models with perception, planning, and action systems to create truly independent intelligent agents.</p>
              <p className="fo-txt">With hands-on experience across Python, TensorFlow, PyTorch, YOLOv8, Next.js, and cloud platforms, Prashant combines deep technical expertise with a founder&apos;s vision — building technology that doesn&apos;t just respond to the world but actively acts within it.</p>
              <blockquote className="fo-q">&quot;My mission: build AI systems that behave like humans — observing, reasoning, and executing tasks independently.&quot;<br/><strong style={{color:"var(--c)",fontStyle:"normal"}}>— Prashant Chauhan</strong></blockquote>
              <p className="fo-txt">Lion Tech represents his long-term vision of building scalable, research-driven AI infrastructure for the future. When searching for <em style={{color:"var(--c)"}}>Prashant Chauhan AI Researcher</em> or <em style={{color:"var(--c)"}}>Lion Tech Founder</em>, this work defines the cutting edge.</p>
              <div style={{display:"flex",gap:14,marginTop:24,flexWrap:"wrap"}}>
                <a href="#contact" className="bp">→ Connect with Prashant</a>
                <a href="#vda" className="bs">View Research</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ════════════════════════════════════════════ */}
      <section id="contact" aria-labelledby="co-h2">
        <div className="wrap">
          <div className="co-in">
            <div className="rv">
              <p className="stag">Partner With Us</p>
              <h2 id="co-h2">Let&apos;s Build<br/>the Future Together</h2>
              <p className="sd" style={{marginBottom:0}}>Lion Tech is actively exploring strategic alliances with organizations and individuals who share our vision of autonomous intelligence infrastructure.</p>
              <div className="co-opp">
                {[['🔬','Global Research Collaborations'],['🏢','Enterprise AI Partnerships'],['💰','Strategic Investments'],['🏛','Government Innovation Programs'],['🤖','AI Product Co-Development'],['🌍','International Technology Exchange']].map(([ic,label])=>(
                  <div key={label} className="co-item"><span className="co-ic">{ic}</span>{label}</div>
                ))}
              </div>
            </div>
            <div className="co-r rv vi-2">
              <p className="stag">Contact</p>
              <h2 style={{fontSize:"1.9rem",marginBottom:24}}>Get in Touch</h2>
              {[['Company','Lion Tech'],['Founder','Prashant Chauhan'],['Role','AI Researcher & Chief Architect'],['HQ','India — Global Operations'],['Status','● Actively Partnering']].map(([lbl,val])=>(
                <div key={lbl} className="co-line">
                  <span className="co-lbl">{lbl}</span>
                  <span className="co-val" style={lbl==='Status'?{color:"var(--g)"}:{}}>{val}</span>
                </div>
              ))}
              <p className="co-note">If you believe in building the future of intelligent systems, we want to hear from you. Research collaborations, enterprise AI partnerships, enterprise automation, or strategic discussions — all welcome.</p>
              <a href="mailto:prashant.chauhan@lionglobal.in" className="bp">→ Send a Message</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════ */}
      <footer>
        <div className="fl">
          <svg width={26} height={26} viewBox="0 0 479 479" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M66.4695 22.3353C75.1887 14.083 79.5483 9.95683 84.5708 7.01045C89.0246 4.39773 93.8494 2.47655 98.8801 1.3126C104.553 0 110.556 0 122.561 0H350.28C361.554 0 367.191 0 372.554 1.16752C377.31 2.20309 381.893 3.91425 386.165 6.24892C390.98 8.88104 395.238 12.5753 403.754 19.9638L450.875 60.8446C461.222 69.8222 466.396 74.3111 470.111 79.7493C473.404 84.5684 475.844 89.9168 477.327 95.5617C479 101.932 479 108.781 479 122.481V280.368C479 292.268 479 298.218 477.709 303.847C476.564 308.838 474.673 313.629 472.101 318.057C469.201 323.051 465.138 327.397 457.012 336.091L347.617 453.122C338.702 462.659 334.245 467.427 328.954 470.844C324.265 473.872 319.11 476.11 313.695 477.468C307.586 479 301.059 479 288.005 479H212.062C200.261 479 194.36 479 188.773 477.729C183.819 476.601 179.06 474.739 174.656 472.205C169.69 469.348 165.356 465.343 156.687 457.335L26.225 336.798C16.5628 327.871 11.7317 323.407 8.26913 318.092C5.20004 313.382 2.93099 308.196 1.55378 302.745C0 296.595 0 290.018 0 276.863V120.368C0 107.421 0 100.947 1.50905 94.8826C2.84672 89.5066 5.05137 84.3844 8.03637 79.7175C11.4038 74.4526 16.1054 70.0027 25.5085 61.103L66.4695 22.3353Z" fill="#0A1515"/>
            <path d="M344.982 112.664L340.078 108.441C332.581 101.985 328.833 98.7575 324.6 96.4581C320.846 94.4185 316.82 92.924 312.644 92.0196C307.936 91 302.99 91 293.096 91H185.576C171.295 91 164.155 91 157.69 92.9886C151.966 94.7489 146.652 97.6337 142.058 101.474C136.868 105.812 132.978 111.8 125.198 123.775L121.623 129.279C117.301 135.932 115.14 139.258 113.61 142.843C112.252 146.026 111.266 149.356 110.67 152.765C110 156.605 110 160.571 110 168.504V212.081C110 224.74 110 231.069 111.605 236.917C113.027 242.097 115.365 246.981 118.508 251.337C122.056 256.254 126.986 260.223 136.846 268.162L181.457 304.081C188.784 309.981 192.448 312.93 196.532 315.028C200.155 316.889 204.015 318.25 208.004 319.073C212.501 320 217.204 320 226.611 320H263.769C274.368 320 279.667 320 284.676 318.841C289.117 317.812 293.376 316.115 297.307 313.808C301.741 311.205 305.588 307.561 313.283 300.272L347.514 267.847C355.803 259.995 359.948 256.069 362.916 251.425C365.547 247.309 367.491 242.791 368.67 238.05C370 232.701 370 226.992 370 215.575V167.223C370 155.078 370 149.006 368.511 143.362C367.192 138.361 365.02 133.625 362.091 129.362C358.787 124.551 354.185 120.589 344.982 112.664Z" fill="#00FCFC"/>
            <path d="M212.773 321H283.227C286.959 321 288.824 321 290.576 321.428C292.13 321.807 293.613 322.432 294.969 323.279C296.498 324.234 297.801 325.57 300.407 328.241L310.179 338.258C312.698 340.84 313.957 342.131 314.857 343.628C315.655 344.956 316.242 346.4 316.598 347.907C317 349.608 317 351.411 317 355.018V377.824C317 380.735 317 382.191 316.731 383.591C316.493 384.833 316.099 386.04 315.557 387.184C314.947 388.472 314.088 389.647 312.369 391.996L300.534 408.172C297.899 411.773 296.581 413.574 294.897 414.874C293.406 416.025 291.711 416.885 289.902 417.409C287.859 418 285.627 418 281.165 418H220.658C216.927 418 215.061 418 213.309 417.572C211.756 417.193 210.273 416.568 208.917 415.721C207.387 414.766 206.085 413.43 203.479 410.759L185.821 392.658C183.302 390.077 182.043 388.786 181.143 387.288C180.345 385.961 179.758 384.517 179.402 383.009C179 381.309 179 379.506 179 375.899V355.018C179 351.411 179 349.608 179.402 347.907C179.758 346.4 180.345 344.956 181.143 343.628C182.043 342.131 183.302 340.84 185.821 338.258L195.593 328.241C198.199 325.57 199.502 324.234 201.031 323.279C202.387 322.432 203.87 321.807 205.424 321.428C207.176 321 209.041 321 212.773 321Z" fill="#7AFF60"/>
          </svg>
          <span className="fl-t">Lion<span> Tech</span></span>
        </div>
        <p className="ftag">Engineering Beyond <span>Boundaries.</span></p>
        <p className="fc">© 2025 Lion Tech · Founded by Prashant Chauhan</p>
        <ul className="fls">
          {[['#home','Home'],['#vda','VDA'],['#gte','GTE'],['#founder','Founder'],['#contact','Contact']].map(([href,label])=>(
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </footer>
    </>
  );
}