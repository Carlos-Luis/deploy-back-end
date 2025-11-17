// TEST: Health Check (sin autenticación)

console.log('=== TEST: HEALTH CHECK ===\n');

console.log('📍 GET /health');
const response = await fetch('http://localhost:3000/health');
const data = await response.json();

console.log(`Status: ${response.status}`);
console.log('Response:', JSON.stringify(data, null, 2));

if (response.status === 200 && data.ok) {
  console.log('\n✅ Servidor funcionando correctamente');
} else {
  console.log('\n❌ Error en el servidor');
}
