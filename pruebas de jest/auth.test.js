import axios from 'axios';
import { login, register } from './auth';  // Asegúrate de importar correctamente los módulos

jest.mock('axios');  // Mock de Axios

describe('Pruebas de autenticación', () => {
    beforeEach(() => {
        jest.clearAllMocks();  // Limpia los mocks antes de cada prueba
    });

    test('Login exitoso almacena el token en localStorage', async () => {
        const mockResponse = { data: { token: 'mocked_token' } };
        axios.post.mockResolvedValue(mockResponse);

        const result = await login('test@example.com', 'password123');

        expect(result).toEqual(mockResponse.data);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mocked_token');
    });

    test('Login falla y lanza un error', async () => {
        axios.post.mockRejectedValue(new Error('Correo electrónico o contraseña incorrectos'));

        await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow('Correo electrónico o contraseña incorrectos');
    });

    test('Registro exitoso devuelve los datos de usuario', async () => {
        const mockResponse = { data: { message: 'Usuario registrado' } };
        axios.post.mockResolvedValue(mockResponse);

        const result = await register('John Doe', 'john@example.com', 'securepassword');

        expect(result).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/register', {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword',
        });
    });

    test('Registro falla y lanza un error', async () => {
        axios.post.mockRejectedValue(new Error('Error en el registro'));

        await expect(register('John Doe', 'john@example.com', 'securepassword')).rejects.toThrow('Error en el registro');
    });
});
