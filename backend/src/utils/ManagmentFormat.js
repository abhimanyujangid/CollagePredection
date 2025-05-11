import fs from 'fs';
import csv from 'csv-parser';  // Install using: npm install csv-parser

function convertCSVToJSON(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            // Generate logo_tag from university name
            const logoTag = data.university
                .replace(/\bof\b/gi, '') // Remove 'of'
                .split(/\s+/)
                .map(word => word[0])
                .join('')
                .toUpperCase();

            // Handle course types
            const branches = [];
            if(data.course.toLowerCase() === 'both') {
                branches.push(
                    { streamName: "BBA", streamType: "undergraduate" },
                    { streamName: "MBA", streamType: "postgraduate" }
                );
            } else {
                branches.push({ streamName: "MBA", streamType: "postgraduate" });
            }

            // Create object structure
            const packageRange = data.pacakage.split('-').map(value => value.trim().replace(/LPA/g, ''));
            console.log(packageRange);
            const collegeObj = {
                instituteId: data.instituteId,
                collegeName: data.collegeName,
                university: data.university,
                logo_tag: logoTag,
                averagePackage: {
                    min: packageRange[0] || 0,
                    max: packageRange[1] || 0
                },
                type: data.type,
                typeOfCollege: "management",
                city: data.city,
                state: data.state,
                rankingNIRF: Number(data.rankingNIRF),
                teacherLearnerRatio: Number(data.teacherLearnerRatio),
                researchScore: Number(data.researchScore),
                graducationOutcome: Number(data.graducationOutcome),
                perceptionScore: Number(data.perceptionScore),
                website: data.website,
                campusLife: Number(data.campusLife),
                infrastructureScore: Number(data.infrastructureScore),
                alumniScore: Number(data.alumniScore),
                placementScore: Number(data.placementScore),
                branches: branches
            };

            results.push(collegeObj);
        })
        .on('end', () => {
            resolve(results);
        })
        .on('error', (error) => {
            reject(error);
        });
    });
}

// Usage example:
convertCSVToJSON('testTime.csv')
    .then(data => {
        fs.writeFileSync('testTime.json', JSON.stringify(data, null, 2));
        console.log('Conversion completed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });