function saveObjects (){

   return function (){
       
           var objects = {
               products: [],
               categories: [],
               shops: []
           };
       
           var categories = sh.categories;
           var category = categories.next();
            
           for (var i=0; i<sh.products.length; i++){

                objects.products.push({
                    serialNumber: sh.products[i].serialNumber,
                    name: sh.products[i].name,
                    description: sh.products[i].description,
                    price: sh.products[i].price,
                    tax: sh.products[i].tax,
                    images: [
                        sh.products[i].images[0]
                    ],
                    stockGen: sh.products[i].stockGen
                });
           }     

           while (category.done !== true){
                
                objects.categories.push({
                    title: category.value.title,
                    description: category.value.description,
                });
                category = categories.next();
           }
       
           var shops = sh.shops;
           var shop = shops.next();

           while (shop.done !== true){
                
                objects.shops.push({
                    cif: shop.value.cif,
                    name: shop.value.name,
                    direction: shop.value.direction,
                    phone: shop.value.phone,
                    coords: {
                        latitude: shop.value.coords.latitude,
                        longitude: shop.value.coords.longitude
                    }
                });
                shop = shops.next();
           }

           var user = /[^=][a-z]*$/.exec(document.cookie);
           var json = JSON.stringify(objects);
       
            $("#sct1").empty();
            var h3 = $("<h3>").append("Archivo json guardado en la carpeta principal de la web con el nombre de "+user);
            h3.css("color", "green");
            $("#sct1").append(h3);
            
           $.post( "demo_json.php", { json: json, user: user[0] } );  
      }
}