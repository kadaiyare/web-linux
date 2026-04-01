/**
 * Web Linux - v86 WebAssembly x86 Emulator
 * Created by @kadaiyare
 */

const OS_CONFIGS = {
    buildroot: {
        name: "Buildroot Linux",
        memory: 256 * 1024 * 1024,
        vga_memory: 8 * 1024 * 1024,
        cdrom: { url: "images/linux.iso" }
    },
    openbsd: {
        name: "OpenBSD",
        memory: 256 * 1024 * 1024,
        vga_memory: 8 * 1024 * 1024,
        fda: { url: "images/openbsd-floppy.img" }
    }
};

let emulator = null;
let isRunning = false;

const $ = id => document.getElementById(id);

function loadV86() {
    return new Promise((resolve, reject) => {
        if (window.V86) return resolve();
        const script = document.createElement('script');
        script.src = 'v86/libv86.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('v86 load failed'));
        document.head.appendChild(script);
    });
}

function autoScroll() {
    const container = $('screen_container');
    container.scrollTop = container.scrollHeight;
}

async function startEmulator() {
    const config = OS_CONFIGS[$('os-select').value];
    if (!config) return;

    try {
        await loadV86();

        if (emulator) {
            emulator.destroy();
            emulator = null;
        }

        const emuConfig = {
            wasm_path: 'v86/v86.wasm',
            memory_size: config.memory,
            vga_memory_size: config.vga_memory,
            screen_container: $('screen_container'),
            bios: { url: 'v86/seabios.bin' },
            vga_bios: { url: 'v86/vgabios.bin' },
            autostart: true
        };

        if (config.cdrom) emuConfig.cdrom = config.cdrom;
        if (config.fda) emuConfig.fda = config.fda;

        emulator = new V86(emuConfig);
        isRunning = true;
        updateUI();

        // 自動スクロール
        const observer = new MutationObserver(autoScroll);
        observer.observe($('screen_container'), { childList: true, subtree: true, characterData: true });

    } catch (e) {
        console.error(e);
    }
}

function stopEmulator() {
    if (emulator) {
        emulator.stop();
        emulator.destroy();
        emulator = null;
        isRunning = false;
        updateUI();
    }
}

function updateUI() {
    $('start-btn').disabled = isRunning;
    $('stop-btn').disabled = !isRunning;
    $('os-select').disabled = isRunning;
}

$('start-btn').addEventListener('click', startEmulator);
$('stop-btn').addEventListener('click', stopEmulator);
