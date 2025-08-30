(function() {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@rive-app/webgl2@2.31.2/rive.js";
  script.onload = () => {
    window.dispatchEvent(new Event("rive-loaded"));
  };
  document.head.appendChild(script);
})();