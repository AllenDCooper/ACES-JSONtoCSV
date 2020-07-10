var fs = require("fs");
var ACESData = require("./json/aces2.json");

var CSV = []
var headerString = "CourseID, UserID, LastUpdated, Name, isComplete, DSInfoSaved, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, Gender Identity, Hispanic, American Indian or Alaskan Native, Asian, Black or African American, Native Hawaiian or Other Pacific Islander, White, International or foreign national, Started college at this institution, Current college credits, Enrolled for 12 or more credits, Birth year, Parents highest level of education, Expected level of education"
var dataString = headerString

function writeCSV(string) {
    fs.writeFile("ACES_CSV.txt", string, function(err) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
        return console.log(err);
        }
        console.log("ACES_CSV.txt was updated!");
    });
}

function convertDate(unixDate) {
    var unixts = unixDate;
    var date = new Date(unixts);
    return date.toISOString()
}

function createCSV (json){
    json.ACES_Data.forEach(element => {
        
        // user & institutional data
        var courseID = element.CourseId;
        var userID = element.UserId;
        var rawDate = parseInt(element.LastUpdated.$date.$numberLong);
        var lastUpdated = convertDate(rawDate)
        var valueData = element.Value.v;
        var valueDataParsed = JSON.parse(valueData);
        var name = valueDataParsed.name;

        // completion data
        var isComplete = valueDataParsed.isComplete;
        var DSInfoSaved = valueDataParsed.DSInfoSaved;

        // score data
        var ACES2 = valueDataParsed.scores[2];
        var ACES3 = valueDataParsed.scores[3];
        var ACES4 = valueDataParsed.scores[4];;
        var ACES5 = valueDataParsed.scores[5];
        var ACES6 = valueDataParsed.scores[6];
        var ACES7 = valueDataParsed.scores[7];
        var ACES8 = valueDataParsed.scores[8];
        var ACES9 = valueDataParsed.scores[9];
        var ACES10 = valueDataParsed.scores[10];
        var ACES11 = valueDataParsed.scores[11];
        var ACES12 = valueDataParsed.scores[12];
        var ACES13 = valueDataParsed.scores[13];

        // demographic data
        var Gender_Identity = valueDataParsed.demographics['gender_identity'];
        var Hispanic = valueDataParsed.demographics['hispanic_origin'];
        var American_Indian_or_Alaskan_Native = valueDataParsed.demographics['American Indian or Alaskan Native'];
        var Asian = valueDataParsed.demographics['Asian'];
        var Black_or_African_American = valueDataParsed.demographics['Black or African American'];
        var Native_Hawaiian_or_Other_Pacific_Islander = valueDataParsed.demographics['Native Hawaiian or Other Pacific Islander'];
        var White = valueDataParsed.demographics['White'];
        var International_or_foreign_national = valueDataParsed.demographics['International or foreign national'];
        var Started_college_at_this_institution = valueDataParsed.demographics['Started college at this institution'];
        var Current_college_credits = valueDataParsed.demographics['Current college credits'];
        var Enrolled_for_12_or_more_credits = valueDataParsed.demographics['Enrolled for 12 or more credits'];
        var Birth_year = valueDataParsed.demographics['Birth year'];
        var Parents_highest_level_of_education = valueDataParsed.demographics['Parents highest level of education'];
        var Expected_level_of_education = valueDataParsed.demographics['Expected level of education'];

        dataString += `\r\n ${courseID}, ${userID}, ${lastUpdated}, ${name}, ${isComplete}, ${DSInfoSaved}, ${ACES2}, ${ACES3}, ${ACES4}, ${ACES5}, ${ACES6}, ${ACES7}, ${ACES8}, ${ACES9}, ${ACES10}, ${ACES11}, ${ACES12}, ${ACES13}, ${Gender_Identity}, ${Hispanic}, ${American_Indian_or_Alaskan_Native}, ${Asian}, ${Black_or_African_American}, ${Native_Hawaiian_or_Other_Pacific_Islander}, ${White}, ${International_or_foreign_national}, ${Started_college_at_this_institution}, ${Current_college_credits}, ${Enrolled_for_12_or_more_credits}, ${Birth_year}, ${Parents_highest_level_of_education}, ${Expected_level_of_education}`
    });
    writeCSV(dataString)
}

createCSV(ACESData);