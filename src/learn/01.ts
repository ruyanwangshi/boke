// function main() {
//     console.log('main');
// }
// Function.prototype.before = function(fn) {
//     const self = this;
//     return function(after){
//         after();
//         fn();
//         self.apply()
//     };
// };
// Function.prototype.after = function(fn) {
//     this(fn);
//     return this;
// };
// main.before(function() {
//     console.log('before');
// }).after(function() {
//     console.log('after');
// });
// function main() {
//     console.log('打印');
// }
// Function.prototype.after = function(fn) {
//     const __self = this; // 保存原函数的引用
//     return function() {
//         // 返回包含了原函数的和新函数的“代理”函数
//         const ret = __self.apply(this, arguments); // 执行新函数，修正this
//         fn.apply(this, arguments);
//         return ret;
//     };
// };
// Function.prototype.befor = function(fn) {
//     const __self = this; // 保存原函数的引用
//     return function() {
//         // 返回包含了原函数的和新函数的“代理”函数
//         fn.apply(this, arguments); // 执行新函数，修正this
//         return __self.apply(this, arguments);
//     };
// };
// const mainFn = main.befor(function() {
//     console.log('befor');
// }).after(function() {
//     console.log('after');
// });
// mainFn();
// interface listeningObjectType {
//   clientList: Object
//   listen: (key: any, fn: (val:any) => void) => void
//   trigger: (key:any,content:any) => void|Boolean
// };
// const listeningObject:listeningObjectType = { // 监听对象
//   clientList: {}, // 缓存列表
//   listen: listen, // 存放订阅者的回调函数
//   trigger: trigger // 发布消息
// };

// function listen(this:any,key:any, fn:(val:any)=>void) {
//   if(!this.clientList[key]){ // 判断是否订阅过该消息
//     this.clientList[key] = [];
//   }
//   console.log('缓存消息队列=>',this.clientList);
//   this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
// }

// function trigger(this:any) {
//   const arg:any = Array.from(arguments);
//   const key: any = arg.shift(), // 取出消息类型
//   fns: any = this.clientList[key];
//   if(!fns||fns.length === 0) {
//     return false;
//   }
//   for(let i:number = 0,fn:()=>void;fn=fns[i++];){
//     fn.apply(this,arg);
//   }
// }

// listeningObject.listen('news1',function(val:any) {
//     console.log(`news1${val}`)
// })
// listeningObject.listen('news2',function(val:any) {
//     console.log(`news2${val}`)
// })

// listeningObject.trigger('news1','消息1')
// listeningObject.trigger('news2','消息2')
let Eventfn: any;

Eventfn = (function(this: any): void {
  let global: any = this,
    Event: any,
    _defalut = 'default';
  Event = (function() {
    let _listen: Function,
      _trigger: Function,
      _remove: Function,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache: any = {},
      _create: Function,
      find,
      each = function(ary: any, fn: Function) {
        let ret;
        for (let i: number = 0, l = ary.length; i < l; i++) {
          const n = ary[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };
    _listen = function(key: any, fn: Function, cache: any) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    _remove = function(key: any, cache: any, fn: any) {
      if (cache[key]) {
        if (fn) {
          for (let i: number = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    _trigger = function(this: any) {
      let cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args: any = arguments,
        _self = this,
        ret,
        stack = cache[key];
      console.log(args)
      console.log(key)
      console.log(stack)
      if (!stack || !stack.length) {
        return;
      }
      return each(stack, function(this: any) {
        return this.apply(_self, args);
      });
    };
    _create = function(namespace: any) {
      const nameSpace: any = namespace || _defalut;
      let cache = {},
        offlineStack: any[] | any = [],
        ret = {
          listen: function(key: any, fn: Function, last: any) {
            console.log(key)
            console.log(fn)
            console.log(last)
            _listen(key, fn, cache);
            if (offlineStack === null) {
              return;
            }
            if (last === 'last') {
              offlineStack.length && offlineStack.pop()();
            } else {
              // each(offlineStack, function(this: Function) {
              each(offlineStack, function(this: Function) {
                console.log(this)
                this();
              });
            }
            offlineStack = null;
          },
          one: function(this: any, key: any, fn: Function, last: any) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          remove: function(key: any, fn: Function) {
            _remove(key, cache, fn);
          },
          trigger: function(this: any) {
            let fn: Function,
              args: any,
              _self = this;
            _unshift.call(arguments, cache);
            args = arguments;
            fn = function() {
              return _trigger.apply(_self, args);
            };
            if (offlineStack) {
              return offlineStack.push(fn);
            }
            return fn();
          },
        };
      return nameSpace ? (namespaceCache[nameSpace] ? namespaceCache[nameSpace] : (namespaceCache[nameSpace] = ret)) : ret;
    };
    return {
      create: _create,
      one: function(key: any, fn: Function, last: any) {
        let event: any;
        event = this.create();
        event.one(key, fn, last);
      },
      remove: function(key: any, fn: Function) {
        let event: any;
        event = this.create();
        event.remove(key, fn);
      },
      listen: function(key: any, fn: Function, last: any) {
        let event: any;
        event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function() {
        let event: any;
        console.log(event);
        event = this.create();
        event.trigger(this, arguments);
      },
    };
  })();
  console.log(Event);
  return Event;
})();
Eventfn.trigger('click', 1);
Eventfn.listen('click', function(a: any) {
  console.log(a);
});
