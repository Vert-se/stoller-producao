window.site = window.site || {};

site.baseEndpoint = 'system/public';

site.init = function(){

    var that = this;

    this.w = $(window);
    this.w_w = this.w.width();
    this.w_h = this.w.height();
    this.resp_w = 850;

    this.b = $('body').eq(0);
    this.b_h = this.b.height();


    // this.h = $('header');
    // this.h_h = this.h.outerHeight() + 1; // 1 de border do pai

    // this.loading = $('#loading');

    this.areas_el = $('.area');
    this.areas_y = [];
    this.areas_active = 0; 
    this.areas_old = '';
    this.areas_pos();

    this.resize();


    this.on_scroll_action();

    this.on_scroll();

    if( $('.area_nav').length > 0 && (this.w_w >= this.resp_w)){
        this.area_nav();
    }else{
        this.link_set();
    }

    $('.grid_gallery').slick({
      dots: false,
      slide: '.grid_box',
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 849,
          settings: "unslick"
        }
      ]
    }).on('afterChange', function(e, slick) {
        that.update_boltar_voltar_seta(slick.currentSlide);
    });

    // $('.banner_gallery').slick({
    //   dots: false,
    //   arrows: false,
    //   slide: '.banner_item',
    //   infinite: true,
    //   speed: 300,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   autoplaySpeed: 10000,
    //   fade: true
    // });

};

site.areas_pos = function(){
    var that = this, c = 0;

    this.areas_el.each(function(){
        var t = $(this), y = t.position().top;
        that.areas_y[c] = y;
        c++;
    });

}

// Oculta ou exibe o botão para voltar à home de "Soluções" - Rafael
site.update_boltar_voltar_seta = function(index) {
    this.$solucoes_voltar_seta = 
        this.$solucoes_voltar_seta || $('.voltar_seta');
    var method = index > 0 ? 'hide' : 'show';
    this.$solucoes_voltar_seta[method]();
}

site.area_nav = function(){
    var that = this, c = 0, an = $('.area_nav'), an_box = '<nav class="area_nav_box"><ul>';

    an.each(function(){
        c++;
        var t = $(this), target = t.attr('id'), title = t.data('title').replace(/ /g, "&nbsp;"), tc = (c==1) ? 'active' : '';

        an_box += '<li class="'+tc+'"><a href="" rel="scroll" data-target="'+target+'" id="an_'+target+'">';
        an_box += '<span>'+title+'</span>';
        an_box += '</a></li>';

    });

    an_box += '</ul></nav>';

    this.b.append(an_box);
    this.link_set();

};

site.areas_check = function(element, index, array) {
    var that = window.site;

    if((that.w_s + 100) >= element){
        that.areas_active = index;
    }
}

site.on_scroll = function(){
    var that = this;


    this.w.scroll(function() {

        that.w_s = that.w.scrollTop();

        that.areas_y.forEach(that.areas_check);

        that.on_scroll_action();

    });


}

site.on_scroll_action = function(){
    var that = this, m = $('.area_nav_box ul');

    if(this.areas_active != this.areas_old){

        this.areas_old = this.areas_active;
        m.find('.active').removeClass('active');
        m.find('li').eq(this.areas_active).addClass('active');
    }
}

site.resize = function(){
    var that = this;

    this.w.on('resize',function(){
        
        that.w_w = that.w.width();
        that.w_h = that.w.height();

        that.b_h = that.b.height();

        that.areas_pos();

    });
};


site.link_set = function(){
    var that = this
        l_menu = $('#menu-open'),
        l_scroll = $('a[rel=scroll]'),
        l_close = $('a[rel=close]'),
        l_modal = $('a[rel=modal]'),
        l_toggle = $('a[rel=toggle]'),
        l_ext = $('a[rel=external]'),
        l_return = $('a[rel=return]');

        l_ext.attr('target','_blank');

        l_return.on('click',function(event){
            event.preventDefault();
        });

        l_menu.on('click',function(event){
            event.preventDefault();

            var t = $(this), a = t.hasClass('active'), m = $('#menu');

            if(a){
                m.slideUp();
            }else{
                m.slideDown();
            }

            t.toggleClass('active');
        });

        l_scroll.on('click',function(event){
            event.preventDefault();

            var t = $(this), target_pos = (t.data('target')) ? $('#'+t.data('target')).position().top : 0;

            $('html, body').stop().animate({
                scrollTop: target_pos
            }, 750, 'easeInOutQuad');

        });

        l_close.on('click',function(event){

            event.preventDefault();

            var t = $(this), target = $(''+t.data('target')+'');

            that.b.toggleClass('modal-active');

            target.fadeOut();
        });

        l_modal.on('click',function(event){

            event.preventDefault();

            var t = $(this), target = $('#modal-overlay,#'+t.data('target'));

            that.b.toggleClass('modal-active');

            target.fadeIn();
        });

        l_toggle.on('click',function(event){

            event.preventDefault();

            var t = $(this), target = $(t.data('target')), toggle = t.data('toggle');

            target.toggleClass(toggle);

        });

};


site.scroll_item = function(item){
    
    if(!item){ return; }

    var that = this, target_pos = item.position().top - that.h_h - 10;

    $('html, body').stop().animate({
        scrollTop: target_pos
    }, 750, 'easeInOutQuad');
};



var getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


var sliderWrapperClass = 'slide-wrapper';

var onNextTick = function(f, context) {
    return window.setTimeout(function() {
        f.call(context);
    }, 0);
};

var getCultureFromBody = function() {
    var classes = $('body').attr('class').split(' ');
    return classes.length && classes[1];
};

var createAnimationCarousel = function($wrapper, carr, cultureName) {
    var baseUrl = window.Culturas.baseUrl,
        $imageWrapper = $('<img src="' + baseUrl + 'empty.png" class="empty">');
    $wrapper.append($imageWrapper);
    carr.steps.forEach(function(step, i) {
        var imgSrc = baseUrl + cultureName + '/' + (i + 1) + '.png',
            $slideWrapper = $('<div class="' + sliderWrapperClass + '">'),
            $imageWrapper = $('<img src="' + imgSrc + '" class="image-wrapper">'),
            $textWrapper = $('<aside class="sessao-galeria-text">');

        if(step.html.length) $textWrapper.html(step.html);

        $wrapper.append($slideWrapper.append($textWrapper, $imageWrapper));
    });

    var scroller = new Scroller($wrapper, sliderWrapperClass);
};

var createDoubleCarousel = function($wrapper, carr, cultureName) {
    var baseUrl = window.Culturas.baseUrl;

    carr.list.forEach(function(carousel) {
        var $carouselWrapper = $('<div class="carousel-single-wrapper" />'),
            $carouselInner = $('<div class="carousel-single-inner" />'),
            $carouselTitle = '<h4>' + carousel.name + '</h4>';

        carousel.steps.forEach(function(step, i) {
            var imgSrc = baseUrl + cultureName + '/carrosseis/' + carousel.type + '/' + (i + 1) + '.png',
                $slideWrapper = $('<div class="slide-single-wrapper">'),
                $imageWrapper = $('<img src="' + imgSrc + '" class="image-wrapper">'),
                $textWrapper = $('<aside class="slide-single-text">'),
                $title = '<h5>' + step.name  + '</h5>',
                $descr = '<p>' + step.description  + '</p>';

            $carouselInner.append($slideWrapper.append($imageWrapper, $textWrapper.append($title, $descr)));
        });

        $wrapper.append($carouselWrapper.append($carouselTitle, $carouselInner));
        $carouselInner.slick({
            dots: false,
            slide: '.slide-single-wrapper',
            infinite: false,
            accessibility: false,
            speed: 300,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });

    });

};

var createChartsCarousel = function($wrapper, carr, cultureName) {
    var baseUrl = window.Culturas.baseUrl,
        thumbUrl = baseUrl + cultureName + '/graficos/thumb.png',
        $carouselWrapper = $('<div class="carousel-charts-wrapper" />'),
        $carouselInner = $('<div class="carousel-charts-inner" />'),
        $thumb = '<img alt="' + cultureName + '" src="' + thumbUrl + '" />',
        $slideWrapper, $imageWrapper, c = 0;

    while(c++ < carr.total) {
        var imgSrc = baseUrl + cultureName + '/graficos/' + c + '.png';
        $slideWrapper = $('<div class="slide-charts-wrapper">');
        $imageWrapper = $('<img src="' + imgSrc + '">');
        $carouselInner.append($slideWrapper.append($imageWrapper));
    }

    $wrapper.append($thumb, $carouselWrapper.append($carouselInner));
    $carouselInner.slick({
        dots: false,
        slide: '.slide-charts-wrapper',
        infinite: false,
        accessibility: false,
        speed: 300,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

};

// SCROLLER CONSTRUCTOR
var Scroller = function($wrapper, slideClass, idx) {
    this.$wrapper = $wrapper;
    this.actualSlide = idx || 0;
    if(slideClass) this.slideClass = slideClass;

    this.createScrollbar();
    onNextTick(function() {
        this.setInitStyles();
        this.setDragEvent();
    }, this);

    this.changeSlide(this.actualSlide);
};


// TEMPLATING ENGINE
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var html = document.getElementById(str).innerHTML,
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            
        // Convert the template into pure JavaScript
        html
          .replace(/[\r\t\n]/g, " ")
          .split("{{").join("\t")
          .replace(/((^|\}\})[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)\}\}/g, "',$1,'")
          .split("\t").join("');")
          .split("}}").join("p.push('")
          .split("\r").join("\\'")
        + "');}return p.join('');");
       
    // Provide some basic currying to the user
    return fn( data );
  };
})();


$(function(){
    window.site = site;
    window.site.init();


    // SCROLLER PROTOTYPE
    $.extend(Scroller.prototype, {
        wrapperClass: 'scroll-wrapper',
        trackClass: 'scroll-track',
        thumbClass: 'scroll-thumb',
        slideClass: 'slide',

        createScrollbar: function() {
            var wrapperHtml = $('<div class="' + this.wrapperClass + '">'),
                trackHtml = $('<div class="' + this.trackClass + '">'),
                thumbHtml = $('<div class="' + this.thumbClass + '">');
            this.$slides = this.$wrapper.find('.' + this.slideClass);
            this.len = this.$slides.length;

            this.$wrapper.append(wrapperHtml.append(trackHtml.append(thumbHtml)));
        },

        setInitStyles: function() {
            this.$scrollWrapper = this.$wrapper.find('.' + this.wrapperClass);
            this.$scrollTrack = this.$wrapper.find('.' + this.trackClass);
            this.$scrollThumb = this.$wrapper.find('.' + this.thumbClass);

            this.$scrollWrapper.css({
                position: 'relative',
                'height': '20px',
                'z-index': 20
            });

            this.$scrollTrack.css({
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                'z-index': 30
            });

            this.$scrollThumb.css({
                position: 'absolute',
                width: (100 / this.len) + '%',
                height: '100%',
                'box-sizing': 'border-box',
                'z-index': 40,
                left: this.getScrollPosition() + '%',
                overflow: 'hidden'
            });
        },

        setDragEvent: function() {
            var that = this;
            // On Drag
            this.$scrollThumb.draggable({
                containment: 'parent',
                drag: function() {
                    var delta = that.indexFromOffset(that.$scrollThumb.position().left);
                    if(delta !== that.actualSlide) {
                        that.actualSlide = delta;
                        that.changeSlide();
                    }
                },
                stop: function() {
                    that.lockScrollThumb();
                }
            });
            // On click
            that.$scrollTrack.on('click', function(e){
                var parentOffset = that.$scrollTrack.parent().offset(); 
                var relX = Math.min(e.pageX - parentOffset.left,
                    that.$scrollTrack.width() / that.len * (that.len - 1));
                var delta = that.indexFromOffset(relX);
                if(delta !== that.actualSlide) {
                    that.actualSlide = delta;
                    that.changeSlide();
                    that.lockScrollThumb();
                }
            });

            this.$scrollThumb.on('click', function(e) { e.stopPropagation(); });
        },

        lockScrollThumb: function() {
            this.$scrollThumb.animate({ left: this.$scrollTrack.width() / this.len * this.actualSlide}, 200);
        },

        indexFromOffset: function(offset) {
            return Math.floor((offset + this.$scrollThumb.width() / 2) /
                this.$scrollTrack.width() * this.len);            
        },

        changeSlide: function() {
            this.$slides.removeClass('visible');
            this.$slides.eq(this.actualSlide).addClass('visible');
        },

        getScrollPosition: function() {
            return 100 / this.len * this.actualSlide;
        }
    });
    
    var fetchPosts = function(data, endpoint, method) {
        var $wrapper = $('#posts-wrapper'),
            type = $wrapper.data('type') || null,
            data = data || { tipo: type },
            method = method || 'html',
            endpoint = endpoint || '/posts',
            catsUrl = {
                depoimento: 'depoimentos.html',
                produtor: 'palavra-do-produtor.html',
                especialista: 'palavra-do-especialista.html'
            };

        $.get(site.baseEndpoint + endpoint, data, function(resp) {
            var output = '';
            resp.forEach(function(item, i) {
                item.cat_url = catsUrl[item.tipo];
                item.hr = i % 2 !== 0;
                output += tmpl('post-template', item);
            });
            $wrapper[method](output);
        });
    };

    var fetchSpecialists = function() {
        var data = {}, selected = false, 
            $wrapper = $('#especialistas'), empty,
            $inner = $('#especialistas-wrapper');
        $('#specialist-options select').each(function() {
            var name = $(this).attr('name'), val = $(this).val();
            data[name] = val;
            if(val) selected = true;
        });

        if(!selected) return;

        $.get(site.baseEndpoint + '/especialistas', data, function(resp) {
            console.log(resp);
            var output = '';
            resp.forEach(function(item, i) {
                output += tmpl('post-template', item);
            });
            empty = $inner.html() == '';
            $inner.html(output);
            if(empty) {
                window.setTimeout(function() {
                    $wrapper.slideDown(400);
                }, 0);
            }
        });
    };

    /* SELECT STATE */
    if($('body').hasClass('especialista-stoller')) {

        (function() {
            var $selectCidade = $('#especialista_cidade'),
                $selectUf = $('#especialista_estado'),
                $btn = $('#btn-filtro-especialista'),
                options = '';

            var popCities = function() {
                var uf = $(this).val(), options = '';
                if(!uf) return;
                $selectCidade.val('');
                $.get(site.baseEndpoint + '/especialistas/cidades/'+uf, function(data){
                    options += "<option value=''>Escolha uma cidade...</option>";
                    for(var i in data) {
                        options += "<option value='"+data[i]+"'>"+data[i]+"</option>";
                    }
                    $selectCidade.html(options);
                });
            };

            $.get(site.baseEndpoint + '/especialistas/estados', function(data){
                options += "<option value=''>Escolha um estado...</option>";
                for(var i in data) {
                    options += "<option value='"+data[i]+"'>"+i+"</option>";
                }
                $selectUf.html(options);                
            });

            $selectUf.on('change', popCities);

            $btn.on('click', fetchSpecialists);
        })();
    }

    /* NEWSLETTER */
    $('form.newsletter').on('submit', function(e) {
        $alert = $('.form-message');
        $alert.prop('class', 'form-message').html('');
        e.preventDefault();
        $.post(site.baseEndpoint + '/newsletter', $(this).serialize(), function(resp) {
            if(resp.error) { $alert.addClass('error').html(resp.error); }
            if(resp.success) { $alert.addClass('success').html(resp.success); }
        });
    });
    
    // Posts aggregation
    if($('#posts-wrapper').length) {
        fetchPosts();
    }
    // Posts aggregation
    if($('#post-single').length) {
        (function() {
            var id = getParameterByName('id'),
                $wrapper = $('#post-single');

            if(!id) return;

            $.get(site.baseEndpoint + '/posts/' + id, function(resp) {
                $wrapper.html(tmpl('post-template', resp));
            });
        })();
    }

    // Populate testimonials filters
    if($('#filtros-depoimentos').length) {
        (function() {
            var $filtros = $('#filtros-depoimentos select'),
                data = {};
            $filtros.on('change', function() {
                $filtros.each(function() {
                    data[$(this).attr('name')] = $(this).val();
                });
                fetchPosts(data, '/depoimentos', 'html');
            });
        })();
    }

    if($('#localizacao-mapa').length) {

        window.initMap = function() {

            var map,
                $links = $('#map-navigator a');
            var setCenter = function(e) {
                var $el = $(this),
                    center = {lat: +$el.data('lat'), lng: +$el.data('lng') - 0.02};
                e.preventDefault();
                $links.removeClass('active');
                $el.addClass('active');
                map.setCenter(center);
            };
            $links.on('click', setCenter);
            // var  = new google.maps.LatLng(-33.8665433, 151.1956316);
            // Create a map object and specify the DOM element for display.
            map = new google.maps.Map(document.getElementById('localizacao-mapa'), {
                scrollwheel: true,
                center: {lat: -34.397, lng: 150.644},
                zoom: 14
            });

            $links.each(function() {
                var $el = $(this),
                    myLatlng = new google.maps.LatLng($el.data('lat'), $el.data('lng')),
                    marker = new google.maps.Marker({
                        position: myLatlng
                    });
                if($el.hasClass('active')) $el.trigger('click');
                marker.setMap(map);
            });
        };

        var script = document.createElement('script');
        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAQaA1D_HflSCzQCrxS9u3mh_NzzCC2PNs&callback=initMap";
        document.body.appendChild(script);

    }


    if(window.Culturas && $('.sessao-galeria').length) {
        (function() {
            var cultureName = getCultureFromBody(),
                carrosseis = window.Culturas.pages[cultureName],
                $carrList = $('.sessao-galeria');

            if(!carrosseis) return;


            carrosseis.forEach(function(carr, i) {
                var $carrWrapper = $carrList.eq(i);
                $carrWrapper.addClass(carr.type);

                // Carrossel da animação
                if(carr.type === 'animacao') {
                    createAnimationCarousel($carrWrapper, carr, cultureName);
                }
                // Carrossel das bolinhas
                if(carr.type === 'double') {
                    createDoubleCarousel($carrWrapper, carr, cultureName);
                }
                // Carrossel dos gráficos
                if(carr.type === 'grafico') {
                    createChartsCarousel($carrWrapper, carr, cultureName);
                }

            });

        })();
    }
});