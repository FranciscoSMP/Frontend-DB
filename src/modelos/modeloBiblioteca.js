// Importa las conexiones a las bases de datos MySQL, Oracle y SQL Server
const conexionMySQL = require('../conexiones_db/conexionMySQL');
const conexionOracle = require('../conexiones_db/conexionOracle');
const conexionSQLServer = require('../conexiones_db/conexionSQLServer');

// Función general para ejecutar consultas en MySQL
const ejecutarMySQL = async (query, params) => {
    await conexionMySQL.query(query, params);  // Ejecuta la consulta en MySQL con los parámetros provistos
};

// Función general para ejecutar consultas en SQL Server
const ejecutarSQLServer = async (query) => {
    const conSQL = await conexionSQLServer.poolPromise;  // Obtiene la conexión al pool de SQL Server
    await conSQL.request().query(query);  // Ejecuta la consulta en SQL Server
};

// Función general para ejecutar consultas en Oracle
const ejecutarOracle = async (query, params) => {
    const conOracle = await conexionOracle.conectar();  // Conecta a Oracle
    await conOracle.execute(query, params, { autoCommit: true });  // Ejecuta la consulta con commit automático
    await conOracle.close();  // Cierra la conexión a Oracle
};

// Función general para ejecutar las consultas en las tres bases de datos simultáneamente
const guardarEnBasesDatos = async (queryMySQL, querySQLServer, queryOracle, paramsMySQL, paramsOracle) => {
    await Promise.all([
        ejecutarMySQL(queryMySQL, paramsMySQL),  // Ejecuta la consulta en MySQL
        ejecutarSQLServer(querySQLServer),  // Ejecuta la consulta en SQL Server
        ejecutarOracle(queryOracle, paramsOracle)  // Ejecuta la consulta en Oracle
    ]);
};

// Función específica para guardar autores en las tres bases de datos
exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    // Consulta para MySQL y SQL Server
    const query = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) 
                   VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;
    
    // Consulta para Oracle
    const queryOracle = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) 
                         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Id_Pais)`;
    
    // Parámetros para MySQL y SQL Server
    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais];
    
    // Parámetros para Oracle (usando nombre de parámetros en lugar de posición)
    const paramsOracle = { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais };

    // Guarda los datos en las tres bases de datos
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

// Función específica para guardar categorías en las tres bases de datos
exports.guardarCategoria = async ({ Nombre }) => {
    const query = `INSERT INTO categoria (Nombre) VALUES ('${Nombre}')`;  // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO categoria (Nombre) VALUES (:Nombre)`;  // Consulta para Oracle
    const params = [Nombre];  // Parámetros para MySQL y SQL Server
    const paramsOracle = { Nombre };  // Parámetros para Oracle

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);  // Guarda en las tres bases de datos
};

// Sigue el mismo patrón para otras entidades...
// Función para guardar departamentos
exports.guardarDepartamento = async ({ Nombre, Id_Pais }) => {
    const query = `INSERT INTO departamento (Nombre, Id_Pais) VALUES ('${Nombre}', '${Id_Pais}')`;  // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO departamento (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`;  // Consulta para Oracle
    const params = [Nombre, Id_Pais];  // Parámetros para MySQL y SQL Server
    const paramsOracle = { Nombre, Id_Pais };  // Parámetros para Oracle

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);  // Guarda en las tres bases de datos
};

// Función para guardar detalles de préstamos
exports.guardarDetallePrestamo = async ({ Id_Prestamo, Id_Libro }) => {
    const query = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (${Id_Prestamo}, ${Id_Libro})`;  // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (:Id_Prestamo, :Id_Libro)`;  // Consulta para Oracle
    const params = [Id_Prestamo, Id_Libro];  // Parámetros para MySQL y SQL Server
    const paramsOracle = { Id_Prestamo, Id_Libro };  // Parámetros para Oracle

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);  // Guarda en las tres bases de datos
};

// Función para guardar editoriales
exports.guardarEditorial = async ({ Nombre, Id_Pais }) => {
    const query = `INSERT INTO editorial (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;  // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO editorial (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`;  // Consulta para Oracle
    const params = [Nombre, Id_Pais];  // Parámetros para MySQL y SQL Server
    const paramsOracle = { Nombre, Id_Pais };  // Parámetros para Oracle

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);  // Guarda en las tres bases de datos
};

// Función para guardar empleados
exports.guardarEmpleado = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion }) => {

    const query = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
    VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Puesto}', '${Fecha_Contratacion}')`; // Consulta para MySQL y SQL Server

    const queryOracle = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
    VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Puesto, TO_DATE(:Fecha_Contratacion, 'YYYY-MM-DD'))`; // Consulta para Oracle

    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos

};

// Función para guardar libros
exports.guardarLibro = async ({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial }) => {

    const query = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
    VALUES ('${Titulo}', '${Fecha_Publicacion}', '${ISBN}', ${Id_Editorial})`; // Consulta para MySQL y SQL Server

    const queryOracle = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
    VALUES (:Titulo, TO_DATE(:Fecha_Publicacion, 'YYYY-MM-DD'), :ISBN, :Id_Editorial)`; // Consulta para Oracle

    const params = [Titulo, Fecha_Publicacion, ISBN, Id_Editorial]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Titulo, Fecha_Publicacion, ISBN, Id_Editorial}; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos

};

// Función para guardar relacion libro y autor
exports.guardarLibroAutor = async ({ Id_Libro, Id_Autor }) => {

    const query = `INSERT INTO libro_autor (Id_Libro, Id_Autor) VALUES (${Id_Libro}, ${Id_Autor})`; // Consulta para MySQL y SQL Server

    const queryOracle = `INSERT INTO libro_autor (Id_Libro, Id_Autor) VALUES (:Id_Libro, :Id_Autor)`; // Consulta para Oracle

    const params = [Id_Libro, Id_Autor]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Id_Libro, Id_Autor }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos

};

// Función para guardar relacion libro y categoría
exports.guardarLibroCategoria = async ({ Id_Libro, Id_Categoria }) => {

    const query = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
    VALUES (${Id_Libro}, ${Id_Categoria})`; // Consulta para MySQL y SQL Server

    const queryOracle = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
    VALUES (:Id_Libro, :Id_Categoria)`; // Consulta para Oracle

    const params = [Id_Libro, Id_Categoria]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Id_Libro, Id_Categoria }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos
};

// Función para guardar miembros
exports.guardarMiembro = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio }) => {

    const query = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
    VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Telefono}', '${Fecha_Registro}', ${Id_Municipio})`; // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
    VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Telefono, TO_DATE(:Fecha_Registro, 'YYYY-MM-DD'), :Id_Municipio)`; // Consulta para Oracle
    
    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio];  // Parámetros para MySQL y SQL Server
    const paramsOracle = { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos
};

// Función para guardar municipios
exports.guardarMunicipio = async ({ Nombre, Id_Departamento }) => {

    const query = `INSERT INTO municipio (Nombre, Id_Departamento) VALUES ('${Nombre}', ${Id_Departamento})`; // Consulta para MySQL y SQL Server

    const queryOracle = `INSERT INTO municipio (Nombre, Id_Departamento) VALUES (:Nombre, :Id_Departamento)`; // Consulta para Oracle

    const params = [Nombre, Id_Departamento]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Nombre, Id_Departamento }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos
};

// Función para guardar paises
exports.guardarPais = async ({ Nombre }) => {
    const query = `INSERT INTO pais (Nombre) VALUES ('${Nombre}')`; // Consulta para MySQL y SQL Server
    
    const queryOracle = `INSERT INTO pais (Nombre) VALUES (:Nombre)`; // Consulta para Oracle

    
    const params = [Nombre]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Nombre }; // Parámetros para Oracle
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos
};

// Función para guardar prestamos
exports.guardarPrestamo = async ({ Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion }) => {
   
    const query = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
    VALUES (${Id_Miembro}, ${Id_Empleado}, '${Fecha_Prestamo}', '${Fecha_Devolucion}')`; // Consulta para MySQL y SQL Server
    const queryOracle = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
    VALUES (:Id_Miembro, :Id_Empleado, TO_DATE(:Fecha_Prestamo, 'YYYY-MM-DD'), TO_DATE(:Fecha_Devolucion, 'YYYY-MM-DD'))`; // Consulta para Oracle

    
    const params = [Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion]; // Parámetros para MySQL y SQL Server
    const paramsOracle = { Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion }; // Parámetros para Oracle
         
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle); // Guarda en las tres bases de datos
};