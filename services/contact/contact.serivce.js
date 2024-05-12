// contact.service.js
angular.module("ContactApp").service("ContactService", function ($http, $q) {
  this.getContacts = function () {
    const deferred = $q.defer();
    $http
      .get(`http://localhost:3000/api/contacts`)
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.editContact = function (id, fullname, phone, email) {
    const deferred = $q.defer();
    $http
      .put(`http://localhost:3000/api/contacts`, {
        id: id,
        fullname: fullname,
        phone: phone,
        email: email,
      })
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.deleteContact = function (id) {
    const deferred = $q.defer();
    $http
      .delete(`http://localhost:3000/api/contacts/${id}`)
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  this.addContact = function (contact) {
    const deferred = $q.defer();
    $http
      .post(`http://localhost:3000/api/contacts`, contact)
      .then(function (response) {
        deferred.resolve(response.data.msg);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };
});
