/*A program to GET random data of an user and write it in a File named users.csv. 
Each GET request have an interval time of 1 second and have appended the information in a comma separated format. 
I have used Random Data API to get Random Data of users. */

const fs = require("fs");

const csvFileName = "users.csv";
const url = "https://random-data-api.com/api/v2/users";

//if users.csv file does not exists already. So, create it and add headers of the data in it.
if (!fs.existsSync(csvFileName)) {
  let headerCSVFile = "ID,FirstName,LastName,UserName,Email,Avatar,Gender,DOB,Address\n";
  fs.appendFile(csvFileName, headerCSVFile, "utf-8", (error) => {
    if (error) {
      console.error("Error Occured while writing file:", error);
    }
    else{
      console.log("Header Added to CSV")
    }
  });
}

//This function helps us to fetch user random data using GET Method from Random Data API.
async function getRandomData() {
    try { 

        fetch(url)
            .then((response) => {
                if(response.ok)
                    return response.json();
            })
            .then(async (response) => {
                await appendIntoCSVFile(response);
            });

    } catch (error) {
          console.error(error);
    }
}

//It will call the getRandomData() function at the interval of 1 sec.
setInterval(async () => {
  await getRandomData();
}, 1000);

//This function will take data from the Response (JSON format) and convert into CSV format and add it into users.csv file.
async function appendIntoCSVFile(response){

        const addressFromJSON = `${response.address.street_name},${response.address.city},${response.address.state},${response.address.country}`
        const userData = `${response.id},${response.first_name},${response.last_name},${response.username},${response.email},${response.avatar},${response.gender},${response.date_of_birth},"${addressFromJSON}"\n`;
        
        fs.appendFile(csvFileName, userData, 'utf-8', (error) => {
            if (error) {
                console.error('Error Occured while writing file:', error);
            }
            else {
                console.log('Data Added to CSV');
            }
        });
}


