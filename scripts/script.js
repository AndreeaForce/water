$(document).ready(function(){

    $('map area, .backBtn').on('click', function(e) {
        e.preventDefault();
        getPage($(this), true);
        
    });


    var pageAttr = getUrlParam('page');
    window.onpopstate = function(event) {
        pageAttr = event.state;
        if(pageAttr == "" || pageAttr == "main" || pageAttr == null ) {
           
            $('#main').show();
        } else {
            $('#main').hide();
        }
        var pageName = $('[data-page="'+pageAttr+'"]');
        getPage(pageName, false);
    }


    if(pageAttr == "" || pageAttr == "main" ) {
        $('#main').show();
    } else {
        $('#main').hide();
    }
    var pageName = $('[data-page="'+pageAttr+'"]');
    getPage(pageName, false);
});


function applyBlur() {
    $('#main-img').css({'filter': 'blur(3px)',
      'transition': 'all 0.4s ease'
    });
  }

  function removeBlur() {
    $('#main-img').css('filter', '');
  }

  var getUrlParam = function(name, url){
    if(!name){
        return '';
    }
    url = url || location.search;
    name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
    var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
    var match = url.match(reg);
    return !match ? '' : match[1];
};

function getPage(pageName, historyActive) {
    var page = pageName.data('page');
    if(historyActive) {
        history.pushState(page, null, "?page="+page);

    }
    
    if($('#'+page).hasClass('hide')) {
      //  alert(1);
        $('#'+page).fadeToggle(function(){
            $('#'+page).toggleClass('hide');
            $('.backBtn').show();
            $('.description').show();
            $('.description').text(page);
        });
       // $('#main').toggleClass('hide');
    } else {
        $('#main').show();
        $('.page').fadeOut(function(){
            if($('.page:not(.hide)')) {
                $(this).addClass('hide');
               
                $('.backBtn').hide();
                $('.description').hide();
            }     
        });
    }
}
    /* responsive */
    $(document).ready(function() {
        $('map').imageMapResize();
    });

