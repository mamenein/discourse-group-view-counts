# Group View Counts für Discourse

[![Discourse Theme CI](https://github.com/mamenein/discourse-group-view-counts/actions/workflows/discourse-theme.yml/badge.svg)](https://github.com/mamenein/discourse-group-view-counts/actions/workflows/discourse-theme.yml)

Eine [Discourse](https://www.discourse.org/)-Theme-Komponente, die **Aufrufe
von Themen** und **Lesezahlen von Beiträgen** nur den **Gruppen zeigt, die du
auswählst**. Standard ist die Gruppe **Moderatoren**.

Auch auf [Englisch](README.md) verfügbar.

## Warum es diese Komponente gibt

Manche Themes (zum Beispiel **Air** und **Horizon**) zeigen keine Aufrufe an.
Discourse zählt sie trotzdem im Hintergrund. Unsere Moderatorinnen wollten
sehen, wie oft ein Thema gelesen wurde, ohne die Zahl allen Mitgliedern zu
zeigen.

Bestehende Komponenten wie
[Post Views Counter](https://meta.discourse.org/t/post-views-counter/143807)
zeigen die Zahl allen. Diese Komponente ergänzt genau eine Sache: **du
entscheidest, welche Gruppen sie sehen**.

Wir veröffentlichen sie als Open Source unter der MIT-Lizenz. Nutze sie, forke
sie, verbessere sie.

## Funktionen

- **Nach Gruppen freigegeben** — Gruppenauswahl in den Einstellungen; Standard:
  Moderatoren
- **Prüfung auf dem Server** bei aktuellem Discourse
  (`resolve_group_membership`): der Browser bekommt nur „ja" oder „nein", nie
  die Gruppenliste
- Prüfung im Browser als Rückfall für ältere Discourse-Versionen
- **Aufrufe des Themas** auf der Themenseite, an einer wählbaren Stelle
- Optional: **Lesezahl** an jedem Beitrag, neben dem Datum
- Anonyme Besucher sehen nie Zahlen
- Deutsch und Englisch, mit korrekten Pluralformen
- Nur Theme-Komponente — kein Backend-Plugin, keine API-Schlüssel

## Voraussetzungen

- Discourse **3.3.0** oder neuer
- Lesezahlen an Beiträgen brauchen den Glimmer-Post-Stream (Standard bei
  aktuellem Discourse). Bei älteren Versionen erscheinen nur die Aufrufe des
  Themas.

## Installation

1. Gehe zu **Administration → Erscheinungsbild → Designs und Komponenten →
   Installieren → Aus einem Git-Repository**
2. Füge ein: `https://github.com/mamenein/discourse-group-view-counts`
3. Klicke **Installieren** und füge die Komponente deinem aktiven Theme hinzu
   (Reiter **Komponenten** des Themes → **Komponente hinzufügen**)

## Einstellungen

| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| `visible_to_groups` | moderators | Gruppen, die die Zahlen sehen. |
| `show_topic_views` | an | Aufrufe auf der Themenseite zeigen. |
| `topic_views_outlet` | `topic-above-post-stream` | Wo die Aufrufe erscheinen. Auch: `topic-title-suffix`, `topic-above-posts`, `topic-area-bottom`. |
| `show_post_reads` | aus | Lesezahl an jedem Beitrag zeigen, neben dem Datum. |

**Administratoren sind nicht in der Gruppe Moderatoren.** Wenn sie die Zahlen
auch sehen sollen, füge die Gruppe `admins` hinzu (oder nimm `staff`, also
Administratoren und Moderatoren).

## Was die Zahlen bedeuten

- **Aufrufe** — `views` des Themas in Discourse (dieselbe Zahl wie die
  klassische Spalte „Aufrufe").
- **Lesezahl** — `reads` des Beitrags: wie viele Personen ihn gelesen haben.

## Hinweis zum Datenschutz

Die Komponente versteckt die Zahlen in der Oberfläche. **Sie entfernt sie nicht
aus den Daten, die Discourse an den Browser schickt.** `views` und `reads`
stehen im normalen Themen-JSON; technisch versierte Personen können sie finden.
Für Aufrufzahlen ist das meist in Ordnung. Wenn die Zahlen wirklich geheim
bleiben müssen, braucht es ein Server-Plugin.

## Testen

1. Als Moderatorin anmelden, ein Thema öffnen: die Aufrufe erscheinen.
2. Als normales Mitglied anmelden, dasselbe Thema öffnen: keine Zahl.
3. Abmelden: keine Zahl.
4. `visible_to_groups` ändern, neu laden, erneut prüfen.

Auf Desktop und Mobilgerät prüfen, und vor dem Live-Einsatz in einer Vorschau
mit deinem Theme (Air, Horizon, …) testen.

## Lizenz

MIT — siehe [LICENSE](LICENSE).
