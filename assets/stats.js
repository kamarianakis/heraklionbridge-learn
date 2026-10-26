/* Ανώνυμα στατιστικά χρήσης (GoatCounter, https://heraklionbridge.goatcounter.com).
   Χωρίς cookies και χωρίς προσωπικά δεδομένα. Φορτώνεται από το site.js και από το deck.js.
   Παρέχει τη συνάρτηση trackEvent(όνομα) για συμβάντα, π.χ. «το κουίζ ολοκληρώθηκε». */
(function () {
  'use strict';
  if (window.trackEvent) return;

  var s = document.createElement('script');
  s.async = true;
  s.setAttribute('data-goatcounter', 'https://heraklionbridge.goatcounter.com/count');
  s.src = '//gc.zgo.at/count.js';
  document.head.appendChild(s);

  window.trackEvent = function (path) {
    try {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: path, title: path, event: true });
      }
    } catch (e) { /* τα στατιστικά δεν πρέπει ποτέ να χαλάσουν τη σελίδα */ }
  };
})();
