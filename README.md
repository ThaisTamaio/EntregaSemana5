# Entrega Semena 5

Este repositorio contiene el código y la documentación relacionados con la entrega de la semana 5. En la wiki se encuentra gran parte de la documentación requerida.

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

4. Se genera la estructura de features de Cucumber:

```
npx kraken-node gen
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
#### Ejecución de pruebas

En la carpeta Kraken/features/escenarios se encuentran los escenarios en formato .feature a ejecutar, la manera apropiada de correrlos es la siguiente:

1. Mover el escenario.feature a probar un nivel arriba a la carpeta Kraken/features.
2. Cerciorarse de que únicamente haya un archivo .feature en dicha carpeta. Si hay más de un archivo, es indispensable mover a la carpeta escenarios todos aquellos que no se deseen ejecutar.
3. Ejecutar el siguiente comando en la terminal de Bash:

```
npx kraken-node run
```

### Cypress
1) Primer paso pendiente
