export const RiveEmbed = ({
  src,
  stateMachines = "State Machine 1",
  artboard,
  layout = false,
  aspectRatio = "16 / 9",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let instance = null;

    const handleResize = () => {
      instance?.resizeDrawingSurfaceToCanvas();
    };

    // After Rive has loaded globally, initialize the Rive instance
    const initRive = () => {
      const rive = window.rive;
      if (!canvasRef.current) return;

      instance = new rive.Rive({
        src,
        stateMachines,
        canvas: canvasRef.current,
        artboard,
        autoBind: true,
        autoplay: true,
        layout: new rive.Layout({
          fit: layout ? rive.Fit.Layout : rive.Fit.Contain,
        }),
        onLoad: () => {
          instance.resizeDrawingSurfaceToCanvas();
        },
      });
    };

    const checkRive = () => {
      if (window.rive) {
        initRive();
        window.removeEventListener("rive-loaded", checkRive);
      }
    };

    if (window.rive) {
      initRive();
    } else {
      window.addEventListener("rive-loaded", checkRive);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("rive-loaded", checkRive);
      window.removeEventListener("resize", handleResize);
      instance?.cleanup();
    };
  }, [src, stateMachines, artboard, layout]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-xl"
      style={{ width: "100%", aspectRatio }}
    />
  );
};
