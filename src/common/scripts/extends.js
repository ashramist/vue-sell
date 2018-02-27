// 继承的实现
// 1,,

/**
 * 父类 构造器
 * @param name
 * @param age
 * @param gender
 * @constructor
 */
function Parent () {
  this.name = '张三'
}

Parent.prototype.sayHi = function () {
  console.log(this.name, 'is eating food')
}

function Child1 (name, age, gender, skills) {
  this.name = name
  this.age = age
  this.gender = gender
  this.skills = skills
}

/**
 * 原型链继承的方式,只能实现单继承
 * @type {Parent}
 */
Child1.prototype = new Parent('张三全', 15, '男')
let child = new Child1('张三全', 15, '男', 'play')
console.log(child.sayHi())

/**
 * 构造函数
 * @constructor
 */
function ConstructExtends () {
  Parent.apply(this)
  this.name = '构造继承'
}

let constructExtends = new ConstructExtends()
console.log(constructExtends.name)
console.log(constructExtends.sayHi())

function Parent2 () {
  this.name = '干爸'
}

Parent2.prototype.sayHi2 = function () {
  console.log(this.name + '我是干爸')
}

function CombineExtends (name) {
  Parent.call(this)
  Parent2.call(this)
  this.name = name || '张三子'
}

CombineExtends.prototype = new Parent2()
let combineExtends = new CombineExtends('李四')
console.log(combineExtends.sayHi())
console.log(combineExtends.sayHi2())
