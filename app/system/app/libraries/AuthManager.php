<?php

/**
* Manages authentication and user creation
*/
class AuthManager
{
    public static function register($first_name, $last_name, $email, $group) {
        try {
            // Register a user.
            $user = Sentry::register(array(
                'first_name' => $first_name,
                'last_name'  => $last_name,
                'email'      => $email,
                'password'   => 'temp',
            ));

            if($group) {
                // Find the group using the group id
                $adminGroup = Sentry::findGroupById($group);

                // Assign the group to the user
                $user->addGroup($adminGroup);       
            }        

            // Get the activation code
            return ['user' => $user, 'code' => $user->getActivationCode()];
        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e) {
            return ['error' => 'Campo Login deve ser preenchido.'];
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e) {
            return ['error' => 'Campo Senha deve ser preenchido.'];
        }
        catch (Cartalyst\Sentry\Users\UserExistsException $e) {
            return ['error' => 'Usuário já existe.'];
        }        
    }  

    public static function activateUser($code)
     {
        try {
            $user = Sentry::findUserByActivationCode($code);
            // Attempt to activate the user
            try {
                if ($user->attemptActivation($code)) {
                    Sentry::login($user);
                }
                else {
                    return ['error' => 'Usuário não encontrado.'];
                }
            }
            catch (Cartalyst\Sentry\Users\UserAlreadyActivatedException $e) {
                return ['error' => 'Usuário não encontrado.'];
            }
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
            return ['error' => 'Usuário não encontrado.'];
        }
    }

    public static function authenticate($credentials)
     {
        try
        {
            //print_r($credentials); die();
            $remember = $credentials['remember'] == 1;
            // Authenticate the user
            $user = Sentry::authenticate($credentials, $remember);
            if($this->sentry->check()) {
                return ['success'];
            } else {
                return ['error' => 'Algo deu errado'];
            }

        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e)
        {
            return ['error' => 'Campo email deve ser preenchido.'];
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            return ['error' => 'Campo senha deve ser preenchido.'];
        }
        catch (Cartalyst\Sentry\Users\WrongPasswordException $e)
        {
            return ['error' => 'Usuário ou senha não encontrados.'];
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            return ['error' => 'Usuário ou senha não encontrados.'];
        }
        catch (Cartalyst\Sentry\Users\UserNotActivatedException $e)
        {
            return ['error' => 'Usuário não está ativo.'];
        }

        // The following is only required if the throttling is enabled
        catch (Cartalyst\Sentry\Throttling\UserSuspendedException $e)
        {
            return ['error' => 'Usuário suspenso.'];
        }
        catch (Cartalyst\Sentry\Throttling\UserBannedException $e)
        {
            return ['error' => 'Usuário banido.'];
        }
     } 
    
}