import { useEffect, useState } from "react";

export const ExampleEyeFollow = () => {
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

      const mapCursorToRange = (position, dimension) => {
        // Clamp to canvas bounds and map to 0-100
        const clampedPosition = Math.max(0, Math.min(position, dimension));
        return (clampedPosition / dimension) * 100;
      };

      let handleMouseMove = () => {}
      let handleMouseLeave = () => {}

      const r = new rive.Rive({
        src: "https://static.rive.app/rivs/cat_follow_cursor_demo.riv",
        stateMachines: "State Machine 1",
        canvas: document.getElementById("riveCanvas"),
        autoplay: true,
        autoBind: true,
        Layout: new rive.Layout({
          fit: rive.Fit.Contain,
        }),
         onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();

    const vmi = r.viewModelInstance;
    if (!vmi) return;

    const xProperty = vmi.number("xPos");
    const yProperty = vmi.number("yPos");

    // Set the x and y values to 50 initially so the character is looking forward
    if (xProperty) {
      xProperty.value = 50;
    }
    if (yProperty) {
      yProperty.value = 50;
    }

    // Unified handler for both mouse and touch position updates
    const updatePosition = (clientX, clientY) => {
      // Get canvas position and dimensions
      const rect = riveCanvas.getBoundingClientRect();

      // Calculate position relative to canvas
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;

      // Map position to 0-100 range based on canvas dimensions
      // This accounts for canvas position in the window
      const xValue = mapCursorToRange(canvasX, rect.width);
      const yValue = mapCursorToRange(canvasY, rect.height);

      // Update the view model properties
      if (xProperty) {
        xProperty.value = xValue;
      }
      if (yProperty) {
        yProperty.value = yValue;
      }

      // Optional: Log values for debugging
      // console.log(`X: ${xValue.toFixed(2)}, Y: ${yValue.toFixed(2)}`);
    };

    // Mouse move event handler
    const handleMouseMove = (event) => {
      updatePosition(event.clientX, event.clientY);
    };

    // Touch move event handler
    const handleTouchMove = (event) => {
      // Use the first touch point
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Touch end event handler - reset to center when touch ends
    const handleTouchEnd = () => {
      if (xProperty) xProperty.value = 50;
      if (yProperty) yProperty.value = 50;
    };

    // Add mouse move listener to the entire window
    window.addEventListener("mousemove", handleMouseMove);

    // Add touch event listeners to the entire window (passive to allow scrolling)
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Set x and y values back to 50 when the cursor leaves the window
    document.addEventListener("mouseleave", () => {
      if (xProperty) xProperty.value = 50;
      if (yProperty) yProperty.value = 50;
    });
  },
      });


      window.addEventListener("resize", () => {
        r.resizeDrawingSurfaceToCanvas();
      });

      return () => {
        window.removeEventListener("resize", () => {
          r.resizeDrawingSurfaceToCanvas();
        });

        window.removeEventListener("mousemove", handleMouseMove);

        window.removeEventListener("mouseleave", handleMouseLeave);
      };

    }
  }, [riveReady]);

  return <canvas id="riveCanvas" style={{ width: "100%", height: "100%", backgroundColor: "#ADBCC6"  }} />;
};
