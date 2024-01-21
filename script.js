function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  tablet: {
    breakpoint: 0,   
  }
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();

function navAnimation(){
    gsap.to(".nav1 svg",{
        transform: "translateY(-100%)",
        duration:1,
        scrollTrigger:{
            trigger:".pg1",
            scroller:"#main",
            markers:false,
            start: "top 0%",
            end: "top -5%",
            scrub:1.5 
        }
    })
    gsap.to(".nav2 .links",{
        transform: "translateY(-100%)",
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger:".pg1",
            scroller:"#main",
            markers:false,
            start: "top 0%",
            end: "top -5%",
            scrub:1.5 
        }
    })
    
}
navAnimation();

function imgcursor(){
    var img = document.querySelector(".img");
    var play = document.querySelector(".play");

    img.addEventListener("mousemove",function(dets){
        gsap.to(play,{
            left:dets.x-30,
            top:dets.y-30,
            scale:2,
            opacity:1,
            backgroundColor: "#000"
        })
    })
    img.addEventListener("mouseleave",function(){
        gsap.to(play,{
            scale:0,
            opacity:0
        })
    })
    
}
imgcursor();

function loading() {
    gsap.from(".pg1 h1",{
        y:50,
        opacity:0,
        delay:0.5,
        duration:0.8,
        stagger:0.2
    })
    
}
loading();

function pg2div(){
    var detsall = document.querySelectorAll(".dets");
var detsinfo = document.querySelectorAll(".detsinfo");

detsall.forEach(function(elem,index){
    elem.addEventListener("mouseenter",function () {
        gsap.to(elem,{
            height:"250px",
        })
        gsap.to(detsinfo[index],{
          opacity: 1,
           display:"flex"
        })
    })
    elem.addEventListener("mouseleave",function () {
        gsap.to(elem,{
            height:"50px"
        })
        gsap.to(detsinfo[index],{
            opacity: 0,
            display:"none"
        })
    })
})
}
pg2div();

function cursorAnimation() {
    var play = document.querySelector(".play");
    document.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
          left: dets.x-30,
          top: dets.y-30,
        });
      });
      document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
          gsap.to(play, {
            scale:3,
            opacity:1,
            backgroundColor: "#f8dddb"
          });
        });
        elem.addEventListener("mouseleave", function () {
          gsap.to(play, {
            scale:0,
            opacity:0
          });
        });
      });
}
cursorAnimation();

function usertxt(){
    var tab = document.querySelectorAll(".tab");
    var txt = document.querySelectorAll(".tabtxt h1");
    var gola = document.querySelectorAll(".gol");
    var img = document.querySelectorAll(".tab img");
    txt[0].style.display="block";
    gola[0].style.backgroundColor = "#000";
    img[0].style.display="block";
    tab.forEach(function(elem, index){
        elem.addEventListener("click",function(){
            hidetxt();
            gola[index].style.backgroundColor = "#000";
            img[index].style.display="block";
            txt[index].style.display="block";
            gsap.from(txt[index],{
                y:50,
                opacity:0,
                delay:0.5,
                duration:0.8,
                stagger:0.2
            })
        })
    })

    function hidetxt(){
        txt.forEach(function(elem){
            elem.style.display = "none";
        })
        gola.forEach((g)=>{
            g.style.backgroundColor = "transparent";
        })
        img.forEach(function(i){
            i.style.display = "none";
        })
    }
}
usertxt();
