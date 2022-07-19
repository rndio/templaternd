function ready(fn) { if (document.readyState != 'loading') { fn() } else { document.addEventListener('DOMContentLoaded', fn) } };
ready(function () {
    function escapeHTML(text) {
        let map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    const $_AWN = new AWN({
        position: "bottom-right",
        maxNotifications: 3,
        durations: { global: 8000 },
        icons: {
            enabled: true,
            prefix: "<div>",
            suffix: "</div>",
            success: "<svg fill='#40871D' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z'/></svg>",
            alert: "<svg fill='#a92019' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z'/></svg>"
        },
        messages: { ['async-block']: 'Please Wait' }
    });

    const form = document.forms.contactForm;
    const scriptURL = atob("aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6R2NrbnNqTTdkMDlEb3kzYTFnTlA5VE5DM0trLTFlVEFOdHpRdEF2RXdyS0NmTmI1RVBGUjlHdXlkSUF2RzNJNTIvZXhlYw==");
    const scriptURL2 = atob("aHR0cHM6Ly9vcGVuc2hlZXQuZWxrLnNoLzFZWlVCY0xYbGlFN0xfMTYzQjZMdzJQMmhEbjhLckIyTXg1VHoydTNmRU9rL1NoZWV0MQ==");
    const nameNemail = document.querySelector('.headerForm');
    const chkBoxAnonymous = document.getElementById("njoKvblBE");

    chkBoxAnonymous.onclick = function () {
        this.value = this.value == 0 ? 1 : 0;
        if (this.value == true) {
            nameNemail.classList.toggle("anonymous");
            form.name.readOnly = 1;
            form.email.readOnly = 1;
            form.name.value = "Anonymous";
            form.email.value = "anonymous@rndio.my.id";
        } else {
            nameNemail.classList.toggle("anonymous");
            form.name.readOnly = 0;
            form.email.readOnly = 0;
            form.name.value = "";
            form.email.value = "";
        }
    }
    let respEl = ''

    form.addEventListener('submit', e => {
        document.contactForm.url.value = window.location.href;
        e.preventDefault();
        const promise = fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        $_AWN.asyncBlock(promise,
            resp => {
                console.log(resp)
                form.reset(); respEl = '';
                if (chkBoxAnonymous.value == true) { form.name.readOnly = 0; form.email.readOnly = 0; chkBoxAnonymous.value = 0; nameNemail.classList.toggle("anonymous"); }
                $_AWN.success("Your Message Was Sent Successfully")
            },
            err => $_AWN.alert(`${err.message}, Please Try Again Later`)
        )
    });

    document.getElementById('responseButton').onclick = function () {
        function getData(z) { return z.map(e => `<div class="response-wrapper"><img src="https://secure.gravatar.com/avatar/${MD5(e.email)}?s=40&d=mp&r=g" alt="Avatar"><div class="response-content"><span class="response-meta" data-name="${escapeHTML(e.name)}" data-date="${escapeHTML(e.timestamp)}">»</span><p>${escapeHTML(e.message)}</p>${e.hasOwnProperty('response') ? `<div class="response-wrapper"><img src="https://avatars.githubusercontent.com/u/40624866?s=40&v=4" alt="Avatar"><div class="response-content"><span class="response-meta" data-name="Rendio Simamora"><i class="ri-checkbox-circle-fill"></i></span><p>${escapeHTML(e.response)}</p></div></div>` : ''}</div></div>`).join(''); }
        if (respEl == '') {
            const promise = fetch(scriptURL2).then(e => e.json())
            $_AWN.asyncBlock(promise,
                resp => resp.hasOwnProperty("error") ? $_AWN.alert("Something Happened, Please Try Again Later") : (respEl = resp, $_AWN.modal(`<div class="header"><h4>Contact Response</h4></div><div class="main">${getData(respEl)}</div>`, "response"))
            )
        } else {
            $_AWN.modal(`<div class="header"><h4>Contact Response</h4></div><div class="main">${getData(respEl)}</div>`, 'response')
        }
    }
});
