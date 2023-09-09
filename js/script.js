document.addEventListener("DOMContentLoaded", function () {
    // Der gesamte Code, der darauf wartet, dass das Dokument geladen ist
});

function changeBackgroundColor() {
        var svgElement = document.querySelector('.user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBack() {
        var svgElement = document.querySelector('.user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "white");
}

function changeBackgroundColorMobile() {
        var svgElement = document.querySelector('.user-profile-icon-mobile');
        rectElement = svgElement.querySelector('circle');
        rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBackMobile() {
        var svgElement = document.querySelector('.user-profile-icon-mobile');
        rectElement = svgElement.querySelector('circle');
        rectElement.setAttribute("fill", "white");;
}
