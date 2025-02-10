
<template>
	<div class="bg-gray-100 min-h-screen">
	  <!-- Título perfil arriba -->
	  <h1 class="text-center text-2xl font-bold text-gray-700 mt-6">Perfil</h1>
	  
	  <div class="flex justify-center items-center mt-6">
		<div class="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
		  <div class="div1">
			<img src="/src/assets/perfil.png" alt="Perfil">
		  </div>
		  <h2 class="text-xl font-semibold mt-4">Juan Pérez</h2>
		  <p class="text-gray-500 text-sm">10 años</p>
		  <div class="mt-4">
			<p class="text-gray-500 text-sm">📧 juanperez@email.com</p>
			<p class="text-gray-500 text-sm">📍 Santo Domingo, RD</p>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <style scoped>
  div{
	margin-left: 10px;
  }
  .div1 {
	display: flex;
	justify-content: center; /* Centrar horizontalmente */
	align-items: center; /* Centrar verticalmente */
	margin-bottom: 10px; /* Espacio entre la imagen y el texto */
  }
  
  .div1 img {
	width: 100px; /* Tamaño de la imagen */
	height: 100px;
	border-radius: 50%; /* Imagen redonda */
	border: 4px solid #3498db; /* Borde azul */
	object-fit: cover; /* Mantiene la proporción sin deformar */
  }
  </style>
  