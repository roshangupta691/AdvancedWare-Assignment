const fs = require('fs');
const csvtojson = require('csvtojson');

let cntMale=0,cntFemale=0;
const csvFileName = 'users.csv';

async function getCounts(){
    if(!fs.existsSync(csvFileName)){
        console.log("\nFile Doesn't Exist. Create the file first. \nYou can use getRandomDataToCSVFile.js program to generate file.\n")
        process.exit(0);
    }
    else{
        let usersData = await csvtojson().fromFile(csvFileName);

        usersData.forEach((user) => {
            if (user.Gender === 'Male') {
                cntMale++;
            } 
            else if (user.Gender === 'Female') {
                cntFemale++;
            }
          });
    }
}

async function callGetCounts() {
    await getCounts();
    console.log("The Total Number of Male:",cntMale,"and Female:",cntFemale);
}

callGetCounts();


