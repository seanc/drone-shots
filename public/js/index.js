(function($) {
  function getVideoId() {
    
  }
  
  $(function() {
    $('.app').tubular({
      videoId: 'kr_uHrpqvAg'
    });
    
    var toggled = false;
    $('.sidebar-toggle > .toggle-button').on('click', function(e) {
      if (!toggled) {
        toggled = !toggled;          
        return $('.sidebar').addClass('toggled');
      }
      
      $('.sidebar').removeClass('toggled');
      toggled = !toggled;      
    });
    
    $('.gallery-overlay').on('click', function() {
      if ($('.image-view').length) {
        $('.image-view').remove();
      }
      var view = $('<div class="image-view"></div>');
      var image = $('<img>');
      image.attr('src', $(this).parent().find('.gallery-image').attr('src'));
      view.append(image);
      $('.gallery').append(view);
    });
    
    $(document).keyup(function(e) {
      var code = e.which || e.keyCode;
      
      if (code === 27) {
        if ($('.image-view').length) {
          $('.image-view').fadeOut(200, function() {
            $(this).remove();
          });
        }
      }
    });
    
    $('.video-player').each(function() {
      var player = $(this);
      var videoID = player.attr('data-video-id');
      
      var thumb = $('<img>');
      thumb.addClass('gallery-image');
      thumb.attr('src', getVideoThumb(videoID));
      
      player.parent().find('.video-play').on('click', createIFrame);
      
      player.append(thumb);
    });
    
    if (typeof videos !== 'undefined') {
      $('#tubular-shield, #tubular-container').remove();
      $('.fullscreen').tubular({
        videoId: videos[1],
        mute: false
      });
      
      $('.fullscreen-overlay').on('click', rotateVideo);
    }
    
    var current = 0;
    function rotateVideo() {
      if (current >= videos.length) {
        current = 0;
      }

      var player = $('#tubular-player');
      var regex = /\/embed\/(.*?)\?/gi;
      var source = player.attr('src');
      var match = source.match(regex)[0].split('/')[2].replace('?', '');      
      source = source.replace(match, videos[current++]);
      player.attr('src', source);
      // $('.fullscreen').tubular({
      //   videoId: videos[++current]
      // });
    }
    
    function getVideoThumb(id) {
      return '//i.ytimg.com/vi/' + id + '/hqdefault.jpg'
    }
    
    function createIFrame() {
      var player = $(this).parent();
      var iframe = $('<iframe></iframe>');
      iframe.attr('src', "//www.youtube.com/embed/" + player.find('.video-player').attr('data-video-id') + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0');
      iframe.attr('frameborder', '0');
      iframe.attr('allowfullscreen', '');
      iframe.addClass('youtube-iframe');
      
      player.find('.video-play').remove();
      player.find('.gallery-image').remove();
      
      player.append(iframe);
    }
  });
})(jQuery);