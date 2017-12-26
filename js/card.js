// GRAB FUNCTION
(function ($) {
    $.fn.drags = function (opt) {

        opt = $.extend({ handle: "", cursor: "url(asset/grab.png) 10 2, auto" }, opt);

        if (opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            if (opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);



var step = 1;

function numberofcard() {
    var nbcard = $('div.gamecard').length;
    console.log(nbcard);
    return nbcard;
}

function animatecard() {
    clicked = this.id;
    console.log(clicked);

    //Animate the card only if it's not already placed on gameboard
    if (!$('#' + clicked).hasClass("onboard")) {
        $('#' + clicked).addClass("grow");
        setTimeout(function () {
            $('#' + clicked).flip(true);
        }, 2000);

        setTimeout(function () {
            $('#' + clicked).removeClass("grow");
            $('#' + clicked).addClass("onboard");
            $('#' + clicked).removeClass("ease");
            $('#' + clicked).addClass("ease2");
        }, 3000);
        setTimeout(function () {
            $(".money").addClass("shaking");
        }, 3200);
        setTimeout(function () {
            $("body *").removeClass("ease2");
            $(".money").removeClass("shaking");
        }, 5000);
    }
}


var randomItem = -1;
var cardonboard=[];
function addcard() {
    var nbcard = numberofcard();
    var myArray = [
        "img/loth.png",
        "img/ygerne.png",
        "img/velec.png",
        "img/percevalcard.png",
        "img/karadoc.png",
        "img/bohort.png",
        "img/merlin.png",
        "img/elias.png",
        "img/damelac.png",
        "img/Blaise.png",
        "img/guenievre.png",
        "img/lancelot.png",
        "img/leodagan.png",
        "img/seli.png",
        "img/yvain.png"
    ];

    randomItem = Math.floor(Math.random() * myArray.length);
    while (jQuery.inArray(randomItem, cardonboard) !== -1){
        randomItem = Math.floor(Math.random() * myArray.length);        
    }

    var nextcardid = nbcard + 1; file:///home/pierre/github/BlackJack/blacblackjackblackjackkjack.html
    $("<div id='card" + nextcardid + "' class='gamecard ease'><div class='front'><img src='img/back.png' width='200px'></div><div class='back'><img src='" + myArray[randomItem] + "' class='shadow' width='200px'></div></div>").hide().appendTo("#gameboard").fadeIn(1000);
    
    cardonboard.push(randomItem);

    eventcall();
}

function zoom(){
    clicked = this.id;
    $("#"+clicked+" img").css('transform', "scale(1.2,1.2)").fadeIn(1000);
}
function dezoom(){
    clicked = this.id;
    $("#"+clicked+" img").css('transform', "scale(1)").fadeIn(1000);
}


function dialogue() {
    step = step + 1;
    console.log(step)
    if (step == 1) {
        $("#textperceval").text("Bonjour mon roi. Vous vouliez m'voir ?");
        $("#textarthur").text("Euh... Non pas particulièrement.");
    }
    if (step == 2) {
        $("#textperceval").text("Ah au fait... Je vous ai déjà parlé du Jeu du pélican ?");
        $("#textarthur").text(" ");
    }
    if (step == 3) {
        $("#textperceval").text(" ");
        $("#textarthur").text("Ah non ! C'est mort vous commencez pas hein ! Vos jeux foireux on les connait !");
    }
    if (step == 4) {
        $("#textperceval").text("Vous ratez un truc Messire ! Un petit BlackJack Kaamelois alors ? ");
        $("#textarthur").text(" ");
    }
    if (step == 5) {
        $("#textperceval").text("");
        $("#textarthur").text("Mais puisque je vous dit que je m'en cogne de vos jeux là ! Vous allez me lachez la grappe oui ?");
    }
    if (step == 6) {
        $("#textperceval").text("Bon tant pis, pourtant Karadoc il est devenu bon dessus vous savez ?");
        $("#textarthur").text(" ");
    }
    if (step == 7) {
        $("#textperceval").text("");
        $("#textarthur").text("Attendez... Vous voulez dire que Karadoc, a pigé votre truc ?");
    }
    if (step == 8) {
        $("#textperceval").text("Carrément, puisque je vous dit que ça va c'est pas compliqué !");
        $("#textarthur").text("...");
    }
    if (step == 9) {
        $("#textperceval").text(" ");
        $("#textarthur").text("Bon allez-y faite moi jouer, mais attention, attention à ce que vous allez faire !");
    }
    if (step == 10) {
        step = 0;
        $("#nextdial").click();
        $("#close").click();
    }
}

var newmoney = 1;
function moneygenerator() {
    newmoney = newmoney + 1;
    var newid = "piece" + newmoney
    $("#gameboard").append('<img src="img/piece.png" class="money" id="' + newid + '">');

    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    var randPosX = Math.floor((Math.random() * (bodyWidth * 0.10)));
    var randPosY = Math.floor((Math.random() * (bodyHeight * 0.15)));
    var randAngle = Math.floor(Math.random() * 360) + 1;

    $("#" + newid).css('right', randPosX);
    $("#" + newid).css('top', randPosY);
    $("#" + newid).css('margin-top', "60vh");
    $("#" + newid).css('transform', 'rotate(' + randAngle + 'deg)');
    $('.money').drags();
}


function eventcall() {
    $(".gamecard").on("click", animatecard);
    $(".gamecard").on('flip:done', addcard);
    $(".gamecard").on('mousedown', zoom);
    $(".gamecard").on('mouseup', dezoom);    
    $('.back').drags();

    $(function ($) {
        $('.gamecard').flip({
            trigger: 'manual'
        });
    });

    $("#nextdial").on("click", dialogue);
    $('.money').drags();
}

$('h1').on("click", moneygenerator);
$( "#dialogue" ).trigger( "click" );
eventcall()


