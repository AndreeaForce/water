$(document).ready(function(){
    // Initialize Imagemapster plugin
var mainOptions = {
    staticState: false,
    showToolTip: true,
    mapKey: 'name',
    fillOpacity: 1,
    fadeInterval: 100,
    render_highlight: {
      altImage: 'img/main_map.jpg'
    },
    areas: [{
      key: 'sanitary',
      toolTip: 'Administration & Maintenance'
    },
    {
      key: 'pump',
      toolTip: 'Primary Effluent Pump/Lift Station'
    },
    {
      key: 'basin',
      toolTip: 'Primary Settling Basins'
    },
    {
      key: 'digesters',
      toolTip: 'Anaerobic Digesters'
    },
    {
      key: 'fermenters',
      toolTip: 'Fermenters'
    },
    {
      key: 'clarifiers',
      toolTip: 'Primary Clarifiers &amp; Aeration Tanks'
    },
    {
      key: 'bioreactors',
      toolTip: 'Bioreactor'
    },
    {
      key: 'degritters',
      toolTip: 'Cyclone Degritters'
    },
    {
      key: 'secondary_clarifiers',
      toolTip: 'Secondary Clarifiers & Chlorine Tanks'
    },
    {
      key: 'belt_filter',
      toolTip: 'Digesters & Belt Filter Presses'
    }
  ]
  };
  
  var mapOptions = {
    staticState: false,
    fade: true,
    fadeDuration: 350,
    render_highlight: {
      altImage: './assets/alt_pump.png'
    }
  };
  
  $('#main-img').mapster(mainOptions);
  $('#pump_station').mapster(mapOptions);

    $('map area, .backBtn').on('click', function(e) {
        e.preventDefault();
        getPage($(this), true);
        
    });
    

    var pageAttr = getUrlParam('page');
    window.onpopstate = function(event) {
        pageAttr = event.state;
        if(pageAttr == "" || pageAttr == "main" || pageAttr == null) {
           
            $('#main').show();
        } else {
            $('#main').hide();
        }
        var pageName = $('[data-page="'+pageAttr+'"]');
        getPage(pageName, false);
    }


    if(pageAttr == "" || pageAttr == "main") {
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
        });
       // $('#main').toggleClass('hide');
    } else {
        $('#main').show();
        $('.page').fadeOut(function(){
            if($('.page:not(.hide)')) {
                $(this).addClass('hide');
               
                $('.backBtn').hide();
            }
            
        });
    }
}


