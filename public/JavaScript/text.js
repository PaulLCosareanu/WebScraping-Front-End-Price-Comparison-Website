const text = [" is a <title>Web Scraping Example</title>","<h1> uses Java to gather data from 5 different websites.</h1>"];
let count=0; //conter of elements in array
let Index=0; //index of element from array
let currentText=""; // string from array
let letter=""; //the letters from the string
let stringComplete=false; //checks if the string found in one of the elements in the array has been fully written

(function type(){ //this function is going to get repeated forever
if(stringComplete==false){ //if the string has not been completely constructed
    if(count === text.length){ //this resets the position of the counter
        count = 0;
    }
    currentText = text[count]; //currentText takes a value from the array
    letter=currentText.slice(0,++Index); //then letter starts slicing this word or string, meaning word="cat" then first slice "c", 2nd "ca" and tird "cat"

    document.querySelector('.typing').textContent= letter; //displays the letters which have been sliced
    if(letter.length === currentText.length){// if the numbers of letters are equal with the string itself then the string has been nuilt 100%
        
        stringComplete=true;
    }
} else if(stringComplete==true){
Index--;
letter=currentText.slice(0,Index);
document.querySelector('.typing').textContent= letter;
if(letter.length ===0){
    count++;
    Index=0;
    stringComplete=false;
}
}
setTimeout(type, 100);

}());