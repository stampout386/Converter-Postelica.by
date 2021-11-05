const product = [{
        articleLilia: '19С-0104',
        articlePostelica: '0001h',
        productName: 'Полотенце махровое детское (пончо), 100% хлопок, р-р 113*83',
        price: 30.25,
        size: ['113*83', ],
        color: ['белый', 'бронзовый', 'кремовый', 'серый'],
        count: 1,
    },
    {
        articleLilia: '13С-0534(D-283)',
        articlePostelica: '0002h',
        productName: 'Детский халат с капюшоном (пл.360 г/м2)',
        price: 36.85,
        color: ['белый', 'бронзовый', 'кремовый', 'серый'],
        size: [116, 128, 134, 146],
        count: 1,
    },
    {
        articleLilia: '16С-0214',
        articlePostelica: '0003h',
        productName: 'Детский халат с аппликацией (пл.360 г/м2)',
        price: 39.64,
        color: ['белый', 'бронзовый', 'кремовый', 'серый'],
        size: [116, 128, 134, 146],
        count: 1,
    },
    {
        articleLilia: '13С-0494(W-280)',
        articlePostelica: '0004h',
        productName: 'Халат женский укороченный с капюшоном (пл.360-400 г/м2 рост 170',
        price: 61.62,
        color: ['белый', 'бронзовый', 'кремовый', 'серый','синий',],
        size: [42, 44, 46, 48, 50],
        count: 1,
    }

]


let btn3 = document.querySelector('.btn-3');
let in1 = document.querySelector('.in1');
in1.addEventListener('input', () => {
    calculator(product)
});


let stringData = '';

function calculator(arr) {

    let in1 = document.querySelector('.in1').value;
    arr.forEach(item => {
        if (in1 === item.articlePostelica) {
            document.querySelector('.name').innerHTML = item.productName;
            document.querySelector('.article').innerHTML = item.articleLilia;
            document.querySelector('.price').innerHTML = (item.price - item.price / 100 * 30).toFixed(2);
            document.querySelector('.nds').innerHTML = (document.querySelector('.price').value / 100 * 20).toFixed(2);
            item.size.forEach(element => {
                document.querySelector('.size').innerHTML += `
               <option value="${element}">${element}</option>
               `
            })

            item.color.forEach(element => {
                document.querySelector('.color').innerHTML += `
                <option value="${element}">${element}</option>
                `
            })

            stringData = item;

        }
    })
}
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter') {
        addedString();
    }
});
document.querySelector('.add').addEventListener('click', addedString);

let docData = [];

let select = document.querySelector('.size');
let color = document.querySelector('.color');

function addedString() {
    if (stringData) {
        let index = select.selectedIndex;
        stringData.sizeselect = select[index].value;

        let colorIndex = color.selectedIndex;
        stringData.colorselect = color[colorIndex].value;


        let str = docData.find(item => item.articlePostelica === stringData.articlePostelica)
        // 
        console.log(str);
        if (str) {
            str.count++
        } else {
            docData.push(stringData);
        }
        renderDocString();
        stringData = '';
    }
}

function renderDocString() {
    clearFields();

    docData.forEach(item => {
        document.querySelector('.print').innerHTML += `<div class ="doc-string" data-add-product-id="${item.articlePostelica}">
    <div class="print-string">${item.articleLilia}</div>
    <div class="print-string">${item.productName}</div>
    <div class="print-string">${item.colorselect}</div>
    <div class="print-string">${item.sizeselect}</div>
    <div class="print-string countdoc">${item.count}</div>
    <div class="print-string pricedoc">${((item.price-item.price/100*30)*item.count).toFixed(2)}</div>
    <div class="print-string ndsdoc">${((item.price-item.price/100*30)/100*20*item.count).toFixed(2)}</div>
    <div class="print-string">
       <button class="print-del-btn print-btn" data-btn-id="${item.articlePostelica}">
           <img src="/img/minus.png" alt="" class="btndel">
       </button>
       <button class="print-add-btn print-btn" data-btn-id="${item.articlePostelica}">
           <img src="/img/plus.png" alt="" class="btnadd">
       </button>
    </div>
   </div>
    `
    })
}

document.querySelector('.clear').addEventListener('click', renderDocString);
document.querySelector('.save').addEventListener('click', () => {console.log(stringData)});
document.querySelector('.winprint').addEventListener('click', () => {
    let printContent = document.querySelector('.print-container').innerHTML;
    document.body.innerHTML = printContent;
    window.print()
});

function clearFields() {
    document.querySelector('.in1').value = '';
    document.querySelector('.size').innerHTML = '';
    document.querySelector('.color').innerHTML = '';
    document.querySelector('.print').innerHTML = '';
    document.querySelector('.name').innerHTML = '';
    document.querySelector('.article').innerHTML = '';
    document.querySelector('.price').innerHTML = '';
    document.querySelector('.nds').innerHTML = '';
}

let print = document.querySelector('.print');
print.addEventListener('click', targetClick);

function targetClick(e) {

    let button = e.target.closest('.print-btn');
    if (button) {
        if (button.closest('.print-add-btn')) {
            for (let i = 0; i < docData.length; i++) {
                if (docData[i].articlePostelica == button.dataset.btnId) {
                    docData[i].count++;
                    renderDocString();
                    break;
                }
            }
        }
        if (button.closest('.print-del-btn')) {
            for (let i = 0; i < docData.length; i++) {
                if (docData[i].articlePostelica == button.dataset.btnId) {
                    docData[i].count--;
                    renderDocString();
                    if (docData[i].count === 0) {
                        docData.splice(i, 1);
                        renderDocString();
                    }
                    break;
                }
            }
        }

    } else {
        return null
    }
}

