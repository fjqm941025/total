const socket = io();
const input_arr = ["11", "12", "13", "14", "21", "22", "23", "24"];
socket.on('chat message', (green_light) => {
   $(`input[name=${green_light}]`).val("GREEN");
   $(`input[name=${green_light}]`).css('background-color', 'green');
    input_arr.forEach(function(input) {
        if(green_light != input){
            $(`input[name=${input}]`).val("RED");
            $(`input[name=${input}]`).css('background-color', 'red');
        }
    });


 });
