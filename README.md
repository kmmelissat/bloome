# 🌸 bloomé

Progressive Web App de finanzas personales con look de app iOS nativa — minimalista y elegante. Controla gastos, ingresos, tarjetas, presupuestos e insights con IA, todo desde el navegador.

## ✨ Features

- **Dashboard** — resumen mensual (ingresos vs. gastos), balance, gráfica de gastos por categoría y últimas transacciones
- **Transacciones** — CRUD completo con filtros por fecha, categoría, tarjeta y tipo
- **Tarjetas** — gestión de tarjetas de crédito/débito, saldo usado vs. límite, recordatorios de pago
- **Presupuestos** — por categoría y período, con alertas al 80% y 100%
- **Ingresos** — registro y historial mensual por fuente
- **Insights IA** — análisis de gastos en lenguaje natural, detección de anomalías y sugerencias de ahorro (Anthropic Claude)

Ver [`CLAUDE.md`](./CLAUDE.md) para el detalle completo de producto, schema de base de datos y roadmap.

## 🛠️ Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com)
- [Framer Motion](https://www.framer.com/motion/) para animaciones
- [Tabler Icons](https://tabler.io/icons) / [Lucide](https://lucide.dev)
- TypeScript

> ⚠️ Este proyecto usa una versión de Next.js con cambios de API respecto a lo habitual. Antes de escribir código, revisa `node_modules/next/dist/docs/` (ver [`AGENTS.md`](./AGENTS.md)).

## 🚀 Getting Started

Instala dependencias y levanta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts disponibles

| Comando         | Descripción                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Levanta el servidor de desarrollo     |
| `npm run build` | Compila la app para producción        |
| `npm run start` | Sirve el build de producción          |

## 📂 Estructura del proyecto

```
app/
  (auth)/          # Login, signup — layout sin nav
  (app)/           # Dashboard, transactions, cards, budgets, income, insights
  components/
    landing/       # Landing page pública
    layout/        # Shell, sidebar, tabbar, header
    ui/            # Primitivos (Button, Modal, Drawer, etc.)
  globals.css      # Design tokens (colores, radios, sombras)
lib/
  utils.ts
public/
```

## 🎨 Design System

Estética iOS nativa minimalista — ver tokens completos en [`app/globals.css`](./app/globals.css).

| Token                  | Valor      | Uso                          |
| ----------------------- | ---------- | ----------------------------- |
| `--color-primary`       | `#fb9d9c`  | Coral/salmon — acción principal |
| `--color-accent`        | `#fcefb6`  | Amarillo pastel — highlights   |
| `--color-warm`          | `#ffe2cf`  | Durazno — cards secundarias    |
| `--color-bg`            | `#fffaf9`  | Fondo base                     |
| `--color-text`          | `#1c1c1e`  | Texto principal                |
| `--color-text-muted`    | `#6e6e73`  | Texto secundario               |

Lineamientos: border radius 16–24px en cards, sombras suaves tipo iOS, transiciones 250–350ms, mobile-first desde 375px, tap targets mínimo 44px.

## 📚 Más información

- [`CLAUDE.md`](./CLAUDE.md) — visión de producto, schema de Supabase, roadmap y prompts de IA
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
