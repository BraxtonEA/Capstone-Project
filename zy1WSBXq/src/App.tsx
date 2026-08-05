import { useState } from "react";

const UNIVERSAL = [
  { code: "QD", label: "Once Daily", category: "Frequency" },
  { code: "BID", label: "Twice Daily", category: "Frequency" },
  { code: "TID", label: "Three Times Daily", category: "Frequency" },
  { code: "QID", label: "Four Times Daily", category: "Frequency" },
  { code: "Q4H", label: "Every 4 Hours", category: "Frequency" },
  { code: "Q6H", label: "Every 6 Hours", category: "Frequency" },
  { code: "Q8H", label: "Every 8 Hours", category: "Frequency" },
  { code: "Q12H", label: "Every 12 Hours", category: "Frequency" },
  { code: "QHS", label: "At Bedtime", category: "Frequency" },
  { code: "QAM", label: "Every Morning", category: "Frequency" },
  { code: "QPM", label: "Every Evening", category: "Frequency" },
  { code: "PRN", label: "As Needed", category: "Frequency" },
  { code: "QOD", label: "Every Other Day", category: "Frequency" },
  { code: "QWK", label: "Once Weekly", category: "Frequency" },
  { code: "STAT", label: "Immediately", category: "Frequency" },
  { code: "PO", label: "By Mouth", category: "Route" },
  { code: "SL", label: "Sublingual", category: "Route" },
  { code: "TOP", label: "Topical", category: "Route" },
  { code: "INH", label: "Inhaled", category: "Route" },
  { code: "IV", label: "Intravenous", category: "Route" },
  { code: "IM", label: "Intramuscular", category: "Route" },
  { code: "SC", label: "Subcutaneous", category: "Route" },
  { code: "PR", label: "Per Rectum", category: "Route" },
  { code: "AU", label: "Both Ears", category: "Route" },
  { code: "OU", label: "Both Eyes", category: "Route" },
  { code: "OS", label: "Left Eye", category: "Route" },
  { code: "OD", label: "Right Eye", category: "Route" },
  { code: "NAS", label: "Nasal", category: "Route" },
  { code: "TD", label: "Transdermal", category: "Route" },
  { code: "TAB", label: "Tablet", category: "Form" },
  { code: "CAP", label: "Capsule", category: "Form" },
  { code: "SOL", label: "Solution", category: "Form" },
  { code: "SUSP", label: "Suspension", category: "Form" },
  { code: "OINT", label: "Ointment", category: "Form" },
  { code: "CRM", label: "Cream", category: "Form" },
  { code: "GEL", label: "Gel", category: "Form" },
  { code: "PATCH", label: "Transdermal Patch", category: "Form" },
  { code: "SUPP", label: "Suppository", category: "Form" },
  { code: "MDI", label: "Metered Dose Inhaler", category: "Form" },
  { code: "NEB", label: "Nebulizer", category: "Form" },
  { code: "DROPS", label: "Drops", category: "Form" },
  { code: "MG", label: "Milligram", category: "Unit" },
  { code: "ML", label: "Milliliter", category: "Unit" },
  { code: "MCG", label: "Microgram", category: "Unit" },
  { code: "TSP", label: "Teaspoon (5 mL)", category: "Unit" },
  { code: "TBSP", label: "Tablespoon (15 mL)", category: "Unit" },
  { code: "GTT", label: "Drop(s)", category: "Unit" },
  { code: "PUFF", label: "Puff", category: "Unit" },
  { code: "AC", label: "Before Meals", category: "Modifier" },
  { code: "PC", label: "After Meals", category: "Modifier" },
  { code: "HS", label: "At Bedtime", category: "Modifier" },
  { code: "UD", label: "As Directed", category: "Modifier" },
  { code: "WFOOD", label: "With Food", category: "Modifier" },
  { code: "NFOOD", label: "On Empty Stomach", category: "Modifier" },
  { code: "NTE", label: "Not To Exceed", category: "Modifier" },
  { code: "NR", label: "No Refills", category: "Modifier" },
  { code: "DAW", label: "Dispense As Written", category: "Modifier" },
  { code: "SHAKE", label: "Shake Well", category: "Modifier" },
  { code: "CHEW", label: "Chew Before Swallowing", category: "Modifier" },
  { code: "SWHOLE", label: "Swallow Whole", category: "Modifier" },
  { code: "TAPER", label: "Taper as Directed", category: "Modifier" },
  { code: "REFRIG", label: "Refrigerate", category: "Storage" },
  { code: "RT", label: "Room Temperature", category: "Storage" },
];

const CVS_CODES = [
  { code: "CVDQD", label: "Take Once Daily", category: "Frequency" },
  { code: "CVDBID", label: "Take Twice Daily", category: "Frequency" },
  { code: "CVDTID", label: "Take Three Times Daily", category: "Frequency" },
  { code: "CVDID", label: "Take Four Times Daily", category: "Frequency" },
  { code: "CVDQHS", label: "Take At Bedtime", category: "Frequency" },
  { code: "CVDQAM", label: "Take Every Morning", category: "Frequency" },
  { code: "CVDQPM", label: "Take Every Evening", category: "Frequency" },
  { code: "CVDQ4H", label: "Take Every 4 Hours", category: "Frequency" },
  { code: "CVDQ6H", label: "Take Every 6 Hours", category: "Frequency" },
  { code: "CVDQ8H", label: "Take Every 8 Hours", category: "Frequency" },
  { code: "CVDQ12H", label: "Take Every 12 Hours", category: "Frequency" },
  { code: "CVSPRNPN", label: "Take As Needed For Pain", category: "PRN" },
  { code: "CVSPRNSL", label: "Take As Needed For Sleep", category: "PRN" },
  { code: "CVSPRNAX", label: "Take As Needed For Anxiety", category: "PRN" },
  { code: "1TAB", label: "Take 1 Tablet", category: "Dose" },
  { code: "2TAB", label: "Take 2 Tablets", category: "Dose" },
  { code: "HALFTAB", label: "Take 1/2 Tablet", category: "Dose" },
  { code: "1CAP", label: "Take 1 Capsule", category: "Dose" },
  { code: "2CAP", label: "Take 2 Capsules", category: "Dose" },
  { code: "5ML", label: "Take 5 mL", category: "Dose" },
  { code: "10ML", label: "Take 10 mL", category: "Dose" },
  { code: "15ML", label: "Take 15 mL", category: "Dose" },
  { code: "2PUFF", label: "Inhale 2 Puffs", category: "Dose" },
  { code: "1PUFF", label: "Inhale 1 Puff", category: "Dose" },
  { code: "CVTOP1", label: "Apply To Area Once Daily", category: "Topical" },
  { code: "CVTOP2", label: "Apply To Area Twice Daily", category: "Topical" },
  { code: "CVTOP3", label: "Apply To Area Three Times Daily", category: "Topical"},
  { code: "CVTHIN", label: "Apply A Thin Layer", category: "Topical" },
  { code: "CVEYE1", label: "Instill 1 Drop In Eye", category: "Ophthalmic" },
  { code: "CVEYE2", label: "Instill 2 Drops In Eye", category: "Ophthalmic" },
  { code: "CVEAR1", label: "Instill 2 Drops In Ear", category: "Otic" },
  { code: "CVNOSE1", label: "Spray 1 Spray In Each Nostril", category: "Nasal" },
  { code: "CVNOSE2", label: "Spray 2 Sprays In Each Nostril", category: "Nasal" },
  { code: "CVDAW", label: "Dispense As Written", category: "Dispense" },
  { code: "CVGEN", label: "Generic Substitution Permitted", category: "Dispense" },
  { code: "CVR0", label: "Zero Refills", category: "Refill" },
  { code: "CVR1", label: "1 Refill", category: "Refill" },
  { code: "CVR3", label: "3 Refills", category: "Refill" },
  { code: "CVR6", label: "6 Refills", category: "Refill" },
  { code: "CVR11", label: "11 Refills", category: "Refill" },
  { code: "CV30D", label: "30-Day Supply", category: "Supply" },
  { code: "CV60D", label: "60-Day Supply", category: "Supply" },
  { code: "CV90D", label: "90-Day Supply", category: "Supply" },
  { code: "CVWFOOD", label: "Take With Food", category: "Instruction" },
  { code: "CVNFOOD", label: "Take On Empty Stomach", category: "Instruction" },
  { code: "CVWATER", label: "Take With Full Glass of Water", category: "Instruction" },
  { code: "CVSHAKE", label: "Shake Well Before Using", category: "Instruction" },
  { code: "CVSWHOLE", label: "Swallow Whole", category: "Instruction" },
  { code: "CVCHEW", label: "Chew Before Swallowing", category: "Instruction" },
  { code: "CVDISS", label: "Dissolve Under Tongue", category: "Instruction" },
  { code: "CVRINS", label: "Rinse Mouth After Use", category: "Instruction" },
  { code: "CVTAPER", label: "Taper As Directed", category: "Instruction" },
  { code: "CVREFRIG", label: "Keep Refrigerated", category: "Storage" },
  { code: "CVRT", label: "Store At Room Temperature", category: "Storage" },
  { code: "CVSUN", label: "Avoid Prolonged Sun Exposure", category: "Warning" },
  { code: "CVDROW", label: "May Cause Drowsiness", category: "Warning" },
  { code: "CVNOALC", label: "Avoid Alcohol", category: "Warning" },
  { code: "CVPATCH1", label: "Apply 1 Patch To Clean Dry Skin", category: "Topical" },
  { code: "CVPATCH7", label: "Change Patch Every 7 Days", category: "Topical" },
  { code: "CVMDI1", label: "Inhale 1 Puff As Directed", category: "Inhaler" },
  { code: "CVMDI2", label: "Inhale 2 Puffs As Directed", category: "Inhaler" },
  { code: "CVMDIPRN", label: "Inhale 1-2 Puffs As Needed For Breathing", category: "Inhaler" },
];

const WG_CODES = [
  { code: "WGQD", label: "Take Once Every Day", category: "Frequency" },
  { code: "WGBID", label: "Take Twice A Day", category: "Frequency" },
  { code: "WGTID", label: "Take 3 Times A Day", category: "Frequency" },
  { code: "WGQID", label: "Take 4 Times A Day", category: "Frequency" },
  { code: "WGHS", label: "Take At Bedtime", category: "Frequency" },
  { code: "WGAM", label: "Take In The Morning", category: "Frequency" },
  { code: "WGPM", label: "Take In The Evening", category: "Frequency" },
  { code: "WGQ4", label: "Take Every 4 Hours", category: "Frequency" },
  { code: "WGQ6", label: "Take Every 6 Hours", category: "Frequency" },
  { code: "WGQ8", label: "Take Every 8 Hours", category: "Frequency" },
  { code: "WGQ12", label: "Take Every 12 Hours", category: "Frequency" },
  { code: "WGPRN", label: "Take As Needed", category: "Frequency" },
  { code: "WGPRNP", label: "Take As Needed For Pain", category: "PRN" },
  { code: "WGPRNS", label: "Take As Needed For Sleep", category: "PRN" },
  { code: "WGPRNA", label: "Take As Needed For Anxiety", category: "PRN" },
  { code: "WGPRNF", label: "Take As Needed For Fever", category: "PRN" },
  { code: "WG1T", label: "Take 1 Tablet", category: "Dose" },
  { code: "WG2T", label: "Take 2 Tablets", category: "Dose" },
  { code: "WGHT", label: "Take 1/2 Tablet", category: "Dose" },
  { code: "WG1C", label: "Take 1 Capsule", category: "Dose" },
  { code: "WG2C", label: "Take 2 Capsules", category: "Dose" },
  { code: "WG5M", label: "Take 5 mL", category: "Dose" },
  { code: "WG10M", label: "Take 10 mL", category: "Dose" },
  { code: "WG15M", label: "Take 15 mL", category: "Dose" },
  { code: "WGTOP1", label: "Apply Once Daily To Affected Area", category: "Topical" },
  { code: "WGTOP2", label: "Apply Twice Daily To Affected Area", category: "Topical" },
  { code: "WGTOP3", label: "Apply Three Times Daily To Affected Area", category: "Topical"},
  { code: "WGTHIN", label: "Apply Thin Film To Affected Area", category: "Topical" },
  { code: "WGEYE1", label: "Instill 1 Drop In Eye", category: "Ophthalmic" },
  { code: "WGEYE2", label: "Instill 2 Drops In Eye", category: "Ophthalmic" },
  { code: "WGEAR", label: "Instill Drops In Ear", category: "Otic" },
  { code: "WGNOSE1", label: "Spray 1 Spray In Each Nostril", category: "Nasal" },
  { code: "WGNOSE2", label: "Spray 2 Sprays In Each Nostril", category: "Nasal" },
  { code: "WGINH1", label: "Inhale 1 Puff As Needed", category: "Inhaler" },
  { code: "WGINH2", label: "Inhale 2 Puffs As Needed", category: "Inhaler" },
  { code: "WGWFOOD", label: "Take With Food", category: "Instruction" },
  { code: "WGNFOOD", label: "Take On Empty Stomach", category: "Instruction" },
  { code: "WGWATER", label: "Take With A Full Glass of Water", category: "Instruction" },
  { code: "WGSHK", label: "Shake Well", category: "Instruction" },
  { code: "WGSWHL", label: "Swallow Whole", category: "Instruction" },
  { code: "WGCHW", label: "Chew Before Swallowing", category: "Instruction" },
  { code: "WGDISS", label: "Let Dissolve Under The Tongue", category: "Instruction" },
  { code: "WGRINS", label: "Rinse Mouth After Each Use", category: "Instruction" },
  { code: "WGDAW", label: "Dispense As Written", category: "Dispense" },
  { code: "WGSUB", label: "Substitution Permitted", category: "Dispense" },
  { code: "WGR0", label: "No Refills", category: "Refill" },
  { code: "WGR1", label: "1 Refill", category: "Refill" },
  { code: "WGR3", label: "3 Refills", category: "Refill" },
  { code: "WGR6", label: "6 Refills", category: "Refill" },
  { code: "WGR11", label: "11 Refills", category: "Refill" },
  { code: "WG30", label: "30-day Supply", category: "Supply" },
  { code: "WG60", label: "60-day Supply", category: "Supply" },
  { code: "WG90", label: "90-day Supply", category: "Supply" },
  { code: "WGREF", label: "Store In Refrigerator", category: "Storage" },
  { code: "WGRT", label: "Store at Room Temperature", category: "Storage" },
  { code: "WGDRW", label: "May Cause Drowsiness", category: "Warning" },
  { code: "WGALC", label: "Avoid Alcohol", category: "Warning" },
  { code: "WGSUN", label: "Avoid Sun Exposure", category: "Warning" },
  { code: "WGTAP", label: "Taper Dose As Directed", category: "Instruction" },
  { code: "WGPATCH", label: "Apply Patch To Clean Dry Skin", category: "Topical" },
  { code: "WGP7D", label: "Replace Patch Every 7 Days", category: "Topical" },
];

const WM_CODES = [
  { code: "WMQD", label: "Once A Day", category: "Frequency" },
  { code: "WMBID", label: "Two Times A Day", category: "Frequency" },
  { code: "WMTID", label: "Three Times A Day", category: "Frequency" },
  { code: "WMQID", label: "Four Times A Day", category: "Frequency" },
  { code: "WMHS", label: "At Bedtime", category: "Frequency" },
  { code: "WMAM", label: "Morning", category: "Frequency" },
  { code: "WMPM", label: "Evening", category: "Frequency" },
  { code: "WMPRN", label: "As Needed", category: "Frequency" },
  { code: "WMQ4H", label: "Every 4 Hours", category: "Frequency" },
  { code: "WMQ6H", label: "Every 6 Hours", category: "Frequency" },
  { code: "WMQ8H", label: "Every 8 Hours", category: "Frequency" },
  { code: "WMQ12H", label: "Every 12 Hours", category: "Frequency" },
  { code: "WMPRN_P", label: "As Needed For Pain", category: "PRN" },
  { code: "WMPRN_S", label: "As Needed For Sleep", category: "PRN" },
  { code: "WMPRN_N", label: "As Needed For Nausea", category: "PRN" },
  { code: "WM1T", label: "1 Tablet", category: "Dose" },
  { code: "WM2T", label: "2 Tablets", category: "Dose" },
  { code: "WMHT", label: "Half Tablet", category: "Dose" },
  { code: "WM1C", label: "1 Capsule", category: "Dose" },
  { code: "WM2C", label: "2 Capsules", category: "Dose" },
  { code: "WM5ML", label: "5 mL", category: "Dose" },
  { code: "WM10ML", label: "10 mL", category: "Dose" },
  { code: "WM15ML", label: "15 mL", category: "Dose" },
  { code: "WM1P", label: "1 Puff", category: "Dose" },
  { code: "WM2P", label: "2 Puffs", category: "Dose" },
  { code: "WMTOP1", label: "Apply To Skin Once Daily", category: "Topical" },
  { code: "WMTOP2", label: "Apply To Skin Twice Daily", category: "Topical" },
  { code: "WMTHIN", label: "Apply Thin Coat To Skin", category: "Topical" },
  { code: "WMEYE1", label: "1 Drop In Eye", category: "Ophthalmic" },
  { code: "WMEYE2", label: "2 Drops In Eye", category: "Ophthalmic" },
  { code: "WMEAR", label: "Drops In Ear", category: "Otic" },
  { code: "WMNOSE1", label: "1 Spray In Each Nostril", category: "Nasal" },
  { code: "WMNOSE2", label: "2 Sprays In Each Nostril", category: "Nasal" },
  { code: "WMINH1", label: "Inhale 1 Puff", category: "Inhaler" },
  { code: "WMINH2", label: "Inhale 2 Puffs", category: "Inhaler" },
  { code: "WMFD", label: "Take With Food", category: "Instruction" },
  { code: "WMNFD", label: "Take On Empty Stomach", category: "Instruction" },
  { code: "WMWTR", label: "Take With Water", category: "Instruction" },
  { code: "WMSHK", label: "Shake Before Use", category: "Instruction" },
  { code: "WMSWHL", label: "Swallow Whole", category: "Instruction" },
  { code: "WMCHW", label: "Chew Before Swallowing", category: "Instruction" },
  { code: "WMDAW", label: "Brand Required", category: "Dispense" },
  { code: "WMSUB", label: "Generic OK", category: "Dispense" },
  { code: "WMREF", label: "Refrigerate", category: "Storage" },
  { code: "WMROOM", label: "Room Temperature", category: "Storage" },
  { code: "WMDRW", label: "Drowsiness Warning", category: "Warning" },
  { code: "WMALC", label: "No Alcohol", category: "Warning" },
  { code: "WMSUN", label: "Sun Sensitivity Warning", category: "Warning" },
  { code: "WMR0", label: "No Refills", category: "Refill" },
  { code: "WMR1", label: "Refill x1", category: "Refill" },
  { code: "WMR3", label: "Refill x3", category: "Refill" },
  { code: "WMR6", label: "Refill x6", category: "Refill" },
  { code: "WM30", label: "30-day Supply", category: "Supply" },
  { code: "WM60", label: "60-day Supply", category: "Supply" },
  { code: "WM90", label: "90-day Supply", category: "Supply" },
  { code: "WMPATCH", label: "Patch To Clean Skin", category: "Topical" },
  { code: "WMP7", label: "New Patch Weekly", category: "Topical" },
  { code: "WMTAP", label: "Taper Per Schedule", category: "Instruction" },
];

const CODE_DB = {
  Universal: UNIVERSAL.map((c) => ({ ...c, system: "Universal" })),
  CVS: CVS_CODES.map((c) => ({ ...c, system: "CVS" })),
  Walgreens: WG_CODES.map((c) => ({ ...c, system: "Walgreens" })),
  Walmart: WM_CODES.map((c) => ({ ...c, system: "Walmart" })),
};

const ALL_CODES = Object.values(CODE_DB).flat();
const SYSTEMS = ["Universal", "CVS", "Walgreens", "Walmart"];

const COLORS = {
  Universal: {
    bg: "#0d1b3e",
    accent: "#4A90D9",
    dim: "#1e3a5f",
    text: "#a8c8f0",
  },
  CVS: { bg: "#1a0505", accent: "#e53e3e", dim: "#7f1d1d", text: "#fca5a5" },
  Walgreens: {
    bg: "#051a0a",
    accent: "#38a169",
    dim: "#14532d",
    text: "#86efac",
  },
  Walmart: {
    bg: "#05101a",
    accent: "#3b82f6",
    dim: "#1e3a5f",
    text: "#93c5fd",
  },
};

const gc = (sys) => COLORS[sys] || COLORS.Universal;

const MODES = [
  { id: "sig2sig", label: "SIG → SIG", sub: "Code to code" },
  { id: "en2sig", label: "English → SIG", sub: "Sentence to codes" },
  { id: "sig2en", label: "SIG → English", sub: "Codes to sentence" },
];

export default function RxBridge() {
  const [tab, setTab] = useState("translate");
  const [mode, setMode] = useState("sig2sig");
  const [input, setInput] = useState("");
  const [fromSys, setFromSys] = useState("Universal");
  const [toSys, setToSys] = useState("CVS");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  const [filterSys, setFilterSys] = useState("All");
  const [filterCat, setFilterCat] = useState("All");

  const fc = gc(fromSys);
  const tc = gc(toSys);

  const EXAMPLES = {
    sig2sig: [
      "1TAB PO BID WFOOD #30 RF1",
      "CVDQD CVWFOOD CV90D CVR3",
      "WGBID WG2T WGWFOOD WG30 WGR0",
    ],
    en2sig: [
      "Take 1 capsule every night at bedtime for 30 days",
      "Take 2 tablets by mouth twice daily with food for 90 days with 3 refills",
      "Inhale 2 puffs every 4 hours as needed for shortness of breath",
    ],
    sig2en: [
      "1CAP PO QHS #30 NR",
      "2TAB PO BID WFOOD #90 RF3",
      "2PUFF INH Q4H PRN",
    ],
  };

  async function translate() {
    if (!input.trim()) return;
    setBusy(true);
    setErr(null);
    setResult(null);

    const fromCodes = [...CODE_DB[fromSys], ...CODE_DB.Universal];
    const toCodes = [...CODE_DB[toSys], ...CODE_DB.Universal];

    let sysPrompt = "";
    let userMsg = "";

    if (mode === "en2sig") {
      sysPrompt = `You are a pharmacy SIG encoder. Convert plain-English prescription instructions to ${toSys} SIG codes. Available codes: ${JSON.stringify(
        toCodes
      )}. Reply with ONLY a JSON object, no markdown wrappers, no explanation. Use this exact structure: {"translatedSig":"string","parsedComponents":{"dose":"string","route":"string","frequency":"string","duration":"string","refills":"string","instructions":"string"},"mappings":[{"original":"string","translated":"string","label":"string"}],"patientInstructions":"string","pharmacistNotes":"string","warnings":["string"]}`;
      userMsg = `Convert to ${toSys} SIG codes: ${input}`;
    } else if (mode === "sig2en") {
      sysPrompt = `You are a pharmacy SIG decoder. Convert ${fromSys} SIG codes to plain English. Reference codes: ${JSON.stringify(
        fromCodes
      )}. Reply with ONLY a JSON object, no markdown wrappers, no explanation. Use this exact structure: {"translatedSig":"string","decodedComponents":{"dose":"string","route":"string","frequency":"string","duration":"string","refills":"string","instructions":"string"},"mappings":[{"original":"string","translated":"string","label":"string"}],"patientInstructions":"string","pharmacistNotes":"string","warnings":["string"]}`;
      userMsg = `Decode to plain English: ${input}`;
    } else {
      sysPrompt = `You are a pharmacy SIG translator. Convert ${fromSys} SIG codes to ${toSys} SIG codes. Source codes: ${JSON.stringify(
        fromCodes
      )}. Target codes: ${JSON.stringify(
        toCodes
      )}. Reply with ONLY a JSON object, no markdown wrappers, no explanation. Use this exact structure: {"translatedSig":"string","mappings":[{"original":"string","translated":"string","label":"string"}],"patientInstructions":"string","pharmacistNotes":"string","warnings":["string"]}`;
      userMsg = `Translate from ${fromSys} to ${toSys}: ${input}`;
    }

    try {
      const API_KEY =
        TOKEN

      const res = await fetch(
        "https://models.inference.ai.azure.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: sysPrompt },
              { role: "user", content: userMsg },
            ],
            temperature: 0.1,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(
          data?.error?.message || "GitHub API error " + res.status
        );
      }

      let raw = data?.choices?.[0]?.message?.content || "";
      if (!raw) throw new Error("Empty response from API");

      raw = raw.replace(/```json|```/gi, "").trim();

      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start === -1 || end === -1) {
        throw new Error("No JSON object found in response.");
      }

      const jsonStr = raw.slice(start, end + 1);
      const parsed = JSON.parse(jsonStr);

      if (!parsed.translatedSig) {
        throw new Error("Missing translatedSig fields in response structure");
      }
      setResult(parsed);
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      translate();
    }
  };

  const cats = ["All", ...new Set(ALL_CODES.map((c) => c.category))];
  const filtered = ALL_CODES.filter((c) => {
    if (filterSys !== "All" && c.system !== filterSys) return false;
    if (filterCat !== "All" && c.category !== filterCat) return false;
    if (
      search &&
      !c.code.toLowerCase().includes(search.toLowerCase()) &&
      !c.label.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const confColor = (v) =>
    v === "HIGH" ? "#4ade80" : v === "MEDIUM" ? "#fbbf24" : "#f87171";

  const S = {
    page: {
      minHeight: "100vh",
      background: "#060d1a",
      color: "#e2e8f0",
      fontFamily: "system-ui, sans-serif",
    },
    header: {
      background: "#0a1628",
      borderBottom: "1px solid #1e2d45",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    hinner: {
      maxWidth: 1100,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
    },
    logo: { display: "flex", alignItems: "center", gap: 10 },
    logobx: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: "linear-gradient(135deg,#2563eb,#4A90D9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 14,
      color: "#fff",
    },
    main: { maxWidth: 1100, margin: "0 auto", padding: "24px 24px" },
    card: {
      background: "#0d1525",
      border: "1px solid #1e2d45",
      borderRadius: 12,
    },
    input: {
      width: "100%",
      background: "#060d1a",
      border: "1px solid #1e2d45",
      borderRadius: 8,
      padding: "10px 14px",
      color: "#e2e8f0",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
    },
    btn: {
      padding: "10px 18px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13,
    },
    label: {
      fontSize: 11,
      color: "#64748b",
      fontWeight: 700,
      letterSpacing: "1px",
      display: "block",
      marginBottom: 6,
    },
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <header style={S.header}>
        <div style={S.hinner}>
          <div style={S.logo}>
            <div style={S.logobx}>Rx</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>
                RxBridge
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#475569",
                  letterSpacing: "0.5px",
                }}
              >
                AI PRESCRIPTION TRANSLATOR
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["translate", "library"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  ...S.btn,
                  background: tab === t ? "#1e3a5f" : "transparent",
                  color: tab === t ? "#4A90D9" : "#64748b",
                  borderBottom:
                    tab === t ? "2px solid #4A90D9" : "2px solid transparent",
                  borderRadius: "8px 8px 0 0",
                }}
              >
                {t === "translate" ? "⚡ Translate" : "📚 SIG Library"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={S.main}>
        {/* ── TRANSLATE ── */}
        {tab === "translate" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  margin: "0 0 6px",
                  color: "#fff",
                }}
              >
                Universal Prescription Translator
              </h1>
              <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
                Convert SIG codes between systems or encode/decode plain-English
                instructions
              </p>
            </div>

            {/* Mode toggle */}
            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setResult(null);
                    setErr(null);
                    setInput("");
                  }}
                  style={{
                    ...S.btn,
                    background:
                      mode === m.id
                        ? "linear-gradient(135deg,#1e3a5f,#2563eb)"
                        : "#0d1525",
                    color: mode === m.id ? "#fff" : "#64748b",
                    border:
                      "1px solid " + (mode === m.id ? "#2563eb" : "#1e2d45"),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    padding: "10px 16px",
                  }}
                >
                  <span style={{ fontSize: 13 }}>{m.label}</span>
                  <span style={{ fontSize: 10, opacity: 0.6 }}>{m.sub}</span>
                </button>
              ))}
            </div>

            {/* System selectors */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 48px 1fr",
                gap: 12,
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              {/* FROM */}
              <div
                style={{
                  ...S.card,
                  padding: 14,
                  border: "1px solid " + fc.dim,
                }}
              >
                <span style={S.label}>
                  {mode === "en2sig" ? "FROM" : "FROM SYSTEM"}
                </span>
                {mode === "en2sig" ? (
                  <div
                    style={{ color: "#4A90D9", fontWeight: 700, paddingTop: 4 }}
                  >
                    Plain English
                  </div>
                ) : (
                  <select
                    value={fromSys}
                    onChange={(e) => setFromSys(e.target.value)}
                    style={{
                      ...S.input,
                      color: fc.accent,
                      border: "1px solid " + fc.dim,
                    }}
                  >
                    {SYSTEMS.map((s) => (
                      <option key={s} style={{ background: "#060d1a" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Swap */}
              <button
                onClick={() => {
                  if (mode === "sig2sig") {
                    const t = fromSys;
                    setFromSys(toSys);
                    setToSys(t);
                  }
                }}
                style={{
                  ...S.btn,
                  background: "#0d1525",
                  border: "1px solid #1e2d45",
                  color: "#4A90D9",
                  fontSize: 18,
                  padding: 0,
                  width: 48,
                  height: 48,
                }}
              >
                ⇄
              </button>

              {/* TO */}
              <div
                style={{
                  ...S.card,
                  padding: 14,
                  border: "1px solid " + tc.dim,
                }}
              >
                <span style={S.label}>
                  {mode === "sig2en" ? "TO" : "TO SYSTEM"}
                </span>
                {mode === "sig2en" ? (
                  <div
                    style={{ color: "#38a169", fontWeight: 700, paddingTop: 4 }}
                  >
                    Plain English
                  </div>
                ) : (
                  <select
                    value={toSys}
                    onChange={(e) => setToSys(e.target.value)}
                    style={{
                      ...S.input,
                      color: tc.accent,
                      border: "1px solid " + tc.dim,
                    }}
                  >
                    {SYSTEMS.map((s) => (
                      <option key={s} style={{ background: "#060d1a" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Input box */}
            <div style={{ ...S.card, marginBottom: 12, overflow: "hidden" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid #1e2d45",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#4A90D9",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  {mode === "en2sig"
                    ? "PLAIN ENGLISH INPUT"
                    : mode === "sig2en"
                    ? "SIG CODE INPUT"
                    : "SIG CODE INPUT"}
                </span>
                <button
                  onClick={() => {
                    setInput("");
                    setResult(null);
                    setErr(null);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#475569",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Clear
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                placeholder={
                  mode === "en2sig"
                    ? "e.g. Take 1 capsule every night at bedtime for 30 days"
                    : mode === "sig2en"
                    ? "e.g. 1CAP PO QHS #30 NR"
                    : "e.g. 1TAB PO BID WFOOD #30 RF1"
                }
                style={{
                  ...S.input,
                  border: "none",
                  borderRadius: 0,
                  resize: "vertical",
                  lineHeight: 1.6,
                  fontFamily:
                    mode === "en2sig" ? "system-ui,sans-serif" : "monospace",
                  fontSize: 14,
                  padding: 14,
                }}
              />
            </div>

            {/* Example chips */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <span
                style={{ fontSize: 11, color: "#475569", alignSelf: "center" }}
              >
                Try:
              </span>
              {EXAMPLES[mode].map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setInput(ex);
                    setResult(null);
                    setErr(null);
                  }}
                  style={{
                    ...S.btn,
                    background: "#0d1525",
                    border: "1px solid #1e2d45",
                    color: "#4A90D9",
                    fontSize: 11,
                    padding: "4px 10px",
                    fontFamily: mode === "en2sig" ? "inherit" : "monospace",
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Translate button */}
            <button
              onClick={translate}
              disabled={busy || !input.trim()}
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 10,
                border: "none",
                background: busy
                  ? "#1e3a5f"
                  : "linear-gradient(135deg,#2563eb,#4A90D9)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              {busy
                ? "⏳ Processing..."
                : mode === "en2sig"
                ? `Encode English → ${toSys} SIG`
                : mode === "sig2en"
                ? `Decode ${fromSys} SIG → English`
                : `Translate ${fromSys} → ${toSys}`}
            </button>

            {/* Error */}
            {err && (
              <div
                style={{
                  marginTop: 12,
                  padding: 14,
                  background: "#1c0505",
                  border: "1px solid #7f1d1d",
                  borderRadius: 10,
                  color: "#fca5a5",
                  fontSize: 13,
                  wordBreak: "break-all",
                }}
              >
                ⚠️ {err}
              </div>
            )}

            {/* Result */}
            {result && (
              <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                {/* Main output */}
                <div
                  style={{
                    ...S.card,
                    overflow: "hidden",
                    border:
                      "1px solid " + (mode === "sig2en" ? "#14532d" : tc.dim),
                  }}
                >
                  <div
                    style={{
                      padding: "10px 14px",
                      background:
                        mode === "sig2en" ? "#14532d30" : tc.dim + "40",
                      borderBottom:
                        "1px solid " + (mode === "sig2en" ? "#14532d" : tc.dim),
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        color: mode === "sig2en" ? "#4ade80" : tc.accent,
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "1px",
                      }}
                    >
                      {mode === "en2sig"
                        ? `ENCODED — ${toSys}`
                        : mode === "sig2en"
                        ? "DECODED — PLAIN ENGLISH"
                        : `TRANSLATED — ${toSys}`}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(result.translatedSig)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <div
                    style={{
                      padding: 14,
                      fontSize: mode === "sig2en" ? 15 : 16,
                      fontFamily: mode === "sig2en" ? "inherit" : "monospace",
                      color: "#fff",
                      lineHeight: 1.6,
                    }}
                  >
                    {result.translatedSig}
                  </div>
                </div>

                {/* Components grid */}
                {(result.parsedComponents || result.decodedComponents) && (
                  <div style={{ ...S.card, overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid #1e2d45",
                      }}
                    >
                      <span
                        style={{
                          color: "#a5b4fc",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: "1px",
                        }}
                      >
                        🧩 COMPONENTS
                      </span>
                    </div>
                    <div
                      style={{
                        padding: 12,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                      }}
                    >
                      {Object.entries(
                        result.parsedComponents ||
                          result.decodedComponents ||
                          {}
                      )
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <div
                            key={k}
                            style={{
                              background: "#060d1a",
                              borderRadius: 8,
                              padding: "8px 12px",
                              border: "1px solid #1e2d45",
                            }}
                          >
                            <div
                              style={{
                                color: "#475569",
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                marginBottom: 3,
                              }}
                            >
                              {k}
                            </div>
                            <div style={{ color: "#c7d2fe", fontSize: 13 }}>
                              {v}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Mappings */}
                {result.mappings && result.mappings.length > 0 && (
                  <div style={{ ...S.card, overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid #1e2d45",
                      }}
                    >
                      <span
                        style={{
                          color: "#4A90D9",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: "1px",
                        }}
                      >
                        🔄 CODE MAPPINGS
                      </span>
                    </div>
                    <div style={{ padding: 10, display: "grid", gap: 6 }}>
                      {result.mappings.map((m, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            padding: "8px 12px",
                            background: "#060d1a",
                            borderRadius: 8,
                            border: "1px solid #1e2d45",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "monospace",
                              color: fc.accent,
                              fontWeight: 700,
                              minWidth: 80,
                            }}
                          >
                            {m.original}
                          </span>
                          <span style={{ color: "#475569" }}>→</span>
                          <span
                            style={{
                              fontFamily: "monospace",
                              color: tc.accent,
                              fontWeight: 700,
                              minWidth: 80,
                            }}
                          >
                            {m.translated}
                          </span>
                          <span
                            style={{ color: "#64748b", fontSize: 12, flex: 1 }}
                          >
                            {m.label}
                          </span>
                          {m.confidence && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 7px",
                                borderRadius: 5,
                                background: confColor(m.confidence),
                                color: "#000",
                                fontWeight: 700,
                              }}
                            >
                              {m.confidence}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patient + Pharmacist */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      ...S.card,
                      padding: 14,
                      border: "1px solid #14532d",
                    }}
                  >
                    <div
                      style={{
                        color: "#4ade80",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "1px",
                        marginBottom: 8,
                      }}
                    >
                      💊 PATIENT LABEL
                    </div>
                    <p
                      style={{
                        color: "#86efac",
                        fontSize: 13,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {result.patientInstructions}
                    </p>
                  </div>
                  <div
                    style={{
                      ...S.card,
                      padding: 14,
                      border: "1px solid #1e1b4b",
                    }}
                  >
                    <div
                      style={{
                        color: "#a5b4fc",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "1px",
                        marginBottom: 8,
                      }}
                    >
                      🔬 PHARMACIST NOTES
                    </div>
                    <p
                      style={{
                        color: "#c7d2fe",
                        fontSize: 13,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {result.pharmacistNotes}
                    </p>
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings && result.warnings.length > 0 && (
                  <div
                    style={{
                      ...S.card,
                      padding: 14,
                      border: "1px solid #7c2d12",
                    }}
                  >
                    <div
                      style={{
                        color: "#fb923c",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "1px",
                        marginBottom: 8,
                      }}
                    >
                      ⚠️ CLINICAL FLAGS
                    </div>
                    {result.warnings.map((w, i) => (
                      <div
                        key={i}
                        style={{
                          color: "#fdba74",
                          fontSize: 13,
                          marginBottom: 4,
                        }}
                      >
                        • {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── LIBRARY ── */}
        {tab === "library" && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  margin: "0 0 4px",
                  color: "#fff",
                }}
              >
                SIG Code Library
              </h2>
              <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
                {ALL_CODES.length} codes across Universal, CVS, Walgreens, and
                Walmart
              </p>
            </div>

            {/* Filters */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search codes or descriptions..."
                style={S.input}
              />
              <select
                value={filterSys}
                onChange={(e) => setFilterSys(e.target.value)}
                style={{ ...S.input, width: "auto" }}
              >
                <option>All</option>
                {SYSTEMS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                style={{ ...S.input, width: "auto" }}
              >
                {cats.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {SYSTEMS.map((s) => {
                const col = gc(s);
                return (
                  <div
                    key={s}
                    onClick={() => setFilterSys(filterSys === s ? "All" : s)}
                    style={{
                      ...S.card,
                      padding: "10px 14px",
                      border: "1px solid " + col.dim,
                      cursor: "pointer",
                      opacity: filterSys !== "All" && filterSys !== s ? 0.4 : 1,
                    }}
                  >
                    <div
                      style={{
                        color: col.accent,
                        fontWeight: 800,
                        fontSize: 20,
                      }}
                    >
                      {CODE_DB[s].length}
                    </div>
                    <div
                      style={{ color: col.text, fontSize: 11, fontWeight: 600 }}
                    >
                      {s}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Code grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 8,
              }}
            >
              {filtered.slice(0, 200).map((code) => {
                const col = gc(code.system);
                return (
                  <div
                    key={code.system + code.code}
                    style={{
                      ...S.card,
                      padding: "10px 12px",
                      border: "1px solid #1e2d45",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 800,
                          color: col.accent,
                          fontSize: 13,
                        }}
                      >
                        {code.code}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: col.dim,
                          color: col.text,
                          fontWeight: 600,
                        }}
                      >
                        {code.system}
                      </span>
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: 12 }}>
                      {code.label}
                    </div>
                    <div
                      style={{ color: "#475569", fontSize: 11, marginTop: 2 }}
                    >
                      {code.category}
                    </div>
                  </div>
                );
              })}
            </div>
            {filtered.length > 200 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  color: "#475569",
                  fontSize: 13,
                }}
              >
                Showing 200 of {filtered.length} — refine search to see more
              </div>
            )}
          </div>
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: 20,
          borderTop: "1px solid #1e2d45",
          color: "#374151",
          fontSize: 11,
          marginTop: 32,
        }}
      >
        RxBridge · Capstone Project · For educational use only · Always verify
        with a licensed pharmacist
      </footer>
    </div>
  );
}
