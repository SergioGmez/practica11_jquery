
function createInput(labelIn, inputName, form){
        var dv = $("<div>").attr("class", "form-group");
        
        var label = $("<label>").attr("class", "control-label col-sm-2");
        label.text(labelIn);
        dv.append(label);
                
        var dv1 = $("<div>").attr("class", "col-sm-4");
          
        var input = $("<input>").attr({
            "class": "form-control",
            "type": "text",
            "name": inputName
        });
                
        dv1.append(input);
        dv.append(dv1);
        form.append(dv);
}
        
 function textArea(form){
        
        var dv = $("<div>").attr("class", "form-group");
     
        var label = $("<label>").attr("class", "control-label col-sm-2");
        label.text("Descripción");
        dv.append(label);
                
        var dv1 = $("<div>").attr("class", "col-sm-4");
     
        var input = $("<textarea>").attr({
            "class": "form-control",
            "rows": "5",
            "name": "description"
        });

                
        dv1.append(input);
        dv.append(dv1);
        form.append(dv);
}

function createButton(func, form){
        var dv = $("<div>").attr("class", "form-group");

        var dv1 = $("<div>").attr("class", "col-sm-offset-5");
    
        var a = $("<a>").text("Enviar");
        a.attr("class", "btn btn-default");
        a.click(func());

        dv1.append(a);
        dv.append(dv1);
        form.append(dv);
}

function createSelect(form, type, name, lab){
    var div = $("<div>").attr("class", "form-group");
    
    var dv1 = $("<div>").attr("class", "col-sm-4");
    
    var label = $("<label>").attr("class", "control-label col-sm-2");
    label.text(lab);
    div.append(label);
    
    var select = $("<select>").attr({
            "class": "form-control",
            "name": name
    });
    
    if (type == "Categories"){
        var categories = sh.categories;
        var category = categories.next();
        
        category = categories.next();
        
        while (category.done !== true){
             var option = $("<option>").text(category.value.title);
             option.attr("value", category.value.title);
             select.append(option);
            
             category = categories.next();
        }
    }
    
    if (type == "Shops"){
        
        var shops = sh.shops;
        var shop = shops.next();
        
        shop = shops.next();
        
        while (shop.done !== true){
             option = $("<option>").text(shop.value.name);
             option.attr("value", shop.value.cif);
             select.append(option);
            
             shop = shops.next();
        }
    }
    
    if (type == "Products"){
        
        for(var i=0; i<sh.products.length; i++){
             option = $("<option>").text("("+sh.products[i].serialNumber+") "+ sh.products[i].name);
             option.attr("value", sh.products[i].serialNumber);
             select.append(option);
        }
    }
    
    dv1.append(select)
    div.append(dv1);
    form.append(div);
}

function resultForm(result){
    
    if (!result){
        $("#result").css("color", "red");
        $("#result").text("Ha ocurrido un error.");
    }
}
        
function addCategoryForm(){
        function addCategory(){
              return function (){
                  var name = $('input[name="title"]').val();
                  var description = $('textarea[name="description"]').val();
                  
                  try{
                      if (name == "" || description == ""){
                         throw new EmptyValueException();
                       } else {
                             var cat = new Category(name);
                             sh.addCategory(cat);
                             cat.description = description;
                           
                             init = initPopulate(sh);
                             init();
                        } 
                   }catch(e){
                       console.log(e);
                       resultForm(false);
                   } 
              }
        }
        
       return function (){
            var divForm = $("#sct1");
            divForm.empty();
            
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
           
            var label = $("<label>").attr("class", "h2");
            label.text("Añadir categoria");
            form.append(label);
               
            createInput("Title", "title", form);
            textArea(form);
            createButton(addCategory, form);
            
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
                
            divForm.append(form);
      }
}
    
function updCategoryForm(){
        
        function updCategory(){
              return function (){
                     var titleId = $('select[name="selectPrin"]').val()
                     var title = $('input[name="title"]').val();
                     var description = $('textarea[name="description"]').val();
                  
                     try{
                         if (title == "" || titleId == ""){
                          resultForm(false);
                          throw new EmptyValueException();
                         } else {
                              var cs = sh.categories;
                              var category = cs.next();
                              var aux = -1;

                              while (category.done !== true){
                                if (category.value.title === titleId ){
                                    aux = category.value;
                                }
                                category = cs.next();
                              } 

                             if (aux !== -1){
                                    aux.title = title;
                                    aux.description = description;
                                 
                                    init = initPopulate(sh);
                                    init();
                             } else {
                                    throw new CategoryNoExistsException();
                             }
                         }
                     } catch (e){
                         console.log(e);
                         resultForm(false);
                     }
              }  
        }
        
        return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
            
            var label = $("<label>").attr("class", "h2");
            label.text("Actualizar categoria");
            form.append(label);
            
            createSelect(form, "Categories", "selectPrin", "Categories List");
            
            label = $("<label>").attr("class", "h2");
            label.text("Datos a actualizar: ");
            form.append(label);
            
            createInput("Titulo", "title", form);
            textArea(form);
            createButton(updCategory, form);
            
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
                
            divForm.append(form);
        }
}
            
function delCategoryForm(){
    
        function delCategory(){
            return function (){
                
                var titleId = $('select[name="selectPrin"]').val();
                
                try{
                    if (titleId == ""){
                        throw new EmptyValueException();
                    } else {
                        var cs = sh.categories;
                        var category = cs.next();
                        var aux = -1;

                        while (category.done !== true){
                            if (category.value.title === titleId ){
                                aux = category.value;
                            }
                            category = cs.next();
                        } 

                        if (aux !== -1){
                            sh.removeCategory(aux);
                            
                            init = initPopulate(sh);
                            init();
                        } else {  
                             throw new CategoryNoExistsException();
                        }
                    }
                } catch (e) {
                    console.log(e);
                    resultForm(false);
                }
            }   
        }

        return function (){
            var divForm = $("#sct1");
            divForm.empty();

            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
            
            var label = $("<label>").attr("class", "h2");
            label.text("Eliminar categoria");
            form.append(label);
            
            createSelect(form, "Categories", "selectPrin", "Categories List"); 
            createButton(delCategory, form);
            
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);

            divForm.append(form);
        }
}
        
    

function addShopForm(){
        function addShop(){
              return function (){
                    var cif = $('input[name="CIF"]').val();
                    var name = $('input[name="Name"]').val();
                    var direction = $('input[name="Direction"]').val();
                    var phone = $('input[name="Phone"]').val();
                    
                  try{
                        if (cif == "" || name == ""){
                             throw new EmptyValueException();
                        } else {
                             var coord = new Coords(lat, lng);
                             var shop = new Shop(cif, name, coord);
                             sh.addShop(shop);
                             shop.direction = direction;
                             shop.phone = phone;
                            
                             init = initPopulate(sh);
                             init(); 
                        }
                  } catch(e) {
                      resultForm(false);
                      console.log(e);
                  }
                    
              }
        }
        
       return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
           
            var label = $("<label>").attr("class", "h2");
            label.text("Añadir tienda");
            form.append(label);
           
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form);
           
            var dv = $("<div>").attr("class", "form-group");
            var label = $("<label>").attr("class", "control-label col-sm-2");
            label.text("Selecciona ubicación: ");
            dv.append(label);
           
            var map = $("<div>");
            map.attr("id", "mapShop")
            map.css("height", "300px");
            dv.append(map);
            form.append(dv);
            
            createButton(addShop, form);
           
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
           
            divForm.append(form);
           
           mapForm();
      }
}


function updShopForm(){
      function updShop(){
          return function (){
                 
                 var cifId = $('select[name="selectPrin"]').val();;
                 var cif = $('input[name="CIF"]').val();
                 var name = $('input[name="Name"]').val();
                 var direction = $('input[name="Direction"]').val();
                 var phone = $('input[name="Phone"]').val();
              
                 try{
                     if (cif == "" || cifId == ""){
                          throw new EmptyValueException();
                     } else {
                          var sp = sh.shops;
                          var shop = sp.next();
                          var aux = -1;

                          while (shop.done !== true){
                             if (shop.value.cif == cifId ){
                                 aux = shop.value;
                              }
                              shop = sp.next();
                          }

                          if (aux !== -1){
                                aux.cif = cif;
                                aux.name = name;
                                aux.direction = direction;
                                aux.phone = phone;
                                aux.coords.latitude = lat;
                                aux.coords.longitude = lng;
                              
                                init = initPopulate(sh);
                                init(); 
                          } else {
                                throw new ShopNotExistsException();
                          }
                 }
                 } catch (e) {
                     resultForm(false);
                     console.log(e);
                 }
          }  
    }    
        
      return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
          
            var label = $("<label>").attr("class", "h2");
            label.text("Modificar tienda");
            form.append(label);
            
            createSelect(form, "Shops", "selectPrin", "Shops List");
          
            var label = $("<label>").attr("class", "h2");
            label.text("Datos a actualizar: ");
            form.append(label);
          
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form);
          
            var dv = $("<div>").attr("class", "form-group");
            var label = $("<label>").attr("class", "control-label col-sm-2");
            label.text("Selecciona ubicación: ");
            dv.append(label);
          
            var map = $("<div>");
            map.attr("id", "mapShop")
            map.css("height", "300px");
            dv.append(map);
            form.append(dv);
          
            createButton(updShop, form);
          
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
           
            divForm.append(form);
           
           mapForm()
        }  
}


function delShopForm(){
    
        function delShop(){
            return function (){
                var cifId = $('select[name="selectPrin"]').val();;
                
                try{
                   if (cifId == ""){
                        throw new EmptyValueException();
                    } else {
                        var sp = sh.shops;
                        var shop = sp.next();
                        var aux = -1;

                        while (shop.done !== true){
                            if (shop.value.cif == cifId ){
                                aux = shop.value;
                            }
                             shop = sp.next();
                        }

                        if (aux !== -1){
                            console.log(aux);
                            sh.removeShop(aux);
                            
                            init = initPopulate(sh);
                            init();
                        } else {
                             throw new ShopNotExistsException();
                        }
                    } 
                } catch (e){
                    console.log(e);
                    resultForm(false); 
                }
            }   
        }
    
        return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
            
            var label = $("<label>").attr("class", "h2");
            label.text("Eliminar tienda");
            form.append(label);
            
            createSelect(form, "Shops", "selectPrin", "Shops List");
            
            createButton(delShop, form);
            
             var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
           
            divForm.append(form);
        }
}

function addProForm(){
    
    function addPro(){
      return function (){
            var serial = parseInt($('input[name="SerialNumber"]').val());
            var name = $('input[name="Name"]').val();
            var description = $('input[name="Description"]').val();
            var price = parseInt($('input[name="Price"]').val());
            var tax = $('input[name="Tax"]').val();
            var stock = parseInt($('input[name="Stock"]').val());
            var titCat = $('select[name="selectCat"]').val();
            var cifShop = parseInt($('select[name="selectShop"]').val());
            var cat;
            var sho;
          
          console.log(titCat);

            try{
               if (serial == "" || name == ""){
                         
                     throw new EmptyValueException();
                } else {
                    var pro = new Product(serial, name, price);
                    pro.description = description;
                    pro.tax = tax;
                    
                    var categories = sh.categories;
                    var category = categories.next();
                    
                    while (category.done !== true){
                        if (category.value.title === titCat){
                            cat = category.value;
                        }

                        category = categories.next();
                   }
                    
                    aux = cat.products.findIndex(function compareElements(element){ return (element.serialNumber === pro.serialNumber) });	
                    
                    if (aux == -1){
                        sh.addProduct(pro, cat);
                        
                    }

                    var shops = sh.shops;
                    var shop = shops.next();

                    while (shop.done !== true){
                         if (shop.value.cif === cifShop){
                             sho = shop.value;
                         }
                         shop = shops.next();
                    }
                    
                    
                    sh.addProductInShop(pro, sho, stock);
                                        
                    init = initPopulate(sh);
                    init();
                } 
            } catch (e) {
                resultForm(false);
                console.log(e);
            } 
      }
    }
    
       return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
           
            var label = $("<label>").attr("class", "h2");
            label.text("Añadir producto");
            form.append(label);
                
            createInput("SerialNumber", "SerialNumber", form);
            createInput("Name", "Name", form); 
            createInput("Description", "Description", form); 
            createInput("Price", "Price", form);
            createInput("Tax", "Tax", form);
            createInput("Stock", "Stock", form);
           
            createSelect(form, "Categories", "selectCat", "Añadir producto a categoria");
            createSelect(form, "Shops", "selectShop", "Añadir producto a tienda");
           
            createButton(addPro, form);
           
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
           
            divForm.append(form);
      }
}



function delProForm(){
       function delPro(){
        return function (){
            function compareElements(element){
                 return (element.serialNumber == serial)
            }

            var serial = $('select[name="selectPrin"]').val();

            try{
                if (serial == ""){
                    throw new EmptyValueException();
                } else {
                    index = sh.products.findIndex(compareElements);

                    if (index != -1){
                        sh.removeProduct(sh.products[index]);
                        
                        init = initPopulate(sh);
                        init();
                    }else{
                        throw new ProductNotExistsException("Product "+serial);
                    }
                }
            } catch (e){
                console.log(e);
                resultForm(false);
            }
        }   
    }     
    
    return function (){
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
        
            var label = $("<label>").attr("class", "h2");
            label.text("Eliminar categoria");
            form.append(label);
           
            createSelect(form, "Products", "selectPrin", "List Products");
           
            createButton(delPro, form);
        
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);

            divForm.append(form);
      }
}



function sesionForm(){
     return function (){
        
            var divForm = $("#sct1");
            divForm.empty();
                
            var form = $("<form>").attr({
                "name" : "catForm",
                "class" : "form-horizontal"   
            });
         
            var label = $("<label>").attr("class", "h2");
            label.text("Iniciar sesión");
            form.append(label);
         
            createInput("Username", "user", form);
            createInput("Password", "pass", form);
         
            createButton(sesion, form);
         
            var p = $("<p>").attr({
                "id" : "result",
                "class" : "bh2"   
            });
            form.append(p);
           
            divForm.append(form);
      }
}

function sesion(){
     return function (){
          var user = $('input[name="user"]').val();
          var pass =$('input[name="pass"]').val();
          var p = $("#result");
         
          if (user === "prueba" && pass === "prueba"){
              document.cookie = "username=prueba";
              
              init = initPopulate(sh);
              init();
        }else{
              p.css("color", "red");
              p.html("Usuario o contraseña incorrectos.");  
        }
    }
}

function closeSesion(){
     return function (){
         document.cookie = "username=; max-age=0";
         init = initPopulate(sh);
         init();
     }
}

function mapForm(element){

    var mapForm = new google.maps.Map(document.getElementById("mapShop"), {
          center: {lat: 38.984573, lng: -3.927454},
          zoom: 14
    });

    var infoWindow = new google.maps.InfoWindow({map: mapForm});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            mapForm.setCenter(pos);
 
          }, function() {
            handleLocationError(true, infoWindow, mapForm.getCenter());
          });
     } else {
          handleLocationError(false, infoWindow, mapForm.getCenter());
     }
    
    var marker = new google.maps.Marker({
                position: {lat: 38.984573, lng: -3.927454},
                map: mapForm,
                draggable: true,
                animation: google.maps.Animation.DROP,
                title: "Ubicacion de la tienda"
    }); 
              
    marker.addListener("click", function() {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
   });
            
   google.maps.event.addListener(marker, "position_changed", function() {

         lat = marker.getPosition().lat();
         lng = marker.getPosition().lng();
   });
}

var lat;
var lng;