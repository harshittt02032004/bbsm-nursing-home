export type Article = {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  excerpt: string;
  image: string;
  imageAlt: string;
  related: string; // speciality slug
  sections: { heading?: string; paras?: string[]; list?: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "specialist-or-regular-doctor",
    title: "When should you visit a specialist — and when is your regular doctor enough?",
    category: "Patient Guide",
    minutes: 4,
    excerpt:
      "A simple way to decide where to start, so you reach the right doctor sooner — without unnecessary visits.",
    image: "/images/consult-physician.jpg",
    imageAlt: "A physician in consultation with patients at BBSM Nursing Home, Raebareli",
    related: "general-medicine",
    sections: [
      {
        paras: [
          "Most families in Raebareli know the feeling: something is not right, but it is hard to know whom to see first. Going straight to a specialist can feel reassuring, yet many problems are best handled — quickly and completely — by a good general physician. Here is a practical way to think about it.",
        ],
      },
      {
        heading: "Start with a physician when…",
        list: [
          "You have a new fever, cough, cold, stomach upset or body ache",
          "You need routine monitoring of diabetes, blood pressure or thyroid",
          "You feel unwell but cannot tell which part of the body is the cause",
          "You want a general health check-up",
        ],
      },
      {
        paras: [
          "A physician looks at the whole person, orders the right first tests, and — importantly — knows when a specialist is needed. At BBSM Nursing Home, our visiting physicians see patients every day and can refer you within the same building.",
        ],
      },
      {
        heading: "Go directly to a specialist when…",
        list: [
          "The problem clearly belongs to one area — a painful knee, a change in vision, a lump, kidney stone pain",
          "You already have a diagnosis that needs expert management, such as cancer, cataract or infertility",
          "You want a second opinion before surgery or long-term treatment",
          "A physician has advised specialist review",
        ],
      },
      {
        heading: "Do not wait — seek care urgently for",
        list: [
          "Chest pain, sudden breathlessness or fainting",
          "Weakness of one side of the body, slurred speech or a drooping face",
          "Heavy bleeding, a serious injury, or high fever with confusion",
        ],
      },
      {
        paras: [
          "If you are unsure, call us. Our team will guide you to the right doctor and the right OPD day — daily OPD for orthopaedics, eye care and visiting specialists, and the Super Speciality OPD with Delhi specialists every last Sunday.",
        ],
      },
    ],
  },
  {
    slug: "preventive-health-check-ups",
    title: "Understanding preventive health check-ups",
    category: "Preventive Health",
    minutes: 3,
    excerpt:
      "Many serious conditions stay silent for years. A timely check-up finds them early — when they are easiest to treat.",
    image: "/images/consult-eye-2.jpg",
    imageAlt: "A routine eye examination at BBSM Nursing Home, Raebareli",
    related: "general-medicine",
    sections: [
      {
        paras: [
          "Diabetes, high blood pressure, thyroid disorders, glaucoma and some cancers often cause no symptoms in their early stages. By the time they are noticed, damage may already have begun. A preventive check-up is simply a planned look for these silent problems — before they become emergencies.",
        ],
      },
      {
        heading: "What a basic check-up usually includes",
        list: [
          "Blood pressure, weight and a physical examination",
          "Blood sugar and, where advised, cholesterol and thyroid tests",
          "Kidney and liver function tests when indicated",
          "An eye examination — especially for people with diabetes or over 40",
        ],
      },
      {
        heading: "How often?",
        paras: [
          "For most healthy adults, once a year after the age of 40 is a sensible rhythm. People with diabetes, high blood pressure, a strong family history of illness, or a long-term condition may need closer follow-up. Your physician will advise what is right for you — not every test is needed for every person.",
        ],
      },
      {
        heading: "Make it count",
        list: [
          "Bring your previous reports and a list of medicines",
          "Ask before the visit whether you need to come fasting",
          "Mention any family history of diabetes, heart disease or cancer",
        ],
      },
      {
        paras: [
          "At BBSM Nursing Home, our physicians and eye specialist are available every day. A one-hour visit today can save years of trouble later.",
        ],
      },
    ],
  },
  {
    slug: "bone-joint-pain-after-40",
    title: "Bone and joint pain — signs you should not ignore after 40",
    category: "Orthopaedics",
    minutes: 3,
    excerpt:
      "Some aches are part of an active life. Others are early signals that deserve an orthopaedic opinion.",
    image: "/images/consult-ortho.jpg",
    imageAlt: "An orthopaedic consultation at BBSM Nursing Home, Raebareli",
    related: "orthopaedics",
    sections: [
      {
        paras: [
          "After 40, bones gradually lose density and joint cartilage begins to wear. Many people accept knee or back pain as a normal part of ageing — and wait too long. Early assessment often means simpler treatment: exercises, weight management, medicines or physiotherapy, long before surgery is ever discussed.",
        ],
      },
      {
        heading: "Signs worth an orthopaedic visit",
        list: [
          "Knee pain while climbing stairs or getting up from the floor",
          "Morning stiffness in the joints that lasts more than half an hour",
          "Swelling, warmth or a joint that locks, clicks painfully or gives way",
          "Back pain that spreads down the leg, or numbness and tingling in the feet",
          "A fracture after a minor fall — this can be a sign of weak bones",
        ],
      },
      {
        heading: "What you can do today",
        list: [
          "Stay active — walking and gentle strengthening protect the joints",
          "Keep a healthy weight; every extra kilo adds load on the knees",
          "Get enough calcium, vitamin D and daylight",
          "Avoid long periods of sitting cross-legged or squatting if they cause pain",
        ],
      },
      {
        paras: [
          "Dr. Omkar Singh Bhadoria, Bone, Joint & Spine Surgeon, consults at BBSM Nursing Home every day from 10 AM to 4 PM. If pain is changing the way you walk, work or sleep, it is time to have it checked.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
