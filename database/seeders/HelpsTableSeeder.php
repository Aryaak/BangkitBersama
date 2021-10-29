<?php

namespace Database\Seeders;

use App\Models\Help;

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HelpsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Help::create([
            'help_category_id' => 1,
            'user_id' => 1,
            'photo' => 'assets/photo/help/oksigen.jpg',
            'name' => 'Isi Ulang Oksigen Gratis',
            'description' => 'Saya ingin membagikan oksigen isi ulang gratis untuk daerah Surabaya dan sekitarnya',
            'quota' => 10,
            'end_date' => Carbon::parse('2021-12-01'),
            'help_status_id' => 1
        ]);


        Help::create([
            'help_category_id' => 2,
            'user_id' => 1,
            'photo' => 'assets/photo/help/hand-sanitizer.jpg',
            'name' => 'Hand Sanitizer Gratis',
            'description' => 'Saya ingin membagikan beberapa Hand Sanitizer gratis untuk anda yang di daerah Surabaya',
            'quota' => 5,
            'end_date' => Carbon::parse('2021-12-01'),
            'help_status_id' => 1
        ]);


        Help::create([
            'help_category_id' => 3,
            'user_id' => 1,
            'photo' => 'assets/photo/help/sate.jpg',
            'name' => 'Bagi-bagi Sate Gratis',
            'description' => 'Saya ingin membagikan sate untuk anda yang lapar dari sore hingga malam hari',
            'quota' => 100,
            'end_date' => Carbon::parse('2021-12-01'),
            'help_status_id' => 1
        ]);

        Help::create([
            'help_category_id' => 4,
            'user_id' => 1,
            'photo' => 'assets/photo/help/ambulance.jpg',
            'name' => 'Jasa Sopir Ambulance',
            'description' => 'Saya ingin menawarkan diri sebagai sopir ambulance gratis untuk rumah sakit yang membutuhkan',
            'quota' => 1,
            'end_date' => Carbon::parse('2021-12-01'),
            'help_status_id' => 1
        ]);
    }
}
