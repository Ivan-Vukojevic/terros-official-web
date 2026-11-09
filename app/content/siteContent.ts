export const siteContent = {
  navigation: [
    { label: 'Početna', id: 'home' },
    { label: 'O nama', id: 'about' },
    { label: 'Usluge', id: 'services' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Galerija', id: 'gallery' },
    { label: 'Kontakt', id: 'contact' },
  ],
  company: {
    name: 'Terros d.o.o.',
    region: 'Slavonija i Baranja, Hrvatska',
    address: 'Osječka Ulica 10, 31000 Sarvaš',
    oib: '29008566778',
    registrationCourt: 'Trgovački sud u Osijeku',
    companyNumber: '0621935',
    activityCode: '43120',
    director: 'Alen Vukojević, direktor',
    phone: '091 154 6041',
    email: 'terrosdoo@gmail.com',
  },
  about: {
    eyebrow: 'O nama',
    heading: 'Gradimo na čvrstim temeljima',
    paragraphs: [
      'Terros d.o.o. je vaš pouzdani partner za profesionalne zemljane radove i građevinsku logistiku. Specijaliziramo se za visokokvalitetni iskop i pripremu terena uz pomoć moderne mehanizacije koja osigurava preciznost i isporuku u dogovorenom roku.',
      'S godinama iskustva u industriji, kombiniramo tehničku stručnost s predanošću sigurnosti i učinkovitosti, što nas čini preferiranim izborom za projekte svih veličina.',
    ],
    image: '/images/ravnanje-zemljista-bagerom-terros.avif',
    imageAlt: 'Ravnanje zemljišta bagerom - Terros d.o.o.',
    features: [
      'Moderna flota strojeva',
      'Iskusni operateri',
      'Garancija isporuke na vrijeme',
      'Osiguranje kvalitete',
    ],
  },
  hero: {
    desktop: {
      title: 'Profesionalni Zemljani Radovi i Građevinska Logistika',
      subtitle: 'Vaš pouzdani partner za iskop, pripremu terena i prijevoz materijala.',
      primaryCta: 'Kontaktirajte nas',
      secondaryCta: 'Naše usluge',
      backgroundImage: '/images/rusenje-stare-kuce-bagerom-terros.avif',
    },
    mobile: {
      eyebrow: 'Slavonija i Baranja',
      title: 'Zemljani radovi i građevinska logistika',
      subtitle: 'Vaš pouzdani partner za iskop, pripremu terena i prijevoz materijala.',
      primaryCta: 'Kontaktirajte nas',
      secondaryCta: 'Pogledaj usluge',
      backgroundImage: '/images/rusenje-stare-kuce-bagerom-terros.avif',
    },
  },
  services: {
    eyebrow: 'Naše usluge',
    heading: 'Sveobuhvatna rješenja zemljanih radova',
    description: 'Od iskopa do prijevoza materijala, pružamo sve usluge koje su vam potrebne za uspješnu realizaciju projekta.',
    items: [
      {
        slug: 'strojni-iskop',
        iconKey: 'hardhat',
        title: 'Strojni iskop',
        description: 'Temelji, rovovi, bazeni i priprema infrastrukture s preciznošću i učinkovitošću.',
      },
      {
        slug: 'prijevoz-materijala',
        iconKey: 'truck',
        title: 'Prijevoz materijala',
        description: 'Brza dostava pijeska, šljunka, kamena i zemlje na vaše gradilište.',
      },
      {
        slug: 'odvoz-otpada',
        iconKey: 'trash',
        title: 'Odvoz otpada',
        description: 'Pravilno zbrinjavanje građevinskog otpada i viška materijala sukladno propisima.',
      },
      {
        slug: 'oblikovanje-terena',
        iconKey: 'land',
        title: 'Oblikovanje terena',
        description: 'Nivelacija zemljišta, čišćenje i priprema parcele za građevinske projekte.',
      },
    ],
  },
  gallery: {
    eyebrow: 'Naši radovi',
    heading: 'Oprema i projekti',
    description: 'Pogledajte našu modernu flotu strojeva i završene projekte.',
    featuredImageSrc: '/images/rezanje-betona-pilom-terros.avif',
    mergedLabels: {
      'Usluge transporta s dizalicom / Prijevoz i dizalica': 'Usluge transporta s dizalicom / Dostava i istovar materijala',
      'Dostava i istovar materijala / Prijevoz i dizalica': 'Usluge transporta s dizalicom / Dostava i istovar materijala',
    },
    images: [
      { src: '/images/gradevinsko-rusenje-starih-kuca-terros.avif', alt: 'Građevinsko rušenje starih kuća - Terros d.o.o.', label: 'Rušenje i uklanjanje objekata / Rušenje objekata' },
      { src: '/images/rusenje-objekata-i-uklanjanje-sute-terros.avif', alt: 'Rušenje objekata i uklanjanje šute - Terros d.o.o.', label: 'Rušenje i uklanjanje objekata / Rušenje objekata' },
      { src: '/images/kopanje-kanalizacije-dvoriste-terros.avif', alt: 'Kopanje kanalizacije - dvorište', label: 'Iskopi za infrastrukturu / Priključci' },
      { src: '/images/rezanje-betona-pilom-terros.avif', alt: 'Rezanje betona pilom - Terros', label: 'Iskopi za infrastrukturu / Priključci' },
      { src: '/images/prikljucak-na-kanalizaciju-vila-terros.avif', alt: 'Priključak na kanalizaciju - vila', label: 'Iskopi za infrastrukturu / Priključci' },
      { src: '/images/iskop-kanalizacije-kopacevo-terros.avif', alt: 'Iskop kanalizacije - Kopačevo', label: 'Iskopi za infrastrukturu / Priključci' },
      { src: '/images/dovoz-i-istovar-tucanika-kamionom-terros.avif', alt: 'Dovoz i istovar tucanika kamionom - Terros', label: 'Dostava i istovar materijala / Prijevoz i dizalica' },
      { src: '/images/izvanredni-prijevoz-tereta-terros.avif', alt: 'Izvanredni prijevoz tereta - Terros', label: 'Usluge transporta s dizalicom / Prijevoz i dizalica' },
      { src: '/images/vadenje-panjeva-bagerom-terros.avif', alt: 'Vađenje panjeva bagerom - Terros', label: 'Uređenje dvorišta i zemljani radovi / Oblikovanje terena' },
      { src: '/images/odvoz-gradevinskog-otpada-terros.avif', alt: 'Odvoz građevinskog otpada - Terros', label: 'Odvoz građevinskog otpada / Odvoz otpada' },
    ],
  },
  contact: {
    eyebrow: 'Stupite u kontakt',
    heading: 'Kontaktirajte nas',
    description: 'Spremni pokrenuti projekt? Javite nam se danas za besplatne konzultacije.',
    details: [
      { label: 'Telefon', value: '091 154 6041', type: 'phone' },
      { label: 'E-pošta', value: 'terrosdoo@gmail.com', type: 'email' },
      { label: 'Područje usluge', value: 'Slavonija i Baranja', type: 'location' },
    ],
    form: {
      nameRequired: 'Ime je obavezno',
      nameInvalid: 'Unesite ime i prezime (najmanje 2 znaka)',
      phoneRequired: 'Telefon je obavezan',
      phoneInvalid: 'Unesite ispravan broj telefona',
      messageRequired: 'Poruka je obavezna',
      messageMin: 'Poruka mora imati najmanje 10 znakova',
      messageMax: 'Poruka je preduga (maksimalno 2000 znakova)',
      success: 'Poruka uspješno poslana! Kontaktirat ćemo vas uskoro.',
      error: 'Došlo je do greške prilikom slanja poruke. Pokušajte ponovno.',
      rateLimited: 'Poslali ste previše upita u kratkom vremenu. Pokušajte ponovno za nekoliko minuta.',
      submit: 'Pošalji poruku',
      fieldLabels: {
        name: 'Ime *',
        phone: 'Telefon *',
        message: 'Poruka *',
      },
      placeholders: {
        name: 'Vaše ime',
        phone: 'Vaš broj telefona',
        message: 'Opišite nam vaš projekt',
      },
      subject: 'Nova poruka sa web stranice',
    },
  },
  faq: {
    eyebrow: 'Česta pitanja',
    heading: 'Pitanja koja klijenti najčešće postavljaju',
    description: 'Kratki odgovori o uslugama, području rada i načinu slanja upita.',
    items: [
      {
        question: 'Koje usluge pruža Terros d.o.o.?',
        answer:
          'Pružamo strojni iskop, prijevoz materijala, odvoz građevinskog otpada, rušenje i oblikovanje terena za privatne i poslovne projekte.',
      },
      {
        question: 'Radite li na području Slavonije i Baranje?',
        answer:
          'Da. Primarno radimo na području Slavonije i Baranje, a po dogovoru organiziramo i radove za okolne regije.',
      },
      {
        question: 'Kako mogu zatražiti ponudu?',
        answer:
          'Nazovite nas, pošaljite e-mail ili ispunite kontakt formu na webu. Nakon upita vraćamo se s procjenom i terminom.',
      },
      {
        question: 'Koliko brzo možete izaći na teren?',
        answer:
          'Vrijeme izlaska ovisi o vrsti radova i raspoloživosti mehanizacije, ali upite obrađujemo prioritetno i brzo javljamo prvi mogući termin.',
      },
    ],
  },
  servicePages: {
    'strojni-iskop': {
      title: 'Strojni iskop',
      seoTitle: 'Strojni iskop Osijek | Zemljani radovi u Slavoniji i Baranji',
      seoDescription:
        'Strojni iskop za temelje, rovove, bazene i infrastrukturu na području Osijeka, Slavonije i Baranje. Terros d.o.o. izvodi precizne zemljane radove za privatne i poslovne projekte.',
      intro:
        'Izvodimo strojni iskop za privatne, poslovne i infrastrukturne projekte uz modernu mehanizaciju i iskusne operatere.',
      benefits: [
        'Iskop temelja, rovova i bazena',
        'Priprema terena za gradnju',
        'Brza organizacija i dolazak na teren',
        'Radovi prilagođeni uvjetima gradilišta',
      ],
      keywords: ['strojni iskop', 'iskop temelja', 'zemljani radovi osijek', 'strojni iskop slavonija'],
    },
    'prijevoz-materijala': {
      title: 'Prijevoz materijala',
      seoTitle: 'Prijevoz materijala Osijek | Dostava pijeska, šljunka i kamena',
      seoDescription:
        'Pouzdan prijevoz i dostava građevinskog materijala: pijesak, šljunak, kamen i zemlja na području Osijeka, Slavonije i Baranje.',
      intro:
        'Organiziramo dostavu i istovar građevinskog materijala prema dinamici vašeg projekta i potrebama gradilišta.',
      benefits: [
        'Dostava pijeska, šljunka, kamena i zemlje',
        'Prijevoz prilagođen terminu izvođenja radova',
        'Pouzdan dolazak i istovar na lokaciji',
        'Podrška za manje i veće projekte',
      ],
      keywords: ['prijevoz materijala', 'dostava šljunka', 'dostava kamena osijek', 'prijevoz materijala slavonija'],
    },
    'odvoz-otpada': {
      title: 'Odvoz otpada',
      seoTitle: 'Odvoz građevinskog otpada Osijek | Slavonija i Baranja',
      seoDescription:
        'Odvoz građevinskog otpada i viška materijala uz odgovorno zbrinjavanje na području Osijeka, Slavonije i Baranje. Terros d.o.o. osigurava pouzdan termin i uredno čišćenje gradilišta.',
      intro:
        'Osiguravamo organiziran odvoz i zbrinjavanje građevinskog otpada u skladu s važećim pravilima i zahtjevima gradilišta.',
      benefits: [
        'Odvoz šute i viška materijala',
        'Uredno i sigurno čišćenje gradilišta',
        'Usluga za adaptacije i nova gradilišta',
        'Pouzdan raspored i termin odvoza',
      ],
      keywords: ['odvoz građevinskog otpada', 'odvoz šute', 'odvoz otpada osijek', 'odvoz otpada slavonija'],
    },
    'oblikovanje-terena': {
      title: 'Oblikovanje terena',
      seoTitle: 'Oblikovanje terena Osijek | Nivelacija i priprema parcele',
      seoDescription:
        'Nivelacija zemljišta, čišćenje i priprema parcele za gradnju na području Osijeka, Slavonije i Baranje. Usluga oblikovanja terena za privatne i poslovne projekte.',
      intro:
        'Pružamo uslugu oblikovanja i nivelacije terena kako bi parcela bila spremna za siguran i učinkovit početak radova.',
      benefits: [
        'Nivelacija i poravnanje zemljišta',
        'Uklanjanje prepreka i priprema parcele',
        'Priprema za građevinske i krajobrazne radove',
        'Precizan rad modernom mehanizacijom',
      ],
      keywords: ['oblikovanje terena', 'nivelacija zemljišta', 'uređenje dvorišta bagerom', 'oblikovanje terena osijek'],
    },
  },
  footer: {
    quickLinks: [
      { label: 'Početna', id: 'home' },
      { label: 'O nama', id: 'about' },
      { label: 'Usluge', id: 'services' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Galerija', id: 'gallery' },
      { label: 'Kontakt', id: 'contact' },
    ],
    legalTexts: [
      {
        title: 'Pravila privatnosti (GDPR)',
        body: 'Sukladno Općoj uredbi o zaštiti podataka (GDPR), osobni podaci prikupljeni putem kontakt forme obrađuju se isključivo u svrhu realizacije upita i poslovne komunikacije tvrtke Terros d.o.o. Podaci se čuvaju u skladu sa zakonskim rokovima.',
      },
      {
        title: 'Uvjeti i prigovori',
        body: 'Sukladno Zakonu o zaštiti potrošača, pisani prigovor na kvalitetu naših usluga možete podnijeti putem e-maila ili preporučenom poštom na adresu sjedišta Terros d.o.o. Odgovor u pisanom obliku dostavljamo u roku od 15 dana.',
      },
    ],
  },
};
