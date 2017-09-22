/*! Built with http://stenciljs.com */
myname.loadComponents(

/**** module id (dev mode) ****/
"my-name",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var MyName = /** @class */ (function () {
    function MyName() {
    }
    MyName.prototype.render = function () {
        return (h("p", 0, t("Hello, my name is "),
            this.first, t(" "),
            this.last));
    };
    return MyName;
}());

exports['MY-NAME'] = MyName;
},


/***************** my-name *****************/
[
/** my-name: tag **/
"MY-NAME",

/** my-name: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** my-name: host **/
{}

]
)