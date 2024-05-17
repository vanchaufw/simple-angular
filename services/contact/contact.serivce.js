// contact.service.js
angular.module("ContactApp").service("ContactService", function ($http, $q) {
  this.getContacts = function () {
    const deferred = $q.defer();
    $http
      .get(`http://localhost/contact-be-php/index.php/api/contacts`)
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.editContact = function (id, username, fullname, phone, email) {
    const deferred = $q.defer();
    $http
      .put(
        `http://localhost/contact-be-php/index.php/api/contacts/${id}`,
        {
          username: username,
          fullname: fullname,
          phone: phone,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        deferred.resolve(response);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.deleteContact = function (id) {
    const deferred = $q.defer();
    $http
      .delete(`http://localhost/contact-be-php/index.php/api/contacts/${id}`)
      .then(function (response) {
        deferred.resolve(response);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.addContact = function (contact) {
    const deferred = $q.defer();
    $http
      .post(`http://localhost/contact-be-php/index.php/api/contacts`, contact)
      .then(function (response) {
        deferred.resolve(response);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  
});
