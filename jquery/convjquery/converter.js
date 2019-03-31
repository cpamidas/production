$('.btn').prop('disabled', true);

$.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (res) {
    
	console.log(res);
    
    $.each(res, function (i, e) {
        $('.from').append('<option value="' + e.ccy + '" data-sale="' + e.sale + '">' + e.ccy + '</option>');
        
        $('.to').append('<option value="' + e.ccy + '" data-sale="' + e.sale + '">' + e.ccy + '</option>');
    });
    
    $('.btn').prop('disabled', false);
});

$('.btn').click(function () {
    
    var result = 0;
    var amount = +$('#amount').val();
    
    var from = $('.from > option:selected').data('sale');
    var to = $('.to > option:selected').data('sale');
    
    var fromValue = $('.from > option:selected');
    var toValue = $('.to > option:selected');
    
    
    var usd = $('option[value="USD"]').data('sale');
    
    if (fromValue == 'BTC') {
        from *= usd;
    } else if (toValue == 'BTC') {
        to *= usd;
    }
    
    result = from * amount / to;
    
    // text - передает строку;
    $('.result').text('Result: ' + result + toValue);
    
});





