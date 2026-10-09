const grpOf = t => t.startsWith('FO') ? 'FO' : t.startsWith('SO') ? 'SO' : t.startsWith('JO') ? 'JO' : t.startsWith('MID') ? 'MID'
  : t.startsWith('WO') ? 'WO' : t.startsWith('SNCO') ? 'SNCO' : t.startsWith('JNCO') ? 'JNCO' : 'E';
const GROUP_NAME = { FO:'FLAG AUTHORITY', SO:'SENIOR OFFICER', JO:'JUNIOR OFFICER', MID:'CADET OFFICER', WO:'WARRANT OFFICER', SNCO:'SENIOR NCO', JNCO:'JUNIOR NCO', E:'ENLISTED' };
const POST_KEY = { FO:'FO', SO:'SO', JO:'JO', MID:'MID', WO:'WO', SNCO:'NCO', JNCO:'NCO', E:'E' };

const LEVEL = {
  'FO-5':'Apex of the branch below the Supreme Commander. Sets doctrine, defends the branch before the Military Senate and advises the Supreme Commander in person.',
  'FO-4':'Senior flag grade. Commands the branch\'s main formation or a primary directorate and deputises for the apex officer.',
  'FO-3':'Strategic flag grade. Commands a major theatre, fleet or directorate and sits on the branch\'s high council.',
  'FO-2':'Operational flag grade. Runs the major subdivisions of the branch and chairs planning boards.',
  'FO-1':'Junior flag grade. First rank with a seat at flag council; commands a task force, division or department.',
  'SO-3':'Senior command grade. Controls a major formation or section and signs off tactical planning for the whole unit.',
  'SO-2':'Executive grade. Deputy to the senior officer; runs day-to-day operations of the formation.',
  'SO-1':'Entry senior grade. First rank trusted with independent command of a substantial unit.',
  'JO-4':'Senior junior grade. Experienced officer commanding a company-sized unit or a major section.',
  'JO-3':'Section leader. Often serves as a unit\'s operations officer and mentors the grades beneath.',
  'JO-2':'Standard line officer. Carries the working weight of the branch at section and squad level.',
  'JO-1':'Entry commissioned grade. Newly commissioned, under close supervision, finishing branch qualification.',
  'MID-1':'Officer cadet grade. Serves a supervised probationary tour while completing officer training.',
  'WO-4':'Master technical authority of the branch. Consulted by flag officers; commands no line unit.',
  'WO-3':'Senior technical authority. Final word on specialist matters within a major formation.',
  'WO-2':'Experienced technical specialist. Leads technical sections and trains junior specialists.',
  'WO-1':'Entry technical grade. Appointed from the NCO ranks for proven specialist skill.',
  'SNCO-3A':'Highest enlisted grade of the branch. Principal adviser to the apex officer on rank-and-file welfare and conduct.',
  'SNCO-3':'Command senior enlisted. Adviser to a formation commander on discipline and standards.',
  'SNCO-2A':'Company-level senior NCO. Runs the day-to-day administration of a unit and its junior NCOs.',
  'SNCO-2':'Senior NCO. Supervises junior NCOs across a department or platoon group.',
  'SNCO-1':'Entry senior NCO. Manages a platoon-sized body of personnel.',
  'JNCO-3':'Senior junior NCO. Leads a section and answers for its performance.',
  'JNCO-2':'Standard junior NCO. Leads small teams and enforces unit standards.',
  'JNCO-1':'Entry NCO grade. Freshly promoted; learning to lead rather than simply perform.',
  'E-3':'Experienced enlisted. Proven performer, informal leader of the work group and a candidate for NCO selection.',
  'E-2':'Standard enlisted. Completed initial training and holds a full qualified post.',
  'E-1':'Entry enlisted. Newly arrived from basic training and assigned to supervised duties.'
};

const REQ_MIL = {
  FO:'Appointed by the Supreme Commander on confirmation by the Military Senate.',
  SO:'Selected by a promotion board after command-qualification and staff college.',
  JO:'Promotion by time in grade, fitness reports and a qualification examination.',
  MID:'Entry by commission examination or direct appointment from cadet school.',
  WO:'Appointed from the NCO ranks after a technical board and trade certification.',
  SNCO:'Selected by an enlisted promotion board on recommendation of unit commanders.',
  JNCO:'Promoted from the enlisted ranks after leadership course and unit recommendation.',
  E:'Advancement by time in service, training completion and performance reports.'
};
const REQ_CIVIL = {
  FO:'Appointed or elected under the Provincial Charter and confirmed by the relevant chamber.',
  SO:'Appointed by the Minister President or senior officer after competitive examination.',
  JO:'Promoted by merit review and examination within the civil service.',
  MID:'Entered through the civil academy or by direct appointment.',
  WO:'Appointed from senior staff after a professional certification.',
  SNCO:'Promoted on seniority and merit review.', JNCO:'Promoted on merit review.', E:'Entered by examination and probation.'
};
const CIVIL_FAMS = ['civil', 'police'];

const DROID_NOTE = {
  FO:'Droid flag officers are certified by the Supreme Commander and hold the same authority as organic officers of equal grade.',
  SO:'Droid command units may hold this grade. They are addressed by unit designation followed by rank.',
  JO:'Droid officers at this grade operate under supervised heuristic limits and carry a designation tag.',
  MID:'Cadet droid units are commissioned through a probationary software audit before full grade.',
  WO:'Many technical warrants are held by droid specialists with locked, certified skill cores.',
  SNCO:'Senior droid NCOs are specially trained discipline units, often assigned as unit sergeants.',
  JNCO:'Droid NCOs lead standard droid squads and are paired with an organic NCO where available.',
  E:'Standard droid units serve at this grade and are identified by serial designation and unit marking.'
};

const SPECIAL = {
  'Fleet Admiral':'Commander of the whole Navy. Acts as the Supreme Commander\'s principal naval adviser and sits permanently on the Military Senate.',
  'Marshal':'Commander of the whole Droid Army. Directs the General Staff and is the Supreme Commander\'s principal adviser on land warfare.',
  'Admiral':'Commands a main fleet or a major directorate of the Naval Staff and holds a seat on the Military Senate.',
  'General':'Commands an army group or a major directorate of the General Staff and holds a seat on the Military Senate.',
  'Director General':'Head of an intelligence service. Briefs the Supreme Commander directly and authorises operations without consulting line commands.',
  'Director':'Heads an intelligence directorate or a major division. Authorises field operations and signs warrants within the branch.',
  'Veilmaster':'Head of the Veil Network. Alone knows every station and cut-out and briefs the Supreme Commander in private. The holder\'s identity is not recorded outside the Network.',
  'Minister President':'Head of Government. Elected by the Civilian Council, leads the civil ministries but cannot override the Supreme Commander\'s constitutional veto.',
  'Chief Justice':'Senior judge of the Constitutional Court. Rules on civil and administrative matters, bound by the Supreme Commander\'s final interpretation of the Charter.',
  'Speaker of the Assembly':'Presides over joint sessions of the Provincial Assembly and signs legislation for presentation to the Supreme Commander.',
  'President of the Military Senate':'Presides over the Military Senate, which oversees security policy, fleet operations and emergency preparedness.',
  'Super Tactical Droid':'The apex droid commission. Super Tactical Droids command at theatre level and are certified directly by the Supreme Commander.',
  'Commodore':'Commands a squadron or task force of capital ships and may be given acting flag authority in the absence of a senior admiral.',
  'Midshipman':'The entry officer grade of the Navy. Midshipmen serve rotating postings aboard capital ships while completing their commission qualifications.',
  'Contact (Asset)':'Not a member of the Network. Contacts are paid or persuaded sources who provide information without knowing who ultimately receives it.',
  'Air Marshal':'Commands the entire fighter and bomber arm of a carrier fleet and sets its tactical doctrine.',
  'Commandant of the Guard':'Commands the Charter Guard and answers for the physical safety of every constitutional officeholder.',
  'Surgeon General':'Senior medical officer of the Confederacy. Sets medical policy for the armed forces and advises the Ministry of Health.',
  'Quartermaster General':'Senior logistics officer. Controls the distribution of the state\'s strategic reserves in coordination with the Ministry of Resource Continuance.',
  'Chief Scientist':'Directs the Research and Development Bureau and reports on every programme to the Supreme Commander.',
  'Corps Marshal':'Commands the Boarding & Assault Corps, the droid-heavy ship-seizure arm that serves in place of a Marine service.',
  'Treasurer General':'Heads the Treasury & Audit Bureau, issues the Confederate Credit and audits every branch.',
  'Chief of Liaison':'Heads the Droid Liaison Service and reports to the Military Senate\'s Droid Oversight Committee.',
  'Commissioner':'Head of the Civil Constabulary. Appointed by the Minister President and responsible to the Ministry of Justice.'
};

function addressFor(branchKey, tier) {
  const b = BRANCHES[branchKey], rank = b.ranks[TIERS.indexOf(tier)], g = grpOf(tier);
  if (branchKey === 'veil') return 'By cover name only. Never by rank.';
  if (b.fam === 'droid' && branchKey === 'droid') return `${rank}, by serial designation (e.g. "${rank.split(' ')[0]} TX-0412")`;
  if (g === 'FO' || g === 'SO') return `${rank}, Sir/Ma'am`;
  if (g === 'JO' || g === 'MID') return `${rank.split(',')[0]}, Sir/Ma'am`;
  return rank;
}

function describeRank(branchKey, tier) {
  const b = BRANCHES[branchKey], idx = TIERS.indexOf(tier), rank = b.ranks[idx], g = grpOf(tier);
  const civil = CIVIL_FAMS.includes(b.fam), pk = POST_KEY[g];
  let o = `OFFICIAL PROVINCIAL PERSONNEL DATA RECORD\nRANK: ${rank.toUpperCase()} | BRANCH: ${b.name.toUpperCase()} | TIER: ${tier}\n\n`;
  o += `${b.name.toUpperCase()}\n${b.intro}\n\nMISSION: ${b.mission}\nCHAIN OF COMMAND: ${b.chain}\nREPORTS TO: ${b.reports}\n\n`;
  o += `${GROUP_NAME[g]} [${tier}]\n`;
  if (SPECIAL[rank]) o += SPECIAL[rank] + '\n\n';
  o += LEVEL[tier] + '\n\n';
  if (b.posts[pk]) o += `TYPICAL POSTING: ${b.posts[pk]}\n\n`;
  const sup = above0(b, idx);
  o += `POSITION IN THE CHAIN:\n • Answers to: ${sup ? sup + ' of the ' + b.name : 'the branch\'s reporting authority (' + b.reports + ')'}\n • Branch line: ${b.chain}\n`;
  const eq = equivalents(branchKey, idx);
  if (eq.length) o += ` • Equivalent grades elsewhere: ${eq.join('; ')}\n`;
  o += '\n';
  const units = unitsFor(b, pk);
  if (units.length) o += `UNITS AT THIS LEVEL:\n` + units.map(u => ` • ${u}`).join('\n') + '\n\n';
  o += `CORE DUTIES:\n` + b.duties.map(d => ` • ${d}`).join('\n') + '\n\n';
  const above = b.ranks.slice(0, idx).reverse().find(r => r !== '-'), below = b.ranks.slice(idx + 1).find(r => r !== '-');
  o += `ADVANCEMENT:\n${(civil ? REQ_CIVIL : REQ_MIL)[g]}\n`;
  o += `${above ? 'Next grade: ' + above + '.' : 'This is the highest rank of the branch.'} ${below ? 'Subordinate grade: ' + below + '.' : 'This is the entry grade of the branch.'}\n\n`;
  if (!civil) o += `DROID AND ORGANIC PERSONNEL:\n${DROID_NOTE[g]}\n\n`;
  if (b.traditions) o += `TRADITIONS:\n${b.traditions}\n\n`;
  o += `INSIGNIA:\n${FAMILIES[b.fam].note}`;
  return o;
}

function above0(b, idx) { const r = b.ranks.slice(0, idx).reverse().find(x => x !== '-'); return r || null; }
function equivalents(branchKey, idx) {
  const out = [];
  Object.keys(BRANCHES).forEach(k => { if (k === branchKey) return; const r = BRANCHES[k].ranks[idx]; if (r && r !== '-' && BRANCHES[k].tab === BRANCHES[branchKey].tab) out.push(`${r} (${BRANCHES[k].label})`); });
  return out;
}
function unitsFor(b, key) { return (b.formations || []).filter(f => f.startsWith(key + '|')).map(f => f.slice(key.length + 1)); }
const UNIT_LABEL = { FO:'FLAG LEVEL', SO:'SENIOR OFFICER LEVEL', MID:'CADET LEVEL', JO:'JUNIOR OFFICER LEVEL', WO:'WARRANT LEVEL', NCO:'NCO LEVEL', E:'ENLISTED LEVEL' };

function describeBranch(branchKey) {
  const b = BRANCHES[branchKey], held = b.ranks.filter(r => r !== '-');
  let o = `OFFICIAL PROVINCIAL BRANCH RECORD\nBRANCH: ${b.name.toUpperCase()} | RANKS: ${held.length}\n\n`;
  o += `OVERVIEW\n${b.intro}\n\nHERITAGE\n${b.heritage}\n\nMISSION\n${b.mission}\n\nORGANIZATION\n${b.org}\n\nCHAIN OF COMMAND\n${b.chain}\n\nREPORTS TO\n${b.reports}\n\n`;
  o += `FORMATIONS, TOP TO BOTTOM:\n` + ['FO','SO','JO','MID','WO','NCO','E'].filter(k => unitsFor(b, k).length).map(k => `[${UNIT_LABEL[k]}]\n` + unitsFor(b, k).map(u => ` • ${u}`).join('\n')).join('\n') + '\n\n';
  o += `EQUIPMENT AND ASSETS\n${b.assets}\n\n`;
  if (b.doctrine) o += `DOCTRINE\n${b.doctrine}\n\nTRAINING\n${b.training}\n\nNOTABLE UNITS AND OFFICES\n${b.notable}\n\nTRADITIONS\n${b.traditions}\n\n`;
  o += `CORE DUTIES:\n` + b.duties.map(d => ` • ${d}`).join('\n') + '\n\n';
  o += `RANK RANGE\nHighest: ${held[0]}\nEntry: ${held[held.length - 1]}\n\nINSIGNIA\n${FAMILIES[b.fam].note}`;
  return o;
}

const SUPREME_TEXT = `OFFICIAL PROVINCIAL PERSONNEL DATA RECORD
RANK: SUPREME COMMANDER | OFFICE: OFFICE OF THE SUPREME COMMANDER | TIER: FO-6

SUPREME AUTHORITY
The Supreme Commander is head of state, commander of all armed forces, Warden of the Provincial Constitution and final authority on emergency powers. There is no equal grade in any branch: every uniformed and civil rank stands beneath this office.

CONSTITUTIONAL POWERS:
 • Veto over all legislation passed by the Provincial Assembly
 • Power to dissolve the Civilian Council during a declared emergency
 • Final interpretation of the Provincial Charter
 • Direct control of foreign intelligence and the Veil Network

ADVANCEMENT:
No promotion exists above this office. Appointment is continuous and is reviewed only by the Military Senate in accordance with the Charter.

DROID AND ORGANIC PERSONNEL:
The office is held by a droid guardian and is not open to organic or standard droid personnel.

INSIGNIA:
Two rows of six triangles, gold over red, beside the white hexagon of the Confederacy. Reserved for the office alone.`;

const APEXES = () => Object.keys(BRANCHES).map(k => { const b = BRANCHES[k], held = b.ranks.filter(r => r !== '-'); return ` • ${b.name}: ${held[0]} (reports to ${b.reports.replace(/\.$/, '')})`; }).join('\n');

const CHAIN_TEXT_BASE = `CONFEDERATE CHAIN OF COMMAND: FULL OVERVIEW

PART 1. SUPREME AUTHORITY
Supreme Commander Vexis (Super Tactical Droid), Warden of the Provincial Constitution. Head of state, commander of every armed service, final arbiter of the Charter and senior authority over emergency powers.
 • Holds a veto over all legislation and may dissolve the Civilian Council during a declared emergency.
 • Commands through the Office of the Supreme Commander: the Joint Operations Council, the Droid Command Staff, the Intelligence Directorate and the Veil Network.
 • Orders pass down the chain; any officer may be overruled only by an officer above them in their own branch line or by the Supreme Commander.

PART 2. THE MILITARY SENATE
Senior officers, droid commanders and defence officials. It oversees security policy, fleet operations and emergency preparedness, confirms flag appointments and reviews the Supreme Commander's emergency measures. Standing committees:
 • Fleet Committee (Navy, Starfighter, Boarding)
 • Ground Committee (Army, Commando, Planetary Defense)
 • Droid Oversight Committee (Droid Command, Droid Liaison)
 • Security Committee (Charter Guard, Security Bureau)
 • Intelligence Committee (Intelligence Directorate, Veil audit line)

PART 3. THE JOINT OPERATIONS COUNCIL
Chaired by the Supreme Commander, with the Fleet Admiral, the Marshal, the Super Tactical Droid of the Droid Command Staff, the Defense Marshal, the Corps Commandant of the Commando Corps and the Director General of Intelligence. It is the only body that can order a combined operation across branches. No single branch commander may order another branch to act.

PART 4. THE COMMAND LINES
1. Fleet line: Supreme Commander, Fleet Admiral, Fleet, Battle group, Ship. The Starfighter Corps attaches an air group to each carrier; the Boarding Corps attaches a detachment to each capital ship; Naval Intelligence places a desk on each fleet staff.
2. Ground line: Supreme Commander, Marshal, Army group, Corps, Division, Regiment, Battalion, Company, Platoon, Squad.
3. Special line: Supreme Commander, Corps Commandant, Commando brigade, strike group, team. The Commando Corps never sits inside an army corps.
4. Defence line: Supreme Commander, Defense Marshal, defence sector, fortress, battery. Planetary Defense Command takes orders from the Army and Naval Staffs jointly, and neither can countermand the other.
5. Droid line: Supreme Commander, Super Tactical Droid, theatre or fleet droid command, battalion, company, squad. Droid commands are attached to branches but certified by the Droid Command Staff.
6. Support line: the Directorate of Auxiliary Services, which supplies Engineering, Logistics, Medical, R&D and Signals to every command.
7. Intelligence line: Supreme Commander, Director General, Naval and Army Intelligence, Cryptology and the Veil Network. The Veilmaster reports directly to the Supreme Commander and bypasses the Directorate.
8. Protective line: Charter Guard to the Military Senate's Security Committee. It is the only force allowed to carry arms inside the Assembly and the Court.

PART 5. DROID AND ORGANIC PAIRING
 • Every droid command above company level is paired with an organic Liaison officer from the Droid Liaison Service. The Liaison holds a veto on orders that touch civilian life or constitutional matters.
 • Droid and organic personnel share rank titles and the same insignia. Droids are addressed by serial and rank; organic personnel by rank alone.
 • A droid may outrank an organic officer. A droid may not give a lawful order that the Liaison has vetoed.
 • Learning cores are certified by the Droid Command Staff and audited every ten years of service.

PART 6. THE CIVIL CHAIN
 • Minister President (head of government), elected by the Civilian Council from among the Hemes Arbora and descendant communities.
 • Cabinet ministries: Agriculture, Industry, Education, Justice, Health and Resource Continuance, each with departments and district offices.
 • Treasury & Audit Bureau, Constitutional Judiciary and the Civil Constabulary answer to the Minister President and the courts.
 • The Provincial Security Bureau answers to the Military Senate and, constitutionally, to the Supreme Commander. It may investigate a civil servant but may not arrest a Cabinet Minister without a Judiciary warrant.

PART 7. CLEARANCE LEVELS
 LVL-4 Restricted: all personnel data. LVL-5 Flag: flag-grade dossiers. LVL-6 Sealed: the Veil Network. LVL-7 Sealed: the Office of the Supreme Commander.

PART 8. SUCCESSION AND EMERGENCY
 • The Supreme Commander's office has no successor in organic hands. If the unit fails, the Droid Command Staff nominates a replacement core from the Vexis pattern archive and the Military Senate ratifies it.
 • In a declared security emergency the Military Senate gains legislative priority, the Civilian Council may be dissolved and the Charter Guard takes custody of the constitutional offices.
 • If the Minister President dies or is removed, the Deputy Minister President acts until the Civilian Council elects a successor within sixty days.

PART 9. RANK GRADES AND EQUIVALENCE
 • Tiers FO-5 to FO-1 are flag grade, SO-3 to SO-1 senior officers, JO-4 to JO-1 junior officers, MID-1 cadet officers, WO-4 to WO-1 warrants, SNCO and JNCO the non-commissioned grades, E-3 to E-1 enlisted.
 • The same tier is equal in rank across branches. A Vice Admiral, a Lieutenant General and an Assault General hold equal grade (FO-3). Authority is limited to one's own branch line unless a Joint Operations Council order says otherwise.
 • Click any rank in a tab to see its tier equivalents across the other branches.

PART 10. BRANCH APEX OFFICES
`;
const CHAIN_TEXT = CHAIN_TEXT_BASE + APEXES() + `

PART 11. DOCTRINE NOTES
 • No Marines exist. The Boarding & Assault Corps keeps the Separatist droid boarding tradition instead.
 • Ranks follow Separatist usage: Admirals in the Navy, Generals in the Army, Commanders and Captains below them, with Super Tactical Droids, Tactical Droids and Command Droids as the droid command line.
 • No branch speaks to outside powers. The Veil Network is the only service that operates beyond Osseriton.`;
