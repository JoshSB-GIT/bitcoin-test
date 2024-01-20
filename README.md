# Bitcoin App with Ionic

Este proyecto es una pequeña aplicación móvil desarrollada con Ionic que proporciona información sobre el precio del Bitcoin (BTC) en dólares (USD) durante las últimas dos semanas, incluido el día actual. La aplicación sigue los siguientes requisitos:

## Instalación

Para ejecutar la aplicación en tu entorno local, sigue estos pasos:

1. Clona este repositorio: `git clone https://github.com/JoshSB-GIT/bitcoin-test.git`
2. Navega al directorio del proyecto: `cd bitcoin-test`
3. Instala las dependencias: `npm install`
4. En la ubicación `src/app/services/` crea una constante `cryptocompare` tal que:
```javascript
export const cryptocompare = {
    production: false,
    apiUrl: 'https://example.com/',
};
```
5. Cabia al url por la de la API pública de [cryptocompare](https://min-api.cryptocompare.com/)
6. Ejecuta la aplicación: `ionic serve`

## Ejecución escritorio:

Asegurate de tener el archivo `index.js` en la raíz y tener instalado electron JS, sigue estos pasos:

1. usa`ionic build` para construír la aplicación
2. verifíca que tienes una carpeta `wwww`
3. usa `npm run electron:start`

La aplicación se abrirá en tu navegador predeterminado y podrás interactuar con ella.

## Tecnologías Utilizadas

- Ionic Framework
- Angular Framework
- electron JS

## Notas Adicionales

- Asegúrate de tener una conexión a internet para obtener datos en tiempo real.
- La aplicación utiliza servicios externos para obtener información sobre el precio del Bitcoin, [ir a la API](https://min-api.cryptocompare.com/).
