# JoinNow

JoinNow è una moderna applicazione web basata su **Nuxt 4** progettata per gestire registrazioni di accesso e profili utente in modo rapido ed efficiente.

## 🚀 Tecnologie Utilizzate

- **Framework**: [Nuxt 4](https://nuxt.com/) - Potente framework Vue.js per lo sviluppo full-stack.
- **Database & Auth**: [Supabase](https://supabase.com/) - Backend as a Service per autenticazione e gestione dati.
- **UI Components**: [Shadcn Vue](https://www.shadcn-vue.com/) & [Tailwind CSS](https://tailwindcss.com/) - Per un design moderno, reattivo e personalizzabile.
- **ICONS**: [Lucide Vue Next](https://lucide.dev/) - Un set di icone eleganti e coerenti.

## ✨ Funzionalità

- 🔐 **Autenticazione**: Sistema di login e registrazione sicuro gestito tramite Supabase Auth.
- 📝 **Join System**: Possibilità per gli utenti di registrare il proprio "accesso" specificando nome e ruolo.
- 👤 **Profilo Utente**: Pagina dedicata per visualizzare e gestire le informazioni dell'utente.
- 📊 **Dashboard Dati**: Visualizzazione e gestione dei record salvati nel database.

## 🛠️ Setup Locale

### 1. Installazione Dipendenze

Assicurati di avere [Node.js](https://nodejs.org/) installato, quindi esegui:

```bash
npm install
```

### 2. Configurazione Ambiente

Crea un file `.env` nella root del progetto e aggiungi le tue credenziali Supabase:

```env
SUPABASE_URL=tua_url_supabase
SUPABASE_SERVICE_ROLE_KEY=tua_service_role_key
```

### 3. Avvio Server di Sviluppo

Avvia l'applicazione su `http://localhost:3000`:

```bash
npm run dev
```

## 📂 Struttura del Progetto

- `app/pages/`: Contiene le rotte dell'applicazione (login, register, profile, etc.).
- `app/components/ui/`: Componenti dell'interfaccia basati su Shadcn.
- `server/api/`: Endpoint lato server per l'interazione con il database.
- `utils/`: Funzioni di utilità e helper.

---

Creato con ❤️ per semplificare la registrazione degli accessi.

