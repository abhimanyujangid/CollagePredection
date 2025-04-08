import { indianStates, twelfthStreams } from "./Dummydata";

const twelfthDropDownData = [
  {
    label: "Stream",
    placeholder: "Select a stream",
    name: "twelfth.stream",
    data: twelfthStreams.map((stream) => stream.name),
  },
  {
    label: "State",
    placeholder: "Select a state",
    name: "twelfth.state",
    data: indianStates.map((state) => state.name),
  },
];



const DEGREE_LEVELS = Object.freeze([
  "associate",
  "bachelor",
  "master",
  "doctorate",
  "diploma",
  "certificate",
  "postgraduate",
  "phd"
]);


const FIELDS_OF_STUDY = Object.freeze([
  // Science & Technology
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Physics",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Environmental Science",
  "Astronomy",

  // Engineering
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Communication Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Aerospace Engineering",
  "Automobile Engineering",

  // Business & Economics
  "Business Administration",
  "Marketing",
  "Finance",
  "Economics",
  "Accounting",
  "Entrepreneurship",
  "Supply Chain Management",
  "Human Resource Management",

  // Arts & Humanities
  "Literature",
  "History",
  "Philosophy",
  "Linguistics",
  "Fine Arts",
  "Music",
  "Theater",
  "Film Studies",

  // Social Sciences
  "Psychology",
  "Sociology",
  "Political Science",
  "Anthropology",
  "International Relations",
  "Criminology",

  // Medical & Health Sciences
  "Medicine",
  "Nursing",
  "Pharmacy",
  "Dentistry",
  "Physiotherapy",
  "Veterinary Science",
  "Public Health",
  "Nutrition & Dietetics",

  // Law & Legal Studies
  "Law",
  "Criminal Justice",
  "International Law",
  "Corporate Law",

  // Education
  "Primary Education",
  "Secondary Education",
  "Special Education",
  "Educational Psychology",

  // Agriculture & Environmental Studies
  "Agricultural Science",
  "Horticulture",
  "Forestry",
  "Sustainable Development",

  // Media & Communication
  "Journalism",
  "Mass Communication",
  "Public Relations",
  "Advertising",
]);

const COLLEGE_TYPES = Object.freeze([
  "private",
  "government",
  "deemed",
  "state",
]);


const COLLEGE_STREAMS = Object.freeze([
  "engineering",
  "medical",
  "management",
  "law",
  "arts",
  "science",
]);
 


const INDIAN_STATE = [
  "andhra pradesh",
  "arunachal pradesh",
  "assam",
  "bihar",
  "chhattisgarh",
  "goa",
  "gujarat",
  "haryana",
  "himachal pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil nadu",
  "telangana",
  "tripura",
  "uttar pradesh",
  "uttarakhand",
  "west bengal",
];


 const DEGREE_TYPES = [
  "B.Tech - Bachelor of Technology",
  "M.Tech - Master of Technology",
  "B.E - Bachelor of Engineering",
  "M.E - Master of Engineering",
  "Diploma",
  "Polytechnic",
  "MBBS - Bachelor of Medicine, Bachelor of Surgery",
  "BDS - Bachelor of Dental Surgery",
  "BAMS - Bachelor of Ayurveda, Medicine and Surgery",
  "BHMS - Bachelor of Homeopathic Medicine and Surgery",
  "BUMS - Bachelor of Unani Medicine and Surgery",
  "BPT - Bachelor of Physiotherapy",
  "MPT - Master of Physiotherapy",
  "B.Sc Nursing - Bachelor of Science in Nursing",
  "M.Sc Nursing - Master of Science in Nursing",
  "B.Pharm - Bachelor of Pharmacy",
  "M.Pharm - Master of Pharmacy",
  "D.Pharm - Diploma in Pharmacy",
  "BMLT - Bachelor of Medical Laboratory Technology",
  "B.Sc Radiology - Bachelor of Science in Radiology",
  "B.Sc Biotechnology - Bachelor of Science in Biotechnology",
  "B.Sc Microbiology - Bachelor of Science in Microbiology",
  "B.Sc Anesthesia - Bachelor of Science in Anesthesia",
  "B.Sc Optometry - Bachelor of Science in Optometry"
];


const EXAM_OPTIONS = [
 "JEE",
  "NEET",
  "BITSAT",
  "VITEEE",
  "SRMJEEE",
  "WBJEE",
  "COMEDK",
  "CUET",
  "CLAT",
  "AILET",
  "LSAT",
  "NATA",
  "NID",
  "UCEE",
  "IPU CET",
  "AMUEEE",
  "SET",
  "SUAT",
];


export { twelfthDropDownData, DEGREE_LEVELS, FIELDS_OF_STUDY , COLLEGE_TYPES, COLLEGE_STREAMS , INDIAN_STATE,DEGREE_TYPES,EXAM_OPTIONS};
