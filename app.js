// app.js (module)
const demoHotspots = [
  { id:'h1', name:'MALABAR TEA', ssid:'Big fat momo', password:'bfm@3777', lat:11.603119621566789, lng:75.59050468405299, desc:'Open 7am–10pm' },
  { id:'h2', name:'MALABAR TEA', ssid:'GNXS-2.4G-7FFB52', password:'1234567890', lat:11.603119621566789, lng:75.59050468405299, desc:'opposite house' },
  { id:'h3', name:'MALABAR TEA', ssid:'GNXS-2.4G-1852D0', password:'arunp123', lat:11.603119621566789, lng:75.59050468405299, desc:'opposite house' }
];

// Helper: get page type
const path = location.pathname.split('/').pop();

if (path === '' || path === 'index.html') {
  // nothing to do (just static hero)
} else if (path === 'list.html') {
  renderList();
} else if (path === 'detail.html') {
  renderDetail();
}

/* LIST PAGE */
function renderList(){
  const grid = document.getElementById('grid');
  demoHotspots.forEach(h=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <h4>${h.name}</h4>
      <p>${h.desc}</p>
      <p><strong>SSID:</strong> ${h.ssid}</p>
      <p><strong>Pass:</strong> <span>••••••</span></p>
      <div style="display:flex;gap:8px;margin-top:8px">
        <a class="cta" href="detail.html?id=${h.id}">Open</a>
        <a class="ghost" href="#">Map</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // mini map
  const map = L.map('map-mini').setView([9.5078, 76.3374], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
  demoHotspots.forEach(h=>{
    const m = L.marker([h.lat, h.lng]).addTo(map);
    m.bindPopup(`<strong>${h.name}</strong><br>${h.ssid}`);
  });
}

/* DETAIL PAGE */
function renderDetail(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'h1';
  const h = demoHotspots.find(x=>x.id===id) || demoHotspots[0];

  document.getElementById('name').innerText = h.name;
  document.getElementById('desc').innerText = h.desc;
  document.getElementById('ssid').innerText = h.ssid;
  const passSpan = document.getElementById('password');
  document.getElementById('reveal').addEventListener('click', ()=> {
    passSpan.innerText = h.password;
  });

  const map = L.map('map-detail').setView([h.lat, h.lng], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
  L.marker([h.lat, h.lng]).addTo(map).bindPopup(h.name).openPopup();
}
