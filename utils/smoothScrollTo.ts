function smoothScrollTo(element: HTMLElement, duration: number = 1500) {
  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + start;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOutCubic = (progress: number) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

export default smoothScrollTo;
