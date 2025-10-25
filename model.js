// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

// Classe Form : classe mère pour les formes
function Form(thickness, color) {
    this.thickness = thickness;
    this.color = color;
}

// Rectangle
function Rectangle(x, y, w, h, thickness, color) {
    Form.call(this, thickness, color);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}
Rectangle.prototype = new Form();

// Ligne
function Line(x1, y1, x2, y2, thickness, color) {
    Form.call(this, thickness, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}
Line.prototype = new Form();

// Ellipse
function Ellipse(x, y, rx, ry, thickness, color) {
    Form.call(this, thickness, color);
    this.x = x; // centre
    this.y = y;
    this.rx = rx;
    this.ry = ry;
}
Ellipse.prototype = new Form();

// Polygone 
function Polygon(points, thickness, color) {
    Form.call(this, thickness, color);
    this.points = points; 
}
Polygon.prototype = new Form();


// Drawing : collection de formes
function Drawing() {
    this.forms = [];
    this.undoStack = [];
    this.redoStack = [];

    this.addForm = function(form) {
        this.forms.push(form);
        this.undoStack.push(form);
        this.redoStack = []; // on vide le redo quand on ajoute une nouvelle forme
    };

    this.getForms = function() {
        return this.forms;
    };

    this.removeForm = function(index) {
        if (index >= 0 && index < this.forms.length) {
            this.forms.splice(index, 1);
        }
    };

    this.undo = function() {
        if (this.undoStack.length > 0) {
            const last = this.undoStack.pop();
            const index = this.forms.indexOf(last);
            if (index !== -1) this.forms.splice(index, 1);
            this.redoStack.push(last); // on peut redo cette forme
        }
    };

    this.redo = function() {
        if (this.redoStack.length > 0) {
            const form = this.redoStack.pop();
            this.forms.push(form);
            this.undoStack.push(form);
        }
    };
}

