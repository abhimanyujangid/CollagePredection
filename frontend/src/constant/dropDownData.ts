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


export { twelfthDropDownData, DEGREE_LEVELS, FIELDS_OF_STUDY };
