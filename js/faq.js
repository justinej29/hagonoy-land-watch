(function () {
  'use strict';

  var faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  var items = faqList.querySelectorAll('.faq-item');

  items.forEach(function (item, index) {
    var questionBtn = item.querySelector('.faq-question');
    var answerEl    = item.querySelector('.faq-answer');
    if (!questionBtn || !answerEl) return;

    var answerId   = 'faq-answer-' + index;
    var questionId = 'faq-question-' + index;
    answerEl.id    = answerId;
    questionBtn.id = questionId;

    questionBtn.setAttribute('aria-expanded', 'false');
    questionBtn.setAttribute('aria-controls', answerId);

    
    if (!questionBtn.querySelector('.faq-icon')) {
      var icon = document.createElement('span');
      icon.className = 'faq-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<line x1="12" y1="5" x2="12" y2="19"/>' +
          '<line x1="5" y1="12" x2="19" y2="12"/>' +
        '</svg>';
      questionBtn.appendChild(icon);
    }

    questionBtn.addEventListener('click', function () {
      var isOpen = questionBtn.getAttribute('aria-expanded') === 'true';

      items.forEach(function (other) {
        if (other === item) return;
        var otherBtn    = other.querySelector('.faq-question');
        var otherAnswer = other.querySelector('.faq-answer');
        if (otherBtn)    otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.classList.remove('is-open');
      });

      if (isOpen) {
        questionBtn.setAttribute('aria-expanded', 'false');
        answerEl.classList.remove('is-open');
      } else {
        questionBtn.setAttribute('aria-expanded', 'true');
        answerEl.classList.add('is-open');
      }
    });

    questionBtn.addEventListener('keydown', function (e) {
      var allBtns = Array.from(faqList.querySelectorAll('.faq-question'));
      var pos = allBtns.indexOf(questionBtn);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (allBtns[pos + 1]) allBtns[pos + 1].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (allBtns[pos - 1]) allBtns[pos - 1].focus();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        allBtns[0].focus();
      }
      if (e.key === 'End') {
        e.preventDefault();
        allBtns[allBtns.length - 1].focus();
      }
    });
  });

})();
