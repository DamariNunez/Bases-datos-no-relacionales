# Crear una carpeta temporal para poder extrar el el json que esta dentro de un zip
with tempfile.TemporaryDirectory() as d:
        ruta = d+'viu'
        od.download("https://datosabiertos.compraspublicas.gob.ec/PLATAFORMA/download?type=json&year=2021&month=0&method=Repuestos%20o%20Accesorios",ruta)
# Descargar datos
shutil.unpack_archive(ruta+'/releases_2021_repuestos_o_accesorios.zip')

# Leer archivo
with open('releases_2021_repuestos_o_accesorios.json', 'r', encoding='utf8') as fichero: 
        # load devuelve los datos almacenados en el fichero JSON
        lector = json.load(fichero)
        for linea in lector:
            # Reemplazar el nombre de los campos (realmente los copia)
            releases = linea['releases']
            
            comprador = {
                "idComprador": releases[0]['buyer']['id'],
                "nombreComprador": releases[0]['buyer']['name'],
                "region": releases[0]['parties'][0]['address']['region'],
                "localidad": releases[0]['parties'][0]['address']['locality'],
                "nombrePais": releases[0]['parties'][0]['address']['countryName'],
                "direccion": releases[0]['parties'][0]['address']['streetAddress']
            }
            
            proveedor = {
                "idProveedor": releases[0]['awards'][0]['suppliers'][0]['id'] if 'awards' in releases[0] else None,
                "nombreProveedor": releases[0]['awards'][0]['suppliers'][0]['name'] if 'awards' in releases[0] else None
            }  
            
            # Insertar coleccion
            comprador_collection = base_datos.comprador.insert_one(comprador)
            proveedor_collection = base_datos.proveedor.insert_one(proveedor)
            
            contrato = {
                "idContrato": releases[0]['id'],
                "descripcion": releases[0]['tender']['description'],
                "estado": releases[0]['tender']['status'],
                "cantidad": releases[0]['tender']['value']['amount'],
                "moneda": releases[0]['tender']['value']['currency'],
                "fechaFin": releases[0]['contracts'][0]['period']['endDate'] if 'contracts' in releases[0] else None,
                "fechaInicio": releases[0]['contracts'][0]['period']['startDate'] if 'contracts' in releases[0] else None,
                "duracionDias": releases[0]['contracts'][0]['period']['durationInDays'] if 'contracts' in releases[0] else None,
                "idComprador": comprador_collection.inserted_id,
                "idProveedor": proveedor_collection.inserted_id
            }
            
            # Insertar coleccion
            contrato_collection = base_datos.contrato.insert_one(contrato)

