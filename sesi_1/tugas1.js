let matematika = 80;
let bahasaInggris = 95;
let ipa = 75;

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