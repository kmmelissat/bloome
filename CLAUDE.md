🌸 bloomé — CLAUDE.md


🧠 Visión del Proyecto
Una Progressive Web App de finanzas personales con look de app iOS nativa, minimalista y elegante. Permite al usuario controlar gastos, ingresos, tarjetas, presupuestos e insights con IA — todo desde el browser, sin instalar nada.

🎨 Design System
Paleta de colores
css--color-primary:    #fb9d9c;  /* coral/salmon — acción principal */
--color-accent:     #fcefb6;  /* amarillo pastel — highlights */
--color-warm:       #ffe2cf;  /* durazno — cards secundarias */
--color-bg:         #fffaf9;  /* blanco cálido — fondo base */
--color-text:       #1c1c1e;  /* casi negro — texto principal (iOS) */
--color-text-muted: #6e6e73;  /* gris iOS — texto secundario */
--color-surface:    #ffffff;  /* blanco puro — cards */
Estética: iOS Native Minimalista

Fuente: SF Pro Display / -apple-system, BlinkMacSystemFont — o similar
Border radius: 16px–24px en cards, 12px en botones
Sombras: suaves, tipo iOS (box-shadow: 0 2px 12px rgba(0,0,0,0.06))
Motion: transiciones suaves 250–350ms ease, spring animations en modales
Sin bordes duros — separadores con opacity: 0.08
Bottom navigation bar estilo iOS (5 tabs max)
Large Title en headers de sección (estilo iOS Settings/Wallet)
Cards con glassmorphism sutil donde aplique


🏗️ Stack Técnico
📱 Features / Módulos
1. Dashboard (/)

Resumen del mes: ingresos vs gastos
Balance actual
Gráfica de gastos por categoría (donut chart)
Últimas transacciones (lista)
Alertas: tarjetas por vencer, presupuestos al límite

2. Transacciones (/transactions)

Lista de gastos e ingresos
Filtros: fecha, categoría, tarjeta, tipo
Agregar manualmente:

Monto, descripción, categoría, fecha, método de pago


Editar / eliminar
Búsqueda

3. Tarjetas (/cards)

Agregar tarjetas de crédito/débito (nombre, últimos 4 dígitos, banco, límite, fecha de corte, fecha de pago)
Ver saldo actual usado vs límite
Recordatorio de pago (fecha de vencimiento + monto mínimo / total)
Estado: al corriente / próximo a vencer / vencida

4. Presupuestos (/budgets)

Crear presupuesto por categoría y período (mensual/semanal)
Barra de progreso visual
Alertas al llegar al 80% y 100%

5. Ingresos (/income)

Registrar ingresos manuales
Fuentes: salario, freelance, otro
Historial mensual

6. Insights IA (/insights)

Análisis de gastos con Anthropic API
Preguntas en lenguaje natural: "¿En qué gasté más este mes?"
Sugerencias de ahorro
Detección de gastos inusuales
Resumen mensual generado automáticamente

7. Configuración (/settings)

Perfil usuario
Conectar email para auto-registro (ver sección Email)
Categorías personalizadas
Moneda (default: USD o local)
Exportar datos (CSV)


📧 Auto-registro de Gastos via Email
Flujo
Banco envía email de compra
  → Email llega a dirección del usuario en el sistema
  → Webhook procesa el email
  → IA extrae: monto, comercio, fecha, tarjeta
  → Se crea transacción automáticamente
  → Notificación push al usuario
Implementación
Opción A — Resend Inbound (recomendada):

Usuario configura su banco para mandar copia de notificaciones a user-{uuid}@inbound.bloome.app
Resend recibe el email y dispara webhook a /api/email/inbound
El endpoint extrae el texto del email y llama a Claude para parsear
Se guarda la transacción en Supabase

Opción B — Gmail API (más compleja):

Usuario conecta su Gmail con OAuth
Polling cada X minutos buscando emails del banco
Mismo parsing con IA

Prompt para parsing de email
Extrae de este email de notificación bancaria:
- monto (número)
- moneda (USD, MXN, etc.)
- comercio/descripción
- fecha y hora
- últimos 4 dígitos de tarjeta (si aparece)
- tipo: compra, retiro, transferencia

Responde SOLO en JSON. Si no puedes extraer algún campo, ponlo como null.

🗄️ Schema de Base de Datos (Supabase)
sql-- Usuarios (manejado por Supabase Auth)

-- Tarjetas
cards (
  id, user_id, name, bank, last_four,
  card_type (credit/debit),
  credit_limit, current_balance,
  cut_date (día del mes), due_date (día del mes),
  color, created_at
)

-- Transacciones
transactions (
  id, user_id, card_id?,
  type (expense/income),
  amount, currency,
  description, category,
  date, created_at,
  source (manual/email/import),
  raw_email_id?
)

-- Categorías
categories (
  id, user_id, name, icon, color, is_default
)

-- Presupuestos
budgets (
  id, user_id, category_id,
  amount, period (monthly/weekly),
  start_date, end_date
)

-- Emails procesados
processed_emails (
  id, user_id, email_id, raw_content,
  transaction_id?, status, created_at
)

📂 Estructura de Carpetas (Next.js App Router)
/app
  /(auth)
    /login
    /signup
  /(app)
    /layout.tsx          ← Bottom nav + auth guard
    /page.tsx            ← Dashboard
    /transactions/
    /cards/
    /budgets/
    /income/
    /insights/
    /settings/
  /api
    /email/inbound/      ← Webhook emails
    /insights/           ← Proxy Anthropic API
    /transactions/       ← CRUD

/components
  /ui/                   ← Primitivos (Button, Card, Input, Modal)
  /charts/               ← Gráficas
  /cards/                ← Componentes de tarjetas
  /transactions/

/lib
  /supabase.ts
  /anthropic.ts
  /email-parser.ts
  /db/                   ← Queries

/stores                  ← Zustand stores
/hooks                   ← Custom hooks
/types                   ← TypeScript types

🔔 Recordatorios de Tarjetas

Guardar due_date (día del mes) en cada tarjeta
Cron job en Supabase Edge Functions o Vercel Cron:

Corre diario a las 8am
Busca tarjetas con due_date en los próximos 3, 1 día
Envía notificación push (Web Push API) o email


En dashboard: badge visual si hay tarjeta por vencer en los próximos 5 días


🤖 Insights con IA
Usar claude-sonnet-4-20250514 via API.
Tipos de insights:

Resumen mensual: "Este mes gastaste $X más que el mes pasado, principalmente en restaurantes"
Anomalías: "Detecté un gasto inusual de $500 en Amazon el martes"
Proyección: "A este ritmo, agotarás tu presupuesto de entretenimiento en 5 días"
Sugerencias: "Podrías ahorrar ~$200/mes si reduces los pedidos a domicilio"
Chat libre: El usuario pregunta lo que quiera sobre sus finanzas

El contexto que se manda a la IA incluye:

Transacciones del mes actual (y anterior para comparar)
Presupuestos activos y % ejecutado
Tarjetas y balances


✅ Orden de Desarrollo Sugerido

 Setup Next.js + Tailwind + Supabase + Auth
 Design system base (tokens, componentes UI básicos)
 Bottom navigation + layout
 CRUD de Transacciones (manual)
 Dashboard con resumen y gráfica
 Módulo de Tarjetas + recordatorios
 Módulo de Presupuestos
 Módulo de Ingresos
 Insights básicos con IA
 Email inbound parsing
 PWA config (manifest, service worker, push notifications)
 Polish, animaciones, microinteracciones


📌 Notas Importantes

Offline-first: la app debe funcionar sin internet para ver datos; sync cuando hay conexión
Privacidad: nunca guardar números completos de tarjeta, solo últimos 4 dígitos
Multi-moneda: soporte básico desde el inicio (campo currency en transacciones)
Mobile-first: diseñar siempre para 375px primero
Accesibilidad: contraste mínimo AA, tap targets mínimo 44px


Actualizar este archivo si cambia el stack o se agregan features.