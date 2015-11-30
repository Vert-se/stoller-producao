const site = site || {};

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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    }).on('afterChange', function(e, slick) {
        that.update_boltar_voltar_seta(slick.currentSlide);
    });

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
        l_ext = $('a[rel=external]');

        l_ext.attr('target','_blank');

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

}


site.scroll_item = function(item){
    
    if(!item){ return; }

    var that = this, target_pos = item.position().top - that.h_h - 10;

    $('html, body').stop().animate({
        scrollTop: target_pos
    }, 750, 'easeInOutQuad');
}


$(function(){
    window.site = site;
    window.site.init();
});