# Aide-mémoire — Régulation 3 (243-51J)

Contenu couvert : **Contrôle PID et réglage de boucles**, **Pertes de charge**, **Vannes de régulation**.

Conventions : les formules sont écrites avec les notations du cours. Les valeurs « typiques » ou les hypothèses ajoutées pour résoudre les exercices sont signalées par *(hyp.)*.

---

## Table des matières

1. [Formulaire complet (toutes les formules sur une page)](#1-formulaire-complet)
2. [Contrôle PID](#2-contrôle-pid)
   - 2.1 Régulateur, modes, sens d'action
   - 2.2 Les trois actions
   - 2.3 Méthodes de réglage (Ziegler-Nichols BF, BO, graphique, approximations successives)
   - 2.4 Influence des paramètres
   - 2.5 Contrôle PID avancé (boucles complexes)
3. [Pertes de charge](#3-pertes-de-charge)
4. [Vannes de régulation](#4-vannes-de-régulation)
   - 4.1 Constitution et critères de choix
   - 4.2 Types de corps (principe, avantages, inconvénients, usages)
   - 4.3 Arcade, servomoteur, sens d'opération
   - 4.4 Caractéristiques intrinsèque / installée, autorité
   - 4.5 Positionneur
   - 4.6 Coefficient de débit \(C_V\), rangeabilité
   - 4.7 Cavitation
   - 4.8 Bruit
5. [Exercices du cours résolus](#5-exercices-du-cours-résolus)
6. [Conversions et constantes utiles](#6-conversions-et-constantes-utiles)
7. [Pièges classiques à l'examen](#7-pièges-classiques)

---

## 1. Formulaire complet

### PID

| Nom | Formule |
|---|---|
| Action proportionnelle | \(Y = \pm K_p\,\varepsilon(t) + Y_0\) |
| Bande proportionnelle | \(BP(\%) = \dfrac{100}{K_p}\) |
| Action intégrale | \(Y = K_i \displaystyle\int_0^t \varepsilon(t)\,dt\), avec \(K_i = \dfrac{1}{T_i}\) |
| Action dérivée | \(Y = K_d\,\dfrac{d\varepsilon(t)}{dt}\) |
| PID (réel, parallèle) | \(Y(t) = K_p\,\varepsilon(t) + K_i\displaystyle\int_0^t \varepsilon\,dt + K_d\,\dfrac{d\varepsilon}{dt}\) |
| PID (discret) | \(Y_n = K_p\,\varepsilon_n + K_i\displaystyle\sum_{i=0}^{n}\varepsilon_i\,\Delta T + K_d\,\dfrac{\varepsilon_n-\varepsilon_{n-1}}{\Delta T}\) |
| Gain statique du procédé | \(G_s = \dfrac{\Delta X}{\Delta Y}\) (en % d'échelle) |
| Méthode graphique (PI parallèle) | \(G_r = \dfrac{1}{G_s}\cdot\dfrac{\theta}{\theta_d}\), \(T_i = G_s\,\theta_d\) |
| Temps de réponse à 95 % | \(t_{95\%} \approx 3\,\theta_d\) |

**Ziegler-Nichols boucle fermée** (\(G_c\) = gain critique, \(T_{osc}\) = période d'oscillation, structure parallèle) :

| | P | PI | PID |
|---|---|---|---|
| \(G_r\) | \(\dfrac{G_c}{2}\) | \(\dfrac{G_c}{2{,}2}\) | \(\dfrac{G_c}{1{,}7}\) |
| \(T_i\) | — | \(\dfrac{1{,}8\,T_{osc}}{G_c}\) | \(\dfrac{0{,}85\,T_{osc}}{G_c}\) |
| \(T_d\) | — | — | \(\dfrac{G_c\,T_{osc}}{13{,}6}\) |

**Ziegler-Nichols boucle ouverte** (\(\tau\) = constante de temps, \(t_d\) = retard, \(G_s\) = gain statique) :

| | P | PI | PID |
|---|---|---|---|
| \(K_p\) | \(\dfrac{\tau}{t_d\,G_s}\) | \(\dfrac{0{,}9\,\tau}{t_d\,G_s}\) | \(\dfrac{1{,}2\,\tau}{t_d\,G_s}\) |
| \(T_i\) | — | \(\dfrac{t_d}{0{,}3}\) | \(\dfrac{t_d}{0{,}5}\) |
| \(T_d\) | — | — | \(\dfrac{t_d}{2}\) |

### Pertes de charge

| Nom | Formule |
|---|---|
| Perte de pression linéique | \(\Delta P = f\,\dfrac{L}{D}\,\dfrac{1}{2}\rho v^2\) |
| Lien pression / hauteur | \(\Delta P = \rho g\,\Delta h\) |
| Perte de hauteur linéique | \(\Delta h = f\,\dfrac{L}{D}\,\dfrac{v^2}{2g}\) |
| Rugosité relative | \(\dfrac{\epsilon}{D}\) |
| Nombre de Reynolds | \(Re = \dfrac{\rho v D}{\mu}\) |
| Colebrook (implicite) | \(\dfrac{1}{\sqrt f} = -2\log_{10}\!\left[\dfrac{\epsilon/D}{3{,}7} + \dfrac{2{,}51}{Re\sqrt f}\right]\) |
| Perte singulière (pression) | \(\Delta P = \xi\,\dfrac{1}{2}\rho v^2\) |
| Perte singulière (hauteur) | \(\Delta h = \xi\,\dfrac{v^2}{2g}\) |
| Vitesse à partir du débit | \(v = \dfrac{Q}{A} = \dfrac{4Q}{\pi D^2}\) |

### Vannes

| Nom | Formule |
|---|---|
| Vanne 3 voies | \(Q_e = Q_{s1}+Q_{s2}\), \(Q_{s1} = \alpha Q_e\), \(Q_{s2} = (1-\alpha)Q_e\) |
| Égal pourcentage | \(Q = Q_0\,e^{n h}\) |
| Autorité (circuit série) | \(a = \dfrac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}}\) |
| \(C_V\) impérial (GPM, PSI) | \(C_V = Q\sqrt{\dfrac{\text{densité}}{\Delta P}}\) |
| \(C_V\) métrique (m³/h, bar) | \(C_V = 1{,}16\,Q\sqrt{\dfrac{\text{densité}}{\Delta P}}\) |
| \(C_V\) nominal, vanne linéaire | \(C_{V,nom} = 1{,}25\,C_{V,max}\) |
| \(C_V\) nominal, vanne =% | \(C_{V,nom} = 1{,}4\,C_{V,max}\) |
| Rangeabilité | \(r = \dfrac{C_{V\,maxi\ contrôlable}}{C_{V\,mini\ contrôlable}}\) |
| Critère de cavitation | \(\Delta P \ge F_L^2\,\Delta P_s\), avec \(\Delta P_s = P_1 - P_v\) (pressions **absolues**) |
| Bruit à une autre distance | \(\Delta L_d = 20\log\!\left(\dfrac{r}{r_\theta}\right)\), \(L(r) = L(r_\theta) - \Delta L_d\) |

---

## 2. Contrôle PID

### 2.1 Régulateur, modes, sens d'action

- **Régulateur** : dispositif produisant un signal de sortie en corrigeant l'écart \(\varepsilon\) = consigne − mesure. Un régulateur PID = **comparateur** + **correcteur PID**.
- **Mode automatique** : le correcteur calcule la sortie. **Mode manuel** : l'opérateur impose la sortie (utilisé pour les essais en boucle ouverte).
- **Sens d'action du régulateur**
  - **Direct** : la sortie évolue dans le **même sens** que l'écart (mesure ↑ ⇒ sortie ↑).
  - **Inverse** : la sortie évolue dans le **sens inverse** de l'écart (mesure ↑ ⇒ sortie ↓).
- **Règle** : le régulateur doit présenter une **inversion de sens par rapport au procédé**. Procédé direct (commande ↑ ⇒ mesure ↑, ex. vanne de chauffage) ⇒ régulateur **inverse**. Procédé inverse (commande ↑ ⇒ mesure ↓, ex. vanne de vidange sur un niveau) ⇒ régulateur **direct**. Si on se trompe, la boucle diverge (rétroaction positive).
- Le sens est aussi affecté par le sens d'opération de la vanne (air ouvre / air ferme) : il faut raisonner sur la chaîne complète régulateur → vanne → procédé → mesure.

### 2.2 Les trois actions

**Proportionnelle (P)** : \(Y = \pm K_p\,\varepsilon(t) + Y_0\)

- \(K_p\) : gain proportionnel ; \(Y_0\) : sortie au repos (quand \(\varepsilon = 0\)).
- Bande proportionnelle \(BP(\%) = 100/K_p\) : plage d'écart (en % d'échelle) qui fait varier la sortie de 0 à 100 %. BP petite ⇔ gain fort.
- Réaction immédiate, mais laisse une **erreur statique** (il faut un écart non nul pour maintenir une sortie différente de \(Y_0\)).

**Intégrale (I)** : \(Y = K_i\int_0^t \varepsilon\,dt\), \(K_i = 1/T_i\)

- \(T_i\) : temps intégral. Plus \(T_i\) est petit, plus l'action intégrale est forte.
- Accumule l'écart dans le temps ⇒ **annule l'erreur statique**, mais ralentit la boucle et favorise le dépassement.

**Dérivée (D)** : \(Y = K_d\,\dfrac{d\varepsilon}{dt}\)

- Réagit à la **vitesse de variation** de l'écart ⇒ anticipe, amortit les oscillations, réduit le dépassement.
- Amplifie le bruit de mesure ; inutile (voire nuisible) sur les mesures bruitées (débit) ; utile sur les procédés lents (température).

**PID complet (structure parallèle)** :

\[
Y(t) = K_p\,\varepsilon(t) + K_i\int_0^t\varepsilon(t)\,dt + K_d\,\frac{d\varepsilon(t)}{dt}
\]

**Version discrète** (période d'échantillonnage \(\Delta T\)) :

\[
Y_n = K_p\,\varepsilon_n + K_i\sum_{i=0}^{n}\varepsilon_i\,\Delta T + K_d\,\frac{\varepsilon_n - \varepsilon_{n-1}}{\Delta T}
\]

L'intégrale devient une **somme** (aire des rectangles), la dérivée une **différence** divisée par \(\Delta T\).

**Exemple numérique de calcul discret** *(hyp.)* : \(K_p = 2\), \(K_i = 0{,}5\), \(K_d = 1\), \(\Delta T = 1\) s, écarts successifs \(\varepsilon = 4, 3, 2\) %.

- \(n = 2\) : \(\sum \varepsilon_i\Delta T = 4+3+2 = 9\) ; \(\dfrac{\varepsilon_2-\varepsilon_1}{\Delta T} = 2-3 = -1\)
- \(Y_2 = 2(2) + 0{,}5(9) + 1(-1) = 4 + 4{,}5 - 1 = 7{,}5\ \%\) (à ajouter à \(Y_0\) si on travaille avec une sortie de repos).

### 2.3 Méthodes de réglage

#### a) Ziegler-Nichols en boucle fermée (pompage / gain critique)

Principe : trouver expérimentalement le **point critique de stabilité** du procédé.

Étapes :
1. Régulateur en **automatique** avec **seulement l'action P** (I et D désactivées : \(T_i = \infty\), \(T_d = 0\)).
2. Régler le gain \(G_r\) à **1 ou moins**.
3. Stabiliser le procédé autour de la consigne.
4. **Augmenter \(G_r\)** (petit échelon de consigne à chaque essai) jusqu'à ce que la boucle **oscille de façon entretenue** (amplitude constante).
5. Relever le **gain critique \(G_c\)** et la **période d'oscillation \(T_{osc}\)**.
6. Appliquer le tableau (voir formulaire) : P, PI ou PID.

Résultat visé : oscillation sinusoïdale stable, ni amortie ni divergente.

Limites : il faut accepter de faire osciller le procédé (dangereux sur certains procédés) ; les réglages obtenus donnent une réponse avec un amortissement d'environ 1/4 (dépassement notable) et doivent souvent être adoucis.

#### b) Ziegler-Nichols en boucle ouverte (courbe de réaction)

Étapes :
1. Régulateur en **manuel**.
2. Stabiliser le procédé autour de la consigne.
3. Appliquer un **échelon \(\Delta Y\)** sur la commande (quelques %).
4. Enregistrer la réponse de la mesure \(X(t)\) et relever :
   - \(\Delta X\) : variation finale de la mesure (**en % de l'échelle du transmetteur**) ;
   - \(t_d\) : **retard** (temps mort) avant que la mesure ne commence à bouger — graphiquement, l'intersection de la tangente au point d'inflexion avec la valeur initiale ;
   - \(\tau\) : **constante de temps** — temps entre la fin du retard et l'instant où la tangente atteint la valeur finale (ou temps pour atteindre 63 % de \(\Delta X\)).
5. Calculer \(G_s = \Delta X/\Delta Y\) puis appliquer le tableau (voir formulaire).

Conversion en % d'échelle : pour une sonde 0–200 °C, une variation de 20 °C vaut \(20/200 = 10\ \%\).

#### c) Méthode graphique avec formule (réglage sur cahier des charges)

Mêmes étapes de relevé qu'en boucle ouverte (manuel, stabilisation, échelon \(\Delta Y\)), on relève \(\Delta X\), \(\Delta Y\) et \(\theta\) (constante de temps du procédé).

1. Gain statique : \(G_s = \dfrac{\Delta X}{\Delta Y}\)
2. Choisir le **temps de réponse désiré \(\theta_d\)** à partir du cahier des charges. Pour une réponse du 1er ordre : \(t_{95\%} = 3\theta_d\), \(t_{63\%} = \theta_d\).
3. Régulateur PI (structure parallèle) :

\[
G_r = \frac{1}{G_s}\cdot\frac{\theta}{\theta_d}
\qquad\qquad
T_i = G_s\,\theta_d
\]

Interprétation : l'action intégrale compense la constante de temps du procédé et le gain impose la rapidité désirée ; la réponse en boucle fermée est du 1er ordre de constante de temps \(\theta_d\), **sans dépassement** et **sans erreur statique** (grâce à I).

#### d) Approximations successives (réglage empirique en automatique)

Régulateur en **automatique** ; on règle **dans l'ordre P, puis D, puis I**. Chaque essai commence lorsque le procédé est **stabilisé à la consigne**, puis on applique un petit échelon de consigne et on observe la réponse.

- **P** : partir d'un gain faible (BP large). Augmenter le gain jusqu'à obtenir une réponse oscillatoire légèrement amortie (rapport d'amplitudes ≈ 1/4), puis réduire légèrement.
- **D** : partir de \(T_d = 0\). Augmenter \(T_d\) pour amortir le dépassement et accélérer la stabilisation ; arrêter quand la sortie devient nerveuse (bruit amplifié).
- **I** : partir de \(T_i\) très grand (action I nulle). Diminuer \(T_i\) jusqu'à annuler l'erreur statique dans un temps acceptable ; arrêter quand les oscillations réapparaissent.

### 2.4 Influence des paramètres PID

| Augmentation de… | Temps de montée | Dépassement | Temps de stabilisation | Erreur statique |
|---|---|---|---|---|
| \(K_p\) ↑ (BP ↓) | ↓ | ↑ | peu de changement | ↓ (jamais nulle avec P seul) |
| Action I ↑ (\(T_i\) ↓) | ↓ | ↑ | ↑ | **annulée** |
| \(T_d\) ↑ | peu de changement | ↓ | ↓ | aucun effet |

Choix de structure selon le procédé (repères) :

| Procédé | Structure |
|---|---|
| Débit, pression de liquide (rapide, bruité) | PI (gain faible, I forte, pas de D) |
| Niveau | P ou PI |
| Température, pression de gaz (lent, retard) | PID |
| Procédé avec grand retard pur | PI « doux » ou boucle complexe |

### 2.5 Contrôle PID avancé (boucles complexes)

**Limites du PID simple (boucle unique)** :
- procédé à caractéristique **non symétrique ou non linéaire** ;
- **impossibilité de corriger l'erreur rapidement et/ou complètement**.

**Choix de la boucle complexe selon le dysfonctionnement** :

| Problème rencontré | Régulation à envisager |
|---|---|
| Grandeur réglante perturbée | Cascade (sur grandeur réglante) |
| Grandeur intermédiaire en amont de la grandeur réglée, perturbée et régulable | Cascade (sur grandeur intermédiaire) |
| Grandeur incidente non régulée perturbe la grandeur réglée | Tendance ou mixte |
| Grandeur réglante inefficace / insuffisante | Partage d'échelle |
| Procédé non linéaire / non symétrique | Adaptative |

#### Cascade à 2 éléments (sur la grandeur réglante)

- **Principe** : deux régulateurs imbriqués. Le **maître** (ex. niveau) mesure la grandeur réglée principale ; sa sortie devient la **consigne de l'esclave** (ex. débit). L'esclave mesure la grandeur réglante et commande la vanne. Boucle interne rapide, boucle externe lente.
- **Avantages** : l'esclave filtre les fluctuations du débit (pression d'alimentation, caractéristique de vanne…) ; améliore les performances dynamiques.
- **Inconvénients** : une boucle supplémentaire (transmetteur + régulateur, coût) ; plus complexe à utiliser.
- **Quand** : la grandeur réglante elle-même est perturbée (débit d'alimentation variable, pression de vapeur fluctuante, vanne à faible autorité).
- **Mise en service** : régler d'abord l'esclave (maître en manuel), puis le maître ; l'esclave doit être nettement plus rapide (×3 à ×5) que le maître.

#### Cascade à 3 éléments (sur une grandeur intermédiaire)

- **Principe** : même structure, mais la grandeur réglée de l'esclave est une **grandeur intermédiaire** entre la grandeur réglante et la grandeur réglée principale (ex. maître = niveau 1, esclave = niveau 2 sur deux cuves en série). Trois mesures : principale, intermédiaire, réglante.
- **Avantages** : filtre les fluctuations rapides de la grandeur intermédiaire ; améliore les performances dynamiques.
- **Inconvénients** : 2 boucles supplémentaires (coût) ; beaucoup plus complexe.
- **Quand** : procédés en série avec un étage intermédiaire mesurable et régulable (cuves en cascade, niveau de ballon de chaudière, four).

#### Régulation de tendance (anticipative / feedforward) et mixte

- **Principe** : on **mesure la perturbation** et on corrige la commande **avant** que son effet n'atteigne la grandeur réglée (correction prédite, pas réactive). Régulateur de niveau en **boucle fermée** + correcteur de débit en **boucle ouverte**. Combinée à la boucle fermée ⇒ régulation **mixte**.
- **Avantages** : filtre les fluctuations du 2e débit ; améliore les performances dynamiques (pas d'attente de l'écart).
- **Inconvénients** : 1 transmetteur supplémentaire ; **difficile de configurer le correcteur de tendance** (il faut connaître gain et dynamique perturbation → grandeur réglée).
- **Quand** : perturbation mesurable mais non régulable sur un procédé lent (soutirage variable, charge d'une chaudière, température extérieure).

#### Partage d'échelle antagoniste (split-range)

- **Principe** : un seul régulateur commande **deux actionneurs à effets opposés** en divisant l'échelle de sa sortie (ex. 0–50 % vanne de vidange, 50–100 % vanne de remplissage).
- **Avantage** : bonne gestion d'un procédé **asynchrone** (deux régimes transitoires différents : chauffer/refroidir, remplir/vider).
- **Inconvénients** : 2 actionneurs ; requiert une bonne connaissance du procédé pour configurer le partage (point de bascule, bande morte).
- **Quand** : la grandeur réglante est inefficace dans un sens (température chaud/froid, pH acide/base, pression admission/évent).

#### Partage d'échelle complémentaire

- **Principe** : deux actionneurs agissant **dans le même sens** mais de **capacités différentes** (petite vanne de précision + grosse vanne de capacité) commandés en séquence par un seul régulateur.
- **Avantage** : bonne **précision** de la variable réglante sur une très grande plage.
- **Inconvénients** : 2 actionneurs de caractéristiques différentes ; requiert une bonne connaissance des actionneurs (\(C_V\), points de transition).
- **Quand** : plage de débit trop large pour la rangeabilité d'une seule vanne.

#### Régulation adaptative

- **Principe** : un **bloc de calcul** modifie en temps réel les paramètres du régulateur (surtout le gain) selon le point de fonctionnement, pour garder un gain de boucle constant (si \(G_s\) double, \(G_r\) est divisé par 2).
- **Avantage** : **linéarise** le comportement du procédé.
- **Inconvénients** : 1 bloc de calcul ; requiert une bonne connaissance de la relation gain ↔ procédé.
- **Quand** : procédé **non linéaire / non symétrique** (pH, cuve à section variable, échangeur dont le gain dépend du débit).

**Résumé**

| Situation | Solution | Matériel ajouté |
|---|---|---|
| Grandeur réglante qui fluctue | Cascade 2 éléments | 1 transmetteur + 1 régulateur |
| Étage intermédiaire régulable perturbé | Cascade 3 éléments | 2 boucles |
| Perturbation mesurable non régulable | Tendance / mixte | 1 transmetteur + correcteur |
| Agir dans deux sens opposés | Partage d'échelle antagoniste | 2 actionneurs opposés |
| Plage de débit trop large | Partage d'échelle complémentaire | 2 actionneurs de tailles différentes |
| Gain du procédé variable | Adaptative | 1 bloc de calcul |

---

## 3. Pertes de charge

### 3.1 Théorie

- **Définition** : chutes de pression dues à la **résistance** que rencontrent les fluides en écoulement.
- **Linéiques** (ou régulières) : pertes le long des conduites. Dépendent de la **vitesse** du fluide et de la **rugosité relative** \(\epsilon/D\) de la conduite.
- **Singulières** : sur les pièces qui modifient la **direction** ou la **section** de passage (coudes, raccords, tés, réductions, vannes). Chaque singularité a un coefficient \(\xi\) tiré d'un tableau.
- Les pertes totales s'additionnent : \(\Delta P_{tot} = \sum \Delta P_{lin} + \sum \Delta P_{sing}\).

### 3.2 Pertes linéiques

\[
\Delta P = f\,\frac{L}{D}\,\frac{1}{2}\rho v^2
\qquad\qquad
\Delta h = f\,\frac{L}{D}\,\frac{v^2}{2g}
\qquad\qquad
\Delta P = \rho g\,\Delta h
\]

- \(f\) : coefficient de frottement (sans unité)
- \(L\) : longueur de la conduite (m) ; \(D\) : diamètre **intérieur** (m)
- \(\frac12\rho v^2\) : énergie cinétique volumique (pression dynamique, Pa)
- \(g = 9{,}81\) m/s²

### 3.3 Coefficient de frottement \(f\)

Le plus difficile à déterminer. Il dépend de la rugosité relative et du régime d'écoulement.

1. Rugosité relative : \(\dfrac{\epsilon}{D}\) (\(\epsilon\) = épaisseur des aspérités).
2. Nombre de Reynolds : \(Re = \dfrac{\rho v D}{\mu}\) (\(\mu\) = viscosité dynamique, Pa·s).
   - \(Re < 2000\) : laminaire (\(f = 64/Re\)) ; \(Re > 4000\) : turbulent.
3. Colebrook (turbulent, à résoudre par itérations) :

\[
\frac{1}{\sqrt f} = -2\log_{10}\left[\frac{\epsilon/D}{3{,}7} + \frac{2{,}51}{Re\sqrt f}\right]
\]

Dans le cours, **\(f\) est fourni**. Sinon on utilise l'**abaque** des conduites : avec la **vitesse \(v\)** et le **diamètre \(D\)**, on lit la perte de hauteur par unité de longueur (m/m, ou pi/100 pi), qu'on multiplie par \(L\).

Rugosités typiques *(hyp.)* : cuivre/PVC ≈ 0,0015 mm ; acier commercial ≈ 0,045 mm ; fonte ≈ 0,26 mm.

### 3.4 Pertes singulières

\[
\Delta P = \xi\,\frac{1}{2}\rho v^2
\qquad\qquad
\Delta h = \xi\,\frac{v^2}{2g}
\]

Coefficients indicatifs *(hyp., utiliser le tableau du cours)* : coude 90° normal ≈ 0,75 ; coude 90° grand rayon ≈ 0,45 ; coude 45° ≈ 0,4 ; té passage direct ≈ 0,4 ; té dérivation ≈ 1,3 ; robinet à bille ouvert ≈ 0,05–0,1 ; robinet à soupape ouvert ≈ 6–10 ; clapet antiretour ≈ 2 ; entrée de réservoir ≈ 0,5 ; sortie dans un réservoir ≈ 1.

### 3.5 Démarche type

1. Convertir le débit en SI : \(Q\) (m³/s).
2. Vitesse : \(v = \dfrac{4Q}{\pi D^2}\).
3. Pression dynamique : \(\frac12\rho v^2\).
4. Linéique : \(\Delta P = f\frac{L}{D}\cdot\frac12\rho v^2\).
5. Singulières : \(\Delta P = (\sum \xi)\cdot\frac12\rho v^2\).
6. Total, puis conversion (Pa → bar → PSI ; ou \(\Delta h = \Delta P/\rho g\)).

---

## 4. Vannes de régulation

### 4.1 Constitution et critères de choix

**Définition** : actionneur contrôlant un débit du procédé de façon **progressive**.

**Trois parties** :
- **Corps** : où circule le fluide.
- **Servomoteur (actionneur)** : où la commande est transformée en mouvement mécanique.
- **Arcade** : lien entre le servomoteur et le corps.

**Critères de choix du corps** : nature du fluide (viscosité, gaz…) ; agressivité mécanique ou chimique ; températures d'opération ; pressions amont/aval (\(\Delta P\)) ; niveau d'étanchéité ; circulation uni/bidirectionnelle ; dispositif anti-cavitation ; dispositif anti-bruit ; prix ; entretien ; encombrement.

### 4.2 Types de corps de vannes

| Type | Principe | Avantages | Inconvénients | Usage typique |
|---|---|---|---|---|
| **Simple siège** | Clapet en translation obturant un seul siège | Simple, coût réduit ; siège démontable (changer la caractéristique) ; réversibilité au servomoteur | Effort hydrodynamique non équilibré ; risque de cavitation (bruit) ; risque de vaporisation | Régulation générale, bonne étanchéité, petits/moyens diamètres |
| **Double siège** | Deux clapets sur la même tige, forces opposées | Efforts équilibrés ; \(C_V\) plus élevé | Étanchéité moins bonne ; risque de cavitation | Grands débits, fort \(\Delta P\), étanchéité non critique |
| **À cage** | Clapet coulissant dans une cage percée ; le fluide est divisé en jets | Réduit/élimine la cavitation ; réduit le bruit ; meilleur guidage | Fluide propre obligatoire ; \(C_V\) moins élevé | Service sévère, fortes détentes, vapeur |
| **Clapet rotatif excentré** | Clapet sphérique sur bras excentré, rotation ; se décolle du siège dès l'ouverture | Très bon \(C_V\) ; efforts assez équilibrés ; étanche ; −200 à 400 °C | Tendance à la cavitation ; \(C_V\) non modifiable par le clapet | Grands débits faible \(\Delta P\), fluides chargés, températures extrêmes |
| **Papillon** | Disque pivotant 0–90° dans la conduite | Encombrement réduit ; plage de température étendue ; bon \(C_V\) | Moment hydrodynamique très important ; servomoteur surdimensionné ; pas étanche | Grands diamètres, faible \(\Delta P\), eau/air/CVC |
| **Boisseau sphérique** | Sphère percée tournant 90° (passage profilé en V pour la régulation) | Étanche ; coût réduit ; grand \(C_V\) | Tendance à la cavitation | Tout-ou-rien, fluides chargés, pâtes |
| **À membrane** | Membrane souple pressée contre un barrage ; pas de tige ni presse-étoupe au contact du fluide | Étanche même avec particules ; nettoyable (pharma, alimentaire) ; pas de presse-étoupe | Usure de la membrane ; température et pression limitées | Corrosifs, abrasifs, sanitaire, basse pression |
| **D'angle** | Simple siège avec entrée/sortie à 90° | Nettoyage facile ; remplace un coude dans la tuyauterie | (celles du simple siège) | Changement de direction, fluides chargés, fortes détentes |
| **3 voies** | Clapet double qui ferme un orifice en ouvrant l'autre ; mélangeuse (2 entrées/1 sortie) ou répartitrice (1 entrée/2 sorties) | Mélange ou répartition avec un seul organe | Pas d'équilibrage hydrodynamique ; actionneur plus puissant | Régulation de température par mélange, bypass d'échangeur |

Vanne 3 voies : \(Q_e = Q_{s1} + Q_{s2}\), \(Q_{s1} = \alpha Q_e\), \(Q_{s2} = (1-\alpha)Q_e\), \(\alpha\) = fraction de course (0 à 1).

### 4.3 Arcade, servomoteur, sens d'opération

**Arcade** : lien corps ↔ servomoteur ; contient la **tige à clapet** et l'**index avec la plaquette indicatrice de course**.

**Servomoteur** : convertit la commande en énergie mécanique.
- Critères : efforts hydrodynamiques et hydrostatiques ; sens d'action (direct/inverse) ; type de commande ; technologie (électrique, pneumatique, hydraulique) ; accessoires (positionneur, commande manuelle).
- Doit avoir une **puissance suffisante** pour vaincre la force de la pression du fluide sur le clapet, **à l'ouverture comme à la fermeture**. Les fabricants donnent la **pression d'alimentation** nécessaire en fonction de la **pression maximale admissible du fluide**.

**Sens d'opération** : dépend de la configuration **corps + servomoteur**.
- Servomoteur direct (air pousse la tige vers le bas) ou inverse (air tire la tige vers le haut), combiné à un corps où « tige en bas = fermé » ou « tige en bas = ouvert ».
- Résultat : vanne **NF / « air ouvre » (FMA : fermée par manque d'air)** ou **NO / « air ferme » (OMA : ouverte par manque d'air)**.
- Se choisit selon la **position de sécurité** en cas de panne d'énergie (ex. vapeur de chauffage → FMA ; eau de refroidissement → OMA).

### 4.4 Caractéristiques intrinsèque / installée, autorité

**Caractéristique intrinsèque** : relation entre le débit \(Q\) et la course du clapet \(h\), pour une **pression différentielle constante** aux bornes de la vanne. Elle est issue de la forme du clapet et des orifices du corps.

- **Linéaire** : \(Q\) proportionnel à \(h\) (\(Q/Q_{max} = h\)).
- **Égal pourcentage (=%)** : des accroissements égaux de la course relative \(h\) donnent des accroissements d'**égal pourcentage** du débit relatif : \(Q = Q_0\,e^{nh}\), \(Q_0\) = débit minimal contrôlable, \(n\) = coefficient propre de la vanne. Le gain de la vanne croît avec l'ouverture.
- **Ouverture rapide (OR)** : plus de **50 % du débit au premier tiers de la course**. Pour le tout-ou-rien ou les sécurités.
- Le mode « throttle » n'est pas au programme.

**Caractéristique installée** : relation \(Q(h)\) de la vanne **installée**, avec un \(\Delta P\) **variable** (quand la vanne s'ouvre, les pertes de charge du circuit augmentent et le \(\Delta P\) disponible pour la vanne diminue). Elle est **déformée** par rapport à l'intrinsèque : une linéaire tend vers une ouverture rapide, une =% tend vers une linéaire.

**Autorité** (circuit série) : part de la pression absorbée par la vanne par rapport au circuit.

\[
a = \frac{\Delta P_v}{\Delta P_v + \Delta P_{R1+R2}}
\]

- \(a = 1\) : caractéristique installée = intrinsèque (toute la perte de charge dans la vanne).
- Plus \(a\) est **petit**, plus la caractéristique installée est **déformée** (vanne « qui ne contrôle plus rien » aux grandes ouvertures).
- Objectif : régler le débit tout en maintenant une **pression utile** suffisante pour le procédé. Compromis courant *(hyp.)* : \(a \ge 0{,}3\) à 0,5.

### 4.5 Positionneur

**Définition** : relais d'asservissement garantissant un positionnement du clapet **fidèle et rapide**, à l'ouverture comme à la fermeture. Il reçoit la consigne de position, la compare à la position réelle du clapet et, selon l'écart, envoie un signal plus ou moins important au servomoteur.

**Composition** : partie pneumatique, électrique ou numérique (traduction du signal du régulateur en demande de position) ; système de mesure de position (mécanique ou électronique) ; comparateur consigne/mesure ; correcteur PID.

**Nécessaire si** :
- le \(\Delta P\) est élevé et demande une pression de commande importante ;
- le \(\Delta P\) fluctue rapidement et perturbe la grandeur réglée ;
- le fluide est très visqueux ou collant (pâte à papier, goudron, sucre liquide) ;
- le fluide engendre un grippage de la tige ;
- le temps de réponse de la vanne n'est pas constant ;
- la caractéristique de débit utile ne correspond pas à celle de la vanne.

**Adaptation de la caractéristique** : on choisit la caractéristique du positionneur selon celle souhaitée au niveau du procédé (ex. vanne linéaire + positionneur =% ⇒ comportement =%).

### 4.6 Coefficient de débit \(C_V\) et rangeabilité

**Définition** : capacité d'écoulement de la vanne, utilisée pour la **dimensionner**. Numériquement, \(C_V\) = débit d'eau en GPM US qui traverse la vanne grande ouverte sous 1 PSI de \(\Delta P\). Valeurs de \(10^{-6}\) (micro-vannes) à \(10^{6}\) (barrages, pipelines).

Impérial (\(Q\) en GPM US, \(\Delta P\) en PSI, densité relative à l'eau) :

\[
C_V = Q\sqrt{\frac{\text{densité}}{\Delta P}}
\]

Métrique (\(Q\) en m³/h, \(\Delta P\) en bar) :

\[
C_V = 1{,}16\,Q\sqrt{\frac{\text{densité}}{\Delta P}}
\]

**\(C_V\) nominal** (réserve de fonctionnement) : linéaire \(C_{V,nom} = 1{,}25\,C_{V,max}\) ; exponentielle (=%) \(C_{V,nom} = 1{,}4\,C_{V,max}\). On choisit ensuite dans la gamme du constructeur le \(C_V\) **immédiatement supérieur ou égal**.

**\(C_V\) sous-dimensionné** : réduit le débit souhaité ; vaporisation des liquides à la sortie ; forte perte de charge dans les tuyauteries et la vanne ; baisse de la pression de sortie.

**\(C_V\) sur-dimensionné** : coût accru (équipements surdimensionnés) ; débit variable / commande irrégulière à cause d'un \(\Delta P\) insuffisant ; durée de vie réduite (oscillations internes) ; utilisation irrégulière (vannes à 3 ou 4 orifices qui ne changent pas de position faute de débit) ; usure des sièges et clapets par **cavitation** liée à la vitesse.

**Rangeabilité** : \(r = \dfrac{C_{V\,maxi\ contrôlable}}{C_{V\,mini\ contrôlable}}\). « Contrôlable » = en respectant la caractéristique. Donnée par le fabricant (rangeabilité **intrinsèque**, ex. 50:1) ; la rangeabilité **installée** est réduite. Vérification : le débit minimal est contrôlable si \(C_{V,min\ requis} \ge C_{V,nom}/r\).

### 4.7 Cavitation

**Mécanisme** : au passage du siège, la vitesse du liquide augmente ⇒ la pression chute. Si elle passe **sous la pression de vapeur \(P_v\)**, des bulles de vapeur se forment. En aval, la pression remonte au-dessus de \(P_v\) ⇒ **implosion** des bulles : c'est la cavitation. (Si la pression aval reste sous \(P_v\), c'est de la **vaporisation** / flashing.)

**Effets** : ondes de choc d'environ **7000 bar** ; destruction du corps de la vanne ; vibrations qui desserrent les éléments vissés ; bruit important.

**Critère** : l'écoulement est critique (cavitation) si

\[
\Delta P \ge F_L^2\,\Delta P_s
\qquad
\Delta P_s = P_1 - P_v
\]

- \(P_1\) : pression amont **absolue** ; \(P_v\) : pression de vapeur **absolue** ; \(P_{abs} = P_{rel} + P_{atm}\).
- \(F_L\) : coefficient de récupération de pression de la vanne (fabricant). Plus \(F_L\) est grand (proche de 1), moins la vanne récupère de pression, moins elle cavite (vanne à cage ≈ 0,9 ; papillon/boisseau ≈ 0,6–0,7 *(hyp.)*).

**Solutions** : choisir une vanne avec un **meilleur \(F_L\)** (plus grand) ; **déplacer la vanne** pour augmenter sa pression aval et/ou la placer où le fluide est plus froid (\(P_v\) plus bas) ; installer une **vanne de contournement** pour diminuer le \(\Delta P\) de la vanne.

### 4.8 Bruit

- Le passage du fluide engendre du bruit dont l'intensité dépend de la **turbulence** ; plus la **vitesse** est grande, plus le bruit hydraulique et hydrodynamique est fort.
- Pourquoi le vérifier : environnement de travail **sécuritaire** ; **intégrité et durabilité** de la vanne ; niveau sonore acceptable pour le **voisinage**.
- Il n'existe **pas de standard** de calcul : on **mesure** empiriquement à une distance de référence \(r_\theta\), puis on extrapole :

\[
\Delta L_d = 20\log\left(\frac{r}{r_\theta}\right)
\qquad
L(r) = L(r_\theta) - \Delta L_d
\]

Repères : doubler la distance ⇒ −6 dB ; ×10 ⇒ −20 dB ; ×100 ⇒ −40 dB.

---

## 5. Exercices du cours résolus

### 5.1 Pertes de charge — conduite en cuivre

**Énoncé A** : conduite en cuivre 22-20 mm (D int = 20 mm), eau à 50 °C, débit 7,94 GPM, longueur 328 pi.
**Énoncé B** : on ajoute 2 coudes normaux à 90° et un robinet à bille.

Données *(hyp.)* : \(\rho_{50°C} = 988\) kg/m³, \(\mu_{50°C} = 5{,}47\times10^{-4}\) Pa·s, \(\epsilon_{cuivre} = 0{,}0015\) mm, \(\xi_{coude\ 90°} = 0{,}75\), \(\xi_{bille} = 0{,}1\). Si \(f\) et \(\xi\) sont fournis, utiliser ceux du cours.

1. Conversions : \(Q = 7{,}94 \times 3{,}785 / 60 = 0{,}501\) L/s \(= 5{,}01\times10^{-4}\) m³/s ; \(L = 328 \times 0{,}3048 = 100\) m ; \(D = 0{,}020\) m.
2. Vitesse : \(A = \pi(0{,}01)^2 = 3{,}14\times10^{-4}\) m² ; \(v = 5{,}01\times10^{-4}/3{,}14\times10^{-4} = 1{,}59\) m/s.
3. Pression dynamique : \(\frac12\rho v^2 = 0{,}5 \times 988 \times 1{,}59^2 = 1255\) Pa.
4. Reynolds : \(Re = 988\times1{,}59\times0{,}02/5{,}47\times10^{-4} \approx 57\,600\) (turbulent). \(\epsilon/D = 7{,}5\times10^{-5}\). Colebrook ⇒ \(f \approx 0{,}0205\).
5. **A — linéique** : \(\Delta P = 0{,}0205 \times \dfrac{100}{0{,}02} \times 1255 = 0{,}0205\times5000\times1255 \approx 128{,}6\) kPa \(\approx 1{,}29\) bar \(\approx 18{,}7\) PSI. En hauteur : \(\Delta h = 128\,600/(988\times9{,}81) \approx 13{,}3\) m.
6. **B — singulières** : \(\sum\xi = 2\times0{,}75 + 0{,}1 = 1{,}6\) ; \(\Delta P = 1{,}6\times1255 \approx 2{,}0\) kPa (\(\Delta h \approx 0{,}21\) m).
7. **Total** : \(\approx 130{,}6\) kPa \(\approx 1{,}31\) bar \(\approx 13{,}5\) m. Les singularités pèsent ici moins de 2 % : sur une longue conduite de petit diamètre, le linéique domine.

### 5.2 Réglage PI par la méthode graphique

**Énoncé** : précision parfaite, temps de réponse à 95 % < 8 s, sans dépassement ; PID de structure parallèle ; déterminer le sens d'action.

- Précision parfaite ⇒ action **I** obligatoire. Sans dépassement ⇒ pas de réglage « ¼ d'amplitude » ; on utilise la méthode graphique (réponse du 1er ordre). ⇒ **PI**, \(T_d = 0\).
- \(t_{95\%} = 3\theta_d < 8\) s ⇒ \(\theta_d < 2{,}67\) s (prendre p. ex. \(\theta_d = 2{,}5\) s).
- Sur la courbe de réaction : \(G_s = \Delta X/\Delta Y\) (en %/%), \(\theta\) = constante de temps.
- \(G_r = \dfrac{1}{G_s}\cdot\dfrac{\theta}{\theta_d}\), \(T_i = G_s\theta_d\).
- Sens d'action : si la mesure **monte** quand la commande monte (\(\Delta X\) et \(\Delta Y\) de même signe, \(G_s > 0\)) ⇒ procédé direct ⇒ régulateur **inverse** ; sinon régulateur **direct**.

Exemple chiffré *(hyp.)* : \(\Delta Y = 10\ \%\), \(\Delta X = 20\ \%\), \(\theta = 15\) s ⇒ \(G_s = 2\) ; \(G_r = \frac{1}{2}\cdot\frac{15}{2{,}5} = 3\) ; \(T_i = 2\times2{,}5 = 5\) s.

### 5.3 Réglage Ziegler-Nichols boucle ouverte (sonde 0–200 °C)

Démarche : relever \(\Delta Y\) (%), \(\Delta X\) (°C) ⇒ convertir en % : \(\Delta X_\% = \Delta X_{°C}/200\times100\) ; relever \(t_d\) et \(\tau\) sur la courbe (tangente au point d'inflexion) ; \(G_s = \Delta X_\%/\Delta Y\) ; appliquer le tableau.

Exemple chiffré *(hyp.)* : \(\Delta Y = 20\ \%\), la température passe de 80 à 120 °C (\(\Delta X = 40\) °C \(= 20\ \%\)), \(t_d = 10\) s, \(\tau = 60\) s.
- \(G_s = 20/20 = 1\).
- PID : \(K_p = 1{,}2\times60/(10\times1) = 7{,}2\) ; \(T_i = 10/0{,}5 = 20\) s ; \(T_d = 10/2 = 5\) s.
- PI : \(K_p = 0{,}9\times60/10 = 5{,}4\) ; \(T_i = 10/0{,}3 = 33{,}3\) s.

### 5.4 \(C_V\) — vanne linéaire, 16 L/s, 145 PSI

1. \(Q = 16\) L/s \(= 16\times3600/1000 = 57{,}6\) m³/h.
2. \(\Delta P = 145/14{,}5 = 10\) bar. Densité = 1 (eau à 4 °C, 1000 kg/m³).
3. \(C_{V,max} = 1{,}16\times57{,}6\times\sqrt{1/10} = 1{,}16\times57{,}6\times0{,}316 = 21{,}1\).
   - Vérification impérial : \(Q = 16/3{,}785\times60 = 253{,}6\) GPM ; \(C_V = 253{,}6\sqrt{1/145} = 21{,}1\). ✓
4. Vanne linéaire ⇒ \(C_{V,nom} = 1{,}25\times21{,}1 = 26{,}4\).
5. Gamme 16, 22, 30, 49 ⇒ on choisit **\(C_V = 30\)** (le premier ≥ 26,4).

### 5.5 Cavitation — exercice no 1

Données : \(P_1 = 70\) PSI, \(P_2 = 0\) PSI (relatives), densité 1, \(Q = 2\) GPM, \(F_L = 0{,}9\), \(P_{atm} = 14{,}7\) PSI, \(P_v = 0{,}256\) PSIA.

1. \(\Delta P = P_1 - P_2 = 70\) PSI.
2. \(P_{1,abs} = 70 + 14{,}7 = 84{,}7\) PSIA.
3. \(\Delta P_s = 84{,}7 - 0{,}256 = 84{,}44\) PSI.
4. \(F_L^2\,\Delta P_s = 0{,}81\times84{,}44 = 68{,}4\) PSI.
5. \(\Delta P = 70 \ge 68{,}4\) ⇒ **la vanne cavite**.
6. (Bonus) \(C_V = 2\sqrt{1/70} = 0{,}24\).

### 5.6 Cavitation — exercice no 2 (circuit complet)

Données : \(P_u = 23{,}675\) PSI ; \(Q_{max} = 12{,}5\) L/s avec \(P_{pompe} = 205{,}6\) PSI ; \(Q_{min} = 0{,}556\) L/s avec \(P_{pompe} = 138{,}31\) PSI ; conduite 60 m amont + 10 m aval ; \(f = 0{,}95\) ; \(D = 0{,}1\) m ; \(\rho = 998\) kg/m³ ; \(P_v = 0{,}042\) bar abs ; 14,5 PSI = 1 bar.

**1. \(\Delta P_v\) au débit maximal**
- \(A = \pi(0{,}05)^2 = 7{,}854\times10^{-3}\) m² ; \(v = 0{,}0125/7{,}854\times10^{-3} = 1{,}59\) m/s.
- \(\frac12\rho v^2 = 0{,}5\times998\times1{,}59^2 = 1264\) Pa.
- Amont : \(f\frac{L}{D} = 0{,}95\times600 = 570\) ⇒ \(\Delta P = 570\times1264 = 720\,500\) Pa \(= 7{,}205\) bar \(= 104{,}5\) PSI.
- Aval : \(0{,}95\times100 = 95\) ⇒ \(\Delta P = 120\,100\) Pa \(= 1{,}20\) bar \(= 17{,}4\) PSI.
- Conduites : \(\Delta P_{R1+R2} = 121{,}9\) PSI.
- \(\Delta P_v = 205{,}6 - 121{,}9 - 23{,}675 = \mathbf{60{,}0\ PSI} \approx 4{,}14\) bar.

**2. \(C_{V,max}\)**
- \(Q = 12{,}5\) L/s \(= 45\) m³/h ; densité \(= 0{,}998\).
- \(C_{V,max} = 1{,}16\times45\times\sqrt{0{,}998/4{,}14} = 1{,}16\times45\times0{,}491 = \mathbf{25{,}6}\).

**3. \(C_V\) nominal** (vanne linéaire) : \(1{,}25\times25{,}6 = 32\) ⇒ choisir dans la fiche Fisher le premier \(C_V \ge 32\).

**4. Débit minimal contrôlable ?**
- \(Q_{min} = 0{,}556\) L/s \(= 2{,}0\) m³/h ; \(v = 0{,}0708\) m/s ; \(\frac12\rho v^2 = 2{,}5\) Pa.
- Pertes conduites : \((570+95)\times2{,}5 = 1663\) Pa \(= 0{,}24\) PSI (négligeable).
- \(\Delta P_v = 138{,}31 - 0{,}24 - 23{,}675 = 114{,}4\) PSI \(= 7{,}89\) bar.
- \(C_{V,min} = 1{,}16\times2{,}0\times\sqrt{0{,}998/7{,}89} = \mathbf{0{,}83}\).
- Rangeabilité requise : \(C_{V,nom}/C_{V,min} = 32/0{,}83 \approx 39\). Si la fiche donne \(r = 50{:}1\) *(hyp.)* ⇒ \(C_V\) mini contrôlable \(= 32/50 = 0{,}64 < 0{,}83\) ⇒ **contrôlable**. Si la fiche donne \(r = 30{:}1\), il ne le serait pas.

**5. Cavitation ?**
- \(P_1\) (entrée vanne) \(= 205{,}6 - 104{,}5 = 101{,}1\) PSI rel \(\Rightarrow 101{,}1 + 14{,}5 = 115{,}6\) PSIA.
- \(P_v = 0{,}042\times14{,}5 = 0{,}61\) PSIA ⇒ \(\Delta P_s = 115{,}0\) PSI.
- Avec \(F_L = 0{,}9\) *(hyp., prendre la fiche)* : \(F_L^2\Delta P_s = 0{,}81\times115 = 93{,}2\) PSI.
- \(\Delta P_v = 60 < 93{,}2\) ⇒ **pas de cavitation** au débit max. (Au débit min, \(\Delta P_v = 114{,}4\) PSI et \(P_1 \approx 152{,}8\) PSIA ⇒ \(F_L^2\Delta P_s = 123\) PSI ⇒ toujours pas de cavitation, mais marge réduite.)

**6. Autorité** : \(a = \dfrac{60{,}0}{60{,}0 + 121{,}9} = \mathbf{0{,}33}\). Caractéristique installée nettement déformée (autorité moyenne-faible) ; une vanne =% serait judicieuse pour compenser.

### 5.7 Bruit — exercice no 1

100 dB à 1 m ; niveau à 150 m ?
- \(\Delta L_d = 20\log(150/1) = 20\times2{,}176 = 43{,}5\) dB.
- \(L = 100 - 43{,}5 = \mathbf{56{,}5\ dB}\).

### 5.8 Bruit — exercice no 2

110 dB à 3 m.
- À 700 m : \(\Delta L_d = 20\log(700/3) = 20\times2{,}368 = 47{,}4\) dB ⇒ \(L = 110 - 47{,}4 = \mathbf{62{,}6\ dB}\).
- Distance pour < 50 dB : \(110 - 50 = 60 = 20\log(r/3)\) ⇒ \(r/3 = 10^{3} = 1000\) ⇒ \(r = \mathbf{3000\ m}\).

---

## 6. Conversions et constantes utiles

| Grandeur | Conversion |
|---|---|
| Pression | 1 bar = 100 000 Pa = 14,5 PSI ; 1 PSI = 6895 Pa ; \(P_{atm}\) = 1,013 bar = 14,7 PSI |
| Hauteur d'eau | 1 bar ≈ 10,2 m CE ; \(\Delta P = \rho g\Delta h\) |
| Débit | 1 GPM US = 3,785 L/min = 0,227 m³/h ; 1 L/s = 3,6 m³/h = 15,85 GPM |
| Longueur | 1 pi = 0,3048 m ; 1 po = 25,4 mm |
| Eau | \(\rho_{4°C}\) = 1000 kg/m³ ; \(\rho_{20°C}\) = 998 ; \(\rho_{50°C}\) = 988 ; \(\mu_{20°C}\) ≈ 1,0 mPa·s ; \(\mu_{50°C}\) ≈ 0,55 mPa·s |
| Pression de vapeur eau | 20 °C : 0,023 bar ; 60 °F : 0,256 PSIA ; 50 °C : 0,123 bar ; 100 °C : 1,013 bar |
| Gravité | \(g\) = 9,81 m/s² |
| Densité | densité relative = \(\rho/\rho_{eau}\) (sans unité) |

---

## 7. Pièges classiques

- **Pressions absolues** dans le critère de cavitation : \(P_1\) et \(P_v\) en absolu (ajouter \(P_{atm}\) aux pressions manométriques). \(\Delta P\) de la vanne, lui, est une différence (identique en relatif ou absolu).
- **Unités du \(C_V\)** : GPM + PSI (sans facteur) ou m³/h + bar (facteur 1,16). Ne pas mélanger L/s et bar.
- **Facteur nominal** : 1,25 pour linéaire, 1,4 pour =%. Puis prendre le \(C_V\) constructeur **supérieur ou égal**, jamais inférieur.
- **Diamètre intérieur** dans les pertes de charge (22-20 mm ⇒ D = 20 mm).
- **\(\Delta X\) en % d'échelle** pour \(G_s\) (pas en °C).
- **Sens d'action** : régulateur inverse du procédé ; tenir compte de la vanne air ouvre / air ferme.
- **Ziegler-Nichols BF** : seulement P pendant l'essai ; \(G_c\) et \(T_{osc}\) se lisent à l'oscillation **entretenue**, pas amortie ni divergente.
- **Ordre des approximations successives** : P, puis D, puis I.
- **Autorité** : \(\Delta P_v\) au numérateur **et** au dénominateur ; \(a = 1\) = pas de déformation.
- **Bruit** : la formule donne une **atténuation** à soustraire ; 20 log (pression acoustique), pas 10 log.
- **Cascade** : l'esclave est la boucle **interne** (rapide) et se règle **en premier**.
