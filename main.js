// length of the slider text value according to input "range"
const lenghtSlider = document.querySelector(".pass-length input");
options = document.querySelectorAll(".option input"),
    copyIcon = document.querySelector(".input-box span"),
    passInput = document.querySelector(".input-box input"),
    passIndicator = document.querySelector(".pass-indicator"),
    generateBtn = document.querySelector(".generateBtn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz.",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.",
    numbers: "0123456789",
    symbols: "^!$%&/()=;.,@<>?_#{[]}\|:!'^+%&/()=?_-*"
}


const generatePass = () => {
    let staticPass = "",
        randomPass = "",
        benzerDub = false,
        passLength = lenghtSlider.value;



    // checkbox inputların seçimlerini yakalama
    options.forEach(option => {
        if (option.checked) { //if checkbox is checked 

            // benzersiz, ve boşlukları dahil et,  tikleri
            if (option.id !== "exclude" && option.id !== "space") {

                staticPass += characters[option.id]; //adding particular key value from character object to static password
            }
            //if checkbox id is spaces 
            else if (option.id === "space") {
                staticPass += `  ${staticPass}  `; //adding space at the  beginning & end of staticPassword
            }

            else { // else pass true value to Benzersiz
                benzerDub = true;
            }


        }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random charachter from static pass
        let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)];
        // if benzerDub is true
        if (benzerDub) {
            !randomPass.includes(randomChar) || randomChar == " " ? randomPass += randomChar : i--;
        }

        else {
            // else add randomChar to randomPass
            randomPass += randomChar;
        }

    }
    passInput.value = randomPass; // üretilen şifreyi inputta göster.

}

const updatePassIndicator = () => {
    //input range id si (.pass-indicator) 8 den küçükse veya eşitse zayıf olacak.  16 dan büyük veya küçükse orta olacak. , 16 dan büyükse güçlü olacak. 
    passIndicator.id = lenghtSlider.value <= 8 ? "zayif" : lenghtSlider.value <= 16 ? "orta" : "guclu";
}



const updateRange = () => {
    // assigning input range value to span counter text
    document.querySelector(".pass-length span").innerText = lenghtSlider.value;
    generatePass();
    updatePassIndicator();

}
updateRange();

const copyPassword = () => {
    // writeText() writes the passed text to the system clipboard ...
    navigator.clipboard.writeText(passInput.value);
    copyIcon.innerText = "check"; // kopyala iconunu check iconuna değiştirme
    // tikin kaybolma süresi 
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1300);


}

copyIcon.addEventListener("click", copyPassword)
lenghtSlider.addEventListener("input", updateRange)
generateBtn.addEventListener("click", generatePass)
