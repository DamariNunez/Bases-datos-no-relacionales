db.createCollection('contrato');
db.createCollection('proveedor');
db.createCollection('comprador');

db.runCommand({
  collMod: "contrato",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idContrato"],
      properties: {
        idContrato: {
          bsonType: "string",
          pattern: "^[0-9][A-Z]$",
          description: "El formato debe contener letras en mayusculas y numeros, sin espacios"
        },
        descripcion: {
          bsonType: "string",
          description: "Debe informar los detalles generales del bien o servicio alquirido"
        },
        estado: {
          bsonType: "string",
          description: "Debe informar la situación en la que se encuentra el contrato"
        },
        cantidad: {
          bsonType: "double",
          description: "El valor de cantidad debe ser un double"
        },
        moneda: {
          bsonType: "string",
          description: "Unidad representativa del precio de las cosas que permite efectuar transacciones comerciales"
        },
        fechaInicio: {
          bsonType: "string",
          description: "Fecha en la cual se empezó con el contrato del bien o servicio"
        },
        fechaFin: {
          bsonType: "string",
          description: "Fecha en la cual se terminó la compra del bien o servicio"
        },
        duracionDias: {
          bsonType: "int",
          minimum: 1,
          description: "Cantidad de días que duró el contrato"
        }
      },
    },
  },
});
        

db.runCommand({
  collMod: "comprador",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idComprador"],
      properties: {
        idComprador: {
          bsonType: "string",
          pattern: "^[0-9][A-Z]$",
          description: "El formato debe contener letras en mayusculas y numeros, sin espacios"
        },
        nombreComprador: {
          bsonType: "string",
          description: "Nombre del municipio comprador"
        },
        region: {
          bsonType: "string",
          description: "División territorial de un país"
        },
        localidad: {
          bsonType: "string",
          description: "Pueblo o ciudad"
        },
        nombrePais: {
          bsonType: "string",
          description: "País que realiza la contratación pública"
        },
        direccion: {
          bsonType: "string",
          description: "Indicación de la orientación o destino",
        }
      },
    },
  },
});


db.runCommand({
  collMod: "proveedor",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idProveedor"],
      properties: {
        idProveedor: {
          bsonType: "string",
          pattern: "^[0-9][A-Z]$",
          description: "El formato debe contener letras en mayusculas y numeros, sin espacios"
        },
        nombreProveedor: {
          bsonType: "string",
          description: "Nombre del municipio proveedor"
        }
      },
    },
  },
});