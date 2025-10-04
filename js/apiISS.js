 // Función para actualizar posición
    async function updateISS() {
      try {
        const res = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await res.json();

      } catch (err) {
        console.error('Error al obtener la posición de la ISS:', err);
      }
    }

    // Actualizar cada 5 segundos
    setInterval(updateISS, 5000);
    updateISS(); // llamada inicial