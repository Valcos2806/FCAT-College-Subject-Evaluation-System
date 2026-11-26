const EVALUATIONS_KEY = 'fcat_evaluations_v1';
const DRAFT_KEY = 'fcat_evaluation_draft_v1';

const criteria = [
  { id: 'clarity', short: 'Clear explanations', label: 'The instructor explains lessons in a clear and understandable way.' },
  { id: 'preparation', short: 'Prepared & organized', label: 'The instructor comes to class prepared and organized.' },
  { id: 'engagement', short: 'Engaging activities', label: 'Learning activities keep me engaged and participating.' },
  { id: 'respect', short: 'Respectful classroom', label: 'The instructor creates a respectful and inclusive classroom.' },
  { id: 'assessment', short: 'Fair assessment', label: 'Grading criteria and feedback are fair and transparent.' },
  { id: 'resources', short: 'Helpful resources', label: 'Learning materials and resources support my understanding.' },
  { id: 'pacing', short: 'Manageable pacing', label: 'The pace of the lessons gives me enough time to learn.' },
  { id: 'support', short: 'Accessible support', label: 'The instructor is approachable and responds to questions.' },
];

const sampleEvaluations = [
  {
    id: 'sample-1', createdAt: '2026-11-25T09:20:00.000Z', sample: true,
    program: 'BS Information Technology', year: '2nd Year', subject: 'Web Systems and Technologies',
    instructor: 'Prof. Maria Santos', section: 'BSIT-2A', semester: '2nd Semester',
    ratings: { clarity: 5, preparation: 5, engagement: 4, respect: 5, assessment: 4, resources: 5, pacing: 4, support: 5 },
    positive: 'The hands-on web projects made every lesson practical. I especially liked how the instructor connected each topic to a real website.',
    improvement: 'A short recap before each laboratory session would help me remember the previous lesson.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-2', createdAt: '2026-11-24T14:10:00.000Z', sample: true,
    program: 'BS Computer Science', year: '2nd Year', subject: 'Data Structures and Algorithms',
    instructor: 'Prof. Juan Dela Cruz', section: 'BSCS-2B', semester: '2nd Semester',
    ratings: { clarity: 4, preparation: 5, engagement: 4, respect: 5, assessment: 5, resources: 4, pacing: 3, support: 4 },
    positive: 'The visual demonstrations of stacks, queues, and trees were very easy to follow.',
    improvement: 'More time for guided coding practice would make the harder algorithms less overwhelming.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-3', createdAt: '2026-11-23T11:35:00.000Z', sample: true,
    program: 'BS Information Systems', year: '3rd Year', subject: 'Database Management Systems',
    instructor: 'Prof. Andrea Reyes', section: 'BSIS-3A', semester: '2nd Semester',
    ratings: { clarity: 5, preparation: 5, engagement: 5, respect: 5, assessment: 4, resources: 4, pacing: 4, support: 5 },
    positive: 'Our database case study showed how the concepts are used in a real organization.',
    improvement: 'Additional sample queries and answer keys would be useful for independent review.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-4', createdAt: '2026-11-22T16:05:00.000Z', sample: true,
    program: 'BS Information Technology', year: '3rd Year', subject: 'Computer Networks',
    instructor: 'Prof. Paolo Mendoza', section: 'BSIT-3B', semester: '2nd Semester',
    ratings: { clarity: 4, preparation: 4, engagement: 4, respect: 5, assessment: 4, resources: 3, pacing: 4, support: 4 },
    positive: 'The packet tracer activities helped me understand how devices communicate.',
    improvement: 'Updated lab guides and more network troubleshooting examples would improve the subject.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-5', createdAt: '2026-11-21T10:45:00.000Z', sample: true,
    program: 'BS Computer Engineering', year: '4th Year', subject: 'Software Engineering',
    instructor: 'Prof. Angela Garcia', section: 'BSCpE-4A', semester: '2nd Semester',
    ratings: { clarity: 4, preparation: 5, engagement: 4, respect: 5, assessment: 5, resources: 4, pacing: 4, support: 4 },
    positive: 'Group milestones kept our project organized and made collaboration easier.',
    improvement: 'Clearer examples of expected documentation would help teams meet the requirements.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-6', createdAt: '2026-11-20T13:15:00.000Z', sample: true,
    program: 'BS Information Technology', year: '1st Year', subject: 'Introduction to Computing',
    instructor: 'Prof. Maria Santos', section: 'BSIT-1C', semester: '2nd Semester',
    ratings: { clarity: 5, preparation: 5, engagement: 5, respect: 5, assessment: 4, resources: 5, pacing: 4, support: 5 },
    positive: 'The instructor is patient and makes technical terms easy for beginners to understand.',
    improvement: 'More introductory practice exercises would help students build confidence.',
    recommendation: 'Yes',
  },
  {
    id: 'sample-7', createdAt: '2026-11-19T15:30:00.000Z', sample: true,
    program: 'BS Information Systems', year: '2nd Year', subject: 'Ethics in Computing',
    instructor: 'Prof. Miguel Torres', section: 'BSIS-2A', semester: '2nd Semester',
    ratings: { clarity: 4, preparation: 4, engagement: 3, respect: 5, assessment: 4, resources: 4, pacing: 4, support: 4 },
    positive: 'The case discussions encouraged us to think about technology from different perspectives.',
    improvement: 'More interactive scenarios and fewer lecture-only sessions would increase engagement.',
    recommendation: 'Maybe',
  },
  {
    id: 'sample-8', createdAt: '2026-11-18T08:50:00.000Z', sample: true,
    program: 'BS Computer Science', year: '4th Year', subject: 'Capstone Project',
    instructor: 'Prof. Juan Dela Cruz', section: 'BSCS-4A', semester: '2nd Semester',
    ratings: { clarity: 4, preparation: 4, engagement: 4, respect: 5, assessment: 4, resources: 3, pacing: 3, support: 4 },
    positive: 'Regular consultations gave our team useful direction without taking over the project.',
    improvement: 'A shared project checklist and clearer milestone reminders would reduce confusion.',
    recommendation: 'Maybe',
  },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    return false;
  }
  return true;
}

function emptyDraft() {
  return {
    program: '', year: '', subject: '', instructor: '', section: '', semester: '2nd Semester',
    ratings: {}, positive: '', improvement: '', recommendation: '',
  };
}

const storedEvaluations = readStorage(EVALUATIONS_KEY, null);
let evaluations = Array.isArray(storedEvaluations) ? storedEvaluations : sampleEvaluations;
if (!Array.isArray(storedEvaluations)) writeStorage(EVALUATIONS_KEY, evaluations);

const storedDraft = readStorage(DRAFT_KEY, null);
let draft = storedDraft && typeof storedDraft === 'object' ? { ...emptyDraft(), ...storedDraft, ratings: storedDraft.ratings || {} } : emptyDraft();
let saveTimer;
let toastTimer;
let activeModal = null;
let lastFocusedElement = null;

const form = $('#evaluationForm');
const ratingList = $('#ratingList');
const recommendationControl = $('#recommendationControl');

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

function truncate(value, length = 150) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

function average(values) {
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;
}

function evaluationAverage(evaluation) {
  return average(criteria.map(criterion => Number(evaluation.ratings?.[criterion.id] || 0)).filter(Boolean));
}

function allRatings(items) {
  return items.flatMap(item => criteria.map(criterion => Number(item.ratings?.[criterion.id] || 0)).filter(Boolean));
}

function criterionAverage(items, criterionId) {
  return average(items.map(item => Number(item.ratings?.[criterionId] || 0)).filter(Boolean));
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function renderRatings() {
  ratingList.innerHTML = criteria.map((criterion, index) => `
    <div class="rating-row" data-criterion="${criterion.id}">
      <div class="rating-label"><span class="rating-number">${String(index + 1).padStart(2, '0')}</span><span>${criterion.label}</span></div>
      ${[1, 2, 3, 4, 5].map(score => `
        <button class="rating-button${Number(draft.ratings[criterion.id]) === score ? ' selected' : ''}" type="button" data-score="${score}" aria-label="${criterion.label} Rating ${score}" aria-pressed="${Number(draft.ratings[criterion.id]) === score}">${score}</button>
      `).join('')}
    </div>
  `).join('');
}

function updateRecommendation() {
  $$('button', recommendationControl).forEach(button => {
    const selected = button.dataset.value === draft.recommendation;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  $('.recommendation-block').classList.toggle('invalid', !draft.recommendation && $('.recommendation-block').classList.contains('invalid'));
}

function updateCharacterCounts() {
  $$('.char-count').forEach(counter => {
    const field = document.getElementById(counter.dataset.for);
    counter.textContent = `${field.value.length} / ${field.maxLength}`;
  });
}

function updateProgress() {
  const detailKeys = ['program', 'year', 'subject', 'instructor', 'section', 'semester'];
  const detailsComplete = detailKeys.filter(key => draft[key]).length;
  const ratingsComplete = criteria.filter(criterion => draft.ratings[criterion.id]).length;
  const feedbackComplete = draft.recommendation ? 1 : 0;
  const completed = detailsComplete + ratingsComplete + feedbackComplete;
  const total = detailKeys.length + criteria.length + 1;
  const percent = Math.round((completed / total) * 100);

  $('#progressPercent').textContent = `${percent}%`;
  $('#progressRing').style.setProperty('--progress', `${percent * 3.6}deg`);

  const completion = { details: detailsComplete === detailKeys.length, ratings: ratingsComplete === criteria.length, feedback: Boolean(feedbackComplete) };
  const firstOpen = !completion.details ? 'details' : !completion.ratings ? 'ratings' : 'feedback';
  $$('.step').forEach(step => {
    const complete = completion[step.dataset.step];
    step.classList.toggle('completed', complete);
    step.classList.toggle('active', !complete && step.dataset.step === firstOpen);
  });
}

function setSaveStatus(message) {
  $('#saveStatus').textContent = message;
}

function saveDraft(immediate = false) {
  clearTimeout(saveTimer);
  const performSave = () => {
    const saved = writeStorage(DRAFT_KEY, draft);
    setSaveStatus(saved ? 'Draft saved just now' : 'Draft could not be saved');
  };
  if (immediate) performSave();
  else {
    setSaveStatus('Saving draft…');
    saveTimer = setTimeout(performSave, 350);
  }
}

function hydrateForm() {
  $$('[name]', form).forEach(field => {
    const key = field.name;
    if (key === 'positive') field.value = draft.positive || '';
    else if (key === 'improvement') field.value = draft.improvement || '';
    else if (key in draft) field.value = draft[key] || '';
  });
  renderRatings();
  updateRecommendation();
  updateCharacterCounts();
  updateProgress();
  if (storedDraft) setSaveStatus('Previous draft restored');
}

function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  $('#toastMessage').textContent = message;
  $('#toast').classList.toggle('error', type === 'error');
  $('#toast').classList.add('show');
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3800);
}

function validateForm() {
  let valid = true;
  $$('.field', form).forEach(field => {
    const input = $('input, select', field);
    const fieldValid = Boolean(input.value.trim());
    field.classList.toggle('invalid', !fieldValid);
    if (!fieldValid) valid = false;
  });

  criteria.forEach(criterion => {
    const row = $(`[data-criterion="${criterion.id}"]`, ratingList);
    const ratingValid = Boolean(draft.ratings[criterion.id]);
    row.classList.toggle('invalid', !ratingValid);
    if (!ratingValid) valid = false;
  });

  const recommendationBlock = $('.recommendation-block');
  recommendationBlock.classList.toggle('invalid', !draft.recommendation);
  if (!draft.recommendation) valid = false;

  if (!valid) {
    const firstInvalid = $('.invalid', form);
    firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Please complete the highlighted items before submitting.', 'error');
  }
  return valid;
}

function submitEvaluation(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const evaluation = {
    id: window.crypto?.randomUUID ? crypto.randomUUID() : `evaluation-${Date.now()}`,
    createdAt: new Date().toISOString(),
    sample: false,
    program: draft.program.trim(),
    year: draft.year,
    subject: draft.subject,
    instructor: draft.instructor,
    section: draft.section.trim().toUpperCase(),
    semester: draft.semester,
    ratings: Object.fromEntries(criteria.map(criterion => [criterion.id, Number(draft.ratings[criterion.id])])),
    positive: draft.positive.trim(),
    improvement: draft.improvement.trim(),
    recommendation: draft.recommendation,
  };

  evaluations.unshift(evaluation);
  if (!writeStorage(EVALUATIONS_KEY, evaluations)) {
    evaluations.shift();
    showToast('Your browser could not save this evaluation. Please check storage settings.', 'error');
    return;
  }

  removeStorage(DRAFT_KEY);
  clearTimeout(saveTimer);
  draft = emptyDraft();
  form.reset();
  hydrateForm();
  setSaveStatus('Ready for your next evaluation');
  openModal($('#successModal'));
  renderDashboard();
}

function getFilteredEvaluations() {
  const filters = {
    subject: $('#filterSubject').value,
    instructor: $('#filterInstructor').value,
    program: $('#filterProgram').value,
    semester: $('#filterSemester').value,
  };
  return evaluations
    .filter(item => Object.entries(filters).every(([key, value]) => !value || item[key] === value))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function setFilterOptions(select, values) {
  const selected = select.value;
  select.innerHTML = '<option value="">' + (select.id === 'filterSubject' ? 'All subjects' : select.id === 'filterInstructor' ? 'All instructors' : select.id === 'filterProgram' ? 'All programs' : 'All semesters') + '</option>';
  [...new Set(values.filter(Boolean))].sort().forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  select.value = values.includes(selected) ? selected : '';
}

function populateFilters() {
  setFilterOptions($('#filterSubject'), evaluations.map(item => item.subject));
  setFilterOptions($('#filterInstructor'), evaluations.map(item => item.instructor));
  setFilterOptions($('#filterProgram'), evaluations.map(item => item.program));
  setFilterOptions($('#filterSemester'), evaluations.map(item => item.semester));
}

function renderStats(items) {
  const ratings = allRatings(items);
  const score = average(ratings);
  const yesCount = items.filter(item => item.recommendation === 'Yes').length;
  const improvementCount = items.filter(item => item.improvement).length;
  $('#totalResponses').textContent = items.length;
  $('#averageRating').textContent = score.toFixed(1);
  $('#recommendationRate').textContent = items.length ? Math.round((yesCount / items.length) * 100) : 0;
  $('#improvementCount').textContent = improvementCount;
  $('#responseSubtext').textContent = `${new Set(items.map(item => item.subject)).size} subject${new Set(items.map(item => item.subject)).size === 1 ? '' : 's'} represented`;
  $('#ratingSubtext').textContent = `${ratings.length} individual ratings`;
}

function renderChart(items) {
  if (!items.length) {
    $('#criteriaChart').innerHTML = '<div class="chart-empty">No ratings match the selected filters.</div>';
    return;
  }
  $('#criteriaChart').innerHTML = criteria.map(criterion => {
    const score = criterionAverage(items, criterion.id);
    const tone = score < 3.8 ? 'low' : score < 4.5 ? 'mid' : '';
    return `
      <div class="chart-row ${tone}">
        <span class="chart-label">${criterion.short}</span>
        <div class="chart-track" role="img" aria-label="${criterion.short}: ${score.toFixed(1)} out of 5"><div class="chart-bar" style="width: ${(score / 5) * 100}%"></div></div>
        <span class="chart-value">${score.toFixed(1)}</span>
      </div>
    `;
  }).join('');
}

function renderSpotlight(items) {
  if (!items.length) {
    $('#spotlightContent').innerHTML = '<div class="spotlight-item"><span>No matching feedback</span><p>Adjust the filters to explore student suggestions.</p></div>';
    return;
  }

  const lowest = criteria.map(criterion => ({ ...criterion, score: criterionAverage(items, criterion.id) })).sort((a, b) => a.score - b.score)[0];
  const positive = items.find(item => item.positive);
  const improvement = items.find(item => item.improvement);
  const spotlightItems = [
    { icon: 'target', label: 'Biggest opportunity', text: `${lowest.short} has the lowest average at ${lowest.score.toFixed(1)}/5.`, detail: `Based on ${items.length} response${items.length === 1 ? '' : 's'}` },
    positive
      ? { icon: 'heart', label: 'Students appreciate', text: `“${truncate(positive.positive, 145)}”`, detail: `${positive.subject} · ${positive.instructor}` }
      : { icon: 'heart', label: 'Students appreciate', text: 'No written positive feedback yet.', detail: 'Encourage specific comments' },
    improvement
      ? { icon: 'bulb', label: 'Suggested improvement', text: `“${truncate(improvement.improvement, 145)}”`, detail: `${improvement.subject} · ${improvement.instructor}` }
      : { icon: 'bulb', label: 'Suggested improvement', text: 'No improvement ideas shared yet.', detail: 'Constructive ideas help guide action' },
  ];

  $('#spotlightContent').innerHTML = spotlightItems.map(item => `
    <div class="spotlight-item">
      <span><svg class="icon"><use href="#icon-${item.icon}"></use></svg>${item.label}</span>
      <p>${escapeHTML(item.text)}</p>
      <small>${escapeHTML(item.detail)}</small>
    </div>
  `).join('');
}

function renderResponses(items) {
  $('#filteredCount').textContent = `${items.length} response${items.length === 1 ? '' : 's'}`;
  if (!items.length) {
    $('#responsesList').innerHTML = '';
    return;
  }

  $('#responsesList').innerHTML = items.slice(0, 6).map(item => {
    const score = evaluationAverage(item).toFixed(1);
    const badgeClass = item.recommendation === 'Maybe' ? 'maybe' : item.recommendation === 'No' ? 'no' : '';
    return `
      <article class="response-item">
        <div class="response-class">
          <h3>${escapeHTML(item.subject)}</h3>
          <p>${escapeHTML(item.instructor)}</p>
          <div class="response-meta"><span>${escapeHTML(item.program)}</span><span>${escapeHTML(item.year)}</span><span>${escapeHTML(item.section)}</span><span>${formatDate(item.createdAt)}</span>${item.sample ? '<span>Sample</span>' : '<span>New</span>'}</div>
        </div>
        <div class="response-feedback">
          ${item.positive ? `<div class="feedback-snippet"><strong>Worked well:</strong> ${escapeHTML(truncate(item.positive, 210))}</div>` : '<div class="feedback-snippet muted">No positive comment provided.</div>'}
          ${item.improvement ? `<div class="feedback-snippet improvement"><strong>Improve:</strong> ${escapeHTML(truncate(item.improvement, 210))}</div>` : '<div class="feedback-snippet improvement muted">No improvement suggestion provided.</div>'}
        </div>
        <div class="response-score"><strong>${score}<span> / 5</span></strong><small class="${badgeClass}">${escapeHTML(item.recommendation)}</small></div>
      </article>
    `;
  }).join('') + (items.length > 6 ? `<div class="response-list-note">Showing the 6 most recent of ${items.length} matching responses. Export CSV to view all.</div>` : '');
}

function renderDashboard() {
  populateFilters();
  const items = getFilteredEvaluations();
  renderStats(items);
  renderChart(items);
  renderSpotlight(items);
  renderResponses(items);
  $('#dashboardEmpty').hidden = items.length > 0;
  $('.responses-card').hidden = items.length === 0;
}

function switchView(view) {
  const isDashboard = view === 'dashboard';
  $('#evaluationView').hidden = isDashboard;
  $('#dashboardView').hidden = !isDashboard;
  $$('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  if (isDashboard) renderDashboard();
  history.replaceState(null, '', isDashboard ? '#dashboard' : '#evaluation');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(modal) {
  if (activeModal) closeModal(activeModal, false);
  lastFocusedElement = document.activeElement;
  activeModal = modal;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('button', modal)?.focus(), 30);
}

function closeModal(modal, restoreFocus = true) {
  modal.hidden = true;
  document.body.style.overflow = '';
  if (activeModal === modal) activeModal = null;
  if (restoreFocus) lastFocusedElement?.focus();
}

function csvCell(value) {
  const text = String(value ?? '');
  const safeText = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function exportCSV() {
  const items = getFilteredEvaluations();
  if (!items.length) {
    showToast('There are no matching responses to export.', 'error');
    return;
  }
  const headers = ['Date', 'Program', 'Year', 'Subject', 'Instructor', 'Section', 'Semester', ...criteria.map(criterion => criterion.label), 'What worked well', 'What could be improved', 'Recommendation', 'Response type'];
  const rows = items.map(item => [
    new Date(item.createdAt).toLocaleString(), item.program, item.year, item.subject, item.instructor, item.section, item.semester,
    ...criteria.map(criterion => item.ratings?.[criterion.id] || ''), item.positive, item.improvement, item.recommendation, item.sample ? 'Sample' : 'Student',
  ]);
  const csv = '\uFEFF' + [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `fcat-evaluations-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`CSV exported with ${items.length} response${items.length === 1 ? '' : 's'}.`);
}

form.addEventListener('input', event => {
  const field = event.target;
  if (!field.name) return;
  if (field.name === 'positive') draft.positive = field.value;
  else if (field.name === 'improvement') draft.improvement = field.value;
  else draft[field.name] = field.value;
  if (field.value.trim()) field.closest('.field')?.classList.remove('invalid');
  updateCharacterCounts();
  updateProgress();
  saveDraft();
});

form.addEventListener('change', event => {
  const field = event.target;
  if (!field.name) return;
  if (field.name === 'positive') draft.positive = field.value;
  else if (field.name === 'improvement') draft.improvement = field.value;
  else draft[field.name] = field.value;
  if (field.value.trim()) field.closest('.field')?.classList.remove('invalid');
  updateProgress();
  saveDraft(true);
});

form.addEventListener('submit', submitEvaluation);

ratingList.addEventListener('click', event => {
  const button = event.target.closest('.rating-button');
  if (!button) return;
  const row = button.closest('.rating-row');
  draft.ratings[row.dataset.criterion] = Number(button.dataset.score);
  $$('.rating-button', row).forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  row.classList.remove('invalid');
  updateProgress();
  saveDraft(true);
});

recommendationControl.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  draft.recommendation = button.dataset.value;
  updateRecommendation();
  updateProgress();
  saveDraft(true);
});

$$('.suggestion-chip').forEach(button => {
  button.addEventListener('click', () => {
    const suggestion = button.dataset.suggestion;
    const current = draft.improvement.trim();
    if (!current.toLowerCase().includes(suggestion.toLowerCase())) {
      draft.improvement = (current ? `${current} ${suggestion}` : suggestion).slice(0, 600);
      $('#improvementFeedback').value = draft.improvement;
      updateCharacterCounts();
      saveDraft(true);
    }
    $('#improvementFeedback').focus();
  });
});

document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) {
    switchView(viewButton.dataset.view);
    if (activeModal) closeModal(activeModal);
  }
  const viewLink = event.target.closest('[data-view-link]');
  if (viewLink) {
    event.preventDefault();
    switchView(viewLink.dataset.viewLink);
  }
});

$$('.dashboard-filters select').forEach(select => select.addEventListener('change', renderDashboard));
$('#resetFilters').addEventListener('click', () => {
  $$('.dashboard-filters select').forEach(select => { select.value = ''; });
  renderDashboard();
  showToast('Dashboard filters reset.');
});
$('#exportButton').addEventListener('click', exportCSV);

$('#helpButton').addEventListener('click', () => openModal($('#helpModal')));
$$('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal-backdrop'))));
$$('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', event => {
  if (event.target === backdrop) closeModal(backdrop);
}));
$('#viewDashboardButton').addEventListener('click', () => {
  closeModal($('#successModal'));
  switchView('dashboard');
});
$('#anotherEvaluationButton').addEventListener('click', () => {
  closeModal($('#successModal'));
  switchView('evaluation');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeModal) closeModal(activeModal);
  if (event.key === 'Tab' && activeModal) {
    const focusable = $$('button, a[href], input, select, textarea', activeModal).filter(element => !element.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});

window.addEventListener('hashchange', () => switchView(location.hash === '#dashboard' ? 'dashboard' : 'evaluation'));

hydrateForm();
renderDashboard();
switchView(location.hash === '#dashboard' ? 'dashboard' : 'evaluation');
