// TEST: Citas (requiere token)

// Login Admin para obtener usuarios
const adminLoginRes = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'adminpassword'
  })
});

const adminData = await adminLoginRes.json();
const adminToken = adminData.token;

// Login recepcionista para las citas
const loginRes = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'recep@demo.com',
    password: '123456'
  })
});

const { token } = await loginRes.json();
console.log('Token obtenido\n');

console.log('=== TEST: CITAS ===\n');

// Obtener IDs de médico y paciente
console.log('📍 Obteniendo médicos y pacientes...');
const usersRes = await fetch('http://localhost:3000/users/users', {
  headers: { 'Authorization': `Bearer ${adminToken}` }
});
const users = await usersRes.json();
const medico = Array.isArray(users) ? users.find(u => u.role === 'medico') : null;

const patientsRes = await fetch('http://localhost:3000/patients', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const patients = await patientsRes.json();
const paciente = Array.isArray(patients) ? patients[0] : null;

console.log(`Médico ID: ${medico?._id || 'No encontrado'}`);
console.log(`Paciente ID: ${paciente?._id || 'No encontrado'}`);

if (medico && paciente) {
  // 1. Crear cita
  console.log('\n📍 POST /appointments');
  let response = await fetch('http://localhost:3000/appointments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doctor: medico._id,
      patient: paciente._id,
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Mañana
      motivo: 'Consulta de prueba'
    })
  });

  let data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(data, null, 2));

  const appointmentId = data.appointment?._id;

  // 2. Listar citas
  console.log('\n📍 GET /appointments');
  response = await fetch('http://localhost:3000/appointments', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log(`Citas encontradas: ${data.length}`);
  console.log('Citas:', JSON.stringify(data, null, 2));

  // 3. Actualizar estado de cita
  if (appointmentId) {
    console.log('\n📍 PATCH /appointments/:id');
    response = await fetch(`http://localhost:3000/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        estado: 'confirmada'
      })
    });

    data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
  }

  console.log('\n✅ Pruebas de citas completadas');
} else {
  console.log('\n❌ No se encontraron médicos o pacientes para crear citas');
}
