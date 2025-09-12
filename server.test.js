// server.test.js
const server = require('./server');

describe('Pruebas de server.js', () => {
    it('debería inicializar el servidor', () => {

        expect(server).toBeDefined();
    });

});
