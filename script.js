document.addEventListener("DOMContentLoaded", () => {
  const shootBtn = document.getElementById('shootBtn');
  const btnText = document.getElementById('btnText');
  const bowArc = document.getElementById('bowArc');
  const bowString = document.getElementById('bowString');
  const arrow = document.getElementById('arrow');
  const targetHeart = document.getElementById('targetHeart');
  const cakeContainer = document.getElementById('cakeContainer');
  const greetingTitle = document.getElementById('greetingTitle');
  const stage = document.getElementById('stage');

  let isAnimating = false;

  function createHeartExplosion(x, y) {
    const heartIcons = ['💖', '💗', '💕', '✨', '🌸', '❤️'];
    for (let i = 0; i < 35; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];

      const size = Math.random() * 16 + 14;
      heart.style.fontSize = `${size}px`;
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      stage.appendChild(heart);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 60;
      const targetX = Math.cos(angle) * velocity;
      const targetY = Math.sin(angle) * velocity;

      gsap.to(heart, {
        x: targetX,
        y: targetY,
        opacity: 0,
        scale: Math.random() * 0.8 + 0.4,
        rotation: Math.random() * 360,
        duration: Math.random() * 1.2 + 0.8,
        ease: "power2.out",
        onComplete: () => heart.remove()
      });
    }
  }

  function runAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    gsap.killTweensOf([arrow, bowArc, bowString, targetHeart, cakeContainer, greetingTitle]);

    gsap.set(cakeContainer, { opacity: 0, scale: 0.3 });
    gsap.set(targetHeart, { opacity: 1, scale: 1, y: 0 });
    gsap.set(arrow, { x: 0, y: 0, opacity: 1, rotation: 30 });
    gsap.set(bowArc, { attr: { d: "M 60 10 Q 15 90 60 170" } });
    gsap.set(bowString, { attr: { d: "M 60 10 L 60 90 L 60 170" } });

    btnText.textContent = "Смотрим...";

    const tl = gsap.timeline({
      onComplete: () => {
        btnText.textContent = "Повторить";
        isAnimating = false;
      }
    });

    tl.to(bowArc, {
      attr: { d: "M 60 10 Q 35 90 60 170" },
      duration: 0.8,
      ease: "power1.inOut"
    }, 0)
    .to(bowString, {
      attr: { d: "M 60 10 L 30 90 L 60 170" },
      duration: 0.8,
      ease: "power1.inOut"
    }, 0)
    .to(arrow, {
      x: -20,
      y: 15,
      duration: 0.8,
      ease: "power1.inOut"
    }, 0)
    .to(bowArc, {
      attr: { d: "M 60 10 Q 10 90 60 170" },
      duration: 0.1,
      ease: "power2.out"
    })
    .to(bowString, {
      attr: { d: "M 60 10 L 65 90 L 60 170" },
      duration: 0.1,
      ease: "power2.out"
    }, "<")
    .to(arrow, {
      x: 105,
      y: -300,
      rotation: 20,
      duration: 0.45,
      ease: "power2.in"
    }, "<")
    .to(bowArc, { attr: { d: "M 60 10 Q 15 90 60 170" }, duration: 0.3 }, ">")
    .to(bowString, { attr: { d: "M 60 10 L 60 90 L 60 170" }, duration: 0.3 }, "<")
    .call(() => {
      createHeartExplosion(190, 85);
    }, null, "-=0.1")
    .to(targetHeart, {
      scale: 1.4,
      opacity: 0,
      duration: 0.2,
      ease: "power1.out"
    }, "<")
    .to(arrow, {
      opacity: 0,
      duration: 0.1
    }, "<")
    .to(cakeContainer, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    }, "+=0.1")
    .from(greetingTitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6");
  }

  shootBtn.addEventListener('click', runAnimation);
});