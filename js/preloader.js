var loader = document.getElementById("preloader");

function disableScroll() {
    var scrollTop = 
      window.scrollY || document.documentElement.scrollTop;
    var scrollLeft = 
      window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}

/*
*/
window.addEventListener("load", function() {
    disableScroll();
    loader.style.display = "none";
    enableScroll();
    }
);


/* debug

window.addEventListener("load", function() {
    disableScroll();

    setTimeout(function() {
       loader.style.display = "none";
       enableScroll();
    }, 5000); 
 });

*/