"use strick";

function createObjects(sh){
    
   var cat1 = new Category(data.categories[0].title);
   cat1.description = data.categories[0].description;

   var cat2 = new Category(data.categories[1].title);
   cat2.description = data.categories[1].description;

   var cat3 = new Category(data.categories[2].title);
   cat3.description = data.categories[2].description;

    
   var pro1 = new Product(data.products[0].serialNumber, data.products[0].name, data.products[0].price);
   pro1.description = data.products[0].description;
   pro1.tax = data.products[0].tax;
   pro1.images.push(data.products[0].images[0]);
   
   var pro2 = new Product(data.products[1].serialNumber, data.products[1].name, data.products[1].price);
   pro2.description = data.products[1].description;
   pro2.tax = data.products[1].tax;
   pro2.images.push(data.products[1].images[0]);
    
   var pro3 = new Product(data.products[2].serialNumber, data.products[2].name, data.products[2].price);
   pro3.description = data.products[2].description;
   pro3.tax = data.products[2].tax;
   pro3.images.push(data.products[2].images[0]); 
    
   var pro4 = new Product(data.products[3].serialNumber, data.products[3].name, data.products[3].price);
   pro4.description = data.products[3].description;
   pro4.tax = data.products[3].tax;
   pro4.images.push(data.products[3].images[0]); 
    
   var pro5 = new Product(data.products[4].serialNumber, data.products[4].name, data.products[4].price);
   pro5.description = data.products[4].description;
   pro5.tax = data.products[4].tax;
   pro5.images.push(data.products[4].images[0]);
    
   var book = new Book(data.products[5].serialNumber, data.products[5].name, data.products[5].price, data.products[5].pages);
   book.description = data.products[5].description;
   book.tax = data.products[5].tax;
   book.images.push(data.products[5].images[0]);
    
   var tv = new TV(data.products[6].serialNumber, data.products[6].name, data.products[6].price, data.products[6].inches);
   tv.description = data.products[6].description;
   tv.tax = data.products[6].tax;
   tv.images.push(data.products[6].images[0]);    
    
   var coor1 = new Coords(data.coords[0].longitude, data.coords[0].latitude);
   var coor2 = new Coords(data.coords[1].longitude, data.coords[1].latitude);
   var coor3 = new Coords(data.coords[2].longitude, data.coords[2].latitude);
    
   var shop1 = new Shop(data.shops[0].cif, data.shops[0].name, coor1);
   shop1.direction = data.shops[0].direction;
   shop1.phone = data.shops[0].phone;
    
   var shop2 = new Shop(data.shops[1].cif, data.shops[1].name, coor2);
   shop2.direction = data.shops[1].direction;
   shop2.phone = data.shops[1].phone;  

   var shop3 = new Shop(data.shops[2].cif, data.shops[2].name, coor3);
   shop3.direction = data.shops[2].direction;
   shop3.phone = data.shops[2].phone;
    
   var shops = sh.shops;
   var shop = shops.next(); 
   shop.value.direction = "C/ La Mancha";
   shop.value.phone = "421212";
    
   sh.addProduct(pro1, cat1);
   sh.addProduct(pro3, cat1);
   sh.addProduct(pro4, cat1);
   sh.addProduct(pro2, cat2);
   sh.addProduct(pro5, cat2);
   sh.addProduct(book, cat3);
   sh.addProduct(tv, cat2);

   sh.addProductInShop(pro1, shop1, 32);
   sh.addProductInShop(pro1, shop2, 44);
   sh.addProductInShop(pro2, shop1, 55);
   sh.addProductInShop(pro2, shop2, 66);
   sh.addProductInShop(pro3, shop3, 32);
   sh.addProductInShop(pro3, shop1, 23);
   sh.addProductInShop(pro4, shop1, 34);
   sh.addProductInShop(pro4, shop2, 11);
   sh.addProductInShop(pro4, shop3, 13);
   sh.addProductInShop(pro5, shop2, 61);  
   sh.addProductInShop(book, shop1, 31);  
   sh.addProductInShop(tv, shop1, 11);  
   sh.addProductInShop(tv, shop2, 4);

}

function init(sh){
    setTimeout(function() {
        var initPop = initPopulate(sh);
        initPop();
        shopsMenusPopulate(sh);
        menuForms();
        initMap();
    }, 1000); 
}

function initPopulate(sh){
    return function(){
        var shops = sh.shops;
        var shop = shops.next();

        $("#catMenu").hide();
        
        shopsMenusPopulate(sh);
        
        $("#sct1").empty();
        menuForms();
        
        initMap();
        
        while (!shop.done){

            var divCol = $("<div>").attr("class", "col-sm-4 col-lg-4 col-md-4");
            var divThumb = $("<div>").attr("class", "thumbnail");
            var divCap = $("<div>").attr("class", "caption");

            var img = $("<img>").attr("src", "http://placehold.it/320x150");
            divThumb.append(img);

            var a = $("<a>").text(shop.value.name);
            a.attr("href", "#");
            
            var h4 = $("<h4>").append(a);
            divCap.append(h4);
            
            var p = $("<p>").text(shop.value.direction);
            divCap.append(p);
            
            p = $("<p>").text("Teléfono: "+shop.value.phone);
            divCap.append(p);

            var button = $("<button>").text("Ver Productos");
            button.attr({
                "type" : "button",
                "class" : "btn btn-primary pull-right"   
            });
            button.click(shopPopulate(shop.value, sh));
            divCap.append(button);

            divThumb.append(divCap);
            divCol.append(divThumb);
            $("#sct1").append(divCol);
    
            shop = shops.next();
        }
    }    
}

function shopsMenusPopulate (erp){

    var shops = erp.shops;
    var shop = shops.next();
    
    $(".navbar-header").click(initPopulate(erp));
    
    $("#navShop").empty();
    while (shop.done !== true){
        
        var a = $("<a>").text(shop.value.name);
        a.attr("href", "#")
        a.click(shopPopulate(shop.value, erp));
        
        $("#navShop").append($("<li>").append(a));

        shop = shops.next();
    }
}

function shopPopulate(shop, erp){
    return function(){
        var divSct1 = $("#sct1");
        divSct1.empty();    
        
        for(var i=0; i<shop.products.length; i++){
           productShopPopulate(divSct1, shop.products[i]); 
        }
        
        if(document.cookie){
             var divcol = $("<div>").attr({
                "class" : "col-sm-4 col-lg-4 col-md-4",
                "id" : "paperbin"
            });

            divcol.css({
                position: "fixed",
                bottom: 0,
                right: 0
            })

            divcol.on( "dragover", function(event) {
               event.preventDefault();
            });
             divcol.on( "drop", function(event) {
               event.preventDefault();
              var data = event.originalEvent.dataTransfer.getData("text");
              var pro = new Product(parseInt(data), "a", 1);
              sh.removeProduct(pro);
              document.getElementById(data).remove();
            });

            var img = $("<img>").attr({
                "src": "imagenes/papelera.png",
                "class": "pull-right"
            });
            img.css({
                width: "20%",
                maxwidth: "100%"
            })

            divcol.append(img);
            divSct1.append(divcol);

            menuCategoryShopPopulate(shop, erp);
            }
   }
}

function menuCategoryShopPopulate(shop, erp){
    
    function compareCategories(element){
			return (element.title === category.title)
	}
    
    var categoriesShop = [];
    var category;
    var categoryRep;
    
    $("#listCategories").empty();
    
    $("#catMenu").show();
       
    for (var i=0; i<shop.products.length; i++){
        category = productCategory(shop.products[i], erp);
        categoryRep = categoriesShop.findIndex(compareCategories);
        
        if (category != -1 && categoryRep == -1){
            categoriesShop.push(category);
        }
    }
    
    for (i=0; i<categoriesShop.length; i++){
        var a = $("<a>").text(categoriesShop[i].title);
        a.attr({
                "href" : "#",
                "class" : "list-group-item"   
       });
        a.click(productsCategoryShopPopulate(erp, shop, categoriesShop[i]));
        $("#listCategories").append(a);
    }
      
}

function menuForms(){
    
    function liForm(name, func){
        var a = $("<a>").text(name);
        a.attr({
            href: "#",
            class: "list-group-item"
        });
        a.click(func());
        cat.append(a);
    }
    
    var cat = $("#listCategories");
    
    cat.empty();
    
    if (!document.cookie){
        var p = $("<p>").text("Autenticación");
        p.attr("class", "h3");
        cat.append(p);
        liForm("Iniciar Sesión", sesionForm);
    }else{
        var reg = /[^=][a-z]*$/;
        var p =  $("<p>").text("User: "+reg.exec(document.cookie));
        p.attr("class", "h3");
        cat.append(p);
        liForm("Cerrar Sesión", closeSesion);
    }
   
    
    p = $("<p>").text("Categorias");
    p.attr("class", "h3");
    cat.append(p);
    
    liForm("Añadir categoria", addCategoryForm);
    liForm("Modificar categoria", updCategoryForm);
    liForm("Eliminar categoria", delCategoryForm);
    
    p = $("<p>").text("Tiendas");
    p.attr("class", "h3");
    cat.append(p);
    
    liForm("Añadir tienda", addShopForm);
    liForm("Modificar tienda", updShopForm);
    liForm("Eliminar tienda", delShopForm);
    
    if (document.cookie){
       p = $("<p>").text("Productos");
       p.attr("class", "h3");
       cat.append(p);    
        
       liForm("Añadir producto", addProForm);
       liForm("Eliminar producto", delProForm);
        
       p = $("<p>").text("Otros");
       p.attr("class", "h3");
       cat.append(p); 
        
       liForm("Guardar archivo Json", saveObjects); 
    }  
}

function productCategory(product){
    
        function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
    
        var categories = sh.categories;
        var category = categories.next();
        var index = -1;
        
        while (category.done !== true && index == -1 ){
            
           index = category.value.products.findIndex(compareElements);          
           if (index != -1){
                return category.value;
           }
            category = categories.next();
        }
    
        return -1;
}

function productsCategoryShopPopulate(erp, shop, category){
    return function(){
        function compareElements(element){
                return (element.serialNumber === shop.products[i].serialNumber)
        }

        var productsCategory = [];
        var index;

        for (var i=0; i<shop.products.length; i++){
            index = category.products.findIndex(compareElements);

            if (index != -1){
                productsCategory.push(shop.products[i]);
            }
        }

         $("#sct1").empty();

        for(i=0; i<productsCategory.length; i++){
            productShopPopulate( $("#sct1"), productsCategory[i]);
        } 
    }
}

function productShopPopulate(element, product){
    
        var divCol = $("<div>").attr("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = $("<div>").attr({"class": "thumbnail", id: product.product.serialNumber});
        divThumb.attr('draggable','true');
    
        divThumb.on( "dragstart", function(event) {
          event.originalEvent.dataTransfer.setData("text", event.target.id);         
        });
        divThumb.on( "dragover", function(event) {
           event.preventDefault();       
        });
    
        var img = $("<img>").attr("src", product.product.images[0]);
        divThumb.append(img);

        var divCap = $("<div>").attr("class", "caption");
        
        var h4 = $("<h4>").append(product.product.name);
        divCap.append(h4);

        h4 = $("<h4>").append(product.product.price+" €");
        h4.attr("class", "pull-right");
        divCap.append(h4);
        
        var p = $("<p>").text(product.product.description);
        divCap.append(p);
        
        p = $("<p>").text("Tax: "+product.product.tax);
        divCap.append(p);

        var a = $("<a>").text("Ver info general");
        a.attr("class", "pull-right");
        a.click(openWindows(product.product));
        divCap.append(a);
        
        p = $("<p>").text("Stock: "+product.stock);
        divCap.append(p);
    
        divThumb.append(divCap);
        divCol.append(divThumb);
        element.append(divCol); 
}

   
function openWindows(product){
    
    function compareElements(element) {
        return (element.serialNumber === product.serialNumber)
    }
				
    var productShop = sh.products[sh.products.findIndex(compareElements)];
    var ventana;
    var inter;
 
    function closeWindows(){
        return function (){

           for (var i=0; i < listWindows.length; i++){
             listWindows[i].close();
           }
            
           $("#closeWindows").empty();
        }
    }
    
    function globalProductPopulate (){
        var long = listWindows.length-1;
        
        var divSct1 = listWindows[long].$("#sct");
        
        var divCol = listWindows[long].$("<div>").attr("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = listWindows[long].$("<div>").attr("class", "thumbnail");

        var divCap = listWindows[long].$("<div>").attr("class", "caption");

        var h4 = listWindows[long].$("<h4>").text(productShop.name);
        divCap.append(h4);

        h4 = listWindows[long].$("<h4>").attr("class", "pull-right");
        h4.text(productShop.price+" €");
        divCap.append(h4);

        var p = listWindows[long].$("<p>").text(productShop.description);
        divCap.append(p);

        p = listWindows[long].$("<p>").text("Tax: "+productShop.tax);
        divCap.append(p);

        p = listWindows[long].$("<p>").text("Stock General: "+productShop.stockGen);
        divCap.append(p);
        
        divThumb.append(divCap);
        divCol.append(divThumb);
        divSct1.append(divCol);
        
        var cat = $("#closeWindows");
        cat.empty();
        
        var a = $("<a>").text("Cerrar Ventana");
        a.attr({
                "href" : "#",
                "class" : "list-group-item"   
            });
        a.click(closeWindows());
        
        cat.append(a);
        clearInterval(inter);
    }
    
    return function (){
       listWindows.push(window.open("newWindows.html","_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"));
        
       inter = setInterval(globalProductPopulate, 500);
    }
}

function initMap(){


    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.984573, lng: -3.927454},
          zoom: 14
    });
    
    var infoWindow = new google.maps.InfoWindow({map: map});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
     } else {
          handleLocationError(false, infoWindow, map.getCenter());
     }
    
    var shops = sh.shops;
    var shop = shops.next();

    while (shop.done !== true){

        var marker = new google.maps.Marker({
            position: {lat: shop.value.coords.latitude, lng: shop.value.coords.longitude},
            map: map,
            title: shop.value.toString()
        });
        shop = shops.next();
    }
}

 var listWindows = [];
 var sh = new StoreHouse();
 sh.name = "Test";

 window.onload = init(sh);