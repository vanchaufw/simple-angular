angular.module('BookApp', []).controller('bookController', function($scope, $http) {

    $scope.name = '';
    $scope.current_query = '';
    $scope.past_query = '';

    $scope.books = [];

    $scope.book_interface = {
        id: 0,
        title: "",
        author: "",
        publication_year: "",
        genre: [],
        description: "",
        cover_image: ""
    }

    $scope.new_books = [];

    $scope.getBooks = function() {

        var current_query = $scope.current_query;
        var url = "";

        if ($scope.books.length && (current_query == '' || $scope.past_query == $scope.current_query)) {
            return;
        }

        if (current_query == '') {
            url = `https://freetestapi.com/api/v1/books`
        }
        else {
            url = `https://freetestapi.com/api/v1/books?search=${current_query}`
        }
 
        $http.get(url)
        .then(function(response) {
            past_query = current_query;
            $scope.books = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    $scope.getBooks();

    $scope.sortBook = function() {
        $http.get(`https://freetestapi.com/api/v1/books?sort=name&order=dec`)
        .then(function(response) {
            $scope.books = response.data;
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    $scope.createBook = function() {
        
    }

    $scope.deleteBook = function() {

    }


    $scope.findBookInClientSide = function(book) {
        var search = $scope.name.toLowerCase();
        return (
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search) ||
            book.description.toLowerCase().includes(search)
        );
    };

});