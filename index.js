const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;


let canvas_width = canvas.width;
let canvas_height = canvas.height;

let shapes = []; //extra//
let current_shape_index = null;
let is_dragging = false;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);



//extra code//
shapes.push( {x: 0, y: 0, width: 200, height: 100, color: 'grey' } );
shapes.push( {x: 0, y: 101, width: 100, height: 100, color: 'grey' } );


let is_mouse_in_Shape = function(x, y, shape){

  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.y;
  let shape_bottom = shape.y+ shape.height;

  if(x > shape_left && x < shape_right && y > shape_top && y < shape_bottom ){
    return true;
  }
  return false;

}




let mouse_down = function(event) {
  event.preventDefault();
  console.log(event); 
  
  startX = parseInt(event.clientX );
  startY = parseInt(event.clientY );

  let index = 0;
  for (let shape of shapes){
    if(is_mouse_in_Shape(startX, startY, shape)){
      // console.log('yes');
      current_shape_index = index;
      is_dragging = true;
      return;
    }
    // else{
    //    console.log('no');
    //  }
    index++;
  }

}

let mouse_up = function(event){
  
  if(!is_dragging){
    return;
  }
  
  event.preventDefault();
  is_dragging = false;  

}

let mouse_out = function(event){
  
  if(!is_dragging){
    return;
  }
  
  event.preventDefault();
  is_dragging = false;  
  
}

let mouse_move = function(event){
if(!is_dragging){
  return;
    
} else{
  event.preventDefault();
  let mouseX = parseInt(event.clientX );
  let mouseY = parseInt(event.clientY );

  let dx = mouseX - startX;
  let dy = mouseY - startY;

  console.log(dx,dy);

  let current_shape = shapes[current_shape_index];
  current_shape.x += dx;
  current_shape.y += dy;

  draw_shapes();

  startX = mouseX;
  startY = mouseY;

} 
}


canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;


let draw_shapes = function(){
       ctx.clearRect(0, 0, canvas_width, canvas_height);
       for(let shape of shapes){
        ctx.fillStyle = shape.color;
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

       }
}


draw_shapes();
