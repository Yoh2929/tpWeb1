
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Form.prototype.paint = function(ctx) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
};

Rectangle.prototype.paint = function(ctx) {
    Form.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    Form.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0'; // fond du canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.forms.forEach(f => f.paint(ctx));
};