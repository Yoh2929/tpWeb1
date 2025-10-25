// Modes d'édition
var editingMode = { rect: 0, line: 1, ellipse: 2, polygon: 3 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = null;

    // Récupération des widgets
    let butRect = document.getElementById('butRect');
    let butLine = document.getElementById('butLine');
    let butEllipse = document.getElementById('butEllipse');
    let butPolygon = document.getElementById('butPolygon');
    let spinnerWidth = document.getElementById('spinnerWidth');
    let colourPicker = document.getElementById('colour');

    // Gestion des événements UI
    butRect.onclick = () => this.currEditingMode = editingMode.rect;
    butLine.onclick = () => this.currEditingMode = editingMode.line;
    butEllipse.onclick = () => this.currEditingMode = editingMode.ellipse;
    butPolygon.onclick = () => this.currEditingMode = editingMode.polygon;
    spinnerWidth.onchange = () => this.currLineWidth = spinnerWidth.value;
    colourPicker.onchange = () => this.currColour = colourPicker.value;

    // Création du DnD
    new DnD(canvas, this);

    // Début de l'interaction
    this.onInteractionStart = function(dnd) {
        switch (this.currEditingMode) {
            case editingMode.rect:
                this.currentShape = new Rectangle(dnd.xInit, dnd.yInit, 0, 0, this.currLineWidth, this.currColour);
                break;
            case editingMode.line:
                this.currentShape = new Line(dnd.xInit, dnd.yInit, dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour);
                break;
            case editingMode.ellipse:
                this.currentShape = new Ellipse(dnd.xInit, dnd.yInit, 0, 0, this.currLineWidth, this.currColour);
                break;
            case editingMode.polygon:
                this.currentShape = new Polygon([{ x: dnd.xInit, y: dnd.yInit }], this.currLineWidth, this.currColour);
                break;
        }
        drawing.paint(ctx);
        if(this.currentShape.paint) this.currentShape.paint(ctx);
    };

    // Mise à jour pendant l'interaction
    this.onInteractionUpdate = function(dnd) {
        switch(this.currEditingMode){
            case editingMode.rect:
                this.currentShape.w = dnd.xFinal - dnd.xInit;
                this.currentShape.h = dnd.yFinal - dnd.yInit;
                break;
            case editingMode.line:
                this.currentShape.x2 = dnd.xFinal;
                this.currentShape.y2 = dnd.yFinal;
                break;
            case editingMode.ellipse:
                this.currentShape.rx = Math.abs(dnd.xFinal - dnd.xInit);
                this.currentShape.ry = Math.abs(dnd.yFinal - dnd.yInit);
                break;
            case editingMode.polygon:
                this.currentShape.points.push({x:dnd.xFinal, y:dnd.yFinal});
                break;
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    };

    // Fin de l'interaction
    this.onInteractionEnd = function(dnd) {
        if (!this.currentShape) return;
        drawing.addForm(this.currentShape);
        drawing.paint(ctx);
        updateShapeList(drawing);
        this.currentShape = null;
    };
}

let undoBtn = document.getElementById('undoBtn');
undoBtn.onclick = () => {
    drawing.undo();
    drawing.paint(ctx);
    updateShapeList(drawing);
};

let redoBtn = document.getElementById('redoBtn');
redoBtn.onclick = () => {
	drawing.redo();
	drawing.paint(ctx);
	updateShapeList(drawing);
}