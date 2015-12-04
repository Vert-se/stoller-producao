var Necbuilder = function(data) {
    this.data = data;
    this.actualPage = this.data;
    this.generate();
};

$.extend(Necbuilder.prototype, {
    
    deep: [],

    breadcrumb: [],

    prefix: 'slide-nec-',

    homeClass: 'home',

    mapClass: 'map',

    goTo: function(n) {
        if(!this.actualPage.childs) return;
        // Show Map
        if(this.root && this.deep.length === this.root.map_deep) {
            if(n) this.deep.push(n);
            this.breadcrumb.push('Map');
            return this.render(this.mapClass);
        }
        if(n) {
            this.deep.push(n);
            // this.traverse();
        }
        this.render(this.getClass(), true);
    },

    /*traverse: function() {
        var page = this.data, c = 0;
        while(this.deep[c] !== undefined) {
            page = page.childs[c];
            if(c === 0) this.root = page;
            c++;
        }

        if(page.name) this.breadcrumb.push(page.name);
        this.actualPage = page;
        return page;
    },*/

    traverse: function(data, func, context) {
        var that = this;
        data = data || this.data;
        if(!data.childs) return;
        func.call(context, data);
        data.childs.forEach(function(node, i) {
            var parent = '';
            var parentPath = data.path || '';
            var path = node.slug || node.id || '';
            if(data.parent) parent += data.parent + '-';
            node.parent = parent + node.id;
            node.path = parentPath + '/' + path;
            node.index = i;
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
            that.updatebackBtn();
        });
    },

    updatebackBtn: function() {
        this.$btnVoltar[this.deep.length ? 'addClass' : 'removeClass']('visible');
    },

    getClass: function() {
        return this.deep.join('-');
    },

    generate: function() {
        var that = this;
        this.$wrapper = $('.home_galeria');
        this.$slides = $('.home_galeria_item');
        this.$btnVoltar = $('<span id="btn-voltar-necessidades" class="voltar_seta"><</span>');
        this.$wrapper.prepend(this.$btnVoltar);
        this.generateCultura(this.data, this.homeClass);
        this.traverse(this.data, function(node) {
            if(node.name === 'Cultura') {
                this.generateNecessidade(node);
            }
            if(node.name === 'Necessidade') {
                this.generateSolucao(node);
            }
            /*if(node.name === 'Group') {
                this.generateCultura(node);
            }*/
        }, this);

        console.log(this.data);

        window.setTimeout(function() {
            that.$wrapper.find('a').on('click', function(e) {
                e.preventDefault();
                if(that.isAnimating) return;
                var $el = $(this),
                    target = $el.data('target');
                if(!target) return;
                that.goTo(target);
            });
            that.init();
        }, 0);
        

    },

    generateNecessidade: function(node) {
        var $wrapper = $('<section id="' + this.prefix + node.parent + '" class="inner inner_small home_galeria_item">');
        var $header = '<h2 class="title_green mbn ttn">' +
              '<span class="db grey light">Qual é a sua</span> necessidade?' +
            '</h2>' +
            '<p>Veja as alternativas abaixo e clique no que corresponde ao que você busca.</p>';

        var $inner = $('<section class="inner inner_micro">');
        var $innerMicro = $('<section class="grid grid_3 grid_center">');

        node.childs.forEach(function(item, i) {
            $item = '<article class="grid_item border">' +
                  '<a href="" data-target="' + item.id + '" rel="return" class="full">' +
                    '<img src="images/home/' + node.slug + '/necessidade/' + item.id + '.png" alt="">' +
                    '<span>' +
                      item.text +
                    '</span>' +
                  '</a>' +
                '</article>';
            $innerMicro.append($item);
        });

        this.$wrapper.append($wrapper.append($header, $inner.append($innerMicro)));
    },

    generateCultura: function(node, sufix) {
        var $wrapper = $('<section id="' + this.prefix + sufix + '" class="inner inner_small home_galeria_item">');
        var $header = '<h2 class="title_green mbn ttn">' +
              '<span class="db grey light">Selecione</span> A SUA CULTURA' +
            '</h2>' +
            '<p>Clique na alternativa que corresponde à sua plantação para mais informações.</p>';

        var $inner = $('<section class="inner inner_micro">');
        var $innerMicro = $('<section class="grid grid_4 grid_center">');

        node.childs.forEach(function(item, i) {
            $item = '<article class="grid_item border">' +
                  '<a href="" data-target="' + item.id + '" rel="return" class="full">' +
                    '<img src="images/home/' + item.slug + '/thumb.png" alt="">' +
                    '<span>' +
                      item.text +
                    '</span>' +
                  '</a>' +
                '</article>';
            $innerMicro.append($item);
        });

        this.$wrapper.append($wrapper.append($header, $inner.append($innerMicro)));
    },

    generateSolucao: function(node) {

    },

    init: function() {
        $('#' + this.prefix + this.homeClass).show();
    }

});


$(function() {
    window.builder = new Necbuilder(Necessidades);
});