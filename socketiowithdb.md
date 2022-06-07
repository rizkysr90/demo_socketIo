# `SOCKET IO WITH DB SUPER EXERCISE - CHAPTER 8`

## `Directions`
- Anda diminta melakukan update DB User secara real time menggunakan websocket. User memiliki beberapa field:
    1. Username : Merupakan username user
    2. Email    : Merupakan email user
    3. Password : Merupakan password user yang wajib dienkripsi

- Dari penjelasan diatas, anda diminta membuat:
    1.  Create user. 
        -   User memasukkan 3 fields berupa username, email, dan password. 
        -   Password wajib di enkripsi.
        -   Cek apabila email sudah digunakan atau belum.
        -   Apabila email sudah digunakan kembalikan pesan error bahwa email telah digunakan.
        -   Setelah berhasil dibuat, berikan pesan apapun yang menandai akun berhasil dibuat.

    2. Get user info. 
        -   User diminta memasukkan 2 fields berupa email dan password.
        -   Apabila benar akan tampil info mengenai id, email, dan usernamenya. 
        -   Bila tidak, sampaikan bahwa email atau password yang salah.

    3.  Update user info (username). 
        -   User diminta memasukkan 3 fields berupa username (yang akan diubah), email dan password. 
        -   Apabila setelah di cek email dan password sesuai, maka username dapat diubah (pesan yang ditampilkan bebas).
        -   Tampilkan pesan sukses setelah username berhasil diubah.
        -   Bila tidak, sampaikan bahwa email atau password yang salah.

    4. User membuat password baru. 
        -   User diminta memasukkan 3 fields berupa email, password dan new password.
        -   Apabila setelah di cek email dan password sesuai, maka new password akan menjadi password yang baru dapat diubah (pesan yang ditampilkan bebas).
        -   Tampilkan pesan sukses ketika password berhasil diubah.
        -   Bila tidak, sampaikan bahwa email atau password yang salah.

- Untuk challenge ini terdapat berbagai kemungkinan. Anda bisa membuat 4 pages berbeda untuk setiap fitur, atau semua fitur terdapat di dalam satu page saja (tergantung pada fungsi dari submit / form lain yang Anda siapkan).

## `Restriction`
- Email harus unik. Apabila terjadi kesalahan disini akan terlihat ketika dimasukkan email yang sama.