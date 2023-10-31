declare global {
    interface Window {
        BMapGL: () => void;
    }
}

window.BMapGL = window.BMapGL;
