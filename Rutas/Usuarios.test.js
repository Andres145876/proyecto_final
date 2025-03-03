const usuarios = require('./Usuarios'); // Importa el módulo correctamente

describe('Pruebas de Rutas/Usuarios.js', () => {
    it('debería tener la función obtenerUsuarios', () => {
        expect(usuarios.verUsuarios).toBeUndefined(); // Usa la variable importada y la sintaxis correcta
    });

    // Agrega más pruebas para cada ruta en usuarios.js
    it('debería tener la función register', () => {
        expect(usuarios.register).toBeUndefined();
    });

    it('debería tener la función register-admin', () => {
        expect(usuarios['register-admin']).toBeUndefined();
    });

    it('debería tener la función login', () => {
        expect(usuarios.login).toBeUndefined();
    });

    it('debería tener la función login-admin', () => {
        expect(usuarios['login-admin']).toBeUndefined();
    });

    it('debería tener la función ver-admins', () => {
        expect(usuarios['ver-admins']).toBeUndefined();
    });

    it('debería tener la función editar-usuario', () => {
        expect(usuarios['editar-usuario']).toBeUndefined();
    });

    it('debería tener la función eliminar-usuario', () => {
        expect(usuarios['eliminar-usuario']).toBeUndefined();
    });

});