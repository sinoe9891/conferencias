// Funcion de espera que cargue el contenido
(function () {
	"use strict";
	//Select
	var regalo = document.getElementById('regalo');

	document.addEventListener('DOMContentLoaded', function () {
		// console.log("listo");
		var map = L.map('mapa').setView([14.077642, -87.214377], 18);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker([14.077642, -87.214377]).addTo(map)
			.bindPopup('Mi Casa')
			.openPopup();
		//CAMPOS DATOS USUARIO
		var nombre = document.getElementById('nombre');
		var apellido = document.getElementById('apellido');
		var email = document.getElementById('email');

		//CAMPOS PASES
		var pase_dia = document.getElementById('pase_dia');
		var pase_dosdias = document.getElementById('pase_dosdias');
		var pase_completo = document.getElementById('pase_completo');

		//BOTONES
		var calcular = document.getElementById('calcular');
		var errorDiv = document.getElementById('error');
		var botonRegistro = document.getElementById('btnRegistro');
		var lista_productos = document.getElementById('lista-productos');
		var lista_box = document.getElementById('lista');
		var suma = document.getElementById('sumatotal');

		//EXTRAS
		var camisas = document.getElementById('camisa_evento');
		var etiquetas = document.getElementById('etiquetas');
		var error_regalo = document.getElementById('error_regalo')


		calcular.addEventListener('click', calcularMontos);

		pase_dia.addEventListener('blur', mostrarDias);
		pase_dosdias.addEventListener('blur', mostrarDias);
		pase_completo.addEventListener('blur', mostrarDias);

		//VALIDAR INPUTS
		nombre.addEventListener('blur', validarCampos);
		apellido.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarEmail);


		function validarCampos() {
			if (this.value == '') {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Este campo es obligatorio";
				this.style.border = '1px solid red';
			} else {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #ccc';
			}
		}

		function validarEmail() {
			if (this.value.indexOf("@") > -1) {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #ccc';
			} else {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Formato no válido";
				this.style.border = '1px solid red';
			}
		}


		function calcularMontos(event) {
			event.preventDefault();
			//console.log("Has hecho click en calcular");
			if (regalo.value === '') {
				// alert("Debes elegir un regalo");
				error_regalo.innerHTML = "<strong><span>Debes elegir un regalo</span></strong>";
				regalo.focus();
			} else {
				var boletosDia = parseInt(pase_dia.value, 10) || 0,
					boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
					boletosCompleto = parseInt(pase_completo.value, 10) || 0,
					cantCamisas = parseInt(camisas.value, 10) || 0,
					cantEtiquetas = parseInt(etiquetas.value, 10) || 0;
				// console.log(pase_dia.value);
				// console.log(pase_dosdias.value);
				// console.log(pase_completo.value);

				// console.log("Boltos día: " + boletosDia);
				// console.log("Boltos 2 días: " + boletos2Dias);
				// console.log("Boltos Completos: " + boletosCompleto);


				var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletosCompleto * 50) +
					((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
				// console.log(totalPagar);

				var listadoProductos = [];
				if (boletosDia >= 1) {
					listadoProductos.push(boletosDia + ' Pases por día');
				}
				if (boletos2Dias >= 1) {
					listadoProductos.push(boletos2Dias + ' Pases por 2 días');
				}
				if (boletosCompleto >= 1) {
					listadoProductos.push(boletosCompleto + ' Pases Completos ');
				}
				if (cantCamisas >= 1) {
					listadoProductos.push(cantCamisas + ' Camisas ');
				}
				if (cantEtiquetas >= 1) {
					listadoProductos.push(cantEtiquetas + ' Etiquetas');
				}

				lista_box.style.display = "block";
				lista_productos.innerHTML = '';
				for (let i = 0; i < listadoProductos.length; i++) {
					lista_productos.innerHTML += "<li><span>" + listadoProductos[i] + "</span></li>"
				}


				suma.innerHTML = "<strong>$ " + totalPagar.toFixed(2) + "</strong>";


				console.log(listadoProductos);

			}
		}

		function mostrarDias() {
			let boletosDia = parseInt(pase_dia.value, 10) || 0,
				boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
				boletosCompleto = parseInt(pase_completo.value, 10) || 0;

			let diasElegidos = [];

			//aca uso push el profe pero yo preferi igualar para que los pueda ocultar
			if (boletosDia > 0) {
				diasElegidos = ["viernes"];
			}
			if (boletos2Dias > 0) {
				diasElegidos = ["viernes", "sabado"];
			}
			if (boletosCompleto > 0) {
				diasElegidos = ["viernes", "sabado", "domingo"];
			}
			console.log(diasElegidos);
			for (let i = 0; i < diasElegidos.length; i++) {
				document.getElementById(diasElegidos[i]).style.display = "block";
			}

			//Para ocultar si vuelven a 0
			if (diasElegidos.length < 3) {
				document.getElementById("domingo").style.display = "none";
			}
			if (diasElegidos.length < 2) {
				document.getElementById("sabado").style.display = "none";
			}
			if (diasElegidos.length < 1) {
				document.getElementById("viernes").style.display = "none";
			}
		}

	}) //DOM CONTENT LOADED
})();