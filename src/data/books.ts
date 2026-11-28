import { Book, BookCategory } from '../types/library';

export const HERO_LIBRARY_IMAGE =
  '/src/assets/images/hero_library_sanctuary_1795675651599.jpg';

export const BOOK_CATEGORIES: BookCategory[] = [
  'Semua',
  'Sastra & Puisi',
  'Filsafat',
  'Arsitektur',
  'Sejarah',
  'Esai & Budaya',
];

export const BOOKS_CATALOG: Book[] = [
  {
    id: 'catatan-kebun-sunyi',
    catalogNumber: 'PN-2026-01',
    title: 'Catatan dari Kebun Sunyi',
    subtitle: 'Kumpulan Esai tentang Merawat Perhatian dan Ritme Lambat',
    author: 'Nadia Kusuma',
    authorBio:
      'Penulis esai dan peneliti botani budaya yang menetap di Bandung. Karyanya banyak mengulas relasi antara lanskap tropis, ingatan, dan kesadaran sehari-hari.',
    category: 'Esai & Budaya',
    year: 2025,
    pages: 184,
    language: 'Bahasa Indonesia',
    publisher: 'Penerbit Daun Tua',
    isbn: '978-623-8910-12-4',
    readCount: 3420,
    readingMinutes: 14,
    stock: 5,
    availableStock: 4,
    coverImage: '/src/assets/images/cover_botanical_sage_1795675650420.jpg',
    clothColor: '#F3E5E9',
    clothAccent: '#B5536E',
    featuredQuote:
      'Mengamati sehelai daun yang mengering bukan pelajaran tentang kehilangan, melainkan cara memahami bagaimana waktu bekerja tanpa tergesa.',
    synopsis:
      'Ditulis sepanjang empat musim hujan dan kemarau di lereng utara Bandung, buku ini menghimpun dua belas esai reflektif tentang berkebun, membaca lambat, dan seni memelihara ruang batin di tengah dunia yang serba cepat.',
    chapters: [
      {
        id: 'cks-1',
        number: 'Bab 01',
        title: 'Pagi Pertama di Bawah Pohon Salam',
        readingTimeMinutes: 5,
        paragraphs: [
          'Setiap pagi sebelum suara kendaraan mulai merambat naik dari lembah, halaman belakang rumah selalu menyisakan embun tipis di ujung daun pakis. Pada jam-jam seperti inilah saya belajar bahwa keheningan bukanlah ketiadaan bunyi, melainkan kejernihan untuk mendengar hal-hal yang nyaris tak bersuara.',
          'Tanah yang gembur setelah hujan semalam memancarkan aroma humus yang hangat. Ketika jemari menyentuh permukaan tanah itu, ada semacam kesadaran yang langsung turun ke dada: kita tidak pernah benar-benar terpisah dari ritme biologis yang jauh lebih tua daripada jadwal kerja modern.',
          'Kebun kecil ini awalnya hanya petak terbengkalai seluas empat kali lima meter. Namun dari sepetak tanah yang sederhana itu, saya mulai mencatat bagaimana perhatian manusia bekerja. Apa yang kita rawat dengan sabar perlahan-lahan membentuk cara kita memandang waktu.',
        ],
        editorNote:
          'Catatan Editor: Ditulis pada November 2024 sebagai bagian dari seri catatan lapangan botani domestik.',
      },
      {
        id: 'cks-2',
        number: 'Bab 02',
        title: 'Herbarium dan Ingatan yang Ditekan',
        readingTimeMinutes: 5,
        paragraphs: [
          'Di antara lembar-lembar kertas kapas tua, daun eukaliptus yang telah kering selama dua tahun masih menyimpan warna hijau keabu-abuan yang lembut. Membuat herbarium adalah cara paling tenang untuk mengarsipkan sebuah perjalanan tanpa harus memotret segala sesuatu secara terburu-buru.',
          'Berbeda dengan arsip digital yang menumpuk ribuan berkas dalam hitungan hari, herbarium menuntut jeda. Anda harus memetik satu tangkai saja, menatanya di atas kertas penyerap, memberi pemberat kayu, lalu menunggu berminggu-minggu hingga kadar airnya surut sempurna.',
          'Selama masa penantian itu, ingatan tentang hari ketika daun tersebut dipetik perlahan mengendap dan menyaring dirinya sendiri. Yang tersisa bukan lagi detail remeh, melainkan suasana hati yang jujur.',
        ],
        editorNote:
          'Referensi arsip merujuk pada koleksi spesimen daun Nusantara abad ke-19 di Kebun Raya.',
      },
      {
        id: 'cks-3',
        number: 'Bab 03',
        title: 'Membaca Tanpa Garis Akhir',
        readingTimeMinutes: 4,
        paragraphs: [
          'Kita terbiasa mengukur buku dari jumlah halaman yang berhasil diselesaikan dalam sepekan. Padahal, beberapa buku terbaik justru meminta kita berhenti di tengah paragraf, menutup sampulnya sejenak, lalu berjalan ke beranda sambil membiarkan satu kalimat menggema.',
          'Membaca dengan tenang bukan perlombaan efisiensi. Ketika sebuah gagasan diberi ruang untuk bernapas, ia akan mengaitkan dirinya dengan pengalaman hidup kita sendiri, menjadikannya percakapan yang akrab antara penulis dan pembaca.',
        ],
      },
    ],
  },
  {
    id: 'geometri-ruang-teduh',
    catalogNumber: 'PN-2026-02',
    title: 'Geometri Ruang Teduh',
    subtitle: 'Tafsir Arsitektur Tropis, Kayu, dan Cahaya Alami',
    author: 'Bagus Prakoso',
    authorBio:
      'Arsitek dan pengajar sejarah tata ruang vernakular di Yogyakarta. Fokus risetnya meliputi penghawaan pasif dan pencahayaan alami pada bangunan kayu.',
    category: 'Arsitektur',
    year: 2026,
    pages: 232,
    language: 'Bahasa Indonesia',
    publisher: 'Loka Wacana',
    isbn: '978-623-7401-88-1',
    readCount: 2890,
    readingMinutes: 16,
    stock: 4,
    availableStock: 3,
    coverImage: '/src/assets/images/cover_archipelago_wood_1795675651399.jpg',
    clothColor: '#F1E8E4',
    clothAccent: '#9A5A6B',
    featuredQuote:
      'Sebuah rumah yang baik di iklim tropis tidak pernah memerangi matahari; ia mengundang bayangan untuk tinggal di dalamnya.',
    synopsis:
      'Monograf arsitektur ini menelusuri bagaimana rumah panggung, pendopo, dan pelataran batu alam Nusantara merancang keteduhan melalui proporsi atap, celah kisi-kisi kayu, serta aliran udara silang.',
    chapters: [
      {
        id: 'grt-1',
        number: 'Bab 01',
        title: 'Filosofi Tritisan dan Bayangan Siang',
        readingTimeMinutes: 6,
        paragraphs: [
          'Di bawah garis khatulistiwa, cahaya matahari datang dengan ketegasan yang hampir vertikal pada tengah hari. Oleh sebab itu, arsitektur tradisional kita sejak lama meletakkan kemewahan bukan pada luasnya kaca bening, melainkan pada kedalaman tritisan atap yang menciptakan transisi lembut antara terang dan teduh.',
          'Ketika seseorang melangkah dari halaman batu yang silau menuju serambi kayu, matanya membutuhkan waktu beberapa detik untuk menyesuaikan diri. Ruang transisi inilah yang sering hilang dalam bangunan kontemporer, padahal di sanalah rasa tenang pertama kali tercipta.',
          'Kayu jati tua dan batu kapur yang tidak dipoles mengilap menyerap pantulan cahaya berlebih, mengubah terik menjadi pendaran lembut yang ramah bagi penglihatan.',
        ],
        editorNote:
          'Ilustrasi studi lapangan berasal dari survei pendopo dan rumah limasan di Jawa Tengah.',
      },
      {
        id: 'grt-2',
        number: 'Bab 02',
        title: 'Bernapas Bersama Kisi-Kisi Kayu',
        readingTimeMinutes: 5,
        paragraphs: [
          'Dinding yang sepenuhnya masif memutus dialog antara ruang dalam dan kebun di luar. Kisi-kisi kayu atau jalusi menghadirkan kompromi yang anggun: ia menjaga privasi penghuni sambil tetap membiarkan angin sore bergerak pelan melintasi ruangan.',
          'Pada sore hari, bayangan garis-garis kayu itu jatuh memanjang di lantai terakota, bergerak perlahan seiring turunnya matahari seperti penunjuk waktu yang puitis.',
        ],
      },
      {
        id: 'grt-3',
        number: 'Bab 03',
        title: 'Pelataran sebagai Ruang Hening',
        readingTimeMinutes: 5,
        paragraphs: [
          'Pelataran terbuka di tengah rumah bukan sekadar ruang kosong yang belum dibangun. Ia adalah paru-paru bagi keseluruhan struktur—tempat hujan jatuh langsung menyentuh kerikil, dan tempat cahaya pagi meresap masuk ke kamar-kamar di sekitarnya.',
          'Dalam merancang ruang baca yang nyaman, kehadiran bukaan menuju langit atau taman kecil terbukti menurunkan kelelahan visual secara alami.',
        ],
      },
    ],
  },
  {
    id: 'surat-musim-hujan',
    catalogNumber: 'PN-2026-03',
    title: 'Surat-Surat Musim Hujan',
    subtitle: 'Antologi Prosa Liris dan Sajak Pesisir Utara',
    author: 'Ratna Savitri',
    authorBio:
      'Penyair dan penerjemah sastra yang tumbuh di kota pelabuhan kecil di pantai utara Jawa.',
    category: 'Sastra & Puisi',
    year: 2024,
    pages: 148,
    language: 'Bahasa Indonesia',
    publisher: 'Balai Aksara',
    isbn: '978-623-5120-04-9',
    readCount: 4180,
    readingMinutes: 12,
    stock: 6,
    availableStock: 5,
    coverImage: '/src/assets/images/cover_misty_horizon_1795675651683.jpg',
    clothColor: '#ECE4EB',
    clothAccent: '#7C5A72',
    featuredQuote:
      'Kabut pagi di muara tidak menghapus bukit-bukit itu; ia hanya mengajarkan mata kita untuk membaca jarak dengan lebih lembut.',
    synopsis:
      'Himpunan tiga puluh prosa liris dan puisi naratif tentang kota pesisir saat musim penghujan, perahu-perahu yang menepi, dan korespondensi hangat antara dua sahabat yang terpisah laut.',
    chapters: [
      {
        id: 'smh-1',
        number: 'Bagian I',
        title: 'Pelabuhan Ketika Kabut Turun',
        readingTimeMinutes: 4,
        paragraphs: [
          'Pukul lima lewat seperempat, lampu suar di ujung pemecah ombak padam lebih dulu sebelum langit benar-benar terang. Permukaan air laut berwarna abu-abu mutiara, tenang seperti cermin tua yang menyimpan banyak cerita keberangkatan.',
          'Di warung kopi kayu dekat dermaga, uap dari gelas kaca naik menyatu dengan udara dingin. Tidak ada yang berbicara keras pagi ini; suara sendok yang menyentuh piring kecil terdengar jelas hingga ke tepi tambatan perahu.',
          'Saya menulis surat ini di atas kertas bergaris tipis sembari menunggu gerimis reda, dengan kesadaran bahwa beberapa perpisahan memang lebih pantas diucapkan tanpa tergesa.',
        ],
      },
      {
        id: 'smh-2',
        number: 'Bagian II',
        title: 'Catatan Tepi Muara',
        readingTimeMinutes: 4,
        paragraphs: [
          'Di sepanjang tanggul batu, lumut hijau tumbuh subur setiap Desember tiba. Anak-anak kampung membawa perahu kertas yang dilipat dari halaman buku tulis bekas, lalu melepasnya di genangan air yang mengalir menuju selokan besar.',
          'Barangkali puisi bekerja dengan cara yang serupa: sebuah lipatan kata yang sederhana, dititipkan pada arus waktu agar sampai ke tangan seseorang yang sedang membutuhkan kehangatan.',
        ],
      },
      {
        id: 'smh-3',
        number: 'Bagian III',
        title: 'Pulang Sebelum Senja',
        readingTimeMinutes: 4,
        paragraphs: [
          'Saat awan mulai menipis di sebelah barat, warna keemasan yang pucat memantul di atap-atap seng yang basah. Burung-burung camar kembali ke garis pantai, menandai akhir hari yang panjang.',
          'Musim hujan selalu mengingatkan bahwa setelah berbulan-bulan debu dan terik, bumi tetap tahu cara membasuh dirinya dengan sabar.',
        ],
      },
    ],
  },
  {
    id: 'etika-keheningan',
    catalogNumber: 'PN-2026-04',
    title: 'Etika Keheningan',
    subtitle: 'Pengantar Filsafat Kontemplatif untuk Kehidupan Modern',
    author: 'Dr. Hendra Wijaya',
    authorBio:
      'Dosen etika dan filsafat budaya di Jakarta yang meneliti tradisi kontemplasi Timur dan fenomenologi modern.',
    category: 'Filsafat',
    year: 2025,
    pages: 216,
    language: 'Bahasa Indonesia',
    publisher: 'Pustaka Cendekia',
    isbn: '978-623-6102-39-7',
    readCount: 3150,
    readingMinutes: 15,
    stock: 4,
    availableStock: 3,
    coverImage: '/src/assets/images/cover_ceramic_light_1795675652440.jpg',
    clothColor: '#F4EAEB',
    clothAccent: '#8F5867',
    featuredQuote:
      'Keheningan sejati bukanlah pelarian dari tanggung jawab dunia, melainkan tempat kita memulihkan kejernihan sebelum kembali bertindak.',
    synopsis:
      'Buku ini mengajak pembaca meninjau kembali nilai jeda dalam pengambilan keputusan etis, kejernihan mendengar orang lain, serta kebijaksanaan klasik dalam menghadapi banjir informasi.',
    chapters: [
      {
        id: 'ek-1',
        number: 'Bab 01',
        title: 'Krisis Perhatian dan Kebutuhan Akan Jeda',
        readingTimeMinutes: 5,
        paragraphs: [
          'Sepanjang sejarah pemikiran manusia, perhatian selalu dipandang sebagai sumber daya moral yang paling berharga. Ke mana kita mengarahkan perhatian, ke sanalah kehidupan kita dibentuk. Namun di era ketika setiap detik diisi oleh dorongan untuk segera bereaksi, kemampuan untuk menunda penilaian menjadi barang langka.',
          'Filsafat sejak masa Sokrates hingga tradisi kontemplatif Nusantara selalu menekankan pentingnya ruang jarak antara rangsangan dan tanggapan. Di dalam jarak itulah kebijaksanaan bekerja.',
          'Menjaga keheningan lima belas menit setiap hari bukan kemewahan estetis semata, melainkan latihan etis agar kita tidak mudah terombang-ambing oleh kegaduhan sesaat.',
        ],
      },
      {
        id: 'ek-2',
        number: 'Bab 02',
        title: 'Seni Mendengarkan Secara Utuh',
        readingTimeMinutes: 5,
        paragraphs: [
          'Banyak percakapan modern gagal bukan karena kekurangan argumen, melainkan karena masing-masing pihak hanya menunggu gilirannya untuk berbicara. Mendengarkan secara utuh menuntut kita menanggalkan dorongan untuk langsung membantah.',
          'Ketika batin lebih tenang, kita mampu menangkap bukan hanya kata-kata yang terucap, tetapi juga keraguan dan harapan yang tersembunyi di baliknya.',
        ],
      },
      {
        id: 'ek-3',
        number: 'Bab 03',
        title: 'Kembali ke Meja Kerja yang Sederhana',
        readingTimeMinutes: 5,
        paragraphs: [
          'Benda-benda di sekitar kita turut memengaruhi ketenangan pikiran. Sebuah meja kayu yang rapi dengan secangkir teh hangat dan satu buku terbuka mengajarkan bahwa keutuhan sering kali lahir dari pengurangan, bukan penambahan terus-menerus.',
        ],
      },
    ],
  },
  {
    id: 'pelayaran-rempah-angin',
    catalogNumber: 'PN-2026-05',
    title: 'Pelayaran Rempah & Angin Muson',
    subtitle: 'Sejarah Maritim Nusantara dan Peta Laut Kuno Abad XVI',
    author: 'Prof. Darmawan Putra',
    authorBio:
      'Sejarawan maritim dan kurator arsip kartografi kuno yang mengkhususkan diri pada jalur perdagangan Samudra Hindia.',
    category: 'Sejarah',
    year: 2024,
    pages: 296,
    language: 'Bahasa Indonesia',
    publisher: 'Arsip Bahari',
    isbn: '978-623-9045-17-3',
    readCount: 2540,
    readingMinutes: 17,
    stock: 3,
    availableStock: 2,
    coverImage: '/src/assets/images/cover_indigo_waves_1795675651997.jpg',
    clothColor: '#EFE4E6',
    clothAccent: '#7D5161',
    featuredQuote:
      'Jauh sebelum kompas besi menyebar luas, para pelaut Nusantara membaca peta melalui arah angin, warna air, dan barisan bintang di cakrawala.',
    synopsis:
      'Kajian sejarah maritim yang memadukan catatan pelabuhan kuno, dinamika angin muson, serta peran kota-kota bandar Nusantara sebagai pusat pertukaran pengetahuan lintas samudra.',
    chapters: [
      {
        id: 'pra-1',
        number: 'Bab 01',
        title: 'Kalender Angin dan Ritme Pelayaran',
        readingTimeMinutes: 6,
        paragraphs: [
          'Laut Jawa dan Laut Banda bukan sekadar bentangan air yang memisahkan pulau-pulau; bagi masyarakat bahari lampau, laut adalah jalan raya utama yang menghubungkan peradaban. Segala aktivitas perdagangan, diplomasi, dan pertukaran naskah tunduk pada satu hukum alam yang pasti: pergantian angin muson.',
          'Antara bulan April hingga September, angin muson tenggara bertiup stabil, mendorong kapal-kapal dagang bergerak ke arah barat menuju Selat Malaka. Sebaliknya, pada akhir tahun, angin muson barat membawa mereka kembali ke timur menuju kepulauan rempah.',
          'Keteraturan musiman ini membuat pelabuhan-pelabuhan seperti Banten, Gresik, dan Makassar tumbuh menjadi ruang pertemuan kosmopolitan tempat berbagai bahasa dan tradisi sastra saling menyapa.',
        ],
      },
      {
        id: 'pra-2',
        number: 'Bab 02',
        title: 'Kartografi Kertas Perkamen dan Ilmu Falak',
        readingTimeMinutes: 6,
        paragraphs: [
          'Peta-peta pelayaran abad keenam belas memadukan pengamatan astronomi dengan catatan kedalaman teluk serta letak terumbu karang. Garis pantai digambar tidak selalu menurut skala matematis modern, melainkan menurut urutan tanjung yang dilihat dari geladak kapal.',
          'Setiap garis rumb pada peta tua adalah bukti kesabaran para kartografer dalam menerjemahkan pengalaman laut ke atas lembar perkamen.',
        ],
      },
      {
        id: 'pra-3',
        number: 'Bab 03',
        title: 'Naskah-Naskah yang Ikut Berlayar',
        readingTimeMinutes: 5,
        paragraphs: [
          'Selain cengkih, pala, dan keramik, peti kayu di dalam palka kapal juga kerap memuat gulungan naskah, risalah astronomi, dan kitab hukum laut. Sejarah maritim kita sesungguhnya adalah sejarah peredaran gagasan.',
        ],
      },
    ],
  },
  {
    id: 'tipografi-aksara-nusantara',
    catalogNumber: 'PN-2026-06',
    title: 'Rupa Huruf dan Naskah Klasik',
    subtitle: 'Menelusuri Estetika Aksara, Kertas Daluang, dan Penerbitan Awal',
    author: 'Larasati Mahardika',
    authorBio:
      'Desainer grafis editorial dan pengkaji sejarah cetak serta naskah Nusantara.',
    category: 'Esai & Budaya',
    year: 2026,
    pages: 198,
    language: 'Bahasa Indonesia',
    publisher: 'Serambi Cetak',
    isbn: '978-623-8114-50-2',
    readCount: 1970,
    readingMinutes: 13,
    stock: 4,
    availableStock: 4,
    clothColor: '#F6E6EB',
    clothAccent: '#B5536E',
    featuredQuote:
      'Bentuk huruf yang baik bekerja seperti kaca jendela yang jernih: pembaca melaluinya untuk bertemu makna tanpa terganggu oleh hiasan berlebihan.',
    synopsis:
      'Pengantar visual dan historis mengenai peralihan tradisi tulis tangan di atas kertas daluang menuju era cetak timah serta prinsip keterbacaan buku modern.',
    chapters: [
      {
        id: 'rhn-1',
        number: 'Bab 01',
        title: 'Dari Kulit Kayu Daluang ke Halaman Cetak',
        readingTimeMinutes: 5,
        paragraphs: [
          'Sebelum mesin cetak tiba di kota-kota pelabuhan, para penyalin naskah bekerja di atas daun lontar dan kertas daluang yang dibuat dari kulit pohon saeh. Serat alaminya yang lembut dan tahan lama memungkinkan tinta jelaga melekat dengan indah selama berabad-abad.',
          'Tata letak naskah lama sudah mengenal konsep pias atau margin yang lebar—bukan untuk memboroskan kertas, melainkan untuk memberi ruang pegangan bagi ibu jari pembaca serta tempat menulis catatan pinggir atau syarah.',
        ],
      },
      {
        id: 'rhn-2',
        number: 'Bab 02',
        title: 'Irama Spasi dan Kenyamanan Mata',
        readingTimeMinutes: 4,
        paragraphs: [
          'Dalam desain buku digital masa kini, prinsip klasik tersebut tetap relevan. Panjang baris yang terlalu lebar melelahkan otot mata saat berpindah baris, sedangkan jarak antarbaris yang terlalu rapat membuat paragraf terasa sesak.',
          'Tipografi yang ramah membiarkan pembaca lupa pada antarmuka layar dan sepenuhnya tenggelam dalam alur pikiran penulis.',
        ],
      },
      {
        id: 'rhn-3',
        number: 'Bab 03',
        title: 'Merawat Keterbacaan Lintas Generasi',
        readingTimeMinutes: 4,
        paragraphs: [
          'Setiap pilihan ukuran huruf, kontras warna kertas yang lembut, dan hirarki judul merupakan wujud penghormatan perpustakaan kepada pembacanya.',
        ],
      },
    ],
  },
  {
    id: 'senja-di-lembah-serayu',
    catalogNumber: 'PN-2026-07',
    title: 'Senja di Lembah Serayu',
    subtitle: 'Novel Pendek tentang Pulang Kampung dan Rumah Kakek',
    author: 'Dimas Prasetya',
    authorBio:
      'Novelis yang kerap mengangkat kisah keluarga, pedesaan Jawa, dan pergeseran antargenerasi dengan gaya tutur yang hangat.',
    category: 'Sastra & Puisi',
    year: 2025,
    pages: 172,
    language: 'Bahasa Indonesia',
    publisher: 'Penerbit Daun Tua',
    isbn: '978-623-8910-33-9',
    readCount: 3640,
    readingMinutes: 14,
    stock: 5,
    availableStock: 4,
    clothColor: '#F2E7E4',
    clothAccent: '#9A5463',
    featuredQuote:
      'Di rumah tua itu, lemari buku tidak dikunci; siapa pun boleh mengambil satu jilid dan membawanya ke beranda asalkan dikembalikan sebelum malam.',
    synopsis:
      'Kisah Arga yang kembali ke desa kelahirannya di lembah Serayu untuk membereskan perpustakaan pribadi mendiang kakeknya, lalu menemukan surat-surat lama yang mengubah pemahamannya tentang masa lalu keluarga.',
    chapters: [
      {
        id: 'sls-1',
        number: 'Bab 01',
        title: 'Kunci Lemari Kayu Jati',
        readingTimeMinutes: 5,
        paragraphs: [
          'Kereta pagi berhenti tepat pukul delapan di stasiun kecil yang dikelilingi hamparan sawah menguning. Arga menenteng tas kanvasnya menyusuri jalan setapak berbatu yang dulu sering ia lalui bersama kakeknya setiap musim liburan.',
          'Rumah beratap limas itu masih berdiri kokoh di ujung jalan. Ketika pintu depannya dibuka, aroma kayu tua, kapur barus, dan kertas buku menyambut dengan akrab. Di ruang tengah, tiga rak tinggi berisi ratusan buku sejarah, novel lama, dan catatan harian kakek masih tersusun rapi.',
        ],
      },
      {
        id: 'sls-2',
        number: 'Bab 02',
        title: 'Pembatas Buku dari Sehelai Pita',
        readingTimeMinutes: 5,
        paragraphs: [
          'Di halaman delapan puluh empat sebuah antologi sastra terbitan tahun tujuh puluhan, Arga menemukan sehelai pita kain biru pucat dan catatan pensil yang ditulis dengan tulisan tangan miring yang halus.',
          'Catatan itu tidak berisi keluhan, melainkan daftar judul lagu keroncong dan rencana menanam pohon mangga di halaman samping—hal-hal sederhana yang menandakan betapa kakeknya mencintai hari-hari biasa.',
        ],
      },
      {
        id: 'sls-3',
        number: 'Bab 03',
        title: 'Beranda Menghadap Sungai',
        readingTimeMinutes: 4,
        paragraphs: [
          'Menjelang sore, angin lembah bertiup sejuk membawa suara aliran Sungai Serayu dari kejauhan. Arga memutuskan untuk tidak menjual satu pun buku di rak itu. Sebagai gantinya, ia membuka beranda rumah itu setiap akhir pekan bagi anak-anak desa yang ingin membaca.',
        ],
      },
    ],
  },
  {
    id: 'percakapan-di-beranda-ilmu',
    catalogNumber: 'PN-2026-08',
    title: 'Dialog tentang Rasionalitas dan Empati',
    subtitle: 'Menjembatani Penalaran Kritis dengan Kepekaan Sosial',
    author: 'Prof. Sinta Wulandari',
    authorBio:
      'Filsuf pendidikan dan penulis buku pengantar logika humaniora yang aktif mengajar diskusi publik.',
    category: 'Filsafat',
    year: 2026,
    pages: 208,
    language: 'Bahasa Indonesia',
    publisher: 'Pustaka Cendekia',
    isbn: '978-623-6102-71-7',
    readCount: 2210,
    readingMinutes: 13,
    stock: 4,
    availableStock: 4,
    clothColor: '#EFE3EA',
    clothAccent: '#85536C',
    featuredQuote:
      'Akal sehat tidak pernah bertentangan dengan kelembutan hati; keduanya saling menjaga agar pengetahuan tidak menjadi dingin dan terasing.',
    synopsis:
      'Sebuah risalah populer yang memadukan prinsip berpikir jernih dengan etika empati dalam diskusi ruang publik, literasi digital, dan pendidikan warga.',
    chapters: [
      {
        id: 'dre-1',
        number: 'Bab 01',
        title: 'Mengapa Kejernihan Berpikir Membutuhkan Kerendahan Hati',
        readingTimeMinutes: 5,
        paragraphs: [
          'Sering kali orang membayangkan pemikir rasional sebagai sosok yang dingin dan kaku. Padahal, fondasi paling awal dari penalaran yang jujur adalah pengakuan bahwa pengetahuan kita selalu terbatas dan terbuka untuk diperbaiki.',
          'Kerendahan hati intelektual membuat kita sanggup mengubah pandangan ketika menemukan bukti baru yang lebih kuat, tanpa merasa kehilangan harga diri.',
        ],
      },
      {
        id: 'dre-2',
        number: 'Bab 02',
        title: 'Membaca Argumen dengan Itikad Baik',
        readingTimeMinutes: 4,
        paragraphs: [
          'Dalam tradisi filsafat analitik dikenal prinsip kedermawanan tafsir: sebelum menilai lemahnya pendapat seseorang, kita berusaha memahami versi terbaik dari maksud yang ingin ia sampaikan.',
          'Dengan pendekatan ini, perdebatan berubah dari arena saling mengalahkan menjadi upaya bersama mencari pemahaman yang lebih utuh.',
        ],
      },
      {
        id: 'dre-3',
        number: 'Bab 03',
        title: 'Perpustakaan sebagai Ruang Percakapan Lintas Zaman',
        readingTimeMinutes: 4,
        paragraphs: [
          'Setiap kali kita membuka buku dari masa lalu atau dari budaya yang berbeda, kita sedang melatih empati intelektual. Perpustakaan digital memperluas ruang perjumpaan ini kepada siapa saja yang mau meluangkan waktu untuk membaca dengan saksama.',
        ],
      },
    ],
  },
];
