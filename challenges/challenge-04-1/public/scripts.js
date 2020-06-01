const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const courses = document.querySelectorAll('.course');

for (let course of courses) {
  course.addEventListener('click', function () {
    const courseSelected = course.getAttribute('id');
    // modalOverlay.classList.add('active');
    // modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${courseSelected}`;
    window.location.href = `/courses/${courseSelected}`;
  });
}

const maximizeModal = document.querySelector('.maximize-modal');

maximizeModal.addEventListener('click', function () {
  if (modal.classList.contains('maximize')) {
    modal.classList.remove('maximize');
    maximizeModal.querySelector('i').textContent = 'tab';
  } else {
    modal.classList.add('maximize');
    maximizeModal.querySelector('i').textContent = 'minimize';
  }
});

document.querySelector('.close-modal').addEventListener('click', function () {
  modalOverlay.classList.remove('active');
  modalOverlay.querySelector('iframe').src = '';
  
  if (modal.classList.contains('maximize')) {
    modal.classList.remove('maximize');
    maximizeModal.querySelector('i').textContent = 'tab';
  }
});
