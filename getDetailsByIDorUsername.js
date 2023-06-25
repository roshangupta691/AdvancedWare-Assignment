/*Q1-B Write a program to Input Id or Username of an user and return the details of that user in the output of the program */

const fs = require('fs');
const csvtojson = require('csvtojson');
const prompt = require('prompt-sync')();

const csvFileName = 'users.csv';

//This Function will take inputData as argument and match with ID or UserName and return the user object if found.
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

//This function will take input from user and then call the searchUserFromData function and Print the result.
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