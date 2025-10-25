# TP Web 1 – WE

**Yohann MEAR - M1 IL Alternant 2025-2026** 

---

## 1. Description du projet

Ce TP consiste à réaliser une application web interactive permettant de dessiner différentes formes sur un canvas HTML5.  
L'application implémente un mini MVC côté client pour séparer :  

- **Modèle (`model.js`)** : gestion des formes (Rectangle, Ligne, Ellipse, Polygon) et de l'historique pour Undo/Redo.  
- **Vue (`view.js`)** : affichage des formes sur le canvas et mise à jour de la liste des formes avec possibilité de suppression.  
- **Contrôleur (`controller.js`)** : gestion des interactions utilisateur via un Pencil (outil de dessin), liaison avec les widgets (couleur, épaisseur, type de forme) et les interactions DnD (drag & draw).  

Le TP inclut également :  
- Gestion des widgets pour choisir le type de forme, la couleur et l’épaisseur.  
- Liste des formes créées avec possibilité de supprimer une forme existante.  
- Undo/Redo complet pour toutes les formes dessinées.  

---

## 2. Installation / Lancement

1. Cloner le dépôt :  
```bash
git clone https://github.com/Yoh2929/tpWeb1.git
