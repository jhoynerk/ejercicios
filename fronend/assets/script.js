$(document).ready(function(){
  /*
   Extensioens del modelo Date de JS, Tambien se podria hacer una herencia y
   implementar estos metodos en una clase propia.
  */

  Date.prototype.monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  Date.prototype.weekName = [
    "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"
  ];

  Date.prototype.getWeekName = function() {
      return this.weekName[this.getDay()];
  };

  Date.prototype.getMonthName = function() {
      return this.monthNames[this.getMonth()];
  };

  Date.prototype.getFirstDayToMonth = function() {
      return new Date( this.getFullYear(), this.getMonth(), 1);
  };

  Date.prototype.getLastDayToMonth = function() {
      return new Date( this.getFullYear(), this.getMonth() + 1, 0);
  };

  Date.prototype.getBeforeMonth = function() {
      return new Date( this.getFullYear(), this.getMonth() - 1, 1);
  };

  Date.prototype.getAfterMonth = function() {
      return new Date( this.getFullYear(), this.getMonth() + 1, 1);
  };

  /*
    Esta función es para realizar todo el procedimiento relacionado con el cargado del calendario.
    ser carga el HEAD del calendario Month + FULL year
    Luego se obtine el primer y ultimo día del mes.
    Se construye los espacio en blancos hasta que comienza el primer día del mes.
    Se construye los numero de los días del mes, según el inicio y el final.
    Se envian los días feriados y se agrega la clase 'Holydays' a los días que son feriados.
    Se agrega una clase 'today', para identificar el día de hoy.
  */

  build_body_calendar = function( date, holydays = [] ){
    build_head_calendar(date);
    first_date = date.getFirstDayToMonth();
    last_date = date.getLastDayToMonth();
    build_body_blank_calendar(first_date);
    build_body_number_calendar(first_date, last_date, date);
    build_holidays(holydays);
    build_mark_today(date);
  }

  // Construir espacios blancos.
  build_body_blank_calendar = function( first ){
    $('#calendar-body').html('');
    for (i = 1; i < first.getDay(); i++) {
      $('#calendar-body').append(display_in_calendar('-'));
    }
  }

  // Construir los numeros de días del mes en el calendario.
  build_body_number_calendar = function( first_date, last_date, date ){
    for (i = first_date.getDate(); i <= last_date.getDate(); i++) {
      $('#calendar-body').append(display_in_calendar(i, date.getMonth()));
    }
  }

  // Colocar el titulo MONTH - YEAR.
  build_head_calendar = function( date ) {
    $('#calendar-title').html(date.getMonthName() + ' - ' + date.getFullYear());
  }

  // Add Clase Holydays a los días feriados.
  build_holidays = function( holydays ){
    $.each( holydays, function(index, value){
      mark_holyday(value.dia, value.mes, value.motivo);
    });
  }

  // Add Clase Today al día de hoy.
  build_mark_today = function( date ){
    if(current_date.getMonth() === date.getMonth() && current_date.getFullYear() === date.getFullYear()) {
      mark_today(current_date);
    }
  }

  // Get Holydays API nolaborables.com.ar
  get_holydays = function( date ){
    var result = null;
    $.ajax({
      url: 'http://nolaborables.com.ar/api/v2/feriados/'+date.getFullYear(),
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(holydays) {
        build_body_calendar(date, holydays);
        result = holydays;
      }
    });
    return result;
  }

  // Display contenido de calendario.
  display_in_calendar = function( content, month = 0 ){
    return '<div class="col-4 days-title" id="days-'+content+'" data-day="' + content + '" data-month="' + (month + 1) + '"> '+ content +' </div>';
  }

  // add class y titulo del día feriado
  mark_holyday = function( day, month, title = 'hola'){
    $('#days-'+day+'[data-month="'+month+'"] ').addClass('holydays');
    $('#days-'+day+'[data-month="'+month+'"] ').attr('title', title);
  }

  // add class del día.
  mark_today = function( date ){
    $('#days-'+date.getDate()).addClass('today');
    $('#days-'+date.getDate()).attr('title', 'Hoy');
  }

  /*
    current_date: Usado unicamente para tener la fecha actual.
    date: comienza con la fecha actual, pero varia según la rotación en el calendario.
    holydays: carga de los días feriados al año.
  */
  var current_date = new Date();
  var date = new Date();
  var holydays = get_holydays(current_date);

  // cargar el mes anterior al actual.
  $('#calendar-arrows').delegate('.arrow-left', 'click', function(){
    date = date.getBeforeMonth();
    build_body_calendar(date, holydays);
  });
  // cargar el mes siguiente al actual.
  $('#calendar-arrows').delegate('.arrow-right', 'click', function(){
    date = date.getAfterMonth();
    build_body_calendar(date, holydays);
  });
});
