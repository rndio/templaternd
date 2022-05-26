window.onload = function () {
    const globalAWN = new AWN({
        position: "bottom-right",
        maxNotifications: 3,
        durations: {
            global: 1e4
        },
        icons: {
            enabled: !0,
            prefix: "<div>",
            suffix: "</div>",
            success: "<svg fill='#40871D' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z'/></svg>",
            alert: "<svg fill='#a92019' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z'/></svg>"
        },
        messages: {
            ['async-block']: 'Please Wait'
        }
    });

    const form = document.forms.contactForm;
    const scriptURL = atob("aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6R2NrbnNqTTdkMDlEb3kzYTFnTlA5VE5DM0trLTFlVEFOdHpRdEF2RXdyS0NmTmI1RVBGUjlHdXlkSUF2RzNJNTIvZXhlYw==");
    const scriptURL2 = atob("aHR0cHM6Ly9vcGVuc2hlZXQuZWxrLnNoLzFZWlVCY0xYbGlFN0xfMTYzQjZMdzJQMmhEbjhLckIyTXg1VHoydTNmRU9rL1NoZWV0MQ==");

    document.getElementById("njoKvblBE").onclick = function () {
        let z = document.querySelector('.headerForm');
        this.classList.toggle("checked");

        if (this.classList.contains("checked") == true) {
            z.classList.toggle("checked"),
                form.name.readOnly = !0,
                form.email.readOnly = !0,
                form.name.value = "Anonymous",
                form.email.value = "anonymous@rndio.my.id"
        } else {
            z.classList.toggle("checked"),
                form.name.readOnly = !1,
                form.email.readOnly = !1,
                form.name.value = "",
                form.email.value = ""
        }
    }
    let responseElement = ''

    form.addEventListener('submit', e => {
        document.contactForm.url.value = window.location.href;
        e.preventDefault();
        const n = fetch(scriptURL, { method: 'POST', body: new FormData(form) })

        globalAWN.asyncBlock(n, (e => {
            (function () {
                form.reset()
                responseElement = ''
                const e = document.getElementById("njoKvblBE");
                if (e.classList.contains("checked")) {
                    form.name.readOnly = false;
                    form.email.readOnly = false;
                    e.classList.toggle("checked");
                    document.querySelector('.headerForm').classList.toggle("checked")
                }
            })()
            globalAWN.success("Your Message Was Sent Successfully")
        }), (e => {
            globalAWN.alert("Something Happened, Please Try Again Later")
        }))
    });


    document.getElementById('responseButton').onclick = function () {
        if (responseElement === '') {
            // Get API
            globalAWN.asyncBlock(
                axios.get(scriptURL2),
                resp => {

                    for (let i = 0; i < resp.data.length; i++) {
                        responseElement += `<div class="response-wrapper">`;
                        responseElement += `<img src="https://secure.gravatar.com/avatar/${MD5(resp.data[i]['email'])}?s=40&d=mp&r=g" alt="Avatar">`;
                        responseElement += `<div class="response-content"><span class="response-meta" data-name="${resp.data[i]['name']}" data-date="${resp.data[i]['timestamp']}">·</span>`;
                        responseElement += `<p>${resp.data[i]['message']}</p>`;

                        if (resp.data[i].hasOwnProperty('response')) {
                            responseElement += `<div class="response-wrapper">`;
                            responseElement += `<img src="https://avatars.githubusercontent.com/u/40624866?s=40&v=4" alt="Avatar">`;
                            responseElement += `<div class="response-content"><span class="response-meta" data-name="Rendio Simamora" data-date=""><i class="ri-checkbox-circle-fill"></i></span>`;
                            responseElement += `<p>${resp.data[i]['response']}</p>`;
                            responseElement += `</div></div>`;
                        }

                        responseElement += `</div></div>`;
                    }

                    // Show Modal
                    globalAWN.modal(`<div class="header"><h4>Contact Response</h4></div><div class="main">${responseElement}</div>`, 'response')
                },
                resp => { globalAWN.alert("Something Happened, Please Try Again Later") }
            )
        } else {
            // Show Modal
            globalAWN.modal(`<div class="header"><h4>Contact Response</h4></div><div class="main">${responseElement}</div>`, 'response')
        }
    }
}


