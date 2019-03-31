var product = angular.module('productApp', []);

product.controller('productCtr', function ProductCtrl($csope) {
    
        $scope.products = [
            
            { name: "apple", price: 34000 },
            { name: "samsung", price: 24000 },
            { name: "acer", price: 25000 },
            { name: "asus", price: 31000 },
            { name: "xiaomi", price: 13000 }
            
        ];
            
});