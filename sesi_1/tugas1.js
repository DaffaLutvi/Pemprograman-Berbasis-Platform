let matematika = 85;
let bahasaInggris = 90;
let ipa = 78;

console.log("Matematika :" + matematika);
console.log("Bahasa Inggris :" + bahasaInggris);
console.log("Ilmu Pengetahuan alam :" + ipa);
console.log("------------------------------------")

let nilaiRataRata = (matematika + bahasaInggris + ipa) /3;

console.log("Nilai Rata Rata :" + nilaiRataRata)

let statusKelulusan ;

if(nilaiRataRata >= 80){
    statusKelulusan = "Lulus"
} else {
    statusKelulusan = "Tidak Lulus"
}

console.log("Status Kelulusan :" + statusKelulusan)