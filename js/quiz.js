
(function () {
  'use strict';

 
  var quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  var HLW       = window.HLW || {};
  var questions = (HLW.quizQuestions || []).slice(); 

  if (questions.length === 0) return;

 
  var progressLabel    = document.getElementById('quiz-progress-label');
  var progressFill     = document.getElementById('quiz-progress-fill');
  var questionCard     = document.getElementById('quiz-question-card');
  var questionText     = document.getElementById('quiz-question-text');
  var optionsList      = document.getElementById('quiz-options');
  var feedback         = document.getElementById('quiz-feedback');
  var feedbackLive     = document.getElementById('quiz-feedback-live'); 
  var nextBtn          = document.getElementById('quiz-next-btn');
  var scoreCard        = document.getElementById('quiz-score-card');
  var scoreNumber      = document.getElementById('quiz-score-number');
  var scoreMessage     = document.getElementById('quiz-score-message');
  var retakeBtn        = document.getElementById('quiz-retake-btn');

 
  var currentIndex = 0;
  var score        = 0;
  var answered     = false;

  
  function getScoreMessage(s, total) {
    var pct = s / total;
    if (pct >= 0.9)  return 'Excellent! You know a lot about land subsidence. Well done!';
    if (pct >= 0.7)  return 'Good job! You have a solid understanding of the topic.';
    if (pct >= 0.5)  return 'Not bad! Try reading through the site again to learn more.';
    return 'Keep learning! Explore the other pages to find the answers.';
  }

  function renderQuestion(index) {
    answered = false;
    var q = questions[index];

    
    var pct = Math.round(((index) / questions.length) * 100);
    if (progressFill)  progressFill.style.width = pct + '%';
    if (progressLabel) progressLabel.textContent = 'Question ' + (index + 1) + ' of ' + questions.length;

   
    if (questionText) questionText.textContent = q.question;

    
    if (optionsList) {
      optionsList.innerHTML = '';
      q.options.forEach(function (opt, i) {
        var li  = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.textContent = opt;
        btn.dataset.index = i;
        btn.addEventListener('click', function () { handleAnswer(btn, i, q); });
        li.appendChild(btn);
        optionsList.appendChild(li);
      });
    }

   
    if (feedback) {
      feedback.className = 'quiz-feedback';
      feedback.innerHTML = '';
    }
    if (feedbackLive) feedbackLive.textContent = '';

    
    if (nextBtn) nextBtn.style.display = 'none';

    
    if (questionCard) questionCard.style.display = '';
    if (scoreCard)    scoreCard.classList.remove('is-shown');
  }

 
  function handleAnswer(clickedBtn, selectedIndex, q) {
    if (answered) return;
    answered = true;

    var isCorrect = selectedIndex === q.correct;
    if (isCorrect) { score++; }

   
    var allBtns = optionsList.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.correct)       { btn.classList.add('is-correct'); }
      else if (btn === clickedBtn) { btn.classList.add('is-wrong'); }
    });

   
    if (feedback) {
      feedback.className = 'quiz-feedback is-shown ' +
        (isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong');
      feedback.innerHTML =
        '<strong>' + (isCorrect ? '✓ Correct!' : '✗ Not quite.') + '</strong>' +
        escHtml(q.explanation) +
        '<span class="quiz-source">Learn more: ' + escHtml(q.source) + '</span>';
    }

 
    if (feedbackLive) {
      feedbackLive.textContent =
        (isCorrect ? 'Correct. ' : 'Incorrect. ') + q.explanation;
    }

    
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      if (currentIndex >= questions.length - 1) {
        nextBtn.textContent = 'See my score';
      } else {
        nextBtn.textContent = 'Next question →';
      }
    }
  }

  
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentIndex++;
      if (currentIndex >= questions.length) {
        showScore();
      } else {
        renderQuestion(currentIndex);
        
        if (questionText) { questionText.setAttribute('tabindex', '-1'); questionText.focus(); }
      }
    });
  }

  
  function showScore() {
    if (questionCard) questionCard.style.display = 'none';
    if (feedback)     { feedback.className = 'quiz-feedback'; feedback.innerHTML = ''; }
    if (nextBtn)      nextBtn.style.display = 'none';

    var total = questions.length;
    if (progressFill)  progressFill.style.width = '100%';
    if (progressLabel) progressLabel.textContent = 'Quiz complete!';

    if (scoreNumber)  scoreNumber.textContent = score + ' / ' + total;
    if (scoreMessage) scoreMessage.textContent = getScoreMessage(score, total);
    if (scoreCard)    scoreCard.classList.add('is-shown');

    
    if (scoreNumber) {
      scoreNumber.setAttribute('tabindex', '-1');
      scoreNumber.focus();
    }

   
    if (feedbackLive) {
      feedbackLive.textContent =
        'Quiz complete! You scored ' + score + ' out of ' + total + '. ' +
        getScoreMessage(score, total);
    }
  }

  
  if (retakeBtn) {
    retakeBtn.addEventListener('click', function () {
      currentIndex = 0;
      score        = 0;
      answered     = false;
      renderQuestion(0);
      
      if (progressLabel) { progressLabel.setAttribute('tabindex', '-1'); progressLabel.focus(); }
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

 
  renderQuestion(0);

})();
