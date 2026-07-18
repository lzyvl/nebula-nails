/* =========================================
   NEBULA NAILS
   MAIN JAVASCRIPT
   PART 1
========================================= */



// WAIT FOR PAGE LOAD

document.addEventListener(
"DOMContentLoaded",
()=>{



/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */


const navbar = document.querySelector(".navbar");


window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 80){

        navbar.style.background =
        "rgba(0,0,0,0.85)";

        navbar.style.height =
        "75px";

    }

    else {


        navbar.style.background =
        "rgba(0,0,0,0.35)";

        navbar.style.height =
        "90px";

    }


});









/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */


const revealElements =
document.querySelectorAll(
"section, .service-card, .gallery-item, .review-card, .feature-card"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


    if(entry.isIntersecting){


        entry.target.classList.add(
        "reveal",
        "active"
        );


    }


});


},
{

threshold:0.15

}
);




revealElements.forEach(
(element)=>{


    element.classList.add(
    "reveal"
    );


    observer.observe(element);


});









/* =========================================
   SMOOTH BUTTON HOVER GLOW
========================================= */


const buttons =
document.querySelectorAll(
".primary-btn, .secondary-btn, .nav-button"
);



buttons.forEach(
(button)=>{


button.addEventListener(
"mouseenter",
()=>{


button.style.boxShadow =
"0 20px 50px rgba(247,199,217,.35)";


});




button.addEventListener(
"mouseleave",
()=>{


button.style.boxShadow =
"none";


});



});









/* =========================================
   IMAGE LAZY LOADING
========================================= */


const images =
document.querySelectorAll(
"img"
);



images.forEach(
(img)=>{


img.loading =
"lazy";


});






});

/* =========================================
   PART 2
   PREMIUM INTERACTIONS
========================================= */



document.addEventListener(
"DOMContentLoaded",
()=>{



/* =========================================
   CUSTOM CURSOR
========================================= */


const cursor =
document.createElement("div");


cursor.className =
"custom-cursor";


document.body.appendChild(cursor);



document.addEventListener(
"mousemove",
(e)=>{


cursor.style.left =
e.clientX + "px";


cursor.style.top =
e.clientY + "px";


});




const hoverElements =
document.querySelectorAll(
"a, button, .gallery-item, .service-card"
);



hoverElements.forEach(
(item)=>{


item.addEventListener(
"mouseenter",
()=>{


cursor.classList.add(
"cursor-hover"
);


});



item.addEventListener(
"mouseleave",
()=>{


cursor.classList.remove(
"cursor-hover"
);


});


});









/* =========================================
   GALLERY LIGHTBOX
========================================= */


const galleryImages =
document.querySelectorAll(
".gallery-item img"
);



const lightbox =
document.createElement(
"div"
);


lightbox.className =
"lightbox";


lightbox.innerHTML =
`
<img src="" alt="Nebula Nails">

<span>
×
</span>
`;



document.body.appendChild(
lightbox
);



const lightboxImage =
lightbox.querySelector("img");


const closeLightbox =
lightbox.querySelector("span");




galleryImages.forEach(
(image)=>{


image.addEventListener(
"click",
()=>{


lightboxImage.src =
image.src;


lightbox.classList.add(
"active"
);


});


});



closeLightbox.addEventListener(
"click",
()=>{


lightbox.classList.remove(
"active"
);


});





lightbox.addEventListener(
"click",
(e)=>{


if(e.target === lightbox){

lightbox.classList.remove(
"active"
);

}


});









/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */


const magneticButtons =
document.querySelectorAll(
".primary-btn, .nav-button"
);



magneticButtons.forEach(
(button)=>{


button.addEventListener(
"mousemove",
(e)=>{


const box =
button.getBoundingClientRect();



const x =
e.clientX -
(box.left + box.width / 2);



const y =
e.clientY -
(box.top + box.height / 2);



button.style.transform =
`
translate(
${x * 0.15}px,
${y * 0.15}px
)
`;



});




button.addEventListener(
"mouseleave",
()=>{


button.style.transform =
"translate(0,0)";


});


});








/* =========================================
   PARALLAX HERO IMAGE
========================================= */


const heroImage =
document.querySelector(
".hero-image img"
);



window.addEventListener(
"scroll",
()=>{


if(heroImage){


heroImage.style.transform =
`
translateY(
${window.scrollY * 0.08}px
)
`;

}


});







});

/* =========================================
   PART 3
   FINAL INTERACTIONS
========================================= */



document.addEventListener(
"DOMContentLoaded",
()=>{





/* =========================================
   MOBILE MENU
========================================= */


const header =
document.querySelector(".navbar");



const nav =
document.querySelector(".navbar nav");



const menuButton =
document.createElement("div");


menuButton.className =
"mobile-menu";


menuButton.innerHTML =
`
<span></span>
<span></span>
<span></span>
`;



header.appendChild(menuButton);




menuButton.addEventListener(
"click",
()=>{


nav.classList.toggle(
"mobile-active"
);


menuButton.classList.toggle(
"open"
);


});








/* =========================================
   CLOSE MOBILE MENU WHEN CLICKING LINK
========================================= */


const navLinks =
document.querySelectorAll(
".navbar nav a"
);



navLinks.forEach(
(link)=>{


link.addEventListener(
"click",
()=>{


nav.classList.remove(
"mobile-active"
);


menuButton.classList.remove(
"open"
);


});


});








/* =========================================
   AUTO GALLERY SYSTEM
========================================= */


const galleryFolder =
[
"1.jpg",
"2.jpg",
"3.jpg",
"4.jpg",
"5.jpg",
"6.jpg",
"7.jpg",
"8.jpg",
"9.jpg",
"10.jpg"
];



const galleryContainer =
document.querySelector(
".gallery-grid"
);



if(galleryContainer){


galleryContainer.innerHTML = "";


galleryFolder.forEach(
(image)=>{


galleryContainer.innerHTML +=
`

<div class="gallery-item">

<img 
src="images/gallery/${image}"
alt="Nebula Nails design">

</div>

`;


});


}








/* =========================================
   CONTACT FORM DEMO
========================================= */


const form =
document.querySelector(
".contact-form"
);



if(form){


form.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const button =
form.querySelector(
"button"
);



button.innerHTML =
"Message Sent ✓";



button.style.background =
"#f7c7d9";



setTimeout(
()=>{


button.innerHTML =
"Send Message";


},
3000
);



});


}









/* =========================================
   PINK FLOATING PARTICLES
========================================= */


function createParticle(){


const particle =
document.createElement(
"div"
);



particle.className =
"particle";



particle.style.left =
Math.random()*100+"vw";



particle.style.animationDuration =
(5 + Math.random()*8)+"s";



document.body.appendChild(
particle
);



setTimeout(
()=>{


particle.remove();


},
13000
);


}




setInterval(
createParticle,
900
);





});
