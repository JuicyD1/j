# Aide-mémoire complet — Régulation 3 (243‑51J)

## Version longue (sans limite de pages)

Ce document reprend **l'intégralité** des trois cours (Contrôle PID et réglage de boucles, Pertes de charge, Vannes de régulation), réorganisée pour la révision et l'examen :

- **Partie I** — Formulaire complet avec signification et unités de chaque variable.
- **Partie II** — Vocabulaire et concepts de base de la régulation (ce qui est supposé connu).
- **Partie III** — Contrôle PID : actions, structures, méthodes de réglage détaillées avec exemples chiffrés, influence des paramètres, boucles complexes.
- **Partie IV** — Pertes de charge : théorie, régime d'écoulement, coefficient de frottement, singularités, démarche de calcul, exercices.
- **Partie V** — Vannes de régulation : constitution, types de corps, servomoteur, caractéristiques, autorité, positionneur, \(C_V\), rangeabilité, cavitation, bruit, exercices.
- **Partie VI** — Tous les exercices du cours résolus pas à pas.
- **Partie VII** — Exercices supplémentaires d'entraînement avec corrigés.
- **Partie VIII** — Tables : conversions, constantes, propriétés de l'eau, rugosités, coefficients de singularités.
- **Partie IX** — Fiches synthèse d'une page par chapitre, glossaire, index des symboles.
- **Partie X** — Questions de cours probables avec réponses modèles et pièges d'examen.

**Légende**

- Les formules sont écrites avec les **notations du cours**.
- *(hyp.)* : valeur typique ou hypothèse ajoutée pour résoudre un exercice dont certaines données ne sont pas dans les diapositives (à remplacer par la donnée de l'énoncé ou de la fiche technique si elle est fournie).
- *(complément)* : notion qui n'est pas explicitement dans les diapositives, ajoutée parce qu'elle aide à comprendre ou à vérifier un résultat. Elle ne remplace jamais la formule du cours.

---

# Partie I — Formulaire complet

## I.1 Contrôle PID

| Nom | Formule | Variables et unités |
|---|---|---|
| Écart (erreur) | \(\varepsilon = \text{consigne} - \text{mesure}\) | % d'échelle (ou unité physique convertie en %) |
| Action proportionnelle | \(Y = \pm K_p\,\varepsilon(t) + Y_0\) | \(K_p\) : gain (sans unité) ; \(Y_0\) : sortie au repos (%) |
| Bande proportionnelle | \(BP(\%) = \dfrac{100}{K_p}\) | BP en % d'échelle |
| Action intégrale | \(Y = K_i \displaystyle\int_0^t \varepsilon(t)\,dt\), \(K_i = \dfrac{1}{T_i}\) | \(T_i\) : temps intégral (s ou min) ; \(K_i\) en s⁻¹ |
| Action dérivée | \(Y = K_d\,\dfrac{d\varepsilon(t)}{dt}\) | \(K_d\) : gain dérivé (s) |
| PID réel (parallèle) | \(Y(t) = K_p\,\varepsilon + K_i\displaystyle\int_0^t \varepsilon\,dt + K_d\,\dfrac{d\varepsilon}{dt}\) | sortie en % |
| PID discret | \(Y_n = K_p\,\varepsilon_n + K_i\displaystyle\sum_{i=0}^{n}\varepsilon_i\,\Delta T + K_d\,\dfrac{\varepsilon_n-\varepsilon_{n-1}}{\Delta T}\) | \(\Delta T\) : période d'échantillonnage (s) |
| Gain statique du procédé | \(G_s = \dfrac{\Delta X}{\Delta Y}\) | \(\Delta X\) : variation de mesure (% d'échelle) ; \(\Delta Y\) : échelon de commande (%) |
| Méthode graphique (PI) | \(G_r = \dfrac{1}{G_s}\cdot\dfrac{\theta}{\theta_d}\), \(T_i = G_s\,\theta_d\) | \(\theta\) : constante de temps du procédé ; \(\theta_d\) : constante de temps désirée |
| Temps de réponse 1er ordre | \(t_{63\%} = \theta_d\), \(t_{95\%} = 3\,\theta_d\), \(t_{98\%} \approx 4\,\theta_d\) | s |
| Conversion % d'échelle | \(X_\% = \dfrac{X - X_{min}}{X_{max}-X_{min}}\times 100\) | échelle du transmetteur |

**Ziegler-Nichols en boucle fermée** (\(G_c\) = gain critique, \(T_{osc}\) = période des oscillations entretenues) :

| | P | PI | PID |
|---|---|---|---|
| \(G_r\) | \(\dfrac{G_c}{2}\) | \(\dfrac{G_c}{2{,}2}\) | \(\dfrac{G_c}{1{,}7}\) |
| \(T_i\) | — | \(\dfrac{1{,}8\,T_{osc}}{G_c}\) | \(\dfrac{0{,}85\,T_{osc}}{G_c}\) |
| \(T_d\) | — | — | \(\dfrac{G_c\,T_{osc}}{13{,}6}\) |

**Ziegler-Nichols en boucle ouverte** (\(\tau\) = constante de temps, \(t_d\) = retard, \(G_s\) = gain statique) :

| | P | PI | PID |
|---|---|---|---|
| \(K_p\) | \(\dfrac{\tau}{t_d\,G_s}\) | \(\dfrac{0{,}9\,\tau}{t_d\,G_s}\) | \(\dfrac{1{,}2\,\tau}{t_d\,G_s}\) |
| \(T_i\) | — | \(\dfrac{t_d}{0{,}3}\) | \(\dfrac{t_d}{0{,}5}\) |
| \(T_d\) | — | — | \(\dfrac{t_d}{2}\) |

## I.2 Pertes de charge

| Nom | Formule | Variables et unités |
|---|---|---|
| Perte de pression linéique | \(\Delta P = f\,\dfrac{L}{D}\,\dfrac{1}{2}\rho v^2\) | Pa ; \(f\) sans unité ; \(L, D\) en m ; \(\rho\) en kg/m³ ; \(v\) en m/s |
| Lien pression / hauteur | \(\Delta P = \rho g\,\Delta h\) | \(g = 9{,}81\) m/s² ; \(\Delta h\) en m de colonne de fluide |
| Perte de hauteur linéique | \(\Delta h = f\,\dfrac{L}{D}\,\dfrac{v^2}{2g}\) | m |
| Pression dynamique | \(\dfrac{1}{2}\rho v^2\) | Pa (énergie cinétique par unité de volume) |
| Rugosité relative | \(\dfrac{\epsilon}{D}\) | \(\epsilon\) : hauteur des aspérités (même unité que \(D\)) |
| Nombre de Reynolds | \(Re = \dfrac{\rho v D}{\mu}\) | \(\mu\) : viscosité dynamique (Pa·s) ; sans unité |
| Régime | \(Re < 2000\) laminaire ; \(Re > 4000\) turbulent | zone 2000–4000 : transition |
| Laminaire *(complément)* | \(f = \dfrac{64}{Re}\) | |
| Colebrook (turbulent) | \(\dfrac{1}{\sqrt f} = -2\log_{10}\!\left[\dfrac{\epsilon/D}{3{,}7} + \dfrac{2{,}51}{Re\sqrt f}\right]\) | implicite : itérer |
| Perte singulière (pression) | \(\Delta P = \xi\,\dfrac{1}{2}\rho v^2\) | \(\xi\) : coefficient de la singularité (tableau) |
| Perte singulière (hauteur) | \(\Delta h = \xi\,\dfrac{v^2}{2g}\) | m |
| Vitesse à partir du débit | \(v = \dfrac{Q}{A} = \dfrac{4Q}{\pi D^2}\) | \(Q\) en m³/s, \(D\) en m |
| Pertes totales | \(\Delta P_{tot} = \sum \Delta P_{lin} + \sum \Delta P_{sing}\) | |

## I.3 Vannes de régulation

| Nom | Formule | Variables et unités |
|---|---|---|
| Vanne 3 voies | \(Q_e = Q_{s1}+Q_{s2}\), \(Q_{s1} = \alpha Q_e\), \(Q_{s2} = (1-\alpha)Q_e\) | \(\alpha\) : fraction de course, de 0 à 1 |
| Caractéristique linéaire | \(\dfrac{Q}{Q_{max}} = h\) | \(h\) : course relative (0 à 1) |
| Égal pourcentage | \(Q = Q_0\,e^{n h}\) | \(Q_0\) : débit minimal contrôlable ; \(n\) : coefficient propre de la vanne |
| Autorité (circuit série) | \(a = \dfrac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}}\) | \(\Delta P_v\) : chute dans la vanne ; \(\Delta P_{R1+R2}\) : chute dans le reste du circuit |
| \(C_V\) impérial | \(C_V = Q\sqrt{\dfrac{\text{densité}}{\Delta P}}\) | \(Q\) en GPM US ; \(\Delta P\) en PSI |
| \(C_V\) métrique | \(C_V = 1{,}16\,Q\sqrt{\dfrac{\text{densité}}{\Delta P}}\) | \(Q\) en m³/h ; \(\Delta P\) en bar |
| \(C_V\) nominal, vanne linéaire | \(C_{V,nom} = 1{,}25\,C_{V,max}\) | puis premier \(C_V\) constructeur \(\ge C_{V,nom}\) |
| \(C_V\) nominal, vanne =% | \(C_{V,nom} = 1{,}4\,C_{V,max}\) | idem |
| Rangeabilité | \(r = \dfrac{C_{V\,maxi\ contrôlable}}{C_{V\,mini\ contrôlable}}\) | sans unité (ex. 50:1) |
| Critère de cavitation | \(\Delta P \ge F_L^2\,\Delta P_s\), \(\Delta P_s = P_1 - P_v\) | \(P_1\), \(P_v\) en pression **absolue** ; \(F_L\) : coefficient de récupération |
| Pression absolue | \(P_{abs} = P_{rel} + P_{atm}\) | \(P_{atm} = 14{,}7\) PSI = 1,013 bar |
| Bruit à une autre distance | \(\Delta L_d = 20\log\!\left(\dfrac{r}{r_\theta}\right)\), \(L(r) = L(r_\theta) - \Delta L_d\) | dB ; \(r_\theta\) : distance de référence (m) |

---

# Partie II — Vocabulaire et concepts de base

## II.1 La boucle de régulation

Une boucle de régulation fermée comprend :

1. **Le procédé** : l'installation physique (cuve, échangeur, conduite, four…).
2. **Le transmetteur (capteur)** : mesure la **grandeur réglée** (niveau, température, débit, pression…) et la convertit en signal normalisé (4–20 mA, 3–15 PSI, 0–10 V, numérique).
3. **Le régulateur** : compare la **mesure** \(X\) à la **consigne** \(W\), calcule l'**écart** \(\varepsilon = W - X\) et produit la **commande** \(Y\) (sortie du régulateur, en %).
4. **L'actionneur (organe de réglage)** : typiquement une **vanne de régulation** qui agit sur la **grandeur réglante** (débit de vapeur, débit d'eau…).
5. **Les perturbations** : grandeurs non commandées qui influencent la grandeur réglée (température extérieure, soutirage, pression d'alimentation…).

Schéma (texte) :

```
 consigne W ──►(+)──► ε ──► [Correcteur PID] ──► Y ──► [Vanne] ──► grandeur réglante ──► [Procédé] ──► grandeur réglée
                (−)                                                                   ▲                         │
                 ▲                                                                    │ perturbations           │
                 └───────────────────────────── mesure X ◄──── [Transmetteur] ◄────────┴─────────────────────────┘
```

## II.2 Définitions à connaître

| Terme | Définition |
|---|---|
| Grandeur réglée | Grandeur que l'on veut maintenir à la consigne (ex. niveau de la cuve). |
| Grandeur réglante | Grandeur sur laquelle agit l'actionneur pour corriger la grandeur réglée (ex. débit d'alimentation). |
| Grandeur perturbatrice (incidente) | Grandeur non commandée qui fait dévier la grandeur réglée (ex. débit de soutirage). |
| Consigne | Valeur désirée de la grandeur réglée. |
| Mesure | Valeur réelle de la grandeur réglée, fournie par le transmetteur. |
| Écart | Consigne − mesure. |
| Commande (sortie) | Signal envoyé par le régulateur à l'actionneur (0–100 %). |
| Boucle ouverte | Le régulateur est en **manuel** : l'opérateur fixe la sortie, la mesure n'influence plus la commande. |
| Boucle fermée | Le régulateur est en **automatique** : la sortie est calculée à partir de l'écart. |
| Procédé stable (auto-réglant) | Après un échelon de commande, la mesure se stabilise à une nouvelle valeur (ex. température, débit). |
| Procédé intégrateur | Après un échelon de commande, la mesure dérive sans se stabiliser (ex. niveau d'une cuve avec soutirage fixe). |
| Erreur statique | Écart résiduel qui subsiste en régime permanent. |
| Dépassement | Amplitude dont la mesure dépasse la consigne lors d'un transitoire, en % de l'échelon. |
| Temps de montée | Temps pour passer de 10 % à 90 % de la variation finale (définition usuelle). |
| Temps de stabilisation | Temps au bout duquel la mesure reste dans une bande (±2 % ou ±5 %) autour de la valeur finale. |
| Pompage | Oscillations entretenues de la boucle (gain trop élevé). |

## II.3 Signaux normalisés et pourcentage d'échelle

Toutes les formules de réglage utilisent des grandeurs en **% d'échelle**. Pour un transmetteur d'échelle \(X_{min}\) à \(X_{max}\) :

\[
X_\% = \frac{X - X_{min}}{X_{max} - X_{min}} \times 100
\]

| Signal | Zéro (0 %) | Pleine échelle (100 %) | Valeur à \(p\) % |
|---|---|---|---|
| Courant | 4 mA | 20 mA | \(4 + 16\,p/100\) mA |
| Pneumatique | 3 PSI | 15 PSI | \(3 + 12\,p/100\) PSI |
| Tension | 0 V | 10 V | \(10\,p/100\) V |

Exemples :

- Sonde 0–200 °C, variation de 20 °C ⇒ \(\Delta X = 20/200 = 10\ \%\).
- Mesure à 150 °C sur 0–200 °C ⇒ 75 % ⇒ 16 mA ⇒ 12 PSI.
- Signal 4–20 mA passant de 8 à 11 mA ⇒ \(\Delta X = 3/16 = 18{,}75\ \%\).

## II.4 Réponse d'un procédé du premier ordre avec retard

La plupart des procédés industriels se modélisent, pour le réglage, par un **premier ordre avec retard** :

- **Gain statique** \(G_s = \Delta X / \Delta Y\) : de combien de % la mesure bouge pour 1 % de commande.
- **Retard (temps mort)** \(t_d\) : temps pendant lequel la mesure ne bouge pas après l'échelon (transport, capteur éloigné).
- **Constante de temps** \(\tau\) (ou \(\theta\)) : temps pour parcourir 63 % de la variation finale une fois que la mesure a commencé à bouger ; après \(3\tau\) on est à 95 %, après \(5\tau\) à 99 %.

Lecture graphique de la courbe de réaction (réponse à un échelon en boucle ouverte) :

```
 X(t)
   │                                  ___________________  ← valeur finale  (ΔX)
   │                           ___---
   │                      __---
   │                   _--           
   │                 -/               tangente au point d'inflexion
   │               -/ 
   │             -/
   ├───────────-/
   │ ←  td  →│← τ →│
   └──────────────────────────────────────────────────────► t
   échelon ΔY appliqué à t = 0
```

- \(t_d\) : de l'échelon jusqu'à l'intersection de la **tangente au point d'inflexion** avec la valeur initiale.
- \(\tau\) : de la fin de \(t_d\) jusqu'à l'intersection de cette tangente avec la valeur finale.
- Vérification : \(X(t_d + \tau) \approx 63\ \%\) de \(\Delta X\).

Rapport \(t_d/\tau\) : plus il est grand, plus le procédé est **difficile à régler** (le retard rend l'anticipation impossible) ; au-delà de \(t_d/\tau \approx 0{,}5\) à 1, on envisage une boucle complexe (tendance, cascade) plutôt qu'un PID musclé.

---
# Partie III — Contrôle PID

## III.1 Le régulateur

**Définition du cours** : un régulateur est un dispositif produisant un signal de sortie en corrigeant l'écart entre la mesure et la consigne. Un régulateur PID est constitué d'un **comparateur** (calcule \(\varepsilon\)) et d'un **correcteur PID** (calcule \(Y\) à partir de \(\varepsilon\)).

### Modes de fonctionnement

| Mode | Qui fixe la sortie ? | Usage |
|---|---|---|
| **Automatique** | Le correcteur PID, à partir de l'écart | Exploitation normale, essais en boucle fermée (Ziegler-Nichols BF, approximations successives) |
| **Manuel** | L'opérateur | Démarrage, dépannage, essais en **boucle ouverte** (courbe de réaction, méthode graphique, Ziegler-Nichols BO) |

Passage manuel → automatique : les régulateurs modernes font un transfert **sans à-coup** (bumpless) en initialisant l'intégrale à la valeur de la sortie manuelle. Quand on bascule, il faut d'abord **égaliser la consigne à la mesure** pour éviter un échelon brutal *(complément)*.

### Sens d'action du régulateur

- **Action directe** : la sortie évolue dans le **même sens** que la mesure (mesure ↑ ⇒ sortie ↑).
- **Action inverse** : la sortie évolue dans le **sens inverse** de la mesure (mesure ↑ ⇒ sortie ↓).

**Règle du cours** : le régulateur doit présenter une **inversion de sens par rapport au procédé**. Si le procédé et le régulateur ont le même sens, la rétroaction devient **positive** : la boucle s'emballe (la mesure fuit vers une butée).

Détermination pratique, en raisonnant sur la chaîne complète **sortie régulateur → vanne → procédé → mesure** :

1. Si la sortie du régulateur augmente, la vanne s'ouvre-t-elle (air ouvre / FMA) ou se ferme-t-elle (air ferme / OMA) ?
2. Si la vanne s'ouvre, la mesure monte-t-elle ou descend-elle ?
3. On en déduit le **sens du procédé vu du régulateur** : commande ↑ ⇒ mesure ↑ = procédé **direct** ; commande ↑ ⇒ mesure ↓ = procédé **inverse**.
4. Le régulateur prend le sens **opposé** : procédé direct ⇒ régulateur **inverse** ; procédé inverse ⇒ régulateur **direct**.

| Exemple | Vanne | Effet de « sortie ↑ » sur la mesure | Procédé vu du régulateur | Régulateur |
|---|---|---|---|---|
| Chauffage d'un bain par vapeur | Air ouvre (FMA) | T ↑ | direct | **inverse** |
| Chauffage d'un bain par vapeur | Air ferme (OMA) | vanne se ferme ⇒ T ↓ | inverse | **direct** |
| Niveau régulé par la vanne d'alimentation | Air ouvre | niveau ↑ | direct | **inverse** |
| Niveau régulé par la vanne de vidange | Air ouvre | niveau ↓ | inverse | **direct** |
| Refroidissement par eau froide | Air ferme (OMA) | vanne se ferme ⇒ T ↑ | direct | **inverse** |
| Pression amont régulée par une vanne d'évent | Air ouvre | P ↓ | inverse | **direct** |

Vérification rapide avec le signe de \(G_s\) : si, lors de l'essai en boucle ouverte, \(\Delta X\) et \(\Delta Y\) sont de même signe (\(G_s > 0\)), le procédé est direct ⇒ régulateur inverse. Si \(G_s < 0\) ⇒ régulateur direct.

## III.2 L'action proportionnelle (P)

\[
Y = \pm K_p\,\varepsilon(t) + Y_0
\qquad\qquad
BP(\%) = \frac{100}{K_p}
\]

- \(K_p\) : gain proportionnel. Le signe \(\pm\) traduit le sens d'action (direct/inverse).
- \(Y_0\) : sortie au repos, c'est-à-dire la valeur de la sortie quand l'écart est nul (souvent 50 % par défaut, ou la valeur manuelle au moment du passage en automatique).
- **Bande proportionnelle** \(BP\) : plage d'écart, en % de l'échelle, qui fait varier la sortie de 0 à 100 %. Une BP de 20 % signifie qu'un écart de 20 % de l'échelle sature la sortie ; \(K_p = 5\).

| \(K_p\) | 0,5 | 1 | 2 | 4 | 10 | 20 |
|---|---|---|---|---|---|---|
| \(BP\) (%) | 200 | 100 | 50 | 25 | 10 | 5 |

Exemple : échelle 0–200 °C, consigne 120 °C, mesure 110 °C, \(K_p = 4\), \(Y_0 = 50\ \%\), régulateur inverse (procédé direct).
\(\varepsilon = (120-110)/200 = 5\ \%\) ⇒ \(Y = 4 \times 5 + 50 = 70\ \%\). La mesure est trop basse, la sortie augmente : cohérent.

**Pourquoi l'action P laisse une erreur statique** : pour maintenir une sortie différente de \(Y_0\) (par exemple 70 % pour compenser des pertes thermiques), il faut en permanence un écart \(\varepsilon = (Y - Y_0)/K_p\) non nul. Plus \(K_p\) est grand, plus cet écart est petit, mais un gain trop grand fait osciller la boucle. L'erreur statique de l'action P ne peut être annulée que par l'action intégrale.

Caractéristiques :

- réaction **immédiate** et proportionnelle à l'écart ;
- **erreur statique** inévitable (sauf \(Y = Y_0\) par hasard) ;
- gain trop grand ⇒ **pompage**.

## III.3 L'action intégrale (I)

\[
Y = K_i\int_0^t \varepsilon(t)\,dt
\qquad\qquad
K_i = \frac{1}{T_i}
\]

- \(T_i\) : **temps intégral** (s ou min). \(T_i\) **petit** ⇒ action I **forte** ; \(T_i \to \infty\) ⇒ action I nulle.
- Interprétation du temps intégral : pour un écart constant, la sortie intégrale varie de \(\varepsilon/T_i\) par unité de temps ; au bout de \(T_i\) elle a varié de \(\varepsilon\) (en structure parallèle avec \(K_i = 1/T_i\)).
- La sortie continue d'évoluer **tant que l'écart n'est pas nul** ⇒ **annule l'erreur statique**.
- Inconvénients : **ralentit** la boucle (déphasage), favorise le **dépassement**, et peut saturer (voir ci-dessous).

Exemple : écart constant \(\varepsilon = 5\ \%\), \(T_i = 20\) s ⇒ \(K_i = 0{,}05\) s⁻¹ ⇒ la sortie augmente de \(0{,}05 \times 5 = 0{,}25\ \%\) par seconde, soit 5 % après 20 s, 15 % après 60 s.

**Saturation de l'intégrale (windup)** *(complément)* : si la vanne est en butée (0 ou 100 %) et que l'écart persiste, l'intégrale continue de croître. Quand la mesure revient enfin, la sortie reste saturée tant que l'intégrale ne s'est pas « dégonflée » ⇒ gros dépassement. Les régulateurs industriels limitent (gèlent) l'intégrale quand la sortie est en butée (anti-windup). À l'examen : c'est une raison de ne pas mettre une action I trop forte sur un procédé qui sature souvent.

## III.4 L'action dérivée (D)

\[
Y = K_d\,\frac{d\varepsilon(t)}{dt}
\]

- \(K_d\) : gain dérivé (homogène à un temps). En structure série on parle de **temps dérivé** \(T_d\).
- Réagit à la **vitesse de variation** de l'écart : plus l'écart change vite, plus la correction est forte, **avant** que l'écart ne soit grand ⇒ effet d'**anticipation** et d'**amortissement** (freine la mesure quand elle fonce vers la consigne).
- N'a **aucun effet en régime permanent** (dérivée nulle quand l'écart est constant) ⇒ ne corrige pas l'erreur statique.
- **Amplifie le bruit** de mesure (une mesure bruitée a une dérivée énorme) ⇒ sortie « nerveuse », usure de la vanne. On ne l'utilise pas sur le débit ou la pression de liquide (mesures bruitées et rapides) ; on l'utilise sur les procédés **lents** (température, pH, certains niveaux).
- Dans les régulateurs industriels, la dérivée est souvent calculée sur la **mesure** plutôt que sur l'écart pour éviter un coup de bélier à chaque changement de consigne, et elle est **filtrée** *(complément)*.

Exemple : écart qui diminue de 2 %/s (la mesure fonce vers la consigne), \(K_d = 3\) s ⇒ contribution \(3 \times (-2) = -6\ \%\) : la dérivée freine.

## III.5 Le régulateur PID complet

### Équation réelle (structure parallèle, celle du cours)

\[
Y(t) = K_p\,\varepsilon(t) + K_i\int_0^t\varepsilon(t)\,dt + K_d\,\frac{d\varepsilon(t)}{dt}
\]

Les trois actions sont **indépendantes** : modifier \(K_p\) ne change pas le poids de I ni de D.

### Autres structures *(complément utile pour lire une fiche de régulateur)*

| Structure | Équation | Lien avec la structure parallèle |
|---|---|---|
| Parallèle (cours) | \(Y = K_p\varepsilon + K_i\int\varepsilon + K_d\,\dot\varepsilon\) | — |
| Mixte (ISA, « idéale ») | \(Y = K_p\left(\varepsilon + \dfrac{1}{T_i}\int\varepsilon + T_d\,\dot\varepsilon\right)\) | \(K_i = \dfrac{K_p}{T_i}\), \(K_d = K_p\,T_d\) |
| Série (interactive) | P, I et D en cascade | conversion un peu plus complexe ; proche de la mixte quand \(T_d \ll T_i\) |

Conséquence pratique : en structure **mixte**, augmenter \(K_p\) renforce aussi les actions I et D ; en structure **parallèle**, non. Les tableaux de Ziegler-Nichols du cours sont exprimés pour la structure utilisée en laboratoire ; si l'on programme un autre régulateur, on convertit avec \(K_i = K_p/T_i\) et \(K_d = K_p T_d\).

Vérification de cohérence des tableaux du cours *(complément)* : les valeurs classiques de Ziegler-Nichols en structure mixte sont, pour un PI, \(K_p = 0{,}45\,G_c\) et \(T_i = T_{osc}/1{,}2\). En parallèle, \(T_i^{par} = T_i^{mixte}/K_p = \dfrac{T_{osc}/1{,}2}{G_c/2{,}2} = \dfrac{1{,}83\,T_{osc}}{G_c}\) : c'est bien la formule \(1{,}8\,T_{osc}/G_c\) du cours. De même, pour le PID, \(T_d^{par} = K_p T_d^{mixte} = 0{,}6\,G_c \cdot T_{osc}/8 = G_c T_{osc}/13{,}3 \approx G_c T_{osc}/13{,}6\). Le tableau BF du cours est donc le tableau de Ziegler-Nichols **converti en structure parallèle**.

### Version discrète (régulateur numérique)

\[
Y_n = K_p\,\varepsilon_n + K_i\sum_{i=0}^{n}\varepsilon_i\,\Delta T + K_d\,\frac{\varepsilon_n - \varepsilon_{n-1}}{\Delta T}
\]

- \(\Delta T\) : période d'échantillonnage (temps entre deux calculs). Elle doit être petite devant la constante de temps du procédé (\(\Delta T \le \tau/10\) en pratique) *(complément)*.
- L'intégrale devient une **somme de rectangles** (aire = écart × durée).
- La dérivée devient la **pente entre deux échantillons**.

**Exemple complet** *(hyp.)* : \(K_p = 2\), \(K_i = 0{,}5\) s⁻¹, \(K_d = 1\) s, \(\Delta T = 1\) s, \(Y_0 = 0\), écart initial avant l'essai nul (\(\varepsilon_{-1} = 0\)). Écarts mesurés : 4, 3, 2, 1, 0, 0 %.

| \(n\) | \(\varepsilon_n\) (%) | \(\sum \varepsilon_i\Delta T\) | \(\dfrac{\varepsilon_n-\varepsilon_{n-1}}{\Delta T}\) | P = \(K_p\varepsilon_n\) | I = \(K_i\sum\) | D = \(K_d\cdot\)pente | \(Y_n\) (%) |
|---|---|---|---|---|---|---|---|
| 0 | 4 | 4 | +4 | 8 | 2 | +4 | 14 |
| 1 | 3 | 7 | −1 | 6 | 3,5 | −1 | 8,5 |
| 2 | 2 | 9 | −1 | 4 | 4,5 | −1 | 7,5 |
| 3 | 1 | 10 | −1 | 2 | 5 | −1 | 6 |
| 4 | 0 | 10 | −1 | 0 | 5 | −1 | 4 |
| 5 | 0 | 10 | 0 | 0 | 5 | 0 | 5 |

Lecture : au pas 0 la dérivée donne un coup de fouet (l'écart vient d'apparaître) ; ensuite elle **freine** (−1) tant que l'écart diminue ; à la fin, l'écart est nul mais la sortie reste à 5 % grâce à l'**intégrale** : c'est elle qui « tient » la nouvelle position de la vanne. Avec un régulateur P seul, la sortie serait revenue à \(Y_0\) et l'écart serait réapparu.

## III.6 Les méthodes de réglage

Le cours présente quatre méthodes. Les deux premières nécessitent de **perturber** le procédé ; les deux autres partent d'une **courbe de réaction** en boucle ouverte.

| Méthode | Mode du régulateur | Ce qu'on relève | Ce qu'on calcule | Pour quel cahier des charges |
|---|---|---|---|---|
| Ziegler-Nichols boucle fermée (pompage) | Automatique, P seul | \(G_c\), \(T_{osc}\) | P / PI / PID (tableau BF) | Réponse rapide, dépassement accepté (amortissement ¼) |
| Ziegler-Nichols boucle ouverte (courbe de réaction) | Manuel | \(G_s\), \(t_d\), \(\tau\) | P / PI / PID (tableau BO) | Idem, sans faire osciller le procédé |
| Graphique avec formule | Manuel | \(G_s\), \(\theta\) + \(\theta_d\) choisi | PI | Pas de dépassement, précision parfaite, temps de réponse imposé |
| Approximations successives | Automatique | Observation des réponses | P puis D puis I, par essais | Sans modèle, réglage fin sur site |

### a) Ziegler-Nichols en boucle fermée (méthode du pompage)

**Principe** : trouver expérimentalement le **point critique de stabilité** du procédé (le gain pour lequel la boucle, avec un régulateur P seul, oscille sans s'amortir ni diverger).

**Étapes** :

1. Mettre le régulateur en **automatique** avec **seulement l'action proportionnelle** (\(T_i = \infty\) ou \(K_i = 0\) ; \(T_d = 0\)).
2. Régler le gain \(G_r\) à **1 ou moins**.
3. **Stabiliser** le procédé autour de la consigne.
4. **Augmenter \(G_r\)** progressivement ; à chaque valeur, appliquer un petit échelon de consigne (ou une petite perturbation) et observer. Continuer **jusqu'à ce que la boucle oscille** de façon **entretenue** (amplitude constante).
5. Relever le **gain critique \(G_c\)** (valeur de \(G_r\) à cet instant) et la **période d'oscillation \(T_{osc}\)** (temps entre deux maxima).
6. Calculer les paramètres avec le tableau BF.

Résultat souhaité (oscillation entretenue) :

```
 X(t)        /\        /\        /\        /\
   ─────────/  \      /  \      /  \      /  \      ← amplitude constante
           /    \    /    \    /    \    /    \
          /      \  /      \  /      \  /      \
                  \/        \/        \/        \/
             │←────── Tosc ──────►│
```

- Oscillation **amortie** (amplitude qui diminue) ⇒ \(G_r\) trop faible, augmenter.
- Oscillation **divergente** (amplitude qui augmente) ⇒ \(G_r\) trop fort, réduire immédiatement.

**Exemple chiffré** *(hyp.)* : la boucle oscille de façon entretenue pour \(G_c = 4\) avec \(T_{osc} = 20\) s.

| | P | PI | PID |
|---|---|---|---|
| \(G_r\) | \(4/2 = 2\) | \(4/2{,}2 = 1{,}82\) | \(4/1{,}7 = 2{,}35\) |
| \(T_i\) | — | \(1{,}8\times20/4 = 9\) s | \(0{,}85\times20/4 = 4{,}25\) s |
| \(T_d\) | — | — | \(4\times20/13{,}6 = 5{,}88\) s |

**Avantages** : pas besoin de modèle ; tient compte de toute la boucle (vanne, capteur).
**Inconvénients / limites** : il faut accepter de faire **osciller** le procédé (interdit sur certains procédés : réacteurs, chaudières) ; le réglage obtenu est « nerveux » (amortissement ≈ ¼, dépassement important) et doit souvent être adouci (réduire \(G_r\), augmenter \(T_i\)) ; difficile sur les procédés très lents (un essai peut durer des heures).

### b) Ziegler-Nichols en boucle ouverte (courbe de réaction)

**Étapes** :

1. Mettre le régulateur en **manuel**.
2. **Stabiliser** le procédé autour de la consigne (la mesure ne bouge plus).
3. Appliquer un **échelon \(\Delta Y\)** sur la commande (quelques %, assez grand pour sortir du bruit, assez petit pour rester dans la zone linéaire).
4. **Enregistrer** la mesure jusqu'à la nouvelle stabilisation et relever :
   - \(\Delta X\) : variation finale de la mesure, convertie **en % d'échelle du transmetteur** ;
   - \(t_d\) : **retard** ;
   - \(\tau\) : **constante de temps** (voir la construction de la tangente en II.4).
5. Calculer \(G_s = \Delta X / \Delta Y\) puis appliquer le tableau BO.

**Exemple chiffré** (exercice du cours, sonde 0–200 °C, valeurs lues *(hyp.)*) : \(\Delta Y = 20\ \%\) ; la température passe de 80 à 120 °C ⇒ \(\Delta X = 40\) °C \(= 40/200 = 20\ \%\) ; \(t_d = 10\) s ; \(\tau = 60\) s.

- \(G_s = 20/20 = 1\).
- P : \(K_p = \tau/(t_d G_s) = 60/(10\times1) = 6\).
- PI : \(K_p = 0{,}9\times60/10 = 5{,}4\) ; \(T_i = 10/0{,}3 = 33{,}3\) s.
- PID : \(K_p = 1{,}2\times60/10 = 7{,}2\) ; \(T_i = 10/0{,}5 = 20\) s ; \(T_d = 10/2 = 5\) s.
- Sens d'action : \(\Delta X\) et \(\Delta Y\) positifs ⇒ procédé direct ⇒ régulateur **inverse**.

**Avantages** : pas d'oscillation du procédé ; un seul essai ; donne aussi le sens d'action et le modèle du procédé.
**Inconvénients** : il faut un procédé **stable** (auto-réglant) et un enregistrement propre ; la lecture graphique de \(t_d\) et \(\tau\) est imprécise si la courbe est bruitée ; réglage encore « nerveux » (dépassement).

Remarque *(complément)* : si \(t_d\) est très petit, les formules donnent un gain énorme ; on plafonne alors le gain à une valeur raisonnable ou on utilise la méthode graphique.

### c) Méthode graphique avec formule (réglage sur cahier des charges)

**Étapes de relevé** : identiques à la boucle ouverte (manuel, stabilisation, échelon \(\Delta Y\)). On relève \(\Delta X\), \(\Delta Y\) et \(\theta\) (constante de temps du procédé).

**Calcul** :

1. Gain statique : \(G_s = \dfrac{\Delta X}{\Delta Y}\).
2. Choisir le **temps de réponse désiré** \(\theta_d\) à partir du cahier des charges. La boucle fermée réglée ainsi se comporte comme un premier ordre de constante de temps \(\theta_d\) : \(t_{63\%} = \theta_d\), \(t_{95\%} = 3\theta_d\).
3. Régulateur **PI** (structure parallèle) :

\[
G_r = \frac{1}{G_s}\cdot\frac{\theta}{\theta_d}
\qquad\qquad
T_i = G_s\,\theta_d
\]

**Interprétation** *(complément)* : l'action intégrale « compense » la constante de temps du procédé (le zéro du PI annule le pôle du procédé) et le gain impose la rapidité désirée. Résultat : réponse du premier ordre, **sans dépassement**, **sans erreur statique** (grâce à I). Plus on veut aller vite (\(\theta_d\) petit), plus \(G_r\) est grand : la limite est la saturation de la vanne et le bruit.

**Exercice du cours** : « précision parfaite, temps de réponse à 95 % inférieur à 8 s, sans aucun dépassement ; régulateur PID de structure parallèle ; déterminer le sens d'action ».

- Précision parfaite ⇒ **action I** obligatoire.
- Sans dépassement ⇒ pas de Ziegler-Nichols (amortissement ¼) ; on utilise la **méthode graphique** ⇒ structure **PI**, \(T_d = 0\) (\(K_d = 0\)).
- \(t_{95\%} = 3\theta_d < 8\) s ⇒ \(\theta_d < 2{,}67\) s. On prend par exemple \(\theta_d = 2{,}5\) s (marge).
- Sur la courbe de réaction fournie : \(G_s = \Delta X/\Delta Y\), \(\theta\) = constante de temps.
- \(G_r = \dfrac{1}{G_s}\cdot\dfrac{\theta}{2{,}5}\), \(T_i = 2{,}5\,G_s\).
- Sens d'action : si \(G_s > 0\) ⇒ régulateur inverse ; si \(G_s < 0\) ⇒ régulateur direct.

Exemple chiffré *(hyp.)* : \(\Delta Y = 10\ \%\), \(\Delta X = 20\ \%\), \(\theta = 15\) s ⇒ \(G_s = 2\) ; \(G_r = \frac{1}{2}\times\frac{15}{2{,}5} = 3\) ; \(T_i = 2\times2{,}5 = 5\) s ; \(K_i = 0{,}2\) s⁻¹ ; \(K_d = 0\) ; régulateur inverse.

Vérification *(complément)* : avec ce réglage, après un échelon de consigne, la mesure atteint 63 % à 2,5 s, 95 % à 7,5 s (< 8 s ✓), sans dépassement ✓, erreur statique nulle ✓.

### d) Approximations successives (réglage empirique en automatique)

Régulateur en **automatique**. On règle **dans l'ordre : P, puis D, puis I**. Pour chaque essai, on commence lorsque le procédé est **stabilisé à la consigne**, on applique un petit échelon de consigne et on observe la réponse.

**Action proportionnelle** (I et D désactivées) :

- partir d'un gain faible (BP large) ;
- augmenter le gain par paliers ; la réponse passe de « lente et molle » à « oscillatoire » ;
- s'arrêter quand on obtient une réponse légèrement oscillante avec un **rapport d'amplitudes d'environ ¼** entre deux dépassements successifs, puis **réduire un peu** le gain pour garder de la marge.

**Action dérivée** (P réglé, I toujours désactivée) :

- partir de \(T_d = 0\) ;
- augmenter \(T_d\) : le dépassement diminue, la stabilisation est plus rapide ;
- s'arrêter dès que la sortie devient **nerveuse** (bruit amplifié, vanne qui tremble) ; revenir un cran en arrière. Sur un procédé bruité, on laisse \(T_d = 0\).

**Action intégrale** (P et D réglés) :

- partir de \(T_i\) très grand (action nulle) ;
- diminuer \(T_i\) : l'erreur statique disparaît de plus en plus vite ;
- s'arrêter quand les **oscillations réapparaissent** ou que le dépassement devient excessif ; revenir un cran en arrière.

Tableau « ce que je vois ⇒ ce que je fais » :

| Observation après un échelon de consigne | Diagnostic | Correction |
|---|---|---|
| Réponse lente, pas de dépassement, erreur statique | gain trop faible | ↑ \(K_p\) |
| Oscillations entretenues ou divergentes | gain trop fort | ↓ \(K_p\) (ou ↑ \(T_i\) si I active) |
| Dépassement important puis stabilisation | amortissement insuffisant | ↑ \(T_d\) ou ↓ \(K_p\) |
| Erreur statique persistante | pas d'action I ou \(T_i\) trop grand | ↓ \(T_i\) |
| Mesure qui revient très lentement à la consigne | \(T_i\) trop grand | ↓ \(T_i\) |
| Oscillations lentes (période > \(3\,T_{osc}\)) | action I trop forte | ↑ \(T_i\) |
| Sortie qui tremble, vanne qui bat | D trop forte ou mesure bruitée | ↓ \(T_d\) (filtrer la mesure) |

**Avantages** : aucun calcul, pas de modèle, s'adapte au comportement réel ; c'est la méthode du dépanneur.
**Inconvénients** : long (beaucoup d'essais sur un procédé lent), subjectif, nécessite de l'expérience ; on perturbe le procédé à chaque essai.

## III.7 Influence des paramètres PID

| Augmentation de… | Temps de montée | Dépassement | Temps de stabilisation | Erreur statique | Stabilité |
|---|---|---|---|---|---|
| \(K_p\) ↑ (BP ↓) | ↓ | ↑ | peu de changement (puis ↑ si trop fort) | ↓ (jamais nulle avec P seul) | ↓ |
| Action I ↑ (\(T_i\) ↓, \(K_i\) ↑) | ↓ | ↑ | ↑ | **annulée** | ↓ |
| \(T_d\) ↑ (\(K_d\) ↑) | peu de changement (léger ↓) | ↓ | ↓ | aucun effet | ↑ (jusqu'à un certain point) |

Explications :

- **\(K_p\)** : amplifie la correction ⇒ réaction plus vive (montée plus rapide, erreur statique réduite) mais tendance à dépasser et à osciller.
- **I** : pousse la sortie tant qu'il reste de l'écart ⇒ erreur statique nulle, mais la correction continue après le passage de la consigne ⇒ dépassement, et le temps de stabilisation s'allonge.
- **D** : freine quand la mesure va vite ⇒ moins de dépassement, stabilisation plus rapide ; sans effet en régime permanent.

Choix de la structure selon le type de procédé (repères) :

| Procédé | Caractère | Structure conseillée | Réglage typique |
|---|---|---|---|
| Débit | très rapide, bruité | **PI** | gain faible (BP 100–300 %), \(T_i\) court (quelques s), pas de D |
| Pression de liquide | rapide, bruité | **PI** | idem débit |
| Niveau | intégrateur, peu bruité | **P** ou **PI** | gain moyen, \(T_i\) long ; P seul si on tolère une erreur statique (niveau « tampon ») |
| Pression de gaz | moyen | **PI** | gain fort, \(T_i\) moyen |
| Température | lent, retard | **PID** | gain moyen, \(T_i\) long (min), \(T_d \approx T_i/4\) |
| pH, composition | non linéaire, retard | PI « doux » ou boucle complexe (adaptative) | |
| Grand retard pur (\(t_d > \tau\)) | difficile | PI doux, tendance, cascade | |

## III.8 Contrôle PID avancé (boucles complexes)

### Limites du PID simple (boucle unique)

- Procédé à **caractéristique non symétrique ou non linéaire** (le gain change selon le point de fonctionnement ou le sens de variation).
- **Impossibilité de corriger l'erreur rapidement et/ou complètement** : la perturbation agit avant que le régulateur ne la voie (retard), ou l'actionneur n'a pas assez d'autorité.

Pour corriger ces lacunes, on implante une **boucle plus complexe**, choisie en fonction du **dysfonctionnement** constaté :

| Problème rencontré | Régulation à envisager |
|---|---|
| Grandeur réglante perturbée | **Cascade** (sur grandeur réglante) |
| Grandeur intermédiaire, en amont de la grandeur réglée, perturbée et régulable | **Cascade** (sur grandeur intermédiaire) |
| Grandeur incidente non régulée qui perturbe la grandeur réglée | **Tendance** ou **mixte** |
| Grandeur réglante inefficace / insuffisante | **Partage d'échelle** |
| Procédé non linéaire / non symétrique | **Adaptative** |

### a) Régulation cascade à 2 éléments (sur la grandeur réglante)

**Principe** : deux régulateurs imbriqués. Le régulateur **maître** mesure la grandeur réglée principale (ex. **niveau**) ; sa sortie n'attaque pas la vanne mais devient la **consigne** du régulateur **esclave**, qui mesure la grandeur réglante (ex. **débit** d'alimentation) et commande la vanne.

```
 consigne niveau ─►[Régulateur MAÎTRE (LC)]─► consigne débit ─►[Régulateur ESCLAVE (FC)]─► vanne ─► débit ─► cuve ─► niveau
                            ▲                                           ▲                       │               │
                            │                                           └── mesure débit (FT) ◄──┘               │
                            └──────────────────────────────── mesure niveau (LT) ◄───────────────────────────────┘
```

**Rôle de l'esclave** :

- **filtre les fluctuations du débit** (variation de pression d'alimentation, caractéristique de vanne non linéaire, frottements de tige) avant qu'elles n'atteignent le niveau ;
- **améliore les performances dynamiques** (la boucle interne est rapide et linéarise la vanne vue du maître).

**Inconvénients** : nécessite **une boucle supplémentaire** (transmetteur + régulateur ⇒ coût) ; **plus complexe à utiliser** (deux réglages, modes de fonctionnement maître/esclave, mise en cascade).

**Quand l'utiliser** : la **grandeur réglante elle-même est perturbée** (pression de vapeur fluctuante, pompe partagée, vanne à faible autorité).

**Mise en service** *(complément)* : régler d'abord l'**esclave** (maître en manuel) avec une méthode classique, puis le maître (esclave en automatique, en cascade). L'esclave doit être nettement **plus rapide** que le maître (rapport 3 à 5 au moins), sinon les deux boucles interagissent.

### b) Régulation cascade à 3 éléments (sur une grandeur intermédiaire)

**Principe** : même structure, mais la grandeur réglée de l'esclave n'est pas la grandeur réglante : c'est une **grandeur intermédiaire** entre la grandeur réglante et la grandeur réglée principale. Exemple du cours : deux cuves en série, maître = **niveau 1**, esclave = **niveau 2**. On dispose de trois mesures : grandeur principale, grandeur intermédiaire, grandeur réglante.

**Rôle de l'esclave** : filtre les **fluctuations rapides** de la grandeur intermédiaire ; améliore les performances dynamiques.

**Inconvénients** : nécessite **2 boucles supplémentaires** (coût) ; **beaucoup plus complexe** à utiliser.

**Quand l'utiliser** : procédés **en série** avec un étage intermédiaire mesurable et régulable (cuves en cascade, niveau de ballon de chaudière avec débit vapeur et débit d'eau, température de sortie de four avec température de fumées).

### c) Régulation de tendance (anticipative, feedforward) et régulation mixte

**Principe** : corriger l'**effet prédit** d'une perturbation **avant** qu'elle n'apparaisse sur la grandeur réglée, et non après. On **mesure la perturbation** (ex. le 2e débit qui entre dans la cuve) et un **correcteur de tendance** ajuste directement la commande. Dans l'exemple du cours : régulateur de niveau en **boucle fermée** + régulateur (correcteur) de débit en **boucle ouverte**. L'association des deux est la régulation **mixte**.

```
 perturbation mesurée (FT2) ──►[Correcteur de tendance]──┐
                                                         (+)──► vanne ─► procédé ─► niveau
 consigne ─►[Régulateur de niveau (boucle fermée)]───────┘                     │
                 ▲                                                             │
                 └─────────────────────────── mesure niveau ◄──────────────────┘
```

**Avantages** : filtre les fluctuations du 2e débit ; améliore les performances dynamiques (on n'attend pas que l'écart apparaisse).

**Inconvénients** : nécessite **1 transmetteur supplémentaire** ; **difficile de configurer le correcteur de tendance** (il faut connaître le gain et la dynamique entre la perturbation et la grandeur réglée ; une erreur de modèle se traduit par une sur- ou sous-correction, que la boucle fermée doit rattraper).

**Quand l'utiliser** : perturbation **mesurable mais non régulable**, sur un procédé **lent** où la boucle fermée seule réagit trop tard (soutirage variable sur un niveau, variation de charge d'une chaudière, température extérieure sur un chauffage).

Pourquoi garder la boucle fermée (mixte) : la tendance seule (boucle ouverte) ne corrige pas les perturbations non mesurées ni les erreurs de modèle ; la boucle fermée reste indispensable pour la précision finale.

### d) Régulation à partage d'échelle antagoniste (split-range)

**Principe** : un **seul régulateur** commande **deux actionneurs à effets opposés** en divisant l'échelle de sa sortie. Exemple : sortie 0–50 % ⇒ vanne de vidange (de 100 % à 0 %), sortie 50–100 % ⇒ vanne de remplissage (de 0 % à 100 %). Permet de réguler un procédé avec **deux régimes transitoires différents**.

```
 sortie régulateur (%)   0 ─────────────── 50 ─────────────── 100
 vanne A (refroidir/vider) 100 % ───────► 0 %      fermée
 vanne B (chauffer/remplir)   fermée      0 % ────────► 100 %
```

Exemple numérique (sortie 4–20 mA) *(hyp.)* : 4–12 mA ⇒ vanne froide de 100 % à 0 % ; 12–20 mA ⇒ vanne chaude de 0 % à 100 %. Pour une sortie de 14 mA : vanne chaude ouverte à \((14-12)/8 = 25\ \%\), vanne froide fermée. Pour 6 mA : vanne froide à \((12-6)/8 = 75\ \%\), vanne chaude fermée.

**Avantage** : bonne gestion d'un procédé **asynchrone** (chauffer est lent, refroidir est rapide, ou l'inverse).

**Inconvénients** : nécessite **2 actionneurs** (vannes, variateurs…) ; requiert une **bonne connaissance du procédé** pour configurer un bon partage (point de bascule, éventuelle **bande morte** autour de 50 % pour éviter que les deux vannes soient ouvertes en même temps et gaspillent de l'énergie).

**Quand l'utiliser** : la grandeur réglante est **inefficace dans un sens** : température (chaud/froid), pH (acide/base), pression (admission/évent), niveau (remplissage/vidange).

### e) Régulation à partage d'échelle complémentaire

**Principe** : deux actionneurs agissant **dans le même sens** mais de **capacités différentes** (petite vanne de précision + grosse vanne de capacité), commandés en séquence par un seul régulateur : la petite vanne travaille seule aux faibles débits, la grosse prend le relais pour les grands débits.

```
 sortie régulateur (%)   0 ─────────────── 50 ─────────────── 100
 petite vanne (Cv faible)  0 % ──────────► 100 %   reste ouverte
 grosse vanne (Cv élevé)      fermée        0 % ──────────► 100 %
```

**Avantage** : **bonne précision** de la variable réglante sur une très grande plage de débit (on dépasse la rangeabilité d'une seule vanne).

**Inconvénients** : nécessite **2 actionneurs avec des caractéristiques différentes** ; requiert une **bonne connaissance des actionneurs** (\(C_V\), points de transition) pour configurer un bon partage.

**Quand l'utiliser** : plage de débit trop large pour une seule vanne (démarrage à très faible débit puis régime nominal élevé), réglage fin + gros débit.

### f) Régulation adaptative

**Principe** : un **bloc de calcul** modifie en temps réel les paramètres du régulateur (surtout le gain) en fonction du point de fonctionnement, pour que le gain de boucle \(G_r \times G_s\) reste constant : si le gain du procédé double, le gain du régulateur est divisé par deux. Permet de réguler des systèmes dont le **gain de procédé varie**.

**Avantage** : **linéarise** le comportement du procédé (même qualité de régulation à bas et à haut régime).

**Inconvénients** : nécessite **1 bloc de calcul** ; requiert une **bonne connaissance du procédé** pour configurer la relation entre le gain et le point de fonctionnement.

**Quand l'utiliser** : procédé **non linéaire / non symétrique** : pH (courbe de titrage), cuve à section variable (cône), échangeur dont le gain dépend du débit, vanne à caractéristique déformée.

Exemple *(hyp.)* : un échangeur a un gain \(G_s = 4\) à faible charge et \(G_s = 1\) à forte charge. Avec un gain fixe \(G_r = 1\), la boucle est nerveuse à faible charge (gain de boucle 4) et molle à forte charge (1). Un bloc adaptatif applique \(G_r = 2/G_s\) : gain de boucle constant = 2.

### Résumé des boucles complexes

| Situation | Solution | Matériel ajouté | Difficulté principale |
|---|---|---|---|
| Grandeur réglante qui fluctue | Cascade 2 éléments | 1 transmetteur + 1 régulateur | deux réglages, esclave rapide |
| Étage intermédiaire régulable perturbé | Cascade 3 éléments | 2 boucles | complexité |
| Perturbation mesurable non régulable | Tendance / mixte | 1 transmetteur + correcteur | configuration du correcteur |
| Agir dans deux sens opposés | Partage d'échelle antagoniste | 2 actionneurs opposés | point de bascule, bande morte |
| Plage de débit trop large | Partage d'échelle complémentaire | 2 actionneurs de tailles différentes | points de transition |
| Gain du procédé variable | Adaptative | 1 bloc de calcul | relation gain ↔ procédé |

## III.9 Laboratoire 2 — réglage d'une boucle de niveau par la méthode en boucle ouverte

Procédure type (à adapter au banc) :

1. Mettre le régulateur en **manuel**, ouvrir la vanne pour amener le niveau à la consigne et attendre la **stabilisation** (débit entrant = débit sortant).
2. Noter la sortie \(Y_1\) et la mesure \(X_1\) (en %).
3. Appliquer un **échelon** \(\Delta Y\) de 5 à 10 % sur la sortie ; lancer l'enregistrement.
4. Attendre la nouvelle stabilisation (si le niveau ne se stabilise pas, le procédé est **intégrateur** : on mesure alors la pente et on utilise \(t_d\) et la pente comme dans la méthode pour intégrateur *(complément)*).
5. Tracer la tangente au point d'inflexion ; relever \(t_d\), \(\tau\), \(\Delta X\) (en %).
6. Calculer \(G_s\), puis \(K_p\), \(T_i\), \(T_d\) avec le tableau BO.
7. Programmer le régulateur (vérifier la structure : parallèle ou mixte, unités de \(T_i\) en s ou min, sens d'action).
8. Repasser en **automatique** après avoir aligné la consigne sur la mesure ; appliquer un échelon de consigne et vérifier la réponse ; **adoucir** si nécessaire (approximations successives).

Points de vigilance : échelle du transmetteur pour la conversion en % ; sens d'action du régulateur ; vanne air ouvre / air ferme ; ne pas changer la consigne pendant l'enregistrement ; bien attendre la stabilisation avant l'échelon.

---
# Partie IV — Pertes de charge

## IV.1 Théorie

**Définition du cours** : les pertes de charge sont des **chutes de pression** dues à la **résistance** que rencontrent les fluides en écoulement.

Deux familles :

- **Linéiques** (ou régulières, réparties) : pertes dues à l'écoulement **le long des conduites** (frottement du fluide sur la paroi et frottement interne du fluide). Elles dépendent de la **vitesse** du fluide et de la **rugosité relative** de la conduite (et du régime d'écoulement).
- **Singulières** (ou locales) : elles se manifestent sur les **pièces spéciales** qui modifient la **direction** ou la **section** de passage du fluide (coudes, tés, raccords, réductions, vannes, crépines, entrées et sorties de réservoir). Elles correspondent à des **obstructions partielles**. Chaque singularité possède un **coefficient de perte de charge** \(\xi\).

Les pertes totales d'un circuit s'additionnent :

\[
\Delta P_{tot} = \sum \Delta P_{lin} + \sum \Delta P_{sing}
\]

**Pourquoi c'est important en régulation** : la perte de charge du circuit détermine la pression disponible aux bornes de la vanne (\(\Delta P_v\)), donc son \(C_V\), son autorité, son risque de cavitation et la hauteur de pompe nécessaire.

### Notion de charge *(complément)*

La « charge » est l'énergie mécanique du fluide par unité de poids, exprimée en mètres de colonne de fluide : \(H = \dfrac{P}{\rho g} + \dfrac{v^2}{2g} + z\). Le théorème de Bernoulli généralisé entre deux points 1 et 2 d'une conduite s'écrit :

\[
\frac{P_1}{\rho g} + \frac{v_1^2}{2g} + z_1 + H_{pompe} = \frac{P_2}{\rho g} + \frac{v_2^2}{2g} + z_2 + \Delta h_{1\to2}
\]

Les pertes de charge \(\Delta h\) sont le terme qui « manque » : elles se traduisent par une baisse de pression si la vitesse et l'altitude ne changent pas (\(\Delta P = \rho g \Delta h\)).

## IV.2 Pertes linéiques

\[
\Delta P = f\,\frac{L}{D}\cdot\frac{1}{2}\rho v^2
\qquad\qquad
\Delta h = f\,\frac{L}{D}\cdot\frac{v^2}{2g}
\qquad\qquad
\Delta P = \rho g\,\Delta h
\]

| Symbole | Signification | Unité SI |
|---|---|---|
| \(f\) | coefficient de frottement (Darcy) | — |
| \(L\) | longueur de la conduite | m |
| \(D\) | diamètre **intérieur** de la conduite | m |
| \(\rho\) | masse volumique du fluide | kg/m³ |
| \(v\) | vitesse moyenne du fluide | m/s |
| \(\frac12\rho v^2\) | énergie cinétique par unité de volume (pression dynamique) | Pa |
| \(g\) | accélération gravitationnelle | 9,81 m/s² |
| \(\Delta h\) | perte de hauteur manométrique (de charge) | m de colonne de fluide |

Observations :

- \(\Delta P\) est proportionnelle à \(L\) : doubler la longueur double la perte.
- \(\Delta P\) est proportionnelle à \(v^2\) : doubler le débit (dans la même conduite) **quadruple** la perte.
- À débit fixé, \(v \propto 1/D^2\), donc \(\Delta P \propto 1/D^5\) : passer d'un diamètre de 20 mm à 25 mm divise la perte par \((25/20)^5 \approx 3\). Le diamètre est le levier le plus puissant.
- Pour l'eau, une perte de hauteur de 10,2 m correspond à 1 bar ; en imposant une limite usuelle de 1 à 3 m/s en vitesse, on limite les pertes et le bruit.

## IV.3 Le coefficient de frottement \(f\)

C'est **le plus difficile à déterminer**. Il dépend de la **rugosité relative** de la conduite et du **régime d'écoulement**.

### Étape 1 — Rugosité relative

\[
\text{Rugosité relative} = \frac{\epsilon}{D}
\]

\(\epsilon\) : épaisseur (hauteur) des aspérités de la paroi ; \(D\) : diamètre de la conduite. Les deux dans la même unité.

| Matériau | \(\epsilon\) (mm) *(hyp., valeurs usuelles)* |
|---|---|
| Verre, PVC, plastiques, cuivre et laiton étirés | 0,0015 |
| Acier inoxydable poli | 0,002–0,01 |
| Acier commercial neuf, acier soudé | 0,045 |
| Acier galvanisé | 0,15 |
| Fonte neuve | 0,26 |
| Fonte usagée, acier rouillé | 1 à 1,5 |
| Béton lisse / rugueux | 0,3 / 3 |

### Étape 2 — Nombre de Reynolds

\[
Re = \frac{\rho v D}{\mu}
\]

\(\mu\) : **viscosité dynamique** du fluide (Pa·s = kg/(m·s)). Pour l'eau à 20 °C, \(\mu \approx 1{,}0\times10^{-3}\) Pa·s = 1 mPa·s = 1 cP. On peut aussi écrire \(Re = vD/\nu\) avec \(\nu = \mu/\rho\) la viscosité cinématique (m²/s) *(complément)*.

| \(Re\) | Régime | \(f\) |
|---|---|---|
| \(< 2000\) | **laminaire** (écoulement en couches parallèles) | \(f = 64/Re\), indépendant de la rugosité *(complément)* |
| 2000 – 4000 | transition (instable) | mal défini, on prend le cas turbulent par sécurité |
| \(> 4000\) | **turbulent** (tourbillons) | Colebrook / abaque de Moody ; dépend de \(\epsilon/D\) et de \(Re\) |

Dans la quasi-totalité des installations industrielles d'eau, l'écoulement est turbulent (\(Re\) de \(10^4\) à \(10^6\)).

### Étape 3 — Équation de Colebrook (turbulent)

\[
\frac{1}{\sqrt f} = -2\log_{10}\left[\frac{\epsilon/D}{3{,}7} + \frac{2{,}51}{Re\sqrt f}\right]
\]

Elle est **implicite** (\(f\) apparaît des deux côtés) : on la résout par **itérations**.

Procédure : partir de \(f_0 = 0{,}02\) ; calculer le membre de droite avec \(f_0\) ; en déduire \(f_1 = 1/(\text{résultat})^2\) ; recommencer avec \(f_1\) ; arrêter quand \(f\) ne change plus à la 3e décimale (2 à 3 itérations suffisent).

**Exemple** : \(Re = 57\,600\), \(\epsilon/D = 7{,}5\times10^{-5}\).

- \(f_0 = 0{,}02\) : \(\sqrt{f_0} = 0{,}1414\) ; \(\dfrac{\epsilon/D}{3{,}7} = 2{,}03\times10^{-5}\) ; \(\dfrac{2{,}51}{57\,600\times0{,}1414} = 3{,}08\times10^{-4}\) ; somme \(= 3{,}28\times10^{-4}\) ; \(\log_{10} = -3{,}484\) ; \(1/\sqrt f = 6{,}97\) ⇒ \(f_1 = 0{,}0206\).
- \(f_1 = 0{,}0206\) : \(\sqrt{f_1} = 0{,}1435\) ; \(2{,}51/(57\,600\times0{,}1435) = 3{,}04\times10^{-4}\) ; somme \(= 3{,}24\times10^{-4}\) ; \(\log_{10} = -3{,}490\) ; \(1/\sqrt f = 6{,}98\) ⇒ \(f_2 = 0{,}0205\). Convergé : **\(f \approx 0{,}0205\)**.

**Formule explicite de Swamee-Jain** *(complément, pour vérifier sans itérer)* :

\[
f = \frac{0{,}25}{\left[\log_{10}\left(\dfrac{\epsilon/D}{3{,}7} + \dfrac{5{,}74}{Re^{0{,}9}}\right)\right]^2}
\]

Avec les mêmes données : \(Re^{0{,}9} = 19\,260\) ; \(5{,}74/19\,260 = 2{,}98\times10^{-4}\) ; somme \(3{,}18\times10^{-4}\) ; \(\log_{10} = -3{,}497\) ; \(f = 0{,}25/12{,}23 = 0{,}0204\). Écart < 1 % avec Colebrook.

Cas limites utiles *(complément)* :

- Conduite **lisse** (\(\epsilon/D \to 0\)) : \(f\) ne dépend que de \(Re\) (≈ 0,02 pour \(Re = 10^5\), ≈ 0,012 pour \(Re = 10^6\)).
- Turbulence **pleinement rugueuse** (\(Re\) très grand) : \(f\) ne dépend que de \(\epsilon/D\) : \(\dfrac{1}{\sqrt f} = -2\log_{10}\dfrac{\epsilon/D}{3{,}7}\) (ex. \(\epsilon/D = 0{,}001\) ⇒ \(f = 0{,}0196\)).

**Dans le cours, le coefficient de frottement est fourni.** La démarche Colebrook sert à comprendre d'où il vient et à vérifier un ordre de grandeur (pour l'eau dans des tuyaux usuels, \(f\) est typiquement compris entre 0,015 et 0,04).

## IV.4 Les abaques

Si \(f\) n'est pas fourni, on utilise les **abaques des conduites** (abaque de pertes de charge du fabricant ou abaque général par matériau). Ils donnent la **perte de hauteur par unité de longueur** (m/m, mm/m, ou pi d'eau par 100 pi) en fonction du **débit** (ou de la **vitesse \(v\)**) et du **diamètre \(D\)**.

Mode d'emploi :

1. Repérer le débit (ou la vitesse) sur un axe et le diamètre sur la famille de droites obliques.
2. Lire à l'intersection la perte unitaire \(j\) (ex. 0,13 m/m) et, souvent, la vitesse.
3. Multiplier par la longueur : \(\Delta h = j \times L\).
4. Convertir si besoin : \(\Delta P = \rho g \Delta h\).

Unités impériales fréquentes : perte en **pieds d'eau par 100 pieds de conduite** ; 1 pi d'eau = 0,433 PSI = 2989 Pa ; 1 PSI = 2,31 pi d'eau.

L'**abaque de Moody** *(complément)* est un autre type d'abaque : il donne directement \(f\) en fonction de \(Re\) (abscisse log) et de \(\epsilon/D\) (famille de courbes). C'est la représentation graphique de Colebrook.

## IV.5 Pertes singulières

\[
\Delta P = \xi\,\frac{1}{2}\rho v^2
\qquad\qquad
\Delta h = \xi\,\frac{v^2}{2g}
\]

\(\xi\) (ksi, parfois noté \(K\)) : coefficient de perte de charge **en fonction de la forme de la singularité**, obtenu dans des **tableaux**. Il est sans unité et représente le nombre de « pressions dynamiques » perdues.

Si plusieurs singularités sont sur une conduite de même diamètre (même \(v\)), on additionne les coefficients : \(\Delta P_{sing} = \left(\sum\xi\right)\frac12\rho v^2\). Si le diamètre change, on calcule chaque singularité avec la vitesse de sa propre conduite (par convention, la vitesse en aval pour les changements de section) *(complément)*.

Coefficients indicatifs *(hyp. — utiliser le tableau du cours s'il est fourni)* :

| Singularité | \(\xi\) |
|---|---|
| Entrée de conduite à arêtes vives (sortie d'un réservoir) | 0,5 |
| Entrée arrondie | 0,04–0,1 |
| Entrée saillante (tuyau qui dépasse dans le réservoir) | 1,0 |
| Sortie dans un réservoir (élargissement total) | 1,0 |
| Coude 90° normal (rayon standard) | 0,75 |
| Coude 90° grand rayon | 0,45 |
| Coude 90° à angle vif (onglet) | 1,3 |
| Coude 45° | 0,4 |
| Té, passage direct | 0,4 |
| Té, dérivation (passage dans la branche) | 1,3–1,8 |
| Élargissement brusque de \(A_1\) à \(A_2\) (avec \(v_1\)) | \((1 - A_1/A_2)^2\) |
| Rétrécissement brusque (avec \(v_2\)) | \(\approx 0{,}5\,(1 - A_2/A_1)\) |
| Robinet à bille (plein passage) ouvert | 0,05–0,1 |
| Robinet-vanne (à opercule) ouvert | 0,15–0,2 |
| Robinet-vanne à moitié fermé | 2–5 |
| Robinet à soupape (globe) ouvert | 6–10 |
| Robinet à papillon ouvert | 0,3–0,5 |
| Clapet antiretour à battant | 2–2,5 |
| Crépine | 2–3 |
| Compteur d'eau, filtre | 5–10 (voir fabricant) |

Ordre de grandeur à retenir : un **robinet à soupape** vaut autant qu'une dizaine de coudes ; un **robinet à bille** ne compte presque pas.

**Méthode des longueurs équivalentes** *(complément)* : certains tableaux donnent pour chaque singularité une longueur de conduite droite \(L_{eq}\) produisant la même perte ; on ajoute alors ces longueurs à \(L\) dans la formule linéique : \(L_{eq} = \xi D/f\). Ex. coude 90° (\(\xi = 0{,}75\)) sur une conduite DN 50 avec \(f = 0{,}02\) ⇒ \(L_{eq} = 0{,}75\times0{,}05/0{,}02 = 1{,}9\) m.

## IV.6 Démarche type de calcul

1. **Relever** les données : fluide (température ⇒ \(\rho\), \(\mu\)), débit \(Q\), diamètre **intérieur** \(D\), longueur \(L\), matériau (⇒ \(\epsilon\) ou \(f\) fourni), liste des singularités (⇒ \(\xi\)).
2. **Convertir** en SI : \(Q\) en m³/s (1 GPM = \(6{,}309\times10^{-5}\) m³/s ; 1 L/s = \(10^{-3}\) m³/s ; 1 m³/h = \(2{,}778\times10^{-4}\) m³/s), \(D\) et \(L\) en m.
3. **Vitesse** : \(A = \pi D^2/4\), \(v = Q/A\). Vérifier l'ordre de grandeur (0,5 à 3 m/s pour l'eau).
4. **Pression dynamique** : \(\frac12\rho v^2\) (Pa).
5. **Coefficient \(f\)** : fourni, ou \(Re\) + Colebrook / abaque.
6. **Perte linéique** : \(\Delta P_{lin} = f\dfrac{L}{D}\cdot\frac12\rho v^2\).
7. **Pertes singulières** : \(\Delta P_{sing} = \left(\sum\xi\right)\frac12\rho v^2\).
8. **Total** : \(\Delta P_{tot}\), puis conversion dans l'unité demandée (bar, PSI, m de colonne d'eau : \(\Delta h = \Delta P/(\rho g)\)).
9. **Vérifier** : signe, unités, ordre de grandeur (une conduite d'eau bien dimensionnée perd typiquement 0,1 à 0,5 bar par 100 m).

## IV.7 Exercice du cours résolu — conduite en cuivre

**Énoncé A** : calculer les pertes de charge d'une conduite en cuivre de **22-20 mm** (diamètre extérieur 22 mm, intérieur 20 mm) dans laquelle circule de l'eau à **50 °C** à un débit de **7,94 GPM**. La conduite mesure **328 pieds**.
**Énoncé B** : sur ce même circuit, on ajoute **2 coudes normaux à 90°** et **un robinet à bille**.

Données *(hyp. : propriétés de l'eau et coefficients tirés des tables ; si l'énoncé fournit \(f\) et \(\xi\), les utiliser)* : \(\rho_{50°C} = 988\) kg/m³, \(\mu_{50°C} = 5{,}47\times10^{-4}\) Pa·s, \(\epsilon_{cuivre} = 0{,}0015\) mm, \(\xi_{coude\ 90°\ normal} = 0{,}75\), \(\xi_{robinet\ à\ bille} = 0{,}1\).

**1. Conversions**

- \(Q = 7{,}94\ \text{GPM}\times3{,}785\ \text{L/gal} = 30{,}05\) L/min \(= 0{,}501\) L/s \(= 5{,}01\times10^{-4}\) m³/s.
- \(L = 328\ \text{pi}\times0{,}3048 = 100{,}0\) m.
- \(D = 20\) mm \(= 0{,}020\) m (diamètre **intérieur**).

**2. Vitesse**

- \(A = \pi D^2/4 = \pi(0{,}020)^2/4 = 3{,}142\times10^{-4}\) m².
- \(v = Q/A = 5{,}01\times10^{-4}/3{,}142\times10^{-4} = 1{,}59\) m/s (ordre de grandeur correct).

**3. Pression dynamique** : \(\frac12\rho v^2 = 0{,}5\times988\times1{,}59^2 = 1256\) Pa.

**4. Coefficient de frottement**

- \(Re = \dfrac{988\times1{,}59\times0{,}020}{5{,}47\times10^{-4}} \approx 57\,600\) ⇒ turbulent.
- \(\epsilon/D = 0{,}0015/20 = 7{,}5\times10^{-5}\) (conduite quasi lisse).
- Colebrook (voir IV.3) ⇒ \(f \approx 0{,}0205\).

**5. A — Perte linéique**

\[
\Delta P = f\frac{L}{D}\cdot\frac12\rho v^2 = 0{,}0205\times\frac{100}{0{,}020}\times1256 = 0{,}0205\times5000\times1256 \approx 128{,}9\ \text{kPa}
\]

Soit **≈ 1,29 bar ≈ 18,7 PSI**. En hauteur : \(\Delta h = \Delta P/(\rho g) = 128\,900/(988\times9{,}81) \approx 13{,}3\) m de colonne d'eau (ou \(\Delta h = f\frac{L}{D}\frac{v^2}{2g} = 0{,}0205\times5000\times\frac{1{,}59^2}{19{,}62} = 13{,}2\) m).

**6. B — Pertes singulières**

- \(\sum\xi = 2\times0{,}75 + 0{,}1 = 1{,}6\).
- \(\Delta P_{sing} = 1{,}6\times1256 \approx 2{,}0\) kPa (\(\Delta h \approx 0{,}21\) m).

**7. Total B** : \(128{,}9 + 2{,}0 \approx 130{,}9\) kPa **≈ 1,31 bar ≈ 19,0 PSI ≈ 13,5 m CE**.

**Commentaires**

- Les singularités pèsent ici **moins de 2 %** : sur une **longue** conduite de **petit** diamètre, le linéique domine. À l'inverse, dans une salle des machines compacte pleine de vannes et de coudes, les singularités peuvent dominer.
- Avec un coefficient fourni différent (par exemple \(f = 0{,}025\)), la perte linéique serait \(0{,}025\times5000\times1256 = 157\) kPa : refaire le calcul avec le \(f\) de l'énoncé.
- Perte par unité de longueur : 1,29 bar / 100 m ≈ 13 m / 100 m — élevée, parce que la vitesse de 1,6 m/s dans un tuyau de 20 mm est déjà importante. En DN 25 (\(D = 25\) mm), \(v = 1{,}02\) m/s et la perte tomberait à environ 0,43 bar.

## IV.8 Pièges et vérifications

- Utiliser le diamètre **intérieur** (22-20 ⇒ 20 mm).
- \(v\) se calcule avec \(Q\) en **m³/s** et \(D\) en **m**.
- \(f\) est le coefficient de **Darcy** (celui de la formule \(f\frac{L}{D}\)) ; certains ouvrages anglo-saxons utilisent le coefficient de Fanning, 4 fois plus petit *(complément)* — si une valeur de \(f\) paraît 4 fois trop faible, c'est peut-être cela.
- \(\xi\) multiplie la **pression dynamique**, pas \(f\frac{L}{D}\).
- \(\Delta P = \rho g\Delta h\) : la hauteur est en mètres **du fluide considéré** (pour une huile de densité 0,85, 10 m d'huile = 0,83 bar).
- Les pertes de charge **ne dépendent pas de la pression** du circuit (un circuit à 10 bar ou à 2 bar perd la même chose à même débit) ; elles dépendent du **débit** (au carré).
- La **température** change \(\rho\) (peu) et \(\mu\) (beaucoup) : l'eau chaude est moins visqueuse ⇒ \(Re\) plus grand ⇒ \(f\) un peu plus faible.

---
# Partie V — Vannes de régulation

## V.1 Introduction et constitution

**Définition du cours** : les vannes de régulation sont des **actionneurs** contrôlant un **débit** du procédé de façon **progressive** (par opposition aux vannes tout-ou-rien qui ne connaissent que « ouvert » et « fermé »).

Une vanne de régulation est constituée de **trois parties** :

| Partie | Rôle | Contenu |
|---|---|---|
| **Corps** | partie où **circule le fluide** | siège(s), clapet (ou obturateur), orifices, brides ou raccords |
| **Servomoteur** (actionneur) | partie où la **commande est transformée en mouvement mécanique** | membrane + ressort, piston, moteur électrique |
| **Arcade** | **lien entre le servomoteur et le corps** | tige à clapet, presse-étoupe, index et plaquette indicatrice de course |

```
            ┌─────────────┐
            │ SERVOMOTEUR │  ← signal de commande (3–15 PSI, 4–20 mA)
            │ membrane +  │
            │   ressort   │
            └──────┬──────┘
                   │ tige
            ┌──────┴──────┐
            │   ARCADE    │  ← index de course, presse-étoupe
            └──────┬──────┘
          ═════════╪═════════
     entrée ──►  CORPS   ──► sortie
                 clapet/siège
```

### Critères de choix du corps

Il est important de connaître **tous les critères d'opération du procédé** pour sélectionner une technologie adéquate :

| Critère | Ce qu'il influence |
|---|---|
| **Nature du fluide** (liquide, gaz, vapeur, viscosité, particules) | type de corps, guidage du clapet, cage ou non |
| **Agressivité mécanique ou chimique** (abrasif, corrosif) | matériaux, vanne à membrane, revêtements |
| **Températures d'opération** | matériaux, type de presse-étoupe, vanne rotative pour les extrêmes |
| **Pression amont et aval (\(\Delta P\))** | effort sur le clapet (simple/double siège, cage), servomoteur, cavitation |
| **Niveau d'étanchéité** requis à la fermeture | simple siège, boisseau, membrane (étanches) vs double siège, papillon (fuite) |
| **Circulation unidirectionnelle ou bidirectionnelle** | sens de montage, type de clapet |
| **Dispositif anti-cavitation** | cage multi-étages |
| **Dispositif contre le bruit** | cage, silencieux, diffuseur |
| **Prix** | simple siège et papillon moins chers, cage plus chère |
| **Entretien** | accessibilité du siège, siège démontable |
| **Encombrement** | papillon et vannes rotatives compactes |

## V.2 Types de corps de vannes

### Vanne conventionnelle simple siège

**Principe** : un clapet en **translation** vient obturer un **seul siège** ; le fluide passe entre le clapet et le siège.

- **Avantages** : modèle **simple** en exécution standard (**coût réduit**) ; **siège démontable** (différents sièges pour différentes caractéristiques) ; **réversibilité** (sens d'action) obtenue au niveau du servomoteur.
- **Désavantages** : **effort hydrodynamique non équilibré** sur le clapet (la pression du fluide pousse d'un seul côté ⇒ servomoteur plus puissant pour les grands \(\Delta P\)) ; **risque de cavitation** (donc de bruit) ; **risque de vaporisation**.
- **Usage** : régulation générale, petits et moyens diamètres, bonne étanchéité requise.

### Vanne conventionnelle double siège

**Principe** : deux clapets sur la même tige fermant deux sièges ; le fluide pousse sur les deux clapets dans des sens opposés.

- **Avantages** : **efforts hydrodynamiques équilibrés** (servomoteur plus petit) ; **\(C_V\) plus élevé** (deux passages).
- **Désavantages** : **étanchéité moins bonne** (difficile de fermer parfaitement deux sièges en même temps, surtout avec la dilatation) ; **risque de cavitation**.
- **Usage** : grands débits, fort \(\Delta P\), étanchéité non critique.

### Vanne à cage

**Principe** : le clapet coulisse dans une **cage** percée de trous ou de fentes ; le fluide est divisé en multiples jets qui se rencontrent au centre, ce qui dissipe l'énergie progressivement. La cage assure aussi le guidage et peut comporter plusieurs étages de détente.

- **Avantages** : **réduction ou élimination du risque de cavitation** ; **réduction du niveau sonore** ; **meilleur guidage du clapet** (moins de vibrations).
- **Désavantages** : le **fluide doit être propre** (les trous se bouchent) ; **\(C_V\) moins élevé** à diamètre égal.
- **Usage** : service sévère, fortes détentes, vapeur, anti-cavitation, anti-bruit.

### Vanne à clapet rotatif excentré

**Principe** : un clapet sphérique monté sur un bras **excentré** tourne (rotation, pas translation) ; dès le début de l'ouverture il se **décolle** du siège, ce qui réduit l'usure et le frottement.

- **Avantages** : **très bon \(C_V\)** ; **efforts hydrodynamiques assez bien équilibrés** ; **étanche** ; **plage de température élevée (−200 °C à 400 °C)**.
- **Désavantages** : **tendance à la cavitation** ; **pas de possibilité de modifier le \(C_V\)** avec le clapet (contrairement au simple siège à siège démontable).
- **Usage** : grands débits sous faible \(\Delta P\), fluides chargés ou visqueux, températures extrêmes.

### Vanne papillon

**Principe** : un **disque** pivotant de 0 à 90° autour de son axe dans la conduite.

- **Avantages** : **encombrement réduit** sur la ligne (épaisseur d'une bride) ; **plage de température étendue** ; **bon \(C_V\)** (section quasi totale à pleine ouverture).
- **Désavantages** : **moment hydrodynamique très important** (le fluide tend à refermer ou ouvrir le disque) ⇒ **surdimensionnement du servomoteur** ; **pas étanche** (sauf versions à siège souple).
- **Usage** : grands diamètres, faible \(\Delta P\), eau, air, CVC, régulation grossière. Plage de régulation utile limitée (≈ 20–70°).

### Vanne à boisseau sphérique

**Principe** : une **sphère percée** tourne d'un quart de tour ; pour la régulation, le passage est profilé (encoche en V, boisseau segmenté) afin d'obtenir une caractéristique progressive.

- **Avantages** : **étanche** ; **coût réduit** ; **grand \(C_V\)**.
- **Désavantages** : **tendance à la cavitation** (forte récupération de pression).
- **Usage** : tout-ou-rien, fluides chargés, pâtes, fibres (boisseau en V), isolement.

### Vanne à membrane

**Principe** : une **membrane souple** est pressée par un compresseur contre un barrage (seuil) du corps ; aucune pièce mobile métallique n'est en contact avec le fluide, et il n'y a **pas de presse-étoupe**.

- **Avantages** : **étanche même avec des particules** ; **facilement nettoyable** (pharmaceutique, alimentaire) ; **pas de presse-étoupe** (donc mieux isolée du fluide, pas de fuite vers l'extérieur).
- **Désavantages** : **usure de la membrane** (pièce à remplacer périodiquement) ; **température et pression limitées** par le matériau de la membrane.
- **Usage** : fluides corrosifs, abrasifs, chargés, boues, sanitaire, basse pression.

### Vanne d'angle

**Principe** : corps **à simple siège** dont l'entrée et la sortie sont **à 90°** l'une de l'autre.

- **Caractéristiques** : habituellement réalisée pour des vannes à **simple siège** ; **nettoyage facile** (écoulement direct, pas de zone morte) ; permet de **combiner la mise en place d'une vanne avec la configuration des conduites** (remplace un coude).
- **Usage** : changement de direction imposé, fluides chargés ou qui cristallisent, fortes détentes (le jet sort axialement et n'attaque pas la paroi).

### Vanne 3 voies

**Principe** : deux sièges et un clapet double qui **ferme un orifice en ouvrant l'autre**. Deux types de fonctionnement :

- **Mélangeuse** : **2 entrées et 1 sortie** (ex. mélange eau chaude + eau froide pour obtenir une température).
- **Répartitrice** (diviseuse) : **1 entrée et 2 sorties** (ex. envoyer une partie du débit dans un échangeur et le reste en bypass).

Relations de débit :

\[
Q_e = Q_{s1} + Q_{s2}
\qquad
Q_{s1} = \alpha\,Q_e
\qquad
Q_{s2} = (1-\alpha)\,Q_e
\]

\(\alpha\) = fraction de course (0 à 1). Le débit total \(Q_e\) reste (idéalement) constant : la vanne ne fait que **répartir**. Exemple : \(Q_e = 20\) m³/h, \(\alpha = 0{,}35\) ⇒ \(Q_{s1} = 7\) m³/h, \(Q_{s2} = 13\) m³/h.

- **Limites** : les vannes 3 voies **ne permettent pas un équilibrage hydrodynamique** (les pressions sur les deux clapets ne se compensent pas) ⇒ **nécessitent un actionneur plus puissant**.
- **Usage** : régulation de température par mélange, circuits de chauffage/refroidissement à débit constant, bypass d'échangeur.

### Tableau comparatif

| Type | Mouvement | Étanchéité | \(C_V\) relatif | Cavitation | Effort sur servomoteur | Coût | Point fort |
|---|---|---|---|---|---|---|---|
| Simple siège | translation | très bonne | moyen | risque | élevé (non équilibré) | faible | polyvalente, siège interchangeable |
| Double siège | translation | moyenne | élevé | risque | faible (équilibré) | moyen | grands \(\Delta P\) |
| À cage | translation | bonne | moyen/faible | très réduite | faible | élevé | service sévère, bruit |
| Rotatif excentré | rotation | bonne | très élevé | tendance | moyen | moyen | fluides chargés, T extrêmes |
| Papillon | rotation | faible | élevé | tendance | très élevé (moment) | faible | grands diamètres, compacité |
| Boisseau sphérique | rotation | très bonne | très élevé | tendance | moyen | faible | tout-ou-rien, pâtes |
| À membrane | translation | très bonne | moyen | faible (basse pression) | faible | faible | corrosifs, sanitaire |
| D'angle | translation | très bonne | moyen | risque | élevé | moyen | fluides chargés, détentes |
| 3 voies | translation | bonne | moyen | risque | élevé | moyen | mélange / répartition |

### Guide de choix rapide

| Besoin | Vanne à privilégier |
|---|---|
| Régulation fine, fluide propre, petit/moyen diamètre | Simple siège (ou à cage si \(\Delta P\) élevé) |
| Fort \(\Delta P\), risque de cavitation ou de bruit | À cage (multi-étages) |
| Grand débit, faible \(\Delta P\), grand diamètre | Papillon (régulation grossière) ou rotatif excentré |
| Fluide chargé, fibreux, pâteux | Boisseau en V, rotatif excentré, membrane |
| Fluide corrosif ou sanitaire (nettoyage en place) | Membrane |
| Température très haute ou cryogénique | Rotatif excentré |
| Étanchéité parfaite à la fermeture | Simple siège, boisseau sphérique, membrane |
| Mélanger deux fluides ou répartir un débit | 3 voies |
| Remplacer un coude, fluide qui encrasse | D'angle |

## V.3 L'arcade

L'arcade sert de **lien entre le corps et le servomoteur**. Elle est constituée de :

- la **tige à clapet** (transmet le mouvement du servomoteur au clapet ; traverse le **presse-étoupe** qui assure l'étanchéité vers l'extérieur) ;
- l'**index avec la plaquette indicatrice de course** (permet de lire la position de la vanne, de 0 à 100 %, et de vérifier la course à la mise en service).

Elle sert aussi de support au positionneur et aux fins de course, et éloigne thermiquement le servomoteur du corps (fluides chauds).

## V.4 Le servomoteur (actionneur)

Le servomoteur est l'organe qui **convertit la commande en énergie mécanique**. Il est important de connaître les critères d'opération de la vanne (siège-clapet, mouvement de **rotation** ou de **translation**).

### Critères principaux

| Critère | Explication |
|---|---|
| **Efforts hydrodynamiques et hydrostatiques** | force du fluide sur le clapet (dépend de \(\Delta P\) et de la section du siège) et poussée statique ; déterminent la taille de la membrane ou du piston |
| **Sens d'action (direct, inverse)** | servomoteur direct : l'air pousse la tige vers le bas ; inverse : l'air tire la tige vers le haut |
| **Type de commande** | pneumatique 3–15 PSI, électrique 4–20 mA, tout-ou-rien, numérique (bus) |
| **Technologie** | **pneumatique** (membrane + ressort : simple, sûr, position de repli par ressort ; piston : plus de force), **électrique** (moteur + réducteur : précis, lent, besoin d'un ressort de rappel ou d'une batterie pour la sécurité), **hydraulique** (très grandes forces) |
| **Accessoires** | **positionneur**, **commande manuelle** (volant de secours), fins de course, électrovanne de sécurité, filtre-détendeur |

### Puissance du servomoteur

Le servomoteur doit avoir une **puissance suffisante pour vaincre la force développée par la pression du fluide sur le clapet, à l'ouverture comme à la fermeture**. Les fabricants indiquent la **pression d'alimentation nécessaire** du servomoteur en fonction de la **pression maximale admissible du fluide** (tables de « shut-off » : pour un \(\Delta P\) de fermeture donné et une taille de siège donnée, il faut telle pression d'air et telle taille de membrane).

Ordre de grandeur *(complément)* : la force sur un clapet simple siège ≈ \(\Delta P \times A_{siège}\). Pour un siège de 50 mm sous 10 bar : \(10^6\ \text{Pa}\times1{,}96\times10^{-3}\ \text{m}^2 \approx 1960\) N, à quoi s'ajoutent le frottement du presse-étoupe et la force d'assise nécessaire pour l'étanchéité.

### Sens d'opération de la vanne

Le sens d'opération dépend de la **configuration du corps et du servomoteur** :

| Servomoteur | Corps | Sans air (ressort seul) | Avec air croissant | Désignation |
|---|---|---|---|---|
| Direct (air pousse la tige vers le bas) | tige en bas = fermé | ouverte | se ferme | **Air ferme — NO — OMA** (ouverte par manque d'air) |
| Direct | tige en bas = ouvert | fermée | s'ouvre | **Air ouvre — NF — FMA** (fermée par manque d'air) |
| Inverse (air tire la tige vers le haut) | tige en bas = fermé | fermée | s'ouvre | **Air ouvre — NF — FMA** |
| Inverse | tige en bas = ouvert | ouverte | se ferme | **Air ferme — NO — OMA** |

Le choix se fait selon la **position de sécurité** souhaitée en cas de **panne d'air ou d'énergie** :

| Application | Position de sécurité | Vanne |
|---|---|---|
| Vapeur ou combustible de chauffage | fermer (arrêter la chauffe) | FMA (air ouvre) |
| Eau de refroidissement d'un réacteur | ouvrir (refroidir) | OMA (air ferme) |
| Alimentation d'une cuve (risque de débordement) | fermer | FMA |
| Évent / soupape de décharge de pression | ouvrir | OMA |
| Vidange d'une cuve devant garder son niveau | fermer | FMA |

Conséquence sur le régulateur : une vanne air ferme inverse le sens du procédé vu du régulateur (voir III.1).

## V.5 Caractéristiques intrinsèques des vannes

**Définition du cours** : la caractéristique intrinsèque est la relation entre le **débit \(Q\)** et la **course du clapet \(h\)**, pour une **pression différentielle constante** aux bornes de la vanne. Elle est issue de la **forme du clapet et des orifices du corps**.

Les trois caractéristiques principales :

| Caractéristique | Définition | Formule (débit relatif) | Allure |
|---|---|---|---|
| **Linéaire** | la relation entre \(Q\) et la course est **linéaire** | \(\dfrac{Q}{Q_{max}} = h\) | droite |
| **Égal pourcentage (=%)** | des **accroissements égaux de la course relative \(h\)** fournissent des **accroissements d'égal pourcentage du débit relatif** | \(Q = Q_0\,e^{n h}\) | exponentielle |
| **Ouverture rapide (OR)** | **plus de 50 % du débit est libéré au premier tiers de la course** | — (proche d'une racine carrée) | concave, monte vite puis plafonne |

N.B. : le mode « Throttle » n'est pas utilisé dans le cours.

### Égal pourcentage : détails

\(Q = Q_0\,e^{nh}\) avec \(Q_0\) le **débit minimal contrôlable** (débit à \(h = 0\) sur la courbe théorique) et \(n\) le **coefficient propre de la vanne**.

- À \(h = 1\) : \(Q_{max} = Q_0 e^n\) ⇒ \(e^n = Q_{max}/Q_0 = r\) (la **rangeabilité** intrinsèque) ⇒ \(n = \ln r\) *(complément)*. Pour \(r = 50\), \(n = 3{,}91\) ; pour \(r = 30\), \(n = 3{,}40\).
- Forme équivalente : \(\dfrac{Q}{Q_{max}} = r^{\,h-1}\).
- « Égal pourcentage » : pour chaque pas de course \(\Delta h\), le débit est multiplié par le même facteur \(e^{n\Delta h}\). Avec \(r = 50\), chaque 10 % de course multiplie le débit par \(50^{0{,}1} = 1{,}48\) (+48 %).
- Le **gain de la vanne** (\(dQ/dh = nQ\)) est proportionnel au débit : faible aux petites ouvertures (réglage fin), fort aux grandes.

Valeurs numériques pour \(r = 50\) :

| \(h\) | 0 | 0,1 | 0,25 | 0,5 | 0,75 | 0,9 | 1,0 |
|---|---|---|---|---|---|---|---|
| Linéaire \(Q/Q_{max}\) | 0 | 0,10 | 0,25 | 0,50 | 0,75 | 0,90 | 1,00 |
| =% \(Q/Q_{max}\) | 0,02 | 0,03 | 0,053 | 0,14 | 0,38 | 0,68 | 1,00 |
| OR \(Q/Q_{max}\) *(indicatif)* | 0 | 0,32 | 0,50 | 0,71 | 0,87 | 0,95 | 1,00 |

### Pourquoi plusieurs caractéristiques ?

L'objectif est que le **gain de la boucle** (vanne × procédé) soit à peu près **constant** sur toute la plage, pour que le réglage PID reste bon partout :

- si la vanne garde un \(\Delta P\) constant (autorité ≈ 1), une **linéaire** donne un gain constant ;
- si le \(\Delta P\) de la vanne **chute** quand elle s'ouvre (autorité faible), une **=%** compense cette chute et donne un débit installé quasi linéaire ;
- l'**ouverture rapide** sert au tout-ou-rien, aux sécurités et aux cas où l'on veut un débit maximal dès le début de course.

## V.6 Caractéristique installée et autorité

**Caractéristique installée** : la relation entre le **débit \(Q\)** et la **course \(h\)** de la vanne **installée**, avec des **conditions variantes** du procédé (\(\Delta P\) **variant**). En effet, quand la vanne s'ouvre, le débit augmente, les pertes de charge dans le reste du circuit (en \(Q^2\)) augmentent, et la pression différentielle restant disponible pour la vanne **diminue**.

**Autorité** : dans un **circuit série**, l'autorité exprime la **pression absorbée par la vanne** en comparaison avec le circuit. Le but est de **régler le débit en maintenant une pression utile suffisante** pour le procédé.

\[
a = \frac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}}
\]

- \(\Delta P_v\) : chute de pression dans la **vanne** (généralement prise à pleine ouverture, au débit maximal) ;
- \(\Delta P_{R1+R2}\) : chute de pression dans le **reste du circuit** (conduites amont \(R_1\) et aval \(R_2\), échangeur, etc.) au même débit.

Interprétation :

- \(a = 1\) : toute la perte de charge est dans la vanne ; la caractéristique installée **= intrinsèque**.
- \(a\) **petit** : la vanne « pèse » peu dans le circuit ; dès qu'elle s'ouvre un peu, le débit atteint presque sa valeur maximale ⇒ la caractéristique installée est **déformée** : une **linéaire** devient une **ouverture rapide**, une **=%** devient à peu près **linéaire**. Au-delà d'une certaine ouverture, la vanne « ne contrôle plus rien ».
- **Plus l'autorité est petite, plus la caractéristique installée est déformée.**
- Compromis courant *(hyp.)* : \(a \ge 0{,}3\) à 0,5 (en CVC, on vise souvent \(a \approx 0{,}5\)). Une autorité élevée coûte de l'énergie de pompage (on « brûle » de la pression dans la vanne).

### Calcul de la caractéristique installée *(complément)*

Pour un circuit série alimenté sous une pression totale constante, avec \(\varphi(h) = C_V(h)/C_{V,max}\) la caractéristique intrinsèque relative :

\[
\frac{Q}{Q_{max}} = \frac{\varphi(h)}{\sqrt{a + (1-a)\,\varphi(h)^2}}
\]

Vanne linéaire (\(\varphi = h\)) :

| \(h\) | 0,10 | 0,25 | 0,50 | 0,75 | 1,00 |
|---|---|---|---|---|---|
| \(a = 1\) | 0,10 | 0,25 | 0,50 | 0,75 | 1,00 |
| \(a = 0{,}5\) | 0,14 | 0,34 | 0,63 | 0,85 | 1,00 |
| \(a = 0{,}3\) | 0,18 | 0,43 | 0,73 | 0,90 | 1,00 |
| \(a = 0{,}1\) | 0,30 | 0,63 | 0,88 | 0,96 | 1,00 |

Vanne =% (\(r = 50\)) :

| \(h\) | 0,10 | 0,25 | 0,50 | 0,75 | 1,00 |
|---|---|---|---|---|---|
| \(a = 1\) | 0,03 | 0,05 | 0,14 | 0,38 | 1,00 |
| \(a = 0{,}5\) | 0,04 | 0,08 | 0,20 | 0,50 | 1,00 |
| \(a = 0{,}3\) | 0,05 | 0,10 | 0,25 | 0,60 | 1,00 |
| \(a = 0{,}1\) | 0,09 | 0,17 | 0,41 | 0,79 | 1,00 |

Lecture : avec \(a = 0{,}3\), la linéaire donne déjà 73 % du débit à mi-course (allure d'ouverture rapide) alors que la =% donne 25 % puis 60 % à 75 % : la =% installée est devenue presque linéaire. C'est pourquoi on choisit une **=% quand l'autorité est faible** (cas fréquent : longues conduites, échangeurs) et une **linéaire quand l'autorité est élevée** (vanne qui absorbe l'essentiel de la pression, ou boucle de débit en cascade).

## V.7 Le positionneur

**Définition du cours** : le positionneur de vanne est un **relais d'asservissement** garantissant un positionnement du clapet **fidèle et rapide**, à l'ouverture comme à la fermeture. Il **reçoit la consigne de position** et la **compare à la position réelle du clapet** ; en fonction de l'écart constaté, il **génère un signal plus ou moins important au servomoteur** (il dispose pour cela de la pleine pression d'alimentation, typiquement 20 à 90 PSI, et non du seul signal 3–15 PSI).

C'est donc une **boucle de régulation de position** locale, imbriquée dans la boucle principale.

**Composition** :

- une partie **pneumatique, électrique ou numérique**, traduisant le signal du régulateur en **demande de position** ;
- un système **mécanique ou électronique de mesure de la position** (levier + came, capteur magnétique) ;
- un **comparateur** entre consigne et mesure ;
- un **correcteur PID**.

**Le positionneur est nécessaire si** :

| Condition | Pourquoi le positionneur aide |
|---|---|
| la **pression différentielle est élevée** et nécessite une pression de commande importante du servomoteur | il fournit toute la pression d'alimentation, pas seulement 3–15 PSI |
| la **pression différentielle fluctue rapidement** et perturbe la grandeur réglée | il maintient la position malgré les variations d'effort |
| le fluide est **très visqueux ou collant** (pâte à papier, goudron, sucre liquide) | il vainc les frottements et l'hystérésis |
| le fluide engendre un **grippage de la tige** du clapet | idem (stick-slip) |
| le **temps de réponse de la vanne n'est pas constant** | il accélère et uniformise la réponse (gros servomoteurs, longues lignes pneumatiques) |
| la **caractéristique de débit utile ne correspond pas à celle de la vanne** | il modifie la caractéristique (came ou fonction numérique) |

**Adaptation de la caractéristique par le positionneur** : on choisit la caractéristique du positionneur en fonction de la **caractéristique souhaitée au niveau du procédé**. Exemple : vanne à clapet linéaire + positionneur à came =% ⇒ comportement =% ; vanne rotative (caractéristique quelconque) + positionneur numérique linéarisant ⇒ comportement linéaire. Les positionneurs numériques (« intelligents ») font aussi du diagnostic (frottement, course, fuites) *(complément)*.

Mise en garde *(complément)* : sur une boucle de **débit** très rapide, un positionneur pneumatique lent peut dégrader la régulation (deux boucles de vitesses voisines) ; sur les boucles lentes (température, niveau), il est presque toujours bénéfique.

## V.8 Coefficient de débit \(C_V\)

**Définition du cours** : le coefficient de débit \(C_V\) est la **capacité d'écoulement** de la vanne, utilisé pour en **déterminer les dimensions**. La valeur se situe entre \(10^{-6}\) pour les micro-vannes et \(10^{6}\) pour les grandes vannes de barrage ou de pipeline.

Définition physique : \(C_V\) = débit d'**eau** (à 60 °F), en **gallons US par minute**, qui traverse la vanne **à pleine ouverture** sous une perte de charge de **1 PSI**.

### Formules

Système impérial (\(Q\) en gallons US par minute, 1 gal = 3,785 L ; \(\Delta P\) en PSI ; densité relative à l'eau) :

\[
C_V = Q\sqrt{\frac{\text{densité}}{\Delta P}}
\]

Système métrique (\(Q\) en m³/h ; \(\Delta P\) en bar ; 1 bar = 100 000 Pa = 14,5 PSI) :

\[
C_V = 1{,}16\,Q\sqrt{\frac{\text{densité}}{\Delta P}}
\]

D'où vient le 1,16 *(complément)* : le coefficient métrique \(K_V\) (m³/h sous 1 bar) vaut \(K_V = Q\sqrt{d/\Delta P}\) ; la conversion est \(C_V = 1{,}156\,K_V \approx 1{,}16\,K_V\). Inversement, \(K_V = 0{,}865\,C_V\).

Formes inversées utiles :

- Débit pour un \(C_V\) et un \(\Delta P\) donnés : \(Q = \dfrac{C_V}{1{,}16}\sqrt{\dfrac{\Delta P}{d}}\) (m³/h, bar).
- \(\Delta P\) produit par une vanne de \(C_V\) donné à un débit \(Q\) : \(\Delta P = d\left(\dfrac{1{,}16\,Q}{C_V}\right)^2\) (bar).

Le \(C_V\) d'une vanne varie avec son ouverture : \(C_V(h) = C_{V,max}\,\varphi(h)\). Les fiches constructeur donnent le \(C_V\) à pleine ouverture et parfois par palier de 10 %.

### \(C_V\) nominal (réserve de fonctionnement)

Lorsqu'on sélectionne une vanne, on détermine le **\(C_V\) nominal** pour se garder une **réserve de fonctionnement** :

- vanne **linéaire** : \(C_{V,nominal} = 1{,}25\,C_{V,maximum}\) ;
- vanne **exponentielle (=%)** : \(C_{V,nominal} = 1{,}4\,C_{V,maximum}\).

On cherche ensuite, dans les **gammes des constructeurs**, le \(C_V\) proposé correspondant **au moins** à ce \(C_V\) nominal (premier \(C_V\) **supérieur ou égal**).

La réserve est plus grande pour la =% parce que son débit n'augmente fortement qu'en fin de course : il faut un \(C_V\) plus grand pour que le débit maximal soit atteint vers 80–90 % d'ouverture et non à 100 %.

### Procédure de dimensionnement

1. Déterminer le **débit maximal** \(Q_{max}\) à faire passer (et le débit minimal \(Q_{min}\)).
2. Déterminer le **\(\Delta P\) disponible aux bornes de la vanne** à \(Q_{max}\) : \(\Delta P_v = P_{pompe} - \Delta P_{conduites} - P_{utile}\) (bilan de pression du circuit, voir exercice cavitation n° 2).
3. Calculer \(C_{V,max}\) avec la formule (bon système d'unités, densité du fluide).
4. Appliquer le facteur nominal (1,25 ou 1,4) ⇒ \(C_{V,nom}\).
5. Choisir dans la gamme le premier \(C_V \ge C_{V,nom}\).
6. Vérifier la **rangeabilité** (débit minimal contrôlable), la **cavitation** et le **bruit**.
7. Vérifier l'**autorité** et choisir la caractéristique en conséquence.

### Risques d'un \(C_V\) sous-dimensionné

1. **réduire le débit souhaité** (la vanne grande ouverte ne passe pas assez) ;
2. provoquer la **vaporisation** des liquides à la sortie de la vanne (forte détente) ;
3. entraîner une **importante perte de charge** dans les tuyauteries et dans la vanne ;
4. **diminuer la pression de sortie**.

### Risques d'un \(C_V\) sur-dimensionné

1. **augmenter le coût** des installations à cause d'équipements surdimensionnés ;
2. provoquer un **débit variable** au travers de la vanne ou une **commande irrégulière** du débit à cause d'un **\(\Delta P\) insuffisant** (la vanne travaille presque fermée, dans la zone où un petit déplacement change beaucoup le débit) ;
3. **réduire la durée de vie** de certaines vannes à cause des **oscillations dans les parties internes** lorsque le débit n'est pas en mesure de maintenir les pressions différentielles internes nécessaires ;
4. entraîner une **utilisation irrégulière** de certaines vannes : par exemple, une vanne à **trois ou quatre orifices** risque de **ne pas changer de position** parce que le débit est insuffisant ;
5. **diminuer la durée de vie des sièges et clapets** par l'apparition d'un phénomène de **cavitation** lié à la vitesse d'écoulement du fluide.

Repère pratique *(complément)* : une vanne bien dimensionnée travaille entre **20 % et 80 %** d'ouverture sur sa plage normale de débit.

## V.9 Rangeabilité

**Définition du cours** : la rangeabilité représente le **coefficient de réglage** :

\[
r = \frac{C_{V\ maxi\ contrôlable}}{C_{V\ mini\ contrôlable}}
\]

Le terme **contrôlable** précise le **respect de la caractéristique** de la vanne (en dessous du débit mini contrôlable, la vanne fuit ou passe brutalement du débit nul à un débit non nul, hors de la courbe).

- La rangeabilité est **donnée par le fabricant** sur la fiche technique (ex. 50:1 pour une vanne à clapet, 100:1 et plus pour certaines rotatives, 20:1 pour un papillon).
- Les valeurs annoncées sont celles de la **rangeabilité intrinsèque**, qui indique la **finesse de réglage à faible débit** ; une fois sur le procédé, la **rangeabilité installée** est **réduite** (parce que le \(\Delta P\) aux bornes de la vanne est plus grand au débit minimal : il faut un \(C_V\) encore plus petit pour passer le petit débit, et parce que la réserve nominale « gaspille » le haut de la course).

**Vérification du débit minimal contrôlable** :

1. Calculer \(C_{V,min\ requis}\) au débit minimal avec le \(\Delta P_v\) correspondant (plus grand qu'au débit max).
2. Calculer \(C_{V,mini\ contrôlable} = C_{V,choisi}/r\).
3. Le débit minimal est contrôlable si \(C_{V,min\ requis} \ge C_{V,choisi}/r\), c'est-à-dire si la **rangeabilité requise** \(C_{V,choisi}/C_{V,min\ requis}\) est **inférieure** à la rangeabilité de la fiche.

Exemple : vanne de \(C_V = 30\), \(r = 50\) ⇒ \(C_V\) mini contrôlable \(= 0{,}6\). Si le débit minimal demande \(C_V = 0{,}83\) ⇒ contrôlable. S'il demande \(C_V = 0{,}4\) ⇒ non contrôlable : il faut soit une vanne à plus grande rangeabilité, soit un **partage d'échelle complémentaire** (petite + grosse vanne), soit réduire le \(C_V\) choisi.

## V.10 Cavitation

### Mécanisme

Au passage dans le **siège** de la vanne, la section diminue : la **vitesse** du liquide **augmente**, ce qui entraîne une **baisse de pression** (conservation de l'énergie, Bernoulli). Le point de pression minimale est la **vena contracta**, juste en aval du siège. Lorsque cette pression devient **inférieure à la pression de vapeur \(P_v\)** du liquide, il y a **formation de bulles de vapeur** au sein du liquide.

À l'**aval** du siège, la section augmente, la vitesse diminue et la **pression remonte au-dessus de \(P_v\)** : les bulles **implosent** brutalement. C'est la **cavitation**, dont les effets dépendent de la perte de charge.

```
 pression
   │ P1 ────┐
   │        \                                 ┌──── P2   (récupération de pression)
   │         \                    ___________/
   │          \                  /
   │ Pv ·······\·······|········/·········  ← pression de vapeur
   │            \______|_______/
   │                   ▲ vena contracta : P < Pv ⇒ bulles
   └──────────────────────────────────────────────► position
         amont      siège        aval
```

Si la pression aval \(P_2\) **reste sous \(P_v\)**, les bulles n'implosent pas : le liquide reste partiellement vaporisé, c'est la **vaporisation** (flashing), qui érode par abrasion (gouttelettes à grande vitesse) plutôt que par implosion *(complément)*.

### Effets de la cavitation

- L'implosion des bulles de vapeur crée des **ondes de choc** avec des pressions de l'ordre de **7000 bar** (micro-jets sur les parois).
- **Destruction du corps de la vanne** (siège et clapet piqués, aspect de « sucre » ou de cratères) et érosion de la conduite aval.
- La **vibration desserre les éléments vissés**.
- **Émission de bruit important** (crépitement de gravier).
- Chute du débit (écoulement bloqué / choked flow) : au-delà d'un certain \(\Delta P\), augmenter \(\Delta P\) n'augmente plus le débit *(complément)*.

### Critère de cavitation

L'écoulement est **critique** (cavitation) dans la vanne si :

\[
\Delta P \ge F_L^2\,\Delta P_s
\qquad\text{avec}\qquad
\Delta P_s = P_1 - P_v \quad\text{(en pression absolue)}
\]

- \(\Delta P = P_1 - P_2\) : chute de pression aux bornes de la vanne (différence : identique en relatif ou en absolu).
- \(P_1\) : pression **amont**, en **absolu** (\(P_{abs} = P_{rel} + P_{atm}\)).
- \(P_v\) : **pression de vapeur** du liquide à la température de service, en **absolu** (croît fortement avec la température : eau 20 °C 0,023 bar, 50 °C 0,123 bar, 100 °C 1,013 bar).
- \(F_L\) : **coefficient de récupération de pression** de la vanne, **fourni par le fabricant** (0 à 1). Il mesure la part du \(\Delta P\) qui est « récupérée » en aval : \(F_L\) **proche de 1** ⇒ vanne qui récupère **peu** de pression (grosses pertes, pression au siège proche de \(P_2\)) ⇒ **cavite peu**. \(F_L\) **faible** ⇒ forte récupération (la pression au siège descend bien plus bas que \(P_2\)) ⇒ **cavite facilement**.

| Type de vanne | \(F_L\) typique *(hyp.)* |
|---|---|
| À cage multi-étages, simple siège à écoulement « ouvrant » | 0,9 – 0,95 |
| Simple siège standard | 0,85 – 0,9 |
| Rotatif excentré | 0,75 – 0,85 |
| Boisseau sphérique (régulation) | 0,6 – 0,75 |
| Papillon à 60–90° | 0,55 – 0,7 |

\(F_L^2\Delta P_s\) est le **\(\Delta P\) maximal admissible** sans cavitation : plus la pression amont est élevée, plus le fluide est froid, plus \(F_L\) est grand, plus on peut détendre.

### Solutions à la cavitation

1. **Choisir une vanne avec un meilleur coefficient \(F_L\)**, c'est-à-dire **plus grand** (vanne à cage, détente multi-étages).
2. **Déplacer la vanne** pour **changer sa pression aval** (la placer plus bas dans l'installation ou plus en amont du circuit, là où \(P_2\) est plus grande), **et/ou si possible là où le fluide est plus froid** pour **abaisser la pression de vaporisation \(P_v\)**.
3. **Installer une vanne de contournement** (bypass) pour **diminuer le différentiel de pression** de la vanne (une partie du débit, et de la détente, passe ailleurs).
4. *(complément)* Répartir la détente sur **deux vannes en série**, ou ajouter une **plaque à orifice** en aval pour relever \(P_2\) ; choisir des matériaux durs (stellite) si la cavitation résiduelle est inévitable.

## V.11 Bruit

Le passage d'un fluide dans une vanne de régulation engendre du **bruit** dont l'intensité dépend de la **turbulence** créée par le fluide. **Plus la vitesse est grande, plus le bruit d'origine hydraulique et hydrodynamique est fort.** Sources : turbulence, cavitation (liquides), écoulement sonique (gaz et vapeur), vibrations mécaniques.

**Pourquoi vérifier le niveau de bruit ?**

- pour assurer un **environnement de travail sécuritaire** (seuils réglementaires : exposition 8 h limitée à 85 dB(A) dans la plupart des juridictions ; au-delà, protections obligatoires *(complément)*) ;
- pour assurer l'**intégrité et la durabilité de la vanne** (un bruit > 110 dB traduit des vibrations destructrices) ;
- pour assurer un **niveau sonore adéquat dans le voisinage**.

**Calcul** : il **n'existe pas de standard** pour calculer le bruit généré par les vannes. On doit donc **mesurer** le bruit de façon **empirique** à \(r_\theta\) mètres de l'appareil, puis **calculer** le bruit en décibels à la distance voulue :

\[
\Delta L_d = 20\log\left(\frac{r}{r_\theta}\right)
\qquad\qquad
L(r) = L(r_\theta) - \Delta L_d
\]

- \(\Delta L_d\) : différence de l'intensité du bruit au nouveau point d'observation (dB) ;
- \(r\) : distance de l'appareil au nouveau point d'observation (m) ;
- \(r_\theta\) : distance entre l'appareil et le point de référence (mesure) (m).

Si \(r > r_\theta\), \(\Delta L_d > 0\) et le niveau **diminue** ; si on se rapproche, il augmente.

Repères (propagation sphérique en champ libre) :

| \(r/r_\theta\) | 2 | 3 | 5 | 10 | 30 | 100 | 1000 |
|---|---|---|---|---|---|---|---|
| \(\Delta L_d\) (dB) | 6,0 | 9,5 | 14,0 | 20 | 29,5 | 40 | 60 |

Distance pour atteindre un niveau cible \(L_{cible}\) : \(r = r_\theta\times10^{(L(r_\theta) - L_{cible})/20}\).

Rappels sur les décibels *(complément)* : échelle logarithmique ; +3 dB = puissance acoustique doublée ; +10 dB = sensation « deux fois plus fort » ; deux sources identiques de 90 dB donnent 93 dB (pas 180). Ordres de grandeur : 60 dB conversation, 85 dB seuil de protection, 100 dB vanne bruyante à 1 m, 120 dB seuil de douleur.

## V.12 Pièges fréquents (vannes)

- **Pressions absolues** dans \(\Delta P_s = P_1 - P_v\) : ajouter \(P_{atm}\) à une pression manométrique ; \(P_v\) est toujours donnée en absolu (PSIA, bar abs).
- **\(\Delta P\) de la vanne** : différence \(P_1 - P_2\), à prendre **aux bornes de la vanne**, pas entre pompe et utilisation (retirer les pertes de conduites et la pression utile).
- **Unités du \(C_V\)** : GPM + PSI (pas de facteur) ou m³/h + bar (facteur 1,16). Un débit en L/s se convertit en m³/h (× 3,6) avant tout.
- **Densité relative**, pas masse volumique : 998 kg/m³ ⇒ 0,998.
- **Facteur nominal** : 1,25 pour la linéaire, 1,4 pour la =% ; puis **arrondir au \(C_V\) constructeur supérieur ou égal**.
- **Rangeabilité** : comparer \(C_{V,min\ requis}\) à \(C_{V,choisi}/r\) (avec le \(C_V\) réellement choisi, pas le \(C_{V,max}\) calculé).
- **Autorité** : \(\Delta P_v\) au numérateur **et** au dénominateur ; \(a = 1\) = pas de déformation ; faible autorité ⇒ préférer une =%.
- **Bruit** : la formule donne une **atténuation** à **soustraire** ; c'est **20 log** (pression acoustique, distance), pas 10 log.
- **Sens d'opération** : FMA = air ouvre = NF ; OMA = air ferme = NO. Le choix dépend de la **sécurité**, pas du confort de réglage.

---
# Partie VI — Exercices du cours résolus

Les exercices de PID (méthode graphique, Ziegler-Nichols 0–200 °C) sont résolus en III.6 et l'exercice de pertes de charge (cuivre 22-20) en IV.7. Cette partie regroupe les exercices du cours de vannes et récapitule les résultats des autres.

## VI.1 Récapitulatif PID et pertes de charge

| Exercice | Résultat | Voir |
|---|---|---|
| Méthode graphique : précision parfaite, \(t_{95\%} < 8\) s, sans dépassement | PI ; \(\theta_d \le 2{,}67\) s ; \(G_r = \dfrac{1}{G_s}\dfrac{\theta}{\theta_d}\) ; \(T_i = G_s\theta_d\) ; \(T_d = 0\) ; sens inverse si \(G_s > 0\) | III.6 c |
| Ziegler-Nichols BO, sonde 0–200 °C | convertir \(\Delta X\) en % (÷ 200 × 100) ; \(G_s = \Delta X_\%/\Delta Y\) ; tableau BO | III.6 b |
| Pertes de charge cuivre 22-20, 7,94 GPM, 328 pi (A) | \(v = 1{,}59\) m/s ; \(\Delta P \approx 129\) kPa ≈ 1,29 bar ≈ 13,3 m CE (avec \(f = 0{,}0205\)) | IV.7 |
| + 2 coudes 90° + robinet à bille (B) | \(+ 2{,}0\) kPa ⇒ ≈ 131 kPa ≈ 1,31 bar | IV.7 |

## VI.2 Coefficient de débit — vanne linéaire, 16 L/s, 145 PSI

**Énoncé** : déterminer le \(C_V\) d'une vanne au profil **linéaire** devant faire passer un débit maximal de **16 L/s** d'eau à **4 °C** en absorbant une chute de pression de **145 PSI**. Le constructeur offre des vannes de \(C_V\) : **16, 22, 30, 49**. \(\rho_{4°C} = 1000\) kg/m³ ; 14,5 PSI = 1 bar.

**Résolution (métrique)**

1. Débit : \(Q = 16\ \text{L/s}\times\dfrac{3600}{1000} = 57{,}6\) m³/h.
2. Pression : \(\Delta P = 145/14{,}5 = 10\) bar.
3. Densité : \(1000/1000 = 1\).
4. \(C_{V,max} = 1{,}16\times57{,}6\times\sqrt{\dfrac{1}{10}} = 1{,}16\times57{,}6\times0{,}3162 = 21{,}1\).
5. Vanne linéaire ⇒ \(C_{V,nom} = 1{,}25\times21{,}1 = 26{,}4\).
6. Gamme 16, 22, 30, 49 ⇒ premier \(C_V \ge 26{,}4\) : **\(C_V = 30\)**.

**Vérification (impérial)** : \(Q = 16\ \text{L/s}\times60/3{,}785 = 253{,}6\) GPM ; \(C_V = 253{,}6\sqrt{1/145} = 253{,}6\times0{,}0830 = 21{,}1\) ✓.

**Discussion** : avec \(C_V = 30\), la vanne passera le débit maximal à environ \(21{,}1/30 = 70\ \%\) de course (vanne linéaire) : il reste 30 % de réserve. Choisir 22 serait insuffisant (\(22 < 26{,}4\)) ; choisir 49 serait surdimensionné (débit max atteint à 43 % de course : commande irrégulière, usure).

## VI.3 Cavitation — exercice n° 1

**Énoncé** : la vanne cavite-t-elle ? \(P_1 = 70\) PSI, \(P_2 = 0\) PSI, densité 1, débit 2 GPM, \(F_L = 0{,}9\), \(P_{atm} = 14{,}7\) PSI, \(P_{v,H_2O,60°F} = 0{,}256\) PSIA.

**Résolution**

1. \(\Delta P = P_1 - P_2 = 70 - 0 = 70\) PSI.
2. Pression amont absolue : \(P_{1,abs} = 70 + 14{,}7 = 84{,}7\) PSIA.
3. \(\Delta P_s = P_{1,abs} - P_v = 84{,}7 - 0{,}256 = 84{,}44\) PSI.
4. \(F_L^2\,\Delta P_s = 0{,}9^2\times84{,}44 = 0{,}81\times84{,}44 = 68{,}4\) PSI.
5. Critère : \(\Delta P = 70 \ge 68{,}4\) ⇒ **oui, la vanne cavite** (l'écoulement est critique).

**Pour aller plus loin**

- \(C_V\) requis : \(C_V = 2\sqrt{1/70} = 0{,}24\) (micro-vanne).
- Pour ne pas caviter, il faudrait \(\Delta P < 68{,}4\) PSI, par exemple une contre-pression aval \(P_2 \ge 1{,}6\) PSI (plaque à orifice, vanne de contournement), ou une vanne avec \(F_L \ge \sqrt{70/84{,}44} = 0{,}91\).
- Si l'eau était à 50 °C (\(P_v = 1{,}79\) PSIA), \(\Delta P_s = 82{,}9\) et \(F_L^2\Delta P_s = 67{,}2\) : cavitation encore plus nette — le fluide chaud cavite plus facilement.

## VI.4 Cavitation — exercice n° 2 (circuit complet)

**Énoncé** : la pression utile \(P_u\) du circuit doit être régulée à **23,675 PSI** à l'aide d'une vanne de régulation au profil **linéaire**. Pour atteindre le débit maximal de **12,5 L/s**, la pompe fournit **205,6 PSI**. Au débit minimal de **0,556 L/s**, la sortie de la pompe est à **138,31 PSI**. Conduite de **60 m en amont** et **10 m en aval** de la vanne ; \(f = 0{,}95\) ; diamètre interne **0,1 m** ; \(\rho = 998\) kg/m³ ; \(P_v = 0{,}042\) bar abs ; 14,5 PSI = 1 bar = 100 000 Pa.

Questions : (1) \(\Delta P_v\) au débit maximal ; (2) \(C_{V,max}\) ; (3) \(C_V\) nominal (fiche Fisher) ; (4) débit minimal contrôlable ? ; (5) cavitation ? ; (6) autorité.

Schéma du bilan de pression :

```
 pompe ──[ conduite amont 60 m ]──►[ VANNE ]──►[ conduite aval 10 m ]──► utilisation
 P_pompe          − ΔP_R1            − ΔP_v          − ΔP_R2              = P_u
```

**1. \(\Delta P_v\) au débit maximal**

- Section : \(A = \pi(0{,}1)^2/4 = 7{,}854\times10^{-3}\) m².
- Vitesse : \(v = 0{,}0125/7{,}854\times10^{-3} = 1{,}59\) m/s.
- Pression dynamique : \(\frac12\rho v^2 = 0{,}5\times998\times1{,}59^2 = 1264\) Pa.
- Amont : \(f\dfrac{L}{D} = 0{,}95\times\dfrac{60}{0{,}1} = 570\) ⇒ \(\Delta P_{R1} = 570\times1264 = 720\,500\) Pa \(= 7{,}205\) bar \(= 104{,}5\) PSI.
- Aval : \(f\dfrac{L}{D} = 0{,}95\times\dfrac{10}{0{,}1} = 95\) ⇒ \(\Delta P_{R2} = 95\times1264 = 120\,100\) Pa \(= 1{,}201\) bar \(= 17{,}4\) PSI.
- Conduites : \(\Delta P_{R1+R2} = 104{,}5 + 17{,}4 = 121{,}9\) PSI.
- Bilan : \(\Delta P_v = P_{pompe} - \Delta P_{R1+R2} - P_u = 205{,}6 - 121{,}9 - 23{,}675 = \mathbf{60{,}0\ PSI} \approx 4{,}14\) bar.

**2. \(C_{V,max}\)**

- \(Q = 12{,}5\) L/s \(= 45\) m³/h ; densité \(= 998/1000 = 0{,}998\) ; \(\Delta P_v = 4{,}14\) bar.
- \(C_{V,max} = 1{,}16\times45\times\sqrt{\dfrac{0{,}998}{4{,}14}} = 1{,}16\times45\times0{,}491 = \mathbf{25{,}6}\).
- Vérification impériale : \(Q = 12{,}5\times60/3{,}785 = 198{,}2\) GPM ; \(C_V = 198{,}2\sqrt{0{,}998/60{,}0} = 25{,}6\) ✓.

**3. \(C_V\) nominal** (vanne linéaire) : \(C_{V,nom} = 1{,}25\times25{,}6 = 32{,}0\). Dans la fiche Fisher fournie, prendre la vanne dont le \(C_V\) à pleine ouverture est **immédiatement supérieur ou égal à 32** (et noter sa rangeabilité et son \(F_L\) pour les questions suivantes). Ci-dessous on raisonne avec \(C_V = 32\) *(hyp. : remplacer par la valeur de la fiche)*.

**4. Le débit minimal est-il contrôlable ?**

- \(Q_{min} = 0{,}556\) L/s \(= 2{,}0\) m³/h ; \(v = 0{,}000556/7{,}854\times10^{-3} = 0{,}0708\) m/s ; \(\frac12\rho v^2 = 2{,}50\) Pa.
- Pertes conduites : \((570 + 95)\times2{,}50 = 1663\) Pa \(= 0{,}0166\) bar \(= 0{,}24\) PSI (négligeables : les pertes varient comme \(Q^2\), et le débit est divisé par 22,5 ⇒ pertes divisées par 506).
- \(\Delta P_v = 138{,}31 - 0{,}24 - 23{,}675 = 114{,}4\) PSI \(= 7{,}89\) bar (presque toute la pression de la pompe est absorbée par la vanne).
- \(C_{V,min\ requis} = 1{,}16\times2{,}0\times\sqrt{\dfrac{0{,}998}{7{,}89}} = 1{,}16\times2{,}0\times0{,}356 = \mathbf{0{,}83}\).
- Rangeabilité requise : \(C_{V,choisi}/C_{V,min} = 32/0{,}83 \approx 39\).
- Si la fiche indique \(r = 50{:}1\) *(hyp.)* : \(C_V\) mini contrôlable \(= 32/50 = 0{,}64 \le 0{,}83\) ⇒ **débit minimal contrôlable**. Si la fiche indiquait \(r = 30{:}1\) : \(32/30 = 1{,}07 > 0{,}83\) ⇒ **non contrôlable** (il faudrait une vanne à plus grande rangeabilité ou un partage d'échelle complémentaire).

**5. La vanne cavite-t-elle ?** (au débit maximal, cas le plus défavorable a priori)

- Pression à l'entrée de la vanne : \(P_1 = P_{pompe} - \Delta P_{R1} = 205{,}6 - 104{,}5 = 101{,}1\) PSI (relatif) ⇒ \(P_{1,abs} = 101{,}1 + 14{,}7 = 115{,}8\) PSIA.
- \(P_v = 0{,}042\) bar \(\times14{,}5 = 0{,}61\) PSIA.
- \(\Delta P_s = 115{,}8 - 0{,}61 = 115{,}2\) PSI.
- Avec \(F_L = 0{,}9\) *(hyp. : prendre la valeur de la fiche)* : \(F_L^2\Delta P_s = 0{,}81\times115{,}2 = 93{,}3\) PSI.
- \(\Delta P_v = 60{,}0 < 93{,}3\) ⇒ **pas de cavitation au débit maximal**.
- Au débit minimal : \(P_1 \approx 138{,}31 - 0{,}21 = 138{,}1\) PSI ⇒ \(152{,}8\) PSIA ; \(\Delta P_s = 152{,}2\) ; \(F_L^2\Delta P_s = 123{,}3\) PSI ; \(\Delta P_v = 114{,}4 < 123{,}3\) ⇒ **pas de cavitation non plus**, mais la marge est faible (93 % du \(\Delta P\) admissible) : à vérifier avec le vrai \(F_L\) de la fiche ; avec \(F_L = 0{,}85\), \(F_L^2\Delta P_s = 110\) PSI < 114,4 ⇒ cavitation au débit minimal.

**6. Autorité de la vanne**

\[
a = \frac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}} = \frac{60{,}0}{60{,}0 + 121{,}9} = \mathbf{0{,}33}
\]

Autorité moyenne-faible : la caractéristique installée sera nettement déformée (la linéaire se comportera comme une ouverture rapide, voir table V.6 : 73 % du débit à mi-course). Une vanne **=%** serait plus judicieuse pour obtenir un comportement installé quasi linéaire ; sinon, prévoir un gain de régulateur adapté ou un positionneur à caractéristique =%.

## VI.5 Bruit — exercice n° 1

**Énoncé** : on a mesuré un bruit de **100 dB à 1 m** de l'appareil. Quel est le niveau à **150 m** ?

- \(\Delta L_d = 20\log\left(\dfrac{150}{1}\right) = 20\times2{,}176 = 43{,}5\) dB.
- \(L(150) = 100 - 43{,}5 = \mathbf{56{,}5\ dB}\) (niveau d'une conversation : acceptable pour le voisinage).

## VI.6 Bruit — exercice n° 2

**Énoncé** : on a mesuré un bruit de **110 dB à 3 m**. (a) Niveau à **700 m** ? (b) À quelle distance le bruit est-il **inférieur à 50 dB** ?

(a) \(\Delta L_d = 20\log\left(\dfrac{700}{3}\right) = 20\log(233{,}3) = 20\times2{,}368 = 47{,}4\) dB ⇒ \(L(700) = 110 - 47{,}4 = \mathbf{62{,}6\ dB}\).

(b) On veut \(L(r) = 50\) ⇒ \(\Delta L_d = 110 - 50 = 60\) dB ⇒ \(20\log(r/3) = 60\) ⇒ \(\log(r/3) = 3\) ⇒ \(r/3 = 1000\) ⇒ **\(r = 3000\) m**. Au-delà de 3 km le bruit est inférieur à 50 dB (en champ libre, sans obstacle ni absorption par l'air : la réalité est plus favorable).

---

# Partie VII — Exercices supplémentaires avec corrigés

Ces exercices reprennent les types de calculs du cours avec d'autres données. Les corrigés sont détaillés ; les données sont des hypothèses d'entraînement.

## VII.1 Signaux et pourcentage d'échelle

**Énoncé** : un transmetteur de température a une échelle de 50 à 250 °C et une sortie 4–20 mA. (a) Quel courant pour 150 °C ? (b) Quelle température pour 7,2 mA ? (c) La mesure passe de 180 à 195 °C : quel \(\Delta X\) en % ?

**Corrigé**
(a) \(X_\% = (150-50)/(250-50) = 50\ \%\) ⇒ \(I = 4 + 16\times0{,}5 = 12\) mA.
(b) \(p = (7{,}2-4)/16 = 20\ \%\) ⇒ \(T = 50 + 0{,}2\times200 = 90\) °C.
(c) \(\Delta X = 15/200 = 7{,}5\ \%\).

## VII.2 Action proportionnelle

**Énoncé** : régulateur P, \(BP = 40\ \%\), \(Y_0 = 50\ \%\), inverse. Échelle 0–10 m, consigne 6 m, mesure 5,5 m. Sortie ? Quel écart faut-il pour saturer la sortie à 100 % ?

**Corrigé** : \(K_p = 100/40 = 2{,}5\). \(\varepsilon = 0{,}5/10 = 5\ \%\). \(Y = 2{,}5\times5 + 50 = 62{,}5\ \%\). Saturation : \(K_p\varepsilon = 50\) ⇒ \(\varepsilon = 20\ \%\) = 2 m (c'est la demi-bande proportionnelle).

## VII.3 PID discret

**Énoncé** : \(K_p = 1{,}5\), \(K_i = 0{,}2\) s⁻¹, \(K_d = 2\) s, \(\Delta T = 2\) s, \(Y_0 = 40\ \%\). Écarts : \(\varepsilon_0 = 0\) (avant la perturbation), \(\varepsilon_1 = 6\), \(\varepsilon_2 = 4\), \(\varepsilon_3 = 1\) %. Calculer \(Y_1\), \(Y_2\), \(Y_3\).

**Corrigé** (somme = \(\sum\varepsilon_i\Delta T\)) :

| \(n\) | \(\varepsilon_n\) | somme | pente | P | I | D | \(Y_n = Y_0 + P + I + D\) |
|---|---|---|---|---|---|---|---|
| 1 | 6 | 12 | \((6-0)/2 = 3\) | 9 | 2,4 | 6 | 57,4 % |
| 2 | 4 | 20 | \((4-6)/2 = -1\) | 6 | 4,0 | −2 | 48,0 % |
| 3 | 1 | 22 | \((1-4)/2 = -1{,}5\) | 1,5 | 4,4 | −3 | 42,9 % |

## VII.4 Ziegler-Nichols en boucle fermée

**Énoncé** : une boucle de température oscille de façon entretenue pour \(G_r = 3\) ; on compte 5 oscillations complètes en 60 s. Paramètres PI et PID ?

**Corrigé** : \(T_{osc} = 60/5 = 12\) s (attention en lisant un enregistrement : 6 maxima successifs délimitent 5 périodes).
PI : \(G_r = 3/2{,}2 = 1{,}36\) ; \(T_i = 1{,}8\times12/3 = 7{,}2\) s.
PID : \(G_r = 3/1{,}7 = 1{,}76\) ; \(T_i = 0{,}85\times12/3 = 3{,}4\) s ; \(T_d = 3\times12/13{,}6 = 2{,}65\) s.

## VII.5 Ziegler-Nichols en boucle ouverte

**Énoncé** : boucle de niveau, échelle 0–2 m. En manuel, la sortie passe de 40 à 48 %. Le niveau, stable à 1,00 m, commence à bouger après 6 s et se stabilise à 1,24 m ; la tangente au point d'inflexion atteint la valeur finale 36 s après le début de l'échelon. Paramètres PI et PID, sens d'action.

**Corrigé** : \(\Delta Y = 8\ \%\) ; \(\Delta X = 0{,}24/2 = 12\ \%\) ; \(G_s = 12/8 = 1{,}5\) ; \(t_d = 6\) s ; \(\tau = 36 - 6 = 30\) s.
PI : \(K_p = 0{,}9\times30/(6\times1{,}5) = 3{,}0\) ; \(T_i = 6/0{,}3 = 20\) s.
PID : \(K_p = 1{,}2\times30/9 = 4{,}0\) ; \(T_i = 6/0{,}5 = 12\) s ; \(T_d = 3\) s.
\(G_s > 0\) (sortie ↑ ⇒ niveau ↑ : vanne d'alimentation) ⇒ régulateur **inverse**.

## VII.6 Méthode graphique

**Énoncé** : courbe de réaction : \(\Delta Y = 15\ \%\), la mesure 4–20 mA passe de 8 à 11 mA, \(\theta = 40\) s. Cahier des charges : \(t_{95\%} \le 30\) s, sans dépassement, erreur nulle. Régulateur PI parallèle ?

**Corrigé** : \(\Delta X = 3/16 = 18{,}75\ \%\) ; \(G_s = 18{,}75/15 = 1{,}25\). \(\theta_d = 30/3 = 10\) s.
\(G_r = \dfrac{1}{1{,}25}\times\dfrac{40}{10} = 3{,}2\) ; \(T_i = 1{,}25\times10 = 12{,}5\) s (\(K_i = 0{,}08\) s⁻¹) ; \(K_d = 0\).

## VII.7 Sens d'action

**Énoncé** : pour chaque cas, donner le sens du régulateur. (a) Température d'un bain chauffé à la vapeur, vanne FMA. (b) Même bain, vanne OMA. (c) Niveau régulé par la vanne de sortie, vanne FMA. (d) Pression dans un réservoir régulée par la vanne d'alimentation en gaz, vanne OMA.

**Corrigé** : (a) sortie ↑ ⇒ vanne ouvre ⇒ T ↑ : procédé direct ⇒ régulateur **inverse**. (b) sortie ↑ ⇒ vanne ferme ⇒ T ↓ : procédé inverse ⇒ régulateur **direct**. (c) sortie ↑ ⇒ vanne ouvre ⇒ niveau ↓ : inverse ⇒ régulateur **direct**. (d) sortie ↑ ⇒ vanne ferme ⇒ P ↓ : inverse ⇒ régulateur **direct**.

## VII.8 Choix d'une boucle complexe

**Énoncé** : quelle structure proposer ? (a) La température de sortie d'un échangeur est perturbée par la pression de vapeur qui varie avec les autres consommateurs. (b) Le niveau d'un ballon est perturbé par un soutirage mesuré mais non commandable. (c) Un réacteur doit être chauffé au démarrage puis refroidi en régime. (d) Une vanne de \(C_V\) 100 doit aussi régler des débits de 1 % du nominal. (e) Le gain d'une boucle de pH est 10 fois plus grand près de la neutralité.

**Corrigé** : (a) **cascade** température (maître) / débit ou pression de vapeur (esclave). (b) **tendance (mixte)** : correcteur alimenté par la mesure du soutirage + boucle de niveau. (c) **partage d'échelle antagoniste** (vanne vapeur / vanne eau froide). (d) **partage d'échelle complémentaire** (petite + grosse vanne). (e) **adaptative** (gain programmé selon le pH).

## VII.9 Partage d'échelle antagoniste

**Énoncé** : sortie 0–100 % ; 0–45 % : vanne froide de 100 à 0 % ; 55–100 % : vanne chaude de 0 à 100 % ; bande morte 45–55 %. Positions pour une sortie de 20 %, 50 %, 70 % ?

**Corrigé** : 20 % ⇒ froide \(= (45-20)/45 = 55{,}6\ \%\), chaude 0. 50 % ⇒ les deux fermées (bande morte). 70 % ⇒ chaude \(= (70-55)/45 = 33{,}3\ \%\), froide 0.

## VII.10 Pertes de charge — conduite en acier

**Énoncé** : eau à 20 °C (\(\rho = 998\) kg/m³, \(\mu = 1{,}0\times10^{-3}\) Pa·s), \(Q = 5\) L/s, conduite acier \(D = 50\) mm, \(L = 120\) m, \(f = 0{,}022\) (fourni). Singularités : 4 coudes 90° (\(\xi = 0{,}75\)), 1 robinet à soupape ouvert (\(\xi = 6\)), entrée de réservoir (0,5), sortie dans réservoir (1,0). Pertes totales en Pa, bar et m CE ? Régime ?

**Corrigé**
- \(A = \pi(0{,}05)^2/4 = 1{,}963\times10^{-3}\) m² ; \(v = 0{,}005/1{,}963\times10^{-3} = 2{,}55\) m/s.
- \(\frac12\rho v^2 = 0{,}5\times998\times2{,}55^2 = 3236\) Pa.
- \(Re = 998\times2{,}55\times0{,}05/10^{-3} = 127\,000\) ⇒ turbulent.
- Linéique : \(0{,}022\times(120/0{,}05)\times3236 = 0{,}022\times2400\times3236 = 170\,900\) Pa.
- Singulières : \(\sum\xi = 3 + 6 + 0{,}5 + 1 = 10{,}5\) ⇒ \(10{,}5\times3236 = 34\,000\) Pa.
- Total : \(204\,900\) Pa \(= 2{,}05\) bar \(= 204\,900/(998\times9{,}81) = 20{,}9\) m CE.
- Ici les singularités représentent 17 % du total ; le robinet à soupape à lui seul vaut plus que les 4 coudes.

## VII.11 Pertes de charge — effet du diamètre

**Énoncé** : reprendre VII.10 avec \(D = 65\) mm (même \(f\)). Facteur de réduction ?

**Corrigé** : \(v = 0{,}005/(3{,}318\times10^{-3}) = 1{,}51\) m/s ; \(\frac12\rho v^2 = 1134\) Pa ; linéique \(0{,}022\times(120/0{,}065)\times1134 = 46\,100\) Pa ; singulières \(10{,}5\times1134 = 11\,900\) Pa ; total \(58\,000\) Pa = 0,58 bar. Réduction d'un facteur 3,5 (théorie \((65/50)^5 = 3{,}7\) pour le linéique, \((65/50)^4 = 2{,}9\) pour les singulières).

## VII.12 Colebrook

**Énoncé** : \(Re = 2\times10^5\), acier commercial \(\epsilon = 0{,}045\) mm, \(D = 100\) mm. Calculer \(f\).

**Corrigé** : \(\epsilon/D = 4{,}5\times10^{-4}\). Itération depuis \(f_0 = 0{,}02\) : \(1/\sqrt f = -2\log_{10}(4{,}5\times10^{-4}/3{,}7 + 2{,}51/(2\times10^5\times0{,}1414)) = -2\log_{10}(1{,}216\times10^{-4} + 8{,}87\times10^{-5}) = -2\log_{10}(2{,}10\times10^{-4}) = 7{,}355\) ⇒ \(f_1 = 0{,}0185\). Deuxième passe : \(\sqrt{f_1} = 0{,}136\) ; \(2{,}51/(2\times10^5\times0{,}136) = 9{,}23\times10^{-5}\) ; somme \(2{,}14\times10^{-4}\) ; \(1/\sqrt f = 7{,}34\) ⇒ \(f = 0{,}0186\). **\(f \approx 0{,}0186\)**.

## VII.13 \(C_V\) — vanne égal pourcentage, fluide de densité 0,85

**Énoncé** : huile de densité 0,85, \(Q_{max} = 30\) m³/h, \(\Delta P_v = 2{,}5\) bar, vanne =%. Gamme : 16, 22, 30, 49. Choix ?

**Corrigé** : \(C_{V,max} = 1{,}16\times30\times\sqrt{0{,}85/2{,}5} = 1{,}16\times30\times0{,}583 = 20{,}3\). =% ⇒ \(C_{V,nom} = 1{,}4\times20{,}3 = 28{,}4\) ⇒ **\(C_V = 30\)**. (Avec une linéaire : \(1{,}25\times20{,}3 = 25{,}4\) ⇒ aussi 30.)

## VII.14 Rangeabilité

**Énoncé** : suite de VII.13, \(r = 50\). Le débit minimal est 1,5 m³/h sous \(\Delta P_v = 6\) bar. Contrôlable ?

**Corrigé** : \(C_{V,min} = 1{,}16\times1{,}5\times\sqrt{0{,}85/6} = 1{,}74\times0{,}376 = 0{,}65\). \(C_V\) mini contrôlable \(= 30/50 = 0{,}60\). \(0{,}65 \ge 0{,}60\) ⇒ **contrôlable**, de justesse. Avec \(r = 30\) (0,60 → 1,0) ⇒ non contrôlable.

## VII.15 \(C_V\) inversé — débit à travers une vanne connue

**Énoncé** : une vanne de \(C_V = 12\) (pleine ouverture) est alimentée en eau sous un \(\Delta P\) de 1,5 bar. Débit maximal ?

**Corrigé** : \(Q = \dfrac{C_V}{1{,}16}\sqrt{\dfrac{\Delta P}{d}} = \dfrac{12}{1{,}16}\sqrt{1{,}5} = 10{,}34\times1{,}225 = 12{,}7\) m³/h \(= 3{,}5\) L/s.

## VII.16 Cavitation — eau chaude

**Énoncé** : eau à 50 °C (\(P_v = 0{,}123\) bar abs), \(P_1 = 6{,}0\) bar relatif, \(P_2 = 1{,}5\) bar relatif, \(F_L = 0{,}85\), \(P_{atm} = 1{,}013\) bar. (a) Cavitation ? (b) Si \(P_2\) chute à 1,0 bar ? (c) Quel \(F_L\) minimal pour éviter la cavitation dans le cas (b) ?

**Corrigé**
(a) \(\Delta P = 4{,}5\) bar. \(P_{1,abs} = 7{,}013\) bar ; \(\Delta P_s = 7{,}013 - 0{,}123 = 6{,}89\) bar ; \(F_L^2\Delta P_s = 0{,}7225\times6{,}89 = 4{,}98\) bar. \(4{,}5 < 4{,}98\) ⇒ **pas de cavitation** (marge 10 %).
(b) \(\Delta P = 5{,}0 \ge 4{,}98\) ⇒ **cavitation**.
(c) \(F_L \ge \sqrt{5{,}0/6{,}89} = 0{,}852\) ⇒ en pratique une vanne avec \(F_L \ge 0{,}9\) (à cage).

## VII.17 Bruit

**Énoncé** : 95 dB mesurés à 2 m. (a) Niveau à 50 m ? (b) À partir de quelle distance est-on sous 85 dB (port de protections non obligatoire) ? (c) Niveau à 1 m ?

**Corrigé**
(a) \(\Delta L_d = 20\log(25) = 28{,}0\) dB ⇒ \(67{,}0\) dB.
(b) \(95 - 85 = 10 = 20\log(r/2)\) ⇒ \(r = 2\times10^{0{,}5} = 6{,}3\) m.
(c) \(\Delta L_d = 20\log(1/2) = -6{,}0\) dB ⇒ \(L = 95 + 6 = 101\) dB (on se rapproche : le niveau augmente).

## VII.18 Vanne 3 voies

**Énoncé** : vanne mélangeuse, \(Q_{sortie} = 36\) m³/h, course \(\alpha = 0{,}6\) côté eau chaude. Débits d'eau chaude et d'eau froide ? Si l'eau chaude est à 80 °C et l'eau froide à 20 °C, température du mélange *(complément)* ?

**Corrigé** : \(Q_{chaud} = 0{,}6\times36 = 21{,}6\) m³/h ; \(Q_{froid} = 0{,}4\times36 = 14{,}4\) m³/h. Mélange : \(T = 0{,}6\times80 + 0{,}4\times20 = 56\) °C.

## VII.19 Autorité et choix de caractéristique

**Énoncé** : au débit maximal, la vanne absorbe 1,2 bar et le reste du circuit 2,8 bar. Autorité ? Quelle caractéristique choisir ? Débit relatif à mi-course pour une vanne linéaire ?

**Corrigé** : \(a = 1{,}2/(1{,}2+2{,}8) = 0{,}30\). Autorité faible ⇒ **=%**. Linéaire à \(h = 0{,}5\) : \(Q/Q_{max} = 0{,}5/\sqrt{0{,}3 + 0{,}25\times0{,}7} = 0{,}5/0{,}689 = 0{,}73\) (déjà 73 % du débit à mi-course).

## VII.20 Égal pourcentage

**Énoncé** : vanne =% de rangeabilité 50, \(Q_{max} = 100\) m³/h (à \(\Delta P\) constant). Débit à 30 %, 50 %, 80 % de course ? De combien (en %) le débit augmente-t-il quand la course passe de 50 à 60 % ? Et de 80 à 90 % ?

**Corrigé** : \(Q/Q_{max} = 50^{h-1}\). \(h = 0{,}3\) : \(50^{-0{,}7} = 0{,}065\) ⇒ 6,5 m³/h. \(h = 0{,}5\) : 0,141 ⇒ 14,1 m³/h. \(h = 0{,}8\) : \(50^{-0{,}2} = 0{,}457\) ⇒ 45,7 m³/h. Chaque +10 % de course multiplie le débit par \(50^{0{,}1} = 1{,}48\), soit **+48 %** dans les deux cas (c'est la définition de l'égal pourcentage) : de 14,1 à 20,9 m³/h, et de 45,7 à 67,6 m³/h.

---
# Partie VIII — Tables : conversions, constantes, propriétés

## VIII.1 Conversions

| Grandeur | Conversions |
|---|---|
| Pression | 1 bar = 100 000 Pa = 100 kPa = 14,5 PSI = 10,2 m CE = 750 mmHg ; 1 PSI = 6895 Pa = 0,0689 bar = 0,703 m CE = 2,31 pi d'eau ; 1 atm = 1,013 bar = 14,7 PSI = 101,3 kPa ; 1 kPa = 0,145 PSI |
| Hauteur d'eau | 1 m CE = 9810 Pa = 0,0981 bar = 1,42 PSI ; 1 pi d'eau = 2989 Pa = 0,433 PSI |
| Débit | 1 GPM US = 3,785 L/min = 0,0631 L/s = 0,227 m³/h ; 1 L/s = 3,6 m³/h = 15,85 GPM = 60 L/min ; 1 m³/h = 0,278 L/s = 4,40 GPM ; 1 L/min = 0,264 GPM |
| Longueur | 1 pi = 0,3048 m = 12 po ; 1 po = 25,4 mm ; 1 m = 3,281 pi |
| Surface | 1 po² = 645,2 mm² ; 1 pi² = 0,0929 m² |
| Volume | 1 gal US = 3,785 L ; 1 pi³ = 28,32 L = 7,48 gal ; 1 m³ = 1000 L = 264,2 gal |
| Masse volumique | 1000 kg/m³ = 62,4 lb/pi³ = 1 kg/L ; densité relative = \(\rho/\rho_{eau}\) (sans unité) |
| Viscosité dynamique | 1 Pa·s = 1000 mPa·s = 1000 cP ; eau 20 °C ≈ 1 cP |
| Température | °C = (°F − 32)/1,8 ; °F = 1,8 °C + 32 ; K = °C + 273,15 ; 60 °F = 15,6 °C |
| Force | 1 N = 0,2248 lbf ; 1 kgf = 9,81 N |
| Signaux | 4–20 mA ↔ 0–100 % (16 mA de plage) ; 3–15 PSI ↔ 0–100 % (12 PSI de plage) ; 0,2–1,0 bar ↔ 0–100 % |
| Temps | 1 min = 60 s ; \(T_i\) en « minutes par répétition » = \(T_i\) (s) / 60 ; « répétitions par minute » = \(60/T_i\) (s) |

## VIII.2 Constantes

| Constante | Valeur |
|---|---|
| \(g\) | 9,81 m/s² |
| \(P_{atm}\) normale | 101 325 Pa = 1,013 bar = 14,7 PSI |
| \(\rho_{eau}\) de référence | 1000 kg/m³ (4 °C) |
| \(C_V\) ↔ \(K_V\) | \(C_V = 1{,}16\,K_V\) ; \(K_V = 0{,}865\,C_V\) |
| Facteurs \(C_V\) nominal | 1,25 (linéaire) ; 1,4 (=%) |
| Ziegler-Nichols BF | 2 ; 2,2 ; 1,7 ; 1,8 ; 0,85 ; 13,6 |
| Ziegler-Nichols BO | 1 ; 0,9 ; 1,2 ; 0,3 ; 0,5 ; 2 |
| Réponse 1er ordre | 63 % à \(1\theta\), 86 % à \(2\theta\), 95 % à \(3\theta\), 98 % à \(4\theta\), 99 % à \(5\theta\) |
| Reynolds | laminaire < 2000 ; turbulent > 4000 |
| Colebrook | 3,7 et 2,51 |
| Bruit | 20 log ; ×2 ⇒ −6 dB ; ×10 ⇒ −20 dB |

## VIII.3 Propriétés de l'eau *(valeurs usuelles)*

| T (°C) | T (°F) | \(\rho\) (kg/m³) | \(\mu\) (mPa·s) | \(P_v\) (bar abs) | \(P_v\) (PSIA) |
|---|---|---|---|---|---|
| 0 | 32 | 999,8 | 1,79 | 0,0061 | 0,089 |
| 4 | 39 | 1000,0 | 1,57 | 0,0081 | 0,118 |
| 10 | 50 | 999,7 | 1,31 | 0,0123 | 0,178 |
| 15,6 | 60 | 999,0 | 1,12 | 0,0177 | 0,256 |
| 20 | 68 | 998,2 | 1,00 | 0,0234 | 0,339 |
| 30 | 86 | 995,7 | 0,80 | 0,0424 | 0,615 |
| 40 | 104 | 992,2 | 0,65 | 0,0738 | 1,07 |
| 50 | 122 | 988,0 | 0,55 | 0,1235 | 1,79 |
| 60 | 140 | 983,2 | 0,47 | 0,1994 | 2,89 |
| 70 | 158 | 977,8 | 0,40 | 0,3119 | 4,52 |
| 80 | 176 | 971,8 | 0,35 | 0,4739 | 6,87 |
| 90 | 194 | 965,3 | 0,31 | 0,7014 | 10,2 |
| 100 | 212 | 958,4 | 0,28 | 1,0133 | 14,7 |
| 120 | 248 | 943,1 | 0,23 | 1,985 | 28,8 |
| 150 | 302 | 917,0 | 0,18 | 4,76 | 69,0 |

Remarques : \(P_v\) double environ tous les 15 °C autour de la température ambiante ; à 100 °C elle atteint la pression atmosphérique (ébullition). La viscosité est divisée par 2 entre 20 et 50 °C, ce qui augmente \(Re\) d'autant.

## VIII.4 Rugosités absolues *(valeurs usuelles)*

| Matériau | \(\epsilon\) (mm) | \(\epsilon/D\) pour \(D\) = 50 mm |
|---|---|---|
| PVC, PE, verre, cuivre, laiton | 0,0015 | \(3\times10^{-5}\) |
| Acier inoxydable | 0,002 – 0,01 | \(4\times10^{-5}\) – \(2\times10^{-4}\) |
| Acier commercial neuf | 0,045 | \(9\times10^{-4}\) |
| Acier galvanisé | 0,15 | \(3\times10^{-3}\) |
| Fonte neuve | 0,26 | \(5\times10^{-3}\) |
| Fonte usagée / acier rouillé | 1 – 1,5 | 0,02 – 0,03 |
| Béton | 0,3 – 3 | 0,006 – 0,06 |

## VIII.5 Coefficients \(\xi\) de singularités *(valeurs usuelles)*

| Singularité | \(\xi\) | Singularité | \(\xi\) |
|---|---|---|---|
| Entrée arêtes vives | 0,5 | Robinet à bille ouvert | 0,05 – 0,1 |
| Entrée arrondie | 0,04 – 0,1 | Robinet-vanne ouvert | 0,15 – 0,2 |
| Entrée saillante | 1,0 | Robinet-vanne ½ fermé | 2 – 5 |
| Sortie dans réservoir | 1,0 | Robinet à soupape ouvert | 6 – 10 |
| Coude 90° normal | 0,75 | Robinet d'équerre ouvert | 2 – 5 |
| Coude 90° grand rayon | 0,45 | Papillon ouvert | 0,3 – 0,5 |
| Coude 90° à onglet | 1,3 | Clapet antiretour à battant | 2 – 2,5 |
| Coude 45° | 0,4 | Clapet antiretour à ressort | 4 – 6 |
| Coude 180° (retour) | 1,5 – 2,2 | Crépine | 2 – 3 |
| Té passage direct | 0,4 | Filtre, compteur | 5 – 10 |
| Té dérivation | 1,3 – 1,8 | Élargissement brusque | \((1-A_1/A_2)^2\) |
| Raccord union | 0,04 | Rétrécissement brusque | \(\approx 0{,}5(1-A_2/A_1)\) |

## VIII.6 Diamètres usuels

| Désignation | Cuivre (ext-int, mm) | Acier DN (int. approx., mm) | Pouces |
|---|---|---|---|
| 12-10 | 12 / 10 | DN 10 : 12,5 | 3/8" |
| 15-13 | 15 / 13 | DN 15 : 16 | 1/2" |
| 18-16 | 18 / 16 | DN 20 : 21,6 | 3/4" |
| 22-20 | 22 / 20 | DN 25 : 27,2 | 1" |
| 28-26 | 28 / 26 | DN 32 : 36 | 1 1/4" |
| 35-33 | 35 / 33 | DN 40 : 41,9 | 1 1/2" |
| 42-40 | 42 / 40 | DN 50 : 53 | 2" |
| 54-52 | 54 / 52 | DN 65 : 68,8 | 2 1/2" |
| — | — | DN 80 : 80,8 | 3" |
| — | — | DN 100 : 105,3 | 4" |

Pour une désignation cuivre « ext-int », le second nombre est le **diamètre intérieur** à utiliser dans les calculs.

---

# Partie IX — Fiches synthèse, glossaire, index des symboles

## IX.1 Fiche synthèse — Contrôle PID

**Régulateur** = comparateur (\(\varepsilon = W - X\)) + correcteur PID. Modes : **auto** (correcteur calcule) / **manuel** (opérateur impose). Sens : **direct** (sortie suit la mesure) / **inverse** (sortie opposée) ; le régulateur doit être **inversé par rapport au procédé** (procédé direct ⇒ régulateur inverse).

**P** : \(Y = \pm K_p\varepsilon + Y_0\), \(BP = 100/K_p\). Rapide, **erreur statique**. **I** : \(K_i\int\varepsilon\), \(K_i = 1/T_i\). **Annule l'erreur statique**, ralentit, dépassement. **D** : \(K_d\,d\varepsilon/dt\). **Anticipe, amortit**, amplifie le bruit, inutile en régime permanent.

**PID parallèle** : \(Y = K_p\varepsilon + K_i\int\varepsilon\,dt + K_d\,d\varepsilon/dt\). **Discret** : intégrale ⇒ \(\sum\varepsilon_i\Delta T\) ; dérivée ⇒ \((\varepsilon_n - \varepsilon_{n-1})/\Delta T\).

**Réglages** :

- **ZN boucle fermée** : auto, P seul, \(G_r\) ↑ jusqu'à oscillation entretenue ⇒ \(G_c\), \(T_{osc}\) ⇒ tableau (2 ; 2,2 ; 1,7 / 1,8 ; 0,85 / 13,6).
- **ZN boucle ouverte** : manuel, échelon \(\Delta Y\), relever \(\Delta X\) (%), \(t_d\), \(\tau\) ⇒ \(G_s = \Delta X/\Delta Y\) ⇒ tableau (1 ; 0,9 ; 1,2 / 0,3 ; 0,5 / 2).
- **Graphique** : \(G_s\), \(\theta\), choisir \(\theta_d\) (\(t_{95\%} = 3\theta_d\)) ⇒ PI : \(G_r = \dfrac{1}{G_s}\dfrac{\theta}{\theta_d}\), \(T_i = G_s\theta_d\). Sans dépassement, sans erreur.
- **Approximations successives** : auto, ordre **P, D, I**, partir du procédé stabilisé à la consigne.

**Influence** : \(K_p\) ↑ ⇒ montée ↓, dépassement ↑, erreur ↓ ; I ↑ ⇒ erreur annulée, dépassement ↑, stabilisation ↑ ; \(T_d\) ↑ ⇒ dépassement ↓, stabilisation ↓.

**Boucles complexes** : réglante perturbée ⇒ **cascade 2 éléments** ; intermédiaire perturbée ⇒ **cascade 3 éléments** ; perturbation mesurable non régulée ⇒ **tendance / mixte** ; réglante inefficace ⇒ **partage d'échelle** (antagoniste : 2 sens ; complémentaire : 2 tailles) ; non linéaire ⇒ **adaptative**.

## IX.2 Fiche synthèse — Pertes de charge

**Définition** : chutes de pression dues à la résistance à l'écoulement. **Linéiques** (le long des conduites ; dépendent de \(v\) et \(\epsilon/D\)) + **singulières** (coudes, raccords, vannes ; coefficient \(\xi\) de tableau).

\(\Delta P = f\dfrac{L}{D}\dfrac12\rho v^2\) ; \(\Delta h = f\dfrac{L}{D}\dfrac{v^2}{2g}\) ; \(\Delta P = \rho g\Delta h\) ; \(\Delta P_{sing} = \xi\dfrac12\rho v^2\) ; \(v = 4Q/(\pi D^2)\).

**\(f\)** : rugosité relative \(\epsilon/D\) → \(Re = \rho vD/\mu\) → Colebrook \(\dfrac{1}{\sqrt f} = -2\log_{10}\left[\dfrac{\epsilon/D}{3{,}7} + \dfrac{2{,}51}{Re\sqrt f}\right]\) (itérer). **Fourni dans le cours** ; sinon abaque (\(v\), \(D\) ⇒ perte par unité de longueur).

**Démarche** : SI → \(v\) → \(\frac12\rho v^2\) → \(f\frac{L}{D}\) → linéique → \(\sum\xi\) → singulières → total → convertir. Diamètre **intérieur**.

**Exercice type** : cuivre 22-20, 7,94 GPM, 100 m, eau 50 °C ⇒ \(v = 1{,}59\) m/s, \(\Delta P \approx 1{,}3\) bar (≈ 13 m CE) ; 2 coudes + robinet à bille ajoutent ≈ 2 kPa.

## IX.3 Fiche synthèse — Vannes de régulation

**Définition** : actionneur contrôlant un débit de façon **progressive**. **Corps** (fluide) + **servomoteur** (commande → mouvement) + **arcade** (lien ; tige, index de course).

**Corps** : simple siège (simple, siège démontable, non équilibré, cavitation) ; double siège (équilibré, \(C_V\) ↑, moins étanche) ; cage (anti-cavitation, anti-bruit, fluide propre, \(C_V\) ↓) ; rotatif excentré (très bon \(C_V\), étanche, −200/400 °C, cavitation, \(C_V\) fixe) ; papillon (compact, bon \(C_V\), moment ↑↑, pas étanche) ; boisseau sphérique (étanche, pas cher, grand \(C_V\), cavitation) ; membrane (étanche aux particules, nettoyable, pas de presse-étoupe, usure, T/P limitées) ; d'angle (simple siège à 90°, nettoyage, remplace un coude) ; 3 voies (mélangeuse 2E/1S, répartitrice 1E/2S, \(Q_e = Q_{s1}+Q_{s2}\), \(Q_{s1} = \alpha Q_e\), pas équilibrée, actionneur ↑).

**Servomoteur** : efforts, sens d'action, type de commande, technologie (pneu/élec/hydr), accessoires. Puissance suffisante à l'ouverture et à la fermeture ; pression d'alimentation selon pression max du fluide. **FMA** (air ouvre, NF) / **OMA** (air ferme, NO) selon la position de **sécurité**.

**Caractéristiques intrinsèques** (\(\Delta P\) constant) : linéaire ; **=%** \(Q = Q_0e^{nh}\) ; **OR** (> 50 % du débit au 1er tiers). **Installée** (\(\Delta P\) variable) : déformée ; **autorité** \(a = \dfrac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}}\) ; \(a = 1\) ⇒ intrinsèque ; \(a\) petit ⇒ très déformée ⇒ préférer =%.

**Positionneur** : relais d'asservissement (consigne de position vs position réelle, PID). Nécessaire si \(\Delta P\) élevé ou fluctuant, fluide visqueux/collant, grippage, temps de réponse variable, caractéristique à adapter.

**\(C_V\)** : \(C_V = Q\sqrt{d/\Delta P}\) (GPM, PSI) ; \(C_V = 1{,}16\,Q\sqrt{d/\Delta P}\) (m³/h, bar). Nominal : ×1,25 (lin), ×1,4 (=%) ⇒ \(C_V\) constructeur ≥. Sous-dim. : débit ↓, vaporisation, pertes ↑, \(P_2\) ↓. Sur-dim. : coût, débit irrégulier (\(\Delta P\) insuffisant), oscillations internes, vannes 3-4 orifices figées, cavitation.

**Rangeabilité** : \(r = C_{V,maxi}/C_{V,mini}\) contrôlables ; intrinsèque (fiche) > installée. Vérif. : \(C_{V,min\ requis} \ge C_{V,choisi}/r\).

**Cavitation** : vitesse ↑ au siège ⇒ \(P < P_v\) ⇒ bulles ⇒ implosion en aval (7000 bar, destruction, vibrations, bruit). Critère : \(\Delta P \ge F_L^2(P_1 - P_v)\) en **absolu**. Solutions : \(F_L\) plus grand ; déplacer la vanne (\(P_2\) ↑, fluide plus froid) ; vanne de contournement.

**Bruit** : dépend de la turbulence / vitesse ; sécurité, durabilité, voisinage ; pas de standard ⇒ mesure à \(r_\theta\) puis \(\Delta L_d = 20\log(r/r_\theta)\), \(L = L_\theta - \Delta L_d\).

## IX.4 Glossaire

| Terme | Définition courte |
|---|---|
| Abaque | Graphique permettant de lire une grandeur (ex. perte de charge par mètre) à partir de deux autres (débit, diamètre). |
| Actionneur | Élément qui agit sur le procédé (vanne, variateur, résistance). |
| Air ouvre / air ferme | Vanne qui s'ouvre / se ferme quand la pression d'air de commande augmente. |
| Anti-windup | Dispositif limitant l'intégrale quand la sortie est saturée *(complément)*. |
| Arcade | Pièce reliant le corps de vanne au servomoteur. |
| Autorité | Rapport entre la perte de charge de la vanne et celle du circuit complet. |
| Bande proportionnelle | Plage d'écart (en %) faisant parcourir 100 % à la sortie ; \(100/K_p\). |
| Bumpless | Transfert manuel ↔ automatique sans à-coup *(complément)*. |
| Cage | Chemise percée guidant le clapet et fractionnant l'écoulement. |
| Cascade | Deux régulateurs imbriqués, la sortie du maître fixant la consigne de l'esclave. |
| Cavitation | Formation puis implosion de bulles de vapeur dans un liquide détendu. |
| Caractéristique intrinsèque | Relation \(Q(h)\) à \(\Delta P\) constant. |
| Caractéristique installée | Relation \(Q(h)\) réelle, à \(\Delta P\) variable. |
| Clapet | Pièce mobile obturant le siège. |
| Colebrook | Équation implicite donnant le coefficient de frottement en turbulent. |
| Comparateur | Élément calculant l'écart consigne − mesure. |
| Consigne | Valeur désirée de la grandeur réglée. |
| Correcteur | Élément calculant la sortie à partir de l'écart (PID). |
| Courbe de réaction | Réponse de la mesure à un échelon de commande en boucle ouverte. |
| \(C_V\) | Coefficient de débit : GPM d'eau sous 1 PSI à pleine ouverture. |
| Décibel | Unité logarithmique de niveau sonore. |
| Dépassement | Excursion de la mesure au-delà de la consigne lors d'un transitoire. |
| Écart | Consigne − mesure. |
| Égal pourcentage | Caractéristique où un pas de course multiplie le débit par un facteur constant. |
| Erreur statique | Écart résiduel en régime permanent. |
| Esclave | Régulateur interne d'une cascade. |
| \(F_L\) | Coefficient de récupération de pression d'une vanne. |
| Flashing | Vaporisation sans implosion (pression aval < \(P_v\)) *(complément)*. |
| FMA / OMA | Fermée / ouverte par manque d'air (position de sécurité). |
| Gain critique | Gain du régulateur P provoquant l'oscillation entretenue. |
| Gain statique | Rapport \(\Delta X/\Delta Y\) en régime permanent. |
| Grandeur réglante | Grandeur manipulée par l'actionneur. |
| Grandeur réglée | Grandeur maintenue à la consigne. |
| \(K_V\) | Coefficient de débit métrique (m³/h sous 1 bar) *(complément)*. |
| Laminaire / turbulent | Régimes d'écoulement (Re < 2000 / > 4000). |
| Maître | Régulateur externe d'une cascade. |
| Mixte (régulation) | Boucle fermée + tendance. |
| Ouverture rapide | Caractéristique libérant > 50 % du débit au premier tiers de course. |
| Partage d'échelle | Un régulateur commandant deux actionneurs sur deux plages de sa sortie. |
| Perte de charge | Chute de pression due à la résistance à l'écoulement. |
| Pompage | Oscillation entretenue d'une boucle. |
| Positionneur | Asservissement local de la position du clapet. |
| Presse-étoupe | Garniture d'étanchéité autour de la tige. |
| Pression de vapeur | Pression à laquelle un liquide bout à une température donnée. |
| Rangeabilité | Rapport débit max / débit min contrôlables. |
| Régulation adaptative | Réglage automatique des paramètres selon le point de fonctionnement. |
| Régulation de tendance | Correction anticipée à partir de la mesure de la perturbation. |
| Retard (temps mort) | Délai avant que la mesure ne réagisse à la commande. |
| Reynolds | Nombre sans dimension caractérisant le régime d'écoulement. |
| Rugosité | Hauteur des aspérités de la paroi (\(\epsilon\)) ; relative : \(\epsilon/D\). |
| Sens d'action | Direct ou inverse (régulateur, procédé, servomoteur). |
| Servomoteur | Actionneur convertissant la commande en mouvement. |
| Siège | Surface fixe sur laquelle le clapet vient fermer. |
| Singularité | Accident de parcours (coude, té, vanne) créant une perte locale. |
| Temps intégral / dérivé | \(T_i\), \(T_d\) : réglages des actions I et D. |
| Vena contracta | Section minimale du jet juste en aval du siège *(complément)*. |
| Ziegler-Nichols | Méthodes de réglage empiriques (boucle fermée / ouverte). |

## IX.5 Index des symboles

| Symbole | Signification | Unité |
|---|---|---|
| \(a\) | autorité de la vanne | — |
| \(A\) | section de passage | m² |
| \(BP\) | bande proportionnelle | % |
| \(C_V\) | coefficient de débit | GPM/√PSI |
| \(d\), densité | densité relative à l'eau | — |
| \(D\) | diamètre intérieur | m |
| \(\epsilon\) | rugosité absolue | m (mm) |
| \(\varepsilon\) | écart consigne − mesure | % |
| \(f\) | coefficient de frottement (Darcy) | — |
| \(F_L\) | coefficient de récupération de pression | — |
| \(g\) | accélération de la pesanteur | m/s² |
| \(G_c\) | gain critique | — |
| \(G_r\) | gain du régulateur | — |
| \(G_s\) | gain statique du procédé | %/% |
| \(h\) | course relative du clapet | 0–1 |
| \(\Delta h\) | perte de hauteur (de charge) | m |
| \(K_p, K_i, K_d\) | gains P, I, D | —, s⁻¹, s |
| \(L\) | longueur de conduite | m |
| \(L(r)\), \(\Delta L_d\) | niveau sonore, atténuation | dB |
| \(\mu\) | viscosité dynamique | Pa·s |
| \(n\) | coefficient propre de la vanne =% | — |
| \(P_1, P_2\) | pressions amont, aval de la vanne | PSI, bar |
| \(P_v\) | pression de vapeur | PSIA, bar abs |
| \(P_u\) | pression utile | PSI, bar |
| \(\Delta P\), \(\Delta P_v\) | chute de pression (de la vanne) | Pa, PSI, bar |
| \(\Delta P_s\) | \(P_1 - P_v\) | PSI, bar |
| \(\Delta P_{R1+R2}\) | pertes du reste du circuit | PSI, bar |
| \(Q\), \(Q_e\), \(Q_s\) | débit, débit d'entrée, de sortie | m³/s, m³/h, L/s, GPM |
| \(Q_0\) | débit minimal contrôlable (=%) | |
| \(r\) | rangeabilité ; distance (bruit) | — ; m |
| \(r_\theta\) | distance de référence (bruit) | m |
| \(Re\) | nombre de Reynolds | — |
| \(\rho\) | masse volumique | kg/m³ |
| \(t_d\) | retard (temps mort) | s |
| \(\tau\), \(\theta\) | constante de temps du procédé | s |
| \(\theta_d\) | constante de temps désirée en boucle fermée | s |
| \(T_i, T_d\) | temps intégral, temps dérivé | s |
| \(T_{osc}\) | période des oscillations entretenues | s |
| \(\Delta T\) | période d'échantillonnage | s |
| \(v\) | vitesse moyenne du fluide | m/s |
| \(W\), \(X\), \(Y\) | consigne, mesure, sortie du régulateur | % |
| \(\Delta X\), \(\Delta Y\) | variation de mesure, échelon de commande | % |
| \(Y_0\) | sortie au repos | % |
| \(\alpha\) | fraction de course (vanne 3 voies) | 0–1 |
| \(\xi\) | coefficient de perte singulière | — |

---

# Partie X — Questions de cours probables et pièges d'examen

## X.1 Questions de cours avec réponses modèles

**Contrôle PID**

1. *Qu'est-ce qu'un régulateur PID ?* — Un dispositif qui produit un signal de sortie en corrigeant l'écart entre la mesure et la consigne ; il est constitué d'un comparateur et d'un correcteur PID.
2. *Différence entre action directe et action inverse ?* — Directe : la sortie évolue dans le même sens que la mesure ; inverse : dans le sens opposé. Le régulateur doit être de sens inverse à celui du procédé.
3. *Pourquoi l'action proportionnelle seule laisse-t-elle une erreur statique ?* — Parce que la sortie n'est différente de \(Y_0\) que s'il existe un écart ; maintenir la vanne dans une position différente de celle du repos exige un écart permanent \(= (Y - Y_0)/K_p\).
4. *Rôle de l'action intégrale ? Son inconvénient ?* — Annuler l'erreur statique en accumulant l'écart ; elle ralentit la boucle et augmente le dépassement (et peut saturer).
5. *Rôle de l'action dérivée ? Quand ne pas l'utiliser ?* — Anticiper et amortir en réagissant à la vitesse de variation de l'écart ; à éviter sur les mesures bruitées (débit) car elle amplifie le bruit.
6. *Que devient l'intégrale dans un PID numérique ?* — Une somme des écarts multipliés par la période d'échantillonnage ; la dérivée devient la différence entre deux écarts successifs divisée par \(\Delta T\).
7. *Étapes de Ziegler-Nichols en boucle fermée ?* — Automatique, P seul ; \(G_r \le 1\) ; stabiliser ; augmenter \(G_r\) jusqu'à l'oscillation entretenue ; relever \(G_c\) et \(T_{osc}\) ; appliquer le tableau.
8. *Étapes de la méthode en boucle ouverte ?* — Manuel ; stabiliser ; échelon \(\Delta Y\) ; relever \(\Delta X\) (en %), \(t_d\), \(\tau\) ; \(G_s = \Delta X/\Delta Y\) ; tableau.
9. *Que faut-il choisir dans la méthode graphique et pourquoi ?* — Le temps de réponse désiré \(\theta_d\) (cahier des charges : \(t_{95\%} = 3\theta_d\)) ; il fixe la rapidité de la boucle fermée sans dépassement.
10. *Dans quel ordre règle-t-on par approximations successives ?* — P, puis D, puis I, en partant chaque fois du procédé stabilisé à la consigne.
11. *Effet d'une augmentation de \(K_p\) ?* — Temps de montée ↓, dépassement ↑, erreur statique ↓ (sans l'annuler), stabilité ↓.
12. *Deux limites du PID simple ?* — Procédé à caractéristique non symétrique ou non linéaire ; impossibilité de corriger l'erreur rapidement et/ou complètement.
13. *Quand utilise-t-on une cascade ? Avantages, inconvénients ?* — Quand la grandeur réglante (ou une grandeur intermédiaire) est perturbée. L'esclave filtre les fluctuations et améliore la dynamique ; coût d'une boucle supplémentaire, plus complexe.
14. *Qu'est-ce que la régulation de tendance ?* — Correction de l'effet prédit d'une perturbation mesurée, avant qu'elle n'agisse sur la grandeur réglée ; nécessite un transmetteur supplémentaire et un correcteur difficile à configurer. Associée à la boucle fermée : régulation mixte.
15. *Différence entre partage d'échelle antagoniste et complémentaire ?* — Antagoniste : deux actionneurs à effets opposés (chaud/froid), procédé asynchrone. Complémentaire : deux actionneurs de même sens et de tailles différentes, grande précision sur une large plage.
16. *Rôle de la régulation adaptative ?* — Modifier les paramètres du régulateur selon le gain du procédé pour linéariser la boucle ; nécessite un bloc de calcul et la connaissance de la relation gain/procédé.

**Pertes de charge**

17. *Définir les pertes de charge et leurs deux types.* — Chutes de pression dues à la résistance à l'écoulement ; linéiques (le long des conduites) et singulières (pièces modifiant direction ou section).
18. *De quoi dépendent les pertes linéiques ?* — De la vitesse du fluide et de la rugosité relative de la conduite (via \(f\), qui dépend aussi de \(Re\)).
19. *Qu'est-ce que la rugosité relative ?* — Le rapport \(\epsilon/D\) entre la hauteur des aspérités et le diamètre.
20. *À quoi sert le nombre de Reynolds ?* — À caractériser le régime d'écoulement (laminaire/turbulent) et à calculer \(f\) (Colebrook).
21. *Pourquoi l'équation de Colebrook est-elle difficile ?* — Elle est implicite : \(f\) apparaît des deux côtés ; on la résout par itérations ou par abaque.
22. *Que faut-il pour utiliser l'abaque ?* — La vitesse du fluide (ou le débit) et le diamètre de la conduite ; on lit la perte par unité de longueur.
23. *Comment calcule-t-on une perte singulière ?* — \(\Delta P = \xi\frac12\rho v^2\), \(\xi\) étant lu dans un tableau selon la forme de la singularité.

**Vannes**

24. *Définir une vanne de régulation et ses trois parties.* — Actionneur contrôlant un débit de façon progressive ; corps (fluide), servomoteur (commande → mouvement), arcade (lien).
25. *Citer six critères de choix du corps.* — Nature du fluide, agressivité, température, \(\Delta P\), étanchéité, uni/bidirectionnel, anti-cavitation, anti-bruit, prix, entretien, encombrement.
26. *Avantages et inconvénients de la vanne à cage ?* — Réduit/élimine la cavitation, réduit le bruit, meilleur guidage ; fluide propre obligatoire, \(C_V\) moins élevé.
27. *Pourquoi la vanne papillon exige-t-elle un gros servomoteur ?* — À cause du moment hydrodynamique très important exercé par le fluide sur le disque.
28. *Quels sont les deux modes d'une vanne 3 voies ?* — Mélangeuse (2 entrées, 1 sortie) et répartitrice (1 entrée, 2 sorties).
29. *De quoi est constituée l'arcade ?* — De la tige à clapet et de l'index avec la plaquette indicatrice de course.
30. *Critères de choix du servomoteur ?* — Efforts hydrodynamiques et hydrostatiques, sens d'action, type de commande, technologie, accessoires. Puissance suffisante à l'ouverture et à la fermeture.
31. *De quoi dépend le sens d'opération d'une vanne ?* — De la configuration du corps et du servomoteur (position de sécurité FMA/OMA).
32. *Définir la caractéristique intrinsèque et citer les trois principales.* — Relation \(Q\)–course à \(\Delta P\) constant ; linéaire, égal pourcentage, ouverture rapide.
33. *Qu'est-ce que l'autorité ? Que signifie \(a = 1\) ?* — Part de la pression absorbée par la vanne dans le circuit série ; \(a = 1\) : la caractéristique installée est égale à l'intrinsèque. Plus \(a\) est petit, plus elle est déformée.
34. *Qu'est-ce qu'un positionneur ? Quand est-il nécessaire ?* — Relais d'asservissement assurant un positionnement fidèle et rapide du clapet ; nécessaire si \(\Delta P\) élevé ou fluctuant, fluide visqueux/collant, grippage, temps de réponse non constant, caractéristique à adapter.
35. *Définir le \(C_V\).* — Capacité d'écoulement de la vanne servant à la dimensionner ; débit d'eau en GPM traversant la vanne ouverte sous 1 PSI.
36. *Pourquoi un \(C_V\) nominal ? Quels facteurs ?* — Pour garder une réserve de fonctionnement ; 1,25 (linéaire), 1,4 (exponentielle).
37. *Trois risques d'un \(C_V\) sur-dimensionné ?* — Coût, débit/commande irréguliers par \(\Delta P\) insuffisant, durée de vie réduite (oscillations internes, cavitation), vannes multi-orifices figées.
38. *Définir la rangeabilité.* — Rapport entre le \(C_V\) maxi et le \(C_V\) mini contrôlables (en respectant la caractéristique) ; intrinsèque sur la fiche, installée plus faible.
39. *Expliquer la cavitation et ses effets.* — Au siège, la vitesse augmente et la pression chute sous \(P_v\) ⇒ bulles ; en aval la pression remonte ⇒ implosion : ondes de choc ≈ 7000 bar, destruction du corps, vibrations desserrant les vis, bruit.
40. *Critère et solutions à la cavitation ?* — \(\Delta P \ge F_L^2(P_1 - P_v)\) en absolu ; vanne à \(F_L\) plus grand, déplacer la vanne (pression aval, fluide plus froid), vanne de contournement.
41. *Pourquoi vérifier le bruit ? Comment le calcule-t-on ?* — Sécurité du personnel, intégrité de la vanne, voisinage ; pas de standard : mesure à \(r_\theta\) puis \(\Delta L_d = 20\log(r/r_\theta)\).

## X.2 Pièges classiques

**PID**

- \(\Delta X\) **en % d'échelle** (pas en °C, m ou mA bruts) pour calculer \(G_s\).
- **Sens d'action** : régulateur inversé par rapport au procédé, en tenant compte de la vanne air ouvre / air ferme.
- **Ziegler-Nichols BF** : seulement P pendant l'essai ; \(G_c\) et \(T_{osc}\) se lisent à l'oscillation **entretenue** (ni amortie ni divergente).
- **Ziegler-Nichols BO** : \(t_d\) et \(\tau\) se lisent avec la **tangente au point d'inflexion** ; \(\tau\) ne commence qu'à la fin de \(t_d\).
- **Méthode graphique** : \(t_{95\%} = 3\theta_d\) (pas \(\theta_d\)) ; structure PI, pas de D ; \(T_i\) dépend de \(G_s\).
- **Ordre des approximations successives** : P, puis D, puis I.
- **\(T_i\) petit = action I forte** (c'est l'inverse de \(K_i\)).
- **Structure** : parallèle (cours) ≠ mixte ; ne pas mélanger les tableaux.
- **Cascade** : l'esclave est la boucle **interne** (rapide) et se règle **en premier**.
- **Tendance** : boucle **ouverte** sur la perturbation ; on la garde avec la boucle fermée (mixte).

**Pertes de charge**

- **Diamètre intérieur** (22-20 ⇒ \(D = 20\) mm).
- \(Q\) en **m³/s** pour \(v\) ; \(D\) et \(L\) en **m**.
- \(\xi\) multiplie la **pression dynamique** \(\frac12\rho v^2\) (pas \(f\frac{L}{D}\)).
- \(\Delta P = \rho g\Delta h\) : ne pas oublier \(\rho\) du fluide réel.
- Pertes ∝ \(Q^2\) : diviser le débit par 2 divise les pertes par 4.
- Colebrook : \(\log_{10}\), pas ln ; itérer jusqu'à convergence.

**Vannes**

- **Pressions absolues** dans \(\Delta P_s = P_1 - P_v\) ; \(\Delta P\) de la vanne = \(P_1 - P_2\) aux bornes de la **vanne**.
- **Unités du \(C_V\)** : GPM + PSI (sans facteur) ou m³/h + bar (× 1,16) ; L/s → m³/h (× 3,6) d'abord.
- **Densité relative** (0,998), pas 998.
- **Facteur nominal** : 1,25 (linéaire) ; 1,4 (=%) ; puis \(C_V\) constructeur **supérieur ou égal**, jamais inférieur.
- **Rangeabilité** : comparer au \(C_V\) **choisi** ; vérifier au débit **minimal** avec le \(\Delta P_v\) du débit minimal (plus grand).
- **Autorité** : \(\Delta P_v\) au numérateur **et** au dénominateur ; faible autorité ⇒ =%.
- **Bruit** : \(20\log\) ; l'atténuation se **soustrait** ; en se rapprochant le niveau **augmente**.
- **FMA/OMA** : se choisit pour la **sécurité** en cas de manque d'air, et inverse le sens du procédé vu du régulateur.
- **Positionneur** : ce n'est pas un régulateur de débit mais un asservissement de **position**.

## X.3 Check-list avant de rendre une copie

1. Unités cohérentes à chaque ligne (SI pour les pertes de charge ; système impérial **ou** métrique pour le \(C_V\), jamais mélangés).
2. Pressions absolues là où il faut (cavitation), relatives ailleurs.
3. Pourcentages d'échelle pour \(G_s\).
4. Sens d'action justifié par la chaîne vanne → procédé.
5. Ordre de grandeur plausible : \(v\) de 0,5 à 3 m/s ; \(f\) de 0,015 à 0,04 ; \(C_V\) choisi entre 1,25 et 2 fois le \(C_V\) calculé ; niveau sonore qui **baisse** avec la distance.
6. Réponse finale encadrée avec son unité et, si une donnée a été supposée, l'hypothèse écrite explicitement.
