# PRUEBAS DE AUTOMATIZACION

Repositorio con la solucion del entregable de **pruebas de automatizacion**.

En este trabajamos utilizamos el [WebDriver de Selenium](https://www.selenium.dev/) y con lenguaje de JavaScript Node JS.

Realizado por:
- Juan Camilo Jimenez Guerra - 1.035.872.782
- Santiago Hernandez Mejia - 1.020.455.334

## Instalacion del proyecto

1. Despues de clonar el repositoria debes instalar las dependencias de Node JS
```
npm install
```
2. La gran mayoría de controladores necesitan de un ejecutable extra para que Selenium pueda comunicarse con el navegador. Sigue los siguentes pasos para agregar el ejecutable de chrome al sistema.

Crea un directorio para almacenar los ejecutables en el, como **C:\WebDriver\bin** (el ejecutable esta en la carpeta WebDriver)

```
C:\webDriver
```

Añade el directorio al PATH del sistema.

Ejecute los siguientes comandos para ejecutar los scripts con mocha para el manejo de los test.
```
npm install mocha
npm install --save-dev mocha
npm install mocha -g
```

Luego ejecuta el siguiente comando para correr todas las pruebas
```
npm run test
```


