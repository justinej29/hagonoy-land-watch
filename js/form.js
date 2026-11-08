

(function () {
  'use strict';

  var formSection = document.getElementById('report-form-section');
  if (!formSection) return;

  
  var GOOGLE_FORM_URL = ''; 

  var HLW       = window.HLW || {};
  var barangays = HLW.barangays || [];


  if (GOOGLE_FORM_URL.trim() !== '') {
    var wrapper    = document.getElementById('form-wrapper');
    var mockupForm = document.getElementById('report-mockup-form');
    if (mockupForm) mockupForm.style.display = 'none';

    if (wrapper) {
      wrapper.innerHTML =
        '<div class="gform-wrapper">' +
          '<iframe src="' + escHtml(GOOGLE_FORM_URL) + '" title="Report a Problem Form"' +
            ' loading="lazy" sandbox="allow-scripts allow-forms allow-same-origin">' +
          '</iframe>' +
        '</div>' +
        '<p class="gform-fallback">' +
          '<a href="' + escHtml(GOOGLE_FORM_URL) + '" target="_blank" rel="noopener noreferrer"' +
            ' class="btn btn-secondary btn-sm">' +
            'Open form in a new tab' +
          '</a>' +
        '</p>';
    }
    return;
  }

  var form          = document.getElementById('report-mockup-form');
  var errorSummary  = document.getElementById('form-error-summary');
  var successPanel  = document.getElementById('form-success');
  var barangaySel   = document.getElementById('field-barangay');

  if (!form) return;

  if (barangaySel && barangays.length > 0) {
    barangays
      .slice()
      .sort(function (a, b) { return a.name.localeCompare(b.name); })
      .forEach(function (b) {
        var opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.name;
        barangaySel.appendChild(opt);
      });
  }

  function showError(fieldId, errorId, message) {
    var field = document.getElementById(fieldId);
    var err   = document.getElementById(errorId);
    if (field) field.classList.add('is-invalid');
    if (err)   { err.classList.add('is-shown'); err.querySelector('span') && (err.querySelector('span').textContent = message); }
  }

  function clearError(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var err   = document.getElementById(errorId);
    if (field) field.classList.remove('is-invalid');
    if (err)   err.classList.remove('is-shown');
  }

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function validateField(id) {
    if (id === 'field-barangay') {
      if (!getVal('field-barangay')) {
        showError('field-barangay', 'err-barangay', 'Please select your barangay.');
        return false;
      }
      clearError('field-barangay', 'err-barangay');
      return true;
    }

    if (id === 'field-issue-type') {
      var radios = form.querySelectorAll('input[name="issue-type"]');
      var checked = Array.from(radios).some(function (r) { return r.checked; });
      var err = document.getElementById('err-issue-type');
      if (!checked) {
        if (err) err.classList.add('is-shown');
        return false;
      }
      if (err) err.classList.remove('is-shown');
      return true;
    }

    if (id === 'field-description') {
      var desc = getVal('field-description');
      if (!desc || desc.length < 20) {
        showError('field-description', 'err-description', 'Please write at least 20 characters.');
        return false;
      }
      clearError('field-description', 'err-description');
      return true;
    }

    if (id === 'field-consent') {
      var consent = document.getElementById('field-consent');
      var err = document.getElementById('err-consent');
      if (!consent || !consent.checked) {
        if (err) err.classList.add('is-shown');
        return false;
      }
      if (err) err.classList.remove('is-shown');
      return true;
    }

    return true;
  }

  ['field-barangay', 'field-description'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', function () { validateField(id); });
    }
  });

  var radios = form.querySelectorAll('input[name="issue-type"]');
  radios.forEach(function (r) {
    r.addEventListener('change', function () { validateField('field-issue-type'); });
  });

  var consentEl = document.getElementById('field-consent');
  if (consentEl) {
    consentEl.addEventListener('change', function () { validateField('field-consent'); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid1 = validateField('field-barangay');
    var valid2 = validateField('field-issue-type');
    var valid3 = validateField('field-description');
    var valid4 = validateField('field-consent');

    if (!valid1 || !valid2 || !valid3 || !valid4) {
      var errors = [];
      if (!valid1) errors.push('Please select your barangay.');
      if (!valid2) errors.push('Please select an issue type.');
      if (!valid3) errors.push('Description must be at least 20 characters.');
      if (!valid4) errors.push('You must agree to the privacy notice.');

      if (errorSummary) {
        errorSummary.classList.add('is-shown');
        var list = errorSummary.querySelector('ul');
        if (list) {
          list.innerHTML = errors.map(function (m) { return '<li>' + escHtml(m) + '</li>'; }).join('');
        }
  
        errorSummary.setAttribute('tabindex', '-1');
        errorSummary.focus();
      }
      return;
    }

    
    if (errorSummary) errorSummary.classList.remove('is-shown');
    form.style.display = 'none';
    if (successPanel) {
      successPanel.classList.add('is-shown');
      successPanel.setAttribute('tabindex', '-1');
      successPanel.focus();
    }
  });

  
  var photoInput = document.getElementById('field-photo');
  var photoName  = document.getElementById('photo-name');
  if (photoInput && photoName) {
    photoInput.addEventListener('change', function () {
      if (photoInput.files && photoInput.files[0]) {
        photoName.textContent = photoInput.files[0].name;
      } else {
        photoName.textContent = 'No file chosen';
      }
    });
  }


  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
