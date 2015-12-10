@extends('layouts.email')

@section('content')


    <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
        <tr>
            <td valign="top">

                <!-- // Begin Module: Standard Content \\ -->
                <table border="0" cellpadding="20" cellspacing="0" width="100%">
                    <tr>
                        <td valign="top" class="bodyContent">
                            <div mc:edit="std_content00">
                                <h1 style="color: #006D88" class="h1">Nova Mensagem</h1>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" valign="top" width="600" class="flexibleContainerCell">
                            <table border="0" cellpadding="15" cellspacing="0" class="flexibleContainer">

                                <!-- SEPARATOR -->
                                <tr>
                                    <td class="headerContent" valign="left">
                                        <h4 style="color: #000" class="h4">Dados Pessoais</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Nome: </strong>{{{ $nome }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>E-mail: </strong>{{{ $email }}}
                                    </td>
                                </tr>

                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Telefone: </strong>{{{ $telefone }}}
                                    </td>
                                </tr>

                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Como conheceu a Stoller: </strong>{{{ $como_conheceu }}}
                                    </td>
                                </tr>

                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Loaclização: </strong>{{{ $cidade }}} - {{{ $estado }}}
                                    </td>
                                </tr>

                                <!-- SEPARATOR -->
                                <tr>
                                    <td class="headerContent" valign="left">
                                        <h4 style="color: #000" class="h4">Mensagem</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Departamento: </strong>{{{ $departamento }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Assunto: </strong>{{{ $assunto }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Mensagem: </strong>{{ $mensagem }}
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
                <!-- // End Module: Standard Content \\ -->
                
            </td>
        </tr>
    </table>

@stop