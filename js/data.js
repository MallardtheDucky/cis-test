/* ==========================================================================
   Confederate Provincial Authority: Chain of Command data
   Edit this file to add or rename ranks and branches.
   Each branch lists 28 rank slots in TIERS order. Use '-' for "no such rank".
   ========================================================================== */

const TIERS = ['FO-5','FO-4','FO-3','FO-2','FO-1','SO-3','SO-2','SO-1','JO-4','JO-3','JO-2','JO-1','MID-1',
  'WO-4','WO-3','WO-2','WO-1','SNCO-3A','SNCO-3','SNCO-2A','SNCO-2','SNCO-1','JNCO-3','JNCO-2','JNCO-1','E-3','E-2','E-1'];

const TIER_GROUPS = {
  'FO-5':'FLAG OFFICERS // BRANCH APEX', 'FO-3':'FLAG OFFICERS // STRATEGIC COMMAND', 'FO-1':'FLAG OFFICERS // SENIOR COMMAND',
  'SO-3':'SENIOR OFFICERS // OPERATIONAL MANAGEMENT', 'JO-4':'JUNIOR OFFICERS // FIELD EXECUTION',
  'MID-1':'COMMISSIONED ENTRY // CADET OFFICERS', 'WO-4':'WARRANT OFFICERS // TECHNICAL EXPERTISE',
  'SNCO-3A':'SENIOR NON-COMMISSIONED OFFICERS // APEX ENLISTED', 'SNCO-2A':'SENIOR NON-COMMISSIONED OFFICERS // COMPANY LEVEL',
  'JNCO-3':'JUNIOR NON-COMMISSIONED OFFICERS', 'E-3':'ENLISTED // EXPERIENCED', 'E-2':'ENLISTED // STANDARD', 'E-1':'ENLISTED // ENTRY'
};

/* Insignia palettes (field colour + triangle colour), matched to the reference sheet */
const FAMILIES = {
  fleet:   { bg:'#3b3f63', mark:'#f5b800', note:'Gold triangles on a navy field. A red underline marks command qualification; more triangles and a longer bar mean higher grade.' },
  ground:  { bg:'#2f4033', mark:'#9b0a0a', note:'Red triangles on a dark green field. A gold bar marks field-command qualification; more triangles mean higher grade.' },
  intel:   { bg:'#4b4c50', mark:'#1a1a78', note:'Blue triangles on a grey field. Gold bars above and red bars below mark the senior and special grades.' },
  civil:   { bg:'#1f4650', mark:'#dfe9f6', note:'Ivory triangles on a slate-teal field. A gold bar marks a Charter-confirmed office.' },
  veil:    { bg:'#14161f', mark:'#8d96a8', note:'Silver triangles on a black field. Worn only on internal identity cards, never in public.' },
  support: { bg:'#3a2f28', mark:'#e8832a', note:'Bronze triangles on a brown field. A gold bar marks a certified technical authority.' },
  droid:   { bg:'#1b2a36', mark:'#38d6ff', note:'Cyan triangles on a steel field. A cyan bar marks a learning-core certified unit.' },
  police:  { bg:'#1d2b4a', mark:'#8fb8ff', note:'Pale-blue triangles on a midnight field. A gold bar marks senior constabulary authority.' }
};

const BRANCHES = {
/* ───────────────────────────── FLEET ───────────────────────────── */
navy: { tab:'fleet', label:'Navy', name:'Confederate Navy', fam:'fleet',
  intro:'The Confederate Navy is the Provincial Authority\'s principal instrument of force: capital ships, carrier groups and escort squadrons crewed by organic officers and droid command units. Its doctrine prizes patience, concentration of force and the preservation of hulls over the preservation of pride.',
  mission:'Defend the Confederacy\'s space, project force when ordered, and keep the fleet in being.',
  org:'Fleet groups divide into task forces, squadrons and individual ships. Each capital ship has a bridge staff, gunnery, engineering and flight departments.',
  reports:'The Naval Staff, then the Military Senate and the Office of the Supreme Commander.',
  ranks:'Fleet Admiral;Admiral;Vice Admiral;Rear Admiral;Commodore;Senior Captain;Captain;Commander;Lieutenant Commander;Second Lieutenant;Lieutenant;Junior Lieutenant;Midshipman;Grand Master Warrant Officer;Master Warrant Officer;Chief Warrant Officer;Warrant Officer;Fleet Master Chief;Command Master Chief;Master Chief Petty Officer;Senior Chief Petty Officer;Chief Petty Officer;Petty Officer, First Class;Petty Officer, Second Class;Petty Officer, Third Class;Senior Spacer;Spacer;Spacer Recruit',
  duties:['Command, crew and maintain capital ships and escorts','Plan fleet movements, gunnery and navigation doctrine','Keep every hull ready for sudden fleet action'],
  posts:{ FO:'Commands a fleet group or sits on the Naval Staff.', SO:'Captains a capital ship or heads a department aboard one.', JO:'Stands bridge, gunnery or engineering watches.', WO:'Technical authority over weapons, drives or sensors.', NCO:'Leads a watch section or ship\'s division.', E:'Serves in a working division aboard ship.' } },

fighter: { tab:'fleet', label:'Starfighter', name:'Droid Starfighter Corps', fam:'fleet',
  intro:'The Droid Starfighter Corps flies the Confederacy\'s starfighters, bombers and gunships from carrier decks. Squadrons are mixed flights: organic pilots supply improvisation, droid wingmen supply endurance and precision.',
  mission:'Win local superiority around the fleet, strike enemy ships and cover boarding actions.',
  org:'Air wings are assigned to carriers and divide into squadrons, then flights of four to six craft. Deck crews are attached to each wing.',
  reports:'The Naval Staff through the Carrier Air Command.',
  ranks:'-;-;-;Wing Marshal;Wing Commodore;Wing Commander;Wing Executive;Squadron Commander;Squadron Leader;Flight Captain;Flight Lieutenant;Pilot Officer;Flight Cadet;-;-;-;-;-;-;-;-;Flight Chief;Flight Sergeant;Senior Deck Technician;Deck Technician;-;-;-',
  duties:['Fly interception, escort and strike sorties','Coordinate droid wingmen and swarm tactics','Train and certify replacement pilots'],
  posts:{ FO:'Commands the air arm of a carrier fleet.', SO:'Leads a squadron or a carrier\'s air group.', JO:'Flies and leads a flight in combat.', NCO:'Supervises flight deck crews and turnaround.' } },

marines: { tab:'fleet', label:'Marines', name:'Fleet Marine Corps', fam:'ground',
  intro:'The Fleet Marine Corps provides ship security, boarding parties and rapid-response landing forces. Marines serve aboard every capital ship and are the Navy\'s answer to anything that gets inside the hull.',
  mission:'Defend ships against boarders, take enemy ships, and land small forces from orbit.',
  org:'Marine detachments are attached to ships; larger landing forces form battalions under a Marine brigade staff.',
  reports:'Fleet Marine Command, under the Naval Staff, with an Army liaison.',
  ranks:'-;General of Marines;Lieutenant General;Major General;Brigadier General;Colonel;Lieutenant Colonel;Major;Captain;Lieutenant;Second Lieutenant;Junior Lieutenant;Officer Cadet;-;Master Gunner;Chief Gunner;Gunner;Sergeant Major of Marines;Sergeant Major;First Sergeant;Master Gunnery Sergeant;Gunnery Sergeant;Staff Sergeant;Sergeant;Corporal;Lance Corporal;Marine;Marine Recruit',
  duties:['Repel and conduct boarding actions','Guard critical ship compartments and brigs','Seize landing zones for follow-on forces'],
  posts:{ FO:'Commands the Marine Corps or a landing brigade.', SO:'Commands a battalion or the Marine detachment of a capital ship.', JO:'Leads a platoon or boarding team.', WO:'Weapons and breaching specialist.', NCO:'Leads squads and drills the detachment.', E:'Serves in a rifle or boarding squad.' } },

nint: { tab:'fleet', label:'Navy Intel', name:'Naval Intelligence Directorate', fam:'intel',
  intro:'Naval Intelligence handles signals interception, fleet reconnaissance, counter-espionage and the analysis of every vessel the Confederacy has tracked. Its agents are embedded aboard warships and at fleet depots, and report outside the normal naval chain.',
  mission:'Tell fleet commanders what is out there, and stop anyone telling the wrong people what is in here.',
  org:'Directorate divisions cover fleet analysis, signals, counter-espionage and technical collection. Field teams are attached to fleet staffs.',
  reports:'The Intelligence Directorate, then the Office of the Supreme Commander.',
  ranks:'Director General;Director;Deputy Director;Chief Superintendent;Superintendent;Chief Inspector;Inspector;Junior Inspector;Senior Special Agent;Special Agent;Agent;Probationary Agent;Trainee Agent;-;Chief Technical Analyst;Technical Analyst;Junior Technical Analyst;-;-;-;-;Chief Intelligence Specialist;Senior Intelligence Specialist;Intelligence Specialist;Junior Intelligence Specialist;-;-;-',
  duties:['Intercept, decrypt and analyse signals traffic','Run counter-espionage inside the fleet','Brief fleet commanders on threats and movements'],
  posts:{ FO:'Heads a directorate division or the whole service.', SO:'Runs a fleet intelligence station or analysis cell.', JO:'Works a field team or watch desk.', WO:'Technical analyst for signals and sensor data.', NCO:'Supports collection and analysis desks.' } },

/* ───────────────────────────── GROUND ───────────────────────────── */
army: { tab:'ground', label:'Army', name:'Confederate Ground Army', fam:'ground',
  intro:'The Confederate Ground Army fields armoured divisions, artillery, garrison infantry and large droid formations. Droid legions provide mass; organic officers and NCOs provide judgement, and every formation keeps both on its rolls.',
  mission:'Hold the Confederacy\'s ground, defeat landings and retake lost positions.',
  org:'Army groups divide into corps, divisions, regiments, battalions, companies and platoons. Armour and artillery regiments are attached to divisions.',
  reports:'The Army General Staff, then the Military Senate and the Supreme Commander.',
  ranks:'Field Marshal;General;Lieutenant General;Brigadier General;Major Colonel;Colonel;Major;Commander;Captain;First Lieutenant;Lieutenant;Second Lieutenant;Officer Cadet;Grand Master Warrant Officer;Master Warrant Officer;Chief Warrant Officer;Warrant Officer;Sergeant Major of the Army;Command Sergeant Major;First Sergeant;Master Sergeant;Staff Sergeant;Senior Sergeant;Sergeant;Corporal;Lance Corporal;Private First Class;Private',
  duties:['Garrison, defend and retake fortified positions','Direct armour, artillery and droid infantry','Maintain unit discipline and readiness'],
  posts:{ FO:'Commands an army group, corps or division, or sits on the General Staff.', SO:'Commands a regiment or battalion, or runs a staff section.', JO:'Commands a company or platoon.', WO:'Technical authority for maintenance, signals or fire control.', NCO:'Runs squads, platoons and company administration.', E:'Serves in a rifle squad or crew.' } },

commando: { tab:'ground', label:'Commando', name:'Commando Corps', fam:'ground',
  intro:'The Commando Corps is the Confederacy\'s elite strike arm: commando droids, MagnaGuard-pattern bodyguards and hand-picked organic special forces. Commandos operate in small teams on missions the line army would not survive.',
  mission:'Raid, assassinate, recover and protect, on orders from the highest levels only.',
  org:'Commando brigades divide into strike groups and teams of four to eight. Teams are mixed organic and droid.',
  reports:'The Commando Command, then directly to the Military Senate.',
  ranks:'-;Corps Commandant;Commando General;Commando Brigadier;Senior Commando Colonel;Commando Colonel;Commando Major;Commando Commander;Commando Captain;Commando First Lieutenant;Commando Lieutenant;Commando Second Lieutenant;Commando Cadet;-;Master Weapons Warrant;Chief Weapons Warrant;Weapons Warrant;Corps Sergeant Major;Command Sergeant Major;First Sergeant;Master Sergeant;Staff Sergeant;Senior Sergeant;Sergeant;Corporal;Veteran Commando;Commando;Commando Recruit',
  duties:['Conduct raids, assassinations and recovery missions','Guard flag officers and constitutional offices','Train and certify special-operations teams'],
  posts:{ FO:'Commands the Corps or a commando brigade.', SO:'Commands a strike group or battalion.', JO:'Leads a commando team.', WO:'Weapons, demolitions or infiltration specialist.', NCO:'Team sergeant and trainer.', E:'Serves as a team operator.' } },

pdc: { tab:'ground', label:'Planetary Defense', name:'Planetary Defense Command', fam:'ground',
  intro:'Planetary Defense Command runs the fixed defences of the homeworld: shield generators, orbital batteries, sensor-masking arrays and fortress garrisons. It is the reason a hostile fleet would find a quiet world and then a very short battle.',
  mission:'Deny orbit and the surface to any hostile force and keep the defences hidden until used.',
  org:'Defence sectors divide into fortresses, batteries and watch stations, each with its own fire-control section.',
  reports:'The Army General Staff and the Naval Staff jointly, then the Military Senate.',
  ranks:'-;Defense Marshal;Defense General;Defense Brigadier;Fortress Commandant;Defense Colonel;Defense Major;Battery Commander;Battery Captain;Battery Lieutenant;Watch Lieutenant;Second Watch Lieutenant;Defense Cadet;-;Chief Fire-Control Warrant;Fire-Control Warrant;Junior Fire-Control Warrant;-;Defense Sergeant Major;-;Master Gunner Sergeant;Gunnery Sergeant;Sergeant Gunner;Corporal Gunner;Lance Gunner;Senior Gunner;Gunner;Gunner Recruit',
  duties:['Operate shield and orbital battery systems','Maintain sensor-masking and concealment arrays','Drill fortress garrisons for sealed-door defence'],
  posts:{ FO:'Commands a defence sector or the Command staff.', SO:'Commands a fortress or battery group.', JO:'Commands a battery or a watch.', WO:'Fire-control and shield-systems technician.', NCO:'Leads gun crews and watch sections.', E:'Serves on a gun crew or sensor watch.' } },

aint: { tab:'ground', label:'Army Intel', name:'Army Intelligence Directorate', fam:'intel',
  intro:'Army Intelligence is the ground-side counterpart of Naval Intelligence: battlefield reconnaissance, interrogation, loyalty monitoring and the dismantling of insurgent cells. Analysts and agents are attached to army formations but answer to the Directorate.',
  mission:'Give the Army an accurate picture of the ground and of its own reliability.',
  org:'Theatre intelligence stations cover collection, interrogation, security vetting and mapping.',
  reports:'The Intelligence Directorate, then the Office of the Supreme Commander.',
  ranks:'Director General;Director;Deputy Director;Chief Superintendent;Superintendent;Chief Inspector;Inspector;Junior Inspector;Senior Special Agent;Special Agent;Agent;Probationary Agent;Trainee Agent;-;Chief Field Analyst;Field Analyst;Junior Field Analyst;-;-;-;-;Chief Interrogator;Senior Interrogator;Interrogator;Junior Interrogator;-;-;-',
  duties:['Gather and assess battlefield intelligence','Interrogate prisoners and defectors','Audit unit loyalty and security'],
  posts:{ FO:'Heads a directorate division.', SO:'Runs a theatre intelligence station.', JO:'Leads a field cell.', WO:'Specialist field analyst.', NCO:'Conducts interrogations and vetting.' } },

/* ───────────────────────────── SUPPORT ───────────────────────────── */
eng: { tab:'support', label:'Engineering', name:'Engineering Corps', fam:'support',
  intro:'The Engineering Corps builds, repairs and conceals. It excavates the underground cities, maintains the shield and power grid, and keeps every hull in the fleet seaworthy.',
  mission:'Build and maintain the physical state: cities, power, shipyards and defences.',
  org:'Divisions cover civil construction, ship repair, power systems and concealment works.',
  reports:'The Directorate of Auxiliary Services, then the Military Senate.',
  ranks:'-;Director-General of Engineers;Deputy Director-General;Director of Works;Deputy Director of Works;Chief Engineer;Senior Engineer;Engineer;Associate Engineer;Senior Technician Officer;Technician Officer;Junior Technician Officer;Technical Cadet;Grand Master Technician;Master Technician;Chief Technician;Technician;-;Master Craftsman;-;Chief Foreman;Senior Foreman;Foreman;Senior Crew Chief;Crew Chief;Senior Mechanic;Mechanic;Mechanic Apprentice',
  duties:['Excavate, construct and repair installations','Maintain the power grid and shield generators','Repair and refit ships and droids'],
  posts:{ FO:'Directs a works division or the whole Corps.', SO:'Chief engineer of a major project or yard.', JO:'Leads an engineering section.', WO:'Master of a trade or system.', NCO:'Foreman of a work crew.', E:'Works as a mechanic or builder.' } },

log: { tab:'support', label:'Logistics', name:'Logistics & Foundry Command', fam:'support',
  intro:'Logistics and Foundry Command manages the Ministry of Resource Continuance\'s military side: mines, automated foundries, depots and the convoys between them. Droid production lines and spare-part stocks are its responsibility.',
  mission:'Keep every unit supplied and keep the foundries producing.',
  org:'Divisions cover supply, transport, foundry operations and strategic reserves.',
  reports:'The Directorate of Auxiliary Services, with oversight by the Ministry of Resource Continuance.',
  ranks:'-;Quartermaster General;Deputy Quartermaster General;Director of Supply;Director of Foundries;Chief Quartermaster;Senior Quartermaster;Quartermaster;Assistant Quartermaster;Senior Supply Officer;Supply Officer;Junior Supply Officer;Supply Cadet;Grand Master Foundry Warrant;Master Foundry Warrant;Chief Foundry Warrant;Foundry Warrant;-;Master Supply Sergeant;-;Chief Supply Sergeant;Senior Supply Sergeant;Supply Sergeant;Senior Loader;Loader Chief;Senior Handler;Supply Handler;Supply Apprentice',
  duties:['Move and store ammunition, fuel and spares','Operate and schedule automated foundries','Audit strategic reserves and consumption'],
  posts:{ FO:'Directs a supply or foundry division.', SO:'Commands a depot, foundry complex or convoy group.', JO:'Runs a supply section.', WO:'Foundry or inventory specialist.', NCO:'Supervises loaders and convoy crews.', E:'Works in stores, loading and transport.' } },

med: { tab:'support', label:'Medical', name:'Medical Corps', fam:'support',
  intro:'The Medical Corps cares for organic personnel and also maintains the droid repair wards. It runs field hospitals, ship sick bays, and the public health service of the civilian districts.',
  mission:'Keep personnel alive and fit for service, and keep the civilian population healthy.',
  org:'Medical commands serve the fleet, army and civil districts, each with hospitals, clinics and field aid stations.',
  reports:'The Directorate of Auxiliary Services, with the Ministry of Health for civil matters.',
  ranks:'-;Surgeon General;Deputy Surgeon General;Medical Director;Deputy Medical Director;Chief Surgeon;Senior Surgeon;Surgeon;Medical Officer;Senior Physician;Physician;Junior Physician;Medical Cadet;-;Master Medical Technician;Chief Medical Technician;Medical Technician;-;Master Medic Sergeant;-;Chief Medic;Senior Medic;Staff Medic;Medic;Junior Medic;Senior Orderly;Orderly;Medical Recruit',
  duties:['Treat casualties and run field hospitals','Maintain ship sick bays and droid repair wards','Administer public health and quarantine'],
  posts:{ FO:'Directs a medical command or the Corps.', SO:'Chief of a hospital or fleet medical staff.', JO:'Staff physician or surgeon.', WO:'Laboratory and surgical technician.', NCO:'Leads medic teams and aid stations.', E:'Provides nursing and first aid.' } },

rnd: { tab:'support', label:'R&D', name:'Research & Development Bureau', fam:'support',
  intro:'The Research and Development Bureau designs the next generation of Confederate hardware: warships, droid cores, weapons and sensor-masking technology. Its labs sit behind the deepest security in the state.',
  mission:'Keep the Confederacy technically ahead of anyone who might find it.',
  org:'Research divisions cover naval design, droid cores, weapons, materials and concealment technology.',
  reports:'The Directorate of Auxiliary Services, with direct access to the Supreme Commander on core matters.',
  ranks:'-;Chief Scientist;Deputy Chief Scientist;Director of Research;Deputy Director of Research;Principal Scientist;Senior Scientist;Scientist;Associate Scientist;Senior Research Officer;Research Officer;Junior Research Officer;Research Cadet;-;Master Laboratory Technician;Chief Laboratory Technician;Laboratory Technician;-;-;-;-;Chief Test Technician;Senior Test Technician;Test Technician;Junior Test Technician;-;-;-',
  duties:['Develop and test new ships, weapons and droid cores','Evaluate captured and foreign technology','Protect research from leakage'],
  posts:{ FO:'Directs a research programme or the Bureau.', SO:'Leads a laboratory or project.', JO:'Works on a research team.', WO:'Test and laboratory specialist.', NCO:'Runs test ranges and workshops.' } },

sig: { tab:'support', label:'Signals', name:'Signals & Communications Service', fam:'support',
  intro:'The Signals and Communications Service runs the Confederacy\'s secure networks, deep-space relay and the tightly controlled outbound links used by the Veil Network. It also enforces transmission discipline across the fleet.',
  mission:'Move information securely and keep the Confederacy\'s signature close to zero.',
  org:'Divisions cover internal networks, fleet communications, relay stations and signal security.',
  reports:'The Directorate of Auxiliary Services, with signal security reporting to Intelligence.',
  ranks:'-;Director of Signals;Deputy Director of Signals;Chief Signals Officer;Deputy Chief Signals Officer;Senior Signals Officer;Signals Officer;Communications Officer;Associate Signals Officer;Senior Network Officer;Network Officer;Junior Network Officer;Signals Cadet;-;Master Signals Warrant;Chief Signals Warrant;Signals Warrant;-;Master Signals Sergeant;-;Chief Signaller;Senior Signaller;Signaller;Senior Operator;Operator;Junior Operator;Operator Trainee;Operator Recruit',
  duties:['Operate secure networks and relays','Enforce emission control across the fleet','Maintain encryption and key management'],
  posts:{ FO:'Directs communications for a command or the Service.', SO:'Chief signals officer of a fleet or station.', JO:'Runs a communications watch.', WO:'Systems and encryption specialist.', NCO:'Supervises operators and relay crews.', E:'Operates consoles and relays.' } },

/* ───────────────────────────── DROID CORPS ───────────────────────────── */
droid: { tab:'droid', label:'Droid Command', name:'Droid Command Corps', fam:'droid',
  intro:'Five centuries of self-replicating foundries and heuristic learning cores produced a droid officer class that holds commissions of its own. Droid ranks are functional designations rather than rewards, and each unit carries its serial designation with its rank.',
  mission:'Provide reliable, tireless command and line capability across every branch.',
  org:'Droid commands are attached to branches but certified by the Corps. Each droid unit is paired with an organic liaison by charter.',
  reports:'The Droid Command Staff, then directly to the Supreme Commander.',
  ranks:'Super Tactical Droid;Tactical Droid Prime;Tactical Droid;Strategic Command Droid;Senior Command Droid;Command Droid Prime;Command Droid;Lieutenant Command Droid;Captain Droid;Lieutenant Droid;Second Lieutenant Droid;Junior Lieutenant Droid;Probationary Droid;Master Systems Droid;Chief Systems Droid;Systems Droid;Technical Droid;-;Sergeant Major Droid;-;Master Sergeant Droid;Staff Sergeant Droid;Sergeant Droid;Squad Leader Droid;Corporal Droid;Elite Line Droid;Line Droid;Newly Activated Droid',
  duties:['Command droid formations in every branch','Operate under certified learning-core limits','Pair with organic liaison officers for oversight'],
  posts:{ FO:'Strategic and theatre-level droid command.', SO:'Commands droid battalions and ships\' droid complements.', JO:'Leads droid companies and platoons.', MID:'Probationary unit under software audit.', WO:'Specialised systems droid with locked skill cores.', NCO:'Runs droid squads and discipline.', E:'Line unit assigned by serial.' } },

liaison: { tab:'droid', label:'Droid Liaison', name:'Droid Liaison Service', fam:'droid',
  intro:'The Droid Liaison Service supplies the organic officers who oversee droid commands as required by the Provincial Charter. Liaison officers hold a veto on droid orders that touch civilian life or constitutional matters.',
  mission:'Ensure droid command remains accountable to organic oversight and to the Charter.',
  org:'Liaison officers are attached to droid commands at ship, regiment and staff levels.',
  reports:'The Military Senate\'s Droid Oversight Committee.',
  ranks:'-;-;Chief of Liaison;Deputy Chief of Liaison;Senior Liaison General;Senior Liaison Colonel;Liaison Colonel;Liaison Major;Liaison Captain;Liaison Lieutenant;Second Liaison Lieutenant;Junior Liaison Lieutenant;Liaison Cadet;-;-;-;-;-;-;-;-;Senior Liaison Sergeant;Liaison Sergeant;Liaison Corporal;-;-;-;-',
  duties:['Review droid orders for Charter compliance','Advise droid commanders on organic morale and law','Report irregularities to the Droid Oversight Committee'],
  posts:{ FO:'Heads the Service or a major liaison division.', SO:'Senior liaison at a regiment, ship or staff.', JO:'Liaison to a droid company or watch.', NCO:'Non-commissioned liaison for droid squads.' } },

/* ───────────────────────────── INTEL & SECURITY ───────────────────────────── */
psb: { tab:'intel', label:'Security Bureau', name:'Provincial Security Bureau', fam:'intel',
  intro:'The Provincial Security Bureau is the domestic intelligence and internal security agency of the Provincial Authority. It investigates sedition, sabotage and espionage, protects the Provincial Charter and polices the civilian districts alongside the constabulary.',
  mission:'Protect the Charter, the state and its secrets from internal threats.',
  org:'Bureau divisions cover counter-espionage, sedition, vetting, district offices and technical surveillance.',
  reports:'The Military Senate and, constitutionally, the Supreme Commander.',
  ranks:'Director General;Director;Deputy Director;Chief Superintendent;Superintendent;Chief Inspector;Inspector;Junior Inspector;Senior Special Agent;Special Agent;Agent;Probationary Agent;Trainee Agent;-;Chief Examiner;Examiner;Junior Examiner;-;-;-;-;Chief Enforcement Officer;Senior Enforcement Officer;Enforcement Officer;Junior Enforcement Officer;-;Surveillance Operative;Bureau Recruit',
  duties:['Investigate sedition, sabotage and foreign espionage','Protect constitutional offices and installations','Conduct personnel vetting and security audits'],
  posts:{ FO:'Directs a Bureau division or the Bureau.', SO:'Heads a district office or investigative division.', JO:'Leads a case team.', WO:'Forensic and technical examiner.', NCO:'Enforcement and surveillance support.', E:'Surveillance and support staff.' } },

veil: { tab:'intel', label:'Veil Network', name:'The Veil Network', fam:'veil',
  intro:'The Veil Network is the Confederacy\'s clandestine foreign intelligence service. Its operatives live ordinary lives in distant societies, pass fragments of information through cut-outs and dead drops, and are never told where those fragments end up. Ranks are known only inside the Network.',
  mission:'Watch the wider galaxy without ever being seen doing it.',
  org:'Regional stations manage handlers, who manage operatives, who manage contacts. No operative knows more than two levels above or below them.',
  reports:'Directly to the Office of the Supreme Commander.',
  ranks:'Veilmaster;Deputy Veilmaster;Regional Director;Sector Director;Station Director;Station Chief;Senior Handler;Handler;Assistant Handler;Senior Operative;Operative;Field Agent;Initiate;-;Master Cryptographer;Cryptographer;Cipher Clerk;-;-;-;Chief Courier;Senior Courier;Courier;Cut-Out;Dead-Drop Keeper;Informant;Contact (Asset);-',
  duties:['Run agents and cut-outs in foreign societies','Collect and route intelligence through secure channels','Maintain cover identities and withdraw assets safely'],
  posts:{ FO:'Directs a vast region or the whole Network.', SO:'Runs a regional station.', JO:'Handles operatives in a sector.', MID:'Trained for a long-term placement.', WO:'Handles ciphers and secure transmission.', NCO:'Moves material and messages between cells.', E:'Provides local information.' } },

cry: { tab:'intel', label:'Cryptology', name:'Cryptology & Counter-Signals Bureau', fam:'intel',
  intro:'The Cryptology and Counter-Signals Bureau breaks other people\'s codes and keeps the Confederacy\'s own unbreakable. It holds the largest archive of intercepted galactic traffic anywhere.',
  mission:'Decode what is intercepted and secure what is sent.',
  org:'Divisions cover cryptanalysis, key production, intercept stations and traffic analysis.',
  reports:'The Intelligence Directorate.',
  ranks:'-;Director of Cryptology;Deputy Director of Cryptology;Chief Cryptanalyst;Deputy Chief Cryptanalyst;Principal Cryptanalyst;Senior Cryptanalyst;Cryptanalyst;Associate Cryptanalyst;Senior Analyst;Analyst;Junior Analyst;Analyst Cadet;-;Master Key Warrant;Chief Key Warrant;Key Warrant;-;-;-;Chief Intercept Operator;Senior Intercept Operator;Intercept Operator;Junior Intercept Operator;Intercept Trainee;-;-;-',
  duties:['Break foreign ciphers and traffic','Produce and distribute Confederate keys','Audit transmission discipline'],
  posts:{ FO:'Directs the Bureau or a major division.', SO:'Heads a cryptanalysis section.', JO:'Works on an analysis team.', WO:'Key-production and cipher specialist.', NCO:'Operates intercept stations.' } },

guard: { tab:'intel', label:'Charter Guard', name:'Charter Guard', fam:'police',
  intro:'The Charter Guard protects the offices and persons named in the Provincial Charter: the Supreme Commander\'s office, the Minister President, the Assembly and the Constitutional Court. It is distinct from the line army and from the Commando Corps.',
  mission:'Protect the constitutional offices and the places they work.',
  org:'Guard details are attached to each protected office; a central staff manages training, vetting and rapid-response teams.',
  reports:'The Military Senate\'s Security Committee.',
  ranks:'-;Commandant of the Guard;Deputy Commandant;Guard General;Guard Colonel-Commandant;Guard Colonel;Guard Major;Guard Commander;Guard Captain;Guard Lieutenant;Second Guard Lieutenant;Junior Guard Lieutenant;Guard Cadet;-;-;Master Protective Warrant;Protective Warrant;-;Guard Sergeant Major;-;Guard Master Sergeant;Guard Staff Sergeant;Senior Guard Sergeant;Guard Sergeant;Guard Corporal;Senior Guardsman;Guardsman;Guard Recruit',
  duties:['Protect constitutional offices and persons','Control access to protected buildings','Respond to threats against officeholders'],
  posts:{ FO:'Commands the Guard.', SO:'Commands a protective division or detail.', JO:'Leads a protective team.', WO:'Protective-systems specialist.', NCO:'Leads details and posts.', E:'Serves on a post or detail.' } },

/* ───────────────────────────── GOVERNANCE ───────────────────────────── */
admin: { tab:'gov', label:'Administration', name:'Provincial Administration', fam:'civil',
  intro:'The Provincial Administration is the civil half of the Provincial Charter: the ministries that run agriculture, industry, education, justice and resource management. Civil officials answer to the Civilian Council and to the Supreme Commander\'s veto in security matters.',
  mission:'Run the civil state: districts, ministries and public services.',
  org:'Ministries divide into departments, district offices and local sections.',
  reports:'The Minister President, then the Civilian Council.',
  ranks:'-;Minister President;Deputy Minister President;Cabinet Minister;Deputy Minister;Chief Administrator;Provincial Governor;Senior Administrator;District Prefect;Assistant Prefect;Administrator;Assistant Administrator;Civil Cadet;-;Chief Registrar;Registrar;Junior Registrar;-;-;-;-;Chief Clerk;Senior Clerk;Clerk;Junior Clerk;Civil Servant;Civil Servant, Provisional;Civil Trainee',
  duties:['Administer ministries and districts','Allocate resources and manage quotas','Implement legislation passed by the Provincial Assembly'],
  posts:{ FO:'Leads a ministry or the whole administration.', SO:'Directs a department or governs a district.', JO:'Manages a local office.', MID:'Trains in the civil service.', WO:'Records and registry specialist.', NCO:'Supervises clerks.', E:'Staffs counters and offices.' } },

judge: { tab:'gov', label:'Judiciary', name:'Constitutional Judiciary', fam:'civil',
  intro:'The Constitutional Judiciary interprets the Provincial Charter, tries civil and criminal cases and audits the legality of emergency measures. Final constitutional interpretation rests with the Supreme Commander, but day-to-day independence in civil law is guarded by statute.',
  mission:'Apply the Charter and the law impartially in civil matters.',
  org:'The Constitutional Court sits above circuit courts, district courts and military tribunals.',
  reports:'The Constitutional Court; constitutionally subject to the Supreme Commander.',
  ranks:'-;Chief Justice;Deputy Chief Justice;Associate Justice;Senior Magistrate;Magistrate;Assistant Magistrate;Judge Advocate;Senior Advocate;Advocate;Junior Advocate;Clerk Advocate;Law Cadet;-;Chief Clerk of Court;Clerk of Court;Junior Clerk of Court;-;-;-;-;Chief Bailiff;Senior Bailiff;Bailiff;Junior Bailiff;-;-;-',
  duties:['Hear civil, criminal and administrative cases','Review the legality of orders','Advise on the Charter'],
  posts:{ FO:'Sits on the Constitutional Court.', SO:'Presides over a district court.', JO:'Prosecutes or defends cases.', WO:'Manages court records.', NCO:'Keeps order in court.' } },

const_: { tab:'gov', label:'Constabulary', name:'Civil Constabulary', fam:'police',
  intro:'The Civil Constabulary is the uniformed police of the civilian districts. It handles day-to-day crime, traffic and public order and refers matters of state security to the Provincial Security Bureau.',
  mission:'Keep the peace and enforce civil law in the districts.',
  org:'District commands divide into precincts and patrol sections, with specialist detective and traffic branches.',
  reports:'The Ministry of Justice, with coordination from the Security Bureau.',
  ranks:'-;Commissioner;Deputy Commissioner;Assistant Commissioner;Chief Constable;Superintendent;Chief Inspector;Inspector;Senior Inspector;Sub-Inspector;Probationary Inspector;Junior Inspector;Constable Cadet;-;-;Master Forensic Technician;Forensic Technician;-;Constabulary Sergeant Major;-;Station Sergeant;Senior Sergeant;Sergeant;Senior Constable;Constable First Class;Constable;Probationary Constable;Constable Recruit',
  duties:['Patrol, investigate and arrest','Manage district public order','Refer security matters to the Bureau'],
  posts:{ FO:'Commands the Constabulary or a district command.', SO:'Commands a precinct.', JO:'Leads a patrol or detective section.', WO:'Forensic specialist.', NCO:'Station and patrol supervisors.', E:'Patrol constables.' } },

assembly: { tab:'gov', label:'Assembly', name:'Provincial Assembly', fam:'civil',
  intro:'The Provincial Assembly is the two-chamber legislature: the elected Civilian Council for domestic law and the Military Senate for security. These are offices rather than military ranks, listed here to show how authority is arranged.',
  mission:'Make law within the limits set by the Charter and the Supreme Commander\'s veto.',
  org:'Committees draft and scrutinise legislation; a joint secretariat handles records and procedure.',
  reports:'The electorate for the Civilian Council; the senior officer corps for the Military Senate.',
  ranks:'-;Speaker of the Assembly;Deputy Speaker;President of the Military Senate;Vice-President of the Senate;Chair of the Civilian Council;Committee Chair;Senior Councillor;Councillor;Senator;Junior Councillor;Assistant Councillor;Assembly Page;-;-;-;-;-;Clerk of the Assembly;-;Deputy Clerk;Senior Secretary;Secretary;Assistant Secretary;Junior Secretary;-;-;-',
  duties:['Debate and pass legislation','Scrutinise budgets and emergency measures','Confirm appointments under the Charter'],
  posts:{ FO:'Presides over a chamber.', SO:'Chairs a committee or holds a senior seat.', JO:'Sits as a councillor or senator.', MID:'Serves as a page in the chamber.', NCO:'Secretariat staff.' } }
};

/* Tab layout */
const TABS = {
  fleet:   { label:'Fleet',        cols:['navy','fighter','marines','nint'] },
  ground:  { label:'Ground',       cols:['army','commando','pdc','aint'] },
  support: { label:'Support',      cols:['eng','log','med','rnd','sig'] },
  droid:   { label:'Droid Corps',  cols:['droid','liaison'] },
  intel:   { label:'Intel/Security', cols:['psb','veil','cry','guard'] },
  gov:     { label:'Governance',   cols:['admin','judge','const_','assembly'] }
};

/* Expand compact rank strings into 28-slot arrays and validate */
(function () {
  Object.keys(BRANCHES).forEach(k => {
    const r = BRANCHES[k].ranks.split(';');
    if (r.length !== TIERS.length) console.error('Rank count mismatch in', k, r.length);
    BRANCHES[k].ranks = r;
  });
})();
