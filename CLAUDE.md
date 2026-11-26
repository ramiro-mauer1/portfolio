# Portfolio de Ramiro Mauer

Sitio estático en Vite + React + TypeScript + Tailwind. `main` se publica en Vercel automáticamente.

## Comandos

- `npm run dev`: servidor local.
- `npm run build`: chequeo de tipos (tsc) + build. Tiene que pasar antes de cada commit.

## Reglas

- Todo texto visible va en los dos idiomas: `src/data/data.ts` (contenido) y `src/context/LanguageContext.tsx` (interfaz). Nunca un texto suelto en un componente.
- Nada inventado: métricas, clientes y logros solo si Ramiro los confirmó. Sin edad ni datos personales que no estén ya en el sitio.
- No nombrar AraucariaBet ni el casino; el panel financiero va como "negocio propio".
- Capturas de productos en `public/shots/`, en WebP a 390×844 (celular) más una copia `-320.webp` para la grilla. Sin datos reales de clientes.
- Visitas: Vercel Web Analytics (`<Analytics />` en `main.tsx`), sin cookies.
- Verificar con capturas de Playwright en 1280px y 390px, en ES y EN, antes de publicar.
