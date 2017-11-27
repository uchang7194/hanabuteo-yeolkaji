# Stack
> LIFO(Last In First Out)

```javascript
function Stack () {
	this.data = [];
	this.idx = 0;
}

Stack.prototype.push = function(data) {
	this.data[this.idx++] = data;
}

Stack.prototype.pop = function() {
	return this.data[this.idx--];
}

Stack.prototype.dataCount = function() {
	return this.idx;
}
Stack.prototype.arrState = function() {
	return this.data;
}

Stack.prototype.dataTravelsing = function() {
	var i = 0;

	for( ; i < this.idx; i++ ) {
		console.log(this.data[i]);
    }
}
```