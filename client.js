const soap = require('soap');
const WSDL_URL = 'http://localhost:8000/soap?wsdl';
async function main() {
try {
// Créer le client SOAP
const client = await soap.createClientAsync(WSDL_URL);
console.log('✅ Client SOAP connecté !');
console.log('🚀 Opérations disponibles:',
Object.keys(client.UtilityService.ServicePort));
console.log('\n--- Tests des opérations ---\n');
// Test Addition
const addResult = await client.AddAsync({ a: 10, b: 5 });
console.log(`Addition: 10 + 5 = ${addResult[0].result}`);
// Test Modulo
const modResult = await client.ModuloAsync({ a: 10, b: 3 });
console.log(`Modulo: 10 % 3 = ${modResult[0].result}`);
// Test Power
const powResult = await client.PowerAsync({ a: 2, b: 3 });
console.log(`Power: 2^3 = ${powResult[0].result}`);
// Test Soustraction
const subResult = await client.SubtractAsync({ a: 10, b: 3 });
console.log(`Soustraction: 10 - 3 = ${subResult[0].result}`);
//test temp
const tempResult = await client.CelsiusToFahrenheitAsync({ celsius: 25 });
console.log(`25°C = ${tempResult[0].result}°F`);
// Test FahrenheitToCelsius
const fahToCelResult = await client.FahrenheitToCelsiusAsync({ fahrenheit: 77 });
console.log(`77°F = ${fahToCelResult[0].result}°C`);
// Test CelsiusToKelvin
const celToKelResult = await client.CelsiusToKelvinAsync({ celsius: 25 });
console.log(`25°C = ${celToKelResult[0].result}K`);
// Test Multiplication
const mulResult = await client.MultiplyAsync({ a: 4, b: 7 });
console.log(`Multiplication: 4 × 7 = ${mulResult[0].result}`);
// Test Division
const divResult = await client.DivideAsync({ a: 20, b: 4 });
console.log(`Division: 20 ÷ 4 = ${divResult[0].result}`);
// Test Division par zéro (erreur)
console.log('\n--- Test erreur: Division par zéro ---');
try {
await client.DivideAsync({ a: 10, b: 0 });
} catch (error) {
console.log('❌ Erreur capturée:',
error.root?.Envelope?.Body?.Fault?.Reason?.Text || error.message);
}
} catch (error) {
console.error('Erreur de connexion:', error.message);
}
}
main();