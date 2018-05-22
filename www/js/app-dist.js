Vue.component('init-app',{
  template:'#init-app',
  data:function() {
    return {
      items: [],
      nota:{images:[{name:logoemsa9aniv,description:''}]},
      index:1,
      carpeta:"assets/img/"
    }
  },
  computed:{
    imagen:function(){
      return this.nota.images[0].name;
    }
  },
  methods:{
    anterior:function(){
      this.index--;
      this.loadAndPaginate();
    },
    siguiente:function(){
      this.index++;
      this.loadAndPaginate();
    },
    loadAndPaginate:function(){
      this.$http.get('http://emsavalles.com/api/noticias/paginate/'+this.index)
      .then(function(response){
        this.carpeta='http://emsavalles.com/CGI-BIN/fotos/';
        this.items=response.body.datos;        
      })
    },
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
      this.$http.get('http://emsavalles.com/api/notas')
      .then(function(response){
        this.carpeta='http://emsavalles.com/CGI-BIN/fotos/';
        this.nota=response.body.datos[0];
        this.items=response.body.datos.slice(1);
        loader.hide();
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });       
    },
    notifyme:function(){
      var a=this.$f7.addNotification({
        
        title: 'emsavalles.com',
        subtitle: 'Application v1.0.1',
        message: 'Supported in Android & iOS',
        closeTimeout: 3000,
        onClose: function () {  
          this.$f7.alert('Notification closed');  
      }.bind(this)

        //media: '<img width="44" height="44" style="border-radius:100%" src="img/logo.png">'
    });      
    }
  },
  created:function(){
    
    this.refresh();      
  }
  
})
Vue.component('principal', {
  template: '#principal',
  data:function(){
    return {
      nota:{title:"vacio"}
    }
  },
  mounted:function(){
    this.$http.get('http://emsavalles.com/api/principal')
    .then(function(response){
      this.nota=response.body[0];
    });
  }
})
Vue.component('page-leer', {
  template: '#page-leer',
  data:function(){
    return{
      nota:{images:[{name:logoemsa9aniv,description:''}]},
      seccion:'',
      carpeta:"assets/img/",
      myId:''
    }
  },
  computed:{
    imagen:function(){
      return this.nota.images[0].name;
    }
  },
  created:function(){
    //log(this.$route.params);
  this.seccion=this.$route.params.seccion;
  this.carpeta='http://emsavalles.com/CGI-BIN/';
  if( this.seccion=='paginas'){this.carpeta+='columnas/';}else{this.carpeta+='fotos/';}
  this.$http.get('http://emsavalles.com/api/'+ this.seccion+'/'+this.$route.params.id)
    .then(function(response){
      this.nota=response.body;

      if(this.nota.previd!==undefined){
        this.myId=this.nota.previd;
      }else{
        this.myId=this.nota.id;
      }      
    });  
  }
})
Vue.component('revistas',{
  template:'#template-revistas',
  data:function() {
    return {
      items: [],
      index:0,
    }
  },
  methods:{
    anterior:function(){
      this.index--;
      this.loadAndPaginate();
    },
    siguiente:function(){
      this.index++;
      this.loadAndPaginate();
    },
    loadAndPaginate:function(){
      this.$http.get('http://emsavalles.com/api/revistas/'+this.index)
      .then(function(response){
        this.items=response.body.datos;
      })
    },
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
      this.$http.get('http://emsavalles.com/api/revistas/'+this.index)
      .then(function(response){
        this.items=response.body.datos;
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });
    }    
  },
  created:function(){
    this.refresh();      
  }
  
})
Vue.component('revista',{
  template:'#template-revista',
  data:function() {
    return {
      edicion: {paginas:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]},
      title:'',      
    }
  },
  methods:{
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
      this.$http.get('http://emsavalles.com/api/revista/'+this.$route.params.id)
      .then(function(response){
        this.edicion=response.body;
        this.title='Edición: '+this.edicion.edicion;
        this.paginas=response.body.paginas;
        
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });      
    }    
  },
  created:function(){
    this.refresh();
  }  
})
Vue.component('cine',{
  template:'#template-cine',
  data:function() {
    return {
      items: []
    }
  },
  methods:{
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
      this.$http.get('http://emsavalles.com/api/cine/')
      .then(function(response){
        this.items=response.body;
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });
    }    
  },
  created:function(){
    this.refresh();      
  }
})
Vue.component('pelicula',{
  template:'#template-pelicula',
  data:function() {
    return {
      item: {'image':''},
      title:''
    }
  },
  methods:{
    onRefresh:function(e){
      this.refresh(e);
    },
    toTrailer:function(){
      location.href="//google.com";
    },
    refresh:function(e){
      this.$http.get('http://emsavalles.com/api/cine/'+this.$route.params.id)
      .then(function(response){
        this.item=response.body;
        this.title=this.item.title;
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });
    }    
  },
  created:function(){
    this.refresh();      
  }
})
Vue.component('masinfo',{
  template:'#template-masinfo',
  data:function() {
    return {
      items: [],
      index:1,
      title:'',
      op:''
    }
  },
  methods:{
    anterior:function(){
      this.index--;
      this.loadAndPaginate();
    },
    siguiente:function(){
      this.index++;
      this.loadAndPaginate();
    },
    loadAndPaginate:function(){
      this.$http.get('http://emsavalles.com/api/'+this.$route.params.seccion+'/paginate/'+this.index)
      .then(function(response){
        this.items=response.body.datos;
      })
    },
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
     // log(this.$route.params);
    
      this.$http.get('http://emsavalles.com/api/'+this.$route.params.seccion+'/paginate')
      .then(function(response){
        this.items=response.body.datos;
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });
      
    }    
  },
  created:function(){
    this.op=this.$route.params.seccion;
    //log(this.$route.params.seccion);
    switch(this.$route.params.seccion){
      case 'policia':this.title='Policía';break;
      case 'nacional':this.title='Nacional';break;
      case 'deportes':this.title='Deportes';break;
      case 'espectaculos':this.title='Espectáculos';break;
      case 'deportes':this.title='Deportes';break;
    }
    
    this.refresh();      
  }
  
})
Vue.component('carton',{
  template:'#template-carton',
  data:function() {
    return {
      items: [],
      index:1,
      thumb:'http://emsavalles.com/CGI-BIN/fotos/'+logoemsa9aniv+'.jpg',
      seccion:'carton',
      myId:0,
      slug:'',
      title:'',
      file:'',
      show_popup:false
    }
  },
  methods:{
    max:function(n){
      thumb=this.items[n].nombre;
      this.myId=this.items[n].id;
      this.slug=this.items[n].slug;
      this.title=this.items[n].titulo;
      this.thumb='http://emsavalles.com/CGI-BIN/carton/'+thumb;
      this.file=this.thumb;

      this.show_popup=true;
    },
    anterior:function(){
      this.index--;
      this.loadAndPaginate();
    },
    siguiente:function(){
      this.index++;
      this.loadAndPaginate();
    },
    loadAndPaginate:function(){
      this.items=[];      
      this.$http.get('http://emsavalles.com/api/carton/paginate/'+this.index)
      .then(function(response){
        this.items=response.body.datos;
      })
    },
    onRefresh:function(e){
      this.refresh(e);
    },
    refresh:function(e){
     // log(this.$route.params);
    
      this.$http.get('http://emsavalles.com/api/carton/paginate/1')
      .then(function(response){
        this.items=response.body.datos;
        if(typeof e!='undefined'){
          e.detail.done();
        }
      });
      
    }    
  },
  created:function(){
    this.refresh();      
  }
  
})
Vue.component('buscar',{
  template:'#template-buscar',
  data:function() {
    return {
      palabras:'',
      seccion:'noticias',
      index:1,
      items:[],
      processing:0,
    }
  },
  methods:{
    anterior:function(){
      this.index--;
      this.loadAndPaginate();
    },
    siguiente:function(){
      this.index++;
      this.loadAndPaginate();
    },
    loadAndPaginate:function(){
      if(this.palabras!=''){
      this.processing=1;
      this.items=[];
      this.$http.get('http://emsavalles.com/api/'+this.seccion+'/search',{params:{q:this.palabras,start:this.index}})
      .then(function(response){
        this.processing=0;
        this.items=response.body.datos;
      }); 
    }
    },        
    busca:function(){
      this.index=1;
      this.loadAndPaginate();
    }
  }  
})
var Myloader = Vue.extend({
  template: '#template-custom-preloader',
  data: function () {
    return {
      cargando:false
    }
  },
  methods:{ 
    show:function(){
      this.cargando=true;
    },
    hide:function(){
      this.cargando=false;
    },
  },
});
Vue.component('sharer', {
  template: '#template-custom-sharer',
  data:function(){
    return{
      myurl:''
    }
  },
  props:['title','id','section','slug','file'],
  methods:{
    share:function(){
      var e='';
      switch(this.section){
        case 'noticias':e='NL';break;
        case 'deportes':e='DV';break;
        case 'masinfo':e='EX';break;
        case 'cine':e='CN';break;
        case 'carton':e='CR';break;
        case 'revista':e='RV';break;
        case 'paginas':e='PG';break;
      }
      //alert(e);
      //alert(this.id);
      this.myurl='http://emsavalles.com/'+e+this.id+'/'+this.slug

      var options={
        message:'En emsavalles.com',
        subject:'Emsavalles.com',
        files:[],
        url:this.myurl,
        chooserTitle:'Compartir con'
      }

      if(this.file!==undefined){options.files.push(this.file);}

      log(options);

      var onSuccess=function(result){
        //alert('completao? '+result.completed);
        //alert('la app? '+result.app);        
      }

      var onError=function(error){
        //alert('Fallo  '+error.msg);
      }

      window.plugins.socialsharing.shareWithOptions(options,onSuccess,onError); 
      //window.plugins.socialsharing.shareViaTwitter(this.myurl);
      /*
<button onclick="window.plugins.socialsharing.share('Message only')">message only</button>
<button onclick="window.plugins.socialsharing.share('Message and subject', 'The subject')">message and subject</button>
<button onclick="window.plugins.socialsharing.share(null, null, null, 'http://www.x-services.nl')">link only</button>
<button onclick="window.plugins.socialsharing.share('Message and link', null, null, 'http://www.x-services.nl')">message and link</button>
<button onclick="window.plugins.socialsharing.share(null, null, 'https://www.google.nl/images/srpr/logo4w.png', null)">image only</button>
// Beware: passing a base64 file as 'data:' is not supported on Android 2.x: https://code.google.com/p/android/issues/detail?id=7901#c43
// Hint: when sharing a base64 encoded file on Android you can set the filename by passing it as the subject (second param)
<button onclick="window.plugins.socialsharing.share(null, 'Android filename', 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null)">base64 image only</button>
// Hint: you can share multiple files by using an array as thirds param: ['file 1','file 2', ..], but beware of this Android Kitkat Facebook issue: [#164]
<button onclick="window.plugins.socialsharing.share('Message and image', null, 'https://www.google.nl/images/srpr/logo4w.png', null)">message and image</button>
<button onclick="window.plugins.socialsharing.share('Message, image and link', null, 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, image and link</button>
<button onclick="window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, subject, image and link</button>      
      

<!-- unlike most apps Twitter doesn't like it when you use an array to pass multiple files as the second param -->
<button onclick="window.plugins.socialsharing.shareViaTwitter('Message via Twitter')">message via Twitter</button>
<button onclick="window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null / img /, 'http://www.x-services.nl')">msg and link via Twitter</button>


<button onclick="window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null / img /, null / url /, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Facebook (with errcallback)</button>

*/


    }
  }
})

//
Vue.component('mapas',{
  template:'#template-mapas',
  data:function() {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [],
      map:null,
      showLocateButton:false,
      markers:[],
      data:{text:'oxxo',kms:21,cuantos:15}
    }
  },
  methods:{
    buscar:function(){
      
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }      
      this.markers = [];
      this.checkGPS();
    },
    centerme:function(){
      this.$http.post('http://emsavalles.com/api/mapas',{params:this.data})
        .then(function(response){
          this.markerCoordinates=response.body.datos;

          if(this.markerCoordinates.length>0){
          this.markerCoordinates.forEach(function(coord) {
            var position = new google.maps.LatLng(coord.lat, coord.lon);
            
            var marker = new google.maps.Marker({ 
              position:{lat:coord.lat,lng:coord.lon},
              map:this.map,
              title: coord.title,
              icon:'assets/markers/'+coord.image+'.gif'
            });
   
            google.maps.event.addListener(marker, 'click', function () {
              this.map.panTo(position);
            });

            this.markers.push(marker);  
  
          }.bind(this));   
        }        

        });      
    },
    ubica:function(position){
      if(typeof position!==undefined){
        this.data.lat=position.coords.latitude;
        this.data.lon=position.coords.longitude;

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };               
        
        this.map.panTo(pos);
        this.map.setZoom(16);

        var marker = new google.maps.Marker({ 
          position:{lat:pos.lat,lng:pos.lng},
          map:this.map,
          icon:'assets/markers/user.gif'
        });

        this.markers.push(marker);

      }
      this.centerme();
    },
    checkGPS:function(){
      if (navigator.geolocation) {        
        var onSuccess = function(position) {
          this.ubica(position);
      }.bind(this);
  
      function onError(error) {
          this.ubica();
      };
  
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 8000 }); 
      
      }

    }
  },
  mounted: function () {
    this.map= new google.maps.Map(document.getElementById('example'), {
      zoom: 14,
    });
    this.checkGPS();
  } 
})

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

Vue.component('google-map',{
  template:'#template-mapa',
  props: ['name'],
  data:function() {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [],
      map:null,
      showLocateButton:false,
      markers:[],
      data:{kms:100,cuantos:15}
    }
  },
  methods:{
    refresh:function(e){
      /*

      this.$http.get('http://emsavalles.com/api/maps')
      .then(function(response){

        this.markerCoordinates=response.body.datos;
        //var myLatLng = {lat: -25.363, lng: 131.044};

        this.markerCoordinates.push({lat:21.987042,lon:-99.0178873,image:'emsavalles'});
        
        this.map= new google.maps.Map(document.getElementById(this.mapName), {
          zoom: 14,
          center: {lat:this.markerCoordinates[0].lat, lng: this.markerCoordinates[0].lon},
        });

        this.markerCoordinates.forEach(function(coord) {
          var position = new google.maps.LatLng(coord.lat, coord.lon);
          
          var marker = new google.maps.Marker({ 
            position:{lat:coord.lat,lng:coord.lon},
            map:this.map,
            title: coord.title,
            icon:'assets/markers/'+coord.image+'.gif'
          });

          //this.markers.push(marker);

          google.maps.event.addListener(marker, 'click', function () {
            this.map.panTo(position);
          });


        }.bind(this));   

        google.maps.event.addListenerOnce(this.map, 'tilesloaded', function(){
          // do something only the first time the map is loaded
          //alert('fully loaded');
          this.showLocateButton=true;
      }.bind(this));

      });*/
    },
    centerme:function(){
      this.$http.post('http://emsavalles.com/api/mapas',{params:this.data})
        .then(function(response){
          this.markerCoordinates=response.body.datos;

          this.markerCoordinates.forEach(function(coord) {
            var position = new google.maps.LatLng(coord.lat, coord.lon);
            
            var marker = new google.maps.Marker({ 
              position:{lat:coord.lat,lng:coord.lon},
              map:this.map,
              title: coord.title,
              icon:'assets/markers/'+coord.image+'.gif'
            });
  
            //this.markers.push(marker);
  
            google.maps.event.addListener(marker, 'click', function () {
              this.map.panTo(position);
            });
  
  
          }.bind(this));           

        });      
    },
    ubica:function(position){
      if(typeof position!==undefined){
        this.data.lat=position.coords.latitude;
        this.data.lon=position.coords.longitude;

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };               
        
        this.map.panTo(pos);
        this.map.setZoom(16);

        var marker = new google.maps.Marker({ 
          position:{lat:pos.lat,lng:pos.lng},
          map:this.map,
          icon:'assets/markers/user.gif'
        });

      }
      this.centerme();
    },
    checkGPS:function(){
      if (navigator.geolocation) {        
        var onSuccess = function(position) {
          this.ubica(position);
      }.bind(this);
  
      function onError(error) {
          this.ubica();
      };
  
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 8000 }); 
      
      }

    }
  },
  mounted: function () {
    this.map= new google.maps.Map(document.getElementById(this.mapName), {
      zoom: 14,
    });
    this.checkGPS();
  } 
})



Vue.component('popup', {
  template:'#template-custom-popup',
  data:function(){
    return{
      show:false
    }
  },
  methods:{
    close:function(){
      this.show=false;
    }
  },
  props:['show']
});
// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components

time=new Date();

console.log(time.getHours()+':'+time.getMinutes());

function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  //alert('Connection type: ' + states[networkState]);
  return states[networkState];

}

//checkConnection();

//@prepros-prepend "../components/init/init-app.js"
//@prepros-prepend "../components/principal/principal.js"
//@prepros-prepend "../components/leernota/leernota.js"
//@prepros-prepend "../components/revistas/revistas.js"
//@prepros-prepend "../components/revista/revista.js"
//prepros-prepend "../components/swipea/swipea.js"
//@prepros-prepend "../components/cine/cine.js"
//@prepros-prepend "../components/pelicula/pelicula.js"
//@prepros-prepend "../components/masinfo/masinfo.js"
//@prepros-prepend "../components/carton/carton.js"
//@prepros-prepend "../components/buscar/buscar.js"
//@prepros-prepend "../components/custom-preloader/custom-preloader.js"
//@prepros-prepend "../components/sharer/sharer.js"
//@prepros-prepend "../components/mapas/mapas.js"
//@prepros-prepend "../components/mapa/mapa.js"
//@prepros-prepend "../components/popup/popup.js"

var logoemsa9aniv="logo-emsavalles--9aniv";

function initMap(){}

var loader=null;

var options={
  el: '#app',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: [
      {path: '/inicio/', component: 'init-app'},
      {path: '/leer/:seccion/:id/', component: 'page-leer'},
      {path: '/revistas/', component: 'revistas'},
      {path: '/revista/:id', component: 'revista'},
      {path: '/cine/', component: 'cine'},
      {path: '/pelicula/:id', component: 'pelicula'},
      {path: '/masinfo/:seccion',component:'masinfo'},
      {path: '/carton/', component: 'carton'},
      {path: '/buscar/', component: 'buscar'},
      {path: '/mapas/', component: 'mapas'},
    ],    
  },
  mounted:function(){
    loader=new Myloader({data:{cargando:true}}).$mount('#loader');
  }
};

/*
if(checkConnection()=='No network connection'){
  alert('Conexión a internet es requerida.');
}else{
  if(checkConnection()!='Ethernet connection' && checkConnection()!='WiFi connection'){
    if(confirm('Esta aplicación requiere conexión a internet, consumirá datos. ¿Desea continuar?')){
      app=new Vue(options);
    }
  }else{
    app=new Vue(options);
  }
}
*/

// Init App
app=new Vue(options);

Vue.http.interceptors.push(function(request, next){
  if(checkConnection=='No network connection'){

  }else{
    request.headers.set('X-Requested-With', 'XMLHttpRequest');
    loader.show();
    next(function(){
      loader.hide();
    });
  }
});
