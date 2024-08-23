const conexionMySQL = require('../conexiones_db/conexionMySQL');
const conexionOracle = require('../conexiones_db/conexionOracle');
const conexionSQLServer = require('../conexiones_db/conexionSQLServer');

// Función general para guardar en MySQL
const ejecutarMySQL = async (query, params) => {
    await conexionMySQL.query(query, params);
};

// Función general para guardar en SQL Server
const ejecutarSQLServer = async (query) => {
    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);
};

// Función general para guardar en Oracle
const ejecutarOracle = async (query, params) => {
    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(query, params, { autoCommit: true });
    await conOracle.close();
};

// Función general para guardar en las tres bases de datos
const guardarEnBasesDatos = async (queryMySQL, querySQLServer, queryOracle, paramsMySQL, paramsOracle) => {
    await Promise.all([
        ejecutarMySQL(queryMySQL, paramsMySQL),
        ejecutarSQLServer(querySQLServer),
        ejecutarOracle(queryOracle, paramsOracle)
    ]);
};

// Funciones específicas para cada entidad
exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    const query = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;
    const queryOracle = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) 
                         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Id_Pais)`;
    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais];
    const paramsOracle = {
        Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais
    };

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarCategoria = async ({ Nombre }) => {
    const query = `INSERT INTO categoria (Nombre) VALUES ('${Nombre}')`;
    const queryOracle = `INSERT INTO categoria (Nombre) VALUES (:Nombre)`;
    const params = [Nombre];
    const paramsOracle = { Nombre };

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

// Agrega más funciones para otras entidades de manera similar

exports.guardarDepartamento = async ({ Nombre, Id_Pais }) => {
    const query = `INSERT INTO departamento (Nombre, Id_Pais) VALUES ('${Nombre}', '${Id_Pais}')`;
    const queryOracle = `INSERT INTO departamento (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`;
    const params = [Nombre, Id_Pais];
    const paramsOracle = { Nombre, Id_Pais };

    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

// Sigue con el mismo patrón para las demás entidades...

exports.guardarDetallePrestamo = async ({ Id_Prestamo, Id_Libro }) => {
    
    const query = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (${Id_Prestamo}, ${Id_Libro})`;
    const queryOracle = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (:Id_Prestamo, :Id_Libro)`;
    const params = [Id_Prestamo, Id_Libro];
    const paramsOracle = { Id_Prestamo, Id_Libro };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarEditorial = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO editorial (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;
    const queryOracle = `INSERT INTO editorial (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`;
    const params = [Nombre, Id_Pais];
    const paramsOracle = { Nombre, Id_Pais };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarEmpleado = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion }) => {

    const query = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
    VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Puesto}', '${Fecha_Contratacion}')`;

    const queryOracle = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
    VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Puesto, TO_DATE(:Fecha_Contratacion, 'YYYY-MM-DD'))`;

    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion];
    const paramsOracle = { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);

};

exports.guardarLibro = async ({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial }) => {

    const query = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
    VALUES ('${Titulo}', '${Fecha_Publicacion}', '${ISBN}', ${Id_Editorial})`;

    const queryOracle = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
    VALUES (:Titulo, TO_DATE(:Fecha_Publicacion, 'YYYY-MM-DD'), :ISBN, :Id_Editorial)`;

    const params = [Titulo, Fecha_Publicacion, ISBN, Id_Editorial];
    const paramsOracle = { Titulo, Fecha_Publicacion, ISBN, Id_Editorial};
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarLibroAutor = async ({ Id_Libro, Id_Autor }) => {

    const query = `INSERT INTO libro_autor (Id_Libro, Id_Autor) VALUES (${Id_Libro}, ${Id_Autor})`;

    const queryOracle = `INSERT INTO libro_autor (Id_Libro, Id_Autor) VALUES (:Id_Libro, :Id_Autor)`;

    const params = [Id_Libro, Id_Autor];
    const paramsOracle = { Id_Libro, Id_Autor };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);

};

exports.guardarLibroCategoria = async ({ Id_Libro, Id_Categoria }) => {

    const query = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
    VALUES (${Id_Libro}, ${Id_Categoria})`;

    const queryOracle = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
    VALUES (:Id_Libro, :Id_Categoria)`;

    const params = [Id_Libro, Id_Categoria];
    const paramsOracle = { Id_Libro, Id_Categoria };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarMiembro = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio }) => {

    const query = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
    VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Telefono}', '${Fecha_Registro}', ${Id_Municipio})`;
    const queryOracle = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
    VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Telefono, TO_DATE(:Fecha_Registro, 'YYYY-MM-DD'), :Id_Municipio)`;
    
    const params = [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio];
    const paramsOracle = { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarMunicipio = async ({ Nombre, Id_Departamento }) => {

    const query = `INSERT INTO municipio (Nombre, Id_Departamento) VALUES ('${Nombre}', ${Id_Departamento})`;

    const queryOracle = `INSERT INTO municipio (Nombre, Id_Departamento) VALUES (:Nombre, :Id_Departamento)`;

    const params = [Nombre, Id_Departamento];
    const paramsOracle = { Nombre, Id_Departamento };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarPais = async ({ Nombre }) => {
    const query = `INSERT INTO pais (Nombre) VALUES ('${Nombre}')`;
    
    const queryOracle = `INSERT INTO pais (Nombre) VALUES (:Nombre)`;
    
    const params = [Nombre];
    const paramsOracle = { Nombre };
    
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};

exports.guardarPrestamo = async ({ Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion }) => {
   
    const query = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
    VALUES (${Id_Miembro}, ${Id_Empleado}, '${Fecha_Prestamo}', '${Fecha_Devolucion}')`;
    const queryOracle = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
    VALUES (:Id_Miembro, :Id_Empleado, TO_DATE(:Fecha_Prestamo, 'YYYY-MM-DD'), TO_DATE(:Fecha_Devolucion, 'YYYY-MM-DD'))`;
    
    const params = [Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion];
    const paramsOracle = { Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion };
         
    await guardarEnBasesDatos(query, query, queryOracle, params, paramsOracle);
};