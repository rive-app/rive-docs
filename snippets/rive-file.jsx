export const RiveFile = ({
  src,
  stateMachine,
  id,
  artboard,
  autoBind = true
}) => {
  const [riveReady, setRiveReady] = useState(false);

  useEffect(() => {
    // If already loaded (e.g., cached)
    if (window.rive) {
      setRiveReady(true);
      return;
    }

    // Otherwise, wait for script load
    const checkRive = () => {
      if (window.rive) {
        setRiveReady(true);
        window.removeEventListener("rive-loaded", checkRive);
      }
    };

    // You can dispatch your own event from the global loader
    window.addEventListener("rive-loaded", checkRive);

    return () => {
      window.removeEventListener("rive-loaded", checkRive);
    };
  }, []);

  useEffect(() => {
    if (riveReady) {
      const rive = window.rive;

      const r = new rive.Rive({
        src: src,
        stateMachines: stateMachine || "State Machine 1",
        artboard: artboard,
        canvas: document.getElementById(id),
        autoplay: true,
        autoBind: autoBind,
        Layout: new rive.Layout({
          fit: rive.Fit.Contain,
        }),
         onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
        },
      });

      const onResize = () => {
        r.resizeDrawingSurfaceToCanvas();
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        r.cleanup();

      };

    }
  }, [riveReady,]);

  return <canvas id={id} style={{ width: "100%", height: "100%" }} />;
};
