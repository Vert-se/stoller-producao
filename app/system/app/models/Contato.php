<?php

use Carbon\Carbon;

class Contato extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'fale_conosco';

    // validation rules
    public static $rules = [
        'nome' => 'required',
        'email'  => 'required|email',
        'telefone' => 'required',
        'como_conheceu' => 'required',
        'estado' => 'required',
        'cidade' => 'required',
        'departamento' => 'required',
        'assunto' => 'required',
        'mensagem' => 'required'
    ];



    protected $fillable = ['nome', 'email', 'telefone', 'como_conheceu', 'estado', 'cidade', 'departamento', 'assunto', 'mensagem', 'optin', 'receber_copia']; 


}