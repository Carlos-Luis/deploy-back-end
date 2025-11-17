// TEST: Usuarios (requiere token de admin)

// Primero hacer login
const loginRes = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'adminpassword'
  })
});

const { token } = await loginRes.json();
console.log('Token obtenido:', token.substring(0, 20) + '...\n');

console.log('=== TEST: USUARIOS ===\n');

// 1. Listar usuarios
console.log('📍 GET /users/users');
let response = await fetch('http://localhost:3000/users/users', {
  headers: { 'Authorization': `Bearer ${token}` }
});

let data = await response.json();
console.log(`Status: ${response.status}`);
console.log(`Usuarios encontrados: ${data.length}`);
console.log('Usuarios:', JSON.stringify(data, null, 2));

// 2. Crear usuario
console.log('\n📍 POST /users');
response = await fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Dr. Test ' + Date.now(),
    email: `test${Date.now()}@example.com`,
    password: '123456',
    role: 'medico'
  })
});

data = await response.json();
console.log(`Status: ${response.status}`);
console.log('Response:', JSON.stringify(data, null, 2));

if (response.status === 201) {
  console.log('\n✅ Usuario creado exitosamente');
} else {
  console.log('\n❌ Error al crear usuario');
}
