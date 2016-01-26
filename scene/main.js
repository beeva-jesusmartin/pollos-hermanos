
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

var grupoPollo = new THREE.Object3D();
var grupoPollo2 = new THREE.Object3D();
var grupoPollo3 = new THREE.Object3D();
var grupoTodo = new THREE.Object3D();

	
init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1500, 1500, 1500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(3000, 3500,-2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}


function buildShape(){
	// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA

	//-------------CIELO-------------------------------

var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/knui.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

var SKYradius = 10000; //dimensiones del cielo
var SKYwidthSegments = 32;
var SKYheigthSegments = 32;
var SKYangleStart = 0;
var SKYangleLenght = 6.3;

var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
	sky.position.set(0,0,0);
	sky.rotation.set(0,0,0);
	sky.scale.set(1,1,1);
scene.add( sky );

//-----------------------------------------------
	//--------------CUBO---------------------------

var TexturePollos = THREE.ImageUtils.loadTexture( "images/pollos.jpg" );
var material = new THREE.MeshPhongMaterial( { map: TexturePollos,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

//var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 190; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 150;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 400;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = true;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, material );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = false;	//recibir sombras
	cylinder.position.set(0,200,0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( cylinder );

//-----------------------------------------------

//-------------FONDO----------------------------


var TexturePapas = THREE.ImageUtils.loadTexture( "images/papas.png" );
var material = new THREE.MeshPhongMaterial( { map: TexturePapas,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 170; //radio del circulo
var circlesegments = 32;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 6.3; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, material );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = false;	//recibir sombras
	circle.position.set(0,290,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------

//--------------sombrero---------------------------


var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x111111, emissive: 0x111111, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 160; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 170;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 100;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = false;	//recibir sombras
	cylinder.position.set(400,50,400);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( cylinder );

//-----------------------------------------------

//--------------sombrero---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x111111, emissive: 0x111111, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 260; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 260;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 10;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = false;	//recibir sombras
	cylinder.position.set(400,5,400);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( cylinder );

//-----------------------------------------------

//---------------PROBETA--------------------------

var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.8, side: THREE.DoubleSide} );

var SPHEREradius = 100; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(350,70,-350);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
grupoTodo.add( sphere );	

//-----------------------------------------------

//--------------VASO PROBETA---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.8, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 17; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 17;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 90;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(350,200,-350);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( cylinder );

//-----------------------------------------------

//--------------CILINDRO CUELLO--------------------------

var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.8, side: THREE.DoubleSide} );

var DONUTradius = 20; //radio del anillo
var DONUTtubeWidth = 4;	//ancho del anillo
var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
	donut.castShadow = true;	//emitir sombras
	donut.receiveShadow = true;	//recibir sombras
	donut.position.set(350,250,-350);	//position del objeto(x,y,z)
	donut.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( donut );

//-------------------------------------------------	


//--------------REBORDE--------------------------

var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var DONUTradius = 190; //radio del anillo
var DONUTtubeWidth = 5;	//ancho del anillo
var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
	donut.castShadow = true;	//emitir sombras
	donut.receiveShadow = true;	//recibir sombras
	donut.position.set(0,400,0);	//position del objeto(x,y,z)
	donut.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( donut );

//-------------------------------------------------	

// ----------------PATATAS-------------------------


for(i=0;i<20; i++){
for(j=0;j<20; j++){

var TexturePatata = THREE.ImageUtils.loadTexture( "images/patatas.jpg" );
var material = new THREE.MeshPhongMaterial( { map: TexturePatata,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );


// var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0xFFF984, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );
var xAxis = 100;//dimensiones x
var yAxis = 10;//dimensiones y
var zAxis = 10;//dimensiones z
var positivo_negativoj, positivo_negativoi ;
if (j % 2){
 positivo_negativoj = 1;
 }
  else 
      positivo_negativoj = -1;
  if (i % 2){
 positivo_negativoi = 1;
 }
  else 
      positivo_negativoi = -1;
movex = positivo_negativoj* (10*j %130);
movey =positivo_negativoi* (10*i % 130);
move = Math.random()*3 % 4;
var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
var cube = new THREE.Mesh( cubegeometry, material );
    cube.castShadow = true; //emitir sombras
    cube.receiveShadow = true; //recibir sombras
    cube.position.set(movex,380,movey); //position del objeto(x,y,z)
    cube.rotation.set(Math.PI/4,Math.PI/move,0); //rotacion del objeto(x,y,z)
    cube.scale.set(1,1,1); //escala del objeto(x,y,z)
grupoTodo.add( cube );
}
}


//-----------------------------------------------    


//---------------POLLO1--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );


//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 40; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,500,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo.add( sphere );	

//-----------------------------------------------

//---------------POLLO fino--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material2 = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 30; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material2 );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,560,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo.add( sphere );	

//-----------------------------------------------

//--------------hueso---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xFFFCCB, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 7; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 7;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 45;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(0,620,0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoPollo.add( cylinder );

//-----------------------------------------------

grupoPollo.position.set(50,50,-400);	//position del objeto(x,y,z)
grupoPollo.rotation.set(Math.PI/4,Math.PI/4,0);	//rotacion del objeto(x,y,z)

grupoTodo.add(grupoPollo)

//---------------POLLO2--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );


//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 40; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,500,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo2.add( sphere );	

//-----------------------------------------------

//---------------POLLO fino--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material2 = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 30; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material2 );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,560,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo2.add( sphere );	

//-----------------------------------------------

//--------------hueso---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xFFFCCB, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 7; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 7;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 45;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(0,620,0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoPollo2.add( cylinder );

//-----------------------------------------------

grupoPollo2.position.set(-20,450,-560);	//position del objeto(x,y,z)
grupoPollo2.rotation.set(Math.PI/2,Math.PI/1,0);	//rotacion del objeto(x,y,z)

grupoTodo.add(grupoPollo2)





//---------------POLLO3--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );


//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 40; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,500,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo3.add( sphere );	

//-----------------------------------------------

//---------------POLLO fino--------------------------

var TexturePiel = THREE.ImageUtils.loadTexture( "images/piel.jpg" );
var material2 = new THREE.MeshPhongMaterial( { map: TexturePiel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

//var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 30; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, material2 );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,560,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,2,1);	//escala del objeto(x,y,z)
grupoPollo3.add( sphere );	

//-----------------------------------------------

//--------------hueso---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xFFFCCB, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 7; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 7;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 45;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(0,620,0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoPollo3.add( cylinder );

//-----------------------------------------------

grupoPollo3.position.set(140,830,-300);	//position del objeto(x,y,z)
grupoPollo3.rotation.set(Math.PI/2,Math.PI/3,Math.PI/3);	//rotacion del objeto(x,y,z)

grupoTodo.add(grupoPollo3)



//-----------------mantel-------------------------
var TextureMantel = THREE.ImageUtils.loadTexture( "images/mantel.jpg" );
var material3 = new THREE.MeshPhongMaterial( { map: TextureMantel,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );


var planexAxis = 2000;//dimensiones x
var planeyAxis = 2000;//dimensiones y
var planezAxis = 1;//dimensiones z

var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
var plane = new THREE.Mesh( PLANEgeometry, material3 );
	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(0,0,0);	//position del objeto(x,y,z)
	plane.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
grupoTodo.add( plane );

//-----------------------------------------------


grupoTodo.position.set(0,0,0);	//position del objeto(x,y,z)
grupoTodo.rotation.set(0,Math.PI/2,0);	//rotacion del objeto(x,y,z)


scene.add(grupoTodo)


}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
