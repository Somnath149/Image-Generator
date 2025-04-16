const buttontodisplay = document.querySelector("#clickme");
const imgtext = document.querySelector("#imgtext");
const imageContainer = document.querySelector(".imageContainer");
const generator = document.querySelector("#generator");
const login = document.querySelector(".login");
const sub = document.querySelector(".sub");
const email = document.querySelector("#e");
const load = document.querySelector(".load");
const download = document.querySelector("#download");


//is main ek islog var hai jiske value false hai,
// aur jaise hi buttontodisplay pe click hoga
//  if condition check hoga islog ke value false
//  hai toh else wale condition execute hoge 
let islog= false
buttontodisplay.addEventListener("click",()=>{
    if(islog)
    {
    imgtext.style.display= "block"
    generator.style.display= "block"
    }
    else{
        login.style.display= "block"
    }
})
//ek main jaise var ke value false hai toh login page display hoga aur agar true hai toh image aur generator display hoga
//end


//es main submit button ko prevent Default kiya hai aur agar valid ke true hai toh islog var ke val ue true ho jaye gi aur login page ka display none ho jayega
login.addEventListener("submit",(e)=>{
    e.preventDefault();

    let valid= true
    if(valid)
    {
        islog=true
        login.style.display= "none"
    }
    else
        alert("Login failed. Please check your credentials.");
})
//end


//es main check kar rahe he ki user ne sara data fill kiya hai ki nahi nahi kiya hai toh else condition display hoga aur kiya hai  toh islog = true aur login display =none ho jaye ga
sub.addEventListener("click", () => {
    const edata = email.value;
    if (edata) {
        console.log("Email submitted:", edata);
        login.style.display= "none"
        islog= true
    }
    else{
        alert("Please log in first to generate images")
    }
})
//end

//main API program starts from here
//ye code hugging face se liya hai
    async function text(data) {   //async function use karke data ko fetch kiya hai 
        const response = await fetch(
            `https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image`,
            {
                headers: {
                    Authorization: `Bearer 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`,  //API key
                },
                method: "POST",
                body: JSON.stringify({"inputs": imgtext.value}),  //imgtext.value input value text hai jo ke ham denge img generate kare ke liye
            }
        );
        const result = await response.blob();  // ya pe result main response store ho rahaa hai as a blob value means binary large object ye text yaa binary data ko read karne ke liye use hota hai 
        return result; // result return ho rahaa hai jis main ke data hai 
    }
    //end

    //phir ek aur async function banaya hai 
    async function generate() {
        const inputText = imgtext.value;  //input text jo ke ham denge use inputtext var main store kiya hai
        if (inputText) {   //checking condition if true
            load.style.opacity=1    //jab tak img nahi aati tab tak loading display hoga 
            imageContainer.style.opacity=0
            const response = await text(inputText);   //response main await(use to pause the execution of program jab tak promises resolved ya reject nahi hota tab tak) ka use kar ke text function ko call kiya hai jis main ke inputText hai
            const objectURL = URL.createObjectURL(response);  //ya haa pe URL.createObjectURL ke help se ham image ko ek temporary URL de rahe hai 
            load.style.opacity=0  //disappear ho jaye ga img aane ke baad
            imageContainer.style.opacity=1
            imageContainer.src = objectURL; // img ke src attribute main img ka temporary URL assign kar diya hai yaha 
        } else {
            alert('Please enter some text to generate an image!');
        }
    }
        generator.addEventListener("click",()=>{
        generate();
    });