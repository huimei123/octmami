var path = require('path');
var product = require('./product');
var account = require('./account');
var getBrand = require('./getBrand');

exports.main = function(express){
    var app = express();

    app.use(express.static(path.join(__dirname, '/')));
    
    app.get('/', function(request, response){
        response.send('Home Page');
    })    

    product.product(app);
    account.account(app);
    getBrand.getBrand(app);
    app.listen(8888);
}