(async function initPricing() {
  const pricingData = await fetch('/api/pricing').then((res) => res.json());

  const hobbyPriceData = pricingData.find((p) => p.tier === 'hobby');
  const freelancerPriceData = pricingData.find((p) => p.tier === 'freelancer');
  const startupPriceData = pricingData.find((p) => p.tier === 'startup');
  const enterprisePriceData = pricingData.find((p) => p.tier === 'enterprise');

  const hobbyPrice = document.querySelector('#hobby-price');
  const freelancerPrice = document.querySelector('#freelancer-price');
  const startupPrice = document.querySelector('#startup-price');
  const enterprisePrice = document.querySelector('#enterprise-price');
  const priceUnits = Array.from(document.querySelectorAll('.price-unit'));

  const monthlyPlanBtn = document.querySelector('#monthly-plans-btn');
  const annualPlanBtn = document.querySelector('#annual-plans-btn');

  const activeBtnClasses = ['bg-white', 'border-gray-200', 'text-gray-900'];
  const inactiveBtnClasses = ['border-transparent', 'text-gray-700'];

  monthlyPlanBtn.addEventListener('click', () => {
    hobbyPrice.innerHTML = hobbyPriceData.monthlyPrice;
    freelancerPrice.innerHTML = freelancerPriceData.monthlyPrice;
    startupPrice.innerHTML = startupPriceData.monthlyPrice;
    enterprisePrice.innerHTML = enterprisePriceData.monthlyPrice;
    monthlyPlanBtn.classList.remove(...inactiveBtnClasses);
    monthlyPlanBtn.classList.add(...activeBtnClasses);
    annualPlanBtn.classList.remove(...activeBtnClasses);
    annualPlanBtn.classList.add(...inactiveBtnClasses);
    priceUnits.forEach((el) => {
      el.innerHTML = '/mo';
    });
  });

  annualPlanBtn.addEventListener('click', () => {
    hobbyPrice.innerHTML = hobbyPriceData.annualPrice;
    freelancerPrice.innerHTML = freelancerPriceData.annualPrice;
    startupPrice.innerHTML = startupPriceData.annualPrice;
    enterprisePrice.innerHTML = enterprisePriceData.annualPrice;
    annualPlanBtn.classList.remove(...inactiveBtnClasses);
    annualPlanBtn.classList.add(...activeBtnClasses);
    monthlyPlanBtn.classList.remove(...activeBtnClasses);
    monthlyPlanBtn.classList.add(...inactiveBtnClasses);
    priceUnits.forEach((el) => {
      el.innerHTML = '/yr';
    });
  });
})();
