<?php

use Carbon\Carbon;

class Depoimento extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'depoimentos';

    // validation rules
    public static $rules = [
        'cultura' => 'required',
        'regiao'  => 'required',
        'nome' => 'required',
        'email' => 'required|email',
        'area_de_controle' => 'required',
        'area_tratada' => 'required',
        'incremento' => 'required',
        'mensagem' => 'required'
    ];

    protected $fillable = ['cultura', 'regiao', 'nome', 'email', 'area_de_controle', 'area_tratada', 'incremento', 'mensagem', 'optin']; 


}