# Dal libro alla tavola

Sito web statico (HTML, CSS e JavaScript puri, nessun framework, nessun server) che accompagna il libro "Nonostante tutto" di Valentina Patti e i prodotti di Bontà di Montiglie. Ha nove sezioni:

- **Come li uso io**: tutti i prodotti del listino, ognuno con i suoi abbinamenti
- **Ospiti all'improvviso**: si segna cosa c'è in casa e la pagina suggerisce quali vasetti aprire
- **Dizionario dell'etichetta**: sigle e parole delle etichette spiegate in due righe, il gioco "indovina la sigla" e il metodo dei 30 secondi
- **Un vasetto di coraggio**: si tocca il vasetto, il tappo salta e dentro c'è una frase del libro
- **La voce del "non abbastanza"**: un piccolo esercizio in tre passi per rispondere alla vocina critica
- **Il vasetto giusto**: un gioco di tre domande che consiglia tre vasetti, da ordinare su WhatsApp o nel negozio online
- **Dove trovarmi**: indirizzo, mappa, "scrivimi prima di passare" con WhatsApp, telefono e negozio online
- **Lascia una recensione**: un piccolo gioco di stelle e il link alla pagina Amazon del libro
- **Il regalo per te**: il codice sconto LIBRO26 per chi ha letto il libro

Lo stile (colori, logo, immagine) è ripreso dalla copertina del libro e dal logo di Bontà di Montiglie. Le uniche cose salvate sono piccole preferenze (l'ultima sezione aperta, cosa si è segnato in "Ospiti all'improvviso") e restano solo nel browser di chi usa il sito (`localStorage`): non c'è un database né un server.

## Struttura del progetto

```
nonostante-tutto-app/
├── index.html        → la pagina dell'app
├── manifest.webmanifest → nome e icona quando si aggiunge l'app alla schermata Home
├── css/style.css     → stile grafico e colori
├── js/data.js        → i dati: telefono, WhatsApp, link Amazon, prodotti e abbinamenti, dizionario
├── js/app.js         → la logica dell'app (sezioni, ricerca, messaggi WhatsApp)
├── assets/           → logo, icone e immagine della copertina
└── README.md
```

## Le cose da completare (tutte in `js/data.js`)

Apri `js/data.js` con un editor di testo. In cima trovi:

```js
const TELEFONO = "";          // il numero da mostrare e chiamare, es. "+39 333 123 4567"
const WHATSAPP = "";          // lo stesso numero per WhatsApp, senza + e senza spazi, es. "393331234567"
const SITO = "https://www.bontadimontiglie.it";
const AMAZON_RECENSIONE = ""; // il link alla pagina Amazon del libro
```

- **TELEFONO**: compare in "Dove trovarmi", con i bottoni "Chiamami" e "Copia".
- **WHATSAPP**: da quel momento compaiono tutti i bottoni WhatsApp, con il messaggio già scritto. Il bottone è un normale link `wa.me`, quindi funziona anche su Vercel senza server.
- **AMAZON_RECENSIONE**: il link della pagina del libro su Amazon, da aggiungere quando il libro sarà pubblicato. Fino ad allora la sezione "Lascia una recensione" dice che il link arriverà presto.
- **Frasi del vasetto di coraggio**: sono nell'elenco `FRASI`, in fondo al file. Puoi aggiungerne o toglierne.
- **Prodotti e abbinamenti**: ogni prodotto è una riga dell'elenco `P`, con nome, formato, categoria, abbinamenti e "cosa c'è in casa" per la sezione Ospiti. Per cambiare un abbinamento basta riscrivere la frase tra virgolette.

## Provarlo sul tuo computer (facoltativo)

Non serve installare nulla: apri il file `index.html` con doppio click e si aprirà nel browser.

## Come caricarlo su GitHub

1. Vai su [github.com](https://github.com) e accedi.
2. Clicca sul **+** in alto a destra → **New repository**.
3. Dai un nome al repository, ad esempio `nonostante-tutto`. Non selezionare "Aggiungi un file README" (ne hai già uno). Clicca **Create repository**.
4. Apri il **Terminale**, spostati nella cartella del progetto e incolla questi comandi uno alla volta (sostituisci `TUO-USERNAME` con il tuo nome utente GitHub):

   ```bash
   cd percorso/della/cartella/nonostante-tutto-app
   git init
   git add .
   git commit -m "Primo caricamento del sito"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/nonostante-tutto.git
   git push -u origin main
   ```

5. Aggiorna la pagina del repository su GitHub: i file dovrebbero essere lì.

In alternativa, dalla pagina del repository vuoto puoi cliccare **uploading an existing file** e trascinare dentro tutti i file e le cartelle.

## Come metterlo online con Vercel

1. Vai su [vercel.com](https://vercel.com) e accedi con il tuo account GitHub.
2. Clicca **Add New...** → **Project**.
3. Nella lista dei repository trova `nonostante-tutto` e clicca **Import**.
4. Vercel riconosce che è un sito statico: non cambiare nessuna impostazione (framework "Other", nessun build command). Clicca **Deploy**.
5. Dopo circa un minuto il sito sarà online, con un indirizzo del tipo `https://nonostante-tutto.vercel.app`. Ogni volta che aggiorni i file su GitHub, Vercel pubblica da solo la nuova versione.

## Collegamenti diretti alle sezioni

Si può aprire direttamente una sezione aggiungendo il suo nome dopo `#`. Per esempio il QR code del libro può portare a:

- `https://nonostante-tutto.vercel.app/#regalo` → il regalo per i lettori
- `#prodotti`, `#ospiti`, `#coraggio`, `#vocina`, `#etichetta`, `#trova`, `#dove`, `#recensione`

## Personalizzare i colori

I colori sono all'inizio di `css/style.css`, nella sezione `:root`: `--paper` è lo sfondo crema della copertina, `--green` il verde del logo, poi giallo limone, rosso pomodoro, azzurro, prugna e albicocca per i riquadri.
