const site = site || {};

site.init = function(){

    var that = this;

    this.w = $(window);
    this.w_w = this.w.width();
    this.w_h = this.w.height();

    this.b = $('body').eq(0);
    this.b_h = this.b.height();

    // this.h = $('header');
    // this.h_h = this.h.outerHeight() + 1; // 1 de border do pai

    // this.loading = $('#loading');

    this.resize();

    this.link_set();

    // this.mask_form();

    // this.clear_form_errors();

};

site.resize = function(){
    var that = this;

    this.w.on('resize',function(){
        
        that.w_w = that.w.width();
        that.w_h = that.w.height();

        that.b_h = that.b.height();

    });
};


site.link_set = function(){
    var that = this
        l_menu = $('#menu-open'),
        l_scroll = $('a[rel=scroll]'),
        l_close = $('a[rel=close]'),
        l_modal = $('a[rel=modal]'),
        l_toggle = $('a[rel=toggle]');

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

            var t = $(this), target_pos = (t.data('target')) ? $('#'+t.data('target')).position().top - that.h_h : 0;

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

// logado

site.scroll_item = function(item){
    
    if(!item){ return; }

    var that = this, target_pos = item.position().top - that.h_h - 10;

    $('html, body').stop().animate({
        scrollTop: target_pos
    }, 750, 'easeInOutQuad');
}

site.clear_form_errors = function(){
    var that = this, i = $('input.form-type'), error_msg_box = $('#error_msg'), error_class = 'error_zuum';

    i.focus(function(){
        var t = $(this);
        error_msg_box.slideUp();
        t.parent().parent().removeClass(error_class);
        t.parent().removeClass(error_class);
    });

}

site.mask_form = function(){
    var that = this
        cpf = $('input.form-type-cpf'),
        dinheiro = $('input.form-type-dinheiro'),
        cep = $('input.form-type-cep'),
        tel = $('input.form-type-telefone,input.form-type-telefone-confirme');
        endnumero = $('input.form-type-endnumero');

        cpf.mask('000.000.000-00');
        tel.mask('(00) 000000000');
        dinheiro.mask('000.000,00', {reverse: true});
        cep.mask('00000-000');
        cep.on('blur',function(e){
            that.cep_load(e.delegateTarget.value);
        });
        endnumero.mask('0000000000');
}

site.action_form = function(form){
    if(!form){ return; }

    this.loading.show();

    var that = this, error_msg = [], error_msg_box = $('#error_msg'), error = 0, error_class = 'error_zuum',
        f = $('#'+form), fields = f.find('.form-type');

    f.find('.'+error_class).removeClass(error_class);

    fields.each(function(){
        var t = $(this), v = t.val(), l = v.length, ml = t.attr('maxlength'), e = 0;

        if( t.hasClass('form-type-banco')){

            if(l==0){
                error_msg.push('Você esqueceu de selecionar um banco. Por favor, selecione no menu acima');
                e++;
            }

            if(e){
                $('#select-banco').addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-dinheiro')){

            var min = t.data('min'), max = t.data('max');

            if(l==0){
                error_msg.push('Valor não informado');
                e++;
            }else if(that.con_din(v) < that.con_din(min) || that.con_din(v) > that.con_din(max) ){
                console.log(that.con_din(v));
                error_msg.push('Valor minimo é de R$ '+that.con_din(min,',')+' e o valor máximo de R$ '+that.con_din(max,',')+' para depósito on-line');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-nome')){

            if(l==0){
                error_msg.push('Nome não informado');
                e++;
            }else if(l < 5){
                error_msg.push('Nome Inválido');
                e++;
            }else if(v.indexOf(' ') === -1){
                error_msg.push('Nome deve conter no mínimo o "Nome e Sobrenome"');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-email') ){

            if(l==0){
                error_msg.push('E-mail não informado');
                e++;
            }else if( !that.email_check(v) ){
                error_msg.push('E-mail Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }
        if( t.hasClass('form-type-cpf') ){
            var cpf = new that.cpf_check();


            if(l==0){
                error_msg.push('CPF não informado');
                e++;
            }else if( !cpf.valida(v) ){
                error_msg.push('CPF Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }
        if( t.hasClass('form-type-captcha') ){

            if(l==0){
                error_msg.push('Código não informado');
                e++;
            }else if( l < ml ){
                error_msg.push('Código Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }
        if( t.hasClass('form-type-telefone') ){

            if(l==0){
                error_msg.push('Celular não informado');
                e++;
            }else if( l < ml-1){
                error_msg.push('Celular Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }
        if( t.hasClass('form-type-telefone-confirme') ){
            var confirme = $(t.data('confirme')).val();

            if(l==0){
                error_msg.push('Confirmação do celular não informado');
                e++;
            }else if( l < ml-1){
                error_msg.push('Confirmação do celular Inválido');
                e++;
            }else if(v != confirme){
                console.log(confirme);
                error_msg.push('Confirmação do número de celular não confere');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }
        if( t.hasClass('form-type-senha') ){
            var min = t.data('min'), max = t.data('max');

            if(l==0){
                error_msg.push('Senha não informada');
                e++;
            }else if( l < min || l > max){
                error_msg.push('Sua senha de conter entre '+min+' e '+max+' caracteres');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }
        if( t.hasClass('form-type-senha-confirme') ){
            var confirme = $(t.data('confirme')).val();

            if(l==0){
                error_msg.push('Confirmação do senha não informada');
                e++;
            }else if(v != confirme){
                console.log(confirme);
                error_msg.push('Confirmação da senha não confere');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }
        if( t.hasClass('form-type-checked') && !t.is(':checked') ){
            t.parent().addClass(error_class);
            
            error_msg.push('Para darmos continuidade a abertura de conta, é necessário que assinale e aceite os termos e condições');
            error ++;
        }

        if( t.hasClass('form-type-codigo') ){

            if(l==0){
                error_msg.push('Código não informado');
                e++;
            }else if( l < ml ){
                error_msg.push('Código Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }

        }

        if( t.hasClass('form-type-cep') ){

            if(l==0){
                error_msg.push('CEP não informado');
                e++;
            }else if( l < ml){
                error_msg.push('CEP Inválido');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-endereco') ){

            if(l==0){
                error_msg.push('Endereço não informado');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }


        if( t.hasClass('form-type-endnumero') ){

            if(l==0){
                error_msg.push('Número não informado');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-endbairro') ){

            if(l==0){
                error_msg.push('Bairro não informado');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-endcidade') ){

            if(l==0){
                error_msg.push('Cidade não informada');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-endestado') ){

            if(l==0){
                error_msg.push('Estado não selecionado');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-forma_pagto') ){

            if($('.form-type-forma_pagto:checked').length == 0){
                error_msg.push('Forma de pagamento não selecionada');
                e++;
            }

            if(e){
                $('input.form-type-forma_pagto').parent().parent().addClass(error_class);
                error ++;
            }
        }


        if( t.hasClass('form-type-sexo') ){

            if($('.form-type-sexo:checked').length == 0){
                error_msg.push('Gênero não selecionado');
                e++;
            }

            if(e){
                $('input.form-type-sexo').parent().parent().addClass(error_class);
                error ++;
            }
        }


        if( t.hasClass('form-type-assunto') ){

            if(l==0){
                error_msg.push('Assunto não informado');
                e++;
            }

            if(e){
                t.parent().parent().addClass(error_class);
                error ++;
            }
        }

        if( t.hasClass('form-type-mensagem') ){

            if(l==0){
                error_msg.push('Mensagem não informada');
                e++;
            }

            if(e){
                t.parent().addClass(error_class);
                error ++;
            }
        }

        // t.val(l);
    });

    if(error == 0){
        $('#body_btnEnviar').click();
    }else{
        error_msg_box.html('<p>'+error_msg.join('</p><p>')+'</p>');
        error_msg_box.slideDown();
        this.loading.hide();
        this.scroll_item( $('.error_zuum').eq(0) );
    }

}

site.email_check = function(email){
    if(!email){ return false; }
    var that = this, re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

site.cpf_check = function(){"user_strict";function r(r){for(var t=null,n=0;9>n;++n)t+=r.toString().charAt(n)*(10-n);var i=t%11;return i=2>i?0:11-i}function t(r){for(var t=null,n=0;10>n;++n)t+=r.toString().charAt(n)*(11-n);var i=t%11;return i=2>i?0:11-i}var n=false,i=true;this.gera=function(){for(var n="",i=0;9>i;++i)n+=Math.floor(9*Math.random())+"";var o=r(n),a=n+"-"+o+t(n+""+o);return a},this.valida=function(o){for(var a=o.replace(/\D/g,""),u=a.substring(0,9),f=a.substring(9,11),v=0;10>v;v++)if(""+u+f==""+v+v+v+v+v+v+v+v+v+v+v)return n;var c=r(u),e=t(u+""+c);return f.toString()===c.toString()+e.toString()?i:n}}

site.cep_load = function (cep) {

    cep = (cep) ? cep.replace('-','') : '';

    var that = this;

    $.get('http://cep.correiocontrol.com.br/'+cep+'.json',
    function(result){
        console.log(result);

        $('.form-type.form-type-endereco').val(result.logradouro);
        $('.form-type.form-type-endcidade').val(result.localidade);
        $('.form-type.form-type-endbairro').val(result.bairro);
        $('.form-type.form-type-endestado option[value="'+result.uf+'"]').attr({ selected : 'selected' });
        // result.bairro
        // if( result.status!=1 ){
        //  alert(result.message || "Endereço não encontrado");
        //  return;
        // }
        
        // $('.fale_conosco .txt_endereco').val( result.address );
        // $('.fale_conosco .txt_bairro').val( result.district );
        // $('.fale_conosco .txt_numero').focus();
    });
}


site.con_din = function(v,r){
    var that = this, result;

    v = v || 0;
    r = r || '';

    result = v.replace(',',r).replace('.',r);

    return (r) ? result : parseInt(result);
}

$(function(){
    window.site = site;
    window.site.init();
});