
export const FeatureSupportGroup = ({
    feature,
    runtime,
    children
}) => {
    const titles = {
        webCanvas: "Web (Canvas)",
        webWebGL: "Web (WebGL)",
        webWebGL2: "Web (WebGL2)",
        reactCanvas: "React (Canvas)",
        reactWebGL: "React (WebGL)",
        reactWebGL2: "React (WebGL2)",
        reactNative: "React Native",
        reactNativeLegacy: "React Native (Legacy)",
        flutter: "Flutter",
        flutterRiveNative: "Flutter (rive_native)",
        apple: "Apple",
        android: "Android",
        androidCompose: "Android (Compose)",
        androidLegacy: "Android (Legacy)",
        cpp: "C++",
        unity: "Unity",
        unreal: "Unreal",
    }

    const features = {
        scripting: {
            title: "Scripting",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.34.0+" },
                { key: "webWebGL", supported: true, version: "2.34.0+" },
                { key: "webWebGL2", supported: true, version: "2.34.0+" },
                { key: "reactCanvas", supported: true, version: "4.26.0+" },
                { key: "reactWebGL", supported: true, version: "4.26.0+" },
                { key: "reactWebGL2", supported: true, version: "4.26.0+" },
                { key: "reactNative", supported: true, version: "v0.1.5+" },
                { key: "reactNativeLegacy", supported: true, version: "v9.8.0+" },
                { key: "flutter", supported: true, version: "0.14.1" },
                { key: "flutterRiveNative", supported: true, version: "0.1.1" },
                { key: "apple", supported: true, version: "v6.13.0+" },
                { key: "android", supported: true, version: "v11.1.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "v0.4.1-canary.33+" },
                { key: "unreal", supported: true, version: "v0.4.20+" }
            ]
        },
        dataBindingListsImagesArtboards: {
            title: "Data Binding - Lists, Images, and Artboards",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.30.3+" },
                { key: "webWebGL", supported: true, version: "2.30.3+" },
                { key: "webWebGL2", supported: true, version: "2.30.3+" },
                { key: "reactCanvas", supported: true, version: "4.22.0+" },
                { key: "reactWebGL", supported: true, version: "4.22.0+" },
                { key: "reactWebGL2", supported: true, version: "4.22.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: false, description: "Not yet supported" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "0.0.4" },
                { key: "apple", supported: true, version: "v6.11.0+" },
                { key: "android", supported: true, version: "v10.4.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "v0.3.7-canary.142" },
                { key: "unreal", supported: false, description: "Not yet supported" }
            ]
        },
        rightToLeftLayoutsText: {
            title: "Right to Left Layouts & Text",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.26.7+" },
                { key: "webWebGL", supported: true, version: "2.26.7+" },
                { key: "webWebGL2", supported: true, version: "2.26.7+" },
                { key: "reactCanvas", supported: true, version: "4.18.6+" },
                { key: "reactWebGL", supported: true, version: "4.18.6+" },
                { key: "reactWebGL2", supported: true, version: "4.18.6+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "9.2.1+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "v0.0.1-dev.7+" },
                { key: "apple", supported: true, version: "6.7.4+" },
                { key: "android", supported: true, version: "10.0.4" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.3.5+" },
                { key: "unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        textFollowPath: {
            title: "Text Follow Path",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.26.7+" },
                { key: "webWebGL", supported: true, version: "2.26.7+" },
                { key: "webWebGL2", supported: true, version: "2.26.7+" },
                { key: "reactCanvas", supported: true, version: "4.18.6+" },
                { key: "reactWebGL", supported: true, version: "4.18.6+" },
                { key: "reactWebGL2", supported: true, version: "4.18.6+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "9.2.1+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "v0.0.1-dev.7+" },
                { key: "apple", supported: true, version: "6.7.4+" },
                { key: "android", supported: true, version: "10.0.4" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.3.5+" },
                { key: "unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        dataBinding: {
            title: "Data Binding",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.26.6+" },
                { key: "webWebGL", supported: true, version: "2.26.6+" },
                { key: "webWebGL2", supported: true, version: "2.26.6+" },
                { key: "reactCanvas", supported: true, version: "4.20.0+" },
                { key: "reactWebGL", supported: true, version: "4.20.0+" },
                { key: "reactWebGL2", supported: true, version: "4.20.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "9.3.0+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.8+" },
                { key: "apple", supported: true, version: "6.8.0+" },
                { key: "android", supported: true, version: "10.1.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.3.6-canary.27" },
                { key: "unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        vectorFeathering: {
            title: "Vector Feathering",
            runtimes: [
                { key: "webWebGL2", supported: true, version: "2.26.0+" },
                { key: "webCanvas", supported: false, description: "Not supported" },
                { key: "webWebGL", supported: false, description: "Not supported" },
                { key: "reactWebGL2", supported: true, version: "4.18.0+" },
                { key: "reactCanvas", supported: false, description: "Not supported" },
                { key: "reactWebGL", supported: false, description: "Not supported" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "9.0.0+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "6.6.0+" },
                { key: "android", supported: true, version: "10.0.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.3.3-canary.72+" },
                { key: "unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        nSlicing: {
            title: "N-Slicing",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.23.11+" },
                { key: "webWebGL", supported: true, version: "2.23.11+" },
                { key: "reactCanvas", supported: true, version: "4.16.7+" },
                { key: "reactWebGL", supported: true, version: "4.16.7+" },
                { key: "reactWebGL2", supported: true, version: "4.16.7+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "8.2.0+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "6.4.0+" },
                { key: "android", supported: true, version: "9.12.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.2.2-canary.22+" },
                { key: "unreal", supported: true, version: "0.2.2+" }
            ]
        },
        layouts: {
            title: "Layouts",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.23.3+" },
                { key: "webWebGL", supported: true, version: "2.23.3+" },
                { key: "reactCanvas", supported: true, version: "4.16.0+" },
                { key: "reactWebGL", supported: true, version: "4.16.0+" },
                { key: "reactWebGL2", supported: true, version: "4.16.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "8.1.0+" },
                { key: "flutter", supported: true, version: "0.14.0-dev.1" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "6.3.0+" },
                { key: "android", supported: true, version: "9.10.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.2.1+" },
                { key: "unreal", supported: true, version: "0.2.1+" }
            ]
        },
        fallbackFonts: {
            title: "Fallback Fonts",
            runtimes: [
                { key: "webCanvas", supported: false, description: "Not yet supported" },
                { key: "webWebGL", supported: false, description: "Not yet supported" },
                { key: "reactCanvas", supported: false, description: "Not yet supported" },
                { key: "reactWebGL", supported: false, description: "Not yet supported" },
                { key: "reactWebGL2", supported: false, description: "Not yet supported" },
                { key: "reactNative", supported: false, description: "Not yet supported" },
                { key: "reactNativeLegacy", supported: false, description: "Not yet supported" },
                { key: "flutter", supported: false, description: "Not yet supported" },
                { key: "flutterRiveNative", supported: false, description: "Not yet supported" },
                { key: "apple", supported: true, version: "6.1.0+" },
                { key: "android", supported: true, version: "9.7.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: false, description: "Not supported" },
                { key: "unreal", supported: false, description: "Not Supported" }
            ]
        },
        nestedText: {
            title: "Nested Text",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.21.0+" },
                { key: "webWebGL", supported: true, version: "2.21.0+" },
                { key: "reactCanvas", supported: true, version: "4.14.0+" },
                { key: "reactWebGL", supported: true, version: "4.14.0+" },
                { key: "reactWebGL2", supported: true, version: "4.14.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "5.8.2+" },
                { key: "flutter", supported: true, version: "0.13.7+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "6.1.0+" },
                { key: "androidCompose", supported: false, description: "Unsupported" },
                { key: "androidLegacy", supported: true, version: "9.8.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, version: "0.1.14+" }
            ]
        },
        nestedInputs: {
            title: "Nested Inputs",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.17.3+" },
                { key: "webWebGL", supported: true, version: "2.17.3+" },
                { key: "reactCanvas", supported: true, version: "4.11.3+" },
                { key: "reactWebGL", supported: true, version: "4.11.3+" },
                { key: "reactWebGL2", supported: true, version: "4.11.3+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "7.2.0+" },
                { key: "flutter", supported: true, version: "0.13.7+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.13.2+" },
                { key: "androidCompose", supported: false, description: "Unsupported" },
                { key: "androidLegacy", supported: true, version: "9.4.2+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, version: "0.1.174+" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        randomization: {
            title: "Randomization",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.15.6+" },
                { key: "webWebGL", supported: true, version: "2.15.6+" },
                { key: "reactCanvas", supported: true, version: "4.9.5+" },
                { key: "reactWebGL", supported: true, version: "4.9.5+" },
                { key: "reactWebGL2", supported: true, version: "4.9.5+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "7.0.3+" },
                { key: "flutter", supported: true, version: "0.13.4+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.11.5+" },
                { key: "android", supported: true, version: "9.3.5+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        audio: {
            title: "Audio",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.15.6+" },
                { key: "webWebGL", supported: true, version: "2.15.6+" },
                { key: "reactCanvas", supported: true, version: "4.9.5+" },
                { key: "reactWebGL", supported: true, version: "4.9.5+" },
                { key: "reactWebGL2", supported: true, version: "4.9.5+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "7.0.3+" },
                { key: "flutter", supported: true, version: "0.13.4+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.11.5+" },
                { key: "android", supported: true, version: "9.3.5+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        nestedInputsAndEvents: {
            title: "Nested Inputs and Nested Events",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.7.0+" },
                { key: "webWebGL", supported: true, version: "2.7.0+" },
                { key: "reactCanvas", supported: true, version: "4.5.0+" },
                { key: "reactWebGL", supported: true, version: "4.5.0+" },
                { key: "reactWebGL2", supported: true, version: "4.5.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "6.2.0+" },
                { key: "flutter", supported: true, version: "0.12.3+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.6.0+" },
                { key: "androidCompose", supported: false, description: "Unsupported from API" },
                { key: "androidLegacy", supported: true, version: "8.7.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" }
            ]
        },
        outOfBandAssets: {
            title: "Out-of-band Assets",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.7.0+" },
                { key: "webWebGL", supported: true, version: "2.7.0+" },
                { key: "reactCanvas", supported: true, version: "4.5.0+" },
                { key: "reactWebGL", supported: true, version: "4.5.0+" },
                { key: "reactWebGL2", supported: true, version: "4.5.0+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "8.4.0+" },
                { key: "flutter", supported: true, version: "0.12.0+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.7.0+" },
                { key: "android", supported: true, version: "8.6.1+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, version: "0.1.14+" }
            ]
        },
        events: {
            title: "Events",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.4.3+" },
                { key: "webWebGL", supported: true, version: "2.4.3+" },
                { key: "reactCanvas", supported: true, version: "4.3.3+" },
                { key: "reactWebGL", supported: true, version: "4.3.3+" },
                { key: "reactWebGL2", supported: true, version: "4.3.3+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "6.1.0+" },
                { key: "flutter", supported: true, version: "0.11.17+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.3.1+" },
                { key: "androidCompose", supported: false, description: "Unsupported from API" },
                { key: "androidLegacy", supported: true, version: "8.4.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        text: {
            title: "Text",
            runtimes: [
                { key: "webCanvas", supported: true, version: "2.1.3+" },
                { key: "webWebGL", supported: true, version: "2.1.3+" },
                { key: "reactCanvas", supported: true, version: "4.1.3+" },
                { key: "reactWebGL", supported: true, version: "4.1.3+" },
                { key: "reactWebGL2", supported: true, version: "4.1.3+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "6.0.3+" },
                { key: "flutter", supported: true, version: "0.11.14+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "5.1.5+" },
                { key: "android", supported: true, version: "8.1.3+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        followPath: {
            title: "Follow Path",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.2.4+" },
                { key: "webWebGL", supported: true, version: "1.2.4+" },
                { key: "reactCanvas", supported: true, version: "3.0.55+" },
                { key: "reactWebGL", supported: true, version: "3.0.55+" },
                { key: "reactWebGL2", supported: true, version: "3.0.55+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "5.0.0+" },
                { key: "flutter", supported: true, version: "0.11.6+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "4.0.5+" },
                { key: "android", supported: true, version: "6.0.1+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        interpolationOnStates: {
            title: "Interpolation on States",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.2.1+" },
                { key: "webWebGL", supported: true, version: "1.2.1+" },
                { key: "reactCanvas", supported: true, version: "3.0.54+" },
                { key: "reactWebGL", supported: true, version: "3.0.54+" },
                { key: "reactWebGL2", supported: true, version: "3.0.54+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "4.1.2+" },
                { key: "flutter", supported: true, version: "0.11.4+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "4.0.4+" },
                { key: "android", supported: true, version: "5.1.5+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        joysticks: {
            title: "Joysticks",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.1.9+" },
                { key: "webWebGL", supported: true, version: "1.1.9+" },
                { key: "reactCanvas", supported: true, version: "3.0.49+" },
                { key: "reactWebGL", supported: true, version: "3.0.49+" },
                { key: "reactWebGL2", supported: true, version: "3.0.49+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "4.1.0+" },
                { key: "flutter", supported: true, version: "0.11.1+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "4.0.1+" },
                { key: "android", supported: true, version: "5.0.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        solos: {
            title: "Solos",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.1.2+" },
                { key: "webWebGL", supported: true, version: "1.1.2+" },
                { key: "reactCanvas", supported: true, version: "3.0.42+" },
                { key: "reactWebGL", supported: true, version: "3.0.42+" },
                { key: "reactWebGL2", supported: true, version: "3.0.42+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "4.0.4+" },
                { key: "flutter", supported: true, version: "0.10.4+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "3.1.9+" },
                { key: "android", supported: true, version: "4.4.0+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        speedOnStates: {
            title: "Speed on States",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.0.102+" },
                { key: "webWebGL", supported: true, version: "1.0.98+" },
                { key: "reactCanvas", supported: true, version: "3.0.38+" },
                { key: "reactWebGL", supported: true, version: "3.0.38+" },
                { key: "reactWebGL2", supported: true, version: "3.0.38+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "4.0.1+" },
                { key: "flutter", supported: true, version: "0.10.3+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "3.1.7+" },
                { key: "android", supported: true, version: "4.2.7+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        graphEditor: {
            title: "Graph Editor",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.0.97+" },
                { key: "webWebGL", supported: true, version: "1.0.93+" },
                { key: "reactCanvas", supported: true, version: "3.0.34+" },
                { key: "reactWebGL", supported: true, version: "3.0.34+" },
                { key: "reactWebGL2", supported: true, version: "3.0.34+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "4.0.1+" },
                { key: "flutter", supported: true, version: "0.10.0+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "3.1.3+" },
                { key: "android", supported: true, version: "4.2.2+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        listeners: {
            title: "Listeners",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.0.65+" },
                { key: "webWebGL", supported: true, version: "1.0.62+" },
                { key: "reactCanvas", supported: true, version: "3.0.6+" },
                { key: "reactWebGL", supported: true, version: "3.0.6+" },
                { key: "reactWebGL2", supported: true, version: "3.0.6+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "3.0.38+" },
                { key: "flutter", supported: true, version: "0.9.0+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "2.0.21+" },
                { key: "android", supported: true, version: "3.0.8+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        meshDeformation: {
            title: "Mesh Deformation",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.0.47+" },
                { key: "webWebGL", supported: true, version: "1.0.44+" },
                { key: "reactCanvas", supported: true, version: "3.0.1+" },
                { key: "reactWebGL", supported: true, version: "3.0.1+" },
                { key: "reactWebGL2", supported: true, version: "3.0.1+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "2.1.37+" },
                { key: "flutter", supported: true, version: "0.8.4+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "1.0.18+" },
                { key: "android", supported: true, version: "2.0.24+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        },
        cachingARiveFile: {
            title: "Caching a Rive File",
            runtimes: [
                { key: "webCanvas", supported: true, description: "Supported" },
                { key: "webWebGL", supported: true, description: "Supported" },
                { key: "webWebGL2", supported: true, description: "Supported" },
                { key: "reactCanvas", supported: true, description: "Supported" },
                { key: "reactWebGL", supported: true, description: "Supported" },
                { key: "reactWebGL2", supported: true, description: "Supported" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: false, description: "Not yet supported" },
                { key: "flutter", supported: true, description: "Supported" },
                { key: "flutterRiveNative", supported: true, description: "Supported" },
                { key: "apple", supported: true, description: "Supported" },
                { key: "android", supported: true, description: "Supported" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: false, description: "Not yet supported" }
            ]
        },
        rasterAssets: {
            title: "Raster Assets",
            runtimes: [
                { key: "webCanvas", supported: true, version: "1.0.2+" },
                { key: "webWebGL", supported: true, version: "1.0.2+" },
                { key: "reactCanvas", supported: true, version: "0.0.28+" },
                { key: "reactWebGL", supported: true, version: "0.0.28+" },
                { key: "reactWebGL2", supported: true, version: "0.0.28+" },
                { key: "reactNative", supported: true, version: "v0.1.4+" },
                { key: "reactNativeLegacy", supported: true, version: "2.1.36+" },
                { key: "flutter", supported: true, version: "0.8.1+" },
                { key: "flutterRiveNative", supported: true, version: "0.0.1-dev.6" },
                { key: "apple", supported: true, version: "1.0.1+" },
                { key: "android", supported: true, version: "2.0.5+" },
                { key: "cpp", supported: true, description: "Supported" },
                { key: "unity", supported: true, description: "Supported" },
                { key: "unreal", supported: true, description: "Supported" }
            ]
        }
    }

    const currentFeature = features[feature]
    const allSupported = currentFeature.runtimes.every(runtime => runtime.supported === true)
    const statusEmoji = allSupported ? '✅' : '🟡'
    const titleWithEmoji = `${statusEmoji} ${currentFeature.title}`

    return (
        <Accordion title={titleWithEmoji}>
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
                                currentFeature.runtimes.map(({ key, supported, version, description }) => {
                                    return (
                                            <tr>
                                            <td>{titles[key]}</td>
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
