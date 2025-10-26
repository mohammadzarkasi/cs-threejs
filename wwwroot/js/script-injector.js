// File ini akan dimuat secara global di index.html (Langkah B)

// Objek untuk menyimpan referensi elemen skrip yang disuntikkan
let injectedScripts = {};

/**
 * Menyuntikkan tag <script> CDN ke dalam DOM.
 * @param {string} key - Kunci unik untuk referensi (misalnya, 'threejs').
 * @param {string} url - URL CDN.
 * @returns {Promise<boolean>} Status keberhasilan.
 */
function injectScript(key, url) {
    return new Promise((resolve) => {
        // Jika skrip sudah ada, langsung resolve.
        if (injectedScripts[key]) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = url;
        script.id = `blazor-dynamic-script-${key}`;

        script.onload = () => {
            console.log(`[JS Utility] CDN '${key}' berhasil dimuat.`);
            injectedScripts[key] = script;
            resolve(true);
        };

        script.onerror = () => {
            console.error(`[JS Utility] Gagal memuat CDN '${key}'.`);
            resolve(false);
        };

        // Tambahkan elemen skrip ke body
        document.body.appendChild(script);
    });
}

/**
 * Menghapus tag <script> yang telah disuntikkan.
 * @param {string} key - Kunci unik.
 */
function removeScript(key) {
    const script = injectedScripts[key];
    if (script && script.parentNode) {
        script.parentNode.removeChild(script);
        delete injectedScripts[key];
        console.log(`[JS Utility] CDN '${key}' telah dihapus dari DOM.`);
    }
}

// Ekspos fungsi-fungsi ke window global agar dapat dipanggil oleh Blazor
// melalui JS Interop (tanpa menggunakan IJSObjectReference untuk utility ini)
window.ScriptInjector = {
    injectScript,
    removeScript
};