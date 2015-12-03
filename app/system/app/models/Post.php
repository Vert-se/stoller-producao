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
        return Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('d\/m\/Y');
    }

    public function getImagemUrlAttribute()
    {
    	if(!$this->attributes['imagem_url']) {
    		return $this->getDefaultImage();
    	}
    	return $this->attributes['imagem_url'];
    }

    public function getTipoNomeAttribute($value)
    {
		return $this->types[$this->tipo];
    }

    public function scopeFetch($query, $type)
    {
	    if($type) {
	        $posts = $query->where('tipo', $type)->orderBy('criado_em', 'DESC')->get();
	    } else {
	        $posts = $query->orderBy('criado_em', 'DESC')->get();
	    }

	    return $posts;
    }

    protected function getDefaultImage()
    {
	    $baseUrl = str_replace('system/public', '', url()) . 'images/';
	    return  $baseUrl . 'depoimento-profile.jpg';
    }

}
// depoimento-profile.jpg