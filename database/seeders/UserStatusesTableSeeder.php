<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Database\Seeder;

class UserStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserStatus::create([
            'id' => 1,
            'name' => 'UNVERIFIED'
        ]);
        UserStatus::create([
            'id' => 2,
            'name' => 'PENDING'
        ]);
        UserStatus::create([
            'id' => 3,
            'name' => 'VERIFIED'
        ]);
        UserStatus::create([
            'id' => 4,
            'name' => 'REJECTED'
        ]);
    }
}
