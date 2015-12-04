<?php

use Carbon\Carbon;

class Newsletter extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'newsletter';

    // validation rules
    public static $rules = [
        'nome' => 'required',
        'email'  => 'required|email|unique:newsletter',
    ];



    protected $fillable = ['id', 'nome', 'email']; 


}
// depoimento-profile.jpg