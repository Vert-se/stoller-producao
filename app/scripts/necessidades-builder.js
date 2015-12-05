var Necbuilder = function(data) {
    this.data = data;
    this.generate();
};

$.extend(Necbuilder.prototype, {
    breadcrumb: [],

    prefix: 'slide-nec-',

    homeClass: 'home',

    mapClass: 'map',

    nextTarget: {},

    info: {},

    mapStep: 3,

    step: 1,

    forward: function(n) {
        if(this.step > 4) return;
        if((''+n)[0] !== '7' || n.length > 1 || this.step != 1) {
            this.step++;    
        }
        this.transitionSlides(n, true);
    },

    backward: function(n, horti) {
        if(this.step == 1 && !horti) return;
        if(this.step > 1 || !horti) this.step--;
        this.transitionSlides(n, false);
    },

    transitionSlides: function(n, dir) {
        // Show Map
        if(this.step === this.mapStep) {
            this.nextTarget[dir ? 'front' : 'back'] = n;
            return this.render(this.mapClass, dir);
        }
        n = n || this.nextTarget[dir ? 'front' : 'back'];
        this.render(n, dir);
    },

    traverse: function(data, func, context) {
        var that = this;
        
        data = data || this.data;
        if(!data.childs) return;

        // Callback
        func.call(context, data);

        data.childs.forEach(function(node, i) {

            if(data.id) node.parentId = data.id;
            node.parentIndex = data.index || 0;
            node.index = i;

            // Recursão
            that.traverse(node, func, context);

        });
    },

    render: function(cname, front) {
        if(!cname) cname = this.homeClass;
        var that = this,
            $from = $('.home_galeria_item:visible'),
            $to = $('#' + this.prefix + cname),
            fromDir = front ? '-100%' : '100%',
            toDir = front ? '100%' : '-100%';
        this.isAnimating = true;

        $from.animate({ left: fromDir }, 400);
        $to.css({ display: 'block', left: toDir }).animate({ left: 0 }, 400, function() {
            that.isAnimating = false;
            $from.css({ display: 'none' });
            that.updatebackBtn(front, cname);
        });
    },

    updatebackBtn: function(front, cname) {
        this.$btnVoltar[this.step > 1 || cname !== 'home' || front ? 'addClass' : 'removeClass']('visible');
        this.$steps.removeClass('active').eq(this.step - 1).addClass('active');
    },

    generate: function() {
        var that = this;
        this.$wrapper = $('.home_galeria');
        this.$btnVoltar = $('<span id="btn-voltar-necessidades" class="voltar_seta"><</span>');
        this.$dumpHtml = '';
        this.$steps = $('#cultura-home-step span');
        this.$mapBtn = $('.st0'),
        this.$wrapper.prepend(this.$btnVoltar);
        
        this.traverse(this.data, function(node) {
            var root = node.parentId > 10 ?  this.data.childs[6].childs : this.data.childs,
                data = $.extend({ root: root, prefix: this.prefix }, node);

            // Hortifruti
            if(node.id > 10) data.id = data.parentId + '-' + data.id;
            if(node.parentId > 10) data.parentId = '7-' + data.parentId;

            this.$dumpHtml += tmpl(node.type + '-template', data);
        }, this);

        this.$wrapper.append(this.$dumpHtml);

        window.setTimeout(function() {

            that.$slides = $('.home_galeria_item');

            that.$wrapper.find('a').on('click', function(e) {
                e.preventDefault();
                if(that.isAnimating) return;
                var $el = $(this),
                    target = $el.data('target');
                if(!target) return;
                that.forward(target);
            });

            that.$btnVoltar.on('click', function() {
                if(that.isAnimating) return;
                $from = $('.home_galeria_item:visible');
                var id = $from.data('id');
                if(!id) return that.backward(target, id);
                id += '';
                var target = id.replace(/-[^-]+$/, '');
                if(id == target) target = that.homeClass;
                that.backward(target, id == 7);
            });

            that.$mapBtn.on('click', function() {
                that.info.estado = $(this).data('uf');
                that.forward();
            });

            that.init();
        }, 0);
        

    },

    init: function() {
        $('#' + this.prefix + this.homeClass).show();
    }

});


$(function() {
    window.builder = new Necbuilder(Necessidades);
});