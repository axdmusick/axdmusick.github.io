
(function ($) {

    "use strict";

    const galleryItems = document.querySelector(".gallery-items").children;
    const prev = document.querySelector(".prev-gallery");
    const next = document.querySelector(".next-gallery");
    const page = document.querySelector(".page-num");
    const maxItem = 8;
    let index = 1;

    const pagination = Math.ceil(galleryItems.length / maxItem);
    console.log(pagination)

    prev.addEventListener("click", function () {
        index--;
        check();
        showItems();
    })
    next.addEventListener("click", function () {
        index++;
        check();
        showItems();
    })

    function check() {
        if (index == pagination) {
            next.classList.add("disabled");
        }
        else {
            next.classList.remove("disabled");
        }

        if (index == 1) {
            prev.classList.add("disabled");
        }
        else {
            prev.classList.remove("disabled");
        }
    }

    function showItems() {
        console.log("datos");
        for (let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].classList.remove("show");
            galleryItems[i].classList.add("hide");


            if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
                galleryItems[i].classList.remove("hide");
                galleryItems[i].classList.add("show");
            }
            page.innerHTML = index;
        }


    }

    window.onload = function () {
        showItems();
        check();
    }

})(window.jQuery);
