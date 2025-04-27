const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

function processCsvToJson(csvFilePath, outputJsonPath) {
  const uniqueInstitutes = new Map();

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Clean and convert fields
      Object.keys(data).forEach(key => {
        if (data[key] === '') {
          data[key] = null;
        } else if (!isNaN(data[key]) && key.match(/^(202[1-4]|teacherLearnerRatio|researchScore|graducationOutcome|perceptionScore|rankingNIRF)$/)) {
          data[key] = parseFloat(data[key]);
        }
      });

      const genderArray = data.gender ? data.gender.split(',').map(g => g.trim()) : [];

      // Get or create institute
      if (!uniqueInstitutes.has(data.instituteId)) {
        uniqueInstitutes.set(data.instituteId, {
          instituteId: data.instituteId,
          collegeName: data.collegeName,
          university: data.collegeName,
          logo_tag: "nit", // hardcoded for NIT
          type: data.type || "government",
          typeOfCollege: "science",
          city: data.city,
          state: data.state,
          rankingNIRF: data.rankingNIRF,
          teacherLearnerRatio: data.teacherLearnerRatio,
          researchScore: data.researchScore,
          graducationOutcome: data.graducationOutcome,
          perceptionScore: data.perceptionScore,
          branches: []
        });
      }

      const institute = uniqueInstitutes.get(data.instituteId);

      // Get or create branch
      let branch = institute.branches.find(b => 
        b.streamName === data.streamName && 
        b.streamType === data.streamType
      );

      if (!branch) {
        branch = {
          streamName: data.streamName,
          streamType: data.streamType,
          courses: []
        };
        institute.branches.push(branch);
      }

      // Get or create course
      let course = branch.courses.find(c => c.branches === data.branches);
      if (!course) {
        course = {
          branches: data.branches,
          Categories: []
        };
        branch.courses.push(course);
      }

      // Get or create category
      let category = course.Categories.find(cat =>
        cat.caste === data.caste &&
        JSON.stringify([...cat.gender].sort()) === JSON.stringify([...genderArray].sort())
      );

      if (!category) {
        category = {
          caste: data.caste,
          gender: genderArray,
          quotas: []
        };
        course.Categories.push(category);
      }

      // Get or create quota
      let quota = category.quotas.find(q => q.quotaName === data.quota);
      if (!quota) {
        quota = {
          quotaName: data.quota,
          data: []
        };
        category.quotas.push(quota);
      }

      // Add year data
      quota.data.push({
        2021: data["2021"] || null,
        2022: data["2022"] || null,
        2023: data["2023"] || null,
        2024: data["2024"] || null
      });
    })
    .on('end', () => {
      const finalResult = Array.from(uniqueInstitutes.values());

      // Write the final JSON
      fs.writeFileSync(outputJsonPath, JSON.stringify(finalResult, null, 2), 'utf-8');
      console.log(`✅ JSON written successfully to ${outputJsonPath}`);
    });
}

// Example usage:
const csvFilePath = path.join(__dirname, 'BSC_0ther.csv');
const outputJsonPath = path.join(__dirname, 'output.json');

processCsvToJson(csvFilePath, outputJsonPath);
