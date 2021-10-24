const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const filePath = path.join(__dirname, 'datadiri.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const entryData = (nim,tahun,semester) => new Promise((resolve, reject) => {
    const random = Math.random();
    let cookie = fs.readFileSync(path.join(__dirname,'cookie.txt'), 'utf8');

    let url = "https://sim-online.polije.ac.id/entry_wisuda.php";	
	url = url + "?valnrpMahasiswa=" + nim + "&valTahun=" + tahun + "&valSemester=" + semester +"&Ubah=1";
	url = url + "&nama="+ data.nama + "&jenis_kelamin="+ data.jenis_kelamin +"&tgllahir="+ data.tgllahir +"&tmplahir="+ data.tmplahir + "&status_kawin="+ data.status_kawin + "&tinggi="+ data.tinggi + "&berat="+ data.berat + "&departemen="+ data.departemen + "&jurusan="+ data.jurusan + "&tanggal_lulus="+ data.tanggal_lulus +"&lama_studi="+ data.lama_studi +"&ipk="+ data.ipk +"&lama_susun_laporan="+ data.lama_susun_laporan +"&alamat="+ data.alamat +"&no_telp="+ data.no_telp +"&asal_smu="+ data.asal_smu +"&lulus_smu="+ data.lulus_smu +"&email="+ data.email +"&nama_ortu="+ data.nama_ortu;
	url = url + "&judul_pkl="+ data.judul_pkl +"&pembimbing1="+ data.pembimbing1 +"&pembimbing2="+ data.pembimbing2 +"&pembimbing3="+ data.pembimbing3+"&setuju="+ data.setuju + "&judul_ta="+ data.judul_ta +"&pembimbing1_ta="+ data.pembimbing1_ta +"&pembimbing2_ta="+ data.pembimbing2_ta + "&sudah_kerja="+ data.sudah_kerja + "&nama_instansi_kerja="+ data.nama_instansi_kerja + "&alamat_kerja="+ data.alamat_kerja + "&tgl_diterima_kerja="+ data.tgl_diterima_kerja + "&jabatan_kerja="+ data.jabatan_kerja + "&gaji_kerja="+ data.gaji_kerja + "&propinsi="+ data.propinsi;
    url = url + "&sid=" + random ;

    fetch(url, {
      method: 'GET',
      headers: {
        "Accept": "*/*",
        "Content-type": "application/x-www-form-urlencoded",
        Origin: "https://sim-online.polije.ac.id",
        Connection: "keep-alive",
        Cookie: cookie     
      }
    })
    .then(res => resolve(res))
    .catch(err => {
        resolve(false);
    });
  });

  module.exports = { 
    entryData, 
}