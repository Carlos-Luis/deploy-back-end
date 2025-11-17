// TEST: Autenticación (Login)

console.log('=== TEST: AUTENTICACIÓN ===\n');

// Login Admin
console.log('📍 POST /auth/login (Admin)');
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'adminpassword'
  })
});

const data = await response.json();
console.log(`Status: ${response.status}`);
console.log('Response:', JSON.stringify(data, null, 2));

if (data.token) {
  console.log('\n✅ Login exitoso');
  console.log('Token:', data.token);
} else {
  console.log('\n❌ Error en login');
}
