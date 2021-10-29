<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'role_id' => 1,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/ampersand.jpg',
            'name' => 'Ampersand Team',
            'username' => 'Ampersand',
            'address' => 'Surabaya, Jawa Timur',
            'email' => 'ampersandtechsolution@gmail.com',
            'profession' => 'Lembaga Nasional',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 3
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Nadia Wulandari',
            'username' => 'wulan',
            'address' => 'Lamongan, Jawa Timur',
            'email' => 'wulandari@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'maulana ikhsan',
            'username' => 'lana',
            'address' => 'Jombang, Jawa Timur',
            'email' => 'jomban@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'aprilia amanda',
            'username' => 'april',
            'address' => 'telungagung, Jawa Timur',
            'email' => 'manda@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'eriko dewantoro',
            'username' => 'riko',
            'address' => 'Mojokerto, Jawa Timur',
            'email' => 'eriko@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'khansa nabila',
            'username' => 'sasa',
            'address' => 'Malang, Jawa Timur',
            'email' => 'sasa@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);


        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'lanang pramudia',
            'username' => 'tian',
            'address' => 'Magetan, Jawa Timur',
            'email' => 'tian@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Naufanda Aditiya zulfa',
            'username' => 'naufan',
            'address' => 'Magetan, Jawa Timur',
            'email' => 'Naufan@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Maulida Amelia Ayu Hapsari',
            'username' => 'maulida',
            'address' => 'Kediri, Jawa Timur',
            'email' => 'Maulida@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Risti Aprialia yasmin',
            'username' => 'Risti',
            'address' => 'Jombang, Jawa Timur',
            'email' => 'liaa@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Cinta Ramayanti',
            'username' => 'cinta',
            'address' => 'Trenggalek, Jawa Timur',
            'email' => 'cinta@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);

        User::create([
            'role_id' => 2,
            'profession' => 'Relawan Masyarakat',
            'photo' => 'assets/photo/profile/default.jpg',
            'name' => 'Dimas Adi Prayoga',
            'username' => 'dimdim',
            'address' => 'Surga, Akhirat',
            'email' => 'dimas@gmail.com',
            'password' => bcrypt('password123'),
            'document' => 'assets/document/user/88RXWsF42BupFtRQC0aAdOFhXLBzu7JnZUKK5JM9.pdf',
            'user_status_id' => 1
        ]);
    }
}
