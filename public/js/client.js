// client side socket connection
console.log('connecting to socket');
let socket = io.connect('http://localhost:3000');
let clientInfo = {};

$('document').ready(function () {
    console.log('document ready');
    $.get("/signup", function(data, status){
        $('#displayContent').html(data);
    });
});

