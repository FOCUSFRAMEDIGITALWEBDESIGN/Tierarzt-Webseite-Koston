# Tierarztpraxis Koston & van Dillen

Neue Praxiswebsite mit persistentem, geschütztem Verwaltungsbereich.

[Website öffnen](https://koston-van-dillen.hey1233767.chatgpt.site) · [Geschützter Adminbereich](https://koston-van-dillen.hey1233767.chatgpt.site/admin)

Ein Klick auf das Logo oben links öffnet die Praxisverwaltung. Dort sind das freigegebene ChatGPT-Konto und das zusätzliche Admin-Passwort erforderlich. Erstellt aus den am 20.10.2026 abgerufenen Angaben der offiziellen Website https://www.tierarztinemmerich.de/.

## Seiten

- `/`: responsive Praxiswebsite mit Leistungen, Team, Galerie, Kontakt und Öffnungszeiten.
- `/fortbildungen`: alle 29 übernommenen Fortbildungen bzw. Qualifikationen, filterbar nach Person und Fachgebiet und durchsuchbar.
- `/admin`: Fortbildungen anlegen, bearbeiten, als Entwurf speichern, veröffentlichen oder löschen; Bilder hochladen, mit Alternativtext versehen, zuordnen, ausblenden oder entfernen.
- `/impressum` und `/datenschutz`: übernommene Geschäftsangaben und an diese Website angepasste Hinweise. Die alte Datenschutzerklärung bleibt verlinkt, da ihre Facebook-/Strato-Texte nicht diese neue Architektur beschreiben. Der nicht mehr aktuelle EU-ODR-Link der alten Website wurde nicht als aktuelle Schlichtungsmöglichkeit neu veröffentlicht.

## Speicherung und Zugriff

Sites stellt D1 unter `DB` und R2 unter `BUCKET` bereit. Das Schema liegt in `db/schema.ts`, die schema-only Migration unter `drizzle/`. Die ursprünglichen Inhalte sind als Fallback in `lib/content.ts` enthalten und werden beim ersten Adminbesuch einmalig in einer D1-Transaktion gespeichert. Die `content_initialized`-Markierung verhindert das erneute Einfügen gelöschter Einträge.

Die Praxiswebsite ist öffentlich zugänglich. Für die geschützte Praxisverwaltung übernimmt die Hostingplattform Sign in with ChatGPT. Der bestehende Administrator wurde vor dieser Absicherung über den eigentümerprivaten Zugriff gebunden. Die automatische Registrierung des ersten Besuchers ist vollständig entfernt. Jeder Adminaufruf prüft sowohl die vorhandene Datenbankzuordnung als auch die explizit als Runtime-Secrets hinterlegte Nutzer-ID und E-Mail des verifizierten Eigentümers (`ADMIN_OWNER_USER_ID`, `ADMIN_OWNER_EMAIL`). Fehlende Konfiguration verweigert den Zugriff. Das betrifft auch direkte Lese- und Schreibaufrufe der Admin-APIs und unveröffentlichte Uploads.

Schreibaufrufe benötigen zusätzlich einen signierten, nutzergebundenen CSRF-Nachweis mit maximal einer Stunde Gültigkeit. Der Signaturschlüssel `ADMIN_CSRF_SECRET` existiert nur als Runtime-Secret. `SITE_ORIGIN` enthält die bisherige Website-Origin. `SITE_ADDITIONAL_ORIGINS` ergänzt ausschließlich die explizit konfigurierten HTTPS-Adressen `https://tierarztinemmerich.com` und `https://www.tierarztinemmerich.com`. Jede Schreibanfrage muss weiterhin mit ihrer eigenen Origin übereinstimmen; auch Anfragen zwischen diesen freigegebenen Hosts, fremde oder fehlende Origin-Header und explizit fremde Fetch-Metadata werden abgewiesen. Es gibt keine Wildcard-Freigabe. Tokens werden nicht in Local Storage oder in der Datenbank abgelegt. Nach Ablauf der Sicherheitsprüfung ist ein Neuladen des Adminbereichs erforderlich. Die primäre Anmeldung und deren Sitzungsverwaltung bleiben bei ChatGPT Sites. Zusätzlich ist seit der Passwort-Erweiterung eine eigene, zeitlich begrenzte Entsperrung der Praxisverwaltung erforderlich.

D1 begrenzt Änderungen atomar auf 60 pro Minute und Uploadversuche auf 10 pro Minute je Admin, auch über mehrere Workerinstanzen hinweg. Die Tabelle `request_limits` verwendet feste Zeilen pro Geltungsbereich. `admin_events` protokolliert Nutzerkennung, Aktion, Ziel-ID und Zeitpunkt. Änderungen und zugehöriger Protokolleintrag erfolgen gemeinsam in einer D1-Transaktion. Es gibt keine API zum Ändern des Adminverzeichnisses oder Löschen des Änderungsprotokolls.

Der Worker setzt für Adminseiten eine frische CSP-Script-Nonce pro Anfrage und reicht sie an die unterstützte Nonce-Verarbeitung von Vinext weiter. Adminskripte benötigen diese Nonce; eingebettete Skripte ohne Freigabe und externe Skriptquellen erhalten keine Freigabe. Adminseiten dürfen nicht in Frames geladen werden. Admin-, API- und Mediantworten erhalten `Cache-Control: no-store`, `nosniff`, eine Same-Origin-Ressourcenrichtlinie und Indexierungssperren. Der Adminlink öffnet deshalb als Hauptnavigation. Die öffentliche Praxiswebsite kann weiterhin im vertrauenswürdigen ChatGPT-Kontext angezeigt werden.

Der Bild-Upload akzeptiert JPEG, PNG und WebP bis 8 MB, prüft Datei-Signaturen, MIME-Typ, Dateiendung und Bildabmessungen und speichert einen zufälligen Dateischlüssel. Rohdaten werden vor dem Parsen auch ohne vertrauenswürdigen Content-Length-Header begrenzt. Bilder dürfen maximal 40 Megapixel und 10.000 Pixel je Seite umfassen. Der kleine Headerparser `image-size` liest nur die Bildmetadaten; ein vollständiges Dekodieren, Neuschreiben oder ein Virenscan wird damit nicht behauptet. Nicht veröffentlichte Uploads können nur vom Admin gelesen werden. SVG-Dateien werden nicht angenommen. Neue Start-, Gebäude-, Pferde- und zugeordnete Teamfotos ersetzen das jeweils bisher angezeigte Foto. Bilder im Bereich Praxis und Patienten erscheinen in der Galerie.

Das Kontaktformular öffnet ein lokales Mailprogramm. Es sendet keine E-Mail automatisch und speichert keine Anfragen auf dem Server. Die Google-Maps-Anfahrt ist ein externer Link ohne Karten-Embed. Es werden keine Analytics- oder Werbeskripte eingebunden.

## Quellen und Gestaltung

`source/reference-content.json` enthält die abgerufenen Inhalte aller zehn relevanten Unterseiten; `source/image-sources.json` dokumentiert die ursprünglichen Bildadressen. Vorhandene Praxisfotos und das Zeichen aus dem ursprünglichen Logo werden lokal ausgeliefert. Für Ida Reintjes enthielt die bisherige Website lediglich ein generisches Stockbild. Hier erscheint deshalb eine neutrale Initialen-Kachel, bis ein eigenes Foto hochgeladen wird.

Schriften: DM Serif Display und Manrope, lokal gespeicherte Google-Fonts-Dateien (Open Font License). Das Design nutzt Cremeweiß, dunkles Grün und Salbei, große Serifenschrift, klare Telefonlinks und einen auf Mobilgeräten fixierten Terminanruf.

## Prüfen und bauen

```sh
node tests/checks.mjs
node node_modules/typescript/bin/tsc --noEmit
node /root/.codex/plugins/cache/openai-curated-remote/sites/1.0.2-remix-b.1/scripts/build-site.mjs
```

Die Tests nutzen das echte generierte SQLite-Schema und den tatsächlichen API-Code mit Testadaptern für Identität und Dateispeicher. Die 51 gezielten Prüfungen umfassen Autorisierung und fremde Konten, die abgeschaltete automatische Adminregistrierung, fehlende Sicherheitskonfiguration, Herkunftsschutz, signierte und ablaufende CSRF-Nachweise, Anfragegrenzen, Rohdatenlimits, Auditierung, Datumsprüfung, einmaligen Inhaltsimport, CRUD, Entwurfsstatus, Bildzugriff, Sicherheitsheader und serverseitiges Rendern samt vorhandener Bilddateien.

Eine interaktive Browserprüfung konnte in dieser Umgebung mangels bereitgestellter `control-browser`-Funktion nicht durchgeführt werden. Es wurde dafür kein Ersatzbrowser gestartet.

## Grenzen der Sicherheitsprüfung

Diese Maßnahmen sind keine hundertprozentige Sicherheitsgarantie oder ein unabhängiger Penetrationstest. Kontoabsicherung, Identitätsheader und die Sitzungsverwaltung werden von ChatGPT Sites bereitgestellt. Zusätzlich zur primären ChatGPT-Anmeldung verlangt die Praxisverwaltung ein eigenes Admin-Passwort. Dieses ist ein weiterer Wissensnachweis und wird nicht als unabhängiger zweiter Faktor bezeichnet. Browser- und Gatewayverhalten konnten hier nicht interaktiv geprüft werden. Inhalte der ursprünglichen Praxiswebsite bleiben wie beauftragt erhalten.

Als technische Referenzen wurden die OWASP-Hinweise zu [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), [HTTP-Headern](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) und [Uploads](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) herangezogen.

## Zusätzliches Admin-Passwort

Nach der bestätigten Kontoanmeldung zeigt `/admin` beim ersten Aufruf ausschließlich die private Passworteinrichtung. Es ist kein Standardpasswort vorhanden. Der verifizierte Eigentümer legt dort ein Passwort mit 16 bis 256 Zeichen fest und bestätigt es. Erst danach werden Inhalte und Bildverwaltung geladen. Ohne vorherige Passworteinrichtung und gültige Entsperrung verweigern die Daten-APIs den Zugriff, auch wenn das richtige ChatGPT-Konto angemeldet ist. Die erstmalige Einrichtung lässt sich nach erfolgter Konfiguration nicht zum Überschreiben des Passworts verwenden.

Die Passwortablage verwendet natives `node:crypto`-scrypt mit N=32768, r=8 und p=3 (32 MiB), individuellem 24-Byte-Salt und zusätzlichem HMAC-SHA256 mit dem getrennten Runtime-Secret `ADMIN_PASSWORD_PEPPER`. Gespeichert wird nur der abgeleitete Prüfwert einschließlich Algorithmusparametern und Salt. Passwörter werden weder protokolliert noch an externe Dienste geschickt. Die Auswahl entspricht der speicherschonenderen scrypt-Variante der OWASP-Empfehlungen. Der native Hashvorgang wird zusätzlich mit `node tests/check-password-runtime.mjs` im lokalen Cloudflare-Worker-Runtime geprüft.

Die zusätzliche Entsperrung läuft nach 30 Minuten ab. Ein zufälliger 256-Bit-Sitzungsschlüssel wird ausschließlich in einem `__Host-`-Cookie mit `Secure`, `HttpOnly`, `SameSite=Strict` und `Path=/` übermittelt. In D1 liegt nur sein SHA256-Prüfwert. Die Konto-ID und die aktuelle Passwortversion werden bei jeder Datenabfrage geprüft. Die Oberfläche sperrt sich ebenfalls beim Ablauf, auch nach einer Pause im Hintergrund.

`Admin sperren` beendet die Entsperrung, während `Abmelden` erst die Entsperrung widerruft und danach von ChatGPT abmeldet. Unter `Sicherheit` kann der Eigentümer mit dem bisherigen Passwort ein neues festlegen. Dabei werden alle vorherigen Entsperrungen widerrufen. Anmelde- und Passwortversuche sind auf fünf pro 15-Minuten-Zeitfenster begrenzt. Für ein vergessenes Passwort gibt es absichtlich keinen unauthentifizierten Rücksetz-Endpunkt; ein Zurücksetzen erfordert gesondert bestätigte Eigentümerverwaltung.

## Eigene Domain

Die Hostnamen `tierarztinemmerich.com` und `www.tierarztinemmerich.com` sind für dieselbe Veröffentlichung vorgemerkt. Bis DNS-Einträge und Zertifikat bestätigt sind, bleibt die bestehende Sites-Adresse der geprüfte Zugang. Die originbezogene Sicherheitskonfiguration unterstützt beide neuen Adressen und die bestehende Sites-Adresse. Die native Kontoanmeldung und HTTPS sind nach DNS-Aktivierung zusätzlich auf den eigenen Domains zu prüfen. Mailserver und Mail-Authentifizierung bei IONOS werden für die Website-Verbindung nicht geändert.
