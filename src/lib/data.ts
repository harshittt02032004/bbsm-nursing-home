export type Group = "Daily OPD" | "Super Speciality" | "Visiting";

export type Doctor = {
  slug: string;
  name: string;
  role: string;
  title: string;
  group: Group;
  availability: string;
  days: string;
  time: string;
  institution?: string;
  legacy?: boolean;
  forWhat: string;
  expertise: string;
  specialities: string[];
  portrait?: string;
  /** CSS object-position that keeps the face in frame when the photo is cropped */
  portraitPosition?: string;
};

export type Speciality = {
  slug: string;
  name: string;
  short: string;
  doctors: string[];
  timing: string;
  desc: string;
  intro: string;
  conditions: string[];
  whenToVisit: string[];
  image?: string;
  /** CSS object-position for the image when it is cropped */
  imagePosition?: string;
  imageAlt: string;
  keyword: string;
};

export const DOCTORS: Doctor[] = [
  {
    slug: "dr-omkar-singh-bhadoria",
    name: "Dr. Omkar Singh Bhadoria",
    role: "Orthopaedics & Spine | Bone, Joint & Spine Surgeon",
    title: "Bone, Joint & Spine Surgeon",
    group: "Daily OPD",
    availability: "Every Day | 10:00 AM – 4:00 PM",
    days: "Every Day",
    time: "10 AM – 4 PM",
    forWhat: "Knee pain, back pain, fractures, arthritis, joint replacement, slip disc, spinal disorders, sports injuries",
    expertise:
      "Surgical and non-surgical treatment of bone fractures, joint pain, arthritis, knee and hip conditions, slip disc, spinal disorders, and sports injuries. Expert in orthopaedic surgery for the complete musculoskeletal system.",
    specialities: ["orthopaedics"],
  },
  {
    slug: "dr-shailaja-singh",
    name: "Dr. Shailaja Singh",
    role: "Eye Specialist & Surgeon | Ophthalmologist",
    title: "Eye Specialist & Surgeon",
    group: "Daily OPD",
    availability: "Every Day | 10:00 AM – 4:00 PM",
    days: "Every Day",
    time: "10 AM – 4 PM",
    legacy: true,
    forWhat: "Vision problems, eye pain, cataract, spectacles, eye infections, diabetic eye check-ups",
    expertise:
      "Comprehensive eye examinations, cataract evaluation, glaucoma, diabetic retinopathy, dry eyes, eye infections. Surgical eye care.",
    specialities: ["eye-care"],
    portrait: "/images/dr-shailaja-singh.jpg",
    portraitPosition: "46% 34%",
  },
  {
    slug: "dr-shivendra-singh",
    name: "Dr. Shivendra Singh",
    role: "Gastro-Onco Surgeon",
    title: "Gastro-Onco Surgeon",
    group: "Super Speciality",
    availability: "Last Sunday of Month | 9:00 AM – 12:00 PM",
    days: "Last Sunday",
    time: "9 AM – 12 PM",
    institution: "Rajiv Gandhi Cancer Institute & Research Centre, New Delhi",
    forWhat: "GI cancers, stomach/abdominal oncology surgery, second opinions on cancer diagnosis",
    expertise: "Surgical treatment of cancers of the stomach, intestine, liver, pancreas, and GI tract.",
    specialities: ["oncology"],
    portrait: "/images/dr-shivendra-singh.jpg",
    portraitPosition: "58% 5%",
  },
  {
    slug: "dr-preeti-singh",
    name: "Dr. Preeti Singh",
    role: "IVF Specialist | Gynaecologist & Obstetrician",
    title: "IVF Specialist, Gynaecologist & Obstetrician",
    group: "Super Speciality",
    availability: "Last Sunday of Month | 9:00 AM – 12:00 PM",
    days: "Last Sunday",
    time: "9 AM – 12 PM",
    forWhat: "IVF, infertility, irregular periods, pregnancy care, gynaecological concerns",
    expertise: "IVF, infertility evaluation, high-risk pregnancies, antenatal care, gynaecological procedures.",
    specialities: ["gynaecology-ivf"],
  },
  {
    slug: "dr-amitabh-singh",
    name: "Dr. Amitabh Singh",
    role: "Uro Surgeon",
    title: "Uro Surgeon",
    group: "Super Speciality",
    availability: "Last Sunday of Month | 9:00 AM – 12:00 PM",
    days: "Last Sunday",
    time: "9 AM – 12 PM",
    institution: "Rajiv Gandhi Cancer Institute & Research Centre, New Delhi",
    forWhat: "Kidney stones, prostate, urinary issues, blood in urine, urological cancer",
    expertise: "Urological surgery: kidney, bladder, prostate, ureter. Urological oncology.",
    specialities: ["urology", "oncology"],
    portrait: "/images/dr-amitabh-singh.jpg",
    portraitPosition: "50% 35%",
  },
  {
    slug: "dr-vineet-talwar",
    name: "Dr. Vineet Talwar",
    role: "Medical Oncologist",
    title: "Medical Oncologist",
    group: "Super Speciality",
    availability: "Last Sunday of Month | 9:00 AM – 12:00 PM",
    days: "Last Sunday",
    time: "9 AM – 12 PM",
    institution: "Rajiv Gandhi Cancer Institute & Research Centre, New Delhi",
    forWhat: "Cancer diagnosis, chemotherapy, second opinions, ongoing cancer treatment",
    expertise: "Non-surgical cancer management: chemotherapy, targeted therapy, immunotherapy, staging.",
    specialities: ["oncology"],
  },
  {
    slug: "dr-gyanendra-singh",
    name: "Dr. Gyanendra Singh",
    role: "Physician | General & Internal Medicine",
    title: "Physician — General & Internal Medicine",
    group: "Visiting",
    availability: "Every Day | Visiting",
    days: "Every Day",
    time: "Visiting",
    forWhat: "Fever, diabetes, blood pressure, general health, chronic disease",
    expertise: "Fevers, infections, diabetes, hypertension, thyroid, general medical conditions.",
    specialities: ["general-medicine"],
    portrait: "/images/dr-gyanendra-singh.jpg",
    portraitPosition: "50% 5%",
  },
  {
    slug: "dr-pranjal-chaurasia",
    name: "Dr. Pranjal Chaurasia",
    role: "Physician | General & Internal Medicine",
    title: "Physician — General & Internal Medicine",
    group: "Visiting",
    availability: "Every Day | Visiting",
    days: "Every Day",
    time: "Visiting",
    forWhat: "General consultations, check-ups, infections, lifestyle disease",
    expertise: "Acute and chronic conditions, preventive health, day-to-day medical management.",
    specialities: ["general-medicine"],
  },
  {
    slug: "dr-amit-raj-sharma",
    name: "Dr. Amit Raj Sharma",
    role: "Chest & Respiratory Specialist",
    title: "Chest & Respiratory Specialist",
    group: "Visiting",
    availability: "Every Day | Visiting",
    days: "Every Day",
    time: "Visiting",
    forWhat: "Asthma, COPD, TB, breathlessness, chest infections",
    expertise: "Asthma, COPD, bronchitis, tuberculosis, chest infections, breathlessness.",
    specialities: ["chest-respiratory"],
    portrait: "/images/dr-amit-raj-sharma.jpg",
    portraitPosition: "50% 45%",
  },
  {
    slug: "dr-nitish-gupta",
    name: "Dr. Nitish Gupta",
    role: "Laparoscopic & Endocrine Surgeon",
    title: "Laparoscopic & Endocrine Surgeon",
    group: "Visiting",
    availability: "Every Day | Visiting",
    days: "Every Day",
    time: "Visiting",
    forWhat: "Thyroid, gallstones, hernia, laparoscopic surgery, endocrine conditions",
    expertise: "Minimally invasive surgery: gallbladder, hernia, appendix. Thyroid, parathyroid, adrenal.",
    specialities: ["laparoscopic-endocrine"],
  },
  {
    slug: "dr-mahima-mishra",
    name: "Dr. Mahima Mishra",
    role: "Neuro-Psychiatrist",
    title: "Neuro-Psychiatrist",
    group: "Visiting",
    availability: "Every Day | Visiting",
    days: "Every Day",
    time: "Visiting",
    forWhat: "Anxiety, depression, sleep disorders, epilepsy, neurological concerns",
    expertise: "Anxiety, depression, OCD, psychosis, bipolar, headaches, sleep disorders, epilepsy.",
    specialities: ["neurology-psychiatry"],
    portrait: "/images/dr-mahima-mishra.jpg",
    portraitPosition: "50% 8%",
  },
];

export const doctorBySlug = (slug: string) => DOCTORS.find((d) => d.slug === slug);
export const doctorByName = (name: string) => DOCTORS.find((d) => d.name === name);

export const SPECIALITIES: Speciality[] = [
  {
    slug: "orthopaedics",
    name: "Orthopaedics & Spine",
    short: "Orthopaedics",
    doctors: ["Dr. Omkar Singh Bhadoria"],
    timing: "Daily | 10–4 PM",
    desc: "Surgical and non-surgical treatment of bone fractures, joint pain, arthritis, knee and hip conditions, slip disc, spinal disorders, and sports injuries.",
    intro:
      "Bones, joints and the spine carry us through every working day. At BBSM Nursing Home, orthopaedic care is available every day of the week — from a first consultation for knee or back pain to fracture management and orthopaedic surgery, under one roof in Raebareli.",
    conditions: ["Knee and hip pain", "Arthritis", "Fractures and injuries", "Slip disc and back pain", "Spinal disorders", "Sports injuries", "Joint replacement evaluation"],
    whenToVisit: [
      "Joint pain that lasts more than a few weeks or wakes you at night",
      "Swelling, stiffness or a joint that locks or gives way",
      "Back pain that travels down the leg, or numbness and tingling",
      "Any fall or injury followed by pain, deformity or difficulty bearing weight",
    ],
    image: "/images/consult-ortho.jpg",
    imageAlt: "Orthopaedic consultation at BBSM Nursing Home, Raebareli",
    keyword: "Orthopaedic doctor in Raebareli",
  },
  {
    slug: "eye-care",
    name: "Eye Care & Ophthalmology",
    short: "Eye Care",
    doctors: ["Dr. Shailaja Singh"],
    timing: "Daily | 10–4 PM",
    desc: "Comprehensive eye examinations, cataract evaluation, glaucoma, diabetic retinopathy, dry eyes and eye infections, with surgical eye care.",
    intro:
      "Clear sight is something most of us take for granted until it changes. BBSM's daily eye OPD offers complete eye examinations, spectacle checks and surgical eye care — led by Dr. Shailaja Singh, daughter of our founder, in the same walls he built.",
    conditions: ["Cataract", "Glaucoma", "Diabetic eye disease", "Dry eyes", "Eye infections and redness", "Spectacle and vision checks"],
    whenToVisit: [
      "Blurred, cloudy or double vision, or glare while driving at night",
      "Eye pain, redness or discharge that does not settle",
      "Diabetes or high blood pressure — a yearly eye check is advised",
      "Children who squint, sit close to screens or struggle to read the board",
    ],
    image: "/images/consult-eye.jpg",
    imageAlt: "Eye examination on a slit lamp at BBSM Nursing Home, Raebareli",
    keyword: "Eye specialist in Raebareli",
  },
  {
    slug: "oncology",
    name: "Cancer & Oncology",
    short: "Oncology",
    doctors: ["Dr. Shivendra Singh", "Dr. Amitabh Singh", "Dr. Vineet Talwar"],
    timing: "Last Sunday | 9–12 PM",
    desc: "Surgical and medical oncology from senior specialists of Rajiv Gandhi Cancer Institute & Research Centre, New Delhi — diagnosis, staging, chemotherapy and second opinions.",
    intro:
      "A cancer diagnosis should not mean a long journey before the first expert opinion. Every last Sunday of the month, senior specialists from Rajiv Gandhi Cancer Institute & Research Centre, New Delhi consult at BBSM Nursing Home — bringing Delhi-level cancer expertise to Raebareli.",
    conditions: ["Stomach, intestine and GI cancers", "Liver and pancreatic cancer", "Urological cancers", "Chemotherapy planning", "Staging and second opinions", "Ongoing cancer follow-up"],
    whenToVisit: [
      "A new cancer diagnosis, or a report that needs a specialist's reading",
      "A second opinion before surgery or chemotherapy",
      "Unexplained weight loss, persistent abdominal pain or blood in stool or urine",
      "Follow-up during or after cancer treatment",
    ],
    image: "/images/ward-main.jpg",
    imageAlt: "Patient ward at BBSM Nursing Home, Raebareli",
    keyword: "Cancer specialist in Raebareli",
  },
  {
    slug: "gynaecology-ivf",
    name: "Gynaecology, Obstetrics & IVF",
    short: "Gynaecology & IVF",
    doctors: ["Dr. Preeti Singh"],
    timing: "Last Sunday | 9–12 PM",
    desc: "IVF, infertility evaluation, high-risk pregnancies, antenatal care and gynaecological procedures.",
    intro:
      "Women's health deserves unhurried, private and expert care. Dr. Preeti Singh consults at BBSM Nursing Home every last Sunday — for fertility evaluation and IVF guidance, pregnancy care and gynaecological concerns.",
    conditions: ["Infertility evaluation", "IVF guidance", "Irregular or painful periods", "Antenatal care", "High-risk pregnancy", "Gynaecological procedures"],
    whenToVisit: [
      "Trying to conceive for a year without success (six months if over 35)",
      "Irregular, very heavy or very painful periods",
      "Planning a pregnancy, or pregnant and needing antenatal care",
      "Any gynaecological concern you would like to discuss privately",
    ],
    image: "/images/room-private.jpg",
    imageAlt: "Private patient room at BBSM Nursing Home, Raebareli",
    keyword: "IVF specialist in Raebareli",
  },
  {
    slug: "urology",
    name: "Urology Surgery",
    short: "Urology",
    doctors: ["Dr. Amitabh Singh"],
    timing: "Last Sunday | 9–12 PM",
    desc: "Urological surgery of the kidney, bladder, prostate and ureter, including urological oncology.",
    intro:
      "Urinary problems are common, often treatable, and too often ignored. Dr. Amitabh Singh of Rajiv Gandhi Cancer Institute, New Delhi consults at BBSM every last Sunday for kidney stones, prostate conditions and urological cancer.",
    conditions: ["Kidney stones", "Prostate enlargement", "Urinary difficulty or frequency", "Blood in urine", "Bladder conditions", "Urological cancer"],
    whenToVisit: [
      "Severe pain in the side or back that comes in waves",
      "Blood in the urine — always worth a specialist's opinion",
      "Weak stream, frequent night-time urination or difficulty passing urine",
      "A scan that shows a stone, a growth or an enlarged prostate",
    ],
    image: "/images/room-recovery.jpg",
    imageAlt: "Recovery room at BBSM Nursing Home, Raebareli",
    keyword: "Urologist in Raebareli",
  },
  {
    slug: "chest-respiratory",
    name: "Chest & Respiratory",
    short: "Chest Medicine",
    doctors: ["Dr. Amit Raj Sharma"],
    timing: "Daily Visiting",
    desc: "Asthma, COPD, bronchitis, tuberculosis, chest infections and breathlessness.",
    intro:
      "Every breath matters. Dr. Amit Raj Sharma visits BBSM daily to treat asthma, COPD, tuberculosis and chest infections — with the support of the hospital's ICU when care needs to step up.",
    conditions: ["Asthma", "COPD", "Bronchitis", "Tuberculosis", "Chest infections and pneumonia", "Breathlessness"],
    whenToVisit: [
      "A cough lasting more than two to three weeks",
      "Wheezing, chest tightness or breathlessness on walking",
      "Coughing up blood, night sweats or unexplained weight loss",
      "Frequent chest infections, or asthma that is not well controlled",
    ],
    image: "/images/icu.jpg",
    imageAlt: "ICU ward at BBSM Nursing Home, Raebareli",
    keyword: "Chest specialist in Raebareli",
  },
  {
    slug: "neurology-psychiatry",
    name: "Neurology & Psychiatry",
    short: "Neuro-Psychiatry",
    doctors: ["Dr. Mahima Mishra"],
    timing: "Daily Visiting",
    desc: "Anxiety, depression, OCD, psychosis, bipolar disorder, headaches, sleep disorders and epilepsy.",
    intro:
      "The mind deserves the same care as the body. Dr. Mahima Mishra visits BBSM daily — a confidential, respectful space to talk about anxiety, low mood, sleep, headaches, seizures and other neurological concerns.",
    conditions: ["Anxiety", "Depression", "OCD", "Bipolar disorder", "Sleep disorders", "Headaches and migraine", "Epilepsy"],
    whenToVisit: [
      "Low mood, worry or loss of interest lasting more than two weeks",
      "Trouble sleeping that affects your day",
      "Frequent or severe headaches, fits or fainting episodes",
      "Thoughts or behaviour that you or your family are worried about",
    ],
    image: "/images/opd-room.jpg",
    imageAlt: "Quiet consultation room at BBSM Nursing Home, Raebareli",
    keyword: "Neurologist in Raebareli",
  },
  {
    slug: "laparoscopic-endocrine",
    name: "Laparoscopic & Endocrine",
    short: "Laparoscopic Surgery",
    doctors: ["Dr. Nitish Gupta"],
    timing: "Daily Visiting",
    desc: "Minimally invasive surgery of the gallbladder, hernia and appendix, plus thyroid, parathyroid and adrenal conditions.",
    intro:
      "Smaller cuts, less pain, faster recovery. Dr. Nitish Gupta visits BBSM daily for laparoscopic surgery of the gallbladder, hernia and appendix, and for thyroid and other endocrine conditions — continuing the surgical tradition of the Dr. Virendra Singh Advance Surgical Centre.",
    conditions: ["Gallstones", "Hernia", "Appendicitis", "Thyroid swelling", "Parathyroid and adrenal conditions"],
    whenToVisit: [
      "Pain or heaviness in the upper abdomen, especially after meals",
      "A bulge in the groin or abdomen that grows when you cough or stand",
      "Sudden pain in the lower right abdomen with fever or vomiting",
      "A swelling in the neck, or a thyroid report that needs review",
    ],
    image: "/images/surgical-centre-entrance.jpg",
    imagePosition: "50% 22%",
    imageAlt: "Entrance to the Dr. Virendra Singh Advance Surgical Centre, a unit of BBSM Nursing Home, Raebareli",
    keyword: "Laparoscopic surgeon in Raebareli",
  },
  {
    slug: "general-medicine",
    name: "General Physician",
    short: "General Medicine",
    doctors: ["Dr. Gyanendra Singh", "Dr. Pranjal Chaurasia"],
    timing: "Daily Visiting",
    desc: "Fevers, infections, diabetes, hypertension, thyroid and day-to-day general medical conditions.",
    intro:
      "Most health journeys begin with a good physician. Dr. Gyanendra Singh and Dr. Pranjal Chaurasia visit BBSM daily — for fevers and infections, diabetes and blood pressure, thyroid and routine check-ups, and to guide you to the right specialist when you need one.",
    conditions: ["Fever and infections", "Dengue and viral fever", "Diabetes", "High blood pressure", "Thyroid", "Health check-ups"],
    whenToVisit: [
      "Fever lasting more than two to three days, or fever with rash, bleeding or severe weakness",
      "Routine monitoring of diabetes, blood pressure or thyroid",
      "A general check-up, especially after 40",
      "Not sure which specialist you need — start here",
    ],
    image: "/images/consult-physician.jpg",
    imageAlt: "Physician consultation at BBSM Nursing Home, Raebareli",
    keyword: "General physician in Raebareli",
  },
];

export const specialityBySlug = (slug: string) => SPECIALITIES.find((s) => s.slug === slug);

export const GROUPS: { key: Group; title: string; timing: string; accent: string; note: string }[] = [
  {
    key: "Daily OPD",
    title: "Daily OPD",
    timing: "Every Day | 10:00 AM – 4:00 PM",
    accent: "#07518B",
    note: "Resident specialists available at BBSM Nursing Home, Raebareli, every day of the week.",
  },
  {
    key: "Super Speciality",
    title: "Super Speciality OPD",
    timing: "Last Sunday of Month | 9:00 AM – 12:00 PM",
    accent: "#C52030",
    note: "Delhi Specialists — Now in Raebareli. Every Last Sunday. Senior specialists from Rajiv Gandhi Cancer Institute & Research Centre, New Delhi. Call ahead to register.",
  },
  {
    key: "Visiting",
    title: "Daily Visiting Doctors",
    timing: "Available Every Day",
    accent: "#111820",
    note: "Visiting consultants covering general medicine, chest, neuro-psychiatry and laparoscopic surgery.",
  },
];

export const TIMINGS: [string, string, string, string, 0 | 1][] = [
  ["Dr. Omkar Singh Bhadoria", "Orthopaedics & Spine", "Every Day", "10 AM–4 PM", 0],
  ["Dr. Shailaja Singh", "Eye Care & Surgery", "Every Day", "10 AM–4 PM", 0],
  ["Dr. Gyanendra Singh", "Physician", "Every Day", "Visiting", 0],
  ["Dr. Pranjal Chaurasia", "Physician", "Every Day", "Visiting", 0],
  ["Dr. Amit Raj Sharma", "Chest & Respiratory", "Every Day", "Visiting", 0],
  ["Dr. Nitish Gupta", "Laparoscopic & Endocrine", "Every Day", "Visiting", 0],
  ["Dr. Mahima Mishra", "Neuro-Psychiatrist", "Every Day", "Visiting", 0],
  ["Dr. Shivendra Singh", "Gastro-Onco Surgeon", "Last Sunday", "9–12 PM", 1],
  ["Dr. Preeti Singh", "IVF & Gynaecology", "Last Sunday", "9–12 PM", 1],
  ["Dr. Amitabh Singh", "Uro Surgery", "Last Sunday", "9–12 PM", 1],
  ["Dr. Vineet Talwar", "Medical Oncology", "Last Sunday", "9–12 PM", 1],
];

export const STATS = [
  { n: 49, suffix: "", label: "Years of Service" },
  { n: 11, suffix: "", label: "Specialist Doctors" },
  { n: 10, suffix: "+", label: "Specialities" },
  { n: 1981, suffix: "", label: "When It All Began" },
];

export const FACILITIES = [
  { caption: "01 / Hospital Exterior", src: "/images/exterior-street.jpg", alt: "BBSM Nursing Home building on Jail Garden Road, Raebareli", w: "clamp(300px,36vw,580px)", h: "clamp(280px,44vh,440px)" },
  { caption: "02 / Advance Surgical Centre", src: "/images/surgical-centre-entrance.jpg", alt: "Entrance to the Dr. Virendra Singh Advance Surgical Centre at BBSM Nursing Home, Raebareli", w: "clamp(230px,22vw,340px)", h: "clamp(320px,50vh,500px)" },
  { caption: "03 / Consultation Room", src: "/images/opd-room.jpg", alt: "Consultation room at BBSM Nursing Home, Raebareli", w: "clamp(240px,22vw,340px)", h: "clamp(230px,34vh,360px)" },
  { caption: "04 / I.C.U.", src: "/images/icu.jpg", alt: "ICU at BBSM Nursing Home, Raebareli", w: "clamp(260px,24vw,380px)", h: "clamp(340px,54vh,540px)" },
  { caption: "05 / General Ward", src: "/images/ward-main.jpg", alt: "General ward at BBSM Nursing Home, Raebareli", w: "clamp(320px,38vw,600px)", h: "clamp(300px,46vh,470px)" },
  { caption: "06 / Patient Room", src: "/images/room-private-2.jpg", alt: "Private patient room at BBSM Nursing Home, Raebareli", w: "clamp(230px,22vw,340px)", h: "clamp(280px,42vh,430px)" },
  { caption: "07 / Recovery Room", src: "/images/room-recovery.jpg", alt: "Recovery room with adjustable bed at BBSM Nursing Home, Raebareli", w: "clamp(240px,23vw,350px)", h: "clamp(320px,50vh,500px)" },
  { caption: "08 / Eye Diagnostics", src: "/images/consult-eye-2.jpg", alt: "Eye diagnostics at BBSM Nursing Home, Raebareli", w: "clamp(280px,30vw,460px)", h: "clamp(250px,38vh,400px)" },
  { caption: "09 / Corridors", src: "/images/corridor.jpg", alt: "Clean corridors inside BBSM Nursing Home, Raebareli", w: "clamp(220px,20vw,320px)", h: "clamp(300px,48vh,480px)" },
  { caption: "10 / Accessible Entry", src: "/images/ramp.jpg", alt: "Wheelchair ramp at BBSM Nursing Home, Raebareli", w: "clamp(240px,24vw,360px)", h: "clamp(280px,44vh,440px)" },
];

export const WHY = [
  { title: "Legacy.", body: "Raebareli's first nursing home, built in 1981 by Late Dr. Virendra Singh." },
  { title: "Expertise.", body: "11 specialists. 10+ disciplines. Super-specialists from Rajiv Gandhi Cancer Institute, New Delhi." },
  { title: "Access.", body: "Delhi-level care in Raebareli — every last Sunday of the month." },
  { title: "Continuity.", body: "9 family doctors carrying one institution's values across generations." },
  { title: "Trust.", body: "Four decades. Thousands of families. Care You Can Trust." },
];

/** Real Google reviews, quoted verbatim from BBSM's Google Business Profile (checked 29 Sep 2026). */
export const GOOGLE_RATING = { rating: 4.2, count: 5 };

export const REVIEWS = [
  { quote: "Best ortho and eye and endocrine surgeon in raebareli", name: "Pradeep Singh", stars: 5, year: "2022" },
  { quote: "Best Nursing Home and excellent staff in Raebareli.", name: "Swatantra Healthcare Services", stars: 5, year: "2023" },
  { quote: "I can fully satistfied. My health is well and my experience is best.good facielty.", name: "Tommy Singh", stars: 5, year: "2018" },
];
