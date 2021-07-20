(function initCareers() {
  const $careerForm = document.querySelector('#career-form');
  const $careerList = document.querySelector('#career-list');

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
   * @param {string} HTML representing a single element
   * @return {HTMLElement}
   */
  function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  on($careerList, 'click', '.js-delete-btn', (el) => {
    el.closest('.js-career-item').remove();
  });

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

  $careerForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const values = {
      title: $careerForm['job-title'].value,
      level: $careerForm['job-level'].value,
      department: $careerForm['job-department'].value,
      summary: $careerForm['job-summary'].value
    };
    $careerList.prepend(
      htmlToElement(html`<li class="js-career-item">
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-4 flex items-center sm:px-6">
            <div
              class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <div
                  class="text-sm leading-5 font-medium text-pink-600 truncate"
                >
                  ${values.title}
                  <span class="ml-1 font-normal text-gray-500"
                    >in ${values.department}
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
                    ><span>Level: ${values.level}</span>
                    ${values.level === 'internship'
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

    $careerForm.reset();
  });
})();
