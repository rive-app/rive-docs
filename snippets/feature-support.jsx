
export const FeatureSupportGroup = ({
    feature,
    runtime,
    children
}) => {
    const features = {
        scripting: {
            title: "Scripting",
            runtimes: [
                {
                    title: "Web",
                    supported: true,
                    version: "2.34.0+"
                },
                {
                    title: "React",
                    supported: true,
                    version: "4.26.0+"
                },
                {
                    title: "React Native",
                    supported: true,
                    version: "v0.1.5+"
                },
                {
                    title: "React Native (Legacy)",
                    supported: true,
                    version: "v9.8.0+"
                },
                {
                    title: "Flutter",
                    supported: true,
                    version: "0.14.1"
                },
                {
                    title: "Flutter (rive_native)",
                    supported: true,
                    version: "0.1.1"
                },
                {
                    title: "Apple",
                    supported: true,
                    version: "v6.13.0+"
                },
                {
                    title: "Android",
                    supported: true,
                    version: "v11.1.0+"
                },
                {
                    title: "C++",
                    supported: true,
                    description: "Supported"
                },
                {
                    title: "Unity",
                    supported: true,
                    version: "v0.4.1-canary.33+"
                },
                {
                    title: "Unreal",
                    supported: true,
                    version: "v0.4.20+"
                }
            ]
        },
        dataBindingListsImagesArtboards: {
            title: "Data Binding - Lists, Images, and Artboards",
            runtimes: [
                {
                    title: "Web",
                    supported: true,
                    version: "2.30.3+"
                },
                {
                    title: "React",
                    supported: true,
                    version: "4.22.0+"
                },
                {
                    title: "React Native",
                    supported: true,
                    version: "v0.1.4+"
                },
                {
                    title: "React Native (Legacy)",
                    supported: false,
                    description: "Not yet supported"
                },
                {
                    title: "Flutter",
                    supported: true,
                    version: "0.14.0-dev.1"
                },
                {
                    title: "Flutter (rive_native)",
                    supported: true,
                    version: "0.0.4"
                },
                {
                    title: "Apple",
                    supported: true,
                    version: "v6.11.0+"
                },
                {
                    title: "Android",
                    supported: true,
                    version: "v10.4.0+"
                },
                {
                    title: "C++",
                    supported: true,
                    description: "Supported"
                },
                {
                    title: "Unity",
                    supported: true,
                    version: "v0.3.7-canary.142"
                },
                {
                    title: "Unreal",
                    supported: false,
                    description: "Not yet supported"
                }
            ]
        },
        rightToLeftLayoutsText: {
            title: "Right to Left Layouts & Text",
            runtimes: [
                { title: "Web", supported: true, version: "2.26.7+" },
                { title: "React", supported: true, version: "4.18.6+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "9.2.1+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "v0.0.1-dev.7+" },
                { title: "Apple", supported: true, version: "6.7.4+" },
                { title: "Android", supported: true, version: "10.0.4" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.3.5+" },
                { title: "Unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        textFollowPath: {
            title: "Text Follow Path",
            runtimes: [
                { title: "Web", supported: true, version: "2.26.7+" },
                { title: "React", supported: true, version: "4.18.6+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "9.2.1+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "v0.0.1-dev.7+" },
                { title: "Apple", supported: true, version: "6.7.4+" },
                { title: "Android", supported: true, version: "10.0.4" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.3.5+" },
                { title: "Unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        dataBinding: {
            title: "Data Binding",
            runtimes: [
                { title: "Web", supported: true, version: "2.26.6+" },
                { title: "React", supported: true, version: "4.20.0+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "9.3.0+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.8+" },
                { title: "Apple", supported: true, version: "6.8.0+" },
                { title: "Android", supported: true, version: "10.1.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.3.6-canary.27" },
                { title: "Unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        vectorFeathering: {
            title: "Vector Feathering",
            runtimes: [
                { title: "Web (@rive-app/webgl2)", supported: true, version: "2.26.0+" },
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: false, description: "Not supported" },
                { title: "React (@rive-app/react-webgl2)", supported: true, version: "4.18.0+" },
                { title: "React (@rive-app/react-canvas and @rive-app/react-webgl)", supported: false, description: "Not supported" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "9.0.0+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "6.6.0+" },
                { title: "Android", supported: true, version: "10.0.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.3.3-canary.72+" },
                { title: "Unreal", supported: true, version: "0.3.0a-gh" }
            ]
        },
        nSlicing: {
            title: "N-Slicing",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.23.11+" },
                { title: "React", supported: true, version: "4.16.7+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "8.2.0+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "6.4.0+" },
                { title: "Android", supported: true, version: "9.12.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.2.2-canary.22+" },
                { title: "Unreal", supported: true, version: "0.2.2+" }
            ]
        },
        layouts: {
            title: "Layouts",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.23.3+" },
                { title: "React", supported: true, version: "4.16.0+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "8.1.0+" },
                { title: "Flutter", supported: true, version: "0.14.0-dev.1" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "6.3.0+" },
                { title: "Android", supported: true, version: "9.10.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.2.1+" },
                { title: "Unreal", supported: true, version: "0.2.1+" }
            ]
        },
        fallbackFonts: {
            title: "Fallback Fonts",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: false, description: "Not yet supported" },
                { title: "React", supported: false, description: "Not yet supported" },
                { title: "React Native", supported: false, description: "Not yet supported" },
                { title: "React Native (Legacy)", supported: false, description: "Not yet supported" },
                { title: "Flutter", supported: false, description: "Not yet supported" },
                { title: "Flutter (rive_native)", supported: false, description: "Not yet supported" },
                { title: "Apple", supported: true, version: "6.1.0+" },
                { title: "Android", supported: true, version: "9.7.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: false, description: "Not supported" },
                { title: "Unreal", supported: false, description: "Not Supported" }
            ]
        },
        nestedText: {
            title: "Nested Text",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.21.0+" },
                { title: "React", supported: true, version: "4.14.0+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "5.8.2+" },
                { title: "Flutter", supported: true, version: "0.13.7+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "6.1.0+" },
                { title: "Android (Compose)", supported: false, description: "Unsupported" },
                { title: "Android (Legacy)", supported: true, version: "9.8.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, version: "0.1.14+" }
            ]
        },
        nestedInputs: {
            title: "Nested Inputs",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.17.3+" },
                { title: "React", supported: true, version: "4.11.3+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "7.2.0+" },
                { title: "Flutter", supported: true, version: "0.13.7+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.13.2+" },
                { title: "Android (Compose)", supported: false, description: "Unsupported" },
                { title: "Android (Legacy)", supported: true, version: "9.4.2+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, version: "0.1.174+" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        randomization: {
            title: "Randomization",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.15.6+" },
                { title: "React", supported: true, version: "4.9.5+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "7.0.3+" },
                { title: "Flutter", supported: true, version: "0.13.4+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.11.5+" },
                { title: "Android", supported: true, version: "9.3.5+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        audio: {
            title: "Audio",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.15.6+" },
                { title: "React", supported: true, version: "4.9.5+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "7.0.3+" },
                { title: "Flutter", supported: true, version: "0.13.4+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.11.5+" },
                { title: "Android", supported: true, version: "9.3.5+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        nestedInputsAndEvents: {
            title: "Nested Inputs and Nested Events",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.7.0+" },
                { title: "React", supported: true, version: "4.5.0+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "6.2.0+" },
                { title: "Flutter", supported: true, version: "0.12.3+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.6.0+" },
                { title: "Android (Compose)", supported: false, description: "Unsupported from API" },
                { title: "Android (Legacy)", supported: true, version: "8.7.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" }
            ]
        },
        outOfBandAssets: {
            title: "Out-of-band Assets",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.7.0+" },
                { title: "React", supported: true, version: "4.5.0+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "8.4.0+" },
                { title: "Flutter", supported: true, version: "0.12.0+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.7.0+" },
                { title: "Android", supported: true, version: "8.6.1+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, version: "0.1.14+" }
            ]
        },
        events: {
            title: "Events",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.4.3+" },
                { title: "React", supported: true, version: "4.3.3+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "6.1.0+" },
                { title: "Flutter", supported: true, version: "0.11.17+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.3.1+" },
                { title: "Android (Compose)", supported: false, description: "Unsupported from API" },
                { title: "Android (Legacy)", supported: true, version: "8.4.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        text: {
            title: "Text",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "2.1.3+" },
                { title: "React", supported: true, version: "4.1.3+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "6.0.3+" },
                { title: "Flutter", supported: true, version: "0.11.14+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "5.1.5+" },
                { title: "Android", supported: true, version: "8.1.3+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        followPath: {
            title: "Follow Path",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "1.2.4+" },
                { title: "React", supported: true, version: "3.0.55+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "5.0.0+" },
                { title: "Flutter", supported: true, version: "0.11.6+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "4.0.5+" },
                { title: "Android", supported: true, version: "6.0.1+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        interpolationOnStates: {
            title: "Interpolation on States",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "1.2.1+" },
                { title: "React", supported: true, version: "3.0.54+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "4.1.2+" },
                { title: "Flutter", supported: true, version: "0.11.4+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "4.0.4+" },
                { title: "Android", supported: true, version: "5.1.5+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        joysticks: {
            title: "Joysticks",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "1.1.9+" },
                { title: "React", supported: true, version: "3.0.49+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "4.1.0+" },
                { title: "Flutter", supported: true, version: "0.11.1+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "4.0.1+" },
                { title: "Android", supported: true, version: "5.0.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        solos: {
            title: "Solos",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "1.1.2+" },
                { title: "React", supported: true, version: "3.0.42+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "4.0.4+" },
                { title: "Flutter", supported: true, version: "0.10.4+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "3.1.9+" },
                { title: "Android", supported: true, version: "4.4.0+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        speedOnStates: {
            title: "Speed on States",
            runtimes: [
                { title: "Web (@rive-app/canvas)", supported: true, version: "1.0.102+" },
                { title: "Web (@rive-app/webgl)", supported: true, version: "1.0.98+" },
                { title: "React", supported: true, version: "3.0.38+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "4.0.1+" },
                { title: "Flutter", supported: true, version: "0.10.3+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "3.1.7+" },
                { title: "Android", supported: true, version: "4.2.7+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        graphEditor: {
            title: "Graph Editor",
            runtimes: [
                { title: "Web (@rive-app/canvas)", supported: true, version: "1.0.97+" },
                { title: "Web (@rive-app/webgl)", supported: true, version: "1.0.93+" },
                { title: "React", supported: true, version: "3.0.34+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "4.0.1+" },
                { title: "Flutter", supported: true, version: "0.10.0+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "3.1.3+" },
                { title: "Android", supported: true, version: "4.2.2+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        listeners: {
            title: "Listeners",
            runtimes: [
                { title: "Web (@rive-app/canvas)", supported: true, version: "1.0.65+" },
                { title: "Web (@rive-app/webgl)", supported: true, version: "1.0.62+" },
                { title: "React", supported: true, version: "3.0.6+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "3.0.38+" },
                { title: "Flutter", supported: true, version: "0.9.0+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "2.0.21+" },
                { title: "Android", supported: true, version: "3.0.8+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        meshDeformation: {
            title: "Mesh Deformation",
            runtimes: [
                { title: "Web (@rive-app/canvas)", supported: true, version: "1.0.47+" },
                { title: "Web (@rive-app/webgl)", supported: true, version: "1.0.44+" },
                { title: "React", supported: true, version: "3.0.1+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "2.1.37+" },
                { title: "Flutter", supported: true, version: "0.8.4+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "1.0.18+" },
                { title: "Android", supported: true, version: "2.0.24+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
            ]
        },
        cachingARiveFile: {
            title: "Caching a Rive File",
            runtimes: [
                { title: "Web", supported: true, description: "Supported" },
                { title: "React", supported: true, description: "Supported" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: false, description: "Not yet supported" },
                { title: "Flutter", supported: true, description: "Supported" },
                { title: "Flutter (rive_native)", supported: true, description: "Supported" },
                { title: "Apple", supported: true, description: "Supported" },
                { title: "Android", supported: true, description: "Supported" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: false, description: "Not yet supported" }
            ]
        },
        rasterAssets: {
            title: "Raster Assets",
            runtimes: [
                { title: "Web (@rive-app/canvas and @rive-app/webgl)", supported: true, version: "1.0.2+" },
                { title: "React", supported: true, version: "0.0.28+" },
                { title: "React Native", supported: true, version: "v0.1.4+" },
                { title: "React Native (Legacy)", supported: true, version: "2.1.36+" },
                { title: "Flutter", supported: true, version: "0.8.1+" },
                { title: "Flutter (rive_native)", supported: true, version: "0.0.1-dev.6" },
                { title: "Apple", supported: true, version: "1.0.1+" },
                { title: "Android", supported: true, version: "2.0.5+" },
                { title: "C++", supported: true, description: "Supported" },
                { title: "Unity", supported: true, description: "Supported" },
                { title: "Unreal", supported: true, description: "Supported" }
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
                                <th>
                                    <strong>Runtime</strong>
                                </th>
                                <th>
                                    <strong>Version</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentFeature.runtimes.map(({ title, supported, version, description }) => {
                                    return (
                                            <tr>
                                            <td>{title}</td>
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
