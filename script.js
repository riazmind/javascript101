    var colors = ['red', 'blue', 'gold'];
    var chicagoStartups = [
        '  Interior   Define  ',
        'Classkick',
        'teaBOT  .$',
        'Pritzker Group Venture Capital',
        'Teln!yx !!',
        'ShipBob ~~$$$',
        'Hologram',
        'Tovala    ',
        '    MANOR',
        'ShuttleCloud 999987',
        'gtrot @@@@@',
        'DealsGoRound ****',
        ' Groovebug',
        'Stage$$$Bloc',
        'Shiftgig',
        'ParkWhiz'
    ];

    var chicagoStartups_original = chicagoStartups.slice(); // create new array with deep copy and not shallow copy to preserve original array  

    function clearDocument() {
        var rootDiv = document.getElementById('rootContainer');
        if (rootDiv) {
            while (rootDiv.hasChildNodes()) {
                rootDiv.removeChild(rootDiv.lastChild);
            }
            rootDiv.remove(); // remove from document  
        }
    }

    function initDocument() {
        clearDocument();

        var rootDiv = document.createElement('div');
        rootDiv.id = 'rootContainer';
        var companyNamesContainer = document.createElement('div');
        chicagoStartups.forEach( function(chicagoStartup, index) {
            var childDiv = document.createElement('div');
            var text = document.createTextNode(index.toString().concat(' .) ').concat(chicagoStartup));
            childDiv.appendChild(text);
            companyNamesContainer.appendChild(childDiv);
        });
        rootDiv.appendChild(companyNamesContainer);
        document.body.appendChild(rootDiv); 

        var characterDiv = document.createElement('div');
        characterDiv.id = "characterContainer";
        companyNamesContainer.appendChild(characterDiv); // display below chicagoStartups 
        // rootDiv.appendChild(characterDiv); // display right of chicagoStartups 
    }

    function renderReversedElements() {
        var reverseContainer = document.getElementById('reverseContainer');
        var reversedChicagoStartups = [];
        if (reverseContainer) {
            if (reverseContainer.hasChildNodes()) { 

                // save original style of display, color, margin and height for vertical display. 
                var displayStyle = reverseContainer.lastChild.style.display; 
                var colorStyle = reverseContainer.lastChild.style.backgroundColor; 
                var marginStyle = reverseContainer.lastChild.style.margin; 
                var lineHeightStyle = reverseContainer.lastChild.style.lineHeight; 

                while (reverseContainer.hasChildNodes()) {
                    reversedChicagoStartups.push(reverseContainer.lastChild.innerHTML);
                    reverseContainer.removeChild(reverseContainer.lastChild);
                }
                reversedChicagoStartups.forEach(function(chicagoStartup, index) {

                    var childDiv = document.createElement('div');
                    var text = document.createTextNode(chicagoStartup);
                    childDiv.appendChild(text);
                    
                    // use original style of display, color, margin and height for vertical display. 
                    childDiv.style.display = displayStyle; 
                    childDiv.style.backgroundColor = colorStyle; 
                    childDiv.style.margin = marginStyle; 
                    childDiv.style.lineHeight = lineHeightStyle; 

                    reverseContainer.appendChild(childDiv);
                });
            }
            else {
                //TODO:: REPLACE [chicagoStartups.reverse()] WITH A FUNCTION CALLED "chicagoStartupsReverse" 
                //chicagoStartups.reverse().forEach( function(startup) { // built-in reverse method 
                chicagoStartupsReverse().forEach( function(startup) { 
                    var childDiv = document.createElement('div');
                    var text = document.createTextNode(startup);
                    childDiv.appendChild(text);
                    reverseContainer.appendChild(childDiv);
                });
            }
        }
    }

    function chicagoStartupsReverse() {
        var reversedStartups = []; 

        var i;
        for(i = chicagoStartups.length - 1; i >= 0; i--) {
            reversedStartups.push(chicagoStartups[i]); 
        }

        /*
            TODO: REVERSE THE CONTENTS OF THE ARRAY WITHOUT USING THE BUILT IN REVERSE METHOD
                  RETURN THE REVERSED ARRAY

            TIPS: 
                1.  REVIEW JAVASCRIPT ARRAY DATA STRUCTURE AND THE BUILTIN METHODS PROVIDED TO ALL ARRAYS

                2.  THIS IS A COMMON JOB INTERVIEW QUESTION, THAT SHOULD BE SOLVABLE BASED ON AN UNDERSTANDING OF
                    DATA STRUTUCTURES REGARDLESS OF THE PROGRAMMING LANGUAGE
        
        */
        return reversedStartups;
    }

    function cleanAndCountCharacters() {
        console.log('CLEAN AND COUNT CHARACTERS'); 

        chicagoStartups.splice(0,chicagoStartups.length) // remove all elements from array 
        chicagoStartups = chicagoStartups_original.slice(); // always use original array data 

        var allNames = "";
        // reverse array 
        chicagoStartups.forEach(function(item, index) {
            // remove special characters and trim the string after it. 
            chicagoStartups[index] = item.replace(/[^A-Za-z0-9 ]/g,"").trim(); // note space after 0-9, it is space character. 

            // remove special characters, numbers and trim the string after it. 
            // chicagoStartups[index] = item.replace(/[^A-Za-z ]/g,"").trim(); // note space after a-z, it is space character.  
            
            chicagoStartups[index] = chicagoStartups[index].replace(/ +/g," "); // fix double spaces between words to single space.
            
            //concat all names to count the characters for each occurrence. 
            allNames = allNames.concat(chicagoStartups[index]); 
            
            // count number characters for ebery item in array. 
            chicagoStartups[index] = chicagoStartups[index].concat(' ').concat(chicagoStartups[index].length);
        }); 

        // initialize doc with new clean data  
        run(); 

        var characterCount = Char_Counts(allNames.toLowerCase());  

        // Get proprty name of all enteries in object 
        // console.log(Object.getOwnPropertyNames(Char_Counts(allNames))); 

        // Display key and its value in object 
        // Object.entries(characterCount).forEach(([key, value]) => console.log(`${key}: ${value}`));  

        var characterContainer = document.getElementById("characterContainer");  

        var headDiv = document.createElement('div');
        var h3 = document.createElement('h3');
        h3.innerText = "Occurrence of Characters";
        headDiv.appendChild(h3);
        characterContainer.appendChild(headDiv);

        // Display key and values in alphabetical order 
        Object.keys(characterCount).sort().forEach(
            function(key) {
                //console.log(key, characterCount[key]);
                var childDiv = document.createElement('div');
                var text = document.createTextNode(key + ": "  + characterCount[key]);
                childDiv.appendChild(text);
                characterContainer.appendChild(childDiv);
            }
        );

        
        /*
        // Display key and values in original order as it was added 
        Object.entries(characterCount).forEach( 
             function([key, value]) { 
                 //console.log(`${key}: ${value}`);
                var childDiv = document.createElement('div');
                var text = document.createTextNode(`${key}: ${value}`);
                childDiv.appendChild(text);
                characterContainer.appendChild(childDiv);
        });
        */

        /*
            TODO: REMOVES ANY SPECIAL CHARACTERS FROM EACH COMPANY NAME AND
              DISPLAYS THE NUMBER OF REMAINING CHARACTERS NEXT TO THE FULL WORD.
              DONT FORGET TO REMOVE LEADING AND TRAILING WHITESPACES AS WELL
        */

    }

    function Char_Counts(str1) {
        var uchars = {};
        str1.replace(/\S/g, function(l){uchars[l] = (isNaN(uchars[l]) ? 1 : uchars[l] + 1);});
        return uchars;
    }
    
    function initReverse() {
        var reverseContainer = document.createElement('div');
        reverseContainer.id = 'reverseContainer';

        var reverseBtn = document.createElement('button');
        var btnText = document.createTextNode('Reverse');
        reverseBtn.onclick = renderReversedElements;
        reverseBtn.appendChild(btnText);
        var reverseButtonContainer = document.createElement('div');
        reverseButtonContainer.appendChild(reverseBtn);  
        reverseButtonContainer.style.margin = "10px"; //added  

        var toggleBtn = document.createElement('button');
        var btnToggleText = document.createTextNode('Toggle Display');
        toggleBtn.onclick = toggleDisplay;
        toggleBtn.appendChild(btnToggleText);
        var toggleButtonContainer = document.createElement('div');
        toggleButtonContainer.appendChild(toggleBtn);  
        toggleButtonContainer.style.margin = "10px"; 

        document.getElementById('rootContainer').appendChild(reverseButtonContainer);
        document.getElementById('rootContainer').appendChild(toggleButtonContainer);
        document.getElementById('rootContainer').appendChild(reverseContainer);
    }

    function toggleDisplay() { 

        var reverseContainer = document.getElementById('reverseContainer'); 

        /* 
        // reverseContainer parent level toggle 
        if(reverseContainer.style.display == "contents") {
            reverseContainer.style.display = "block";
        } else {
            reverseContainer.style.display = "contents";
            reverseContainer.style.padding = "10px";
            reverseContainer.style.margin = "20px";
            //alert("changed");
            //document.getElementById("myDiv").style.margin = "100px";
        } 
        */ 
        
        // reverseContainer children level toggle 
        if (reverseContainer) {
            if (reverseContainer.hasChildNodes()) { 

                var c = reverseContainer.childNodes;
                var i;
                for(i = 0; i < c.length; i++) { 

                    // use original style of display, color, margin and height for vertical display.  
                    if(c[i].style.display == "inline") {
                        c[i].style.display = "block"; // change to vertical display 
                        c[i].style.margin = "";
                        c[i].style.backgroundColor = "";
                    } else { 
                        // use custom style of display, color, margin and height for horizontal display. 
                        c[i].style.display = "inline"; // change to horizontal display 
                        c[i].style.margin = "10px";
                        c[i].style.lineHeight = "150%";
                        c[i].style.backgroundColor = "lightgrey";

                    }
                    
                }
            }
        }
        
        

        /*
        TODO: REVIEW THE CODE IN THE PROVIDED REVERSE EXAMPLE, USE JAVASCRIPT TO ADD A CLICKABLE BUTTON 
        CALLED "Toggle Display" ... WHEN THE USER CLICKS THE BUTTON, IT RENDERS THE DISPLAY OF THE COMPANY NAMES 
        FROM VERTICAL, TO HORIZONTAL.
        IF THE USER CLICKS THE TOGGLE BUTTON AGAIN THE NAMES SHOULD ONCE AGAIN BE DISPLAYED VERTICALLY.

        TIPS: 
            1.  MAKE SURE TO READ AND UNDERSTAND THE DIFFERENCE BETWEEN BLOCK ELEMENTS SUCH AS A DIV, 
                AND INLINE ELEMENTS SUCH AS A SPAN.

            2.  DIVIDE AND CONQUER.

            3.  
        */
    }
    
    function run() {
        initDocument();
        initReverse();
    }
     //run();
    
    var flags = {
        displayInstructions: true
    };

    //TODO INVOKE THIS ANONYMOUS FUNCTION TO DISPLAY HOMEWORK INSTRUCTIONS IN THE CONSOLE
    (function() {
        if (flags.displayInstructions) {
            console.log(`
                            ASSUMPTIONS: !!! NO JQUERY !!! 
                                         TODO INDICATES THAT A SOLUTION IS REQUIRED
                                         PLEASE INCLUDE YOUR GITHUB URL AS A COMMENT
                                         EX. // https://github.com/Chandler-Gegg/javascript101.git

                            Feel free to complete the exercises in whatever order you like.  

                            Make sure to push your code to your own github repo as well as SUBMIT A ZIPFILE TO D2L.
                            HOMEWORK IS DUE WEDNESDAYS AT MIDNIGHT NO EXCEPTIONS.
                            dont forget to slack me the url to your github account as well.  

                            You can earn extra credit by using the provided css classes in the style tag or additionally 
                            you can pull in an external css library like bootstrap.  if you bring in bootstrap make sure to style
                            the buttons using bootstraps built in button styling classes.

                            Additionally, can earn extra credit by using an object to count the number of occurrences 
                            of each character accross all startup names and style and display the results as part of the
                            "cleanAndCountCharacters" function.

                            If you are having trouble getting started, I would spend a lot of time reviewing the source code provided in the reverse example.
                            Make sure I understand whats going on and do a google search on anything that is confusing.  
                            THE BETTER YOU UNDERSTAND THE EXAMPLE THE EASIER THIS SHOULD BE. THEN REVIEW THE TODOS AND START BY TRYING TO SOLVE THE EASIEST
                            PROBLEM.

                            FROM MY OWN EXPERIENCE, I FIND THAT WHEN IM STRUGGLING WITH A PROBLEM, IT USUALLY MEANS
                            I DONT FULLY UNDERSTAND THE TOOLS THAT I AM USING.

                            GOOD LUCK, SEE YOU ON THE FLIPPITY FLOP "\_(**/)_/"

                        `);
        }
        
    })(); // (); display the instructions in console. 
