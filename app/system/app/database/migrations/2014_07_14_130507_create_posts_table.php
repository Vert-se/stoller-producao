<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePostsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('titulo');
            $table->text('descricao');
            $table->string('autor');
            $table->string('youtube_id');
            $table->string('imagem_url');
            $table->string('autor_local');
            $table->string('controle');
            $table->string('stoller');
            $table->string('incremento');
            $table->string('cidade');
            $table->string('estado');
            $table->string('tipo');
            $table->string('timestamp');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('posts');
    }

}
