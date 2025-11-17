// TEST: Pacientes (requiere token de recepcionista o admin)

// Login con recepcionista
const loginRes = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'recep@demo.com',
    password: '123456'
  })
});

const { token } = await loginRes.json();
console.log('Token recepcionista obtenido\n');

console.log('=== TEST: PACIENTES ===\n');

// 1. Crear paciente
console.log('📍 POST /patients');
let response = await fetch('http://localhost:3000/patients', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: 'Paciente Test ' + Date.now(),
    ci: 'CI' + Date.now(),
    birthDate: '1990-05-15',
    phone: '555-1234',
    address: 'Calle Test 123'
  })
});

let data = await response.json();
console.log(`Status: ${response.status}`);
console.log('Response:', JSON.stringify(data, null, 2));

const patientId = data.patient?._id;

// 2. Listar pacientes
console.log('\n📍 GET /patients');
response = await fetch('http://localhost:3000/patients', {
  headers: { 'Authorization': `Bearer ${token}` }
});

data = await response.json();
console.log(`Status: ${response.status}`);
console.log(`Pacientes encontrados: ${data.length}`);
console.log('Pacientes:', JSON.stringify(data, null, 2));

// 3. Actualizar paciente
if (patientId) {
  console.log('\n📍 PUT /patients/:id');
  response = await fetch(`http://localhost:3000/patients/${patientId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: '555-9999'
    })
  });

  data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(data, null, 2));
}

console.log('\n✅ Pruebas de pacientes completadas');
