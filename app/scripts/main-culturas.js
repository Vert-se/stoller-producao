$(function() {

    var sliderWrapperClass = 'slide-wrapper';

    var onNextTick = function(f, context) {
        return window.setTimeout(function() {
            f.call(context);
        }, 0);
    };

    var getCultureFromBody = function() {
        return $('body').attr('class').split(' ')[1];
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

    if(window.Culturas) {
        (function() {
            var cultureName = getCultureFromBody(),
                baseUrl = window.Culturas.baseUrl,
                carrosseis = window.Culturas.pages[cultureName],
                $carrList = $('.sessao-galeria');

            if(!carrosseis) return;


            carrosseis.forEach(function(carr, i) {
                var $carrWrapper = $carrList.eq(i);
                $carrWrapper.addClass(carr.type);

                // Carrossel da animação
                if(carr.type === 'animacao') {
                    $imageWrapper = $('<img src="' + baseUrl + 'empty.png" class="empty">'),
                    $carrWrapper.append($imageWrapper);
                    carr.steps.forEach(function(step, i) {

                        var imgSrc = baseUrl + cultureName + '/' + (i + 1) + '.png',
                            $slideWrapper = $('<div class="' + sliderWrapperClass + '">'),
                            $imageWrapper = $('<img src="' + imgSrc + '" class="image-wrapper">'),
                            $textWrapper = $('<aside class="sessao-galeria-text">');

                        if(step.html.length) $textWrapper.html(step.html);

                        $carrWrapper.append($slideWrapper.append($textWrapper, $imageWrapper));
                    });

                    var scroller = new Scroller($carrWrapper, sliderWrapperClass);
                }

            });

        })();
    }
});