/* ------------------------------------------------------------------ */
/*  SafeHer content — helplines, plans, rights, defense, stories      */
/* ------------------------------------------------------------------ */

export interface Helpline {
  id: string;
  country: string;
  name: string;
  number: string;
  tel: string;
  category: string;
  hours: string;
  note?: string;
}

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "European Union",
] as const;

export const CATEGORIES = [
  "Emergency",
  "Domestic violence",
  "Sexual assault",
  "Cybercrime",
  "Mental health",
  "Teen & dating",
  "Trafficking",
] as const;

export const HELPLINES: Helpline[] = [
  { id: "us-911", country: "United States", name: "Emergency — Police · Ambulance", number: "911", tel: "911", category: "Emergency", hours: "24/7" },
  { id: "us-dv", country: "United States", name: "National Domestic Violence Hotline", number: "1-800-799-7233", tel: "18007997233", category: "Domestic violence", hours: "24/7 · live chat at thehotline.org", note: 'Text "START" to 88788' },
  { id: "us-rainn", country: "United States", name: "RAINN — Sexual Assault Hotline", number: "1-800-656-4673", tel: "18006564673", category: "Sexual assault", hours: "24/7 · online chat at rainn.org" },
  { id: "us-teen", country: "United States", name: "love is respect — Teen Dating Abuse", number: "1-866-331-9474", tel: "18663319474", category: "Teen & dating", hours: "24/7", note: 'Text "LOVEIS" to 22522' },
  { id: "us-988", country: "United States", name: "Suicide & Crisis Lifeline", number: "988", tel: "988", category: "Mental health", hours: "24/7 · call or text 988" },
  { id: "us-ht", country: "United States", name: "National Human Trafficking Hotline", number: "1-888-373-7888", tel: "18883737888", category: "Trafficking", hours: "24/7", note: 'Text "HELP" to 233733' },
  { id: "uk-999", country: "United Kingdom", name: "Emergency — Police · Ambulance", number: "999", tel: "999", category: "Emergency", hours: "24/7" },
  { id: "uk-101", country: "United Kingdom", name: "Police — Non-emergency", number: "101", tel: "101", category: "Emergency", hours: "24/7" },
  { id: "uk-dv", country: "United Kingdom", name: "National Domestic Abuse Helpline (Refuge)", number: "0808 2000 247", tel: "08082000247", category: "Domestic violence", hours: "24/7" },
  { id: "uk-rc", country: "United Kingdom", name: "Rape Crisis England & Wales", number: "0808 500 2222", tel: "08085002222", category: "Sexual assault", hours: "8am – midnight, every day" },
  { id: "in-112", country: "India", name: "National Emergency Number", number: "112", tel: "112", category: "Emergency", hours: "24/7 · pan-India" },
  { id: "in-181", country: "India", name: "Women's Helpline", number: "181", tel: "181", category: "Domestic violence", hours: "24/7" },
  { id: "in-1091", country: "India", name: "Women in Distress", number: "1091", tel: "1091", category: "Emergency", hours: "24/7" },
  { id: "in-cyber", country: "India", name: "National Cybercrime Helpline", number: "1930", tel: "1930", category: "Cybercrime", hours: "24/7 · report at cybercrime.gov.in" },
  { id: "in-child", country: "India", name: "Childline — for anyone under 18", number: "1098", tel: "1098", category: "Teen & dating", hours: "24/7" },
  { id: "ca-911", country: "Canada", name: "Emergency — Police · Ambulance", number: "911", tel: "911", category: "Emergency", hours: "24/7" },
  { id: "ca-awhl", country: "Canada", name: "Assaulted Women's Helpline (Ontario)", number: "1-866-863-0511", tel: "18668630511", category: "Domestic violence", hours: "24/7 · TTY 1-866-863-7868" },
  { id: "ca-kids", country: "Canada", name: "Kids Help Phone", number: "1-800-668-6868", tel: "18006686868", category: "Mental health", hours: "24/7", note: 'Text "CONNECT" to 686868' },
  { id: "au-000", country: "Australia", name: "Emergency — Police · Ambulance", number: "000", tel: "000", category: "Emergency", hours: "24/7" },
  { id: "au-respect", country: "Australia", name: "1800RESPECT — DV & Sexual Assault", number: "1800 737 732", tel: "1800737732", category: "Domestic violence", hours: "24/7 · national" },
  { id: "au-lifeline", country: "Australia", name: "Lifeline — Crisis Support", number: "13 11 14", tel: "131114", category: "Mental health", hours: "24/7" },
  { id: "eu-112", country: "European Union", name: "Pan-EU Emergency Number", number: "112", tel: "112", category: "Emergency", hours: "24/7 · works in every EU state" },
];

/* ---------------- red-flag check ---------------- */

export const RED_FLAGS = [
  "Checks my phone, messages or location without my consent",
  "Gets angry or punishing when I spend time with friends or family",
  "Insults or humiliates me, then says \u201cI was only joking\u201d",
  "Controls my money, my job, or what I spend",
  "Threatens to hurt me, themself, or someone I love",
  "Pressures or forces me into sexual acts I don't want",
  "Blames me for their anger — says I \u201cmade them do it\u201d",
  "Smashes things, punches walls, or hurts pets",
  "Threatens to share my private photos or information",
  "Follows me, or \u201ccoinsidentally\u201d appears where I am",
  "Dictates what I wear, where I go, how I look",
  "I feel like I'm walking on eggshells around them",
] as const;

/* ---------------- safety plan builder ---------------- */

export interface PlanSection {
  id: string;
  title: string;
  brief: string;
  items: { id: string; text: string }[];
}

export const PLAN_SECTIONS: PlanSection[] = [
  {
    id: "danger",
    title: "Read the danger early",
    brief: "Know your patterns so you can act before a situation escalates.",
    items: [
      { id: "d1", text: "List the warning signs you've noticed (tone, drinking, certain topics)" },
      { id: "d2", text: "Identify the safest room — with an exit, no weapons, near a phone" },
      { id: "d3", text: "Practice your exit route from home, work and class" },
      { id: "d4", text: "Choose a code word that means \u201ccall the police / come get me\u201d" },
    ],
  },
  {
    id: "home",
    title: "Make home safer",
    brief: "Small preparations that buy you minutes when minutes matter.",
    items: [
      { id: "h1", text: "Share your code word with a trusted neighbour or friend" },
      { id: "h2", text: "Pack a go-bag: clothes, medication, chargers, some cash" },
      { id: "h3", text: "Hide duplicate keys and a spare phone or SIM if safe to" },
      { id: "h4", text: "Keep your phone charged and on you, even at home" },
    ],
  },
  {
    id: "leave",
    title: "If you need to leave",
    brief: "Documents and money are the two things hardest to replace later.",
    items: [
      { id: "l1", text: "Copy key documents: ID, passport, bank cards, prescriptions, children's records" },
      { id: "l2", text: "Stash copies with someone you trust, or in cloud storage they can't reach" },
      { id: "l3", text: "Decide two safe places you could go at any hour" },
      { id: "l4", text: "Save emergency numbers under disguised names in your phone" },
    ],
  },
  {
    id: "public",
    title: "Work & public life",
    brief: "Let safe systems around you carry part of the load.",
    items: [
      { id: "p1", text: "Inform HR / security / campus safety with a photo if there is a threat" },
      { id: "p2", text: "Vary your commute times and routes week to week" },
      { id: "p3", text: "Ask a colleague to walk with you to transit or your car after dark" },
      { id: "p4", text: "Keep a ride-share app ready with a trusted emergency contact set" },
    ],
  },
  {
    id: "digital",
    title: "Close the digital doors",
    brief: "Abuse increasingly follows women online — lock these first.",
    items: [
      { id: "g1", text: "Change passwords for email, banking, social media — in that order" },
      { id: "g2", text: "Turn on two-factor authentication everywhere it's offered" },
      { id: "g3", text: "Remove location sharing with anyone you don't fully trust" },
      { id: "g4", text: "Check your phone for unknown apps, battery drain or heating (stalkerware)" },
    ],
  },
  {
    id: "support",
    title: "Build your circle",
    brief: "Isolation is the abuser's weapon. Connection is the antidote.",
    items: [
      { id: "s1", text: "Name 3 people you could call at 2am — tell them what's happening" },
      { id: "s2", text: "Save your nearest domestic-violence and crisis helpline" },
      { id: "s3", text: "Book one session with a counsellor or support group" },
      { id: "s4", text: "Rehearse, out loud, the sentence you'd use to ask for help" },
    ],
  },
];

/* ---------------- know your rights ---------------- */

export interface RightsCategory {
  id: string;
  title: string;
  kicker: string;
  items: { q: string; body: string[] }[];
}

export const RIGHTS: RightsCategory[] = [
  {
    id: "public",
    title: "Street & public spaces",
    kicker: "Harassment · Stalking",
    items: [
      {
        q: "Is catcalling, following or flashing actually a crime?",
        body: [
          "In most jurisdictions, yes. India criminalises sexual harassment and stalking under Sections 354A and 354D of the IPC; the UK prosecutes under the Protection from Harassment Act; most US states have harassment and stalking statutes. You do not have to tolerate it, and you do not need to be touched for it to count.",
          "Trust your instincts. Note the time, place and description. Repeat behaviour escalates — reporting early creates a paper trail that protects you later.",
        ],
      },
      {
        q: "Someone keeps following or watching me. What evidence do I need?",
        body: [
          "Keep an incident log: date, time, location, what happened, any witnesses. Save messages, voicemails, gifts, screenshots — with timestamps visible.",
          "In most places, stalking does not require physical contact. A documented pattern of unwanted attention is enough to seek a protection order and file charges. Tell someone today, and consider informing your workplace or campus security.",
        ],
      },
    ],
  },
  {
    id: "work",
    title: "Workplace & campus",
    kicker: "POSH · Title VII · Title IX",
    items: [
      {
        q: "What protections exist against harassment at work?",
        body: [
          "In India, the POSH Act requires every workplace with 10+ employees to have an Internal Committee. You can file a written complaint within 3 months; proceedings are confidential, and retaliation against you is itself an offence.",
          "In the US, Title VII prohibits sex-based harassment; you may file with the EEOC within 180 days. On campus, Title IX coordinators must respond to reports. Document everything in writing and keep copies outside work systems.",
        ],
      },
      {
        q: "Can I report a senior or someone powerful?",
        body: [
          "Yes — the law applies regardless of position, and anonymous complaints can trigger an inquiry in many frameworks. Go to the Internal Committee, HR, the EEOC, or directly to police; you can also approach the National Commission for Women (India) or a lawyer.",
          "Bring your evidence and a support person. Ask for acknowledgement of your complaint in writing — a receipt number or stamped copy protects you if the process stalls.",
        ],
      },
    ],
  },
  {
    id: "dv",
    title: "Domestic violence",
    kicker: "Protection orders",
    items: [
      {
        q: "What is a protection / restraining order, and how fast can I get one?",
        body: [
          "A protection order is a court order requiring the abuser to stay away from you, your home, workplace and children. Violating it is a criminal offence with immediate arrest powers.",
          "Emergency (ex parte) orders can be granted within hours, often free of cost: India's Protection of Women from Domestic Violence Act 2005 also provides residence and monetary relief; UK non-molestation orders; US state orders via family court. A helpline advocate can walk you through filing.",
        ],
      },
      {
        q: "There are no visible injuries. Can I still report?",
        body: [
          "Absolutely. Emotional abuse, financial control, isolation and threats are recognised forms of domestic violence. The UK criminalises 'coercive control' directly; India's DV Act covers verbal, emotional and economic abuse; US advocates can help you document the pattern.",
          "Save threatening messages, record dates of incidents, and note witnesses. The pattern is the evidence.",
        ],
      },
    ],
  },
  {
    id: "cyber",
    title: "Online & image abuse",
    kicker: "Cybercrime · Deepfakes",
    items: [
      {
        q: "Someone is threatening to share — or has shared — my private images.",
        body: [
          "This is a crime in a growing number of countries, including under the UK Online Safety Act, many US state 'revenge porn' laws, and India's IT Act (Sections 66E and 67). Threatening to share is often punishable even if nothing has been posted.",
          "Do not delete evidence: screenshot everything with URLs and timestamps, then report to the platform and to police or a cybercrime portal (cybercrime.gov.in in India, the FBI's IC3 in the US). Organisations like StopNCII.org can help block images from spreading. None of this is your fault.",
        ],
      },
      {
        q: "I'm being harassed in DMs, comments or group chats.",
        body: [
          "Report and block on the platform, but also preserve evidence first — screenshots with usernames and dates. Persistent online harassment can constitute criminal stalking or intimidation.",
          "If you suspect stalkerware on your phone (battery drain, unexplained heating, someone 'knowing too much'), get help checking the device on a trusted computer — never from the device itself. Cybercrime helplines can guide you.",
        ],
      },
    ],
  },
  {
    id: "assault",
    title: "After an assault",
    kicker: "Medical care · Reporting",
    items: [
      {
        q: "What are my rights immediately afterwards?",
        body: [
          "You have the right to free emergency medical care and a forensic exam (rape kit) — in many places without first deciding whether to involve police. You have the right to a support person or trained advocate present during every step.",
          "If you may want forensic evidence: try not to shower, change clothes, eat or clean the area. Evidence is strongest within 72–120 hours, but seek care regardless — your health comes first, and reporting remains possible later.",
        ],
      },
      {
        q: "Do I have to report to the police right away?",
        body: [
          "No. In most jurisdictions you can have evidence collected and stored while you decide, and you can report weeks, months or years later. India allows a 'zero FIR' — you can file at any police station regardless of where the incident occurred, and they must transfer it.",
          "Whatever you choose, contact a sexual-assault helpline first. Trained advocates explain your local options confidentially and can accompany you.",
        ],
      },
    ],
  },
  {
    id: "report",
    title: "Filing a report",
    kicker: "Step by step",
    items: [
      {
        q: "How do I actually file a complaint, step by step?",
        body: [
          "1. Write a timeline while memory is fresh — dates, places, witnesses. 2. Gather evidence: messages, photos, medical records, call logs. 3. File at your nearest police station or official cybercrime portal.",
          "4. Insist on a written copy of your complaint with a reference number (in India, the FIR number). 5. If police refuse to register it, escalate in writing to a senior officer or the women's commission. Free legal aid exists: NALSA in India, legal-aid societies in the US and UK.",
        ],
      },
      {
        q: "I'm afraid reporting will make it worse.",
        body: [
          "That fear is real and common — and it's exactly why you should plan before acting. Speak to a domestic-violence advocate first; they help you weigh risks, arrange safe housing, and coordinate with police so your address stays confidential.",
          "You can request anonymity in many proceedings, and protection orders can be in place before the other person is even notified. You don't have to do any of this alone.",
        ],
      },
    ],
  },
];

/* ---------------- self-defense ---------------- */

export interface Move {
  n: string;
  title: string;
  target: string;
  how: string;
  icon: string;
}

export const MOVES: Move[] = [
  {
    n: "01",
    title: "The stance & the voice",
    target: "Before contact",
    how: "Feet apart, hands up palm-out at chest height, chin down. Say \u201cBACK OFF\u201d from your diaphragm — low, loud, final. If you need bystanders, shout \u201cFIRE\u201d: it draws more response than \u201chelp\u201d.",
    icon: "voice",
  },
  {
    n: "02",
    title: "Palm-heel strike",
    target: "Nose · chin",
    how: "Snap your palm upward into the nose or point of the chin, fingers curled back. Harder and safer than a fist — no wrist injury, maximum shock. Strike, then move.",
    icon: "palm",
  },
  {
    n: "03",
    title: "Knee strike",
    target: "Groin · thigh",
    how: "If he's close or grabbing you: grab shoulders or clothing for balance and drive your knee up hard into the groin. Repeat until the grip loosens. This is the great equaliser at close range.",
    icon: "knee",
  },
  {
    n: "04",
    title: "Elbow strike",
    target: "Jaw · temple",
    how: "From behind or at arm's length, rotate your hips and whip the point of your elbow horizontally into the jaw or temple. Short range, enormous force — train it on a pillow first.",
    icon: "elbow",
  },
  {
    n: "05",
    title: "Wrist escape & run",
    target: "The thumb gap",
    how: "Grabbed by the wrist? Rotate your arm sharply toward the attacker's thumb — the weakest point of any grip — rip free, and run toward people, light and noise. The goal is never to win; it's to get away.",
    icon: "escape",
  },
];

/* ---------------- bystander 5 Ds ---------------- */

export const FIVE_DS = [
  {
    d: "Distract",
    desc: "Interrupt without confrontation.",
    example: "Ask for directions, drop your keys, spill a drink, pretend you know her — \u201cThere you are, we're late!\u201d",
  },
  {
    d: "Delegate",
    desc: "Get someone with authority.",
    example: "Alert the driver, bartender, shop staff, security guard, or a bigger group. Point to one person: \u201cYou in the red jacket — help me.\u201d",
  },
  {
    d: "Document",
    desc: "Record evidence safely.",
    example: "Note the time, place, vehicle, descriptions — or record if it's safe. Give it to the woman, not the internet. Her choice, her footage.",
  },
  {
    d: "Delay",
    desc: "Check in afterwards.",
    example: "\u201cAre you okay? That wasn't your fault. Can I walk with you?\u201d Most survivors remember who stayed.",
  },
  {
    d: "Direct",
    desc: "Name it — if it's safe.",
    example: "\u201cShe said stop. Back off.\u201d Calm, loud, addressed to the behaviour, not a fight. Only when you can do it without escalating danger.",
  },
] as const;

/* ---------------- digital safety ---------------- */

export interface DigitalTip {
  id: string;
  title: string;
  body: string;
  icon: string;
  span: string;
}

export const DIGITAL_TIPS: DigitalTip[] = [
  {
    id: "stalkerware",
    title: "Spot stalkerware",
    body: "Battery draining fast, phone heating when idle, unknown apps, or someone who always knows where you are — these are classic signs of monitoring software. Have the device checked on a trusted computer, not the device itself, and keep your old habits until you're safe.",
    icon: "bug",
    span: "lg",
  },
  {
    id: "lockdown",
    title: "Lockdown in 20 minutes",
    body: "Change your email password first — it unlocks everything else. Then banking, social media. Turn on two-factor authentication and a password manager.",
    icon: "lock",
    span: "md",
  },
  {
    id: "location",
    title: "Location hygiene",
    body: "Remove yourself from ex-partners' Find-My / location sharing. Strip location metadata from photos before posting. Audit app permissions: most apps don't need GPS.",
    icon: "pin",
    span: "md",
  },
  {
    id: "search",
    title: "Search safely",
    body: "Private mode is not invisible mode — it doesn't hide you from someone with access to your device or accounts. Use a library computer or a friend's phone to research help, and clear history afterwards if your device is monitored.",
    icon: "eye",
    span: "md",
  },
  {
    id: "social",
    title: "Social media posture",
    body: "Private accounts, no real-time posting (post after you've left), tags off, and a close-friends list for anything personal. Block generously — you owe no one access.",
    icon: "shield",
    span: "md",
  },
  {
    id: "sos",
    title: "Phone SOS, set up tonight",
    body: "Both iPhone and Android can call emergency services and alert contacts by holding the power button. Add your emergency contacts now — it takes three minutes and could save your life.",
    icon: "siren",
    span: "lg",
  },
];

/* ---------------- stories ---------------- */

export const STORIES = [
  {
    quote: "I rehearsed leaving for eight months. The safety-plan checklist on this site was the first thing I ever finished. I walked out on a Tuesday with my go-bag, and I didn't look back.",
    name: "Priya, 34",
    meta: "Left an abusive marriage · Mumbai",
    tilt: "-2deg",
  },
  {
    quote: "A stranger on the bus did the Distract thing — asked me for the time, then didn't stop talking to me until my stop. I didn't even know I was being followed until she whispered it. I owe her everything.",
    name: "Amara, 22",
    meta: "Bystander intervention · London",
    tilt: "1.6deg",
  },
  {
    quote: "The hotline advocate stayed on the phone for two hours. She never told me what to do. She just kept saying 'you have options' until I believed it.",
    name: "Danielle, 41",
    meta: "Called the DV hotline · Chicago",
    tilt: "-1.2deg",
  },
  {
    quote: "My stalker had installed an app on my phone. The digital-safety page told me exactly what to check. That week I changed my locks, my number and my life.",
    name: "Sofia, 28",
    meta: "Survived cyberstalking · Madrid",
    tilt: "2deg",
  },
] as const;

/* ---------------- stats ---------------- */

export interface Stat {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  source: string;
}

export const STATS: Stat[] = [
  { target: 3, prefix: "1 in ", suffix: "", label: "women worldwide will experience physical or sexual violence in her lifetime", source: "WHO" },
  { target: 736, prefix: "", suffix: "M", label: "women alive today have already survived intimate-partner or sexual violence", source: "WHO, 2021" },
  { target: 73, prefix: "", suffix: "%", label: "of women have experienced some form of online violence or abuse", source: "UN / Economist Intelligence Unit" },
  { target: 40, prefix: "<", suffix: "%", label: "of survivors ever seek help of any kind — silence is the biggest barrier", source: "UN Women" },
];

/* ---------------- misc ---------------- */

export const NAV_LINKS = [
  { href: "#sos", label: "SOS" },
  { href: "#circle", label: "My Circle" },
  { href: "#safety-plan", label: "Safety Plan" },
  { href: "#red-flags", label: "Red Flags" },
  { href: "#rights", label: "Your Rights" },
  { href: "#defense", label: "Defend" },
  { href: "#helplines", label: "Helplines" },
] as const;

export const EMERGENCY_STRIP = [
  { label: "US Emergency", number: "911" },
  { label: "EU / India Emergency", number: "112" },
  { label: "UK Emergency", number: "999" },
  { label: "Australia Emergency", number: "000" },
  { label: "India Women's Helpline", number: "181" },
  { label: "UK Domestic Abuse", number: "0808 2000 247" },
  { label: "US DV Hotline", number: "1-800-799-7233" },
  { label: "RAINN", number: "1-800-656-4673" },
] as const;
