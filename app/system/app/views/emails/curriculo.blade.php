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
                                <h1 style="color: #006D88" class="h1">Novo Currículo</h1>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" valign="top" width="600" class="flexibleContainerCell">
                            <table border="0" cellpadding="15" cellspacing="0" class="flexibleContainer">

                                <!-- SEPARATOR -->
                                <tr>
                                    <td class="headerContent" valign="left">
                                        <h4 style="color: #000" class="h4">Objetivo</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Área de interesse: </strong>{{{ $area_interesse }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Nível de conhecimento: </strong>{{{ $nivel }}}
                                    </td>
                                </tr>

                                @if($regiao)
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Região de interesse: </strong>{{{ $regiao }}}
                                    </td>
                                </tr>
                                @endif

                                <!-- SEPARATOR -->
                                <tr>
                                    <td class="headerContent" valign="left">
                                        <h4 style="color: #000" class="h4">Dados Pessoais</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Nome completo: </strong>{{{ $nome }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Sexo: </strong>{{{ $sexo }}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        <strong>Data de nascimento: </strong>{{ $nascimento_dia }}/{{ $nascimento_mes }}/{{ $nascimento_ano }}
                                    </td>
                                </tr>

                                <!-- SEPARATOR -->
                                <tr>
                                    <td class="headerContent" valign="left">
                                        <h4 style="color: #000" class="h4">Dados Residenciais</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        {{{ $endereco }}}, {{{ $numero }}}@if($complemento), {{{ $complemento }}}@endif
                                    </td>
                                </tr>
                                <tr>
                                    <td class="textContent" valign="left">
                                        {{{ $cidade }}} - {{{ $estado }}}, CEP {{{ $cep }}}
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