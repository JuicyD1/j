# Démarches complètes — trois exercices (PID discret, vanne diesel, pompe + réservoir)

Conventions : écart \(\varepsilon = \text{consigne} - \text{mesure}\) (en % d'échelle). Les valeurs lues sur un graphique sont indiquées à ±1 % près. Les hypothèses ajoutées sont signalées *(hyp.)*.

---

# Exercice 1 — Régulateur PID numérique (commande pour les échantillons 3 à 10)

## Données

- Procédé en bleu, consigne en gris. Consigne : 40 % jusqu'à l'échantillon 3, puis **échelon de +20 %** à 60 %.
- Commande avant l'échelon : **45 %** (régime permanent, écart nul).
- \(K_p = 9\), \(K_d = 0{,}05\) s, \(K_i = ?\), \(\Delta T = 1\) s.
- **Note : la commande est inversée** (régulateur à action inverse : quand la mesure monte, la commande descend).
- Avant l'échelon, l'intégrale contient une **erreur résiduelle accumulée de 90 %** (c'est-à-dire \(\sum\varepsilon_k\Delta T = 90\ \%\cdot\text{s}\)).

Lecture de la mesure sur la courbe :

| Échantillon \(n\) | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|
| Consigne \(W\) (%) | 40 | 60 | 60 | 60 | 60 | 60 | 60 | 60 |
| Mesure \(X\) (%) | 40 | 40 | 53 | 66 | 65 | 59 | 59 | 60 |

## Formule du cours (structure parallèle, version discrète)

\[
C_n = K_p\,\varepsilon_n + K_i\sum_{k=0}^{n}\varepsilon_k\,\Delta T + K_d\,\frac{\varepsilon_n - \varepsilon_{n-1}}{\Delta T}
\]

**Sens d'action.** Le régulateur est inverse : la commande doit évoluer **à l'opposé de la mesure**. Avec \(\varepsilon = W - X\), une mesure qui monte fait baisser \(\varepsilon\), donc la commande : on garde les signes **+** devant les trois actions. (Si l'on préfère écrire \(\varepsilon = X - W\), il faut alors mettre un signe **−** devant les trois actions : les résultats numériques sont identiques. Ce qui compte : quand la consigne passe à 60 % alors que la mesure est encore à 40 %, la commande doit **monter**, sinon le procédé ne pourrait jamais rejoindre 60 %.)

## Étape 1 — Déterminer \(K_i\) à partir de l'état initial (échantillon 3)

À l'échantillon 3 : \(\varepsilon_3 = 40 - 40 = 0\) et \(\varepsilon_3 - \varepsilon_2 = 0\). Les actions P et D sont nulles ; **toute la commande vient de l'intégrale** :

\[
C_3 = K_i\sum\varepsilon_k\Delta T \;\Rightarrow\; 45\ \% = K_i\times90\ \%\cdot\text{s} \;\Rightarrow\; K_i = \frac{45}{90} = \mathbf{0{,}5\ s^{-1}}
\]

(\(T_i = 1/K_i = 2\) s.)

## Étape 2 — Tableau de calcul échantillon par échantillon

La somme intégrale part de 90 et on lui ajoute \(\varepsilon_n\Delta T\) à chaque pas (le pas courant est inclus, comme dans la formule \(\sum_0^n\)). La dérivée utilise \(\varepsilon_{n-1}\) du pas précédent (\(\varepsilon_2 = 0\)).

| \(n\) | \(\varepsilon_n = W - X\) | \(\sum\varepsilon_k\Delta T\) | \(\dfrac{\varepsilon_n-\varepsilon_{n-1}}{\Delta T}\) | P \(= 9\,\varepsilon_n\) | I \(= 0{,}5\sum\) | D \(= 0{,}05\cdot\)pente | \(C_n\) calculée | \(C_n\) réelle (0–100 %) |
|---|---|---|---|---|---|---|---|---|
| 3 | 0 | 90 | 0 | 0 | 45,0 | 0 | **45,0 %** | 45,0 % |
| 4 | +20 | 110 | +20 | 180 | 55,0 | +1,00 | **236,0 %** | 100 % (saturée) |
| 5 | +7 | 117 | −13 | 63 | 58,5 | −0,65 | **120,85 %** | 100 % (saturée) |
| 6 | −6 | 111 | −13 | −54 | 55,5 | −0,65 | **0,85 %** | 0,85 % |
| 7 | −5 | 106 | +1 | −45 | 53,0 | +0,05 | **8,05 %** | 8,05 % |
| 8 | +1 | 107 | +6 | 9 | 53,5 | +0,30 | **62,8 %** | 62,8 % |
| 9 | +1 | 108 | 0 | 9 | 54,0 | 0 | **63,0 %** | 63,0 % |
| 10 | 0 | 108 | −1 | 0 | 54,0 | −0,05 | **53,95 %** | 53,95 % |

Détail des calculs :

- \(C_3 = 9(0) + 0{,}5(90) + 0{,}05\,(0-0)/1 = 45\ \%\)
- \(C_4 = 9(20) + 0{,}5(110) + 0{,}05\,(20-0)/1 = 180 + 55 + 1 = 236\ \%\)
- \(C_5 = 9(7) + 0{,}5(117) + 0{,}05\,(7-20)/1 = 63 + 58{,}5 - 0{,}65 = 120{,}85\ \%\)
- \(C_6 = 9(-6) + 0{,}5(111) + 0{,}05\,(-6-7)/1 = -54 + 55{,}5 - 0{,}65 = 0{,}85\ \%\)
- \(C_7 = 9(-5) + 0{,}5(106) + 0{,}05\,(-5+6)/1 = -45 + 53 + 0{,}05 = 8{,}05\ \%\)
- \(C_8 = 9(1) + 0{,}5(107) + 0{,}05\,(1+5)/1 = 9 + 53{,}5 + 0{,}3 = 62{,}8\ \%\)
- \(C_9 = 9(1) + 0{,}5(108) + 0{,}05\,(1-1)/1 = 9 + 54 + 0 = 63\ \%\)
- \(C_{10} = 9(0) + 0{,}5(108) + 0{,}05\,(0-1)/1 = 0 + 54 - 0{,}05 = 53{,}95\ \%\)

## Étape 3 — Régime permanent

Quand l'écart est redevenu nul (\(n \ge 10\)), P et D sont nuls et la commande est **tenue par l'intégrale** :

\[
\sum\varepsilon_k\Delta T = 108\ \%\cdot\text{s} \qquad\Rightarrow\qquad C_\infty = K_i\times108 = \mathbf{54\ \%}
\]

L'« erreur intégrale » accumulée est passée de 90 à **108 %·s**, et la commande de 45 à **54 %** : c'est ce supplément de 9 % de commande qui maintient le procédé à 60 % au lieu de 40 % (gain statique du procédé ≈ \(20/9 \approx 2{,}2\) %/%).

## Remarques et vérifications

1. **Cohérence du sens** : la commande monte (45 → 100 %) quand la consigne dépasse la mesure, puis redescend fortement (0,85 %) quand la mesure dépasse la consigne (66 % > 60 %), et finit au-dessus de sa valeur initiale. Un calcul qui donnerait \(C_4 = 9(-20) + \dots = -146\ \%\) et une commande finale de 36 % (inférieure aux 45 % initiaux) correspondrait à un régulateur **direct** et ferait **descendre** le procédé : il contredirait la note « commande inversée » et la courbe.
2. **Saturation** : \(C_4\) et \(C_5\) dépassent 100 %. Un régulateur réel sort 100 % (et, s'il n'a pas d'anti-windup, continue d'accumuler l'intégrale). À l'examen, donner la valeur calculée et préciser qu'elle est saturée à 100 %.
3. **Ordre de grandeur de \(K_p = 9\)** : bande proportionnelle \(BP = 100/9 \approx 11\ \%\) — réglage très agressif, d'où les grandes oscillations de commande et le dépassement de la mesure (66 %, soit 30 % de l'échelon).
4. **Action dérivée** : avec \(K_d = 0{,}05\) s, elle ne pèse que ±1 % au maximum ; elle est négligeable ici.
5. Si l'on inclut la perte de pas de lecture (mesure à ±1 %), chaque \(C_n\) varie d'environ ±9 % à cause de \(K_p\) : vos valeurs peuvent différer légèrement sans être fausses.

---

# Exercice 2 — Vanne sur diesel : \(C_V\) max, \(C_V\) min, cavitation

## Données

- Fluide : diesel, \(\rho = 850\) kg/m³ ⇒ densité \(d = 0{,}85\) ; \(P_{vapeur} = 0{,}001\) bar (absolu).
- \(P_1 = 10\) bar, \(P_2 = 6\) bar (manométriques) ⇒ \(\Delta P = 4\) bar.
- \(Q_{max} = 1200\) L/min ; \(Q_{min} = 180\) L/min.
- Diamètre de la vanne \(d = 0{,}96\) (en **pouces** pour le tableau \(C_V/d^2 \to F_L\)).

## Étape 1 — Conversions

\[
Q_{max} = 1200\ \tfrac{\text{L}}{\text{min}}\times\frac{60}{1000} = 72\ \text{m}^3/\text{h}
\qquad
Q_{min} = 180\times\frac{60}{1000} = 10{,}8\ \text{m}^3/\text{h}
\]

\[
\Delta P = P_1 - P_2 = 10 - 6 = 4\ \text{bar}
\qquad
\sqrt{\frac{d}{\Delta P}} = \sqrt{\frac{0{,}85}{4}} = \sqrt{0{,}2125} = 0{,}461
\]

## Étape 2 — \(C_V\) maximal et minimal (formule métrique)

\[
C_{V,max} = 1{,}16\,Q_{max}\sqrt{\frac{d}{\Delta P}} = 1{,}16\times72\times0{,}461 = \mathbf{38{,}5}
\]

\[
C_{V,min} = 1{,}16\,Q_{min}\sqrt{\frac{d}{\Delta P}} = 1{,}16\times10{,}8\times0{,}461 = \mathbf{5{,}78}
\]

Vérification en unités impériales : \(Q_{max} = 1200/3{,}785 = 317\) GPM ; \(\Delta P = 4\times14{,}5 = 58\) PSI ; \(C_V = 317\sqrt{0{,}85/58} = 317\times0{,}121 = 38{,}4\) ✓.

Remarque : \(C_{V,min}/C_{V,max} = 180/1200\) exactement, puisque \(\Delta P\) est le même aux deux débits. Rangeabilité requise : \(38{,}5/5{,}78 = 6{,}7{:}1\) (très facile à tenir pour n'importe quelle vanne de régulation).

Si l'énoncé demandait aussi le \(C_V\) nominal : linéaire \(1{,}25\times38{,}5 = 48{,}1\) ; égal pourcentage \(1{,}4\times38{,}5 = 53{,}9\).

## Étape 3 — Coefficient de récupération \(F_L\) (tableau)

Le tableau du cours donne \(F_L\) en fonction de \(C_V/d^2\) (\(d\) en pouces) :

\[
\frac{C_V}{d^2} = \frac{38{,}5}{0{,}96^2} = \frac{38{,}5}{0{,}922} \approx 41{,}8
\]

Lecture du tableau pour cette valeur : **\(F_L \approx 0{,}46\)** (valeur relevée sur le tableau du cours ; un \(C_V/d^2\) élevé signifie une vanne très « ouverte » pour son diamètre, donc forte récupération de pression et \(F_L\) faible).

## Étape 4 — Critère de cavitation (pressions absolues)

\[
P_{1,abs} = 10 + 1{,}013 = 11{,}013\ \text{bar}
\qquad
\Delta P_s = P_{1,abs} - P_v = 11{,}013 - 0{,}001 = 11{,}012\ \text{bar}
\]

\[
F_L^2\,\Delta P_s = 0{,}46^2\times11{,}012 = 0{,}2116\times11{,}012 = \mathbf{2{,}33\ bar}
\]

\[
\Delta P = 4\ \text{bar} \;\ge\; 2{,}33\ \text{bar} \qquad\Rightarrow\qquad \textbf{oui, la vanne cavite.}
\]

## Étape 5 — Interprétation et solutions

- Le \(\Delta P\) admissible sans cavitation est 2,33 bar ; on en impose 4. Pour ne pas caviter avec cette vanne, il faudrait \(\Delta P < 2{,}33\) bar, par exemple relever \(P_2\) à plus de 7,7 bar (contre-pression, plaque à orifice) ou réduire \(P_1\).
- Avec ce \(\Delta P\) de 4 bar, il faudrait une vanne avec \(F_L \ge \sqrt{4/11{,}012} = 0{,}60\) (vanne à cage ou simple siège : \(F_L\) 0,85–0,9 ⇒ large marge).
- Autres solutions du cours : déplacer la vanne (pression aval plus grande, fluide plus froid — ici \(P_v\) est déjà très faible, le levier est la pression aval) ; vanne de contournement pour réduire le \(\Delta P\) de la vanne.
- Note sur l'unité de \(d\) : avec \(d = 0{,}96\) **m**, \(C_V/d^2\) (d en pouces = 37,8) vaudrait 0,027, hors tableau. La valeur n'a de sens que si \(d = 0{,}96\) **po** (≈ DN 25). Un débit de 20 L/s dans un passage de 0,96 po donne une vitesse d'environ 43 m/s — irréaliste physiquement, mais c'est un exercice de calcul.

---

# Exercice 3 — Pompe, conduite de 100 m et réservoir sous pression : \(P_1\) et \(Q\)

## Données et lecture du schéma

- Diesel, \(\rho = 850\) kg/m³.
- Conduite en acier **4"** : diamètre intérieur \(D = 4\times25{,}4 = 101{,}6\) mm \(= 0{,}1016\) m *(hyp. : on prend le diamètre nominal comme diamètre intérieur ; un tube sch 40 a 102,3 mm, ce qui ne change presque rien)*.
- Longueur \(L = 100\) m, vitesse \(v = 3{,}5\) m/s, coefficient de frottement \(f = 0{,}9\) (donné).
- Une singularité : **coude normal 90°**, \(\xi = 0{,}75\) *(hyp. : tableau du cours)*.
- Réservoir : pression du gaz au-dessus du liquide **100 PSI** (manométrique) ; fond du réservoir **5 m** au-dessus de la conduite ; hauteur de liquide **10 m** ⇒ surface libre à \(h = 5 + 10 = 15\) m au-dessus de la conduite.
- Inconnues : pression de refoulement de la pompe \(P_1\) et débit \(Q\).

```
 P1                      100 m, v = 3,5 m/s                        ┌────────┐ 100 PSI
 (●)══════════════════════════════════════════════════════╗        │~~~~~~~~│ ─┐
 pompe                                                    ║ coude  │ diesel │  │ 10 m
                                                          ║  90°   │        │  │
                                                          ╚═══════►└────────┘ ─┘  ─┐
                                                                                    │ 5 m
 ───────────────────────────────────────────── niveau de la conduite ───────────────┘
```

## Étape 1 — Débit

\[
A = \frac{\pi D^2}{4} = \frac{\pi(0{,}1016)^2}{4} = 8{,}11\times10^{-3}\ \text{m}^2
\]

\[
Q = v\,A = 3{,}5\times8{,}11\times10^{-3} = \mathbf{0{,}0284\ m^3/s} = 28{,}4\ \text{L/s} = 102\ \text{m}^3/\text{h} = 1703\ \text{L/min} = 450\ \text{GPM}
\]

## Étape 2 — Pression dynamique

\[
\frac12\rho v^2 = 0{,}5\times850\times3{,}5^2 = 0{,}5\times850\times12{,}25 = 5206\ \text{Pa}
\]

## Étape 3 — Perte de charge linéique

\[
f\,\frac{L}{D} = 0{,}9\times\frac{100}{0{,}1016} = 885{,}8
\qquad
\Delta P_{lin} = 885{,}8\times5206 = 4\,611\,800\ \text{Pa} \approx \mathbf{46{,}1\ bar}
\]

(\(f = 0{,}9\) est une valeur de cours volontairement très élevée ; avec un \(f\) réaliste de 0,02, la perte serait de 1 bar.)

## Étape 4 — Perte de charge singulière (coude)

\[
\Delta P_{coude} = \xi\,\frac12\rho v^2 = 0{,}75\times5206 = 3905\ \text{Pa} \approx 0{,}04\ \text{bar}
\]

(Si le tableau du cours compte aussi la **sortie dans le réservoir**, \(\xi = 1\) : \(+5206\) Pa \(\approx 0{,}05\) bar.)

## Étape 5 — Pression hydrostatique à vaincre

La pompe doit pousser le liquide jusqu'à la surface libre, 15 m plus haut :

\[
\rho g h = 850\times9{,}81\times15 = 125\,078\ \text{Pa} \approx \mathbf{1{,}25\ bar}
\]

## Étape 6 — Pression du réservoir

\[
100\ \text{PSI} = 100\times6895 = 689\,500\ \text{Pa} \approx \mathbf{6{,}895\ bar}
\]

## Étape 7 — Bilan de pression : \(P_1\)

La pression de la pompe doit fournir la pression du réservoir, la hauteur de liquide et toutes les pertes :

\[
P_1 = P_{réservoir} + \rho g h + \Delta P_{lin} + \Delta P_{coude}
\]

\[
P_1 = 689\,500 + 125\,078 + 4\,611\,800 + 3905 = 5\,430\,300\ \text{Pa}
\]

\[
\boxed{P_1 \approx 54{,}3\ \text{bar} \approx 788\ \text{PSI}}\ \text{(manométrique)}
\]

Avec la perte de sortie dans le réservoir : \(5\,435\,500\) Pa \(\approx 54{,}4\) bar. Avec \(D = 0{,}100\) m au lieu de 0,1016 : \(f L/D = 900\), \(\Delta P_{lin} = 46{,}9\) bar, \(P_1 \approx 55{,}0\) bar.

## Étape 8 — Analyse du résultat

| Poste | Pa | bar | Part |
|---|---|---|---|
| Perte linéique (100 m, \(f = 0{,}9\)) | 4 611 800 | 46,1 | 85 % |
| Pression du réservoir (100 PSI) | 689 500 | 6,9 | 12,7 % |
| Hauteur de liquide (15 m) | 125 078 | 1,25 | 2,3 % |
| Coude 90° | 3 905 | 0,04 | 0,07 % |
| **Total \(P_1\)** | **5 430 300** | **54,3** | 100 % |

- La perte linéique domine totalement à cause du \(f = 0{,}9\) ; le coude est négligeable.
- Un résultat voisin (par exemple 56,6 bar) s'explique par un choix différent de diamètre intérieur, de \(\xi\), ou de hauteur retenue (10 m au lieu de 15 m change \(P_1\) de 0,42 bar ; prendre \(D = 0{,}1\) m l'augmente de 0,74 bar). L'important à l'examen : poser explicitement le bilan \(P_1 = P_{rés} + \rho g h + \sum\Delta P\) et écrire les hypothèses.
- Rigueur Bernoulli *(complément)* : la vitesse dans le réservoir est nulle alors qu'elle vaut 3,5 m/s au point 1 ; en toute rigueur \(P_1 = P_{rés} + \rho g h + \sum\Delta P - \frac12\rho v^2 + \xi_{sortie}\frac12\rho v^2\), et les deux termes en \(\frac12\rho v^2\) se compensent exactement quand \(\xi_{sortie} = 1\). Le bilan simplifié du cours est donc correct.
- Nombre de Reynolds *(complément)* : \(Re = \rho v D/\mu = 850\times3{,}5\times0{,}1016/2{,}5\times10^{-3} \approx 1{,}2\times10^5\) (diesel \(\mu \approx 2{,}5\) mPa·s) : turbulent, cohérent avec l'usage d'un coefficient \(f\) constant.
