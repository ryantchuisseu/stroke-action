import "server-only";

/** English — texts validated by Dr Kamtchum Tatuene (AD Design, "Website Content — English Version", Aug 2026).
 *  Sections not covered by that document (kept from the design build) are marked "// design". */
export const en = {
  meta: {
    homeTitle: "Stroke Action · Action AVC — Together to Defeat Stroke",
    titleTemplate: "%s · Stroke Action AVC",
    description:
      "Stroke Action is a non-profit organization aiming to reduce the burden of stroke through education, research, professional training, and support for patients and their families.",
  },

  common: {
    urgencyLabel: "Emergency numbers (Cameroon):",
    samu: "SAMU",
    fire: "Fire",
    police: "Police",
    comingSoon: "Coming soon",
    langName: "English",
    switchTo: "FR",
  },

  drawer: {
    close: "Close",
    donate: {
      title: "Make a donation",
      soon: "Coming soon",
      text: "Online payment (Mobile Money + bank card) will be activated soon. In the meantime, write to us to make a donation — we will guide you.",
      contact: "Contact us",
    },
    membership: {
      title: "Apply for membership",
      text: "The online form is coming soon. In the meantime, the process is simple:",
      steps: [
        "Download the form below.",
        "Fill it in: full name, date of birth, email, phone, profession, city / country, motivation statement, and a copy of a valid ID with photo.",
        "Send it back to contact@strokeaction.org, or by WhatsApp at +237 652 14 81 47.",
      ],
      downloadFr: "Form — French (.docx)",
      downloadEn: "Form — English (.docx)",
      reviewNote: "Your application will be reviewed and approved by the Executive Board. Membership is open to all who share our values.",
    },
    volunteer: {
      title: "Volunteer With Us",
      text: "The online form is coming soon. In the meantime, the process is simple:",
      steps: [
        "Download the form below.",
        "Fill it in: full name, date of birth, email, phone, profession, city / country, motivation statement, and a copy of a valid ID with photo.",
        "Send it back to contact@strokeaction.org, or by WhatsApp at +237 652 14 81 47.",
      ],
      downloadFr: "Form — French (.docx)",
      downloadEn: "Form — English (.docx)",
      reviewNote: "Your application will be reviewed by the Executive Board. We welcome volunteers of all backgrounds and professions who share our values.",
    },
  },

  nav: {
    home: "Home",
    donate: "Donate",
    openMenu: "Open menu",
    groups: [
      {
        label: "The Association",
        items: [
          { label: "About Us", href: "/a-propos", desc: "Our story, vision, mission, values" },
          { label: "What We Do", href: "/nos-actions", desc: "The five programs" },
          { label: "Governance", href: "/gouvernance", desc: "The Executive Board" },
          { label: "Key Documents", href: "/documents-cles", desc: "Bylaws, regulations, strategic plan" },
        ],
      },
      {
        label: "Understand Stroke",
        items: [
          { label: "Stroke Education", href: "/education-avc", desc: "Signs, FAST, risk factors" },
          { label: "Did You Know?", href: "/education-avc#le-saviez-vous", desc: "Myths and essential facts" },
          { label: "FAQ", href: "/faq", desc: "Frequently asked questions" },
        ],
      },
      {
        label: "News",
        items: [
          { label: "Blog / News", href: "/actualites", desc: "Articles, campaigns, events" },
          { label: "Gallery", href: "/galerie", desc: "Photos of our activities" },
        ],
      },
      {
        label: "Get Involved",
        items: [
          { label: "Support Us", href: "/nous-soutenir", desc: "Donate, join, shop, volunteer" },
          { label: "Become a Member", href: "/nous-soutenir#devenir-membre", desc: "Membership form" },
          { label: "Volunteer", href: "/nous-soutenir#benevolat", desc: "Give your time" },
          { label: "Contact Us", href: "/contact", desc: "Send us a message" },
          { label: "Members", href: "/espace-membres", desc: "Members only", soon: true },
        ],
      },
    ],
  },

  footer: {
    motto: "Together to Defeat Stroke",
    mottoSub: "Ensemble pour Vaincre l'AVC",
    colHome: "Home",
    colAssoc: "The Association",
    colUnderstand: "Understand Stroke",
    colNews: "News",
    colInvolved: "Get Involved",
    colContact: "Contact",
    rights: "© 2026 Stroke Action. All rights reserved.",
    city: "Yaoundé, Cameroon",
    credit: "Website designed and developed by AD Design",
    social: "Social media links coming soon",
  },

  home: {
    hero: {
      eyebrow: "Stroke Action · Action AVC",
      headline: "Together to Defeat Stroke",
      brainline: "During a stroke, the brain loses 1.9 million neurons every minute.", // design
      sub: "Stroke Action is a non-profit organization aiming to reduce the burden of stroke through education, research, professional training, and support for patients and their families.",
      ctaPrimary: "Learn More",
      ctaSecondary: "Join Us",
      caption:
        "Documentary photograph, black & white treatment — to be replaced with field images from Stroke Action (Yaoundé).", // design
    },
    who: {
      eyebrow: "Who We Are",
      title: "A community united against stroke.",
      p1: "Founded in Cameroon, Stroke Action brings together patients, families, healthcare professionals, and researchers united by one common goal: defeating stroke.",
      p2: "We believe that through education, science, and solidarity, we can save lives and transform the reality of stroke in Africa and beyond.",
      link: "About Stroke Action →",
    },
    pillars: {
      eyebrow: "Our Pillars",
      title: "Four pillars, one conviction.",
      items: [
        { t: "Education", d: "Raising public awareness about stroke risk factors, warning signs, and first-aid response." },
        { t: "Research", d: "Conducting and supporting quality scientific research to inform healthcare policies." },
        { t: "Training", d: "Continuous professional training for healthcare providers." },
        { t: "Support", d: "Technical, financial, and emotional support for stroke patients and their families." },
      ],
    },
    seconds: {
      // design section — built around the validated CTA banner text
      title: "Every Second Counts.",
      neuronsLabel: "neurons lost",
      stops: [
        { at: 0, label: "0", text: "An artery in the brain becomes blocked." },
        { at: 0.16, label: "4 MIN", text: "Deprived of oxygen, the first cells die." },
        { at: 0.42, label: "1 H", text: "≈ 120 million neurons lost. “Time is brain.”" },
        { at: 0.72, label: "4 H 30", text: "End of the window to dissolve the clot." },
        { at: 1, label: "6 H +", text: "Damage often becomes permanent." },
      ],
      text: "Stroke is the second leading cause of death worldwide. With your support, we can change that.",
      cta: "Support Our Mission",
    },
    fast: {
      eyebrow: "Stroke Education",
      title: "Recognize a stroke: the FAST method.",
      intro: "Four checks, a few seconds. One sign is enough to call for help.", // design
      items: [
        { l: "F", t: "Face", d: "Sudden facial drooping or numbness on one side." },
        { l: "A", t: "Arms", d: "Weakness or numbness in one arm — ask the person to raise both arms." },
        { l: "S", t: "Speech", d: "Slurred speech, confusion, or inability to speak or understand." },
        { l: "T", t: "Time", d: "Call emergency services immediately.", em: true },
      ],
      link: "Learn all about stroke →",
    },
    stats: {
      eyebrow: "Stroke in Figures",
      title: "Why time matters.",
      source: "Sources: World Health Organization, World Stroke Organization.",
      items: [
        { unit: " M / year", k: "people worldwide suffer a stroke." },
        { k: "adults will have a stroke in their lifetime." },
        { unit: " %", k: "of strokes are preventable." },
        { unit: "nd", k: "leading cause of death worldwide." },
      ],
    },
    voices: {
      eyebrow: "In Their Words",
      title: "Behind every stroke, a story.",
      text: "We are gathering the first accounts from the people and families supported by Stroke Action. Coming soon.", // design
      link: "See the gallery →",
    },
    finalCta: {
      titlePre: "Join the fight against ",
      titleAccent: "stroke",
      text: "Become a member, give your time, or support the mission — every gesture extends prevention and care, one more person at a time.", // design
      donate: "Donate",
      member: "Become a Member",
      contact: "Contact Us",
    },
  },

  about: {
    crumb: "About Us",
    eyebrow: "About Us",
    title: "Our Story.",
    intro: "Born in Cameroon, united by one goal: defeating stroke.", // design
    story: {
      lead: "Stroke Action — known in French as Action AVC — was founded in Cameroon under Law No. 90-53 of December 19, 1990, relating to freedom of association.",
      p2: "Born from the conviction that stroke is both preventable and treatable, we exist to bridge the gap between medical knowledge and the communities most affected by this devastating condition.",
      p3: "We are a secular, apolitical, non-profit organization serving the public interest.",
      factYear: "2026",
      fact: "The year Stroke Action was founded. The association is governed by Law No. 90-53 of December 19, 1990, relating to freedom of association.",
    },
    quote: {
      text: "Every stroke that occurs in a human life is one stroke too many, whatever its severity.",
      author: "Dr Kamtchum Tatuene Joseph",
      role: "Founder",
    },
    vision: { k: "Our Vision", q: "To be an indispensable support for patients, families, health professionals and researchers who strive every day to defeat stroke." },
    mission: { k: "Our Mission", q: "To significantly reduce the burden of stroke worldwide through education, research, advocacy, and support for patients and their families." },
    values: {
      eyebrow: "Our Values",
      title: "Four principles, upheld every day.",
      items: [
        { t: "Compassion", d: "We put people first — patients, families, and communities — with empathy and humanity." },
        { t: "Dedication", d: "We are committed to our cause with hard work, persistence, and sacrifice." },
        { t: "Integrity", d: "We act with transparency, honesty, and ethical responsibility in everything we do." },
        { t: "Professionalism", d: "We uphold the highest standards in our activities, communications, and partnerships." },
      ],
    },
    mottoLine: "Together to Defeat Stroke.",
    mottoSub: "Ensemble pour Vaincre l'AVC",
    cta: {
      title: "Do you share these convictions?",
      text: "Become a member, give your time, or support the mission — every gesture counts.",
      member: "Become a Member",
      contact: "Contact Us",
    },
  },

  whatWeDo: {
    crumb: "What We Do",
    eyebrow: "What We Do",
    title: "Turning commitment into action.",
    intro:
      "At Stroke Action, we turn commitment into concrete action. Our work is structured around four core areas of action, supported by a fifth objective focused on public engagement, guided by our bylaws and our 2026–2030 Strategic Plan.",
    carousel: {
      region: "Field images",
      prev: "Previous image",
      next: "Next image",
      goto: "Go to image",
    },
    alts: [
      "An older woman looks out through blue-shuttered windows.",
      "A caregiver visits a couple at home; the man leans on crutches.",
      "A home rehabilitation session with hand weights, guided by a caregiver.",
      "A woman helps someone up a set of steps; a wheelchair stands in the foreground.",
      "A man in a wheelchair surrounded by his family in front of their home.",
    ],
    programs: [
      {
        n: "01",
        t: "Public Education",
        s: "Get Informed. Protect Your Brain.",
        b: [
          "Educational material on stroke",
          "Public awareness campaigns and free screening for cardiovascular risk factors",
          "Annual celebration of the World Stroke Day (October 29)",
          "Publication of an educational material",
        ],
      },
      {
        n: "02",
        t: "Scientific Research",
        s: "Evidence-Based Action.",
        b: [
          "Research projects conducted in partnership with academic institutions",
          "Data collection to support the Ministry of Public Health",
          "Support for researchers through funding, logistics, and scientific mentorship",
        ],
      },
      {
        n: "03",
        t: "Professional Training",
        s: "Empowering Healthcare Providers.",
        b: [
          "Seminars on stroke and cardiovascular medicine",
          "Workshops on neuroimaging, cardiac exploration, and neurosonology",
          "Multidisciplinary meetings and consultations",
        ],
      },
      {
        n: "04",
        t: "Patient Support",
        s: "No Patient Left Behind.",
        b: [
          "Stroke Solidarity Fund aiming to achieve the “One Stroke, One Scanner” goal in the long term",
          "Advocacy for stroke patients’ rights and access to care",
          "Stroke Support Line — a dedicated helpline for patients and families",
        ],
      },
      {
        n: "05",
        t: "Patient and public engagement and involvement",
        s: "Growing, Fighting, Winning, Serving, and Celebrating Together.",
        b: [
          "Engaging with the community online and in real life",
          "Welcoming contributions from people of all backgrounds",
          "Partnerships with civil society, companies, and public or private institutions",
        ],
      },
    ],
    metricsTitle: "Our Impact",
    metricsNote: "Metrics will be updated as the association grows.",
    metrics: [
      "Members & Volunteers",
      "Research Projects Conducted",
      "Training Sessions Organized",
      "Patients Supported",
      "Countries Reached",
    ],
    cta: {
      title: "Support our programs.",
      text: "Every contribution extends prevention, training, and patient care.",
      donate: "Donate",
      plan: "Read the strategic plan",
    },
  },

  education: {
    crumb: "Stroke Education",
    eyebrow: "Stroke Education",
    title: "Know Stroke. Act Fast. Save Lives.",
    whatIs: {
      eyebrow: "What is a Stroke?",
      p: "A stroke occurs when blood flow to part of the brain is suddenly interrupted — either due to a blocked artery (ischemic stroke) or a ruptured blood vessel (hemorrhagic stroke). Without blood, brain cells begin to die within minutes.",
      emphasis: "Stroke is a medical emergency. Every minute counts.",
      emergencyLabel: "Emergency — Cameroon",
      emergencyNote: "At any sign of stroke, call immediately — do not wait.",
    },
    fastTitle: "Recognize a Stroke — The FAST Method",
    fast: [
      { l: "F", t: "Face", d: "Sudden facial drooping or numbness on one side." },
      { l: "A", t: "Arms", d: "Weakness or numbness in one arm — ask the person to raise both arms." },
      { l: "S", t: "Speech", d: "Slurred speech, confusion, or inability to speak or understand." },
      { l: "T", t: "Time", d: "Call emergency services immediately! In Cameroon: SAMU 119 (mobile) | Fire 118 | Police 117", em: true },
    ],
    modifTitle: "Modifiable Risk Factors",
    modifSub: "You can act on these.",
    modif: [
      "High blood pressure (hypertension) — the #1 risk factor for stroke",
      "Diabetes",
      "High cholesterol",
      "Smoking",
      "Physical inactivity and obesity",
      "Excessive alcohol consumption",
      "Atrial fibrillation (irregular heartbeat)",
      "Unhealthy diet",
    ],
    nonModifTitle: "Non-Modifiable Risk Factors",
    nonModifSub: "Know them to stay alert.",
    nonModif: [
      "Age (risk increases after 55)",
      "Family history of stroke",
      "Having previously had a stroke or TIA (mini-stroke)",
    ],
    statsEyebrow: "Key Statistics",
    stats: [
      { n: "2nd", t: "leading cause of death worldwide", em: true },
      { n: "1 in 4", t: "adults will have a stroke in their lifetime" },
      { n: "12M", t: "people worldwide suffer a stroke every year" },
      { n: "7.5M", t: "die each year, and 4.5 millions are left permanently disabled", em: true },
      { n: "80%", t: "of strokes are preventable" },
      { n: "Africa", t: "has among the highest stroke incidence and mortality rates in the world" },
    ] as { n: string; t: string; em?: boolean }[],
    knowEyebrow: "Did You Know?",
    knowTitle: "Get informed, take care of your health, protect your brain!",
    know: [
      "High blood pressure is responsible for over 50% of all strokes — yet most people with hypertension don’t know they have it.",
      "A TIA (Transient Ischemic Attack or “mini-stroke”) is a warning sign that a major stroke may follow. It must be treated as an emergency.",
      "Stroke treatment with thrombolysis is only effective if given within 4.5 hours of symptom onset. Every minute matters.",
      "Stroke is the leading cause of acquired disability in adults. With proper rehabilitation, many survivors can regain significant function.",
      "Stroke does not only affect older adults — it can strike at any age, including in young adults and even children.",
    ],
    cta: {
      title: "Share these signs around you.",
      text: "Everyone who knows FAST can save a life. Join the awareness effort.",
      volunteer: "Become a Volunteer",
      campaigns: "Follow our campaigns",
    },
  },

  faq: {
    crumb: "FAQ",
    eyebrow: "FAQ",
    title: "Frequently Asked Questions.",
    metaDesc:
      "Answers to common questions about Stroke Action, stroke prevention and warning signs, our programs, membership, and how to get involved.",
    items: [
      {
        q: "What is Stroke Action?",
        a: "Stroke Action (known in French as Action AVC) is a non-profit organization based in Cameroon. Our mission is to reduce the burden of stroke through public education, scientific research, professional training, and support for patients and their families.",
      },
      {
        q: "How can I support Stroke Action?",
        a: "There are several ways to support us: Donate online via our secure donation link (coming soon) · Become a member by submitting a membership request online · Volunteer your time and skills · Spread the word on social media · Shop our merchandise (stickers and more — coming soon).",
      },
      {
        q: "How can I become a member of Stroke Action?",
        a: "You can submit a membership request via the 'Join Us' form on our website. Once your application is reviewed and approved by the Executive Board, you will receive a confirmation letter. Membership is open to all individuals who share our values.",
      },
      {
        q: "How can I pay my membership contribution?",
        a: "Bank transfer is the primary method of payment for traceability and audit purposes. However, we also accept payments via Mobile Money applications (MTN MoMo, Orange Money). If you pay via a Mobile Money App, please generate a PDF proof of payment and forward it to us by email, WhatsApp, or via the Contact Us form.",
      },
      {
        q: "When is the next General Assembly?",
        a: "General Assembly dates are communicated to members via email and social media. Follow us and check this page regularly for updates.",
      },
      {
        q: "Does Stroke Action provide medical care?",
        a: "No. Stroke Action is not a healthcare facility and does not provide medical care, diagnoses, or prescriptions. If you or someone you know is experiencing a stroke, call emergency services immediately. In Cameroon: SAMU 119 (mobile) | Fire 118 | Police 117.",
      },
      {
        q: "Is Stroke Action a political or religious organization?",
        a: "No. Stroke Action is a secular, apolitical, non-profit organization working for the public good. We welcome members and supporters of all backgrounds.",
      },
      {
        q: "How can I contact Stroke Action?",
        a: "contact@strokeaction.org · +237 652 14 81 47 · Tradex Nkoabang, Yaoundé, Cameroon · Or via our Contact Us form.",
      },
      {
        q: "How can healthcare professionals collaborate with Stroke Action?",
        a: "We welcome collaborations with doctors, nurses, researchers, and other professionals. Contact us at contact@strokeaction.org to discuss partnership opportunities.",
      },
      {
        q: "Where can I find Stroke Action's official documents?",
        a: "Our key documents (bylaws, internal regulations, and publications) are available for download on our Key Documents page.",
      },
    ],
  },

  contact: {
    crumb: "Contact Us",
    eyebrow: "Contact Us",
    title: "Send us a message.",
    intro: "Have a question, a suggestion, or want to get involved? We'd love to hear from you. Fill in the form below or reach us directly.",
    detailsTitle: "Contact Details",
    labelEmail: "Email",
    labelPhone: "Phone / WhatsApp",
    labelAddress: "Address",
    labelWebsite: "Website",
    formName: "Full Name *",
    formPhone: "Phone Number (optional)",
    formEmail: "Email Address *",
    formSubject: "Subject *",
    formMessage: "Message * (you can write in French or in English)",
    formChannel: "How would you like to be contacted?",
    channels: ["Email", "Phone", "WhatsApp"],
    formAttachment: "Attachment (optional)",
    submit: "Send Message",
    note: "Membership requests must be submitted via the dedicated 'Join Us' form on the Support Us page.",
  },

  support: {
    crumb: "Support Us",
    eyebrow: "Support Us",
    title: "Stroke Action exists because of people like you.",
    intro: "People who believe that together, we can defeat stroke. Here is how you can make a difference.",
    ways: [
      {
        id: "don",
        t: "Donate",
        d: "Your donation helps us fund brain imaging for patients in need, run awareness campaigns, organize training sessions, and build a stronger association. Every contribution counts.",
        cta: "Donate Now",
        drawer: "donate",
        strong: true,
      },
      {
        id: "devenir-membre",
        t: "Become a Member",
        d: "Become an official member of Stroke Action and be part of a growing community of passionate individuals committed to fighting stroke in Cameroon, Africa, and worldwide.",
        cta: "Apply for Membership",
        drawer: "membership",
      },
      {
        id: "boutique",
        t: "Shop Our Goodies",
        d: "Purchase Stroke Action merchandise — stickers, books, brochures, and more items coming soon! Every purchase directly supports our mission.",
        cta: "Shop Now (coming soon)",
        disabled: true,
      },
      {
        id: "benevolat",
        t: "Volunteer",
        d: "Are you passionate about the fight against stroke? We welcome volunteers with all kinds of skills, irrespective of their background or profession.",
        cta: "Get Involved",
        drawer: "volunteer",
      },
    ],
    note: "Online payment (Mobile Money + bank card) will be activated at a later stage.",
  },

  documents: {
    crumb: "Key Documents",
    eyebrow: "Key Documents",
    title: "Full transparency.",
    intro: "All official documents of Stroke Action are available here for consultation and download. We are committed to full transparency with our members and the public.",
    statusAvailable: "Available for download",
    statusSoon: "Coming soon",
    items: [
      { title: "Bylaws / Statuts", lang: "FR / EN", ready: true, href: "/documents/statuts-bylaws.pdf" },
      { title: "Internal Regulations / Règlement Intérieur", lang: "FR", ready: true, href: "/documents/reglement-interieur.pdf" },
      { title: "Strategic Plan 2026–2030", lang: "—", ready: false, href: "" },
      { title: "Annual Report", lang: "—", ready: false, href: "" },
      { title: "Presentation Brochure", lang: "—", ready: false, href: "" },
    ],
  },

  gallery: {
    crumb: "Gallery",
    eyebrow: "Gallery",
    title: "Our activities in pictures.",
    metaDesc:
      "Photos of Stroke Action's work on the ground in Cameroon — awareness campaigns, training sessions, and community events.",
    placeholder: "We are just getting started — check back soon for photos from our upcoming events and activities!",
  },

  governance: {
    crumb: "Governance",
    eyebrow: "Governance",
    title: "A dedicated Executive Board.",
    intro:
      "Stroke Action is governed by a dedicated Executive Board committed to transparency, integrity, and impact. The Board is composed of five elected members, each contributing their expertise to advance the association's mission.",
    introLeft: "Our Executive Board brings together dedicated professionals united by a shared commitment to defeat stroke.",
    introRight: "Each member contributes their expertise to ensure Stroke Action fulfills its mission with integrity, transparency, and impact.",
    boardTitle: "Executive Board",
    founderCaptionRole: "Founder",
    readMore: "Read more",
    closeBio: "Close",
    board: [
      {
        role: "President",
        name: "Dr. KAMTCHUM TATUENE Joseph",
        bio: "Neurologist and researcher, founder of Stroke Action.",
        fullBio:
          "Dr. Kamtchum is a Cameroonian physician, Neurologist and Neuroepidemiologist, with expertise in stroke medicine and atherosclerosis. He has a long international clinical and research experience in Cameroon, Switzerland, the United Kingdom, Malawi, and Canada. His scientific achievements have been rewarded by numerous prizes and distinctions. He currently works as a Clinician-Scientist conjointly at the University of Oxford in the UK and the Higher Institute for Scientific and Medical Research in Cameroon.",
        email: "jkamtchum@strokeaction.org",
        photo: "/dr-kamtchum.jpg",
      },
      { role: "Secretary General", name: "To be provided", bio: "Profile to be published soon." },
      {
        role: "Treasurer",
        name: "Dr ADJALAOUL Aristide Autry",
        bio: "Profile to be published soon.",
        email: "aadjalaoul@strokeaction.org",
        photo: "/adjalaoul.jpg",
      },
      {
        role: "Auditor",
        name: "Dr. Ezangono Ndo Bayolo",
        bio: "Cardiologist with expertise in hypertension and cardiovascular and renal risk.",
        fullBio:
          "Dr Ezangono Ndo Bayolo, is a cardiologist trained at the Faculty of Medicine and Biomedical Sciences, University of Yaoundé I. She has a decade-long clinical experience, with special expertise in the management of hypertension and cardiovascular and renal risk.",
        photo: "/ezangono.jpg",
      },
      {
        role: "Advisor",
        name: "Dr. NOUBIAP Jean Jacques",
        bio: "Specialist physician and scientist in global health and cardiovascular diseases; co-author of 300+ scientific publications.",
        fullBio:
          "Dr. Jean Jacques Noubiap is a specialist physician and scientist with expertise in global health and cardiovascular diseases. His research generates evidence to address clinically important questions with direct implications for patient care, public health, and health policy. He has co-authored more than 300 scientific publications and received numerous awards and recognitions from leading organizations, including the American Heart Association, World Heart Federation, and Heart Rhythm Society. Dr. Noubiap brings extensive international experience, having worked across diverse clinical, academic, and research environments in Cameroon, South Africa, Australia, and the United States, with a strong commitment to improving cardiovascular health worldwide.",
        email: "jjnoubiap@strokeaction.org",
        photo: "/noubiap.jpg",
      },
    ],
    note: "Member names and photos to be provided by the client before publication.",
  },

  news: {
    crumb: "Blog / News",
    eyebrow: "Blog / News",
    title: "What's happening at Stroke Action.",
    intro: "Educational articles, awareness campaigns, and events. Published monthly.",
    posts: [
      { cat: "Campaign", t: "World Stroke Day — October 29", d: "The program of awareness activities planned in Yaoundé and online." },
      { cat: "Education", t: "Did You Know? — Hypertension, the silent enemy", d: "Why more than one stroke in two begins with poorly controlled blood pressure." },
      { cat: "Association", t: "Stroke Action recruits its first volunteers", d: "Join the action, whatever your background." },
    ],
    postSoon: "Article coming soon",
    note: "Full articles will be published at the site launch. Indicative content.",
    newsletter: {
      eyebrow: "Newsletter",
      title: "Stay informed.",
      text: "Get our news, campaigns, and events straight to your inbox. No spam.",
      placeholder: "you@example.com",
      cta: "Subscribe",
      note: "Unsubscribe at any time.",
    },
  },

  members: {
    crumb: "Members",
    eyebrow: "Members",
    title: "Coming soon.",
    intro: "The members-only area — internal documents, assembly notices, contribution tracking — is under preparation.",
    body: "In the meantime, you can submit your membership request and contact us with any question.",
    member: "Become a Member",
    contact: "Contact Us",
  },
} as const;
