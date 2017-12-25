function creerImg(chemin) {
    var img = document.createElement('img');
    img.src = chemin;
    return img;
}

function ajoutImgDansDiv() {
    var chemin = "img/1.BMP"
    var newImg = creerImg(chemin);
	var divJS = document.getElementById('maDiv');
    divJS.appendChild(newImg);
}
