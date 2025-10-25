
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

// Drawing : collection de formes
function Drawing() {
    this.forms = [];

    this.addForm = function(form) {
        this.forms.push(form);
    };

    this.getForms = function() {
        return this.forms;
    };
}