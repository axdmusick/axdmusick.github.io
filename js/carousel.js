// https://www.sliderrevolution.com/resources/bootstrap-carousel/
function getItems() {
    return $("#carousel > div");
}

function wrapNext($el, $items) {
    return $el.next().length ? $el.next() : $items.first();
}

function wrapPrev($el, $items) {
    return $el.prev().length ? $el.prev() : $items.last();
}

function normalizeSelected() {
    const $items = getItems();
    if (!$items.length) return;

    // Si hay más de un selected, deja solo el primero
    const $selectedAll = $items.filter(".selected");
    if ($selectedAll.length > 1) {
        $selectedAll.removeClass("selected");
        $selectedAll.first().addClass("selected");
    }

    // Si no hay selected, pon el primero
    if ($items.filter(".selected").length === 0) {
        $items.removeClass();
        $items.first().addClass("selected");
    }
}

function renderFromSelected($selected) {
    const $items = getItems();
    const total = $items.length;
    if (!total) return;

    // Reset: deja limpios (sin clases) y luego asigna
    $items.removeClass();

    const $prev = wrapPrev($selected, $items);
    const $next = wrapNext($selected, $items);
    const $prevSecond = wrapPrev($prev, $items);
    const $nextSecond = wrapNext($next, $items);

    $selected.addClass("selected");
    $prev.addClass("prev");
    $next.addClass("next");
    $prevSecond.addClass("prevLeftSecond");
    $nextSecond.addClass("nextRightSecond");

    // Oculta el resto a la derecha empezando desde el siguiente al nextSecond
    let $cursor = wrapNext($nextSecond, $items);
    while (!$cursor.is($selected) && !$cursor.is($prev) && !$cursor.is($prevSecond)) {
        // si ya está en uno de los visibles, no lo ocultes
        if (!$cursor.hasClass("selected") && !$cursor.hasClass("prev") && !$cursor.hasClass("next")
            && !$cursor.hasClass("prevLeftSecond") && !$cursor.hasClass("nextRightSecond")) {
            $cursor.addClass("hideRight");
        }
        $cursor = wrapNext($cursor, $items);
        // safety
        if ($cursor.length === 0) break;
    }

    // Oculta el resto a la izquierda empezando desde el anterior al prevSecond
    $cursor = wrapPrev($prevSecond, $items);
    while (!$cursor.is($selected) && !$cursor.is($next) && !$cursor.is($nextSecond)) {
        if (!$cursor.hasClass("selected") && !$cursor.hasClass("prev") && !$cursor.hasClass("next")
            && !$cursor.hasClass("prevLeftSecond") && !$cursor.hasClass("nextRightSecond")) {
            $cursor.addClass("hideLeft");
        }
        $cursor = wrapPrev($cursor, $items);
        if ($cursor.length === 0) break;
    }
}

function moveToSelected(element) {
    normalizeSelected();

    const $items = getItems();
    if (!$items.length) return;

    let $selected = $items.filter(".selected").first();

    if (element === "next") {
        $selected = wrapNext($selected, $items);
    } else if (element === "prev") {
        $selected = wrapPrev($selected, $items);
    } else {
        $selected = $(element);
        if (!$selected.length) $selected = $items.first();
    }

    renderFromSelected($selected);
}

// INIT
$(function () {
    normalizeSelected();
    moveToSelected($(".selected").first());
});

// Teclado
$(document).keydown(function (e) {
    if (e.which === 37) { // left
        moveToSelected("prev");
        e.preventDefault();
    } else if (e.which === 39) { // right
        moveToSelected("next");
        e.preventDefault();
    }
});

// Click en item
$("#carousel").on("click", "div", function () {
    moveToSelected($(this));
});

// Botones
$("#prev").click(function () {
    moveToSelected("prev");
});
$("#next").click(function () {
    moveToSelected("next");
});

/* ===== AUTOPLAY INFINITO (opcional) ===== */
let autoplayMs = 3000; // cambia velocidad
let autoplay = setInterval(() => moveToSelected("next"), autoplayMs);

// Pausa al hover
$("#carousel").hover(
    function () { clearInterval(autoplay); },
    function () { autoplay = setInterval(() => moveToSelected("next"), autoplayMs); }
);
