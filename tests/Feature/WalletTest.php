<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Wallet;
use App\Models\Transfer;
use Tests\TestCase;

class WalletTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetWallet()
    {
        $wallet = Wallet::factory()->create(); //creamos un modelo persistente para la prueba unitaria en la que generamos una wallet con datos fake
        $transfers = Transfer::factory()->count(3)->create([
            'wallet_id' => $wallet->id
        ]); //creamos un modelo persistente tbn para transfers y le especificamos que para los registros use el id del wallet creado previamente

        $response = $this->json('GET', '/api/wallet'); //la ruta con la que probaremos el API con un request GET
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'id', 'money', 'transfers' => [
                        '*' => [
                            'id', 'amount', 'description', 'wallet_id'
                        ]
                    ]
                ]);
        //esperamos recibir una respuesta 200 y la siguiente estructura en JSON

        $this->assertCount(3, $response->json()['transfers']); //esperamos recibir 3 registros de transfers en json too
    }
}
