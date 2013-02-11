(function($){
   var directorySlider = function(element, options)
   {
       var elem = $(element),
           obj = this,
           elemId = elem[0].id;

       // Merge config settings
       var config = $.extend({
           animation: 'slide',
           fileBase: 'slide_',
           extension: 'jpg',
           speed: 1000,
           timeout: 4000,
           directory: null,
           numSlides: null,
           height: null,
           width: null
       }, options || {});

       // set slideshow dimensions if set
       if (config.height) {
        $(elem).css('height', config.height);
       }
       if (config.width) {
        $(elem).css('width', config.width);
       }

       $(elem).css('overflow', 'hidden');

       // Get slides
       var slides = [],
       slideNumber = 1;

       while(slideNumber <= config.numSlides){
         slides.push('<img src="' + config.directory + config.fileBase + slideNumber + '.' + config.extension + '" />');
         slideNumber++;
       }

       // append slideshow
       // apply slide wrap 1st
       var slideWrap = $('<div class="' + elemId + '-slide-wrap" ></div>');
           slideWrap.appendTo(elem);

        // append slide and position absolutley
       $.each(slides, function(index, val) {
         $(val).css({
           position: 'absolute',
           top: 0,
           left: 0
         }).appendTo(slideWrap);
       });

    setInterval(function(){
       firstSlide = elem.find('img:first-child'),
       lastSlide = elem.find('img:last-child');
       // Apply animation
       switch(config.animation){

        case 'fade':
            $(lastSlide).animate({
              opacity: 0},
              config.speed, function() {
              $(this).insertBefore(firstSlide).css('opacity', 1);
            });
        break;

        case 'uncover':
            lastSlide.animate({
              marginLeft: -$(this).width()},
              config.speed, function() {
              $(this).insertBefore(firstSlide).css('marginLeft', 0);
            });
            break;
        default:
            $(lastSlide).animate({
              opacity: 0},
              config.speed, function() {
              $(this).insertBefore(firstSlide).css('opacity', 1);
            });
       }
    }, config.timeout);

   };

   $.fn.directorySlider = function(options)
   {
       return this.each(function()
       {
           var element = $(this);

           // Return early if this element already has a plugin instance
           if (element.data('directoryslider')) return;

           // pass options to plugin constructor
           var directoryslider = new directorySlider(this, options);

           // Store plugin object in this element's data
           element.data('directoryslider', directoryslider);

       });
   };
})(jQuery);
