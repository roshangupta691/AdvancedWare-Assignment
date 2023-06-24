const fs = require('fs');
const csvtojson = require('csvtojson');
const prompt = require('prompt-sync')();

const csvFileName = 'users.csv';

async function searchUserFromData(inpData){
    if(!fs.existsSync(csvFileName)){
        console.log("File Doesn't Exist. Create the file first. \nYou can use getRandomDataToCSVFile.js program to generate file.\n")
        process.exit(0);
    }
    else{
        let usersData = await csvtojson().fromFile(csvFileName);

        let searchedUser = null;
        usersData.forEach((user) => {
            if (String(user.ID) === inpData || String(user.UserName) === inpData) {
                searchedUser=user;
                return;
            } 
          });
        
        return searchedUser;
    }
}

async function getDetailsByIDorUsername(){
    let inputFromUser = prompt("Enter ID or UserName to search user: ");
    let user = await searchUserFromData(inputFromUser);
    if(user)
    {
        console.log("------USER DETAILS--------");
        for (const key in user) {
            console.log(`${key}: ${user[key]}`);
        }
        
    }
    else
    {
        console.log("User NOT Found!");
    }
}

getDetailsByIDorUsername();