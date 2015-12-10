<?php

use Carbon\Carbon;

class Curriculo extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'curriculos';

    // validation rules
    public static $rules = [
        'area_interesse' => 'required',
        'nivel'  => 'required',
        'regiao' => 'required',
        'nome' => 'required|min:5',
        'sexo' => 'required',
        'nascimento_dia' => 'required',
        'nascimento_mes' => 'required',
        'nascimento_ano' => 'required',
        'cep' => 'required',
        'estado' => 'required',
        'cidade' => 'required',
        'endereco' => 'required',
        'numero' => 'required'
    ];

    protected $fillable = ['area_interesse', 'nivel', 'regiao', 'nome', 'sexo', 'nascimento_dia', 'nascimento_mes', 'nascimento_ano', 'cep', 'estado', 'cidade', 'endereco', 'numero', 'complemento'];

}