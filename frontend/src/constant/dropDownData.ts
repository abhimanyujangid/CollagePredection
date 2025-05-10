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
  // Union Territories
  "andaman and nicobar islands",
  "chandigarh",
  "dadra and nagar haveli and daman and diu",
  "delhi",
  "jammu and kashmir",
  "ladakh",
  "lakshadweep",
  "puducherry"
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
 "JEE_Advanced",
  "JEE_Main",
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


const ENGINEERING_COURSES = [
  "Computer Science Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Electronics and Communication Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Automobile Engineering",
  "Biotechnology Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
  "Mechatronics Engineering",
  "Petroleum Engineering",
  "Robotics Engineering"
];


 const STATE_BOARD = [
  "Central Board of Secondary Education",
  "Council for the Indian School Certificate Examinations",
  "Andhra Pradesh Board of Intermediate Education",
  "Assam Higher Secondary Education Council",
  "Bihar School Examination Board",
  "Chhattisgarh Board of Secondary Education",
  "Goa Board of Secondary and Higher Secondary Education",
  "Gujarat Secondary and Higher Secondary Education Board",
  "Haryana Board of School Education",
  "Himachal Pradesh Board of School Education",
  "Jharkhand Academic Council",
  "Karnataka Pre-University Education Board",
  "Kerala Board of Higher Secondary Education",
  "Madhya Pradesh Board of Secondary Education",
  "Maharashtra State Board of Secondary and Higher Secondary Education",
  "Manipur Council of Higher Secondary Education",
  "Meghalaya Board of School Education",
  "Mizoram Board of School Education",
  "Nagaland Board of School Education",
  "Odisha Council of Higher Secondary Education",
  "Punjab School Education Board",
  "Rajasthan Board of Secondary Education",
  "Tamil Nadu Directorate of Government Examinations",
  "Telangana State Board of Intermediate Education",
  "Tripura Board of Secondary Education",
  "Uttar Pradesh Madhyamik Shiksha Parishad",
  "Uttarakhand Board of School Education",
  "West Bengal Council of Higher Secondary Education",
  "Board of Secondary Education, Arunachal Pradesh",
  "Sikkim Board of Secondary Education",
  "Delhi Board of School Education (DBSE)",
  "Jammu and Kashmir Board of School Education",
  "Ladakh Board of School Education",
  "Puducherry State Education Board",
  "Andaman and Nicobar Islands School Education Board",
  "Chandigarh Board of Secondary Education",
  "Dadra and Nagar Haveli and Daman and Diu School Education Board",
  "Lakshadweep State Education Board"
];



const TWELFTH_STREAM = [
  "Science (PCM)",
  "Science (PCB)",
  "Science (PCMB)",
  "Commerce",
  "Arts/Humanities",
  "Vocational Studies",
  "Agriculture",
  "Fine Arts",
  "Home Science",
  "Information Technology",
  "Computer Science",
  "Hotel Management",
  "Physical Education",
  "Mass Media",
  "Business Studies",
  "Fashion Studies",
  "Travel and Tourism",
  "Engineering Graphics",
  "Retail",
  "Healthcare",
  "Legal Studies",
];


export { 
  twelfthDropDownData, 
  DEGREE_LEVELS, 
  FIELDS_OF_STUDY , 
  COLLEGE_TYPES, 
  COLLEGE_STREAMS , 
  INDIAN_STATE,
  DEGREE_TYPES,
  EXAM_OPTIONS,
  ENGINEERING_COURSES,
  STATE_BOARD,
  TWELFTH_STREAM
};
