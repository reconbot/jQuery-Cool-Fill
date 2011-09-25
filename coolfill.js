(function($){
  $.fn.coolFill = function(text, opt){
    var settings = {
      speed: 100,
      queueName: 'coolFill',
      coolChars: ['$', '%', '&', '#', '@'],
      coolness: 3
    };

    if(opt){
      $.extend(settings, opt);
    }

    this.each(function(){
      var $this = $(this);
      $this.clearQueue(settings.queueName);

      var scramble = function(shown){
        var text = $(shown).text();
        var scrambleFunc = function(){
            var coolchar = settings.coolChars[ Math.floor(Math.random() * settings.coolChars.length)];
            $(shown).text(text + coolchar);
        };
        for(var i=0; i < settings.coolness; i++){
          setTimeout(scrambleFunc, (settings.speed / settings.coolness * i));
        }
      };

      var settext = function(i){
        return function(next){
          $this.html('');
          var hidden = document.createElement('span');
          var shown  = document.createElement('span');
          $(hidden).css('visibility', 'hidden').text( text.substring(i+1, text.length) );
          $(shown).text( text.substring(0, i) );
          scramble(shown);
          $this.append(hidden, shown);
          next();
        };
      };

      for(var i = 0; i <= text.length; i++){
        $this.queue(settings.queueName, settext(i));
        $this.delay(settings.speed, settings.queueName);
      }
      $this.queue(settings.queueName, function(){
        $this.html('').text(text);
      });

      $this.dequeue(settings.queueName);
    });

    return this;
  };
})(jQuery);
