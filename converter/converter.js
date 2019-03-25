var xhr = new XMLHttpRequest();

// метод, адрес, запросы (синхронные или асинхронные) / true or false
xhr.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

// нужно динамически задать курс доллара к гривне вытащить значение переменной из функции
var defaultUsd = 1;

xhr.onreadystatechange = function (res) {
    if( xhr.readyState == 4) {
        
        var responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject[3].sale);
        console.log(responseObject);
        showCurrency(responseObject);
        window.defaultUsd = responseObject[0].buy;
    }  
};

xhr.send();

function showCurrency (currency) {
    
    var currencyFrom = document.getElementById('from');
    var currencyTo = document.getElementById('to');
    
    for ( var c in currency) {
        
        // одним циклом рисуем 2 опции со значениями для двух селектов 
        var currencyOption = document.createElement('option');
        var currencyOption2 = document.createElement('option');
        
        var currencyText = document.createTextNode(currency[c].ccy);
        var currencyText2 = document.createTextNode(currency[c].ccy);
        
        currencyOption.appendChild(currencyText);
        currencyOption2.appendChild(currencyText2);
        
        currencyOption.dataset.buy = currency[c].buy;
        currencyOption2.dataset.buy = currency[c].buy;
        
        currencyFrom.appendChild(currencyOption);
        currencyTo.appendChild(currencyOption2);
        
    }
};

// прописали переменные и значения для default состояния селектов

// - - - - - - - - - нужно выковырять переменные с верха для стоковых значений доллара

var fromValue = 'USD';
var fromDataBuy = defaultUsd;

var toValue = 'USD';
var toDataBuy = defaultUsd;

document.getElementById('from').addEventListener('change', function(e) {
    for (i = 0; i < this.children.length; i++) {
        if (this.children[i].selected == true) {
            window.fromValue = this.children[i].value;
            window.fromDataBuy = this.children[i].dataset.buy;
        }
    }
})

document.getElementById('to').addEventListener('change', function(e) {
    for (i = 0; i < this.children.length; i++) {
        if (this.children[i].selected == true) {
            window.toValue = this.children[i].value;
            window.toDataBuy = this.children[i].dataset.buy;
        }
    }
})

// получаем элемент кнопки
var btn = document.getElementById('calculate');

btn.onclick = function () {
    
    // получаем сумму из поля ввода
    var amount = document.getElementById('amount').value;
    
    // выполняем проверку на пустое и неадекватное значение
    if (amount != null && amount != 0) {
        
        // получаем спан для введенной суммы
        var amountInResult = document.getElementById('amountinresult');
        // создаем ноду для введенной суммы
        var amountText = document.createTextNode(amount);
        // добавляем ноду в спан для результирующей суммы
        amountInResult.appendChild(amountText);

        // получаем нужные спаны и присваиваем им соответсвующие значения валют
        var fromCurrency = document.getElementById('fromcurrency');
        var fromCurrencyText = document.createTextNode(fromValue);
        fromCurrency.appendChild(fromCurrencyText);

        var toCurrency = document.getElementById('tocurrency');
        var toCurrencyText = document.createTextNode(toValue);
        toCurrency.appendChild(toCurrencyText);

        // считаем результат (кросскурс - прямые котировки)
        // если это BTC from или to - считаем с поправкой на курс доллара
        if (fromValue == 'BTC' || toValue == 'BTC') {
            var result = ((amount * fromDataBuy) / (amount * toDataBuy)) * amount * 26.8;
            console.log(1);
        } else {
            var result =  ((amount * fromDataBuy) / (amount * toDataBuy)) * amount;
            console.log(2);
        }
        
        // Подсчет для BTC, нужно динамически вывести курс USD ((amount * fromDataBuy) / (amount * toDataBuy)) * amount * 26.8   
        
        // кладем результат в нужный спан
        var inResult = document.getElementById('result');
        var inResultText = document.createTextNode(result);
        inResult.appendChild(inResultText);

        // отображаем результирующий блок в html
        document.getElementById('resultblock').style.display = 'block'; 
        
    } else {
        // выводим подсказку '* введите сумму не равную 0'
        document.getElementById('left').style.display = 'block';
    }
   
}
