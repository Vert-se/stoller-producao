<?php

use Carbon\Carbon;

class Post extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';


    protected $types = [
		'produtor' => 'Palavra do Produtor',
		'depoimento' => 'Depoimentos',
		'especialista' => 'Palavra do Especialista'
	];


    protected $fillable = ['id', 'titulo', 'descricao', 'youtube_id', 'imagem_url', 'autor', 'autor_local', 'controle', 'stoller', 'incremento', 'pais', 'cidade', 'estado',  'tipo', 'criado_em']; 

    protected $appends = array('tipo_nome');

    public function getCriadoEmAttribute($value)
    {	
    	$format = $this->attributes['tipo'] === 'depoimento' ? 'Y' : 'd\/m\/Y';
        return Carbon::createFromFormat('Y-m-d H:i:s', $value)->format($format);
    }

    public function getImagemUrlAttribute()
    {
    	if(!$this->attributes['imagem_url']) {
    		return $this->getDefaultImage();
    	}
    	return $this->attributes['imagem_url'];
    }

    public function getTituloAttribute()
    {
    	if(!$this->attributes['titulo']) {
    		return 'Diversos';
    	}
    	return $this->attributes['titulo'];
    }

    public function getTipoNomeAttribute($value)
    {
		return $this->types[$this->tipo];
    }

    public function scopeFetch($query, $type)
    {
	    if($type) {
	        $posts = $query->where('tipo', $type)->orderBy('criado_em', 'DESC')->limit(60)->get();
	    } else {
	    	$esp = Post::where('tipo', 'especialista')->orderBy('criado_em', 'DESC')->limit(20)->get();
	    	$pro = Post::where('tipo', 'produtor')->orderBy('criado_em', 'DESC')->limit(20)->get();
	    	$dep = Post::where('tipo', 'depoimento')->orderBy('criado_em', 'DESC')->limit(20)->get();

	        $posts = $esp->merge($pro)->merge($dep)->shuffle();
	    }

	    return $posts;
    }

    public function scopeCultures($query)
    {
	    return $query
	    	->where('titulo', '!=', 'NULL')
	    	->where('tipo', 'depoimento')
	    	->groupBy('titulo')
	    	->orderBy('titulo')
	    	->lists('titulo');
    }

    public function scopeTestmonials($query, $cultura = null, $estado = null)
    {
    	if($cultura) $query->where('titulo', $cultura);
    	if($estado) $query->where('estado', $estado);

	    return $query
	    	->where('tipo', 'depoimento')
	    	->orderBy('criado_em', 'DESC')
	    	->get();
    }

    public function scopeStates($query)
    {
	    return $query
	    	->where('estado', '!=', 'NULL')
	    	->where('tipo', 'depoimento')
	    	->groupBy('estado')
	    	->orderBy('estado')
	    	->lists('estado');
    }

    public function scopeCities($query, $state)
    {
	    return $query
	    	->where('estado', $state)
	    	->where('tipo', 'depoimento')
	    	->groupBy('cidade')
	    	->orderBy('cidade')
	    	->lists('cidade');
    }

    protected function getDefaultImage()
    {
	    $baseUrl = str_replace('system/public', '', url()) . 'images/';
	    return  $baseUrl . 'depoimento-profile.jpg';
    }

}
// depoimento-profile.jpg