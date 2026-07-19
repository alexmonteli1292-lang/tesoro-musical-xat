/* ======================================
   TESORO MÚSICAL
   SCRIPT.JS XAT
====================================== */


// ELEMENTOS

const playBtn = document.querySelector(".play");

const audio = document.querySelector("audio");


const volumeControl = document.querySelector("#volume");

const muteBtn = document.querySelector("#mute");


const songTitle = document.querySelector(".song h2");

const listeners = document.querySelector(".listeners strong");


const streamURL = "https://antyserv.in/8088/stream";

/* ======================================
   ECUALIZADOR EN TIEMPO REAL
====================================== */

let audioContext = null;

let analyser = null;

let source = null;

let frequencyData = null;

let equalizerBars =
document.querySelectorAll(".equalizer span");


// AUDIO

if(audio){

    audio.src = "";

}




// VOLUMEN

if(volumeControl){

    volumeControl.addEventListener("input",()=>{

        audio.volume = volumeControl.value / 100;

    });

}





// MUTE

if(muteBtn){

    muteBtn.addEventListener("click",()=>{


        if(audio.volume > 0){


            audio.dataset.volume = audio.volume;


            audio.volume = 0;


            muteBtn.innerHTML="🔇";


        }else{


            audio.volume = audio.dataset.volume || 0.8;


            muteBtn.innerHTML="🔊";


        }


    });

}






// PLAY / PAUSA


let playing=false;



if(playBtn){


    playBtn.addEventListener("click",()=>{


        if(!audio){

            return;

        }



        if(playing){


            audio.pause();

            audio.src="";


            playBtn.innerHTML="▶";


            playing=false;



        }else{


            audio.src=streamURL;

audio.load();

audio.play().catch(error=>{

    console.log("Error audio:",error);

});



            playBtn.innerHTML="❚❚";


            playing=true;


        }



    });



}







// INFORMACION RADIO


async function updateRadio(){


    try{


        const response = await fetch(
            "https://antyserv.in/cp/get_info.php?p=8088"
        );


        const data = await response.json();



        if(data){



            if(songTitle){


                let fullSong =

                data.song ||

                data.title ||

                data.current_song ||

                "TESORO MÚSICAL";



                fullSong = fullSong.replace(
                    /\.(mp3|aac|ogg|wav|m4a)$/i,
                    ""
                );



                let parts = fullSong.split(" - ");



                let artist = parts[0] || "Artista";

                let title = parts[1] || fullSong;



                songTitle.innerHTML = title;



                const artistText =
                document.querySelector(".song p");



                if(artistText){

                    artistText.innerHTML = artist;

                }


            }






            const cover =
            document.querySelector(".cover img");



            if(cover){



                let image =

                data.art ||

                data.cover ||

                data.artwork ||

                data.image ||

                data.albumart ||

                data.song_image;



                if(image && !image.includes("nocover.png")){


                    cover.src=image;



                    cover.onerror=()=>{

                        cover.src="img/logo.png";

                    };


                }else{


                    cover.src="img/logo.png";


                }



            }







            if(listeners){


                listeners.innerHTML =
                data.listeners || "0";


            }



        }




    }catch(error){


        console.log(
            "Esperando información del servidor"
        );


    }



}




// ACTUALIZAR INFORMACION

setInterval(
    updateRadio,
    3000
);/* ======================================
   NOTAS MUSICALES AL PASAR EL MOUSE
====================================== */

const xatPlayer = document.querySelector(".player");

const musicalNotes = ["♪","♫","♬","♩"];

const noteColors = [
    "#00b140", // verde
    "#ffffff", // blanco
    "#ce1126"  // rojo
];

let lastNoteTime = 0;

if(xatPlayer){

    xatPlayer.addEventListener("mousemove",(event)=>{

        const now = Date.now();

        // Evita crear demasiadas notas
        if(now - lastNoteTime < 55){
            return;
        }

        lastNoteTime = now;

        const playerPosition =
        xatPlayer.getBoundingClientRect();

        const note =
        document.createElement("span");

        note.className = "mouse-note";

        note.textContent =
        musicalNotes[
            Math.floor(
                Math.random() *
                musicalNotes.length
            )
        ];

        note.style.color =
        noteColors[
            Math.floor(
                Math.random() *
                noteColors.length
            )
        ];

        note.style.left =
        `${event.clientX - playerPosition.left}px`;

        note.style.top =
        `${event.clientY - playerPosition.top}px`;

        note.style.fontSize =
        `${14 + Math.random() * 12}px`;

        xatPlayer.appendChild(note);

        setTimeout(()=>{

            note.remove();

        },1100);

    });

}