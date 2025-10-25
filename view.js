
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

Ellipse.prototype.paint = function(ctx) {
    Form.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
    ctx.stroke();
};

Polygon.prototype.paint = function(ctx) {
    if (!this.points || this.points.length < 2) return;
    Form.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
};


function updateShapeList(drawing) {
    let shapeList = document.getElementById("shapeList");
    shapeList.innerHTML = ""; // Réinitialiser la liste

    drawing.getForms().forEach((form,index)=>{
        let li = document.createElement('li');
        li.className="list-group-item";

        if(form instanceof Rectangle)
            li.textContent = `Rectangle (${form.x},${form.y}) [${form.w}x${form.h}]`;
        else if(form instanceof Line)
            li.textContent = `Ligne (${form.x1},${form.y1}) → (${form.x2},${form.y2})`;
        else if(form instanceof Ellipse)
            li.textContent = `Ellipse (${form.x},${form.y}) [rx:${form.rx}, ry:${form.ry}]`;
        else if(form instanceof Polygon)
            li.textContent = `Polygon pts:${form.points.length}`;

        let btn = document.createElement('button');
        btn.type="button";
        btn.className="btn btn-default btn-sm";
        btn.innerHTML = '<span class="glyphicon glyphicon-remove-sign"></span>';
        btn.onclick=()=>{
            drawing.removeForm(index);
            drawing.paint(ctx);
            updateShapeList(drawing);
        };
        li.prepend(btn);
        shapeList.appendChild(li);
    });

}