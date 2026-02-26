
export const FeatureSupportGroup = ({
    feature,
    runtime,
    children
}) => {
    // All accordions are expanded by default
    const defaultOpen = false;

    const runtimeTitles = {
        webCanvas: "Web Canvas",
        webWebGL: "Web WebGL (Legacy)",
        webWebGL2: "Web WebGL2",
        reactCanvas: "React Canvas",
        reactWebGL: "React WebGL (Legacy)",
        reactWebGL2: "React WebGL2",
        reactNative: "React Native",
        reactNativeLegacy: "React Native (Legacy)",
        flutter: "Flutter",
        flutterRiveNative: "Flutter (rive_native)",
        apple: "Apple",
        android: "Android",
        cpp: "C++",
        unity: "Unity",
        unreal: "Unreal",
    }

    // Do not include legacy runtimes
    const runtimesInOrder = [
        "webWebGL2",
        "webCanvas",
        "reactWebGL2",
        "reactCanvas",
        "reactNative",
        "flutter",
        "flutterRiveNative",
        "apple",
        "android",
        "cpp",
        "unity",
        "unreal",
        "webWebGL",
        "reactWebGL",
        "reactNativeLegacy",
    ]

    const legacyRuntimes = [
        "webWebGL",
        "reactWebGL",
        "reactNativeLegacy",
    ]

    const featuresInOrder = [
        "scripting",
        "dataBindingListsImagesArtboards",
        "rightToLeftLayoutsText",
        "textFollowPath",
        "dataBinding",
        "vectorFeathering",
        "nSlicing",
        "layouts",
        "fallbackFonts",
        "randomization",
        "audio",
        "outOfBandAssets",
        "text",
        "followPath",
        "interpolationOnStates",
        "joysticks",
        "solos",
        "speedOnStates",
        "graphEditor",
        "listeners",
        "meshDeformation",
        "cachingARiveFile",
        "rasterAssets",
        "events",
        "nestedText",
    ]

    const legacyFeatures = [
        "events",
        "nestedText",
    ]

    const features = {
        scripting: {
            title: "Scripting",
            runtimes: {
                webCanvas: { supported: true, version: "2.34.0+" },
                webWebGL: { supported: true, version: "2.34.0+" },
                webWebGL2: { supported: true, version: "2.34.0+" },
                reactCanvas: { supported: true, version: "4.26.0+" },
                reactWebGL: { supported: true, version: "4.26.0+" },
                reactWebGL2: { supported: true, version: "4.26.0+" },
                reactNative: { supported: true, version: "v0.1.5+" },
                reactNativeLegacy: { supported: true, version: "v9.8.0+" },
                flutter: { supported: true, version: "0.14.1" },
                flutterRiveNative: { supported: true, version: "0.1.1" },
                apple: { supported: true, version: "v6.13.0+" },
                android: { supported: true, version: "v11.1.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "v0.4.1-canary.33+" },
                unreal: { supported: true, version: "v0.4.20+" }
            }
        },
        dataBindingListsImagesArtboards: {
            title: "Data Binding - Lists, Images, and Artboards",
            runtimes: {
                webCanvas: { supported: true, version: "2.30.3+" },
                webWebGL: { supported: true, version: "2.30.3+" },
                webWebGL2: { supported: true, version: "2.30.3+" },
                reactCanvas: { supported: true, version: "4.22.0+" },
                reactWebGL: { supported: true, version: "4.22.0+" },
                reactWebGL2: { supported: true, version: "4.22.0+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: false, description: "Not yet supported" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "0.0.4" },
                apple: { supported: true, version: "v6.11.0+" },
                android: { supported: true, version: "v10.4.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "v0.3.7-canary.142" },
                unreal: { supported: false, description: "Not yet supported" }
            }
        },
        rightToLeftLayoutsText: {
            title: "Right to Left Layouts & Text",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.7+" },
                webWebGL: { supported: true, version: "2.26.7+" },
                webWebGL2: { supported: true, version: "2.26.7+" },
                reactCanvas: { supported: true, version: "4.18.6+" },
                reactWebGL: { supported: true, version: "4.18.6+" },
                reactWebGL2: { supported: true, version: "4.18.6+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.2.1+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "v0.0.1-dev.7+" },
                apple: { supported: true, version: "6.7.4+" },
                android: { supported: true, version: "10.0.4" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.3.5+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        textFollowPath: {
            title: "Text Follow Path",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.7+" },
                webWebGL: { supported: true, version: "2.26.7+" },
                webWebGL2: { supported: true, version: "2.26.7+" },
                reactCanvas: { supported: true, version: "4.18.6+" },
                reactWebGL: { supported: true, version: "4.18.6+" },
                reactWebGL2: { supported: true, version: "4.18.6+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.2.1+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "v0.0.1-dev.7+" },
                apple: { supported: true, version: "6.7.4+" },
                android: { supported: true, version: "10.0.4" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.3.5+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        dataBinding: {
            title: "Data Binding",
            runtimes: {
                webCanvas: { supported: true, version: "2.26.6+" },
                webWebGL: { supported: true, version: "2.26.6+" },
                webWebGL2: { supported: true, version: "2.26.6+" },
                reactCanvas: { supported: true, version: "4.20.0+" },
                reactWebGL: { supported: true, version: "4.20.0+" },
                reactWebGL2: { supported: true, version: "4.20.0+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.3.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.8+" },
                apple: { supported: true, version: "6.8.0+" },
                android: { supported: true, version: "10.1.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.3.6-canary.27" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        vectorFeathering: {
            title: "Vector Feathering",
            runtimes: {
                webWebGL2: { supported: true, version: "2.26.0+" },
                webCanvas: { supported: false, description: "Not supported" },
                webWebGL: { supported: false, description: "Not supported" },
                reactWebGL2: { supported: true, version: "4.18.0+" },
                reactCanvas: { supported: false, description: "Not supported" },
                reactWebGL: { supported: false, description: "Not supported" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "9.0.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "6.6.0+" },
                android: { supported: true, version: "10.0.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.3.3-canary.72+" },
                unreal: { supported: true, version: "0.3.0a-gh" }
            }
        },
        nSlicing: {
            title: "N-Slicing",
            runtimes: {
                webCanvas: { supported: true, version: "2.23.11+" },
                webWebGL: { supported: true, version: "2.23.11+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.16.7+" },
                reactWebGL: { supported: true, version: "4.16.7+" },
                reactWebGL2: { supported: true, version: "4.16.7+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.2.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "6.4.0+" },
                android: { supported: true, version: "9.12.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.2.2-canary.22+" },
                unreal: { supported: true, version: "0.2.2+" }
            }
        },
        layouts: {
            title: "Layouts",
            runtimes: {
                webWebGL2: { supported: true, description: "Supported" },
                webCanvas: { supported: true, version: "2.23.3+" },
                webWebGL: { supported: true, version: "2.23.3+" },
                reactCanvas: { supported: true, version: "4.16.0+" },
                reactWebGL: { supported: true, version: "4.16.0+" },
                reactWebGL2: { supported: true, version: "4.16.0+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.1.0+" },
                flutter: { supported: true, version: "0.14.0-dev.1" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "6.3.0+" },
                android: { supported: true, version: "9.10.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, version: "0.2.1+" },
                unreal: { supported: true, version: "0.2.1+" }
            }
        },
        fallbackFonts: {
            title: "Fallback Fonts",
            runtimes: {
                webCanvas: { supported: false, description: "Not yet supported" },
                webWebGL: { supported: false, description: "Not yet supported" },
                webWebGL2: { supported: false, description: "Not yet supported" },
                reactCanvas: { supported: false, description: "Not yet supported" },
                reactWebGL: { supported: false, description: "Not yet supported" },
                reactWebGL2: { supported: false, description: "Not yet supported" },
                reactNative: { supported: false, description: "Not yet supported" },
                reactNativeLegacy: { supported: false, description: "Not yet supported" },
                flutter: { supported: false, description: "Not yet supported" },
                flutterRiveNative: { supported: false, description: "Not yet supported" },
                apple: { supported: true, version: "6.1.0+" },
                android: { supported: true, version: "9.7.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: false, description: "Not supported" },
                unreal: { supported: false, description: "Not Supported" }
            }
        },
        nestedText: {
            title: "Nested Text (deprecated)",
            runtimes: {
                webCanvas: { supported: true, version: "2.21.0+" },
                webWebGL: { supported: true, version: "2.21.0+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.14.0+" },
                reactWebGL: { supported: true, version: "4.14.0+" },
                reactWebGL2: { supported: true, version: "4.14.0+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "5.8.2+" },
                flutter: { supported: true, version: "0.13.7+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "6.1.0+" },
                android: { supported: true, version: "9.8.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, version: "0.1.14+" }
            }
        },
        randomization: {
            title: "Randomization",
            runtimes: {
                webCanvas: { supported: true, version: "2.15.6+" },
                webWebGL: { supported: true, version: "2.15.6+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.9.5+" },
                reactWebGL: { supported: true, version: "4.9.5+" },
                reactWebGL2: { supported: true, version: "4.9.5+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "7.0.3+" },
                flutter: { supported: true, version: "0.13.4+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "5.11.5+" },
                android: { supported: true, version: "9.3.5+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        audio: {
            title: "Audio",
            runtimes: {
                webCanvas: { supported: true, version: "2.15.6+" },
                webWebGL: { supported: true, version: "2.15.6+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.9.5+" },
                reactWebGL: { supported: true, version: "4.9.5+" },
                reactWebGL2: { supported: true, version: "4.9.5+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "7.0.3+" },
                flutter: { supported: true, version: "0.13.4+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "5.11.5+" },
                android: { supported: true, version: "9.3.5+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        outOfBandAssets: {
            title: "Out-of-band Assets",
            runtimes: {
                webCanvas: { supported: true, version: "2.7.0+" },
                webWebGL: { supported: true, version: "2.7.0+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.5.0+" },
                reactWebGL: { supported: true, version: "4.5.0+" },
                reactWebGL2: { supported: true, version: "4.5.0+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "8.4.0+" },
                flutter: { supported: true, version: "0.12.0+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "5.7.0+" },
                android: { supported: true, version: "8.6.1+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, version: "0.1.14+" }
            }
        },
        events: {
            title: "Events (deprecated)",
            runtimes: {
                webCanvas: { supported: true, version: "2.4.3+" },
                webWebGL: { supported: true, version: "2.4.3+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.3.3+" },
                reactWebGL: { supported: true, version: "4.3.3+" },
                reactWebGL2: { supported: true, version: "4.3.3+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "6.1.0+" },
                flutter: { supported: true, version: "0.11.17+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "5.3.1+" },
                android: { supported: false, description: "Deprecated and will be removed in future versions" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        text: {
            title: "Text",
            runtimes: {
                webCanvas: { supported: true, version: "2.1.3+" },
                webWebGL: { supported: true, version: "2.1.3+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "4.1.3+" },
                reactWebGL: { supported: true, version: "4.1.3+" },
                reactWebGL2: { supported: true, version: "4.1.3+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "6.0.3+" },
                flutter: { supported: true, version: "0.11.14+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "5.1.5+" },
                android: { supported: true, version: "8.1.3+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        followPath: {
            title: "Follow Path",
            runtimes: {
                webCanvas: { supported: true, version: "1.2.4+" },
                webWebGL: { supported: true, version: "1.2.4+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.55+" },
                reactWebGL: { supported: true, version: "3.0.55+" },
                reactWebGL2: { supported: true, version: "3.0.55+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "5.0.0+" },
                flutter: { supported: true, version: "0.11.6+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "4.0.5+" },
                android: { supported: true, version: "6.0.1+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        interpolationOnStates: {
            title: "Interpolation on States",
            runtimes: {
                webCanvas: { supported: true, version: "1.2.1+" },
                webWebGL: { supported: true, version: "1.2.1+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.54+" },
                reactWebGL: { supported: true, version: "3.0.54+" },
                reactWebGL2: { supported: true, version: "3.0.54+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "4.1.2+" },
                flutter: { supported: true, version: "0.11.4+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "4.0.4+" },
                android: { supported: true, version: "5.1.5+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        joysticks: {
            title: "Joysticks",
            runtimes: {
                webCanvas: { supported: true, version: "1.1.9+" },
                webWebGL: { supported: true, version: "1.1.9+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.49+" },
                reactWebGL: { supported: true, version: "3.0.49+" },
                reactWebGL2: { supported: true, version: "3.0.49+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "4.1.0+" },
                flutter: { supported: true, version: "0.11.1+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "4.0.1+" },
                android: { supported: true, version: "5.0.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        solos: {
            title: "Solos",
            runtimes: {
                webCanvas: { supported: true, version: "1.1.2+" },
                webWebGL: { supported: true, version: "1.1.2+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.42+" },
                reactWebGL: { supported: true, version: "3.0.42+" },
                reactWebGL2: { supported: true, version: "3.0.42+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "4.0.4+" },
                flutter: { supported: true, version: "0.10.4+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "3.1.9+" },
                android: { supported: true, version: "4.4.0+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        speedOnStates: {
            title: "Speed on States",
            runtimes: {
                webCanvas: { supported: true, version: "1.0.102+" },
                webWebGL: { supported: true, version: "1.0.98+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.38+" },
                reactWebGL: { supported: true, version: "3.0.38+" },
                reactWebGL2: { supported: true, version: "3.0.38+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "4.0.1+" },
                flutter: { supported: true, version: "0.10.3+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "3.1.7+" },
                android: { supported: true, version: "4.2.7+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        graphEditor: {
            title: "Graph Editor",
            runtimes: {
                webCanvas: { supported: true, version: "1.0.97+" },
                webWebGL: { supported: true, version: "1.0.93+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.34+" },
                reactWebGL: { supported: true, version: "3.0.34+" },
                reactWebGL2: { supported: true, version: "3.0.34+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "4.0.1+" },
                flutter: { supported: true, version: "0.10.0+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "3.1.3+" },
                android: { supported: true, version: "4.2.2+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        listeners: {
            title: "Listeners",
            runtimes: {
                webCanvas: { supported: true, version: "1.0.65+" },
                webWebGL: { supported: true, version: "1.0.62+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.6+" },
                reactWebGL: { supported: true, version: "3.0.6+" },
                reactWebGL2: { supported: true, version: "3.0.6+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "3.0.38+" },
                flutter: { supported: true, version: "0.9.0+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "2.0.21+" },
                android: { supported: true, version: "3.0.8+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        meshDeformation: {
            title: "Mesh Deformation",
            runtimes: {
                webCanvas: { supported: true, version: "1.0.47+" },
                webWebGL: { supported: true, version: "1.0.44+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "3.0.1+" },
                reactWebGL: { supported: true, version: "3.0.1+" },
                reactWebGL2: { supported: true, version: "3.0.1+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "2.1.37+" },
                flutter: { supported: true, version: "0.8.4+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "1.0.18+" },
                android: { supported: true, version: "2.0.24+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        },
        cachingARiveFile: {
            title: "Caching a Rive File",
            runtimes: {
                webCanvas: { supported: true, description: "Supported" },
                webWebGL: { supported: true, description: "Supported" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, description: "Supported" },
                reactWebGL: { supported: true, description: "Supported" },
                reactWebGL2: { supported: true, description: "Supported" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: false, description: "Not yet supported" },
                flutter: { supported: true, description: "Supported" },
                flutterRiveNative: { supported: true, description: "Supported" },
                apple: { supported: true, description: "Supported" },
                android: { supported: true, description: "Supported" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: false, description: "Not yet supported" }
            }
        },
        rasterAssets: {
            title: "Raster Assets",
            runtimes: {
                webCanvas: { supported: true, version: "1.0.2+" },
                webWebGL: { supported: true, version: "1.0.2+" },
                webWebGL2: { supported: true, description: "Supported" },
                reactCanvas: { supported: true, version: "0.0.28+" },
                reactWebGL: { supported: true, version: "0.0.28+" },
                reactWebGL2: { supported: true, version: "0.0.28+" },
                reactNative: { supported: true, version: "v0.1.4+" },
                reactNativeLegacy: { supported: true, version: "2.1.36+" },
                flutter: { supported: true, version: "0.8.1+" },
                flutterRiveNative: { supported: true, version: "0.0.1-dev.6" },
                apple: { supported: true, version: "1.0.1+" },
                android: { supported: true, version: "2.0.5+" },
                cpp: { supported: true, description: "Supported" },
                unity: { supported: true, description: "Supported" },
                unreal: { supported: true, description: "Supported" }
            }
        }
    }

    if (runtime) {
        const allFeaturesSupported = featuresInOrder
            .filter((featureKey) => !legacyFeatures.includes(featureKey))
            .every((featureKey) => {
            const currentFeature = features[featureKey]
            const runtimeFeatureSupport = currentFeature.runtimes[runtime]
            return runtimeFeatureSupport && runtimeFeatureSupport.supported === true
        })
        const runtimeStatusEmoji = allFeaturesSupported ? '✅' : '🟡'
        const runtimeTitleWithEmoji = `${runtimeStatusEmoji} ${runtimeTitles[runtime]}`

        return (
            <Accordion title={runtimeTitleWithEmoji} defaultOpen={defaultOpen}>
                 {children}
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
                                    <th className="w-2/3">
                                        <strong>Feature</strong>
                                    </th>
                                    <th className="w-1/3">
                                        <strong>Version</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    featuresInOrder.map((featureKey) => {
                                        const currentFeature = features[featureKey]
                                        const runtimeFeatureSupport = currentFeature.runtimes[runtime]
                                        console.log(runtimeFeatureSupport)

                                        if (!runtimeFeatureSupport) {
                                            return (
                                                <tr>
                                                    <td>{currentFeature.title}</td>
                                                    <td>Unknown</td>
                                                </tr>
                                            )
                                        }

                                        const { supported, version, description } = runtimeFeatureSupport

                                        return (
                                            <tr>
                                                <td>{currentFeature.title}</td>
                                                {
                                                    version && !description && (
                                                        <td data-numeric="true">
                                                            {supported && '✅ '}
                                                            <code>{version}</code>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    description && !version && (
                                                        <td>
                                                            {supported && '✅ '}
                                                            {description}
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </Accordion>
        )
    }

    const currentFeature = features[feature]
    const allSupported = Object.entries(currentFeature.runtimes)
        .filter(([runtimeKey]) => !legacyRuntimes.includes(runtimeKey))
        .every(([, runtimeSupport]) => runtimeSupport.supported === true)
    const statusEmoji = allSupported ? '✅' : '🟡'
    const titleWithEmoji = `${statusEmoji} ${currentFeature.title}`

    return (
        <Accordion title={titleWithEmoji} defaultOpen={defaultOpen}>
            {children}
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
                                <th className="w-2/3">
                                    <strong>Runtime</strong>
                                </th>
                                <th className="w-1/3">
                                    <strong>Version</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                runtimesInOrder.map((runtimeKey) => {
                                    const currentRuntime = currentFeature.runtimes[runtimeKey]
                                    if (!currentRuntime) {
                                        return (
                                            <tr>
                                                <td>{runtimeTitles[runtimeKey]}</td>
                                                <td>Unknown</td>
                                            </tr>
                                        )
                                    }
                                    const { supported, version, description } = currentFeature.runtimes[runtimeKey]
                                    return (
                                        <tr>
                                            <td>{runtimeTitles[runtimeKey]}</td>
                                            {
                                                version && !description && (
                                                    <td data-numeric="true">
                                                        {supported && '✅ '}
                                                        <code>{version}</code>
                                                    </td>
                                                )
                                            }
                                            {
                                                description && !version && (
                                                    <td>
                                                        {supported && '✅ '}
                                                        {description}
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </Accordion>
    )
}
