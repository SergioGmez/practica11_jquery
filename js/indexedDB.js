function startDB(obj){
            
     var request = indexedDB.open("store", 1);

     request.onupgradeneeded = function (e) {
         db = event.target.result;

         var objectStore = db.createObjectStore("products");
         objectStore = db.createObjectStore("categories");  
         objectStore = db.createObjectStore("shops");

     };

       request.onsuccess = function (e){
            db = this.result;
            createObjects(sh);
       };

       request.onerror = function (e){
            alert('Error cargando la base de datos');
       };
};
    
    
function addDB(obj, store, key){
      var transaction = db.transaction([store], "readwrite");
      var objectStore = transaction.objectStore(store);         
      var request = objectStore.put(obj.getObject(), key);

    
      request.onsuccess = function(event) {
          //console.log("Objeto añadido: "+key);
      };
    
      request.onerror = function(event) {
          //console.log("Error al añadir objeto");
      };  
}
    
function updDB(obj, store, key){
      var transaction = db.transaction([store], "readwrite");
      var objectStore = transaction.objectStore(store); 
      var request = objectStore.put(obj.getObject(), key);
  
    
      request.onsuccess = function(event) {
          //console.log("Objeto actualizado: "+key);
      };
    
      request.onerror = function(event) {
          //console.log("Error al actualizar objeto");
      };
      
}

function delDB(obj, store, key){
      var transaction = db.transaction([store], "readwrite");
      var objectStore = transaction.objectStore(store); 
      var request = objectStore.delete(key);
          
          
      request.onsuccess = function(event) {
          //console.log("Objeto eliminado: "+key);
      };
    
      request.onerror = function(event) {
          //console.log("Error al eliminado objeto");
      };
}

function deleteDB(){
    var DBDeleteRequest = window.indexedDB.deleteDatabase("store");

    DBDeleteRequest.onerror = function(event) {
      console.log("Error deleting database.");
    };

    DBDeleteRequest.onsuccess = function(event) {
      console.log("Database deleted successfully");
    };
}

startDB();
//deleteDB();
 