$( document ).ready(function() {

  var ROWS = 4;
  var COLUMNS = 4;
  var BASE_X = 20;
  var BASE_Y = 20;
  var FLIP_SPEED = 100;
  var MAX_FLIPPED_CARDS = 2;

  var flippedCards = [];

  var getCardSymbols = function (cardCount) {
    var allSymbols = config.CARD_SYMBOLS;
    var cardSymbols = [];
    for (var i = 0; i < cardCount; i++) {
      var symbolIndex = parseInt(Math.random() * allSymbols.length, 10);
      var symbol = allSymbols[symbolIndex];
      cardSymbols.push(symbol);
      allSymbols.splice(symbolIndex, 1);
    }
    return cardSymbols;
  };

  var getCards = function () {
    var cardCount = ROWS * COLUMNS / 2;
    var symbols = getCardSymbols(cardCount);
    var cards = [];

    for (var i = 0; i < cardCount; i++) {
      // create a pair of cards
      cards.push(Card('card-' + i + '-a', symbols[i]));
      cards.push(Card('card-' + i + '-b', symbols[i]));
    }
    return cards;
  };

  var appendCards = function () {
    var cards = getCards();
    for (var i = 0; i < cards.length; i++) {
      $('#game').append(cards[i]);
      var id = $(cards[i]).find('.card').attr('id');
      var container = $('#' + id).parent();

      var row = parseInt(i / COLUMNS, 10);
      var col = i - row * COLUMNS;
      container.css('left', BASE_X + (col * 120) + 'px');
      container.css('top', BASE_Y + (row * 120) + 'px');
    }
  };

  var flipCard = function (card) {
    card.translate3d({yRotate: 0}, FLIP_SPEED);
    card.addClass('flipped');
  };

  var unflipCard = function (card) {
    card.translate3d({yRotate: -180}, FLIP_SPEED);
    card.removeClass('flipped');
  };

  var bindEvents = function () {
    var flip = function (event) {
      var el = $($(event.target).closest('.card'));
      if (el.hasClass('flipped')) {
        unflipCard(el);
        flippedCards.splice(flippedCards.indexOf(el.attr('id'), 1));
      } else {
        if (flippedCards.length === MAX_FLIPPED_CARDS) {
          for (var i = 0; i < MAX_FLIPPED_CARDS; i++) {
            unflipCard($('#' + flippedCards[i]));
          }
          flippedCards = [];
        }
        flipCard(el);
        flippedCards.push(el.attr('id'));
      }
    };

    $('.card').bind('click', flip);
  };

  appendCards();
  bindEvents();

});
