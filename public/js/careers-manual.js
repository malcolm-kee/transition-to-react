(function initCareers() {
  'use strict';

  const $careerForm = document.querySelector('#career-form');
  const $careerFormTitle = document.querySelector('#form-title');
  const $careerList = document.querySelector('#career-list');
  const $loadBtn = document.querySelector('#load-career-btn');
  const $paginationBtns = document.querySelector('#pagination-btns');
  const $prevBtn = document.querySelector('#prev-btn');
  const $nextBtn = document.querySelector('#next-btn');

  const html = htm.bind(vhtml);

  /**
   *
   * @param {HTMLElement} el
   * @param {string} event
   * @param {string} selector
   * @param {(el: HTMLElement) => void} cb
   */
  function on(el, event, selector, cb) {
    el.addEventListener(event, (ev) => {
      const matchedEl = ev.target.closest(selector);

      if (matchedEl) {
        cb(matchedEl);
      }
    });
  }

  /**
   *
   * @param {string} text
   * @returns string
   */
  function titleCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * @param {string} HTML representing a single element
   * @return {HTMLElement}
   */
  function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  const $headcountInput = document.querySelector('#headcount');
  const $headcountPlusBtn = document.querySelector('#headcount-plus-btn');
  const $headcountMinusBtn = document.querySelector('#headcount-minus-btn');
  const $headcountError = document.querySelector('#headcount-error');

  const hideError = () => $headcountError.classList.add('hidden');
  const showError = (msg) => {
    $headcountError.innerHTML = msg;
    $headcountError.classList.remove('hidden');
  };

  $headcountPlusBtn.addEventListener('click', () => {
    hideError();
    const currentValue = Number($headcountInput.value || 0);
    $headcountInput.value = currentValue + 1;
  });
  $headcountMinusBtn.addEventListener('click', () => {
    hideError();
    const currentValue = Number($headcountInput.value || 0);
    if (currentValue <= 1) {
      showError('Headcount must be at least 1.');
    }
    if (currentValue > 0) {
      $headcountInput.value = currentValue - 1;
    }
  });

  const appendCareerItem = ({ title, department, level, _id }) =>
    $careerList.append(
      htmlToElement(html`<li class="js-career-item" data-id="${_id}">
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-4 flex items-center sm:px-6">
            <div
              class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <div
                  class="text-sm leading-5 font-medium text-pink-600 truncate"
                >
                  ${title}
                  <span class="ml-1 font-normal text-gray-500"
                    >in ${department}
                  </span>
                </div>
                <div class="mt-2 flex">
                  <div
                    class="flex items-center text-sm leading-5 text-gray-500 gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                      ></path></svg
                    ><span>Level: ${titleCase(level)}</span>
                    ${level === 'internship'
                      ? html`<span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          Student-friendly
                        </span>`
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="ml-5 flex-shrink-0 inline-flex items-center justify-center gap-2"
            >
              <button
                type="button"
                class="js-edit-btn p-1 rounded-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring focus:ring-pink-500 focus:ring-opacity-30 transition duration-150 ease-in-out"
                title="Edit"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                class="js-delete-btn p-1 rounded-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring focus:ring-pink-500 focus:ring-opacity-30 transition duration-150 ease-in-out"
                title="Delete"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>`)
    );

  let pageNumber = 1;
  function loadCurrentPage() {
    return fetch(
      `https://ecomm-service.herokuapp.com/job?page=${pageNumber}&limit=5`
    )
      .then((res) => res.json())
      .then((jobs) => {
        $careerList.innerHTML = '';
        jobs.forEach(appendCareerItem);
      });
  }

  $loadBtn.addEventListener('click', () => {
    $loadBtn.innerHTML = 'Loading...  ';

    loadCurrentPage().then(() => {
      $loadBtn.classList.add('hidden');

      $paginationBtns.classList.remove('hidden');
    });
  });

  /**
   *
   * @param {'create' | 'edit'} mode
   */
  function updateFormMode(mode) {
    $careerFormTitle.innerHTML =
      mode === 'create' ? 'Add Job Posting' : 'Edit Job Posting';
  }

  on($careerList, 'click', '.js-edit-btn', (btn) => {
    const $item = btn.closest('.js-career-item');
    $item.classList.add('animate-pulse');
    btn.disabled = true;
    const id = $item.dataset.id;
    fetch(`https://ecomm-service.herokuapp.com/job/${id}`)
      .then((res) => res.json())
      .then((job) => {
        console.log({ job });
        updateFormMode('edit');
      })
      .finally(() => {
        btn.disabled = false;
        $item.classList.remove('animate-pulse');
      });
  });

  on($careerList, 'click', '.js-delete-btn', (btn) => {
    btn.disabled = true;
    const $item = btn.closest('.js-career-item');
    $item.classList.add('animate-pulse');
    const id = $item.dataset.id;

    fetch(`https://ecomm-service.herokuapp.com/job/${id}`, {
      method: 'DELETE'
    }).then(loadCurrentPage);
  });

  $prevBtn.addEventListener('click', () => {
    if (pageNumber > 1) {
      $prevBtn.innerHTML = 'Loading...';
      pageNumber--;
      loadCurrentPage().then(() => {
        $prevBtn.innerHTML = 'Previous';
      });
    }
  });

  $nextBtn.addEventListener('click', () => {
    pageNumber++;
    $nextBtn.innerHTML = 'Loading...';
    loadCurrentPage().then(() => {
      $nextBtn.innerHTML = 'Next';
    });
  });

  $careerForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    $careerForm.disabled = true;
    const $submitBtn = $careerForm.querySelector('button[type="submit"]');

    const values = {
      title: $careerForm['job-title'].value,
      level: $careerForm['job-level'].value,
      department: $careerForm['job-department'].value,
      summary: $careerForm['job-summary'].value,
      headcount: Number($careerForm['headcount'].value),
      descriptions: [],
      requirements: []
    };

    $submitBtn.innerHTML = 'ADDING...';

    fetch('https://ecomm-service.herokuapp.com/job', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        pageNumber = 1;
        loadCurrentPage();
      })
      .finally(() => {
        $careerForm.disabled = false;
        $careerForm.reset();

        $careerForm['job-title'].focus();
        $submitBtn.innerHTML = 'ADD';
      });
  });
})();
