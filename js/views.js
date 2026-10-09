const TYPE_LABEL = { supreme: 'Supreme Authority', body: 'Governing Body', staff: 'Staff', branch: 'Branch', civil: 'Civil Authority' };
const STATUS_ORDER = ['Active', 'Reserve', 'Dark', 'Training'];
const fmt = n => n.toLocaleString('en-US');
const apexOf = key => BRANCHES[key].ranks.find(r => r !== '-');

const chainIndex = {};
let chainSeq = 0;
function prepChain(node, parent, depth) {
  if (node.branch) {
    const b = BRANCHES[node.branch];
    const civil = ['civil', 'police'].includes(b.fam) && b.tab === 'gov';
    Object.assign(node, { type: civil ? 'civil' : 'branch', title: b.name, sub: apexOf(node.branch), desc: b.intro, leaf: true,
      facts: [['Reports to', b.reports], ['Chain of command', b.chain], ['Mission', b.mission], ['Equipment and assets', b.assets]] });
  }
  node.id = 'c' + (chainSeq++);
  node.parent = parent;
  node.depth = depth;
  chainIndex[node.id] = node;
  (node.children || []).forEach(c => prepChain(c, node, depth + 1));
}
prepChain(CHAIN, null, 0);

const chainState = { mode: 'structure', sel: CHAIN.id, open: new Set([CHAIN.id]), q: '', tier: 'FO-3' };

function chainMatches(n, q) {
  if (!q) return true;
  const hay = (n.title + ' ' + (n.sub || '')).toLowerCase();
  return hay.includes(q) || (n.children || []).some(c => chainMatches(c, q));
}
function chainRows(n, q, out) {
  if (!chainMatches(n, q)) return out;
  const kids = n.children || [];
  const open = q ? true : chainState.open.has(n.id);
  const sel = chainState.sel === n.id ? ' sel' : '';
  out.push(`<div class="v-trow${sel}" style="margin-left:${n.depth * 20}px" onclick="chainSelect('${n.id}')"><span class="v-tog" onclick="event.stopPropagation();chainToggle('${n.id}')">${kids.length ? (open ? '&minus;' : '+') : '&middot;'}</span><span class="v-dot t-${n.type}"></span><span class="v-ttl">${n.title}</span><span class="v-tsub">${n.sub || ''}</span></div>`);
  if (open) kids.forEach(c => chainRows(c, q, out));
  return out;
}
function chainDetail(n) {
  const path = []; for (let p = n.parent; p; p = p.parent) path.unshift(p);
  let h = `<div class="v-crumb">${path.map(p => `<a onclick="chainSelect('${p.id}')">${p.title}</a>`).join(' &rsaquo; ') || 'Top of the chain'}</div>`;
  h += `<div class="v-dtitle">${n.title}</div><div class="v-dtag"><span class="v-dot t-${n.type}"></span>${TYPE_LABEL[n.type]}${n.sub ? ' &middot; ' + n.sub : ''}</div><p class="v-p">${n.desc}</p>`;
  if (n.facts) h += `<table class="v-table">${n.facts.map(f => `<tr><th>${f[0]}</th><td>${f[1]}</td></tr>`).join('')}</table>`;
  if (n.children && n.children.length) h += `<div class="v-h">Direct reports</div><div class="v-chips">${n.children.map(c => `<button class="v-chip" onclick="chainSelect('${c.id}')">${c.title}</button>`).join('')}</div>`;
  if (n.branch) {
    const b = BRANCHES[n.branch];
    h += `<div class="v-h">Formations, top to bottom</div><ul class="v-list">${b.formations.map(f => `<li>${f.slice(f.indexOf('|') + 1)}</li>`).join('')}</ul>`;
    h += `<div class="v-h">Rank ladder (click a rank)</div><div class="v-chips">${TIERS.map((t, i) => b.ranks[i] !== '-' ? `<button class="v-chip rk" onclick="openRank('${n.branch}','${t}')"><b>${t}</b> ${b.ranks[i]}</button>` : '').join('')}</div>`;
    h += `<div class="v-actions"><button class="v-btn" onclick="openBranch('${n.branch}')">Open branch record</button></div>`;
  }
  return h;
}
function renderChainBody() {
  const body = document.getElementById('chain-body');
  if (chainState.mode === 'structure') {
    body.innerHTML = `<div class="v-split"><div class="v-left"><div class="v-tools"><input id="chain-q" class="v-input" placeholder="Search offices and branches" value="${chainState.q}" oninput="chainSearch(this.value)"><button class="v-btn" onclick="chainAll(true)">Expand all</button><button class="v-btn" onclick="chainAll(false)">Collapse</button></div><div id="chain-tree"></div></div><div class="v-right" id="chain-detail"></div></div>`;
    chainPaint();
  } else if (chainState.mode === 'procedures') {
    body.innerHTML = PROCEDURES.map(p => `<details class="v-acc"${p.open ? ' open' : ''}><summary>${p.title}</summary><div class="v-accb">${p.html}</div></details>`).join('');
  } else {
    const idx = TIERS.indexOf(chainState.tier);
    const groups = Object.keys(TABS).map(t => {
      const rows = TABS[t].cols.map(k => BRANCHES[k]).filter(b => b.ranks[idx] !== '-').map(b => `<tr><th>${b.name}</th><td><a class="v-link" onclick="openRank('${Object.keys(BRANCHES).find(k => BRANCHES[k] === b)}','${chainState.tier}')">${b.ranks[idx]}</a></td></tr>`).join('');
      return rows ? `<div class="v-h">${TABS[t].label}</div><table class="v-table">${rows}</table>` : '';
    }).join('');
    body.innerHTML = `<div class="v-tools"><label class="v-lbl">Tier</label><select class="v-input" onchange="chainState.tier=this.value;renderChainBody()">${TIERS.map(t => `<option${t === chainState.tier ? ' selected' : ''}>${t}</option>`).join('')}</select><span class="v-note">Equal tier means equal rank across branches. Authority is limited to one's own branch line unless the Joint Operations Council orders otherwise.</span></div>${groups}`;
  }
}
function chainPaint() {
  document.getElementById('chain-tree').innerHTML = chainRows(CHAIN, chainState.q.toLowerCase(), []).join('');
  document.getElementById('chain-detail').innerHTML = chainDetail(chainIndex[chainState.sel]);
}
function chainSelect(id) {
  chainState.sel = id;
  for (let p = chainIndex[id].parent; p; p = p.parent) chainState.open.add(p.id);
  if (chainState.mode !== 'structure') { chainState.mode = 'structure'; renderChain(document.getElementById('view-panel')); return; }
  chainPaint();
}
function chainToggle(id) { chainState.open.has(id) ? chainState.open.delete(id) : chainState.open.add(id); chainPaint(); }
function chainAll(on) { chainState.open = new Set(on ? Object.keys(chainIndex) : [CHAIN.id]); chainPaint(); }
function chainSearch(v) { chainState.q = v; chainPaint(); }
function chainMode(m) { chainState.mode = m; renderChain(document.getElementById('view-panel')); }
function renderChain(panel) {
  const tabs = [['structure', 'Command Structure'], ['procedures', 'Procedures'], ['equiv', 'Rank Equivalence']];
  panel.innerHTML = `<div class="v-wrap"><div class="v-head"><h2>Chain of Command</h2><p>From the Supreme Commander to every branch. Select an office to see who it answers to, what it commands and its ranks.</p></div><div class="v-sub">${tabs.map(([k, l]) => `<button class="v-chip${chainState.mode === k ? ' on' : ''}" onclick="chainMode('${k}')">${l}</button>`).join('')}</div><div id="chain-body"></div></div>`;
  renderChainBody();
}

const oobState = { branch: 'all', status: 'all', q: '', sort: 'name', open: new Set() };
function oobFiltered() {
  const q = oobState.q.toLowerCase();
  const list = OOB.filter(o => (oobState.branch === 'all' || o.branch === oobState.branch) && (oobState.status === 'all' || o.status === oobState.status) &&
    (!q || (o.name + ' ' + o.role + ' ' + o.base + ' ' + o.cmd + ' ' + o.comp.join(' ')).toLowerCase().includes(q)));
  const s = oobState.sort;
  return list.sort((a, b) => s === 'units' ? b.units - a.units : s === 'branch' ? a.branch.localeCompare(b.branch) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
}
function oobPaint() {
  const list = oobFiltered();
  const total = list.reduce((s, o) => s + o.units, 0);
  const byBranch = {};
  list.forEach(o => { byBranch[o.branch] = (byBranch[o.branch] || 0) + o.units; });
  const max = Math.max(1, ...Object.values(byBranch));
  const stat = STATUS_ORDER.map(s => `<div class="v-stat"><b>${list.filter(o => o.status === s).length}</b><span>${s}</span></div>`).join('');
  const bars = Object.keys(byBranch).filter(k => byBranch[k] > 0).map(k => `<div class="v-barrow"><span>${BRANCHES[k].label}</span><div class="v-bar"><i style="width:${Math.round(byBranch[k] / max * 100)}%"></i></div><em>${fmt(byBranch[k])}</em></div>`).join('');
  const cards = list.map(o => `<div class="v-card${oobState.open.has(o.id) ? ' open' : ''}" onclick="oobToggle('${o.id}')"><div class="v-ctop"><span class="v-badge b-${o.status}">${o.status}</span><span class="v-kind">${o.kind}</span></div><div class="v-ctitle">${o.name}</div><div class="v-meta">${BRANCHES[o.branch].name}</div><div class="v-row"><span>Commander</span><b>${o.cmd}</b></div><div class="v-row"><span>Strength</span><b>${o.units ? fmt(o.units) + (o.branch === 'navy' ? ' hulls' : o.branch === 'fighter' ? ' craft' : ' units') : 'Not tallied'}</b></div><div class="v-row"><span>Base</span><b>${o.base}</b></div><div class="v-more"><p class="v-p">${o.role}</p><div class="v-h">Composition</div><ul class="v-list">${o.comp.map(c => `<li>${c}</li>`).join('')}</ul><div class="v-actions"><button class="v-btn" onclick="event.stopPropagation();openBranch('${o.branch}')">Open branch record</button></div></div></div>`).join('');
  document.getElementById('oob-sum').innerHTML = `<div class="v-stats"><div class="v-stat"><b>${list.length}</b><span>Formations</span></div><div class="v-stat"><b>${fmt(total)}</b><span>Units tallied</span></div>${stat}</div><div class="v-bars">${bars}</div>`;
  document.getElementById('oob-list').innerHTML = cards || '<p class="v-p">No formations match.</p>';
  document.querySelectorAll('#oob-chips .v-chip').forEach(c => c.classList.toggle('on', c.dataset.k === oobState.branch || c.dataset.k === 's:' + oobState.status));
}
function oobSet(k, v) { oobState[k] = v; oobPaint(); }
function oobToggle(id) { oobState.open.has(id) ? oobState.open.delete(id) : oobState.open.add(id); oobPaint(); }
function renderOob(panel) {
  const keys = [...new Set(OOB.map(o => o.branch))];
  panel.innerHTML = `<div class="v-wrap"><div class="v-head"><h2>Order of Battle</h2><p>Named formations of the Confederate Provincial Authority. Working figures for 500 ABY; every formation is based on Osseriton or its concealed orbital facilities.</p></div><div class="v-tools"><input class="v-input" placeholder="Search formations, commanders, bases" value="${oobState.q}" oninput="oobSet('q',this.value)"><select class="v-input" onchange="oobSet('sort',this.value)"><option value="name">Sort: name</option><option value="units">Sort: strength</option><option value="branch">Sort: branch</option></select></div><div id="oob-chips" class="v-chips"><button class="v-chip" data-k="all" onclick="oobSet('branch','all')">All branches</button>${keys.map(k => `<button class="v-chip" data-k="${k}" onclick="oobSet('branch','${k}')">${BRANCHES[k].label}</button>`).join('')}</div><div id="oob-chips2" class="v-chips">${['all'].concat(STATUS_ORDER).map(s => `<button class="v-chip" data-k="s:${s}" onclick="oobSet('status','${s}');this.parentNode.querySelectorAll('.v-chip').forEach(c=>c.classList.toggle('on',c===this))">${s === 'all' ? 'Any status' : s}</button>`).join('')}</div><div id="oob-sum"></div><div id="oob-list" class="v-grid"></div></div>`;
  document.querySelector('#oob-chips2 .v-chip').classList.add('on');
  oobPaint();
}

const droidState = { group: 'all', branch: 'all', q: '', sort: 'name', open: new Set(), cmp: [] };
const GROUPS = ['Command', 'Infantry', 'Security', 'Special', 'Armour', 'Starfighter', 'Support'];
const METERS = [['F', 'Firepower'], ['A', 'Armour'], ['M', 'Mobility'], ['AU', 'Autonomy']];
const meter = v => `<span class="v-meter">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`;
function droidFiltered() {
  const q = droidState.q.toLowerCase(), s = droidState.sort;
  return DROIDS.filter(d => (droidState.group === 'all' || d.group === droidState.group) && (droidState.branch === 'all' || d.branches.includes(droidState.branch)) &&
    (!q || (d.name + ' ' + d.series + ' ' + d.notes + ' ' + d.armament).toLowerCase().includes(q)))
    .sort((a, b) => ['F', 'A', 'M', 'AU'].includes(s) ? b[s] - a[s] : a.name.localeCompare(b.name));
}
function droidPaint() {
  const list = droidFiltered();
  const cmp = droidState.cmp.map(id => DROIDS.find(d => d.id === id));
  document.getElementById('droid-cmp').innerHTML = cmp.length ? `<div class="v-h">Comparison (${cmp.length} of 3)</div><div class="v-scroll"><table class="v-table"><tr><th></th>${cmp.map(d => `<th>${d.name}<br><a class="v-link" onclick="droidCompare('${d.id}')">remove</a></th>`).join('')}</tr>${[['Group', 'group'], ['Series', 'series'], ['Armament', 'armament'], ['Ranks', 'ranks'], ['Certification', 'cert']].map(([l, k]) => `<tr><th>${l}</th>${cmp.map(d => `<td>${d[k]}</td>`).join('')}</tr>`).join('')}${METERS.map(([k, l]) => `<tr><th>${l}</th>${cmp.map(d => `<td>${meter(d[k])}</td>`).join('')}</tr>`).join('')}<tr><th>Branches</th>${cmp.map(d => `<td>${d.branches.map(k => BRANCHES[k] ? BRANCHES[k].label : k).join(', ')}</td>`).join('')}</tr></table></div>` : '<p class="v-note">Tick Compare on up to three droids to see them side by side.</p>';
  document.getElementById('droid-list').innerHTML = list.map(d => `<div class="v-card${droidState.open.has(d.id) ? ' open' : ''}" onclick="droidToggle('${d.id}')"><div class="v-ctop"><span class="v-badge b-g">${d.group}</span><label class="v-cmp" onclick="event.stopPropagation()"><input type="checkbox" ${droidState.cmp.includes(d.id) ? 'checked' : ''} onchange="droidCompare('${d.id}')"> Compare</label></div><div class="v-ctitle">${d.name}</div><div class="v-meta">${d.series}</div>${METERS.map(([k, l]) => `<div class="v-row"><span>${l}</span>${meter(d[k])}</div>`).join('')}<div class="v-more"><p class="v-p">${d.notes}</p><div class="v-row"><span>Armament</span><b>${d.armament}</b></div><div class="v-row"><span>Ranks held</span><b>${d.ranks}</b></div><div class="v-row"><span>Certification</span><b>${d.cert}</b></div><div class="v-h">Serves in</div><div class="v-chips">${d.branches.filter(k => BRANCHES[k]).map(k => `<button class="v-chip" onclick="event.stopPropagation();openBranch('${k}')">${BRANCHES[k].label}</button>`).join('')}</div></div></div>`).join('') || '<p class="v-p">No droids match.</p>';
  document.querySelectorAll('#droid-g .v-chip').forEach(c => c.classList.toggle('on', c.dataset.k === droidState.group));
  document.querySelectorAll('#droid-b .v-chip').forEach(c => c.classList.toggle('on', c.dataset.k === droidState.branch));
}
function droidSet(k, v) { droidState[k] = v; droidPaint(); }
function droidToggle(id) { droidState.open.has(id) ? droidState.open.delete(id) : droidState.open.add(id); droidPaint(); }
function droidCompare(id) {
  const i = droidState.cmp.indexOf(id);
  if (i >= 0) droidState.cmp.splice(i, 1); else if (droidState.cmp.length < 3) droidState.cmp.push(id);
  droidPaint();
}
function renderDroids(panel) {
  const bk = [...new Set(DROIDS.flatMap(d => d.branches).filter(k => BRANCHES[k]))];
  panel.innerHTML = `<div class="v-wrap"><div class="v-head"><h2>Droid Registry</h2><p>The droid types in Confederate service. A droid becomes a soldier through foundry activation, core certification, serial assignment, liaison pairing and a ten-year audit. Ratings are relative (1 to 5).</p></div><div class="v-tools"><input class="v-input" placeholder="Search droids, weapons, roles" value="${droidState.q}" oninput="droidSet('q',this.value)"><select class="v-input" onchange="droidSet('sort',this.value)"><option value="name">Sort: name</option><option value="F">Sort: firepower</option><option value="A">Sort: armour</option><option value="M">Sort: mobility</option><option value="AU">Sort: autonomy</option></select></div><div id="droid-g" class="v-chips"><button class="v-chip" data-k="all" onclick="droidSet('group','all')">All roles</button>${GROUPS.map(g => `<button class="v-chip" data-k="${g}" onclick="droidSet('group','${g}')">${g}</button>`).join('')}</div><div id="droid-b" class="v-chips"><button class="v-chip" data-k="all" onclick="droidSet('branch','all')">Any branch</button>${bk.map(k => `<button class="v-chip" data-k="${k}" onclick="droidSet('branch','${k}')">${BRANCHES[k].label}</button>`).join('')}</div><div id="droid-cmp"></div><div id="droid-list" class="v-grid"></div></div>`;
  droidPaint();
}
