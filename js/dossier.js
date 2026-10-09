/* Dossier text generation: builds the long description for each rank and branch */

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
  'Field Marshal':'Commander of the whole Ground Army. Directs the General Staff and is the Supreme Commander\'s principal adviser on land warfare.',
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
  'Wing Marshal':'Commands the entire fighter and bomber arm of a carrier fleet and sets its tactical doctrine.',
  'Commandant of the Guard':'Commands the Charter Guard and answers for the physical safety of every constitutional officeholder.',
  'Surgeon General':'Senior medical officer of the Confederacy. Sets medical policy for the armed forces and advises the Ministry of Health.',
  'Quartermaster General':'Senior logistics officer. Controls the distribution of the state\'s strategic reserves in coordination with the Ministry of Resource Continuance.',
  'Chief Scientist':'Directs the Research and Development Bureau and reports on every programme to the Supreme Commander.',
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
  let o = `OFFICIAL PROVINCIAL PERSONNEL DATA RECORD\nRANK: ${rank.toUpperCase()} | BRANCH: ${b.name.toUpperCase()} | TIER: ${tier}\n${'─'.repeat(52)}\n\n`;
  o += `${b.name.toUpperCase()}\n${b.intro}\n\nMISSION: ${b.mission}\nREPORTS TO: ${b.reports}\n\n`;
  o += `${GROUP_NAME[g]} [${tier}]\n`;
  if (SPECIAL[rank]) o += SPECIAL[rank] + '\n\n';
  o += LEVEL[tier] + '\n\n';
  if (b.posts[pk]) o += `TYPICAL POSTING: ${b.posts[pk]}\n\n`;
  o += `CORE DUTIES:\n` + b.duties.map(d => ` • ${d}`).join('\n') + '\n\n';
  const above = b.ranks.slice(0, idx).reverse().find(r => r !== '-'), below = b.ranks.slice(idx + 1).find(r => r !== '-');
  o += `ADVANCEMENT:\n${(civil ? REQ_CIVIL : REQ_MIL)[g]}\n`;
  o += `${above ? 'Next grade: ' + above + '.' : 'This is the highest rank of the branch.'} ${below ? 'Subordinate grade: ' + below + '.' : 'This is the entry grade of the branch.'}\n\n`;
  if (!civil) o += `DROID AND ORGANIC PERSONNEL:\n${DROID_NOTE[g]}\n\n`;
  o += `INSIGNIA:\n${FAMILIES[b.fam].note}`;
  return o;
}

function describeBranch(branchKey) {
  const b = BRANCHES[branchKey], held = b.ranks.filter(r => r !== '-');
  let o = `OFFICIAL PROVINCIAL BRANCH RECORD\nBRANCH: ${b.name.toUpperCase()} | RANKS: ${held.length}\n${'─'.repeat(52)}\n\n`;
  o += `OVERVIEW\n${b.intro}\n\nMISSION\n${b.mission}\n\nORGANIZATION\n${b.org}\n\nREPORTS TO\n${b.reports}\n\n`;
  o += `CORE DUTIES:\n` + b.duties.map(d => ` • ${d}`).join('\n') + '\n\n';
  o += `RANK RANGE\nHighest: ${held[0]}\nEntry: ${held[held.length - 1]}\n\nINSIGNIA\n${FAMILIES[b.fam].note}`;
  return o;
}

const SUPREME_TEXT = `OFFICIAL PROVINCIAL PERSONNEL DATA RECORD
RANK: SUPREME COMMANDER | OFFICE: OFFICE OF THE SUPREME COMMANDER | TIER: FO-6
${'─'.repeat(52)}

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
