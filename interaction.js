
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function getMousePosition(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
   this.xInit = 0;
    this.yInit = 0;
    this.xFinal = 0;
    this.yFinal = 0;
    this.isPressed = false;
	// Developper les 3 fonctions gérant les événements

  this.mouseDown = (evt) => {
        let pos = getMousePosition(canvas, evt);
        this.xInit = pos.x;
        this.yInit = pos.y;
        this.isPressed = true;
        interactor.onInteractionStart(this);
    };

    this.mouseMove = (evt) => {
        if (this.isPressed) {
            let pos = getMousePosition(canvas, evt);
            this.xFinal = pos.x;
            this.yFinal = pos.y;
            interactor.onInteractionUpdate(this);
        }
    };

    this.mouseUp = (evt) => {
        if (this.isPressed) {
            let pos = getMousePosition(canvas, evt);
            this.xFinal = pos.x;
            this.yFinal = pos.y;
            this.isPressed = false;
            interactor.onInteractionEnd(this);
        }
    };

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.mouseDown);
  canvas.addEventListener('mousemove', this.mouseMove);
  canvas.addEventListener('mouseup', this.mouseUp);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



