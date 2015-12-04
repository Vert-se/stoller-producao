var Necbuilder = function(data) {
    this.data = data;
    this.actualPage = this.data;
    this.render();
};

$.extend(Necbuilder.prototype, {
    
    deep: [],

    breadcrumb: [],

    cName: 'slide-nec-',

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
        if(n) this.deep.push(n);

        this.traverse();
        this.render(this.getClass());
    },

    traverse: function() {
        var page = this.data, c = 0;
        while(this.deep[c] !== undefined) {
            page = page.childs[c];
            if(c === 0) this.root = page;
            c++;
        }
        if(page.name) this.breadcrumb.push(page.name);
        this.actualPage = page;
        return page;
    },

    render: function(cname) {
        if(!cname) cname = this.homeClass;
        console.log(this.breadcrumb , cname);
    },

    getClass: function() {
        return this.deep.join('-');
    }

});


$(function() {
    window.builder = new Necbuilder(Necessidades);
});