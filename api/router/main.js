var path = require('path');
var product = require('./product');
var account = require('./account');
var getBrand = require('./getBrand');
var management = require('./ManagementSystem');
var timeLimit = require('./timeLimit');
var selection = require('./selection');
var flashSale = require('./flashSale');
exports.main = function(express){
    var app = express();

    //app.use(express.static(path.join(__dirname, '/')));
    app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});
    
    app.get('/', function(request, response){
        response.send('Home Page');
    })    
    product.product(app);
    account.account(app);
    getBrand.getBrand(app);
    management.management(app);
    timeLimit.timeLimit(app);
    selection.selection(app);
    flashSale.flashSale(app);
    app.listen(8888);

}