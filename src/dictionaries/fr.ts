import "server-only";

/** Français — traduction fidèle des textes validés par le Dr Kamtchum (version EN de référence).
 *  Sections issues de la conception (hors document validé) : marquées "// design". */
export const fr = {
  meta: {
    homeTitle: "Stroke Action · Action AVC — Ensemble pour vaincre l'AVC",
    titleTemplate: "%s · Stroke Action AVC",
    description:
      "Stroke Action est une organisation à but non lucratif qui agit pour réduire le fardeau de l'AVC par l'éducation, la recherche, la formation professionnelle et le soutien aux patients et à leurs familles.",
  },

  common: {
    urgencyLabel: "Numéros d'urgence (Cameroun) :",
    samu: "SAMU",
    fire: "Pompiers",
    police: "Police",
    comingSoon: "Bientôt",
    langName: "Français",
    switchTo: "EN",
  },

  drawer: {
    close: "Fermer",
    donate: {
      title: "Faire un don",
      soon: "Bientôt disponible",
      text: "Le paiement en ligne (Mobile Money + carte bancaire) sera activé prochainement. En attendant, écrivez-nous pour faire un don — nous vous accompagnerons.",
      contact: "Nous contacter",
    },
    membership: {
      title: "Demander l'adhésion",
      text: "Le formulaire en ligne arrive bientôt. En attendant, la démarche est simple :",
      steps: [
        "Téléchargez le formulaire ci-dessous.",
        "Remplissez-le : nom complet, date de naissance, e-mail, téléphone, profession, ville / pays, motivation, et une copie d'une pièce d'identité avec photo.",
        "Renvoyez-le à contact@strokeaction.org, ou par WhatsApp au +237 652 14 81 47.",
      ],
      downloadFr: "Formulaire — français (.docx)",
      downloadEn: "Formulaire — anglais (.docx)",
      reviewNote: "Votre candidature sera examinée et approuvée par le bureau exécutif. L'adhésion est ouverte à toute personne partageant nos valeurs.",
    },
    volunteer: {
      title: "Devenir bénévole",
      text: "Le formulaire en ligne arrive bientôt. En attendant, la démarche est simple :",
      steps: [
        "Téléchargez le formulaire ci-dessous.",
        "Remplissez-le : nom complet, date de naissance, e-mail, téléphone, profession, ville / pays, motivation, et une copie d'une pièce d'identité avec photo.",
        "Renvoyez-le à contact@strokeaction.org, ou par WhatsApp au +237 652 14 81 47.",
      ],
      downloadFr: "Formulaire — français (.docx)",
      downloadEn: "Formulaire — anglais (.docx)",
      reviewNote: "Votre candidature sera examinée par le bureau exécutif. Nous accueillons les bénévoles de toutes compétences et de tous horizons qui partagent nos valeurs.",
    },
  },

  nav: {
    home: "Accueil",
    donate: "Faire un don",
    openMenu: "Ouvrir le menu",
    groups: [
      {
        label: "L'association",
        items: [
          { label: "À propos", href: "/a-propos", desc: "Histoire, vision, mission, valeurs" },
          { label: "Nos actions", href: "/nos-actions", desc: "Les cinq programmes" },
          { label: "Gouvernance", href: "/gouvernance", desc: "Le bureau exécutif" },
          { label: "Documents clés", href: "/documents-cles", desc: "Statuts, règlement, plan stratégique" },
        ],
      },
      {
        label: "Comprendre l'AVC",
        items: [
          { label: "Éducation AVC", href: "/education-avc", desc: "Signes, FAST, facteurs de risque" },
          { label: "Le saviez-vous ?", href: "/education-avc#le-saviez-vous", desc: "Idées reçues et faits essentiels" },
          { label: "FAQ", href: "/faq", desc: "Questions fréquentes" },
        ],
      },
      {
        label: "Actualités",
        items: [
          { label: "Blog / Actualités", href: "/actualites", desc: "Articles, campagnes, événements" },
          { label: "Galerie", href: "/galerie", desc: "Photos de nos activités" },
        ],
      },
      {
        label: "S'engager",
        items: [
          { label: "Nous soutenir", href: "/nous-soutenir", desc: "Don, adhésion, boutique, bénévolat" },
          { label: "Devenir membre", href: "/nous-soutenir#devenir-membre", desc: "Formulaire d'adhésion" },
          { label: "Bénévolat", href: "/nous-soutenir#benevolat", desc: "Donner de son temps" },
          { label: "Contact", href: "/contact", desc: "Nous écrire" },
          { label: "Espace membres", href: "/espace-membres", desc: "Réservé aux membres", soon: true },
        ],
      },
    ],
  },

  footer: {
    motto: "Ensemble pour vaincre l'AVC",
    mottoSub: "Together to Defeat Stroke",
    colHome: "Accueil",
    colAssoc: "L'association",
    colUnderstand: "Comprendre l'AVC",
    colNews: "Actualités",
    colInvolved: "S'engager",
    colContact: "Contact",
    rights: "© 2026 Stroke Action. Tous droits réservés.",
    city: "Yaoundé, Cameroun",
    credit: "Site conçu et développé par AD Design",
    social: "Réseaux sociaux : bientôt",
  },

  home: {
    hero: {
      eyebrow: "Stroke Action · Action AVC",
      headline: "Ensemble pour vaincre l'AVC",
      brainline: "Pendant un AVC, le cerveau perd 1,9 million de neurones par minute.", // design
      sub: "Stroke Action est une organisation à but non lucratif qui agit pour réduire le fardeau de l'AVC par l'éducation, la recherche, la formation professionnelle et le soutien aux patients et à leurs familles.",
      ctaPrimary: "En savoir plus",
      ctaSecondary: "Nous rejoindre",
      caption:
        "Photographie documentaire, traitement N&B — à remplacer par des images de terrain de Stroke Action (Yaoundé).", // design
    },
    who: {
      eyebrow: "Qui sommes-nous",
      title: "Une communauté unie contre l'AVC.",
      p1: "Née au Cameroun, Stroke Action rassemble patients, familles, professionnels de santé et chercheurs autour d'un même objectif : vaincre l'AVC.",
      p2: "Nous croyons que par l'éducation, la science et la solidarité, nous pouvons sauver des vies et transformer la réalité de l'AVC en Afrique et au-delà.",
      link: "À propos de Stroke Action →",
    },
    pillars: {
      eyebrow: "Nos piliers",
      title: "Quatre piliers, une conviction.",
      items: [
        { t: "Éducation", d: "Sensibiliser le public aux facteurs de risque de l'AVC, aux signes d'alerte et aux premiers gestes." },
        { t: "Recherche", d: "Mener et soutenir des travaux scientifiques de qualité pour éclairer les politiques de santé." },
        { t: "Formation", d: "Former en continu les professionnels de santé." },
        { t: "Soutien", d: "Apporter un soutien technique, financier et humain aux personnes touchées et à leurs familles." },
      ],
    },
    seconds: {
      title: "Chaque seconde compte.",
      neuronsLabel: "neurones perdus",
      stops: [
        { at: 0, label: "0", text: "Une artère du cerveau se bouche." },
        { at: 0.16, label: "4 MIN", text: "Privées d'oxygène, les premières cellules meurent." },
        { at: 0.42, label: "1 H", text: "≈ 120 millions de neurones perdus. « Time is brain. »" },
        { at: 0.72, label: "4 H 30", text: "Fin de la fenêtre pour dissoudre le caillot." },
        { at: 1, label: "6 H +", text: "Les séquelles deviennent souvent définitives." },
      ],
      text: "L'AVC est la deuxième cause de mortalité dans le monde. Avec votre soutien, nous pouvons changer cela.",
      cta: "Soutenir notre mission",
    },
    fast: {
      eyebrow: "Éducation AVC",
      title: "Reconnaître un AVC : la méthode FAST.",
      intro: "Quatre vérifications, quelques secondes. Un seul signe suffit à appeler les secours.", // design
      items: [
        { l: "F", t: "Face — le visage", d: "Affaissement ou engourdissement soudain d'un côté du visage." },
        { l: "A", t: "Arms — les bras", d: "Faiblesse ou engourdissement d'un bras — demandez de lever les deux bras." },
        { l: "S", t: "Speech — la parole", d: "Parole troublée, confusion, incapacité à parler ou à comprendre." },
        { l: "T", t: "Time — le temps", d: "Appelez immédiatement les secours.", em: true },
      ],
      link: "Tout savoir sur l'AVC →",
    },
    stats: {
      eyebrow: "L'AVC en chiffres",
      title: "Pourquoi le temps compte.",
      source: "Sources : Organisation mondiale de la Santé, World Stroke Organization.",
      items: [
        { unit: " M / an", k: "de personnes victimes d'un AVC dans le monde." },
        { k: "adultes fera un AVC au cours de sa vie." },
        { unit: " %", k: "des AVC sont évitables." },
        { unit: "e", k: "cause de mortalité dans le monde." },
      ],
    },
    voices: {
      eyebrow: "Ils en parlent",
      title: "Derrière chaque AVC, une histoire.",
      text: "Nous recueillons les premiers témoignages des personnes et des familles accompagnées par Stroke Action. À découvrir bientôt.", // design
      link: "Voir la galerie →",
    },
    finalCta: {
      titlePre: "Rejoignez le combat contre ",
      titleAccent: "l'AVC",
      text: "Devenez membre, donnez de votre temps ou soutenez la mission — chaque geste étend la prévention et l'accompagnement, une personne de plus à la fois.", // design
      donate: "Faire un don",
      member: "Devenir membre",
      contact: "Nous contacter",
    },
  },

  about: {
    crumb: "À propos",
    eyebrow: "À propos",
    title: "Notre histoire.",
    intro: "Née au Cameroun, unie par un seul objectif : vaincre l'AVC.", // design
    story: {
      lead: "Stroke Action — connue en français sous le nom d'Action AVC — a été fondée au Cameroun sous le régime de la loi n° 90-53 du 19 décembre 1990 sur la liberté d'association.",
      p2: "Née de la conviction que l'AVC est à la fois évitable et traitable, l'association existe pour combler le fossé entre le savoir médical et les communautés les plus touchées par cette maladie dévastatrice.",
      p3: "Nous sommes une organisation à but non lucratif, laïque et apolitique, d'intérêt général.",
      factYear: "2026",
      fact: "Année de fondation de Stroke Action. L'association est régie par la loi n° 90-53 du 19 décembre 1990 sur la liberté d'association.",
    },
    quote: {
      text: "Chaque AVC qui survient dans la vie d'un être humain est un AVC de trop, quelle qu'en soit la gravité.",
      author: "Dr Kamtchum Tatuene Joseph",
      role: "Fondateur",
    },
    vision: { k: "Notre vision", q: "Être un soutien indispensable pour les patients, les familles, les professionnels de santé et les chercheurs qui œuvrent chaque jour pour vaincre l'AVC." },
    mission: { k: "Notre mission", q: "Réduire significativement le fardeau de l'AVC dans le monde par l'éducation, la recherche, le plaidoyer et le soutien aux patients et à leurs familles." },
    values: {
      eyebrow: "Nos valeurs",
      title: "Quatre principes, tenus au quotidien.",
      items: [
        { t: "Compassion", d: "Nous plaçons l'humain d'abord — patients, familles, communautés — avec empathie et humanité." },
        { t: "Dévouement", d: "Nous servons notre cause avec travail, persévérance et sacrifice." },
        { t: "Intégrité", d: "Nous agissons avec transparence, honnêteté et responsabilité éthique en toute chose." },
        { t: "Professionnalisme", d: "Nous tenons les plus hauts standards dans nos activités, nos communications et nos partenariats." },
      ],
    },
    mottoLine: "Ensemble pour vaincre l'AVC.",
    mottoSub: "Together to Defeat Stroke",
    cta: {
      title: "Vous partagez ces convictions ?",
      text: "Devenez membre, donnez de votre temps ou soutenez la mission — chaque geste compte.",
      member: "Devenir membre",
      contact: "Nous contacter",
    },
  },

  whatWeDo: {
    crumb: "Nos actions",
    eyebrow: "Nos actions",
    title: "Transformer l'engagement en action.",
    intro:
      "À Stroke Action, nous transformons l'engagement en action concrète. Notre travail s'articule autour de quatre domaines d'action, complétés par un cinquième objectif axé sur l'engagement du public, guidés par nos statuts et notre Plan stratégique 2026-2030.",
    carousel: {
      region: "Images de terrain",
      prev: "Image précédente",
      next: "Image suivante",
      goto: "Aller à l'image",
    },
    alts: [
      "Une femme âgée regarde par une fenêtre à volets bleus.",
      "Une soignante rend visite à un couple à domicile ; l'homme s'appuie sur des béquilles.",
      "Séance de rééducation à domicile avec des haltères, accompagnée par un soignant.",
      "Une femme aide une personne à monter des marches ; un fauteuil roulant est au premier plan.",
      "Un homme en fauteuil roulant entouré de sa famille devant leur maison.",
    ],
    programs: [
      {
        n: "01",
        t: "Éducation du public",
        s: "Informez-vous. Protégez votre cerveau.",
        b: [
          "Matériel éducatif sur l'AVC",
          "Campagnes de sensibilisation et dépistage gratuit des facteurs de risque cardiovasculaire",
          "Célébration annuelle de la Journée mondiale de l'AVC (29 octobre)",
          "Publication d'un support éducatif",
        ],
      },
      {
        n: "02",
        t: "Recherche scientifique",
        s: "Une action fondée sur les preuves.",
        b: [
          "Projets de recherche menés en partenariat avec des institutions académiques",
          "Collecte de données au service du Ministère de la Santé publique",
          "Soutien aux chercheurs : financement, logistique et mentorat scientifique",
        ],
      },
      {
        n: "03",
        t: "Formation professionnelle",
        s: "Renforcer les professionnels de santé.",
        b: [
          "Séminaires sur l'AVC et la médecine cardiovasculaire",
          "Ateliers sur la neuro-imagerie, l'exploration cardiaque et la neurosonologie",
          "Rencontres et consultations pluridisciplinaires",
        ],
      },
      {
        n: "04",
        t: "Soutien aux patients",
        s: "Aucun patient laissé de côté.",
        b: [
          "Fonds de solidarité AVC, avec l'objectif à long terme « Un AVC, un scanner »",
          "Plaidoyer pour les droits des patients victimes d'AVC et l'accès aux soins",
          "Ligne d'écoute AVC — une assistance téléphonique dédiée aux patients et à leurs familles",
        ],
      },
      {
        n: "05",
        t: "Implication des patients et du public",
        s: "Grandir, Combattre, Vaincre, Servir et Célébrer, Ensemble.",
        b: [
          "S'engager auprès de la communauté, en ligne et sur le terrain",
          "Contributions bienvenues de personnes de tous horizons",
          "Partenariats avec la société civile, les entreprises et les institutions publiques ou privées",
        ],
      },
    ],
    metricsTitle: "Notre impact",
    metricsNote: "Les indicateurs seront mis à jour au fur et à mesure de la croissance de l'association.",
    metrics: [
      "Membres & bénévoles",
      "Projets de recherche menés",
      "Sessions de formation organisées",
      "Patients accompagnés",
      "Pays touchés",
    ],
    cta: {
      title: "Soutenez nos programmes.",
      text: "Chaque contribution étend la prévention, la formation et l'accompagnement des patients.",
      donate: "Faire un don",
      plan: "Lire le plan stratégique",
    },
  },

  education: {
    crumb: "Éducation AVC",
    eyebrow: "Éducation AVC",
    title: "Connaître l'AVC. Réagir vite. Sauver des vies.",
    whatIs: {
      eyebrow: "Qu'est-ce qu'un AVC ?",
      p: "Un AVC survient lorsque l'irrigation d'une partie du cerveau est brutalement interrompue — soit par une artère bouchée (AVC ischémique), soit par une rupture de vaisseau (AVC hémorragique). Privées de sang, les cellules du cerveau commencent à mourir en quelques minutes.",
      emphasis: "L'AVC est une urgence médicale. Chaque minute compte.",
      emergencyLabel: "Urgences — Cameroun",
      emergencyNote: "Au moindre signe d'AVC, appelez immédiatement — n'attendez pas.",
    },
    fastTitle: "Reconnaître un AVC — La méthode FAST",
    fast: [
      { l: "F", t: "Face — le visage", d: "Affaissement ou engourdissement soudain d'un côté du visage." },
      { l: "A", t: "Arms — les bras", d: "Faiblesse ou engourdissement d'un bras — demandez de lever les deux bras." },
      { l: "S", t: "Speech — la parole", d: "Parole troublée, confusion, incapacité à parler ou à comprendre." },
      { l: "T", t: "Time — le temps", d: "Appelez immédiatement les secours ! Au Cameroun : SAMU 119 (mobile) | Pompiers 118 | Police 117", em: true },
    ],
    modifTitle: "Facteurs de risque modifiables",
    modifSub: "Sur lesquels vous pouvez agir.",
    modif: [
      "Hypertension artérielle — le facteur de risque n° 1 de l'AVC",
      "Diabète",
      "Cholestérol élevé",
      "Tabagisme",
      "Sédentarité et obésité",
      "Consommation excessive d'alcool",
      "Fibrillation auriculaire (rythme cardiaque irrégulier)",
      "Alimentation déséquilibrée",
    ],
    nonModifTitle: "Facteurs de risque non modifiables",
    nonModifSub: "À connaître pour rester vigilant.",
    nonModif: [
      "Âge (le risque augmente après 55 ans)",
      "Antécédents familiaux d'AVC",
      "AVC ou AIT (mini-AVC) antérieur",
    ],
    statsEyebrow: "Chiffres clés",
    stats: [
      { n: "2ᵉ", t: "cause de mortalité dans le monde", em: true },
      { n: "1 sur 4", t: "adultes fera un AVC au cours de sa vie" },
      { n: "12M", t: "de personnes touchées par un AVC chaque année dans le monde" },
      { n: "7,5M", t: "décès chaque année, et 4,5 millions de personnes avec un handicap permanent", em: true },
      { n: "80 %", t: "des AVC sont évitables" },
      { n: "Afrique", t: "l'un des taux d'incidence et de mortalité de l'AVC les plus élevés au monde" },
    ] as { n: string; t: string; em?: boolean }[],
    knowEyebrow: "Le saviez-vous ?",
    knowTitle: "Informez-vous, prenez soin de votre santé, protégez votre cerveau !",
    know: [
      "L'hypertension est responsable de plus de 50 % des AVC — or la plupart des personnes hypertendues l'ignorent.",
      "Un AIT (accident ischémique transitoire, ou « mini-AVC ») est un signal d'alerte annonçant un possible AVC majeur. Il doit être traité comme une urgence.",
      "La thrombolyse n'est efficace que si elle est administrée dans les 4 h 30 suivant l'apparition des symptômes. Chaque minute compte.",
      "L'AVC est la première cause de handicap acquis chez l'adulte. Avec une bonne rééducation, de nombreux survivants récupèrent une fonction significative.",
      "L'AVC ne touche pas que les personnes âgées : il peut survenir à tout âge, y compris chez le jeune adulte et l'enfant.",
    ],
    cta: {
      title: "Partagez ces signes autour de vous.",
      text: "Chaque personne qui connaît FAST peut sauver une vie. Rejoignez la sensibilisation.",
      volunteer: "Devenir bénévole",
      campaigns: "Suivre nos campagnes",
    },
  },

  faq: {
    crumb: "FAQ",
    eyebrow: "FAQ",
    title: "Questions fréquentes.",
    metaDesc:
      "Réponses aux questions fréquentes sur Stroke Action, la prévention et les signes de l'AVC, nos programmes, l'adhésion et comment s'engager.",
    items: [
      {
        q: "Qu'est-ce que Stroke Action ?",
        a: "Stroke Action (connue en français sous le nom d'Action AVC) est une organisation à but non lucratif basée au Cameroun. Sa mission : réduire le fardeau de l'AVC par l'éducation du public, la recherche scientifique, la formation professionnelle et le soutien aux patients et à leurs familles.",
      },
      {
        q: "Comment soutenir Stroke Action ?",
        a: "Plusieurs manières : faire un don en ligne via notre lien sécurisé (bientôt) · devenir membre en soumettant une demande d'adhésion en ligne · donner de votre temps et de vos compétences comme bénévole · relayer nos messages sur les réseaux sociaux · acheter nos produits (autocollants et plus — bientôt).",
      },
      {
        q: "Comment devenir membre de Stroke Action ?",
        a: "Soumettez une demande via le formulaire « Devenir membre » de notre site. Une fois votre candidature examinée et approuvée par le bureau exécutif, vous recevrez une lettre de confirmation. L'adhésion est ouverte à toute personne partageant nos valeurs.",
      },
      {
        q: "Comment régler ma cotisation ?",
        a: "Le virement bancaire est le moyen de paiement privilégié, pour la traçabilité et l'audit. Nous acceptons aussi les paiements via Mobile Money (MTN MoMo, Orange Money). Dans ce cas, générez un justificatif de paiement au format PDF et transmettez-le par e-mail, WhatsApp ou via le formulaire de contact.",
      },
      {
        q: "Quand se tient la prochaine assemblée générale ?",
        a: "Les dates des assemblées générales sont communiquées aux membres par e-mail et sur les réseaux sociaux. Suivez-nous et consultez régulièrement cette page.",
      },
      {
        q: "Stroke Action fournit-elle des soins médicaux ?",
        a: "Non. Stroke Action n'est pas un établissement de santé et ne fournit ni soins, ni diagnostics, ni prescriptions. Si vous-même ou une personne de votre entourage présentez un AVC, appelez immédiatement les secours. Au Cameroun : SAMU 119 (mobile) | Pompiers 118 | Police 117.",
      },
      {
        q: "Stroke Action est-elle une organisation politique ou religieuse ?",
        a: "Non. Stroke Action est une organisation laïque, apolitique et à but non lucratif, œuvrant pour l'intérêt général. Nous accueillons membres et sympathisants de tous horizons.",
      },
      {
        q: "Comment contacter Stroke Action ?",
        a: "contact@strokeaction.org · +237 652 14 81 47 · Tradex Nkoabang, Yaoundé, Cameroun · Ou via notre formulaire de contact.",
      },
      {
        q: "Comment les professionnels de santé peuvent-ils collaborer avec Stroke Action ?",
        a: "Nous accueillons les collaborations avec médecins, infirmiers, chercheurs et autres professionnels. Contactez-nous à contact@strokeaction.org pour discuter des opportunités de partenariat.",
      },
      {
        q: "Où trouver les documents officiels de Stroke Action ?",
        a: "Nos documents clés (statuts, règlement intérieur et publications) sont téléchargeables sur la page Documents clés.",
      },
    ],
  },

  contact: {
    crumb: "Contact",
    eyebrow: "Contact",
    title: "Écrivez-nous.",
    intro: "Une question, une suggestion, l'envie de vous engager ? Nous serons ravis de vous lire. Remplissez le formulaire ci-dessous ou contactez-nous directement.",
    detailsTitle: "Coordonnées",
    labelEmail: "E-mail",
    labelPhone: "Téléphone / WhatsApp",
    labelAddress: "Adresse",
    labelWebsite: "Site",
    formName: "Nom complet *",
    formPhone: "Numéro de téléphone (facultatif)",
    formEmail: "Adresse e-mail *",
    formSubject: "Sujet *",
    formMessage: "Message * (vous pouvez écrire en français ou en anglais)",
    formChannel: "Comment souhaitez-vous être contacté ?",
    channels: ["E-mail", "Téléphone", "WhatsApp"],
    formAttachment: "Pièce jointe (facultatif)",
    submit: "Envoyer le message",
    note: "Les demandes d'adhésion se font via le formulaire dédié « Devenir membre » de la page Nous soutenir.",
  },

  support: {
    crumb: "Nous soutenir",
    eyebrow: "Nous soutenir",
    title: "Stroke Action existe grâce à des personnes comme vous.",
    intro: "Des personnes qui croient qu'ensemble, nous pouvons vaincre l'AVC. Voici comment agir.",
    ways: [
      {
        id: "don",
        t: "Faire un don",
        d: "Votre don finance l'imagerie cérébrale des patients dans le besoin, les campagnes de sensibilisation, l'organisation des formations et le renforcement de l'association. Chaque contribution compte.",
        cta: "Faire un don maintenant",
        drawer: "donate",
        strong: true,
      },
      {
        id: "devenir-membre",
        t: "Devenir membre",
        d: "Devenez membre officiel de Stroke Action et rejoignez une communauté grandissante de personnes engagées contre l'AVC au Cameroun, en Afrique et dans le monde.",
        cta: "Demander l'adhésion",
        drawer: "membership",
      },
      {
        id: "boutique",
        t: "Notre boutique",
        d: "Achetez les produits Stroke Action — autocollants, livres, brochures et d'autres articles bientôt disponibles ! Chaque achat soutient directement notre mission.",
        cta: "Boutique (bientôt)",
        disabled: true,
      },
      {
        id: "benevolat",
        t: "Devenir bénévole",
        d: "Vous êtes motivé·e par la lutte contre l'AVC ? Nous accueillons les bénévoles de toutes compétences, quel que soit leur parcours ou leur profession.",
        cta: "S'impliquer",
        drawer: "volunteer",
      },
    ],
    note: "Le paiement en ligne (Mobile Money + carte bancaire) sera activé ultérieurement.",
  },

  documents: {
    crumb: "Documents clés",
    eyebrow: "Documents clés",
    title: "Transparence totale.",
    intro: "Tous les documents officiels de Stroke Action sont consultables et téléchargeables ici. Nous nous engageons à une transparence totale envers nos membres et le public.",
    statusAvailable: "Disponible au téléchargement",
    statusSoon: "Bientôt",
    items: [
      { title: "Statuts / Bylaws", lang: "FR / EN", ready: true, href: "/documents/statuts-bylaws.pdf" },
      { title: "Règlement intérieur / Internal Regulations", lang: "FR", ready: true, href: "/documents/reglement-interieur.pdf" },
      { title: "Plan stratégique 2026–2030", lang: "—", ready: false, href: "" },
      { title: "Rapport annuel", lang: "—", ready: false, href: "" },
      { title: "Brochure de présentation", lang: "—", ready: false, href: "" },
    ],
  },

  gallery: {
    crumb: "Galerie",
    eyebrow: "Galerie",
    title: "Nos activités en images.",
    metaDesc:
      "Photos des activités de Stroke Action sur le terrain au Cameroun — campagnes de sensibilisation, formations et événements communautaires.",
    placeholder: "Nous débutons — revenez bientôt pour les photos de nos prochains événements et activités !",
  },

  governance: {
    crumb: "Gouvernance",
    eyebrow: "Gouvernance",
    title: "Un bureau exécutif engagé.",
    intro:
      "Stroke Action est dirigée par un bureau exécutif dédié, engagé pour la transparence, l'intégrité et l'impact. Le bureau est composé de cinq membres élus, chacun apportant son expertise pour faire avancer la mission de l'association.",
    introLeft: "Notre bureau exécutif rassemble des professionnels dévoués, unis par un même engagement pour vaincre l'AVC.",
    introRight: "Chaque membre apporte son expertise pour que Stroke Action remplisse sa mission avec intégrité, transparence et impact.",
    boardTitle: "Bureau exécutif",
    founderCaptionRole: "Fondateur",
    readMore: "Voir plus",
    closeBio: "Fermer",
    board: [
      {
        role: "Président",
        name: "Dr KAMTCHUM TATUENE Joseph",
        bio: "Neurologue et chercheur, fondateur de Stroke Action.",
        fullBio:
          "Le Dr Kamtchum est médecin camerounais, neurologue et épidémiologiste, expert des accidents vasculaires cérébraux et de l'athérosclérose. Il possède une longue expérience internationale de pratique clinique et de recherche obtenue au Cameroun, en Suisse, en Angleterre, au Malawi et au Canada. Ses travaux scientifiques ont été récompensés par de nombreux prix et distinctions. À présent, il exerce ses activités de clinicien-chercheur conjointement à l'Université d'Oxford en Angleterre et à l'Institut Supérieur de Recherche Scientifique et Médicale au Cameroun.",
        email: "jkamtchum@strokeaction.org",
        photo: "/dr-kamtchum.jpg",
      },
      {
        role: "Secrétaire général",
        name: "M. FOGUE TEFFE Emmanuel",
        bio: "Technicien d'assurance spécialisé en assurance dommages ; enseignant à l'INUCASTY.",
        fullBio:
          "M. FOGUE TEFFE Emmanuel est Technicien d'assurance spécialisé dans le conseil et la gestion des contrats d'Assurance Dommages. Il possède en outre une longue expérience dans le domaine du courtage. Il offre également des prestations en entreprise pour des formations et séminaires en sciences managériales. Actuellement, il dispense des cours d'assurance à l'Institut Universitaire Catholique Sainte Thérèse de Yaoundé (INUCASTY).",
      },
      {
        role: "Trésorier",
        name: "Dr ADJALAOUL Aristide Autry",
        bio: "Profil à publier prochainement.",
        email: "aadjalaoul@strokeaction.org",
        photo: "/adjalaoul.jpg",
      },
      {
        role: "Contrôleur de gestion",
        name: "Dr Ezangono Ndo Bayolo",
        bio: "Cardiologue, experte en hypertension et en risque cardiovasculaire et rénal.",
        fullBio:
          "Le Dr Ezangono Ndo Bayolo est médecin cardiologue diplômée de la Faculté de Médecine et des Sciences Biomédicales de l'Université de Yaoundé I. Elle dispose d'une décennie de pratique clinique avec une expertise particulière dans la prise en charge de l'hypertension, et du risque cardiovasculaire et rénal.",
        photo: "/ezangono.jpg",
      },
      {
        role: "Conseiller",
        name: "Dr. NOUBIAP Jean Jacques",
        bio: "Médecin spécialiste et chercheur en santé mondiale et maladies cardiovasculaires ; co-auteur de plus de 300 publications scientifiques.",
        fullBio:
          "Le Dr Jean Jacques Noubiap est médecin spécialiste et chercheur, expert en santé mondiale et maladies cardiovasculaires. Ses recherches produisent des données probantes pour répondre à des questions cliniquement importantes, avec des implications directes pour les soins aux patients, la santé publique et les politiques de santé. Il est co-auteur de plus de 300 publications scientifiques et a reçu de nombreuses distinctions de la part d'organisations de premier plan, notamment l'American Heart Association, la World Heart Federation et la Heart Rhythm Society. Le Dr Noubiap possède une vaste expérience internationale, ayant travaillé dans des environnements cliniques, universitaires et de recherche variés au Cameroun, en Afrique du Sud, en Australie et aux États-Unis, avec un engagement fort pour l'amélioration de la santé cardiovasculaire dans le monde.",
        email: "jjnoubiap@strokeaction.org",
        photo: "/noubiap.jpg",
      },
    ],
    note: "Les noms et photographies des membres seront fournis par le client avant publication.",
  },

  news: {
    crumb: "Blog / Actualités",
    eyebrow: "Blog / Actualités",
    title: "Ce qui se passe à Stroke Action.",
    intro: "Articles éducatifs, campagnes de sensibilisation et événements. Publication mensuelle.",
    posts: [
      { cat: "Campagne", t: "Journée mondiale de l'AVC — 29 octobre", d: "Le programme des actions de sensibilisation prévues à Yaoundé et en ligne." },
      { cat: "Éducation", t: "Le saviez-vous ? — L'hypertension, ennemie silencieuse", d: "Pourquoi plus d'un AVC sur deux commence par une tension mal contrôlée." },
      { cat: "Association", t: "Stroke Action recrute ses premiers bénévoles", d: "Rejoindre l'action, quel que soit votre parcours." },
    ],
    postSoon: "Article à venir",
    note: "Les articles complets seront publiés au lancement du site. Contenus indicatifs.",
    newsletter: {
      eyebrow: "Newsletter",
      title: "Restez informé.",
      text: "Recevez nos actualités, nos campagnes et nos événements dans votre boîte mail. Pas de spam.",
      placeholder: "vous@exemple.com",
      cta: "S'abonner",
      note: "Désabonnement à tout moment.",
    },
  },

  members: {
    crumb: "Espace membres",
    eyebrow: "Espace membres",
    title: "Bientôt disponible.",
    intro: "L'espace réservé aux membres — documents internes, convocations aux assemblées, suivi de cotisation — est en préparation.",
    body: "En attendant, vous pouvez soumettre votre demande d'adhésion et nous contacter pour toute question.",
    member: "Devenir membre",
    contact: "Nous contacter",
  },
} as const;
