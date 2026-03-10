require(['app.min',"he.js","bootbox.all.min.js","bootstrap-select.min.js"], function(app,he,bootbox,selectpicker){


/*
 * 2020-04-09 
 */
//define(['app'
 //   'jqueryUi',
  //  'localstorage',
   // 'underscore',
   // 'backbone',
    //'common/dataService',
    //'config'
//], function(app){
/*
	var Common	= this;

    function setCodiceFiscale(codFiscale) {
		Config.codiceFiscale = codFiscale;
	}

	function getCodiceFiscale() {
		return Config.codiceFiscale;
	}

    function createTableGeneric(obj, $div, xlat) {
        $div.append($('<table>'));
        for (var i in obj) {
        	var label	= i;
        	if (xlat) {
	        	if (xlat[i]) {
	        		label = xlat[i];
	        	}
        	}
            $div.find('table')
                .append($('<tr>')
                    .append($('<td>').html(label))
                    .append($('<td>').html(obj[i])));
        }
    };

    function isDate(d) {
    	if(!d) return false;
		if ( Object.prototype.toString.call(d) === "[object Date]" ) {
			return !isNaN(d.getTime());
		}
		if (10 == d.length) {
            return false;
		}
		var d2 = new Date(d);
		return ((d2 !== 'Invalid Date') && (!isNaN(d2)));
    }

    function dateFormat(todayAsString) {
    	var today;
    	if (todayAsString && isDate(todayAsString)) {
    		today	= new Date(todayAsString);
    	} else {
    		today	= new Date();
    	}
    	var dd = today.getDate();
    	var mm = today.getMonth()+1;//January is 0!`
    	var yyyy = today.getFullYear();
    	if (dd < 10) {
			dd='0'+dd;
		}
    	if (mm < 10) {
    		mm='0'+mm;
		}
    	return dd+'/'+mm+'/'+yyyy;
    }
    
    /*
     * Preleva una data nel formato Y-M-D o d/m/Y, o una data Javascript in millisecondi,
     * e ritorna un array di componenti [ Y, m, d, H, i, s ]
     */
 /*   function compDate(dateString) {
    	if (('number' == typeof(dateString)) || isDate(dateString)) {
    		var d = new Date(dateString);
    		return [
    			d.getFullYear(),
    			d.getMonth() + 1,
    			d.getDate(),
    			d.getHours(),
    			d.getMinutes(),
    			d.getSeconds()
    		];
    	}
    	var a	= dateString.split(/[-\/ :\.]/);
    	if (a.length >= 3) {
	    	if ((parseInt(a[0]) > 99) || (parseInt(a[2]) > 99)) {
	    		if (parseInt(a[2]) > 99) {
	    			var y = a[0];
	    			a[0] = a[2];
	    			a[2] = y;
	    		}
	    		return a;
	    	}
    	}
		popup(dateString + ' non è una data valida');
		return false;    		
    }
    
    /* Restituisce una data a partire da una data testuale o numerica */
 /*   function parseDate(dateString) {
    	var comp	= compDate(dateString);
    	if (!comp) {
    		return new Date();
    	}
    	var gg		= parseInt(comp[2]);
    	var mm		= parseInt(comp[1]) - 1;
    	var aaaa	= parseInt(comp[0]);
    	var h		= (comp.length > 3) ? comp[3] : 12;
    	var m		= (comp.length > 4) ? comp[4] : 0;
    	var s		= (comp.length > 5) ? comp[5] : 0;
    	return new Date(aaaa, mm, gg, h, m, s);
    }
    
    function safeDate(dateString) {
    	var c = compDate(dateString).map(function(v){ return '' + v; });
    	return [(c[2].length < 2 ? '0':'') + c[2],
			    (c[1].length < 2 ? '0':'') + c[1],
				 c[0] ].join('/');
    }
    
    function calcInterval(monthString) {
    	var today	= safeDate(new Date());
		var months 	= parseInt(monthString);
		var comp	= today.split('/').map(Math.floor);
		while (comp[1] < months) {
			comp[2] -= 1;
			comp[1] += 12;
		}
		comp[1]	-= months;
		from	= [
		    	   	(comp[0] < 10 ? '0':'') + comp[0],
		      	    (comp[1] < 10 ? '0':'') + comp[1],
		     		 comp[2]
	    	   	].join('/');
		return [ from, today ];
    }
    
    function safeDateAndTime(dateString) {
    	var c 	= compDate(dateString);
    	var dt 	= safeDate(dateString);
    	if ((6 == c.length) || (7 == c.length)) {
        	dt	 += ' '
        		 + ( (''+c[3]).length < 2 ? '0':'') + c[3]
				 + ':'
				 + ( (''+c[4]).length < 2 ? '0':'') + c[4]
				 //+ ':'
				 //+ ( (''+c[5]).length < 2 ? '0':'') + c[5]
    			;
    	}
    	return dt;
    }
    	/**
	 * Subordina una funzione ad una conferma.
	 * @param	proceed		funzione
	 * @param	msg			messaggio che sostituisce il default 'Sei siuro?'
	 * @param	negative	funzione in caso di risposta negativa
	 */
	
/*	function confirm(proceed, msg, negative, classOverride) {
		'use strict';
		console.debug('confirm', classOverride, msg);
		popup(msg||'Sei sicuro?', classOverride || 'confirm', proceed, negative);
	}*/
	
	/**
	 * @param	msg
	 * @param	mode		alert|error
	 * 						notice
	 * 						warning
	 * 						confirm
	 */
	app.functions['popup'] =function (msg, mode, cbYes, cbNo) {
		'use strict';
		console.warn(msg, mode);
		var mainDlg = $('#alertDlg');
		if (!mainDlg.length) {
			mainDlg	= $('<div id="alertDlg" style="display: none">' + 
						  '<div id="alertDlgMsg" class="no-select">'+
							  '<div id="alertDlgTitle"></div>'+
							  '<div id="alertDlgText"></div>'+
							  '<div id="alertDlgFooter"><button id="DlgYes"></button>&nbsp;<button id="DlgNo"></button></div>'+
						  '</div>'+
						'</div>').appendTo('body');
			$('#alertDlgMsg').draggable();
		}
		var todo = { msg: msg, mode: mode || 'error', count: 0, cbYes: cbYes, cbNo: cbNo };
		if (window.dlgRunning) {
			stackPush(todo);
		} else {
			console.log('popup first', todo);
			realDisplay(todo);
		}
		return;
		
		// Definitions
		function realResize() {
			'use strict';
			var scrollTop	= window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			var ww, hh, wmax;
			if (window.dlgRunning) {
				if ($('#main-content>div').length) {
					// Imposta l'altezza del blocco modale
					// $('#alertDlg').css({ height: $('#main-content>div').height() + $('#main-content>div').position().top });
					$('#alertDlg').css({ height: $('body').height() + scrollTop });
				}
				// Imposta la posizione del dialogo.
				$('#alertDlgMsg').css({ top: scrollTop + ( parseInt($('body').css('height'))*0.3 - parseInt($('#alertDlgMsg').css('height'))) / 2 });
				// Imposta l'altezza del dialogo.
				wmax = $('#alertDlgMsg').width() - 28;
				$('<div>')
					.prop({ id: 'textMetric' })
					.css({ 
						display: 'none', 
						position: 'fixed', 
						top: 0, 
						left: 0,
						'max-width': wmax
					})
					.html($('#alertDlgText').html())
					.appendTo('body');
				
				ww = $('#textMetric').width();
				hh = $('#textMetric').height();
				if (ww < wmax) {
					ww = wmax;
				}
				if (hh < 300) {
					hh = 280;
				}
				$('#textMetric').remove();
				// 
				// $('#alertDlgText').css({ width: ww, height: hh });
			}
		}
		function realDisplay(todo) {
			'use strict';
			console.log('popup displaying', todo);
			window.dlgRunning	= true;
			$('#alertDlg').attr({ class: todo.mode||'error' });
			$('#alertDlgText').html(todo.msg + (todo.count ? ('<br />(Messaggio ripetuto ' + (todo.count+1) + ' volte)') : ''));
			realResize();
			$(mainDlg).fadeIn(500, function() {
				console.log('popup fadein complete');
				$(window).on('resize', realResize);
				$(window).on('scroll', realResize);
				$('#alertDlgFooter button').off('click').on('click', function(){
					var btn = $(this);
					$('#alertDlg').fadeOut(200, function() {
						console.log('popup fadeout complete');
						var queue	= stackPop(todo);
						if (queue) {
							realDisplay(queue);
						} else {
							console.log('no longer running');
							window.dlgRunning	= false;
							$(window).on('resize', null);
							$(window).on('scroll', null);
						}
						var fn = null;
						switch (btn.attr('id')) {
							case 'DlgYes':
								fn = todo.cbYes;
								break;
							case 'DlgNo':
								fn = todo.cbNo;
								break;
						}
						if (fn) {
							console.log('popup callback');
							fn();
						}
					});
				});			
			});
			if ('notice' === todo.mode) {
				console.log('popup notice: setting timeout');
				setTimeout(function() {
					console.log('popup notice timeout expired');
					$('#alertDlgFooter button#DlgYes').click();
				}, 2000);
			} else {
				console.log('popup ' + todo.mode + ': no timeout set');
			}
		}
		function stackPush(obj) {
			'use strict';
			var popped;
			if (!window.dlgStack) {
				window.dlgStack = [ ];
			}
		 	if (window.dlgStack.length > 0) {
			 	popped = window.dlgStack.pop();
			 	if (popped.msg === obj.msg) {
			 		obj.count++;
			 		// E popped non viene rimesso sullo stack.
			 	} else {
			 		window.dlgStack.push(popped);
			 	}
		 	}
			window.dlgStack.push(obj);
			console.log('popup pushed', window.dlgStack);
		}
		function stackPop(curr) {
			'use strict';
			var next = null;
			if (!window.dlgStack) {
				window.dlgStack = [ ];
			}
			console.log('popup popping', window.dlgStack);
			if (window.dlgStack.length) {
				next = window.dlgStack.pop();
				/*
				if (next.mode != curr.mode) {
					console.log('next is ' + next.mode + ', current is ' + curr.mode + ' - returning FALSE');
					window.dlgStack.push(next);
					return false;
				}
				*/
				console.log('next is popup - returning it');
				return next;
			}
			console.log('queue is empty');
			return false;
		}
	}

   


});