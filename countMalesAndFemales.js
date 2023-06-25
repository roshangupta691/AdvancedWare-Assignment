/* Q1-A Write a program to read users.csv and count the number of males and females in the dataset */

const fs = require('fs');
const csvtojson = require('csvtojson');

let cntMale=0,cntFemale=0;
const csvFileName = 'users.csv';

//This function will convert the CSV file into JSON file and then count The number of Male and Female.
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

//This function will call the getCounts Function and Print count of Male and Female as OUTPUT.
async function callGetCounts() {
    await getCounts();
    console.log("The Total Number of Male:",cntMale,"and Female:",cntFemale);
}

callGetCounts();


