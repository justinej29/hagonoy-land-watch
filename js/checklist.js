(function () {
  'use strict';

  var checklistEl = document.getElementById('action-checklist');
  if (!checklistEl) return;

  var items       = checklistEl.querySelectorAll('.checklist-item');
  var progressEl  = document.getElementById('checklist-progress');
  var total       = items.length;
  var doneCount   = 0;

  function updateCount() {
    doneCount = checklistEl.querySelectorAll('input[type="checkbox"]:checked').length;
    if (progressEl) {
      progressEl.textContent = doneCount + ' of ' + total + ' done';
    }
  }

  items.forEach(function (item) {
    var checkbox = item.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        item.classList.add('is-done');
      } else {
        item.classList.remove('is-done');
      }
      updateCount();
    });

   
    item.addEventListener('click', function (e) {
  
      if (e.target === checkbox) return;
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    });

    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function (e) {
      if ((e.key === ' ' || e.key === 'Enter') && e.target !== checkbox) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });

  updateCount();

})();
