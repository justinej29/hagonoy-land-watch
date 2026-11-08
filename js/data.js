var HLW = HLW || {};

HLW.USE_SAMPLE_RISK = false;

var REASON_HIGH_BOTH = "Among the villages flooded by a high tide of about 4.86 feet in July 2023, and also named in the 2018 flood reports. Residents report tidal flooding here for more than a decade.";
var REASON_HIGH_2023 = "Among the villages flooded by a high tide of about 4.86 feet in July 2023, the deepest tidal flood in the reports reviewed.";
var REASON_MODERATE = "Reported under two to three feet of floodwater in the 2018 high tide and monsoon floods. Not among the 12 villages named in the deeper July 2023 high-tide flood.";
var REASON_LOW = "Not named in the 2018 or July 2023 flood reports reviewed. This does not mean the area is safe: floods have recently reached every barangay in Hagonoy.";

var BASIS_HIGH_BOTH = "Manila Bulletin (July 2023) and Philippine News Agency (2018) flood reports. Flood exposure rating, not a measured subsidence rate.";
var BASIS_HIGH_2023 = "Manila Bulletin (July 2023) flood report. Flood exposure rating, not a measured subsidence rate.";
var BASIS_MODERATE = "Philippine News Agency (2018) flood report. Flood exposure rating, not a measured subsidence rate.";
var BASIS_LOW = "No mention in the Manila Bulletin (2023) or PNA (2018) reports. Flood exposure rating, not a measured subsidence rate.";

HLW.barangays = [
  { id: "abulalas", name: "Abulalas", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "carillo", name: "Carillo", risk: "Low", basis: BASIS_LOW, reason: REASON_LOW },
  { id: "iba", name: "Iba", risk: "Low", basis: BASIS_LOW, reason: REASON_LOW },
  { id: "iba-ibayo", name: "Iba-Ibayo", risk: "Low", basis: BASIS_LOW, reason: REASON_LOW },
  { id: "mercado", name: "Mercado", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  {
    id: "palapat",
    name: "Palapat",
    risk: "Moderate",
    basis: "Philippine News Agency (2018) and Philippine Star (August 2026) flood reports. Flood exposure rating, not a measured subsidence rate.",
    reason: "Reported under two to three feet of floodwater in 2018, and residents were photographed wading through floodwater again in August 2026. Not among the 12 villages named in the July 2023 high-tide flood."
  },
  { id: "pugad", name: "Pugad", risk: "High", basis: BASIS_HIGH_2023, reason: REASON_HIGH_2023 },
  { id: "sagrada-familia", name: "Sagrada Familia", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "san-agustin", name: "San Agustin", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "san-isidro", name: "San Isidro", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "san-jose", name: "San Jose", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  {
    id: "san-juan",
    name: "San Juan",
    risk: "Moderate",
    basis: "Philippine News Agency (2018) and Philippine Star (August 2026) flood reports. Flood exposure rating, not a measured subsidence rate.",
    reason: "Reported under two to three feet of floodwater in 2018, and residents were photographed wading through floodwater again in August 2026. Not among the 12 villages named in the July 2023 high-tide flood."
  },
  { id: "san-miguel", name: "San Miguel", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "san-nicolas", name: "San Nicolas", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "san-pablo", name: "San Pablo", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "san-pascual", name: "San Pascual", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "san-pedro", name: "San Pedro", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "san-roque", name: "San Roque", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  {
    id: "san-sebastian",
    name: "San Sebastian",
    risk: "High",
    basis: "Philippine News Agency (2018), DZRH and Manila Bulletin (2025 to 2026) reports. Flood exposure rating, not a measured subsidence rate.",
    reason: "Named in the 2018 flood reports and flooded again in recent storms. The Mary the Queen Subdivision is known as a ghost town after floodwater stayed for about seven years, and the public cemetery has been flooded for almost a decade."
  },
  { id: "santa-cruz", name: "Santa Cruz", risk: "Moderate", basis: BASIS_MODERATE, reason: REASON_MODERATE },
  { id: "santa-elena", name: "Santa Elena", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "santa-monica", name: "Santa Monica", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "santo-nino", name: "Santo Niño", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "santo-rosario", name: "Santo Rosario", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "tampok", name: "Tampok", risk: "High", basis: BASIS_HIGH_BOTH, reason: REASON_HIGH_BOTH },
  { id: "tibaguin", name: "Tibaguin", risk: "High", basis: BASIS_HIGH_2023, reason: REASON_HIGH_2023 }
];

HLW.quizQuestions = [
  {
    id: 1,
    question: "What is land subsidence?",
    options: [
      "The slow sinking of the ground surface",
      "The sudden shaking of the ground during an earthquake",
      "The rise of sea level due to climate change",
      "The erosion of soil by river water"
    ],
    correct: 0,
    explanation: "Land subsidence (paglubog ng lupa) is the gradual sinking or settling of the ground surface. It is usually slow and hard to notice at first.",
    source: "About page"
  },
  {
    id: 2,
    question: "Which is the most common cause of land subsidence in low-lying areas?",
    options: [
      "Excessive rainfall alone",
      "Extraction of groundwater from underground aquifers",
      "Strong ocean tides",
      "Road construction"
    ],
    correct: 1,
    explanation: "Pumping large amounts of groundwater removes water from underground layers. This can cause the soil above to compact and sink.",
    source: "Causes and Effects page"
  },
  {
    id: 3,
    question: "Hagonoy is located in which province of the Philippines?",
    options: [
      "Pampanga",
      "Nueva Ecija",
      "Bulacan",
      "Bataan"
    ],
    correct: 2,
    explanation: "Hagonoy is a municipality in Bulacan province, located in the low-lying delta area of Central Luzon.",
    source: "About page"
  },
  {
    id: 4,
    question: "How many barangays does Hagonoy have?",
    options: [
      "18",
      "22",
      "26",
      "30"
    ],
    correct: 2,
    explanation: "Hagonoy has 26 barangays. All of them are shown on the Vulnerability Map on the Interactive page.",
    source: "Interactive page"
  },
  {
    id: 5,
    question: "Which of these is a visible warning sign of land subsidence?",
    options: [
      "Trees growing taller than usual",
      "Cracks appearing in walls, floors, or roads",
      "Increase in air temperature",
      "Stronger river currents"
    ],
    correct: 1,
    explanation: "Cracks in buildings, roads, and floors can be a sign that the ground beneath is sinking or shifting. Other signs include doors that no longer close properly and flooding that gets worse over time.",
    source: "About page"
  },
  {
    id: 6,
    question: "What type of farming activity is especially at risk when land sinks?",
    options: [
      "Upland rice farming",
      "Fishpond and aquaculture farming in coastal or low areas",
      "Mountain vegetable growing",
      "Orchid cultivation in greenhouses"
    ],
    correct: 1,
    explanation: "In Hagonoy, fishpond and aquaculture farmers are especially affected because sinking land changes water levels and can flood or damage their ponds.",
    source: "Community Impact page"
  },
  {
    id: 7,
    question: "What does the term 'aquifer' mean?",
    options: [
      "A type of flood warning system",
      "An underground layer of rock or soil that stores water",
      "A government agency that manages water",
      "A pipe system for irrigation"
    ],
    correct: 1,
    explanation: "An aquifer is an underground layer of permeable rock or soil that holds water. When too much water is pumped out, the layer can compact and the ground above sinks.",
    source: "About page (Glossary)"
  },
  {
    id: 8,
    question: "Which of these actions by a community member can help reduce land subsidence?",
    options: [
      "Using more deep-well water pumps",
      "Paving all open ground to prevent erosion",
      "Switching to rainwater harvesting to reduce groundwater use",
      "Planting only ornamental plants"
    ],
    correct: 2,
    explanation: "Collecting rainwater for household use reduces the need to pump groundwater. This helps slow down the rate of ground sinking over time.",
    source: "Solutions page"
  },
  {
    id: 9,
    question: "What does PHIVOLCS stand for?",
    options: [
      "Philippine Institute of Volcanology and Seismology",
      "Philippine Institute of Volcanic and Ocean Land Conservation Studies",
      "Philippine Hazard Institute for Volcanoes, Land and Climate Science",
      "Philippine Integrated Volcano and Oceanography Laboratory Center"
    ],
    correct: 0,
    explanation: "PHIVOLCS is the Philippine Institute of Volcanology and Seismology. It monitors geological hazards including ground movement and is a key source for hazard data.",
    source: "References page"
  },
  {
    id: 10,
    question: "Which government agency in the Philippines produces geohazard maps that include land subsidence risk?",
    options: [
      "DPWH (Department of Public Works and Highways)",
      "DENR-MGB (Mines and Geosciences Bureau)",
      "DOLE (Department of Labor and Employment)",
      "DOH (Department of Health)"
    ],
    correct: 1,
    explanation: "The Mines and Geosciences Bureau (MGB) under DENR conducts geohazard assessments and produces maps showing subsidence and other ground hazard risks.",
    source: "References page"
  }
];