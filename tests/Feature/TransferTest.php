<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Wallet;
use App\Models\Transfer;

class TransferTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    use RefreshDatabase;

    public function testPostTransfer()
    {
        $wallet = Wallet::factory()->create();
        $transfer = Transfer::factory()->make(); //para almacenar datos en cache se usa el make

        $response = $this->json('POST', '/api/transfer', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        $response->assertJsonStructure([
            'id', 'description', 'amount', 'wallet_id'
        ])->assertStatus(201);

        //esta validacion va para verificar si se ingresaron los datos en la tabla transfers
        $this->assertDatabaseHas('transfers', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        //esta validacion va para verificar si se actualiza el monto de la wallet

        $this->assertDatabaseHas('wallets', [
            'id' => $wallet->id,
            'money' => $wallet->money + $transfer->amount
        ]);
    }
}
