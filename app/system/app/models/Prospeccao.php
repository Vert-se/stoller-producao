<?php

use Carbon\Carbon;

class Prospeccao extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'prospeccoes';

    // validation rules
    public static $rules = [
        'nome' => 'required',
        'email'  => 'required|email',
        'telefone' => 'required'
    ];



    protected $fillable = ['id', 'nome', 'email', 'telefone']; 


}
// depoimento-profile.jpg