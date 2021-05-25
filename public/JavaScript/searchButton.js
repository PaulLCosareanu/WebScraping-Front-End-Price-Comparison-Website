function delayText(){
    document.getElementById("announcement").classList.toggle("showText")
}

function searchMenu(){
    document.getElementById("searchMenu").classList.toggle("extendedMenu");
    document.getElementById("icon").classList.toggle("fa-window-close");
    document.getElementById("searchBar").classList.toggle("activeFlex");
    document.getElementById("search").classList.toggle("activeSearch");
    document.getElementById("products").style.display="flex";
    document.getElementById("titleProducts").style.display="none";
    setTimeout(delayText,500);
}

function showProducts(){
    document.getElementById("products").style.display="flex";
    document.getElementById("titleProducts").style.display="block";
    document.getElementById("announcement").style.display="none";
}
// these functions are just for display, they hide or display on certain buttons pressed