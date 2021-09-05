const fs = require('fs');                                   //import node file system
const readlines = require('readline');

function make_singles(array){                               //converts all numbers to single digits
    var out = [];
    for(var j=0; j < array.length; j++){
        number = array[j];
        number = number.toString();
        number = number.split("");
        for (var i = 0; i < number.length ; i++){
            out.push(eval(number[i]))
        }
    }
    return out;
}

function array_to_number(array){        
    var out = array[0]*10 + array[1]*1;
    return out;
}

function count(string , character){
    var out = 0;
    string = string.split("");
    
    for (var i = 0 ; i < string.length ; i++){
        if (string[i] == character){
            out++;
        }
    }
    return out;
}

function goodMatch(name1, name2){
    var originalstring = name1 + " matches " + name2;                       //resulting string system

    var string = originalstring.toLowerCase();                              // converts string to lower case
    string = string.trim();                                                 // removes white space
    string = string.replace(" ","");
    string = string.replace(" ","");
    

    var characters_used = [];                                               // makes sure characters don't repeat
    var out = [];

    for (var i = 0 ; i < string.length; i++){
        character = string[i];
        if(!(characters_used.includes(character))){
            out.push(count(string, character));
            characters_used.push(character);
        }
    }



    while (true)
    {

        var length = out.length;

        if(length%2 != 0){                                                  // if length is odd
            length = length - 1;
        }
        

        var out1 = [];
        for (var i=0; i < length/2; i++){
            out1.push(out[0] + out[out.length-1]);
            out.shift();
            out.pop();
        }



        if(out.length != 0 ){
            out1.push(out[0]);
            out.pop();
        }
        
        
        out1 = make_singles(out1);

        console.log(out1);
        if(out1.length != 2){
            out = out1;
            continue;
        } else {
            out = out1;
            break;
        }
    }
    var result = array_to_number(out);          // statement for more than 80% match
    var output_string;

    if (result >= 80){
        output_string = originalstring+" "+String(result)+"%, good match\n";
    } else {
        output_string = originalstring+" "+String(result)+"%\n";
    }

    return output_string;
}

function removeduplicates(array){            // removes duplicates
    var temp = [];

    for (var i = 0 ; i < array.length; i++){
        thing = array[i];
        if (!temp.includes(thing)){
            temp.push(thing);
        }
    }
    return temp;
}

function readCSV(){
    var data = fs.readFileSync("input.csv", "utf8");                // read csv file

    var males = [];
    var females = [];

    var lines = data.split("\n");
    lines.shift()

    for (var i = 0 ; i < lines.length; i++){
        line = lines[i];

        line = line.trim();

    
        templine = line.split(", ");
        

        if (templine[1] == "m"){                                    //checks if person is male or female
            males.push(templine[0]);
            
        } else {
            females.push(templine[0]);
        }
    }

    males = removeduplicates(males);
    females = removeduplicates(females);  

    males.sort();
    females.sort();

    var all_names = [males,females];
    return all_names;
}

function writeTxt(string){                                          // output to txt file
    fs.writeFile("output.txt", string, (err) => {
        if (err) throw err;
        console.log("Compared!");
    });

    string = fs.writeFile;
}

function getOutString(males, females){
    var out = "";

    for (var i = 0 ; i < males.length; i++){
        name1 = males[i];
        for (var j = 0 ; j < females.length; j++){
            name2 = females[j];
            out = out + goodMatch(name1,name2) +"\r\n";
        }
    }
    return out;
}

if (require.main === module){                                       // final compilation

    var all_names = readCSV();
    males = all_names[0];
    females = all_names[1];


    var whole_string = getOutString(males, females);
    writeTxt(whole_string);
    console.log(whole_string);
}
