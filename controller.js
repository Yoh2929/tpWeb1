
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	let butRect = document.getElementById('butRect');
    let butLine = document.getElementById('butLine');
    let spinnerWidth = document.getElementById('spinnerWidth');
    let colourPicker = document.getElementById('colour');

    // Événements sur les widgets
    butRect.onclick = () => this.currEditingMode = editingMode.rect;
    butLine.onclick = () => this.currEditingMode = editingMode.line;
    spinnerWidth.onchange = () => this.currLineWidth = spinnerWidth.value;
    colourPicker.onchange = () => this.currColour = colourPicker.value;
	
	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	 this.onInteractionStart = function(dnd) {
        if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(dnd.xInit, dnd.yInit, 0, 0, this.currLineWidth, this.currColour);
        } else {
            this.currentShape = new Line(dnd.xInit, dnd.yInit, dnd.xInit, dnd.yInit, this.currLineWidth, this.currColour);
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    };

    this.onInteractionUpdate = function(dnd) {
        if (this.currEditingMode === editingMode.rect) {
            this.currentShape.w = dnd.xFinal - dnd.xInit;
            this.currentShape.h = dnd.yFinal - dnd.yInit;
        } else {
            this.currentShape.x2 = dnd.xFinal;
            this.currentShape.y2 = dnd.yFinal;
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    };

    this.onInteractionEnd = function(dnd) {
        drawing.addForm(this.currentShape);
        drawing.paint(ctx);
    };
};


