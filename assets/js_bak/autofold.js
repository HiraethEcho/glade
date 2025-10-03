document.addEventListener('DOMContentLoaded', function() {
  const detailsElements = document.querySelectorAll('nav details');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  function handleDetailsState() {
      detailsElements.forEach(detail => {
          if (isMobile) {
              detail.removeAttribute('open');
          } 
      });
  }
  handleDetailsState();
  window.addEventListener('resize', handleDetailsState);
});
