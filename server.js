const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;
// Implémentation des opérations du service
const Services = {
UtilityService: {
ServicePort: {
// Calculator Operations
Add: function(args) {
const result = parseFloat(args.a) + parseFloat(args.b);
console.log(`Add: ${args.a} + ${args.b} = ${result}`);
return { result: result };
},
Subtract: function(args) {
const result = parseFloat(args.a) - parseFloat(args.b);
console.log(`Subtract: ${args.a} - ${args.b} = ${result}`);
return { result: result };
},
Multiply: function(args) {
const result = parseFloat(args.a) * parseFloat(args.b);
console.log(`Multiply: ${args.a} * ${args.b} = ${result}`);
return { result: result };
},
Divide: function(args) {
if (parseFloat(args.b) === 0) {
throw {
Fault: {
Code: { Value: 'DIVIDE_BY_ZERO' },
Reason: { Text: 'Division par zéro impossible' }
}
};
}
const result = parseFloat(args.a) / parseFloat(args.b);
console.log(`Divide: ${args.a} / ${args.b} = ${result}`);
return { result: result };
},
Modulo: function(args) {
const result = parseFloat(args.a) % parseFloat(args.b);
console.log(`Modulo: ${args.a} % ${args.b} = ${result}`);
return { result: result };
},
Power: function(args) {
const a = parseFloat(args.a);
const b = parseFloat(args.b);
if (isNaN(a) || isNaN(b)) {
throw {
Fault: {
Code: { Value: 'INVALID_INPUT' },
Reason: { Text: 'Invalid numbers' }
}
};
}
const result = Math.pow(a, b);
console.log(`Power: ${a}^${b} = ${result}`);
return { result: result };
},
// Temperature Operations
CelsiusToFahrenheit: function(args) {
const c = parseFloat(args.celsius);
const result = (c * 9/5) + 32;
console.log(`CelsiusToFahrenheit: ${c}°C = ${result}°F`);
return { result: result };
},
FahrenheitToCelsius: function(args) {
const f = parseFloat(args.fahrenheit);
const result = (f - 32) * 5/9;
console.log(`FahrenheitToCelsius: ${f}°F = ${result}°C`);
return { result: result };
},
CelsiusToKelvin: function(args) {
const c = parseFloat(args.celsius);
const result = c + 273.15;
console.log(`CelsiusToKelvin: ${c}°C = ${result}K`);
return { result: result };
}
}
}
};
// Lire le fichier WSDL
const wsdlPath = path.join(__dirname, 'calculator.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');
// Démarrer le serveur
app.listen(PORT, function() {
console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
// Créer le service SOAP
const server = soap.listen(app, '/soap', Services, wsdl);
console.log(`🚀 WSDL disponible sur http://localhost:${PORT}/soap?wsdl`);
// Log des requêtes entrantes (debug)
server.log = function(type, data) {
console.log(`[${type}]`, data);
};
});