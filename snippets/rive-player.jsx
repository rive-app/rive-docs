import { useEffect } from "react";

export const RivePlayer = ({
  src,
  stateMachines = "State Machine 1",
  canvasId = "rive-canvas"
}) => {
  const initRive = () => {
    const rive = window.rive;

    const r = new rive.Rive({
      src: src,
      stateMachines: stateMachines,
      canvas: document.getElementById(canvasId),
      autoplay: true,
      autoBind: true,
      Layout: new rive.Layout({
        fit: rive.Fit.Layout,
      }),
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      }
    })
  }

  useEffect(() => {
    if (window.rive) {
      initRive()
      return;
    }

    // Otherwise, wait for script load
    const checkRive = () => {
      if (window.rive) {
      initRive()
        window.removeEventListener("rive-loaded", checkRive);
      }
    };

    // You can dispatch your own event from the global loader
    window.addEventListener("rive-loaded", checkRive);

    return () => {
      window.removeEventListener("rive-loaded", checkRive);
    };
  }, []);

  return <canvas id={canvasId} style={{ width: "100%", height: "100%"}} />;
};
