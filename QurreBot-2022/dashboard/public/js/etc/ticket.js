let __tickets = [];
let __hash, __roles = '';
$(document).ready(function(){
  let to_json = document.getElementById('tickets_delete').innerHTML;
  let to_json_roles = document.getElementById('tickets_roles').innerHTML;
  document.getElementById('tickets_delete').outerHTML = '';
  document.getElementById('tickets_roles').outerHTML = '';
  __tickets = JSON.parse(to_json);
  __roles = to_json_roles;
});
function getPosition(e){
  var x = y = 0;
  if (!e) {
      var e = window.event;
  }
  if (e.pageX || e.pageY){
      x = e.pageX;
      y = e.pageY;
  } else if (e.clientX || e.clientY){
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return {x: x, y: y}
}
let hide = true;
$('#wrapper').click((e) => HidePicker());
$('#discord_inv').click((e) => HidePicker());
$('#ticket_create').click((e) => HidePicker());
$('#ticket_settings').click((e) => HidePicker());
$('#ticket_delete_div').click((e) => HidePicker());
$('#ticket_rename_div').click((e) => HidePicker());
$('#ticket_disable_div').click((e) => HidePicker());
$('#ticket_enable_div').click((e) => HidePicker());
function HidePicker() {
  if(hide){
    document.getElementById('picker').style = `display: none;`;
  }
}
$('.getEmojis').click(() => {
  setTimeout(() => {
    let list = document.getElementsByClassName('dontvisible');
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      let _ = element.getElementsByTagName('button');
      for (let ind = 0; ind < _.length; ind++) {
        _[ind].click();
        _[ind].outerHTML = '';
      }
    }
  }, 500);
  hide = false;
  var coord = getPosition();
  if(coord.x > ($(window).width() - 347))coord.x = $(window).width() - 347;
  if(coord.y > (window.innerHeight - 424))coord.y = window.innerHeight - 424;
  document.getElementById('picker').style = `top: ${coord.y}px; left: ${coord.x}px;`;
  setTimeout(() => hide = true, 100);
});
function TicketSettings(hash) {
  __hash = hash;
  let ticket = __tickets.find(x => x._id == hash);
  if(ticket == undefined) return;
  document.getElementById('ticket_hash').value = ticket._id;
  document.getElementById('ticket_message').innerHTML = ticket.content;
  if(ticket.only_admin_close) document.getElementById('ticket_admin').checked = "checked";
  else document.getElementById('ticket_admin').checked = "";
  document.getElementById('ticket_message_standart').innerHTML = ticket.message_text;
  document.getElementById('ticket_message_embed').innerHTML = ticket.message_embed;
  document.getElementById('ticket_access').innerHTML = `<div class="directorist-select directorist-select-multi" id="sel-${hash}" data-default='${ticket.roles}' data-isSearch="true" data-message='Роли.' data-multiSelect='${__roles}' ><input type="hidden" name="role"></div>`;
  if(ticket.enable){
    document.getElementById('ticket_disable').style = '';
    document.getElementById('ticket_enable').style.display = 'none';
  }else{
    document.getElementById('ticket_enable').style = '';
    document.getElementById('ticket_disable').style.display = 'none';
  }
  pureScriptSelect(`#sel-${hash}`);
	$('#ticket_settings').fadeIn(400);
  $('#sgm').fadeOut();
  $('#sgmad').fadeIn();
  $('#sgmadd').fadeOut();
  $('#met').fadeOut();
  $('#meod').fadeIn();
  $('#metd').fadeOut();
  $('#spd').fadeOut();
  $('#spdmad').fadeIn();
  $('#spdadd').fadeOut();
}
$('#ticket_rename').click(function(event) {
  let ticket = __tickets.find(x => x._id == __hash);
  if(ticket == undefined) return;
  document.getElementById('ticket_rename_hash').value = ticket._id;
  document.getElementById('ticket_rename_name').value = ticket.name;
	$('#ticket_rename_div').fadeIn(400);
});
$('#ticket_delete').click(function(event) {
  let ticket = __tickets.find(x => x._id == __hash);
  if(ticket == undefined) return;
  document.getElementById('ticket_delete_hash').value = ticket._id;
	$('#ticket_delete_div').fadeIn(400);
});
$('#ticket_disable').click(function(event) {
  let ticket = __tickets.find(x => x._id == __hash);
  if(ticket == undefined) return;
  document.getElementById('ticket_disable_hash').value = ticket._id;
	$('#ticket_disable_div').fadeIn(400);
});
$('#ticket_enable').click(function(event) {
  let ticket = __tickets.find(x => x._id == __hash);
  if(ticket == undefined) return;
  document.getElementById('ticket_enable_hash').value = ticket._id;
	$('#ticket_enable_div').fadeIn(400);
});

$('#ticket_create_button').click(function(event) {
	$('#ticket_create').fadeIn(400);
});
$('#ticket_create_close').click(function(event) {
	$('#ticket_create').fadeOut(400);
});
$('#ticket_close').click(function(event) {
	$('#ticket_settings').fadeOut(400);
});
$('#ticket_delete_close').click(function(event) {
	$('#ticket_delete_div').fadeOut(400);
});
$('#ticket_rename_close').click(function(event) {
	$('#ticket_rename_div').fadeOut(400);
});
$('#ticket_disable_close').click(function(event) {
	$('#ticket_disable_div').fadeOut(400);
});
$('#ticket_enable_close').click(function(event) {
	$('#ticket_enable_div').fadeOut(400);
});
$('#rbt1').click(function(event) {
	$('#rts1').fadeIn(400);
});
$('#sgma').click(function(event) {
    $('#sgm').fadeIn(700);
    $('#sgmad').fadeOut(0);
    $('#sgmadd').fadeIn(0);
});
$('#sgmac').click(function(event) {
    $('#sgm').fadeOut(700);
    $('#sgmad').fadeIn(0);
    $('#sgmadd').fadeOut(0);
});
$('#spdma').click(function(event) {
    $('#spd').fadeIn(700);
    $('#spdmad').fadeOut(0);
    $('#spdadd').fadeIn(0);
});
$('#spdad').click(function(event) {
    $('#spd').fadeOut(700);
    $('#spdmad').fadeIn(0);
    $('#spdadd').fadeOut(0);
});
$('#meo').click(function(event) {
    $('#met').fadeIn(700);
    $('#meod').fadeOut(0);
    $('#metd').fadeIn(0);
});
$('#mets').click(function(event) {
    $('#met').fadeOut(700);
    $('#meod').fadeIn(0);
    $('#metd').fadeOut(0);
});