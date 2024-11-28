var character = document.querySelector(".character");
var map = document.querySelector(".map");

//start in the middle of the map
var x = 50;
var y = 30;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame


const placeCharacter = () => {
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");

   playerPosition = { x, y };
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = 279;
   var topLimit = 50;
   var bottomLimit = 300;
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   
   var camera_left = pixelSize * 200;
   var camera_top = pixelSize * 90;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}

step(); //kick off the first step!


document.addEventListener("DOMContentLoaded", () => {
   const character = document.querySelector(".character");
   const npc = document.querySelector(".npc1");
   const npc2 = document.querySelector(".npc2");
   const npc3 = document.querySelector(".npc3");
   const popup = document.querySelector(".npc1-popup");
   const popup2 = document.querySelector(".npc2-popup");
   const popup3 = document.querySelector(".npc3-popup");

   let isPopupVisible = false;
   let isPopupVisible2 = false;
   let isPopupVisible3 = false;
   const speed = 5;
   const proximityThreshold = 75; // Distance in pixels to trigger popup

   function togglePopup1(show) {
       isPopupVisible = show;
       popup.classList.toggle("hidden", !show);
   }
   function togglePopup2(show) {
      isPopupVisible2 = show;
      popup2.classList.toggle("hidden", !show);
   }
   function togglePopup3(show) {
      isPopupVisible3 = show;
      popup3.classList.toggle("hidden", !show);
   }

   function checkProximity1() {
       const characterRect = character.getBoundingClientRect();
       const npcRect = npc.getBoundingClientRect();

       const dx = (characterRect.left + characterRect.width / 2) - (npcRect.left + npcRect.width / 2);
       const dy = (characterRect.top + characterRect.height / 2) - (npcRect.top + npcRect.height / 2);
       const distance = Math.sqrt(dx * dx + dy * dy);

       return distance < proximityThreshold;
   }

   function checkProximity2() {
      const characterRect = character.getBoundingClientRect();
      const npcRect2 = npc2.getBoundingClientRect();

      const dx = (characterRect.left + characterRect.width / 2) - (npcRect2.left + npcRect2.width / 2);
      const dy = (characterRect.top + characterRect.height / 2) - (npcRect2.top + npcRect2.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance < proximityThreshold;
   }

   function checkProximity3() {
      const characterRect = character.getBoundingClientRect();
      const npcRect3 = npc3.getBoundingClientRect();

      const dx = (characterRect.left + characterRect.width / 2) - (npcRect3.left + npcRect3.width / 2);
      const dy = (characterRect.top + characterRect.height / 2) - (npcRect3.top + npcRect3.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance < proximityThreshold;
   }

   // Continuously check proximity
   function gameLoop() {
       const isClose = checkProximity1();
       const isClose2 = checkProximity2();
       const isClose3 = checkProximity3();

      if (isClose && !isPopupVisible) {
         console.log("Aproape de 1");
         togglePopup1(true);
      } else if (!isClose && isPopupVisible) {
         togglePopup1(false);
      }

      if (isClose2 && !isPopupVisible2) {
         console.log("Aproape de 2");
         togglePopup2(true);
      } else if (!isClose2 && isPopupVisible2) {
         togglePopup2(false);
      }

      if (isClose3 && !isPopupVisible3) {
         console.log("Aproape de 3");
         togglePopup3(true);
      } else if (!isClose3 && isPopupVisible3) {
         togglePopup3(false);
      }
       
       requestAnimationFrame(gameLoop); // Keep the loop running
   }
   // Start the game loop
   gameLoop();
});



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});


/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}





document.addEventListener("DOMContentLoaded", () => {
   const fileInput = document.getElementById("fileInput");
   const previewButton = document.getElementById("previewButton");
   const processButton = document.getElementById("processButton");
   const previewCanvas = document.getElementById("previewCanvas");
   const ctx = previewCanvas.getContext("2d");

   // Setăm dimensiunile canvasului
   previewCanvas.width = 300;
   previewCanvas.height = 150;

   // Funcție pentru a afișa imaginea brută
   const previewImage = () => {
       const file = fileInput.files[0];
       if (file) {
           console.log("Previewing image...");

           const reader = new FileReader();

           reader.onload = function (event) {
               const img = new Image();
               img.onload = function () {
                   console.log("Image loaded for preview");

                   // Curăță canvasul
                   ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

                   // Redimensionează și desenează imaginea
                   const scale = Math.min(
                       previewCanvas.width / img.width,
                       previewCanvas.height / img.height
                   );

                   const x = (previewCanvas.width - img.width * scale) / 2;
                   const y = (previewCanvas.height - img.height * scale) / 2;

                   console.log(`Drawing image on canvas at x: ${x}, y: ${y}`);
                   ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
               };
               img.src = event.target.result;
           };

           reader.readAsDataURL(file);
       } else {
           alert("Select a file first!");
           console.log("No file selected.");
       }
   };

   // Funcție pentru a pixeliza imaginea aleasă direct pe client
   const processImage = () => {
       const file = fileInput.files[0];
       console.log("Processing image...");

       if (file) {
           const reader = new FileReader();

           reader.onload = function (event) {
               const img = new Image();
               img.onload = function () {
                   console.log("Image loaded for processing...");

                   // Curăță canvasul
                   ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

                   // Call the existing pixelate function to process the image
                   console.log("Calling pixelate function...");
                   pixelate({
                       image: img, // The image object to pixelate
                       width: 30, // Target width for pixelation (you can adjust this value)
                       dither: 'none', // Optional: Set dithering effect
                       strength: 5, // Optional: Control the pixelation strength
                       resolution: 'original', // Optional: Keep original resolution
                   }).then((pixelatedCanvas) => {
                       console.log("Pixelation complete, drawing on canvas...");

                       // Scale and display the pixelated image
                       const scale = Math.min(
                           previewCanvas.width / pixelatedCanvas.width,
                           previewCanvas.height / pixelatedCanvas.height
                       );

                       const x = (previewCanvas.width - pixelatedCanvas.width * scale) / 2;
                       const y = (previewCanvas.height - pixelatedCanvas.height * scale) / 2;

                       console.log(`Drawing pixelated image on canvas at x: ${x}, y: ${y}`);
                       ctx.drawImage(pixelatedCanvas, x, y, pixelatedCanvas.width * scale, pixelatedCanvas.height * scale);
                   });
               };

               img.src = event.target.result;
           };

           reader.readAsDataURL(file);
       } else {
           alert("Select a file first!");
           console.log("No file selected for processing.");
       }
   };

   // Event listeners pentru butoane
   previewButton.addEventListener("click", previewImage);
   processButton.addEventListener("click", processImage);
});


async function checkEmail(email) {
   // URL encode the email (since it's part of the URL)
   const encodedEmail = encodeURIComponent(email);
   
   try {
     // Fetch the breach data from Have I Been Pwned API
     const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodedEmail}`);
     console.log(response);
     if (response.ok) {
      const data = await response.json();
      
      // Check if breaches are found
      if (data.breaches && data.breaches.length > 0) {
        return `This email has been involved in the following breaches: ${data.breaches.join(", ")}`;
      } else {
        return "No breaches found for this email.";
      }
    } else {
      const errorData = await response.json();
      return `Error: ${errorData.Error}`;
    }
   } catch (error) {
     // If an error occurs during fetch or processing
     return `An error occurred: ${error.message}`;
   }
 }
 
 // Event listener for the email check form
 document.querySelector('#emailButton').addEventListener('click', async () => {
   const email = document.querySelector('#emailInput').value; // Get email from input field
   
   // Ensure the email is valid before checking
   if (!email) {
     alert("Please enter a valid email address.");
     return;
   }
 
   // Display loading message while checking
   document.querySelector('#resultEmail').innerHTML = "Checking for breaches...";
 
   // Call the checkEmail function and display the result
   const result = await checkEmail(email);
   document.querySelector('#resultEmail').innerHTML = result;
 });



 async function checkPhishingVirusTotal(url) {
   const apiKey = 'ba8a9775541115566da9a45a582f876aed7a81a8aa30ed181be090082a20942f';
   const apiUrl = 'https://www.virustotal.com/api/v3/urls';
   
   // URL encode the input using base64 urlsafe encoding
   const urlEncoded = btoa(url).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
   
   const headers = {
     "x-apikey": apiKey
   };
 
   try {
     // Add a proxy (for testing purposes, make sure to replace with your own proxy for production)
     const response = await fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}/${urlEncoded}`, {
       method: 'GET',
       headers: headers
     });
     
     // Check if the response is ok (status code 200)
     if (response.ok) {
       const data = await response.json();
       const maliciousCount = data.data.attributes.last_analysis_stats.malicious;
 
       if (maliciousCount > 0) {
         return "URL-ul este periculos (phishing sau malware).";
       } else {
         return "URL-ul este sigur.";
       }
     } else {
       const errorData = await response.json();
       return `Eroare la verificarea URL-ului: ${response.status} - ${errorData.error}`;
     }
   } catch (error) {
     console.error('Request failed:', error);  // Log detailed error information
     return `A apărut o eroare: ${error.message}`;
   }
 }
 
 // Event listener for the link verification form
 document.querySelector('#linkButton').addEventListener('click', async () => {
   const url = document.querySelector('#linkInput').value; // Get URL from input field
   
   if (!url) {
     alert("Please enter a valid URL address.");
     return;
   }
   
   document.querySelector('#resultLink').innerHTML = "Checking for phishing...";
 
   const result = await checkPhishingVirusTotal(url);
   document.querySelector('#resultLink').innerHTML = result;
 });
 



//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));