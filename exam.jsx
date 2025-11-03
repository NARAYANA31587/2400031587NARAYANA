<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FEDF-PS05 — Indian Culture & Monuments</title>
  <style>
    :root{--bg:#f8fafc;--card:#ffffff;--muted:#64748b;--accent:#0ea5a1;--glass:rgba(255,255,255,0.6)}
    *{box-sizing:border-box}
    html,body{height:100%;margin:0;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial;background:var(--bg);color:#0f172a}
    .wrap{max-width:1100px;margin:28px auto;padding:20px}
    header{display:flex;align-items:center;justify-content:space-between;gap:16px}
    header h1{font-size:1.25rem;margin:0}
    .role-select{display:flex;gap:8px;align-items:center}
    .btn{background:var(--accent);color:#fff;padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:18px}

    /* Card */
    .card{background:var(--card);padding:16px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)}
    .card img{width:100%;height:140px;object-fit:cover;border-radius:8px}
    .tags{font-size:0.85rem;color:var(--muted);margin-top:8px}

    /* Details area */
    .details{display:flex;gap:18px;margin-top:18px}
    .left{flex:1}
    .right{width:320px}
    .panel{background:var(--card);padding:14px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)}

    /* Virtual tour modal */
    .modal{position:fixed;inset:0;background:rgba(2,6,23,0.6);display:flex;align-items:center;justify-content:center;padding:20px;z-index:40}
    .modal-inner{width:min(980px,96%);background:#fff;padding:18px;border-radius:12px}
    .gallery{display:flex;gap:8px;overflow:auto}
    .gallery img{height:220px;border-radius:8px}

    /* Form */
    form{display:flex;flex-direction:column;gap:8px}
    input,textarea,select{padding:8px;border-radius:8px;border:1px solid #e6eef6}

    footer{margin-top:22px;text-align:center;color:var(--muted)}

    @media (max-width:880px){.details{flex-direction:column}.right{width:100%}}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>FEDF-PS05: Inspire awareness of Indian culture & monuments</h1>
      <div class="role-select">
        <label for="role">You are:</label>
        <select id="role" aria-label="user role">
          <option value="visitor">Cultural Enthusiast (Visitor)</option>
          <option value="content_creator">Content Creator</option>
          <option value="tour_guide">Tour Guide</option>
          <option value="admin">Admin</option>
        </select>
        <button class="btn" id="applyRole">Apply</button>
      </div>
    </header>

    <section class="card" style="margin-top:14px">
      <strong>Project brief:</strong>
      <p style="margin:8px 0;color:var(--muted)">A simple, fully client-side web app that teaches users about Indian culture, heritage and monuments. It includes interactive features, virtual tours, editable content (local-only), and role-based UI behavior to simulate Admin/Creator/Guide actions. Everything persists in your browser’s localStorage so it runs 100% in VS Code Live Server.</p>
    </section>

    <div class="details">
      <div class="left">
        <section>
          <h2 style="margin:12px 0">Monuments & Sites</h2>
          <div class="grid" id="monuments"></div>
        </section>

        <section style="margin-top:18px">
          <h2 style="margin:12px 0">Search & Explore</h2>
          <div style="display:flex;gap:8px">
            <input id="search" placeholder="Search monuments, tags, states..." style="flex:1;padding:8px;border-radius:8px;border:1px solid #e6eef6">
            <button class="btn ghost" id="clearSearch">Clear</button>
          </div>
        </section>

        <section style="margin-top:18px">
          <h2 style="margin:8px 0">Interactive Quiz (learn while playing)</h2>
          <div class="card" id="quizCard">
            <div id="quizQuestion">Click <button class="btn" id="startQuiz">Start Quiz</button> to begin</div>
            <div id="quizChoices" style="margin-top:8px"></div>
            <div id="quizResult" style="margin-top:8px;color:var(--muted)"></div>
          </div>
        </section>
      </div>

      <aside class="right">
        <div class="panel">
          <h3>Role panel</h3>
          <div id="roleInfo" style="color:var(--muted);margin-bottom:8px">Current role: <strong id="roleName">Visitor</strong></div>

          <div id="adminControls" style="display:none">
            <h4>Admin: Manage content</h4>
            <button class="btn" id="resetData">Reset demo data</button>
            <p style="font-size:0.85rem;color:var(--muted);margin-top:8px">Admins can reset the demo dataset, which recreates starter monuments.</p>
          </div>

          <div id="creatorControls" style="display:none;margin-top:10px">
            <h4>Content Creator</h4>
            <form id="creatorForm">
              <input id="title" placeholder="Monument title" required>
              <input id="state" placeholder="State (e.g. Rajasthan)" required>
              <input id="tags" placeholder="Comma-separated tags (fort,unesco)" required>
              <textarea id="desc" rows="4" placeholder="Short description" required></textarea>
              <input id="imgURL" placeholder="Image URL (optional)" />
              <button class="btn" type="submit">Add / Update Content</button>
            </form>
          </div>

          <div id="guideControls" style="display:none;margin-top:10px">
            <h4>Tour Guide</h4>
            <p style="color:var(--muted)">Select a monument and click <em>Start Virtual Tour</em> to simulate a guided narration.</p>
          </div>
        </div>

        <div style="height:12px"></div>
        <div class="panel" id="selectedPanel" style="display:none">
          <h4 id="selTitle">Taj Mahal</h4>
          <div id="selDesc" style="color:var(--muted)"></div>
          <div style="margin-top:10px;display:flex;gap:8px">
            <button class="btn" id="openTour">Start Virtual Tour</button>
            <button class="btn ghost" id="editBtn">Edit (Creator)</button>
          </div>
        </div>
      </aside>
    </div>

    <footer>
      <small>Local demo — edits persist to your browser. Works with VS Code Live Server. — Built for FEDF-PS05</small>
    </footer>
  </div>

  <!-- Modal for virtual tour -->
  <div id="modal" class="modal" style="display:none">
    <div class="modal-inner">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong id="modalTitle">Virtual Tour</strong>
        <button id="closeModal" class="btn ghost">Close</button>
      </div>
      <div style="margin-top:12px" id="modalContent"></div>
    </div>
  </div>

<script>
// Demo dataset (starter monuments). You can extend these in the creator form.
const starterData = [
  {id:'taj',title:'Taj Mahal',state:'Uttar Pradesh',tags:['unesco','mausoleum','mughal'],img:'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=600 height=360><rect width=100% height=100% fill=%23ffffff/><text x=50% y=50% font-size=30 text-anchor=middle dominant-baseline=middle fill=%23063>TAJ MAHAL</text></svg>',desc:'A white marble mausoleum built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal. It is a UNESCO World Heritage Site.'},
  {id:'qutab',title:'Qutub Minar',state:'Delhi',tags:['minaret','delhi','mughal'],img:'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=600 height=360><rect width=100% height=100% fill=%23fff/><text x=50% y=50% font-size=28 text-anchor=middle dominant-baseline=middle fill=%23063>QUTUB MINAR</text></svg>',desc:'An early example of Indo-Islamic architecture. The Qutub Minar is a tall minaret that forms part of a complex of monuments.'},
  {id:'hawa',title:'Hawa Mahal',state:'Rajasthan',tags:['palace','pinkcity','rajasthan'],img:'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=600 height=360><rect width=100% height=100% fill=%23fff/><text x=50% y=50% font-size=26 text-anchor=middle dominant-baseline=middle fill=%23063>HAWA MAHAL</text></svg>',desc:'A palace in Jaipur known for its ornate honeycomb façade and windows used by royal women to observe street life.'}
];

// Helpers for localStorage
function loadData(){
  const raw = localStorage.getItem('fedf_monuments');
  if(!raw){ localStorage.setItem('fedf_monuments',JSON.stringify(starterData)); return JSON.parse(JSON.stringify(starterData)); }
  try{ return JSON.parse(raw); }catch(e){ localStorage.setItem('fedf_monuments',JSON.stringify(starterData)); return JSON.parse(JSON.stringify(starterData)); }
}
function saveData(arr){ localStorage.setItem('fedf_monuments',JSON.stringify(arr)); }

let monuments = loadData();
let currentRole = 'visitor';
let selectedId = null;

const monumentsEl = document.getElementById('monuments');
const roleNameEl = document.getElementById('roleName');
const roleSelect = document.getElementById('role');
const applyRole = document.getElementById('applyRole');
const adminControls = document.getElementById('adminControls');
const creatorControls = document.getElementById('creatorControls');
const guideControls = document.getElementById('guideControls');
const selectedPanel = document.getElementById('selectedPanel');
const selTitle = document.getElementById('selTitle');
const selDesc = document.getElementById('selDesc');
const openTour = document.getElementById('openTour');
const editBtn = document.getElementById('editBtn');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const resetData = document.getElementById('resetData');
const creatorForm = document.getElementById('creatorForm');
const search = document.getElementById('search');
const clearSearch = document.getElementById('clearSearch');

function renderCards(filterText=''){
  monumentsEl.innerHTML = '';
  const q = filterText.trim().toLowerCase();
  monuments.filter(m=>{
    if(!q) return true;
    return (m.title+m.state+(m.tags||[]).join(' ')+m.desc).toLowerCase().includes(q);
  }).forEach(m=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `
      <img src="${m.img||''}" alt="${m.title}">
      <h3 style=\"margin:8px 0 0\">${m.title}</h3>
      <div class=\"tags\">${m.state} • ${ (m.tags||[]).join(', ') }</div>
      <p style=\"margin-top:8px;color:var(--muted)\">${m.desc.slice(0,140)}${m.desc.length>140?'...':''}</p>
      <div style=\"margin-top:10px;display:flex;gap:8px\">
        <button class=\"btn viewBtn\" data-id=\"${m.id}\">View</button>
        <button class=\"btn ghost tourBtn\" data-id=\"${m.id}\">Virtual Tour</button>
      </div>
    `;
    monumentsEl.appendChild(d);
  });
  attachCardEvents();
}

function attachCardEvents(){
  document.querySelectorAll('.viewBtn').forEach(b=>b.addEventListener('click',e=>{
    const id=e.target.dataset.id; selectMonument(id);
  }));
  document.querySelectorAll('.tourBtn').forEach(b=>b.addEventListener('click',e=>{
    const id=e.target.dataset.id; openVirtualTour(id);
  }));
}

function selectMonument(id){
  selectedId = id;
  const m = monuments.find(x=>x.id===id);
  if(!m) return;
  selectedPanel.style.display='block';
  selTitle.textContent = m.title;
  selDesc.textContent = m.desc + ' — ' + m.state;
}

function openVirtualTour(id){
  const m = monuments.find(x=>x.id===id);
  if(!m) return;
  modalTitle.textContent = m.title + ' — Virtual Tour';
  modalContent.innerHTML = `
    <div style=\"display:flex;gap:12px;align-items:flex-start\">
      <img src=\"${m.img}\" alt=\"${m.title}\" style=\"width:48%;border-radius:8px\">
      <div style=\"flex:1\"> 
        <h3>${m.title}</h3>
        <p style=\"color:var(--muted)\">${m.desc}</p>
        <p style=\"color:var(--muted);font-size:0.9rem\"><strong>Tags:</strong> ${ (m.tags||[]).join(', ') }</p>
        <div style=\"margin-top:12px;display:flex;gap:8px;flex-wrap:wrap\"> 
          <button class=\"btn\" id=\"playNarration\">Play narration</button>
          <button class=\"btn ghost\" id=\"showImages\">Show images</button>
        </div>
      </div>
    </div>
  `;
  modal.style.display='flex';

  setTimeout(()=>{
    const p = document.getElementById('playNarration');
    if(p) p.addEventListener('click',()=>{
      alert('Tour guide: "Welcome to '+m.title+'. This is a simulated narration to explain its significance."');
    });
    const g = document.getElementById('showImages');
    if(g) g.addEventListener('click',()=>{
      modalContent.innerHTML += `<div class=\"gallery\" style=\"margin-top:12px\"><img src=\"${m.img}\"><img src=\"${m.img}\"></div>`;
    });
  },200);
}

closeModal.addEventListener('click',()=>{ modal.style.display='none'; });

// Role handling
applyRole.addEventListener('click',()=>{
  currentRole = roleSelect.value;
  roleNameEl.textContent = roleSelect.options[roleSelect.selectedIndex].text;
  adminControls.style.display = currentRole==='admin' ? 'block':'none';
  creatorControls.style.display = currentRole==='content_creator' ? 'block':'none';
  guideControls.style.display = currentRole==='tour_guide' ? 'block':'none';
});

// Reset data (admin)
resetData.addEventListener('click',()=>{
  if(!confirm('Reset demo data to starter monuments?')) return;
  localStorage.removeItem('fedf_monuments');
  monuments = loadData();
  renderCards(search.value);
  alert('Demo data reset.');
});

// Creator form
creatorForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(currentRole !== 'content_creator'){alert('Switch to Content Creator role to add content.');return}
  const id = (document.getElementById('title').value||'').toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-' + Date.now().toString().slice(-4);
  const newMon = {
    id:id,
    title:document.getElementById('title').value,
    state:document.getElementById('state').value,
    tags:document.getElementById('tags').value.split(',').map(s=>s.trim()).filter(Boolean),
    img: document.getElementById('imgURL').value || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=600 height=360><rect width=100% height=100% fill=%23fff/><text x=50% y=50% font-size=20 text-anchor=middle dominant-baseline=middle fill=%23063>IMAGE</text></svg>',
    desc:document.getElementById('desc').value
  };
  monuments.unshift(newMon);
  saveData(monuments);
  renderCards(search.value);
  creatorForm.reset();
  alert('Content added locally.');
});

// Edit button (only show if creator or admin)
editBtn.addEventListener('click',()=>{
  if(!selectedId) return alert('Select a monument first.');
  const m = monuments.find(x=>x.id===selectedId);
  if(!m) return;
  if(currentRole!=='content_creator' && currentRole!=='admin') return alert('Switch to Content Creator or Admin to edit.');
  // prefill form and remove the old entry
  document.getElementById('title').value = m.title;
  document.getElementById('state').value = m.state;
  document.getElementById('tags').value = (m.tags||[]).join(',');
  document.getElementById('desc').value = m.desc;
  document.getElementById('imgURL').value = m.img;
  // remove old
  monuments = monuments.filter(x=>x.id!==selectedId);
  saveData(monuments);
  renderCards(search.value);
  alert('Edit the form and submit to update content.');
});

// Search
search.addEventListener('input',()=> renderCards(search.value));
clearSearch.addEventListener('click',()=>{ search.value=''; renderCards(); });

// Quiz (very simple)
const quiz = [
  {q:'Which monument is a mausoleum built by Shah Jahan?',choices:['Qutub Minar','Taj Mahal','Hawa Mahal'],a:1},
  {q:'Which city is Hawa Mahal located in?',choices:['Agra','Jaipur','Delhi'],a:1},
  {q:'Which of these is a minaret?',choices:['Taj Mahal','Qutub Minar','Hawa Mahal'],a:1}
];
let qi=0; const quizQuestion = document.getElementById('quizQuestion'); const quizChoices = document.getElementById('quizChoices'); const quizResult = document.getElementById('quizResult');
document.getElementById('startQuiz').addEventListener('click',startQuiz);
function startQuiz(){ qi=0; quizResult.textContent=''; showQuestion(); }
function showQuestion(){ const item = quiz[qi]; quizQuestion.innerHTML = `<strong>Q${qi+1}.</strong> ${item.q}`; quizChoices.innerHTML=''; item.choices.forEach((c,idx)=>{
  const b = document.createElement('button'); b.className='btn ghost'; b.style.display='block'; b.style.width='100%'; b.style.marginTop='6px'; b.textContent = c; b.addEventListener('click',()=>{ if(idx===item.a){ quizResult.textContent='Correct!'; }else{ quizResult.textContent='Incorrect — correct: '+item.choices[item.a]; } qi++; if(qi<quiz.length) setTimeout(showQuestion,800); else quizQuestion.innerHTML='Quiz finished!'; }); quizChoices.appendChild(b);
}); }

// Initial render
renderCards();

</script>
</body>
</html>