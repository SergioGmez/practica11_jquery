"use strict";

//Objeto Category
function Category(titleValue){
    
    if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	if (titleValue === undefined || titleValue === null) throw new EmptyValueException("title");
    titleValue = titleValue.trim();

	var title = titleValue;	
	var description = null;
    var products = [];

	Object.defineProperty(this, 'title', {
		get:function(){
			return title;
		},
		set:function(value){
			title = title.trim();
			if (title === undefined || title === null) throw new EmptyValueException("title");					
			title = value;
            updDB(this, "categories", title);
		}		
	});		
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return description;
		},
		set:function(value){
			if (value === undefined) throw new EmptyValueException("description");	
			description = value;
            updDB(this, "categories", title);
		}		
	});
    
    Object.defineProperty(this, 'products', {
		get:function(){
			return products;
		}	
	});
}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){	
	return "Category: " + this.title + " (" + this.description + ")"; 
};
Category.prototype.getObject = function(){
    return {
        title: this.serialNumber,
        description: this.description,
        products: this.products
    };
}


//Objeto Product
function Product(serialNumberValue, nameValue, priceValue){

        if (!(this instanceof Product)) 
            throw new InvalidAccessConstructorException();

        if (serialNumberValue === undefined || serialNumberValue === '') throw new EmptyValueException("serialNumber");
        if (typeof serialNumberValue !== 'number') throw new InvalidValueException("pages",serialNumberValue); 

        if (nameValue === undefined || nameValue === '') throw new EmptyValueException("name");	

        if (priceValue === undefined || priceValue === '') throw new EmptyValueException("price");
        if (typeof priceValue !== 'number') throw new InvalidValueException("pages",priceValue);
    
        nameValue = nameValue.trim();

        var serialNumber = serialNumberValue;
        var name = nameValue;
        var description = null;
        var price = priceValue;
        var tax = null;
        var images = [];
        var stockGen = 0;

        Object.defineProperty(this, 'serialNumber', {
            get:function(){
                return serialNumber;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("serialNumber");
                if (typeof value !== 'number') throw new InvalidValueException("serialNumber",value);
                serialNumber = value;
                updDB(this, "products", serialNumber);
            }
        });		

        Object.defineProperty(this, 'name', {
            get:function(){
                return name;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("name");	
                name = value;
                updDB(this, "products", serialNumber);
            }		
        });			

        Object.defineProperty(this, 'description', {
            get:function(){
                return description;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("description");	
                description = value;
                updDB(this, "products", serialNumber);
            }		
        });

        Object.defineProperty(this, 'price', {
            get:function(){
                return price;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("price");
                if (typeof value !== 'number') throw new InvalidValueException("price",value);
                price = value;
                updDB(this, "products", serialNumber);
            }		
        });

        Object.defineProperty(this, 'tax', {
            get:function(){
                return tax;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("tax");	
                tax = value;
                updDB(this, "products", serialNumber);
            }		
        });

        Object.defineProperty(this, 'images', {
            get:function(){
                return images;
            },		
        });
    
        Object.defineProperty(this, 'stockGen', {
            get:function(){
                return stockGen;
            },
            set:function(value){
                if (value === undefined || value === '') throw new EmptyValueException("stockGen");	
                stockGen = value;
                updDB(this, "products", serialNumber);
            }		
        });

}
Product.prototype = {};
Product.prototype.constructor = Product;
Product.prototype.toString = function (){	
    return "(SerialNumber: " + this.serialNumber + ") Name: "+this.name+" Price: "+this.price; 
}
Product.prototype.getObject = function(){
    return {
        serialNumber: this.serialNumber,
        name: this.name,
        description: this.description,
        price: this.price,
        tax: this.tax,
        images: this.images,
        stockGen: this.stockGen
    };
}


//Objeto Shirt. Hereda del objeto product.
function Shirt(serialNumber, name, price, tailValue){
		if (!(this instanceof Shirt))
			throw InvalidAccessConstructorException();
		
		Product.call(this, serialNumber, name, price);
        if (typeof tailValue === undefined) throw new EmptyValueException("tail");
        
        var tail = tailValue;
        
		Object.defineProperty(this, 'tail', {
			get:function(){
				return tail;
			},
			set:function(value){
				if (typeof tail === undefined) throw new EmptyValueException("tail");
                if (typeof value !== 'number') throw new InvalidValueException("pages",value);
				tail = value;
                updDB(this, "products", serialNumber);
			}		
		});	
}	
Shirt.prototype = Object.create(Product.prototype);
Shirt.prototype.constructor = Shirt;
Shirt.prototype.toString = function (){	
    return "(SerialNumber: " + this.serialNumber + ") Name: "+this.name+" Price: "+this.price+" Tail "+this.tail; 
}
Shirt.prototype.getObject = function(){
    return {

    };
}
  
//Objeto Book. Hereda del objeto product.
function Book(serialNumber, name, price, pagesValue){
		if (!(this instanceof Book))
			throw InvalidAccessConstructorException();
		
        if (typeof pagesValue === undefined && pagesValue === '') throw new EmptyValueException("pages");
        if (typeof pagesValue !== 'number') throw new InvalidValueException("pages", pagesValue); 
        
        Product.call(this, serialNumber, name, price);
    
        var pages = pagesValue;    
    
		Object.defineProperty(this, 'pages', {
			get:function(){
				return pages;
			},
			set:function(value){
				if (typeof pages === 'undefined') throw new EmptyValueException("pages");
                if (typeof pages === 'Number') throw new InvalidValueException("pages",value); 
				pages = value;
                updDB(this, "products", serialNumber);
			}		
		});	
}	
Book.prototype = Object.create(Product.prototype);
Book.prototype.constructor = Book;
Book.prototype.toString = function (){	
    return "(SerialNumber: " + this.serialNumber + ") Name: "+this.name+" Price: "+this.price+" Pages: "+this.pages; 
}

//Objeto TV. Hereda del objeto product.
function TV(serialNumber, name, price, inchesValue){
		if (!(this instanceof TV))
			throw InvalidAccessConstructorException();
		
        if (typeof inches === undefined) throw new EmptyValueException("inches");
        if (typeof inchesValue !== 'number') throw new InvalidValueException("inches",inchesValue); 
    
        Product.call(this, serialNumber, name, price);
    
        var inches = inchesValue;
    
		Object.defineProperty(this, 'inches', {
			get:function(){
				return inches;
			},
			set:function(value){
				if (typeof tail === undefined) throw new EmptyValueException("inches");
                if (typeof Value !== 'number') throw new InvalidValueException("inches",value); 
				inches = value;
                updDB(this, "products", serialNumber);
			}		
		});	
}	
TV.prototype = Object.create(Product.prototype);
TV.prototype.constructor = TV;
TV.prototype.toString = function (){	
    return "(SerialNumber: " + this.serialNumber + ") Name: "+this.name+" Price: "+this.price+" Inches: "+this.inches; 
}
    
function Coords(latitudeValue, longitudeValue){

	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();
    
    latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var latitude = latitudeValue;
	var longitude = longitudeValue;
    
 	Object.defineProperty(this, 'latitude', {
		get:function(){
			return latitude;
		},
		set:function(value){
			value = typeof value !== undefined ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("longitude", value);
			longitude = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;

function Shop(cifValue, nameValue, coordsValue){

	if (!(this instanceof Shop)) 
		throw new InvalidAccessConstructorException();
    
    if (cifValue === undefined || cifValue === '') throw new EmptyValueException("cif");	

    if (nameValue === undefined || nameValue === '') throw new EmptyValueException("name");
    
    if (!(coordsValue instanceof Coords)) 
		throw new CoordsStoreHouseException();

	var cif = cifValue;
	var name = nameValue;
    var direction = null;
    var phone = null;
    var coords = coordsValue;
    var products = [];
    
    Object.defineProperty(this, 'cif', {
		get:function(){
			return cif;
		},
	});		

	Object.defineProperty(this, 'name', {
		get:function(){
			return name;
		},
		set:function(value){
			if (value === undefined || value === '') throw new EmptyValueException("name");	
			name = value;
            updDB(this, "shops", cif);
		}		
	});			

	Object.defineProperty(this, 'direction', {
		get:function(){
			return direction;
		},
		set:function(value){
			if (value === undefined || value === '') throw new EmptyValueException("direction");	
			direction = value;
            updDB(this, "shops", cif);
		}		
	});
    
    Object.defineProperty(this, 'phone', {
		get:function(){
			return phone;
		},
		set:function(value){
			if (value === undefined || value === '') throw new EmptyValueException("phone");	
			phone = value;
            updDB(this, "shops", cif);
		}		
	});
    
    Object.defineProperty(this, 'coords', {
		get:function(){
			return coords;
		},
		set:function(value){
			if (!(value instanceof Coords)){ 
			    throw new CoordsStoreHouseException();
            }
            coords = value;
            updDB(this, "shops", cif);
		}		
	});
    
    Object.defineProperty(this, 'products', {
		get:function(){
			return products;
		},		
	});
}
Shop.prototype = {};
Shop.prototype.constructor = Shop;
Shop.prototype.toString = function (){	
	return "Shop: (" + this.cif + ") "+this.name; 
};
Shop.prototype.getObject = function(){
    return {
        cif: this.cif,
        name: this.name,
        directon: this.direction,
        phone: this.phone,
        coords: this.coords,
        products: this.products
    };
}