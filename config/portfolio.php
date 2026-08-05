<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Portfolio Owner
    |--------------------------------------------------------------------------
    |
    | The single account that can sign in to the admin panel. These values are
    | only consumed by the database seeder when the account does not exist
    | yet; changing them afterwards will not update the stored user.
    |
    */

    'admin' => [
        'name' => env('ADMIN_NAME', 'MD. Sulaiman'),
        'email' => env('ADMIN_EMAIL', 'smensulaiman007@gmail.com'),
        'password' => env('ADMIN_PASSWORD', 'password'),
    ],

];
