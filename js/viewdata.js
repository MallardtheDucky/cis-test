const bn = key => ({ branch: key });

const CHAIN = {
  type: 'supreme', title: 'Supreme Commander Vexis', sub: 'Super Tactical Droid, head of state',
  desc: 'Head of state, commander of every armed service, Warden of the Provincial Constitution and final arbiter of the Charter. Holds a veto over all legislation and may dissolve the Civilian Council during a declared emergency. The office has been held without a break since 19 BBY.',
  facts: [['Appointment', 'Continuous since 19 BBY; reviewed only by the Military Senate'], ['Powers', 'Legislative veto, dissolution of the Civilian Council, final Charter interpretation, emergency powers'], ['Direct control', 'Veil Network, Droid Command Staff, Intelligence Directorate'], ['Succession', 'The Droid Command Staff nominates a replacement core from the Vexis pattern archive and the Military Senate ratifies it']],
  children: [
    { type: 'body', title: 'Military Senate', sub: 'Security legislature', desc: 'The upper house for security matters: senior officers, droid commanders and defence officials. It oversees fleet operations and emergency preparedness, confirms flag appointments and reviews the Supreme Commander\'s emergency measures.',
      facts: [['Members', 'Senior officers, droid commanders, defence officials'], ['Presiding officer', 'President of the Military Senate'], ['Powers', 'Security policy, flag confirmations, emergency review']],
      children: [
        { type: 'body', title: 'Fleet Committee', sub: 'Navy, Starfighter, Boarding', desc: 'Oversees naval policy, fleet budgets and ship construction.', leaf: true },
        { type: 'body', title: 'Ground Committee', sub: 'Army, Commando, Planetary Defense', desc: 'Oversees ground forces, fortress works and garrison policy.', leaf: true },
        { type: 'body', title: 'Droid Oversight Committee', sub: 'Droid Command, Droid Liaison', desc: 'Receives the Droid Liaison Service\'s reports and reviews learning-core certification policy.', leaf: true },
        { type: 'body', title: 'Security Committee', sub: 'Charter Guard, Security Bureau', desc: 'Oversees the Charter Guard and the Provincial Security Bureau.', leaf: true },
        { type: 'body', title: 'Intelligence Committee', sub: 'Intelligence Directorate', desc: 'Reviews intelligence budgets and audits the Intelligence Directorate. The Veil Network reports to the Supreme Commander and is not examined here.', leaf: true }
      ] },
    { type: 'body', title: 'Joint Operations Council', sub: 'Combined operations', desc: 'The only body that can order an operation across branches. No branch commander may order another branch to act.',
      facts: [['Chair', 'Supreme Commander'], ['Members', 'Fleet Admiral, Marshal, Super Tactical Droid, Defense Marshal, Corps Commandant, Director General of Intelligence'], ['Staff', 'Eight staff sections: Personnel, Intelligence, Operations, Logistics, Plans, Signals, Droid Affairs, Concealment']], leaf: true },
    { type: 'staff', title: 'Naval Staff', sub: 'Fleet Admiral', desc: 'The Navy\'s general staff. It directs the fleet, the carrier air groups, the boarding detachments and naval intelligence.',
      facts: [['Head', 'Fleet Admiral'], ['Oversight', 'Fleet Committee of the Military Senate']],
      children: [bn('navy'), bn('fighter'), bn('boarding'), bn('nint')] },
    { type: 'staff', title: 'Army General Staff', sub: 'Marshal', desc: 'The Droid Army\'s general staff. It directs army groups, corps and army intelligence.',
      facts: [['Head', 'Marshal'], ['Oversight', 'Ground Committee of the Military Senate']],
      children: [bn('army'), bn('aint')] },
    bn('commando'),
    bn('pdc'),
    { type: 'staff', title: 'Droid Command Staff', sub: 'Super Tactical Droid', desc: 'Certifies every learning core, assigns droid commanders and holds the preserved Vexis pattern archive. Every droid command above company level is paired with an organic Liaison.',
      facts: [['Head', 'Super Tactical Droid'], ['Check', 'Droid Liaison Service holds a veto on orders touching civilian life or constitutional matters']],
      children: [bn('droid'), bn('liaison')] },
    { type: 'staff', title: 'Directorate of Auxiliary Services', sub: 'Support branches', desc: 'Supplies Engineering, Logistics, Medical, R&D and Signals to every command.',
      facts: [['Oversight', 'Military Senate, with the Ministry of Resource Continuance on logistics']],
      children: [bn('eng'), bn('log'), bn('med'), bn('rnd'), bn('sig')] },
    { type: 'staff', title: 'Intelligence Directorate', sub: 'Director General', desc: 'Coordinates Naval and Army Intelligence and runs cryptology. The Veil Network reports directly to the Supreme Commander and bypasses this directorate.',
      facts: [['Head', 'Director General of Intelligence'], ['Cross-listed', 'Naval Intelligence and Army Intelligence report here as well as to their staffs']],
      children: [bn('cry'), bn('veil')] },
    bn('guard'),
    bn('psb'),
    { type: 'civil', title: 'Civil Administration', sub: 'Minister President', desc: 'The civil half of the Provincial Charter. The Minister President is a Hemes Arbora statesperson elected by the Civilian Council. The Supreme Commander\'s veto applies in security matters.',
      facts: [['Head of government', 'Minister President'], ['Ministries', 'Agriculture, Industry, Education, Justice, Health, Resource Continuance'], ['Succession', 'The Deputy Minister President acts; the Civilian Council elects a successor within sixty days']],
      children: [bn('admin'), bn('treasury'), bn('judge'), bn('const_')] },
    bn('assembly')
  ]
};

const OOB_ROWS = [
  'navy|9th Confederate Fleet|Fleet|Fleet Admiral|30|Main orbital yards|Active|Founding formation of 19 BBY and the principal strike and defence fleet.|Flagship: the first Continuance-class battlecruiser;1st, 2nd and 3rd Battle Groups;Fleet train and tenders',
  'navy|1st Battle Group|Battle group|Rear Admiral|12|Main orbital yards|Active|The striking arm of the fleet.|Two Continuance-class battlecruisers;One carrier;Eight escorts',
  'navy|2nd Battle Group|Battle group|Rear Admiral|12|Main orbital yards|Active|Screening and area-denial force.|Providence-pattern carrier-destroyers;Munificent-pattern frigates',
  'navy|3rd Battle Group|Battle group|Commodore|8|Picket line|Active|Fast reaction and picket duty.|Recusant-pattern light destroyers;Courier craft',
  'navy|Continuance Reserve Fleet|Fleet|Admiral|12|Hidden shipyards|Dark|Hulls held dark and activated only by order of the Supreme Commander.|About twelve battlecruisers in various stages of completion;Skeleton droid crews',
  'navy|Concealment Squadron|Squadron|Commodore|20|Asteroid fields|Active|Masks the system signature with pickets, decoys and mines.|Picket vessels;Sensor decoys;Mine-layers',
  'navy|Naval Training Squadron|Squadron|Captain|6|Academy anchorage|Training|Trains officers aboard obsolete hulls.|Obsolete frigates;Training carrier',
  'fighter|Carrier Air Groups|Air group|Wing Commander|216|Carrier decks|Active|One group per Continuance-class battlecruiser.|Six squadrons of 36 fighters;Deck crews',
  'fighter|Tri-Fighter Interceptor Wing|Wing|Wing Commander|108|Main carriers|Active|Fast interception and anti-boarder defence.|Three squadrons of tri-fighters',
  'fighter|Hyena Bomber Wing|Wing|Wing Commander|72|Main carriers|Active|Anti-ship strike.|Two squadrons of hyena bombers',
  'fighter|Gunship Wing|Wing|Wing Executive Officer|48|Main carriers|Active|Transport and escort for the Boarding Corps.|Droid gunships;Boarding shuttles',
  'boarding|1st Assault Brigade|Brigade|Brigadier General|6000|Orbital garrison|Active|Ship-seizure specialists.|Three assault battalions;B2 super battle droids;Droidekas;Commando cadre',
  'boarding|2nd Assault Brigade|Brigade|Brigadier General|4500|Orbital garrison|Active|Landing force for seizing ground positions.|Two assault battalions;Shuttle wing',
  'boarding|Capital Ship Detachments|Detachment|Major|120|Aboard ships|Active|A company on each Continuance-class battlecruiser and a platoon on each frigate.|Boarding company;Droideka guards;Breacher warrants',
  'army|1st Army Group (Deep Garrison)|Army group|General|250000|Underground cities|Active|Holds the underground cities.|Three corps;Regimental droid battalions;Organic officer cadre',
  'army|2nd Army Group (Mobile Reserve)|Army group|General|180000|Central plateau|Active|The counter-attack force.|Two armoured corps;AAT and Hailfire regiments',
  'army|3rd Army Group (Frontier Guard)|Army group|Lieutenant General|90000|Polar and mountain approaches|Active|Garrisons the approaches to the hidden facilities.|Fortress garrisons;Mountain regiments',
  'army|Artillery Corps|Corps|Lieutenant General|40000|Fortress batteries|Active|Heavy fire support.|Heavy artillery tracks;Rocket batteries',
  'army|Hemes Arbora Scout Regiments|Regiment|Colonel|6000|Native districts|Active|Organic light infantry from the native population, used as guides and scouts.|Three scout regiments;Local volunteers',
  'commando|Silent Strike Group|Strike group|Commando Colonel|400|Polar caverns|Active|Sabotage and decapitation raids.|BX commando droids;Organic special forces',
  'commando|Geonosian Infiltration Teams|Strike group|Commando Colonel|250|Hive district|Active|Hive-trained infiltrators.|Geonosian operatives;Support droids',
  'commando|Recovery Company|Company|Commando Captain|120|Polar caverns|Active|Extraction and hostage recovery.|Four recovery teams',
  'commando|Commando Training Battalion|Battalion|Commando Major|500|Polar caverns|Training|Runs the selection course.|Instructors;Candidates',
  'pdc|Polar Battery Complex|Sector|Defense General|0|Beneath the ice caps|Active|The heaviest orbital guns, hidden under the ice.|Orbital batteries;Shield generators;Fire-control halls',
  'pdc|Equatorial Sector|Sector|Defense Brigadier|0|Mountain fortresses|Active|Mountain fortresses and shield generators.|Fortresses;Gun batteries',
  'pdc|Orbital Shield Ring|Sector|Defense Brigadier|0|Orbital platforms|Active|Concealed orbital platforms.|Shield platforms;Sensor pickets',
  'pdc|Sensor-Masking Arrays|Station group|Fortress Commandant|0|Mountain ranges|Active|Keeps Osseriton invisible to outside sensors.|Masking arrays;Watch stations',
  'droid|Droid Command Staff|Staff|Super Tactical Droid|0|Central command|Active|Certifies cores and assigns droid commanders.|Tactical Droid Prime Council;Certification boards',
  'droid|Vexis Pattern Archive|Facility|Tactical Droid Prime|0|Deep vault|Dark|Preserves the neural patterns from which new commanders could be built.|Pattern vault;Core fabrication line',
  'droid|Droid Core Audit Board|Board|Strategic Command Droid|0|Central command|Active|Audits learning cores every ten years.|Audit teams;Retraining wards',
  'guard|MagnaGuard Order|Order|Guard General|600|Capital district|Active|The droid bodyguard force.|MagnaGuard detachments;Electrostave drill teams',
  'guard|Court and Assembly Details|Detail|Guard Colonel|300|Assembly Hall and Court|Active|Protects the Assembly and the Constitutional Court.|Guardsmen;MagnaGuard posts',
  'guard|Supreme Commander\'s Detail|Detail|Guard Brigadier|150|Office of the Supreme Commander|Active|Close protection and access control.|MagnaGuards;Security droids',
  'nint|Naval Intelligence Directorate|Directorate|Director General|0|Fleet staffs|Active|Fleet reconnaissance and counter-espionage.|Intelligence stations on every fleet staff;The Fleet Tracking Archive',
  'aint|Army Intelligence Directorate|Directorate|Director General|0|Corps staffs|Active|Battlefield intelligence and loyalty audit.|Theatre stations;Mapping office;Interrogation service',
  'cry|Cryptology Bureau|Bureau|Director of Cryptology|0|Intercept stations|Active|Breaks foreign ciphers and secures Confederate traffic.|Intercept stations;Key Production Facility;Traffic Archive',
  'veil|Veil Network|Network|Veilmaster|0|Wider galaxy|Active|Foreign intelligence; withdrawn during the Yuuzhan Vong war and redeployed after 30 ABY.|Regional stations;Courier fleet;Dead-Drop Archive',
  'psb|Provincial Security Bureau|Bureau|Director General|0|Civil districts|Active|Internal security and vetting.|District offices;Vetting Office;Surveillance Division',
  'eng|Deep Works|Division|Director of Works|0|Underground cities|Active|Excavation and construction of the cities.|Excavator droids;Hive engineers',
  'eng|Power Grid Authority|Division|Director of Works|0|Power plants|Active|Runs the planetary power grid and shield power.|Power plants;Grid droids',
  'log|Strategic Reserve Vaults|Division|Director of Supply|0|Deep vaults|Active|Holds centuries of stockpiled material.|Vault complexes;Audit teams',
  'log|Foundry Complexes|Division|Director of Foundries|0|Industrial districts|Active|Self-replicating droid foundries.|Droid foundries;Ship component plants',
  'med|Droid Repair Wards|Division|Medical Director|0|Fleet and army bases|Active|Repairs droids alongside organic casualty care.|Repair wards;Medical droids',
  'rnd|Droid Core Laboratory|Division|Director of Research|0|Secure laboratories|Active|Develops and tests droid learning cores.|Laboratories;Test ranges',
  'sig|Relay Station Network|Division|Chief Signals Officer|0|Relay stations|Active|Secure networks and emission control.|Relays;Key Management Office'
];

const OOB = OOB_ROWS.map((r, i) => {
  const [branch, name, kind, cmd, units, base, status, role, comp] = r.split('|');
  return { id: 'o' + i, branch, name, kind, cmd, units: +units, base, status, role, comp: comp.split(';') };
});

const DROID_ROWS = [
  'st|Super Tactical Droid|ST series|Command|droid,army,navy|FO-5 to FO-1|2,3,2,5|Command suite and sidearm|State and theatre command. The design preserves the strategic intuition of Admiral Trench; Vexis is the surviving original and no new unit may be built without the Military Senate\'s ratification.|Highest',
  'ta|Tactical Droid|TA series|Command|droid,army,navy|FO-4 to FO-3|1,2,2,5|Command suite|Fleet, army group and directorate command. Sits at the tactical station of every major hull and on corps staffs.|High',
  'oom|Command Droid|OOM series|Command|droid,army,navy,boarding|SO-3 to JO-3|2,2,3,4|Blaster, command suite|The workhorse of the droid officer corps. Commands battalions, companies and ship droid complements.|High',
  'scd|Strategic Command Droid|Staff unit|Command|droid|FO-2 to FO-1|1,1,1,5|None|Staff planning unit. Models campaigns and logistics; has no combat command.|High',
  'b1|B1 battle droid|B1 series|Infantry|army,boarding,pdc|E-1 to JNCO-3|2,1,3,2|Blaster rifle|Line infantry, the mass of the Army and the garrison force. Many carry locked skill cores for specific posts.|Standard',
  'sec|Security droid|B1 variant|Security|psb,const_|E-2 to JNCO-3|2,1,3,2|Stun and blaster|A B1 variant with a policing skill set, assigned to the Constabulary and the Bureau under organic supervision.|Standard',
  'b2|B2 super battle droid|B2 series|Infantry|army,boarding|E-2 to JNCO-2|4,4,2,2|Wrist blasters, rocket|Heavy infantry and boarding. Armoured chassis with an integrated blaster.|Standard',
  'dk|Droideka|Destroyer droid|Infantry|army,boarding,pdc|E-2 to JNCO-3|5,5,3,2|Twin blaster cannons, deflector shield|Rolling shielded defender used at fortress doors, corridors and ship compartments.|Standard',
  'bx|BX commando droid|BX series|Special|commando|E-3 to SNCO-1|4,3,4,4|Blaster, vibroblade|Adaptive core with close-combat and stealth skills. Works in mixed teams with organic commandos.|Advanced',
  'mg|MagnaGuard|Guard pattern|Security|guard|E-3 to SNCO-1|3,4,4,4|Electrostave|Charter Guard bodyguard with an electrostave drill and a reflex core.|Advanced',
  'aat|AAT|Armoured assault tank|Armour|army|Crewed by droid units|5,5,2,1|Heavy cannon, mortars|Main battle armour of the Mobile Reserve.|Standard',
  'hf|Hailfire droid|Rocket artillery|Armour|army|Crewed by droid units|5,3,3,1|Guided rocket pods|Rocket artillery on a wheel pair, used for area saturation.|Standard',
  'sp|Dwarf spider droid|Walker|Armour|army,pdc|Crewed by droid units|4,4,2,1|Cannon, point-defence|Heavy fire support and fortress defence.|Standard',
  'vd|Vulture droid|Droid starfighter|Starfighter|fighter|Flown by droid brain|3,2,5,3|Blasters, torpedoes|Standard droid starfighter; folds into a walker mode on a carrier deck.|Standard',
  'tf|Tri-fighter|Droid interceptor|Starfighter|fighter|Flown by droid brain|3,2,5,3|Blasters, seeker missiles|Fast interceptor with a brain adapted for dogfighting.|Standard',
  'hb|Hyena bomber|Droid bomber|Starfighter|fighter|Flown by droid brain|4,2,4,3|Bombs, torpedoes|Anti-ship bomber carried on the Starfighter Corps carriers.|Standard',
  'gs|Droid gunship|Assault craft|Starfighter|fighter,boarding|Crewed by droid units|4,3,3,2|Missiles, cannons|Transports and escorts boarding and landing forces.|Standard',
  'pit|Worker droid|Work droid|Support|eng,log|E-1 to E-3|1,1,2,1|None|Hull repair, construction and power plant maintenance.|Basic',
  'med|Medical droid|Medical series|Support|med|E-2 to SNCO-1|1,1,2,3|Medical tools|Surgical and repair work in the Droid Repair Wards and ship sick bays.|Advanced',
  'prot|Protocol droid|Protocol series|Support|liaison,treasury,judge,assembly|E-3 to JNCO-3|1,1,2,4|None|Liaison and translation units for the Treasury, Judiciary and Assembly offices.|Advanced',
  'load|Cargo loader|Loader series|Support|log|E-1 to E-3|1,2,2,1|None|Moves cargo through depots, foundries and convoy staging.|Basic'
];

const DROIDS = DROID_ROWS.map(r => {
  const [id, name, series, group, branches, ranks, meters, armament, notes, cert] = r.split('|');
  const [F, A, M, AU] = meters.split(',').map(Number);
  return { id, name, series, group, branches: branches.split(','), ranks, F, A, M, AU, armament, notes, cert };
});

const PROCEDURES = [
  { title: 'How an order moves', open: true, html: '<ol><li>The Supreme Commander or a branch commander issues an order.</li><li>The relevant staff drafts it and the Droid Affairs section checks it for droid authority.</li><li>The Liaison reviews it for Charter compliance. A veto returns it to the issuer.</li><li>Signals encrypts it and sends it only on an approved channel.</li><li>Each echelon repeats the order downward and reports back. An echelon may ask for clarification but may not delay a lawful order.</li><li>The Provincial Security Bureau audits a sample of orders each quarter.</li></ol>' },
  { title: 'Readiness conditions', html: '<table class="v-table"><tr><th>Condition</th><th>Meaning</th><th>Authority</th></tr><tr><td>Veil</td><td>Normal. All forces dark, concealment first.</td><td>Standing</td></tr><tr><td>Grey</td><td>Elevated. Sensor watch doubled, reserve hulls fuelled.</td><td>Joint Operations Council</td></tr><tr><td>Iron</td><td>Alert. Fleet and batteries armed, droid garrisons activated.</td><td>Supreme Commander</td></tr><tr><td>Charter</td><td>Declared emergency. The Military Senate gains legislative priority and the Charter Guard takes custody of the constitutional offices.</td><td>Supreme Commander</td></tr></table>' },
  { title: 'Droid and organic pairing', html: '<ul><li>Every droid command above company level is paired with an organic Liaison from the Droid Liaison Service.</li><li>The Liaison holds a veto on orders that touch civilian life or constitutional matters.</li><li>Droid and organic personnel share rank titles and the same insignia.</li><li>A droid may outrank an organic officer but may not issue a lawful order the Liaison has vetoed.</li><li>Learning cores are audited every ten years of service.</li></ul>' },
  { title: 'Staff sections', html: '<ul><li>Personnel: manpower, promotion and discipline</li><li>Intelligence: threat picture and counter-espionage</li><li>Operations: current plans and orders</li><li>Logistics: supply, foundries and transport</li><li>Plans: long-range plans and contingencies</li><li>Signals: communications and emission control</li><li>Droid Affairs: certification and liaison audits</li><li>Concealment: keeping Osseriton hidden</li></ul>' },
  { title: 'Discipline and justice', html: '<ul><li>Minor discipline: the unit commander, with appeal to the next echelon.</li><li>Serious military offences: military tribunals of the Constitutional Judiciary.</li><li>Civil offences by personnel: civil courts, with a military observer.</li><li>Offences against the Charter or the concealment: the Provincial Security Bureau and a special tribunal.</li><li>Droid units: a core audit board, which may retrain, restrict or decommission.</li></ul>' },
  { title: 'Promotion pathways', html: '<ul><li>Enlisted to NCO: unit board and leadership course.</li><li>NCO to warrant: technical board and trade certification.</li><li>NCO or warrant to officer: commission examination and academy.</li><li>Junior officer to senior officer: staff college and a command qualification.</li><li>Senior officer to flag: nomination by the branch commander, ratified by the Military Senate and confirmed by the Supreme Commander.</li><li>Droid units: certification and core audits replace service time.</li></ul>' },
  { title: 'Clearance levels', html: '<table class="v-table"><tr><th>Level</th><th>Access</th></tr><tr><td>LVL-4 Restricted</td><td>All personnel data</td></tr><tr><td>LVL-5 Flag</td><td>Flag-grade dossiers</td></tr><tr><td>LVL-6 Sealed</td><td>The Veil Network</td></tr><tr><td>LVL-7 Sealed</td><td>Office of the Supreme Commander</td></tr></table>' },
  { title: 'Succession and emergency', html: '<ul><li>The Supreme Commander\'s office has no organic successor. If the unit fails, the Droid Command Staff nominates a replacement core from the Vexis pattern archive and the Military Senate ratifies it.</li><li>In a declared security emergency the Military Senate gains legislative priority, the Civilian Council may be dissolved and the Charter Guard takes custody of the constitutional offices.</li><li>If the Minister President dies or is removed, the Deputy Minister President acts until the Civilian Council elects a successor within sixty days.</li></ul>' }
];
