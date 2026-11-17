# Web Integrado UI

Frontend oficial de CampusSeguro 360, desarrollado con Angular 20 y TypeScript.

> Este repositorio no usa React ni Vite. La aplicación se construye y sirve mediante Angular CLI.

## Estructura

```text
src/app/
├── api/       # Clientes y configuración de API
├── core/      # Modelos, servicios, constantes e interceptores
├── features/  # Módulos funcionales, como dashboard
└── shared/    # Componentes reutilizables y layout
```

## Inicio rápido

```bash
npm install
npm start
```

## Pruebas

```bash
npm test
```

Las pruebas unitarias se ejecutan con Vitest. La cobertura inicial incluye autenticación, permisos visuales de incidencias y el interceptor JWT.

La pantalla de ejemplo está disponible en `/inicio` y se carga por defecto.
