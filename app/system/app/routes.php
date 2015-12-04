<?php

use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*Route::get('/youtube-update', function()
{
    // $youtube_request = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=v4voVtFRO10%2C8ttBd-GIcd4%2CYcmm_rvox3c%2CVDgRoaoS8eA%2CxzzW5WD241U%2CL_RYq4TS5vU%2Cn7w_n7QVBP0%2CMXnZkpqTH_o%2C-keQiU0PH9c%2Cm0iSoy5CoxA%2CRcaB2M7uasE%2CQxrYhhEMJYI%2CPZdHdC6T5FY%2CXuVDF7Q_mb4%2C38H9xW5SgzQ%2C7n1A36Ev2QY%2CmdMCARUKIvs%2CZpWJ8BMrTtM%2CkZe2YmBWCEo%2Cn2GEvQMTATA%2CQIYwcZ1nTCM%2CaL3OefgCj1o%2CSdCYggl5Jy8%2CWfVk7HeP8tc%2CGAokY7iV--Q%2CM1qxW8SNPm0%2CE-VUQ4ajobM%2Cxfm8wZ5w-eA%2C-ygsl37W5RE&key=AIzaSyDdfj6mZyuZBZM2-mhUQSz3CxQSTeS4CJo';
	$youtube_request = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=vttAw2azE0g%2ChWISehsvW0o%2CWHAMHk2w6IE%2CF2nyxa2KwQk%2Cb_w74gKoXLU%2CrlRbNh2xhlQ%2CZANt5RxW3oE%2Ct3T2nRFIRxs%2Cc9wrVXposWk%2CGPFTw3eH7lo%2C5VJABy96qIw%2CwmmZUYmoPZI%2CM3ga47Ng7tU%2CzdqWfrtaFB8%2CYJHLBARxzPY%2CYjrTs-fPUWQ%2Ctpgp8-QKccE&key=AIzaSyDdfj6mZyuZBZM2-mhUQSz3CxQSTeS4CJo';

    $data = json_decode(file_get_contents($youtube_request));
    foreach($data->items as $item) {
        $data = [
            'titulo' => $item->snippet->title,
            'youtube_id' => $item->id,
            'descricao' => $item->snippet->description,
            'autor' => $item->snippet->channelTitle,
            'imagem_url' => $item->snippet->thumbnails->high->url,
            // 'tipo' => 'produtor',
            'tipo' => 'especialista',
            'criado_em' => $item->snippet->publishedAt
        ];

        Post::create($data);
    }
});*/

// Upload Depoinmentos
/*Route::get('/upload-depoimentos', function()
{
    $file = public_path() . '/files/20151111-depoimentos-stoller.xlsx';
    if (file_exists($file)) {
        
        try {
            $inputFileType = PHPExcel_IOFactory::identify($file);
            $objReader = PHPExcel_IOFactory::createReader($inputFileType);
            $objPHPExcel = $objReader->load($file);

            
            //  Get worksheet dimensions
            $sheet = $objPHPExcel->getSheet(0);
            $highestRow = $sheet->getHighestRow(); 
            $highestColumn = $sheet->getHighestColumn();
            
            for ($row = 9; $row <= $highestRow; $row++){ 
                //  Read a row of data into an array
                $rowData = $sheet->rangeToArray('A' . $row . ':' . 'J' . $row , NULL, true, FALSE);
                $data = [
                    'titulo' => $rowData[0][3],
                    'descricao' => $rowData[0][9],
                    'autor' => $rowData[0][5],
                    'controle' => $rowData[0][6],
                    'stoller' => $rowData[0][7],
                    'incremento' => $rowData[0][8],
                    'pais' => $rowData[0][0],
                    'cidade' => $rowData[0][2],
                    'estado' => $rowData[0][1],
                    'tipo' => 'depoimento',
                    'criado_em' => Carbon::createFromFormat('Y', (string)$rowData[0][4])->format('Y-m-d H:i:s')
                ];

                Post::create($data);
                
            }

        } catch(Exception $e) {
            echo('Error loading file"'.pathinfo($file,PATHINFO_BASENAME).'": '.$e->getMessage());
        }


    }
});*/

// Fetch Posts
Route::get('/posts', function()
{
    $type = Input::get('tipo');
    $posts = Post::fetch($type);

    return $posts;
});

// Fetch Posts
Route::get('/posts/{id}', function($id)
{
    $post = Post::find($id);

    return $post;
});


// Get Depoimentos UF
Route::get('/depoimentos', function()
{
    $cultura = Input::get('cultura');
    $estado = Input::get('estado');

    return Post::testmonials($cultura, $estado);
});

// Get Depoimentos Cultures
Route::get('/depoimentos/culturas', function()
{
    return Post::cultures();
});

// Get Depoimentos States
Route::get('/depoimentos/estados', function()
{
    return Post::states();
});

// Get Specialist
Route::get('/especialistas', function()
{
    $estado = Input::get('estado');
    $cidade = Input::get('cidade');
    return Specialist::filter($estado, $cidade);
});

// Get Specialist States
Route::get('/especialistas/estados', function()
{
    return Specialist::states();
});

// Get Specialist Cities
Route::get('/especialistas/cidades/{uf}', function($uf)
{
    return Specialist::cities($uf);
});