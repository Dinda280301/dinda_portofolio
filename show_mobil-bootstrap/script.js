function sambut () {
    alert('selamat datang')
}
const Showroom = {
    merek:'honda',
    banyak:3,
    variasi:[{
        nama:'hrv',
        dpn:"https://asset.honda-indonesia.com/variants/images/tj16tSn1wcNoOfxRxpavivIpDzQsRgkrfKFMihIO.png",
        blkng:"https://img.cintamobil.com/2018/12/03/KM1pHMws/honda-hr-v-sport-europe-2-850x425-0a57.jpg",
        dalam:"https://www.blibli.com/friends-backend/wp-content/uploads/2021/10/Untitled-design-16-4.jpg",
        mesin:"https://autonetmagz.com/wp-content/uploads/2014/11/Mesin-Honda-HRV-Amerika.jpg"
    },{
        nama:'crv',
        dpn:"https://www.honda-indonesia.com/uploads/images/models/variants/type15p__1613383038986.png",
        blkng:"https://www.promohondasurabaya.id/ss/pm/hondasurabaya_02ubrsayo0aamy8Dar201717377c3.jpg",
        dalam:"https://jualan-honda.com/wp-content/uploads/2018/10/Body-Bagian-Belakang-All-New-Honda-CR-V.jpg",
        mesin:"https://autonetmagz.com/wp-content/uploads/2016/12/mesin-honda-cr-v-turbo-2017.jpg"
    }],
    suka: function () {
        alert('Ditambahkan ke wihlist')
    },
    buy: () => alert('Ditambahkan ke Keranjang'),
    tambah (){
        alert(this.merek + 'ada' + this.variasi[0].nama  + ',' + this.variasi[1].nama  + ',' + this.variasi[2].nama );
    },
    hi:sambut
}

document.getElementById('dpn').onclick = function()
{
    document.getElementById("image").src=Showroom.variasi[0].dpn;
    document.getElementById('teks').textContent = "Tampak depan mobil";
}
document.getElementById('blkg').onclick = function()
{
    document.getElementById("image").src=Showroom.variasi[0].blkng;
    document.getElementById('teks').textContent = "Tampak belakang mobil";
}
document.getElementById('dlm').onclick = function()
{
    document.getElementById("image").src=Showroom.variasi[0].blkng;;
    document.getElementById('teks').textContent = "Tampak Interior mobil";
}
document.getElementById('msn').onclick = function()
{
    document.getElementById("image").src=Showroom.variasi[0].mesin;
    document.getElementById('teks').textContent = "Bagian Mesin";
}

document.getElementById('dpnc').onclick = function()
{
    document.getElementById("imagecrv").src=Showroom.variasi[1].dpn;
    document.getElementById('tekscrv').textContent = "Tampak depan mobil";
}
document.getElementById('blkgc').onclick = function()
{
    document.getElementById("imagecrv").src=Showroom.variasi[1].blkng;
    document.getElementById('tekscrv').textContent = "Tampak belakang mobil";
}
document.getElementById('dlmc').onclick = function()
{
    document.getElementById("imagecrv").src=Showroom.variasi[1].dalam;
    document.getElementById('tekscrv').textContent = "Tampak Interior mobil";
}
document.getElementById('msnc').onclick = function()
{
    document.getElementById("imagecrv").src=Showroom.variasi[1].mesin;
    document.getElementById('tekscrv').textContent = "Bagian Mesin";
} 

$(document).on('click', '.mobil', function() {
    var show = $(this).data('show');
    $(show).removeClass("hidden").siblings().addClass("hidden");
});

let brv = {
    nama:'brv',
    dpn:'belom',
    blkng:'belom',
    dalam:'belom',
    mesin:'belom'
}

function tambah() {Showroom.variasi.push(brv);
    console.log(Showroom.variasi);
    Showroom.tambah();
    }