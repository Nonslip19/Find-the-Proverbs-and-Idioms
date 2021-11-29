/*
fetch("https://sozluk.gov.tr/atasozu")
    .then(response => response.json())
    .then(json => console.log(json));
    */
//users variables
const output = document.getElementById("output");
const searchBox = document.getElementById("searchBox");
const searchList = document.getElementById("searchList");
console.log(searchList)


//json kaynagından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturalım

const switchWord = []; //search
const idiomsSays = []; //display

//async function  
//giriş için verilere ulaşma
window.onload = () => loadData();


async function loadData() {
    const comeDatas = await fetch("https://sozluk.gov.tr/atasozu");
    let datas = await comeDatas.json();


    datas.forEach(element => {
        switchWord.push(element.anahtar); //tekrarlılar dahil
        idiomsSays.push(element.sozum);

    });
    console.log(idiomsSays)
    const unitedWord = [...new Set(switchWord)]; //burası anahtar kelimelerdeki tekrarları teke indirmek için
    console.log(unitedWord)
    unitedWord.sort(() => Math.random() - 0.5);
    console.log(unitedWord);
    let sayac = 0;
    unitedWord.forEach(element => {
        if (sayac < 5) {
            const newSwitchWord = document.createElement("option");
            searchList.appendChild(newSwitchWord);
            newSwitchWord.value = element;
        }
        sayac++;


        //searchList.innerHTML = `<option>${element}</option>`;
    });


}

searchBox.addEventListener("input", (e) => {
    sonuclariFiltrle(e.target.value);
})

const sonuclariFiltrle = (wantedWord) => {
    output.innerHTML = "";
    const wantedKey = new RegExp(wantedWord, "gi") //büyük küçük duyarsız
    console.log(wantedKey)
    let equals = idiomsSays.filter(word => wantedKey.test(word));
    console.log(equals)

    if (wantedWord.length < 1) {
        equals = []
    } else {
        equals.forEach(es => {
            const otherOutput = document.createElement("li");
            output.appendChild(otherOutput);
            otherOutput.innerHTML = es;
            //output.innerHTML = `<li>${es}</li>`;
        })
    }

}