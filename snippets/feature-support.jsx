
export const FeatureSupportGroup = ({
    runtime,
    title,
    children
}) => {
    // Filters the rows of a runtime table by feature title
    const [query, setQuery] = useState('');

    const runtimeTitles = {
        webCanvas: "Web - Canvas",
        webWebGL: "Web - WebGL (Legacy)",
        webWebGL2: "Web - WebGL2",
        webCanvasLite: "Web - Canvas Lite",
        reactCanvas: "React - Canvas",
        reactCanvasLite: "React - Canvas Lite",
        reactWebGL: "React - WebGL (Legacy)",
        reactWebGL2: "React - WebGL2",
        reactNative: "React Native",
        reactNativeLegacy: "React Native (Legacy)",
        flutter: "Flutter",
        apple: "Apple",
        android: "Android",
        cpp: "C++",
        unity: "Unity",
        unreal: "Unreal",
    }

    // Runtime tables are sorted automatically (see `compareFeaturesForRuntime`),
    // so new features only need an entry here. An optional `link` turns the
    // feature title into a link to its documentation.
    const features = {
        layerMasks: {
            title: "Layer Masks",
            link: "/runtimes/choose-a-renderer",
            runtimes: {
                webCanvas: { supported: false },
                webCanvasLite: { supported: false },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.50.0" },
                reactCanvas: { supported: false },
                reactCanvasLite: { supported: false },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.39.0" },
                reactNative: { supported: true, partial: true, version: "0.5.13", note: "GPU Canvas required" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, partial: true, version: "6.28.0", note: "GPU Canvas required; no simulators" },
                android: { supported: true, version: "11.16.3", note: "GPU Canvas required" },
                cpp: { supported: true, note: "GPU Canvas required" },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, partial: true, version: "0.4.26-weekly_2026_10_03", note: "Requires -riveRenderOverride=raster" }
            }
        },
        bitmapCache: {
            title: "Bitmap Cache",
            link: "/editor/fundamentals/bitmap-cache",
            runtimes: {
                webWebGL2: { supported: true, version: "2.49.2" },
                webCanvas: { supported: false, note: "Draws without caching" },
                webCanvasLite: { supported: false, note: "Draws without caching" },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.1" },
                reactCanvas: { supported: false, note: "Draws without caching" },
                reactCanvasLite: { supported: false, note: "Draws without caching" },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.13", note: "GPU Canvas required" },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.27.0", note: "GPU Canvas required" },
                android: { supported: true, version: "11.16.1", note: "GPU Canvas required" },
                cpp: { supported: true, note: "GPU Canvas required" },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, version: "0.4.26" },
            }
        },
        artboardFills: {
            title: "Artboard Paint",
            runtimes: {
                webWebGL2: { supported: true, version: "2.49.1" },
                webCanvas: { supported: false, note: "The fill is not drawn" },
                webCanvasLite: { supported: false, note: "The fill is not drawn" },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.1" },
                reactCanvas: { supported: false, note: "The fill is not drawn" },
                reactCanvasLite: { supported: false, note: "The fill is not drawn" },
                reactWebGL: { supported: false },
                reactNative: { supported: true, partial: true, version: "0.5.13", note: "GPU Canvas required; iOS coming soon" },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.30.0", note: "GPU Canvas required" },
                android: { supported: true, version: "11.16.1", note: "GPU Canvas required" },
                cpp: { supported: true, note: "GPU Canvas required" },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, version: "0.4.26-weekly_2026_10_17_hotfix" },
            }
        },
        componentMeshes: {
            title: "Mesh and N-Slice on Components",
            link: "/editor/manipulating-shapes/meshes",
            runtimes: {
                webWebGL2: { supported: true, version: "2.49.2" },
                webCanvas: { supported: false, note: "Draws undeformed" },
                webCanvasLite: { supported: false, note: "Draws undeformed" },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.1" },
                reactCanvas: { supported: false, note: "Draws undeformed" },
                reactCanvasLite: { supported: false, note: "Draws undeformed" },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.13", note: "GPU Canvas required" },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.29.0", note: "GPU Canvas required" },
                android: { supported: true, version: "11.16.1", note: "GPU Canvas required" },
                cpp: { supported: true, note: "GPU Canvas required" },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, version: "0.4.26-weekly_2026_10_10" },
            }
        },
        imageFills: {
            title: "Image Paint",
            runtimes: {
                webWebGL2: { supported: true, version: "2.50.0" },
                webCanvas: { supported: true, version: "2.50.0" },
                webCanvasLite: { supported: false },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.39.0" },
                reactCanvas: { supported: true, version: "4.39.0" },
                reactCanvasLite: { supported: false },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.13" },
                flutter: { supported: true, version: "0.15.0-dev.2", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.27.0" },
                android: { supported: true, version: "11.16.3" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, version: "0.4.26" },
            }
        },
        innerOuterStrokes: {
            title: "Inner and Outer Strokes",
            runtimes: {
                webWebGL2: { supported: true, version: "2.49.1" },
                webCanvas: { supported: true, version: "2.49.0" },
                webCanvasLite: { supported: false },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.1" },
                reactCanvas: { supported: true, version: "4.38.1" },
                reactCanvasLite: { supported: false },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.12" },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.28.1" },
                android: { supported: true, version: "11.16.0" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.5.2-exp.7" },
                unreal: { supported: true, version: "0.4.26-weekly_2026_10_03" },
            }
        },
        angularGradients: {
            title: "Angular Gradients",
            runtimes: {
                webWebGL2: { supported: true, version: "2.45.1" },
                webCanvas: { supported: true, version: "2.49.0" },
                webCanvasLite: { supported: true, version: "2.49.0" },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.37.1" },
                reactCanvas: { supported: true, version: "4.38.1" },
                reactCanvasLite: { supported: true, version: "4.38.1" },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.12" },
                flutter: { supported: true, version: "0.15.0-dev.4", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.29.0" },
                android: { supported: true, version: "11.15.0" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.5.2-exp.6" },
                unreal: { supported: true, version: "0.4.26-weekly_2026_10_31" },
            }
        },
        additiveStrength: {
            title: "Additive Blending",
            runtimes: {
                webWebGL2: { supported: true, version: "2.49.1" },
                webCanvas: { supported: true, partial: true, version: "2.49.2", note: "Any strength above 0% draws at 100%" },
                webCanvasLite: { supported: true, partial: true, version: "2.49.2", note: "Any strength above 0% draws at 100%" },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.1" },
                reactCanvas: { supported: true, partial: true, version: "4.38.1", note: "Any strength above 0% draws at 100%" },
                reactCanvasLite: { supported: true, partial: true, version: "4.38.1", note: "Any strength above 0% draws at 100%" },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.5.13" },
                flutter: { supported: true, version: "0.15.0-dev.3", note: "Rive Renderer only" },
                apple: { supported: true, version: "6.28.0" },
                android: { supported: true, version: "11.16.1" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.5.2-exp.9" },
                unreal: { supported: true, version: "0.4.26-weekly_2026_09_26" },
            }
        },
        gamepad: {
            title: "Gamepad",
            runtimes: {
                webCanvas: { supported: true, version: "2.48.0+" },
                webCanvasLite: { supported: true, version: "2.48.0+" },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.48.0+" },
                reactCanvas: { supported: true, version: "4.38.0+" },
                reactCanvasLite: { supported: true, version: "4.38.0+" },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.38.0+" },
                cpp: { supported: true },
            }
        },
        textInput: {
            title: "Text Input",
            link: "/editor/text/text-input",
            runtimes: {
                webCanvas: { supported: true, version: "2.44.0" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.44.0" },
                reactCanvas: { supported: true, version: "4.36.0" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.36.0" },
                flutter: { supported: true, version: "0.15.0-dev.3" },
                cpp: { supported: true },
                unreal: { supported: true, version: "0.4.26" }
            }
        },
        focus: {
            title: "Focus",
            link: "/editor/accessibility/focus",
            runtimes: {
                webCanvas: { supported: true, version: "2.44.0+" },
                webCanvasLite: { supported: true, version: "2.44.0+" },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.44.0+" },
                reactCanvas: { supported: true, version: "4.36.0+" },
                reactCanvasLite: { supported: true, version: "4.36.0+" },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.36.0+" },
                flutter: { supported: true, version: "0.15.0-dev.3" },
                apple: { supported: true, partial: true, version: "6.30.0", note: "Swift Concurrency API. Native navigation varies by platform" },
                cpp: { supported: true },
            }
        },
        statefulComponents: {
            title: "Stateful Components",
            runtimes: {
                webCanvas: { supported: true, version: "2.33.0+" },
                webCanvasLite: { supported: true, version: "2.33.0+" },
                webWebGL: { supported: true, version: "2.33.0+" },
                webWebGL2: { supported: true, version: "2.33.0+" },
                reactCanvas: { supported: true, version: "4.25.0+" },
                reactCanvasLite: { supported: true, version: "4.25.0+" },
                reactWebGL: { supported: true, version: "4.25.0+" },
                reactWebGL2: { supported: true, version: "4.25.0+" },
                reactNative: { supported: true, version: "0.3.1+" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true, version: "0.14.1+" },
                apple: { supported: true, version: "6.16.0+" },
                android: { supported: true, version: "11.2.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.4.5" },
                unreal: { supported: true, version: "0.4.25" }
            }
        },
        gpuCanvas: {
            title: "GPU Canvas",
            runtimes: {
                webCanvas: { supported: false, na: true },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.42.0+" },
                reactCanvas: { supported: false, na: true },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.34.0+" },
                reactNative: { supported: true, version: "0.5.3+" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true, version: "0.15.0-dev.1" },
                apple: { supported: true, version: "6.25.0" },
                android: { supported: true, version: "11.12.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.5.2-exp.8" },
                unreal: { supported: true, version: "0.4.26" }
            }
        },
        globalViewModels: {
            title: "Global View Models",
            link: "/editor/data-binding/view-models#global-view-model-instances",
            runtimes: {
                webCanvas: { supported: true, version: "2.39.2+" },
                webCanvasLite: { supported: true, version: "2.39.2+" },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.39.2+" },
                reactCanvas: { supported: true, version: "4.31.0+" },
                reactCanvasLite: { supported: true, version: "4.31.0+" },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.31.0+" },
                reactNativeLegacy: { supported: false },
                apple: { supported: true, version: "6.28.0+" },
                android: { supported: true, version: "11.11.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.4.5-canary.34+" },
            }
        },
        dataBindingFonts: {
            title: "Data Binding Fonts",
            link: "/runtimes/data-binding",
            runtimes: {
                webCanvas: { supported: true, version: "2.39.2+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.39.2+" },
                reactCanvas: { supported: true, version: "4.31.0+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.31.0+" },
                reactNativeLegacy: { supported: false },
                apple: { supported: true, version: "6.28.0+" },
                android: { supported: true, version: "11.13.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.4.5-canary.36+" },
            }
        },
        semantics: {
            title: "Semantics",
            link: "/editor/accessibility/semantics",
            runtimes: {
                webCanvas: { supported: true, version: "2.39.0+" },
                webCanvasLite: { supported: true, version: "2.39.0+" },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.39.0+" },
                reactCanvas: { supported: true, version: "4.30.0+" },
                reactCanvasLite: { supported: true, version: "4.30.0+" },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.30.0+" },
                reactNative: { supported: true, version: "0.5.0+", note: "iOS only" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true, version: "0.15.0" },
                apple: { supported: true, version: "6.21.0" },
                android: { supported: true, version: "11.10.0+" },
                cpp: { supported: true },
                unity: { supported: false },
                unreal: { supported: false }
            }
        },
        scripting: {
            title: "Scripting",
            link: "/scripting",
            runtimes: {
                webCanvas: { supported: true, version: "2.34.0+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.34.0+" },
                webWebGL2: { supported: true, version: "2.34.0+" },
                reactCanvas: { supported: true, version: "4.26.0+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.26.0+" },
                reactWebGL2: { supported: true, version: "4.26.0+" },
                reactNative: { supported: true, version: "0.1.5+" },
                reactNativeLegacy: { supported: true, version: "9.8.0+" },
                flutter: { supported: true, version: "0.14.1" },
                apple: { supported: true, version: "6.13.0+" },
                android: { supported: true, version: "11.1.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.4.1-canary.33+" },
                unreal: { supported: true, version: "0.4.20+" }
            }
        },
        dataBindingListsImagesArtboards: {
            title: "Data Binding - Lists, Images, and Artboards",
            link: "/runtimes/data-binding",
            runtimes: {
                webCanvas: { supported: true, version: "2.30.3+" },
                webCanvasLite: { supported: true, version: "2.30.3+" },
                webWebGL: { supported: true, version: "2.30.3+" },
                webWebGL2: { supported: true, version: "2.30.3+" },
                reactCanvas: { supported: true, version: "4.22.0+" },
                reactCanvasLite: { supported: true, version: "4.22.0+" },
                reactWebGL: { supported: true, version: "4.22.0+" },
                reactWebGL2: { supported: true, version: "4.22.0+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.11.0+" },
                android: { supported: true, version: "10.4.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.3.7-canary.142" },
                unreal: { supported: true }
            }
        },
        rightToLeftLayoutsText: {
            title: "Right to Left Layouts & Text",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.7+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.26.7+" },
                webWebGL2: { supported: true, version: "2.26.7+" },
                reactCanvas: { supported: true, version: "4.18.6+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.18.6+" },
                reactWebGL2: { supported: true, version: "4.18.6+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.2.1+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.7.4+" },
                android: { supported: true, version: "10.0.4" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.3.5+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        textFollowPath: {
            title: "Text Follow Path",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.7+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.26.7+" },
                webWebGL2: { supported: true, version: "2.26.7+" },
                reactCanvas: { supported: true, version: "4.18.6+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.18.6+" },
                reactWebGL2: { supported: true, version: "4.18.6+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.2.1+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.7.4+" },
                android: { supported: true, version: "10.0.4" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.3.5+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        dataBinding: {
            title: "Data Binding",
            link: "/runtimes/data-binding",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.6+" },
                webCanvasLite: { supported: true, version: "2.26.6+" },
                webWebGL: { supported: true, version: "2.26.6+" },
                webWebGL2: { supported: true, version: "2.26.6+" },
                reactCanvas: { supported: true, version: "4.20.0+" },
                reactCanvasLite: { supported: true, version: "4.20.0+" },
                reactWebGL: { supported: true, version: "4.20.0+" },
                reactWebGL2: { supported: true, version: "4.20.0+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.3.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.8.0+" },
                android: { supported: true, version: "10.1.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.3.6-canary.27" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        vectorFeathering: {
            title: "Vector Feathering",
            runtimes: {
                webWebGL2: { supported: true, version: "2.26.0+" },
                webCanvas: { supported: true, partial: true, version: "2.44.1+", note: "No dithering" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.18.0+" },
                reactCanvas: { supported: true, partial: true, version: "4.37.0+", note: "No dithering" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: false },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.0.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.6.0+" },
                android: { supported: true, version: "10.0.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.3.3-canary.72+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        nSlicing: {
            title: "N-Slicing",
            link: "/editor/layouts/n-slicing",
            runtimes: {
                webCanvas: { supported: true, version: "2.23.11+" },
                webCanvasLite: { supported: true, version: "2.23.11+" },
                webWebGL: { supported: true, version: "2.23.11+" },
                webWebGL2: { supported: true, version: "2.23.11+" },
                reactCanvas: { supported: true, version: "4.16.7+" },
                reactCanvasLite: { supported: true, version: "4.16.7+" },
                reactWebGL: { supported: true, version: "4.16.7+" },
                reactWebGL2: { supported: true, version: "4.16.7+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.2.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.4.0+" },
                android: { supported: true, version: "9.12.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.2.2-canary.22+" },
                unreal: { supported: true, version: "0.2.2+" }
            }
        },
        layouts: {
            title: "Layouts",
            link: "/editor/layouts/layouts-overview",
            runtimes: {
                webWebGL2: { supported: true, version: "2.23.3+" },
                webCanvas: { supported: true, version: "2.23.3+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.23.3+" },
                reactCanvas: { supported: true, version: "4.16.0+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.16.0+" },
                reactWebGL2: { supported: true, version: "4.16.0+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.1.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                apple: { supported: true, version: "6.3.0+" },
                android: { supported: true, version: "9.10.0+" },
                cpp: { supported: true },
                unity: { supported: true, version: "0.2.1+" },
                unreal: { supported: true, version: "0.2.1+" }
            }
        },
        fallbackFonts: {
            title: "Fallback Fonts",
            link: "/runtimes/text#fallback-fonts",
            runtimes: {
                webCanvas: { supported: true, version: "2.37.1+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: false },
                webWebGL2: { supported: true, version: "2.37.1+" },
                reactCanvas: { supported: true, version: "4.28.0+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: false },
                reactWebGL2: { supported: true, version: "4.28.0+" },
                reactNative: { supported: true, version: "0.2.7+" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: false },
                apple: { supported: true, version: "6.1.0+" },
                android: { supported: true, version: "9.7.0+" },
                cpp: { supported: true },
                unity: { supported: false },
                unreal: { supported: false }
            }
        },
        nestedText: {
            title: "Nested Text (deprecated)",
            link: "/runtimes/text#read-update-nested-text-runs-at-runtime",
            runtimes: {
                webCanvas: { supported: true, version: "2.21.0+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.21.0+" },
                webWebGL2: { supported: true, version: "2.11.0+" },
                reactCanvas: { supported: true, version: "4.14.0+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.14.0+" },
                reactWebGL2: { supported: true, version: "4.14.0+" },
                reactNative: { supported: false, note: "Supported in 0.1.4–0.4.x; removed in 0.5.0+" },
                reactNativeLegacy: { supported: true, version: "5.8.2+" },
                flutter: { supported: true, version: "0.13.7+" },
                apple: { supported: true, version: "6.1.0+" },
                android: { supported: true, version: "9.8.0+" },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: true, version: "0.1.14+" }
            }
        },
        audio: {
            title: "Audio",
            link: "/editor/events/audio-events",
            runtimes: {
                webCanvas: { supported: true, version: "2.15.6+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.15.6+" },
                webWebGL2: { supported: true, version: "2.15.6+" },
                reactCanvas: { supported: true, version: "4.9.5+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.9.5+" },
                reactWebGL2: { supported: true, version: "4.9.5+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "7.0.3+" },
                flutter: { supported: true, version: "0.13.4+" },
                apple: { supported: true, version: "5.11.5+" },
                android: { supported: true, version: "9.3.5+" },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: true }
            }
        },
        outOfBandAssets: {
            title: "Out-of-band Assets",
            link: "/runtimes/loading-assets",
            runtimes: {
                webCanvas: { supported: true, version: "2.7.0+" },
                webCanvasLite: { supported: true, version: "2.7.0+"},
                webWebGL: { supported: true, version: "2.7.0+" },
                webWebGL2: { supported: true, version: "2.11.0+" },
                reactCanvas: { supported: true, version: "4.5.0+" },
                reactCanvasLite: { supported: true, version: "4.5.0+" },
                reactWebGL: { supported: true, version: "4.5.0+" },
                reactWebGL2: { supported: true, version: "4.5.0+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.4.0+" },
                flutter: { supported: true, version: "0.12.0+" },
                apple: { supported: true, version: "5.7.0+" },
                android: { supported: true, version: "8.6.1+" },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: false }
            }
        },
        events: {
            title: "Events (deprecated)",
            link: "/runtimes/rive-events",
            runtimes: {
                webCanvas: { supported: true, version: "2.4.3+" },
                webCanvasLite: { supported: true, version: "2.4.3+" },
                webWebGL: { supported: true, version: "2.4.3+" },
                webWebGL2: { supported: true, version: "2.11.0+" },
                reactCanvas: { supported: true, version: "4.3.3+" },
                reactCanvasLite: { supported: true, version: "4.3.3+" },
                reactWebGL: { supported: true, version: "4.3.3+" },
                reactWebGL2: { supported: true, version: "4.3.3+" },
                reactNative: { supported: false, note: "Supported in 0.1.4–0.4.x; removed in 0.5.0+" },
                reactNativeLegacy: { supported: true, version: "6.1.0+" },
                flutter: { supported: true, version: "0.11.17+" },
                apple: { supported: true, version: "5.3.1+" },
                android: { supported: false, note: "Deprecated and will be removed in future versions" },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: true }
            }
        },
        text: {
            title: "Text",
            link: "/runtimes/text",
            runtimes: {
                webCanvas: { supported: true, version: "2.1.3+" },
                webCanvasLite: { supported: false, na: true },
                webWebGL: { supported: true, version: "2.1.3+" },
                webWebGL2: { supported: true, version: "2.11.0+" },
                reactCanvas: { supported: true, version: "4.1.3+" },
                reactCanvasLite: { supported: false, na: true },
                reactWebGL: { supported: true, version: "4.1.3+" },
                reactWebGL2: { supported: true, version: "4.1.3+" },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: true, version: "6.0.3+" },
                flutter: { supported: true, version: "0.11.14+" },
                apple: { supported: true, version: "5.1.5+" },
                android: { supported: true, version: "8.1.3+" },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: true }
            }
        },
        cachingARiveFile: {
            title: "Caching a Rive File",
            link: "/runtimes/caching-a-rive-file",
            runtimes: {
                webCanvas: { supported: true },
                webCanvasLite: { supported: true },
                webWebGL: { supported: true },
                webWebGL2: { supported: true, version: "2.11.0+" },
                reactCanvas: { supported: true },
                reactCanvasLite: { supported: true },
                reactWebGL: { supported: true },
                reactWebGL2: { supported: true },
                reactNative: { supported: true, version: "0.1.4+" },
                reactNativeLegacy: { supported: false },
                flutter: { supported: true },
                apple: { supported: true },
                android: { supported: true },
                cpp: { supported: true },
                unity: { supported: true },
                unreal: { supported: false }
            }
        }
    }

    // Renders a single version cell. Any `note` is shown in the Notes column.
    // Set `partial: true` (with a `note` describing the limitation) for features
    // that are supported with caveats; they show a yellow icon instead of a check.
    // Leave a runtime out of a feature's `runtimes` until it is supported there.
    const renderSupportCell = (support) => {
        if (!support) {
            return <td>—</td>
        }
        const { supported, partial, version, na } = support
        if (na) {
            return <td>N/A</td>
        }
        if (!supported) {
            return <td>Not supported</td>
        }
        const icon = partial ? '🟡 ' : '✅ '
        if (version) {
            return (
                <td data-numeric="true">
                    {icon}
                    <code>{version.endsWith('+') ? version : `${version}+`}</code>
                </td>
            )
        }
        return (
            <td>
                {icon}
                Supported
            </td>
        )
    }

    // Compares version strings like "2.44.0", "6.28.0+", "0.15.0-dev.4", and
    // "0.4.26-weekly_2026_10_03". A trailing "+" is ignored. Anything after
    // major.minor.patch is treated as a pre-release, which sorts before the release.
    const compareVersions = (a, b) => {
        const parse = (version) => {
            const match = version.replace(/\+$/, '').match(/^(\d+)\.(\d+)\.(\d+)(.*)$/)
            if (!match) {
                return { core: [0, 0, 0], pre: version.split(/[.\-_]/).filter(Boolean) }
            }
            const [, major, minor, patch, rest] = match
            return {
                core: [Number(major), Number(minor), Number(patch)],
                pre: rest.split(/[.\-_]/).filter(Boolean),
            }
        }
        const left = parse(a)
        const right = parse(b)
        for (let i = 0; i < 3; i++) {
            if (left.core[i] !== right.core[i]) {
                return left.core[i] - right.core[i]
            }
        }
        if (left.pre.length === 0 || right.pre.length === 0) {
            return right.pre.length - left.pre.length
        }
        for (let i = 0; i < Math.max(left.pre.length, right.pre.length); i++) {
            const l = left.pre[i]
            const r = right.pre[i]
            if (l === undefined || r === undefined) {
                return l === undefined ? -1 : 1
            }
            if (l === r) {
                continue
            }
            const bothNumeric = /^\d+$/.test(l) && /^\d+$/.test(r)
            return bothNumeric ? Number(l) - Number(r) : l.localeCompare(r)
        }
        return 0
    }

    // Sorts a runtime table: newest version first, then supported without a
    // version, then NA, then not supported. Ties sort alphabetically by title.
    const compareFeaturesForRuntime = (runtimeKey) => (aKey, bKey) => {
        const rank = (support) => {
            if (!support) return 4
            if (support.na) return 2
            if (!support.supported) return 3
            return support.version ? 0 : 1
        }
        const a = features[aKey].runtimes[runtimeKey]
        const b = features[bKey].runtimes[runtimeKey]
        const rankDifference = rank(a) - rank(b)
        if (rankDifference !== 0) {
            return rankDifference
        }
        if (rank(a) === 0) {
            const versionDifference = compareVersions(b.version, a.version)
            if (versionDifference !== 0) {
                return versionDifference
            }
        }
        return features[aKey].title.localeCompare(features[bKey].title)
    }

    // `runtime` can be a single key or an array of keys. An array renders one
    // version column per runtime, e.g. runtime={["webWebGL2", "webCanvas"]}.
    // Rows are sorted by the first runtime's versions. Runtime tables are not
    // collapsible; place them in a <Tab> and pass `title` only to label one of
    // several tables in the same tab.
    const runtimeKeys = Array.isArray(runtime) ? runtime : [runtime]
    const normalizedQuery = query.trim().toLowerCase()
    const sortedFeatureKeys = Object.keys(features)
        .filter((featureKey) => runtimeKeys.some((runtimeKey) => features[featureKey].runtimes[runtimeKey]))
        .filter((featureKey) => features[featureKey].title.toLowerCase().includes(normalizedQuery))
        .sort(compareFeaturesForRuntime(runtimeKeys[0]))
    const isMultiRuntime = runtimeKeys.length > 1
    // Drop the platform prefix in column headers ("Web - Canvas" -> "Canvas")
    const columnTitle = (runtimeKey) => runtimeTitles[runtimeKey].split(' - ').pop()

    // In multi-runtime tables, each note is prefixed with the columns it applies
    // to, e.g. "Canvas, Canvas Lite: Draws undeformed".
    const renderNotes = (currentFeature) => {
        const columnsByNote = new Map()
        runtimeKeys.forEach((runtimeKey) => {
            const support = currentFeature.runtimes[runtimeKey]
            if (support && support.note) {
                columnsByNote.set(support.note, [...(columnsByNote.get(support.note) || []), columnTitle(runtimeKey)])
            }
        })
        return (
            <td>
                {[...columnsByNote].map(([note, columns]) => (
                    <div>{isMultiRuntime ? `${columns.join(', ')}: ${note}` : note}</div>
                ))}
            </td>
        )
    }

    return (
        <div>
            {title && <p><strong>{title}</strong></p>}
            {children}
            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter features"
                aria-label="Filter features"
                className="mt-4 w-full rounded-lg border border-gray-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <div
                data-table-wrapper="true"
                className="[--page-padding:20px] overflow-x-auto flex my-[1em] py-[1em] max-w-none [contain:inline-size]"
            >
                <div
                    className="px-[var(--page-padding)] grow max-w-none table"
                >
                    <table
                        className="m-0 min-w-full w-full max-w-none [&amp;_td]:min-w-[150px] [&amp;_th]:text-left [&amp;_td[data-numeric]]:tabular-nums"
                    >
                        <thead className="w-full">
                            <tr>
                                <th>
                                    <strong>Feature</strong>
                                </th>
                                {
                                    runtimeKeys.map((runtimeKey) => (
                                        <th>
                                            <strong>{isMultiRuntime ? columnTitle(runtimeKey) : 'Version'}</strong>
                                        </th>
                                    ))
                                }
                                <th>
                                    <strong>Notes</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                sortedFeatureKeys.map((featureKey) => {
                                    const currentFeature = features[featureKey]
                                    return (
                                        <tr>
                                            <td>{currentFeature.link ? <a href={currentFeature.link}>{currentFeature.title}</a> : currentFeature.title}</td>
                                            {runtimeKeys.map((runtimeKey) => renderSupportCell(currentFeature.runtimes[runtimeKey]))}
                                            {renderNotes(currentFeature)}
                                        </tr>
                                    )
                                })
                            }
                            {
                                sortedFeatureKeys.length === 0 && (
                                    <tr>
                                        <td colSpan={runtimeKeys.length + 2}>No features match "{query}"</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
