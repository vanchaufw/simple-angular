angular.module("ContactApp").factory("PaginationService", function () {
  return {
    paginate: function (isIncrease, startValue, displayValue, contactsLength) {
      if (isIncrease) {
        if (startValue + displayValue >= contactsLength) {
          return startValue;
        }
        return startValue + displayValue;
      } else {
        if (startValue - displayValue < 0) {
          return startValue;
        }
        return startValue - displayValue;
      }
    },
  };
});
