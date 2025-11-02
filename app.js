// app.js (module)
const demoHotspots = [
  { id:'h1', name:'MALABAR TEA', ssid:'Big fat momo',        password:'bfm@3777',        lat:11.603119621566789, lng:75.59050468405299, desc:'BIG FAT MOMOS' },
  { id:'h2', name:'MALABAR TEA', ssid:'GNXS-2.4G-7FFB52',   password:'1234567890',      lat:11.603119621566789, lng:75.59050468405299, desc:'opposite house' },
  { id:'h3', name:'MALABAR TEA', ssid:'GNXS-e8cce0',        password:'viva7700',        lat:11.603119621566789, lng:75.59050468405299, desc:'opposite house' },
  { id:'h4', name:'MALABAR TEA', ssid:'GNXS-2.4G-1852D0',   password:'arunp123',        lat:11.603119621566789, lng:75.59050468405299, desc:'opposite house' },

  // Newly added hotspots
  { id:'h5', name:'ARAKKILAD JUMA MASJID', ssid:'NRSS', password:'Paikkadi@66461',  lat:11.611685146823703, lng:75.59631598954608, desc:'not know correctly' },
  { id:'h6', name:'AFSAL', ssid:'GNXS-2.4G-815F72',   password:'AFSAL@8044',      lat:11.613083971229628, lng:75.59550786229221, desc:'afsal house' },
  { id:'h7', name:'MUSTAFA', ssid:'starnet',            password:'star12345',       lat:11.613870353313482, lng:75.59562303816998, desc:'not know correctly' },
  { id:'h8', name:'SHAHIN', ssid:'GNXS-9ae468',        password:'shayanshayu',     lat:11.614954201731184, lng:75.59713787429996, desc:'shahin house' },
  { id:'h9', name:'NEAR SHAHIN', ssid:'GNXS-2.4G-386730',   password:'17343718As*#',     lat:11.614494953088895, lng:75.59682147039027, desc:'HAJYAR STORE' },
  { id:'h11', name:'ARAKKILAD JUMA MASJID', ssid:'PAIKKADI 2.4', password:'HIZ@2014',  lat:11.611685146823703, lng:75.59631598954608, desc:'not know correctly' },
  { id:'h12', name:'ARAKKILAD JUMA MASJID', ssid:'ഗജനാവ്💥', password:'Chooduve11@m',  lat:11.611685146823703, lng:75.59631598954608, desc:'jithu house' },
  { id:'h13', name:'Vayal', ssid:'GNXS-344e00',   password:'8637522961',      lat:11.61087257455727, lng:75.59381566618084, desc:'bengaali house' },
  { id:'h13', name:'Vayal', ssid:'GNXS-2.4G-1A9850',   password:'onetwo345',      lat:11.61087257455727, lng:75.59381566618084, desc:'not know corrrectly' },
  // Added new hotspot
  { id:'h10', name:'DARUL SHEZA', ssid:'Darul sheza', password:'8111947271', lat:11.612847052769842, lng:75.59566845618322, desc:'Darul sheza house' }
];

// Helper: get page type
const path = location.pathname.split('/').pop();

if (path === '' || path === 'home.html') {
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
    const card = document.createElement('div'); 
    card.className = 'card';
    card.innerHTML = `
      <h4>${h.name}</h4>
      <p>${h.desc}</p>
      <p><strong>SSID:</strong> ${h.ssid}</p>
      <p><strong>Pass:</strong> <span>••••••••••••</span></p>
      <div style="display:flex;gap:8px;margin-top:8px">
        <a class="cta" href="detail.html?id=${h.id}">Open</a>
        <a class="ghost" href="#">Map</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // mini map (centered near the MALABAR TEA area)
  const map = L.map('map-mini').setView([11.609, 75.594], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(map);
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
  passSpan.innerText = '••••••••••••';
  document.getElementById('reveal').addEventListener('click', ()=> {
    passSpan.innerText = h.password;
  });

  const map = L.map('map-detail').setView([h.lat, h.lng], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(map);
  L.marker([h.lat, h.lng]).addTo(map).bindPopup(h.name).openPopup();
}
