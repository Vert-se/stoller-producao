<?php

use Carbon\Carbon;

class Specialist extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'especialistas';


    protected $fillable = ['id', 'nome', 'email', 'endereco', 'telefone', 'cidade', 'estado', 'uf']; 

    public function scopeFilter($query, $estado = null, $cidade = null)
    {
    	if($estado) $query->where('uf', $estado);
    	if($cidade) $query->where('cidade', $cidade);

	    return $query
	    	->orderBy('nome')
	    	->get();
    }

    public function scopeStates($query)
    {
	    return $query
	    	->where('estado', '!=', 'NULL')
	    	->groupBy('estado')
	    	->orderBy('estado')
	    	->lists('uf', 'estado');
    }

    public function scopeCities($query, $state)
    {
	    return $query
	    	->where('uf', $state)
	    	->groupBy('cidade')
	    	->orderBy('cidade')
	    	->lists('cidade');
    }

}