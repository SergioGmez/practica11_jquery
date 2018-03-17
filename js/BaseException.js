"use strict";

//Excepción base.
function BaseException() {
}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

//Excepción de acceso inválido al constructor.
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "Constructor can’t be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción para indicar parámetros vacios.
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: The parameter " + param + " can't be empty.";
}
EmptyValueException.prototype = new BaseException(); 
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción para indicar parámetros incorrectos.
function InvalidValueException(param, value) {
	this.name = "InvalidValueException";
	this.message = "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new BaseException(); 
InvalidValueException.prototype.constructor = InvalidValueException;

