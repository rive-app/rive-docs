(function() {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@rive-app/webgl2@latest/rive.js";
  script.onload = () => {
    console.log('rive loaded')
    window.dispatchEvent(new Event("rive-loaded"));
  };
  document.head.appendChild(script);
})();