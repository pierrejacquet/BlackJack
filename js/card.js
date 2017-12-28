// GRAB FUNCTION
(function($) {
  $.fn.drags = function(opt) {
    opt = $.extend(
      { handle: "", cursor: "url(asset/grab.png) 10 2, auto" },
      opt
    );

    if (opt.handle === "") {
      var $el = this;
    } else {
      var $el = this.find(opt.handle);
    }

    return $el
      .css("cursor", opt.cursor)
      .on("mousedown", function(e) {
        if (opt.handle === "") {
          var $drag = $(this).addClass("draggable");
        } else {
          var $drag = $(this)
            .addClass("active-handle")
            .parent()
            .addClass("draggable");
        }
        var z_idx = $drag.css("z-index"),
          drg_h = $drag.outerHeight(),
          drg_w = $drag.outerWidth(),
          pos_y = $drag.offset().top + drg_h - e.pageY,
          pos_x = $drag.offset().left + drg_w - e.pageX;
        $drag
          .css("z-index", 1000)
          .parents()
          .on("mousemove", function(e) {
            $(".draggable")
              .offset({
                top: e.pageY + pos_y - drg_h,
                left: e.pageX + pos_x - drg_w
              })
              .on("mouseup", function() {
                $(this)
                  .removeClass("draggable")
                  .css("z-index", z_idx);
              });
          });
        e.preventDefault(); // disable selection
      })
      .on("mouseup", function() {
        if (opt.handle === "") {
          $(this).removeClass("draggable");
        } else {
          $(this)
            .removeClass("active-handle")
            .parent()
            .removeClass("draggable");
        }
      });
  };
})(jQuery);

var step = 1;
var path = "img/card/";
var score = 0;

var myCards = {
  1: { path: "C2.png", value: 2 },
  2: { path: "C3.png", value: 3 },
  3: { path: "C4.png", value: 4 },
  4: { path: "C5.png", value: 5 },
  5: { path: "C6.png", value: 6 },
  6: { path: "C7.png", value: 7 },
  7: { path: "C8.png", value: 8 },
  8: { path: "C9.png", value: 9 },
  9: { path: "C10.png", value: 10 },
  10: { path: "CA.png", value: 11 },
  11: { path: "CR.png", value: 10 },
  12: { path: "CD.png", value: 10 },
  13: { path: "CV.png", value: 10 },
  14: { path: "K2.png", value: 2 },
  15: { path: "K3.png", value: 3 },
  16: { path: "K4.png", value: 4 },
  17: { path: "K5.png", value: 5 },
  18: { path: "K6.png", value: 6 },
  19: { path: "K7.png", value: 7 },
  20: { path: "K8.png", value: 8 },
  21: { path: "K9.png", value: 9 },
  22: { path: "K10.png", value: 10 },
  23: { path: "KA.png", value: 11 },
  24: { path: "KR.png", value: 10 },
  25: { path: "KD.png", value: 10 },
  26: { path: "KV.png", value: 10 },
  27: { path: "T2.png", value: 2 },
  28: { path: "T3.png", value: 3 },
  29: { path: "T4.png", value: 4 },
  30: { path: "T5.png", value: 5 },
  31: { path: "T6.png", value: 6 },
  32: { path: "T7.png", value: 7 },
  33: { path: "T8.png", value: 8 },
  34: { path: "T9.png", value: 9 },
  35: { path: "T10.png", value: 10 },
  36: { path: "TA.png", value: 11 },
  37: { path: "TR.png", value: 10 },
  38: { path: "TD.png", value: 10 },
  39: { path: "TV.png", value: 10 },
  40: { path: "P2.png", value: 2 },
  41: { path: "P3.png", value: 3 },
  42: { path: "P4.png", value: 4 },
  43: { path: "P5.png", value: 5 },
  44: { path: "P6.png", value: 6 },
  45: { path: "P7.png", value: 7 },
  46: { path: "P8.png", value: 8 },
  47: { path: "P9.png", value: 9 },
  48: { path: "P10.png", value: 10 },
  49: { path: "PA.png", value: 11 },
  50: { path: "PR.png", value: 10 },
  51: { path: "PD.png", value: 10 },
  52: { path: "PV.png", value: 10 }
};
var randomItem = -1;
var cardonboard = [];
var newmoney = 1;

function numberofcard() {
  var nbcard = $("div.gamecard").length;
  console.log(nbcard);
  return nbcard;
}

function animatecard() {
  clicked = this.id;
  console.log(clicked);

  //Animate the card only if it's not already placed on gameboard
  if (!$("#" + clicked).hasClass("onboard")) {
    $("#" + clicked).addClass("grow");
    setTimeout(function() {
      $("#" + clicked).flip(true);
    }, 2000);

    setTimeout(function() {
      $("#" + clicked).removeClass("grow");
      $("#" + clicked).addClass("onboard");
      $("#" + clicked).removeClass("ease");
      $("#" + clicked).addClass("ease2");
    }, 3000);
    setTimeout(function() {
      $(".money").addClass("shaking");
    }, 3200);
    setTimeout(function() {
      $("body *").removeClass("ease2");
      $(".money").removeClass("shaking");
    }, 5000);
  }
}

function randomcard() {
  randomItem = Math.floor(Math.random() * Object.keys(myCards).length);

  while (jQuery.inArray(randomItem, cardonboard) !== -1) {
    randomItem = Math.floor(Math.random() * Object.keys(myCards).length);
  }
  cardonboard.push(randomItem);
  console.log(cardonboard);
  return randomItem;
}

function addcard() {
  var nbcard = numberofcard();
  randomItem = randomcard();
  var nextcardid = nbcard + 1;
  $(
    "<div id='card" +
      nextcardid +
      "' class='gamecard ease'><div class='front'><img src='img/back.png' width='200px'></div><div class='back'><img src='" +
      path +
      myCards[randomItem]["path"] +
      "' class='shadow' width='200px'></div></div>"
  )
    .hide()
    .appendTo("#gameboard")
    .fadeIn(1000);
  clickonCard();
}

function zoom() {
  clicked = this.id;
  $("#" + clicked + " img")
    .css("transform", "scale(1.2,1.2)")
    .fadeIn(1000);
}
function dezoom() {
  clicked = this.id;
  $("#" + clicked + " img")
    .css("transform", "scale(1)")
    .fadeIn(1000);
}

function dialogue() {
  step = step + 1;
  console.log(step);
  if (step == 1) {
    $("#textperceval").text("Bonjour mon roi. Vous vouliez m'voir ?");
    $("#textarthur").text("Euh... Non pas particulièrement.");
  }
  if (step == 2) {
    $("#textperceval").text(
      "Ah au fait... Je vous ai déjà parlé du jeu du pélican ?"
    );
    $("#textarthur").text(" ");
  }
  if (step == 3) {
    $("#textperceval").text(" ");
    $("#textarthur").text(
      "Ah non ! C'est mort, vous commencez pas hein ! Vos jeux foireux on les connait !"
    );
  }
  if (step == 4) {
    $("#textperceval").text(
      "Vous ratez un truc Messire ! Un petit BlackJack Kaamelois alors ? "
    );
    $("#textarthur").text(" ");
  }
  if (step == 5) {
    $("#textperceval").text("");
    $("#textarthur").text(
      "Mais puisque je vous dis que je m'en cogne de vos jeux là ! Vous allez me lâcher la grappe oui ?"
    );
  }
  if (step == 6) {
    $("#textperceval").text(
      "Bon tant pis, pourtant Karadoc il est devenu bon dessus vous savez ?"
    );
    $("#textarthur").text(" ");
  }
  if (step == 7) {
    $("#textperceval").text("");
    $("#textarthur").text(
      "Attendez... Vous voulez dire que Karadoc a pigé votre truc ?"
    );
  }
  if (step == 8) {
    $("#textperceval").text(
      "Carrément, puisque je vous dis que c'est pas compliqué !"
    );
    $("#textarthur").text("...");
  }
  if (step == 9) {
    $("#textperceval").text(" ");
    $("#textarthur").text(
      "Bon allez-y faite moi jouer, mais attention, attention à ce que vous allez baver !"
    );
  }
  if (step == 10) {
    step = 0;
    $("#nextdial").click();
    $("#close").click();
  }
}

function moneygenerator() {
  newmoney = newmoney + 1;
  var newid = "piece" + newmoney;
  $("#gameboard").append(
    '<img src="img/piece.png" class="money" id="' + newid + '">'
  );

  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  var randPosX = Math.floor(Math.random() * (bodyWidth * 0.1));
  var randPosY = Math.floor(Math.random() * (bodyHeight * 0.15));
  var randAngle = Math.floor(Math.random() * 360) + 1;

  $("#" + newid).css("right", randPosX);
  $("#" + newid).css("top", randPosY);
  $("#" + newid).css("margin-top", "60vh");
  $("#" + newid).css("transform", "rotate(" + randAngle + "deg)");
  $(".money").drags();
}

function refreshscore() {
  if (cardonboard.length > 1) {
    var lastcardplayed = cardonboard[cardonboard.length -2]; //La dernière carte de la liste correspondant à celle placée sur le plateau mais non retournée.
    console.log(lastcardplayed);
    score = score + myCards[lastcardplayed]["value"];
    $("#numerateur").text(score);
  }
}

function clickonCard() {
  $(".gamecard").on("click", animatecard);
  $(".gamecard").on("flip:done", addcard);
  $(".gamecard").on("mousedown", zoom);
  $(".gamecard").on("mouseup", dezoom);
  $(".back").drags();
  $(".money").drags();
  $(function($) {
    $(".gamecard").flip({
      trigger: "manual"
    });
  });
  refreshscore();
}

//MAIN
$("#cartestarter").attr("src", path + myCards[randomcard()]["path"]);
$("#nextdial").on("click", dialogue);
$("h1").on("click", moneygenerator);
$("#dialogue").trigger("click");
clickonCard();
