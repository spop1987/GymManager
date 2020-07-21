const currentPage = window.location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    // Si el href de la página actual es igual al href que tomo por atributo
    // if(currentPage == item.getAttribute("href")){
    //     item.classList.add("active")
    // }
    // Otra forma
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

