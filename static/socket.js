const socket = io();
socket.on('chat message', (green_light) => {
   $(`input[name=${green_light}]`).val("GREEN");
 });
