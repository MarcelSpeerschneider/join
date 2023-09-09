document.addEventListener("DOMContentLoaded", function () {
    // Der gesamte Code, der darauf wartet, dass das Dokument geladen ist
});

function changeBackgroundColor() {
        var svgElement = document.getElementById('user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "#E1E5EC");
}

function changeBackgroundColorBack() {
        var svgElement = document.getElementById('user-profile-icon');
        var rectElement = svgElement.querySelector('rect');
        rectElement.setAttribute("fill", "white");
}

