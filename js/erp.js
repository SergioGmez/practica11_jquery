"use strict";

//Excepción general.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error. StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

//----> Excepciones del objeto Category

//Excepción que se lanza cuando un parámetro no es un objeto Category.
function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error. The method needs a object Category.";
}
CategoryStoreHouseException.prototype = new BaseException();
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

//Excepción que se lanza cuando un objeto category ya existe.
function CategoryExistsException() {
	this.name = "CategoryExistsException";
	this.message = "Error. The category already exist.";
}
CategoryExistsException.prototype = new BaseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

//Excepción que se lanza cuando un objeto category no existe.
function CategoryNoExistsException() {
	this.name = "CategoryNoExistsException";
	this.message = "Error. The category not exist.";
}
CategoryNoExistsException.prototype = new BaseException();
CategoryNoExistsException.prototype.constructor = CategoryNoExistsException;


//-----> Excepciones del objeto Producto

//Excepción que se lanza cuando un parámetro no es un objeto Product.
function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error. The method needs a object Product.";
}
ProductStoreHouseException.prototype = new BaseException();
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

//Excepción que se lanza cuando un objeto product ya existe.
function ProductExistsException(product) {
	this.name = "ProductExistsException";
	this.message = "Error. "+product+" already exist.";
}
ProductExistsException.prototype = new BaseException();
ProductExistsException.prototype.constructor = ProductExistsException;

//Excepción que se lanza cuando un objeto product no existe.
function ProductNotExistsException(product) {
	this.name = "ProductNotExistsException";
	this.message = "Error. "+product+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;

//-----> Excepciones del objeto Coords

function CoordsStoreHouseException() {
	this.name = "CoordsStoreHouseException";
	this.message = "Error. The method needs a object Coords.";
}
CoordsStoreHouseException.prototype = new BaseException();
CoordsStoreHouseException.prototype.constructor = CoordsStoreHouseException;


//-----> Excepciones del objeto Shop

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error. The method needs a object Shop.";
}
ShopStoreHouseException.prototype = new BaseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

//Excepción que se lanza cuando un objeto product ya existe.
function ShopExistsException(shop) {
	this.name = "ShopExistsException";
	this.message = "Error. "+shop+" already exist.";
}
ProductExistsException.prototype = new BaseException();
ProductExistsException.prototype.constructor = ProductExistsException;

//Excepción que se lanza cuando un objeto product no existe.
function ShopNotExistsException(shop) {
	this.name = "ShopNotExistsException";
	this.message = "Error. "+shop+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;


function StoreHouse(){

	if (!(this instanceof StoreHouse)) 
		throw new InvalidAccessConstructorException();

	//Definición de atributos privados del objeto.
	var name = null;
	var products = [];
    var categories = [];
    var shops = [];
    
    //Definición de los metodos 'get' y 'set' del atributo name.
    Object.defineProperty(this, 'name', {
			get:function(){
				return name;
			},
			set:function(value){
				value = value.trim();
				if (value === "" && value === undefined ) throw new EmptyValueException("name");		
				name = value;
			}		
		});
    
    Object.defineProperty(this, 'products', {
			get:function(){
				return products;
			},	
		});
	
    //Definición del metodo 'get' del atributo categories. Devuelve iterador.
    Object.defineProperty(this, 'categories', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < categories.length ? {value: categories[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    
    //Definición del metodo 'get' del atributo shops. Devuelve iterador.
    Object.defineProperty(this, 'shops', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < shops.length ? {value: shops[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    //Método que permite añadir una categoria. Devuelve el número de categorias.
    this.addCategory = function(category){
		if (!(category instanceof Category)){ 
			throw new CategoryStoreHouseException();
		}
        
        if (category === undefined && category === null){ 
			throw new EmptyValueException(category);
		}
        
		var indexCategory = getCategoryIndex(category);
        if (indexCategory === -1){
            categories.push(category);
            addDB(category, "categories", category.title);
        }else{
            throw new CategoryExistsException();
        }
        
        return categories.length;
	}
    
    //Método que permite eliminar una categoria. Devuelve el número de categorias.
    this.removeCategory = function(category){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}
        
		var indexCategory = getCategoryIndex(category);   
        if (indexCategory !== -1){
            var i = 0;

            while ( i < categories[indexCategory].products.length){
                if (getCategoryProducts(categories[indexCategory].products[i], categories[0].products) === -1){
                  this.addProduct(categories[indexCategory].products[i], categories[0]);
                }
                i++;
            }
            categories.splice(indexCategory, 1);
            delDB(category, "categories", category.title); 
        }else{
            throw new CategoryNoExistsException();
        }
        return categories.length;
	}
    
    //Devuelve la posición de una categoria dada.
    function getCategoryIndex(category){
        if (!(category instanceof Category)) { 
            throw new CategoryStoreHouseException();
        }		

        function compareElements(element){
            return (element.title === category.title)
        }
				
        return categories.findIndex(compareElements);	
	}
    
    //Categoría por defecto.
	var defaultCategory = new Category ("Anonymous");
	categories.push(defaultCategory);
     Object.defineProperty(this, 'defaultCategory', {
			get:function(){
				return defaultCategory;
			}	
	 });
    
    //Metodo que permite añadir un producto con una categoria. Devuelve el numero de productos de dicha categoria.
    this.addProduct = function(product, category){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	
		if (product === null){
			throw new EmptyValueException(product);
		}	
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}		

		var productPosition = getProductIndex(product);
        if (productPosition === -1){
			products.push(product);
            addDB(product, "products", product.serialNumber);
		}
        
        var categoryPosition = getCategoryIndex(category);
		if (categoryPosition === -1){
            categoryPosition = this.addCategory(category)-1;
            addDB(category, "categories", category.title);
		}	
        
        var productCategoryPos = getCategoryProducts(product, categories[categoryPosition].products);
        
		if (productCategoryPos === -1){
			categories[categoryPosition].products.push(product);
            if (getShopProducts(product, shops[0].products) === -1){
                this.addProductInShop(product, shops[0], 0);
            }
            
		}else{
            throw new ProductExistsException(product);
		}	
        return categories[categoryPosition].products.length;
	}
    
    //Método que borra un producto. Devuelve el numero de productos de dicha categoria.
    this.removeProduct = function(product){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}
        
        var productPosition = getProductIndex(product);

        if (productPosition !== -1){
            
            var index;
            var categories = sh.categories;
            var category = categories.next();

            while (category.done !== true){
                index = getCategoryProducts(product, category.value.products)
                if ( index !== -1){
                   category.value.products.splice(index, 1);
                }
                category = categories.next();
            }

            var shops = sh.shops;
            var shop = shops.next();
            while (shop.done !== true){
                index = getShopProducts(product, shop.value.products)

                if ( index !== -1){
                    shop.value.products.splice(index, 1);
                }
                shop = shops.next();
            }
            
            products.splice(productPosition, 1);
            delDB(product, "products", product.serialNumber);
 
		}else{
			throw new ProductNotExistsException(product);
		}
        return products.length;
	}
    
    //Metodo que devuelve la posición de un producto dado.
    function getProductIndex(product){
        if (!(product instanceof Product)) { 
            throw new ProductStoreHouseException();
        }		

        function compareElements(element) {
            return (element.serialNumber === product.serialNumber)
        }
				
        return products.findIndex(compareElements);		
	}
    
    //Método que devuelve la posición de un producto en una categoria.
    function getCategoryProducts(product, categoryProducts){
		if (!(product instanceof Product)){ 
			throw new ProductStoreHouseException();
		}
        
		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
		
		return categoryProducts.findIndex(compareElements);	
	}
     
    //Método que añade un producto a una tienda con un stock.
    this.addProductInShop = function(product, shop, num){
        if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		
		
		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			products.push(product);
            addDB(product, "products", product.serialNumber);
            productPosition = products.length-1;
		}	

		var shopPosition = getShopIndex(shop);
		if (shopPosition === -1){
			shopPosition = this.addShop(shop)-1;
            addDB(shop, "shops", shop.cif);
		}

		var productShopPosition = getShopProducts(product, shops[shopPosition].products); 	
		if (productShopPosition === -1){
            products[productPosition].stockGen =+ num;
			shops[shopPosition].products.push(
                {
                 product: product,
                 serialNumber: product.serialNumber,
                 stock: num    
                }
            );
           
		}else{
			throw new ProductExistsException(product);
		}	

		return shops[shopPosition].products.length;
    }                              
    
   //Método que suma stock de un producto de una tienda ya existentes.
   this.addQuantityProductInShop = function(product, shop, num){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		

		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			throw new ProductNotExistsException(product);
		}	
        
		var shopPosition = getShopIndex(shop); 
		if (shopPosition === -1){
			throw new ShopNotExistsException(product);
		}
       
        if (num < 0 ) throw new InvalidValueException("num", num);

		
		var productShopPosition = getShopProducts(product, shops[shopPosition].products);

		if (productShopPosition !== -1){
			shops[shopPosition].products[productShopPosition].stock += num;
            product.stockGen += num;
            updDB(product, "products", product.serialNumber);
		}else{
			throw new ProductNotExistsException(product);
		}	

        return shops[shopPosition].products[productShopPosition].stock;
	}
   
   //Método que devuelve todos los productos añadidos en una categoria con su stock. Parametro type opcional para filtrar.
   this.getCategoryProducts = function(category, type){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException ();
		}
        
        if (category === undefined && category === null){ 
			throw new EmptyValueException(category);
		}
       
		var categoryPosition = getCategoryIndex(category);  	
		if (categoryPosition === -1) throw new CategoryNotExistsException(category);
        
        var productPosition = 0;
        
        if (type === null || type === undefined ){
            return {
                next: function(){

                    var _product = null;

                    _product = category.products[productPosition];

                    if (_product !== null && productPosition < category.products.length ){
                        productPosition++;
                        return {value: _product, done: false}
                    }
                    if (productPosition >= category.products.length) return {done: true};
                }
            }
        }else{
            return {
                next: function(){
                    
                    var _product = null;

                    _product = category.products[productPosition];
                    
                    while ( _product !== null && productPosition < category.products.length ){    
                        
                        if ( category.products[productPosition] instanceof type){
                            _product = category.products[productPosition];
                            productPosition++;
                        return {value: _product, done: false}
                        }
                        productPosition++; 
                    }
                    if (productPosition >= category.products.length) return {done: true};
                }
            }
        }
	}
   
   //Método que devuelve la posición de un producto en una tienda.
   function getShopProducts(product, shopProducts){
		if (!(product instanceof Product)){ 
			throw new ShopStoreHouseException();
		}

		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
       
		return shopProducts.findIndex(compareElements);	
	}
    
    //Método que añade una tienda.
    this.addShop = function(shop){
		if (!(shop instanceof Shop)){ 
			throw new ShopStoreHouseException();
		}
        
        if (shop === undefined && shop === null){ 
			throw new EmptyValueException(shop);
		}
        
		var indexShop = getShopIndex(shop);
        if (indexShop === -1){
            shops.push(shop);
            addDB(shop, "shops", shop.cif);
        }else{
            throw new ShopExistsException(shop);
        }
        
        return shops.length;
	}
    
    //Método que elimina una tienda.
    this.removeShop = function(shop){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}
        
		var indexShop = getShopIndex(shop); 
    ;
        if (indexShop !== -1){
            var i = 0;
            
            while ( i < shops[indexShop].products.length){
                var indexDef = getShopProducts(shops[indexShop].products[i].product, shops[0].products)
                if (indexDef == -1){
                this.addProductInShop(shops[indexShop].products[i].product, shops[0], shops[indexShop].products[i].stock );
                } else { 
                    this.addQuantityProductInShop(shops[indexShop].products[i].product, shops[0], shops[indexShop].products[i].stock );
                }

                i++;
            }
            shops.splice(indexShop, 1);
            delDB(shop, "shops", shop.cif);
        }else{
            throw new ShopNotExistsException(shop);
        }
        return shops.length;
	}
    
    //Método que devuelve todos los productos añadidos en una tienda con su stock. Parametro type opcional para filtrar.
    this.getShopProducts = function(shop, type){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException ();
		}
        
        if (shop === undefined && shop === null){ 
			throw new EmptyValueException(shop);
		}
       
		var shopPosition = getShopIndex(shop);  	
		if (shopPosition === -1) throw new ShopNotExistsException(shop);
        
        var productPosition = 0;
        
        if (type === null || type === undefined ){
            return {
                next: function(){

                    var _product = null;

                    _product = shop.products[productPosition];

                    if (_product !== null && productPosition < shop.products.length ){
                        productPosition++;
                        return {value: _product, done: false}
                    }
                    if (productPosition >= shop.products.length) return {done: true};
                }
            }
        }else{
            return {
                next: function(){
                    
                    var _product = null;

                    _product = shop.products[productPosition];
                    
                    while ( _product !== null && productPosition < shop.products.length ){    
                        
                        if ( shop.products[productPosition].product instanceof type){
                            _product = shop.products[productPosition];
                            productPosition++;
                        return {value: _product, done: false}
                        }
                        productPosition++; 
                    }
                    if (productPosition >= shop.products.length) return {done: true};
                }
            }
        }
	}
    
    //Método que devuelve la posición de una tienda.
    function getShopIndex(shop){
        if (!(shop instanceof Shop)) { 
            throw new ShopStoreHouseException();
        }		

        function compareElements(element) {
            return (element.cif === shop.cif)
        }
				
        return shops.findIndex(compareElements);		
	}
    
    //Tienda por defecto.
    var coord = new Coords(14, 68);
	var defaultShop = new Shop("0123", "General", coord);
    shops.push(defaultShop);
	//this.addShop(defaultShop);

}