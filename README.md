# Instrucciones ejecución pruebas

Este repositorio contiene el código y la documentación relacionados con la entrega de la semana 5 y semana 6. En la wiki se encuentra gran parte de la documentación requerida.

## Integrantes
- Thais Tamaio: [t.tamaio@uniandes.edu.co](mailto:t.tamaio@uniandes.edu.co)
- Juan Felipe González: [jf.gonzalezg12@uniandes.edu.co](mailto:jf.gonzalezg12@uniandes.edu.co)
- Mateo Díaz: [ma.diazf1@uniandes.edu.co](mailto:ma.diazf1@uniandes.edu.co)
- Jesús Jiménez: [j.jimenez21@uniandes.edu.co](mailto:j.jimenez21@uniandes.edu.co)

## Instalación

### Kraken

#### Prerrequisitos

1. Ubuntu 22.04 LTS (Idealmente usar Pop!_OS 22.04 LTS x86_64)
2. NVM
3. Node.js v.16.14.2 (usar NVM si se tienen versiones adicionales)
4. Android SDK
5. Appium
6. Java JDK (Idealmente usar OpenJDK 17.0.8.1).

#### Instalación y Configuración

1. Se crea un proyecto Node.js:

```
npm init -y
```

2. Se instala Kraken de forma global:

```
npm install kraken-node -g
```

3. Se instala Kraken de forma local, a veces puede ser necesario clonar el repo de GitHub si se presentan errores:

```
git clone https://github.com/TheSoftwareDesignLab/Kraken.git # OPCIONAL: solo si el comando abajo falla!!
npm install kraken-node --save
```

4. Se genera la estructura de features de Cucumber y se instalan dependencias:

```
$ npx kraken-node gen
$ npm install
$ npm install chai
```

Para mayor infornación sobre la instalación de Kraken, por favor remitirse al [repositorio oficial de Kraken](https://github.com/TheSoftwareDesignLab/Kraken). 

5. Instalar Android Studio según los [lineamientos de Google](https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio#0), asegurando que se instalan también:
  - Android SDK Platform-Tools
  - Android SDK Build-Tools

6. Instalar OpenJDK con el siguiente comando:

```
sudo apt-get install openjdk-17-jre
```

7. Instalar Appium

```
npm install -g appium
```

8. Se debe añadir las siguientes líneas al archivo de configuración de Bash para guardar las nuevas variables del entorno:

```
# Adding ANDROID_HOME path
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/build-tools/34.0.0

# Adding JAVA path
export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
export PATH=$PATH:$JAVA_HOME/bin
```

Para acceder al archivo de configuración de Bash se recomienda correr el siguiente comando

```
nano ~/.bashrc
```

8. Correr el siguiente comando para verificar la correcta instalación de Kraken y sus dependencias:

```
kraken-node doctor
```

9. Ahora se debe instalar el CLI de Ghost, lo cual requiere Node.js v.18.18.1 y su inicialización. Todo esto se logra por medio de los siguientes comandos:

```
nvm use 18.18.1
npm init
```
    
10. Ahora se requiere instalar Ghost, la aplicación bajo pruebas. Para esto se recomienda instalarla en la misma carpeta donde la carpeta de Kraken se encuentra ubicada, no dentro de la carpeta de Kraken. 

```
npm install ghost-cli@latest
```

11. A continuación se comprueba la versión del CLI de Ghost

```
./node_modules/ghost-cli/bin/ghost -v
```

12. A través de la terminal, se crea la carpeta donde Ghost correrá y se ubica la terminal en esta carpeta:
    
```
mkdir ghost
cd ghost
```

13. En esta carpeta se instala Ghost de manera local:

```
./node_modules/ghost-cli/bin/ghost install local
```

14. Se abre Ghost en Google Chrome a través de la url [http://localhost:2368/ghost](http://localhost:2368/ghost).
15. En caso de querer detener la instancia de Ghost recién instalada se puede correr el siguiente comando en la terminal:

```
./node_modules/ghost-cli/bin/ghost stop
```
  
16.  Para reiniciar la instancia de Ghost se pueden utilizar los siguientes comandos:

```
./node_modules/ghost-cli/bin/ghost start
./node_modules/ghost-cli/bin/ghost start --no-setup-linux-user # Solo si el comando anterior falla
```

17. No olvidar cambiar la versión de Node.js de vuelta a 16.14.2 cuando se ejecuten los escenarios de prueba:

```
nvm use 16.14.2
```
#### Ejecución de pruebas con Kraken

En la carpeta Kraken/features/escenarios se encuentran los escenarios en formato .feature a ejecutar, la manera apropiada de correrlos es la siguiente:

1. Mover el `escenario.feature` a probar un nivel arriba en la carpeta `Kraken/features`.
2. Cerciorarse de que únicamente haya un archivo `.feature` en dicha carpeta. Si hay más de un archivo, es indispensable mover a la carpeta escenarios todos aquellos que no se deseen ejecutar.
3. Ejecutar el siguiente comando en la terminal de Bash:

```
npx kraken-node run
```
4. Algunas pruebas requieren la carga manual de una imagen desde el computador local, se recomienda subir una imagen en el transcurso de 5 segundos o se recomienda cancelar la acción. Esto con el fin de garantizar el correcto funcionamiento de las pruebas.

### Cypress

Los tests se encuentran dentro de CypressTesting.

1. Abrir una terminar en la carpeta Cypress e instalar las dependencias por medio del comando:

```
npm install
```

2. En caso de no tener Ghost instalado de forma global en la máquina desde la cual se ejecutarán las pruebas, realizar el paso 2 del siguiente tutorial:

[Tutorial instalación global Ghost](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html#1)

3. Posteriormente, seguir los pasos de este video tutorial:

[Tutorial ejecución pruebas Cypress](https://youtu.be/ar7QeW1J2Cs)


### BackstopJS

1. Instalar las dependencias
   
Para hacer uso de las herramientas de Backstop, debe descargar la CLI. Abra una terminal y ejecute el siguiente comando:

```
npm install -g backstopjs
```

Para ejecutar las pruebas navegue en la terminal a la carpeta donde se encuente el archivo backstop.json y para ejecutar sus test ejecute el comando:

```
backstop test
```

[Video de configuración del ambiente e incidencias](https://uniandes-my.sharepoint.com/:v:/g/personal/jf_gonzalezg12_uniandes_edu_co/EYCAsnNW1DdIk7UAvjF2UokBGKh40MXGOkAOjHjR4ohIFw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0RpcmVjdCJ9fQ&e=K3oKdI)

### ResembleJS

En primer lugar, es importante aclarar que para ejecutar el VRT con resemble, se debe hacer uso de la versión 18 de node.

1. Abrir la carpeta **resembleGhost** en vscode:

```
EntregaSemana5/CypressTesting/resembleGhosts
```

2. Instalar las dependencias: Por medio del siguiente comando:

```
npm install
```
3. Ejecutar los tests de Cypress (las isntruccioens se encuentran arriba).

4. Pasar los screenshots de la carpeta 

```
EntregaSemana5/CypressTesting/Cypress/cypress/screenshots
```

de acuerdo con el nombre del screenshot:

- Si el screenshot empieza por v3 guardarlo en la carpeta:

```
EntregaSemana5/CypressTesting/resembleGhost/v3
```

- Si el screenshot empieza por v5 guardarlo en la carpeta:

```
EntregaSemana5/CypressTesting/resembleGhost/v5
```

5. Ejecutar el programa por medio de:

```
node index.js
```

Los resultados, incluyendo el html con el reporte se encuentran en:

```
EntregaSemana5/CypressTesting/resembleGhost/results
```
