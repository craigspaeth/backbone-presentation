$(function() {

  var $stage = $('.stage');
  var $offstage = $('.off-stage');
  var $slides = $offstage.find('.slide');
  var slide_count = $offstage.find('.slide').length;
  var current_slide = 0;

  $offstage.find('.slide').each(function(index, el) {
    $(this).data('index', index);
  });

  var decrement = function() {
    var prev = current_slide - 1;
    if (prev >= 0) {
      setSlide(prev, 'rev');
    }
  };

  var increment = function() {
    var next = current_slide + 1;
    if (next < slide_count) {
      setSlide(next, 'fwd');
    }
  };

  var setSlide = function (index, dir) {
    if (current_slide > index && dir !== 'none') {
      dir = 'back';
    }
    if (current_slide < index && dir !== 'none') {
      dir = 'fwd';
    }
    current_slide = index;
    if (dir !== 'none') {
      swapClasses(dir);
      return;
    }
    $stage.empty();
    setStage(-2, 'far-past');
    setStage(-1, 'past');
    setStage( 0, 'current');
    setStage( 1, 'future');
    setStage( 2, 'far-future');
  };

  var swapClasses = function (dir) {
    if (dir === 'fwd') {
      $stage.find('.far-past').remove();
      $stage.find('.past').removeClass('past').addClass('far-past');
      $stage.find('.current').removeClass('current').addClass('past');
      $stage.find('.future').removeClass('future').addClass('current');
      $stage.find('.far-future').removeClass('far-future').addClass('future');
      setStage(2, 'far-future');
    }
    else {
      $stage.find('.far-future').remove();
      $stage.find('.future').removeClass('.future').addClass('far-future');
      $stage.find('.current').removeClass('current').addClass('future');
      $stage.find('.past').removeClass('past').addClass('current');
      $stage.find('.far-past').removeClass('far-past').addClass('past');
      setStage(-2, 'far-past');
    }
  };

  var setStage = function (index, position) {
    index = current_slide + index;
    if (index >= 0 && index < slide_count) {
      $c = $($slides.get(index)).clone()
      $c.addClass(position)
      if (index === -2) {
        $stage.prepend($c);
      }
      else {
        $stage.append($c);
      }
    }
  }
  
  setSlide(0, 'none');
  var keys = '';
  $(document).keyup(function(event) {
    if (event.keyCode === 37 || event.keyCode === 38) { // LEFT
      decrement();
    }
    if (event.keyCode === 39 || event.keyCode === 40) { // RIGHT
      increment();
    }
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      switch (event.keyCode) {
        case 48: num = 0; break;
        case 49: num = 2; break;
        case 50: num = 2; break;
        case 51: num = 3; break;
        case 52: num = 4; break;
        case 53: num = 5; break;
        case 54: num = 6; break;
        case 55: num = 7; break;
        case 56: num = 8; break;
        case 57: num = 9; break;
      }
      keys = keys + num.toString();
      setTimeout(function() {
        setStage(parseInt(keys), 'none');
        console.log("set ", parseInt(keys));
        keys = '';
      }, 2000);
    }
  });
});

$.extend(true, $.deck.defaults, {
   selectors: {
      hashLink: '.deck-permalink'
   },

   hashPrefix: 'slide-',
   preventFragmentScroll: true
});
